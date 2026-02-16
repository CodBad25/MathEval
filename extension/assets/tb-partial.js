// tb-partial.js - Bouton TB- (crédit partiel : moitié des points)
(function() {
  'use strict';
  if (!new URLSearchParams(window.location.search).get('v')?.includes('correction')) return;

  const STORAGE_KEY = 'tbMinusComments';
  const RECENT_KEY = 'tbMinusRecentComments';
  const PRESET_KEY = 'tbMinusPresetComments';
  let activePopover = null;

  // === Scoring par compétence ===
  const compEmojiMap = {
    modeliser:'🏗️', calculer:'🧮', raisonner:'🧩',
    communiquer:'💬', representer:'🎨', chercher:'🔍'
  };
  const compColorMap = {
    modeliser:'#9b59b6', calculer:'#3498db', raisonner:'#2ecc71',
    communiquer:'#e67e22', representer:'#e74c3c', chercher:'#f1c40f'
  };
  function normalizeComp(n) { return n ? n.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim() : n; }
  function niceComp(k) {
    return { modeliser:'Modéliser', calculer:'Calculer', raisonner:'Raisonner', communiquer:'Communiquer', representer:'Représenter', chercher:'Chercher' }[k] || k.charAt(0).toUpperCase()+k.slice(1);
  }

  // Get competencies for a specific question
  function getQuestionCompetences(exIndex, qIndex) {
    const exs = window.__getExercises ? window.__getExercises() : [];
    const ex = exs[exIndex];
    if (!ex) return [];
    let cw;
    try { cw = JSON.parse(localStorage.getItem('competencyWeights') || 'null'); } catch { cw = null; }
    if (cw && cw[ex.exerciceIndex]) {
      return Object.keys(cw[ex.exerciceIndex]).map(c => normalizeComp(c));
    }
    if (ex.detailParQuestion) {
      const q = ex.questions[qIndex];
      if (q && q.competences && q.competences.length) return q.competences.map(c => normalizeComp(c));
    }
    if (ex.competencesExercice && ex.competencesExercice.length) {
      return ex.competencesExercice.map(c => normalizeComp(c));
    }
    return [];
  }

  // Get compStatus for a student/exercise/question
  function getCompStatus(exIndex, qIndex) {
    const sid = window.__getStudentId ? window.__getStudentId() : null;
    if (!sid) return {};
    try {
      const corr = JSON.parse(localStorage.getItem('studentCorrections') || '{}');
      return corr[sid]?.[exIndex]?.[qIndex]?.compStatus || {};
    } catch { return {}; }
  }

  // Save a single competency status
  function saveCompStatus(exIndex, qIndex, comp, status) {
    const sid = window.__getStudentId ? window.__getStudentId() : null;
    if (!sid) return;
    try {
      const corr = JSON.parse(localStorage.getItem('studentCorrections') || '{}');
      if (!corr[sid] || !corr[sid][exIndex] || !corr[sid][exIndex][qIndex]) return;
      const qData = corr[sid][exIndex][qIndex];
      if (!qData.compStatus) qData.compStatus = {};
      qData.compStatus[comp] = status;
      // Recalculate global status from compStatus
      const comps = getQuestionCompetences(exIndex, qIndex);
      const statuses = comps.map(c => qData.compStatus[c]).filter(Boolean);
      if (statuses.length > 0) {
        if (statuses.every(s => s === 'TB')) qData.status = 'TB';
        else if (statuses.every(s => s === 'TF')) qData.status = 'TF';
        else qData.status = 'TB-';
        // Recalculate points
        const exs = window.__getExercises ? window.__getExercises() : [];
        const ex = exs[exIndex];
        if (ex) {
          const q = ex.questions[qIndex];
          const pts = q ? q.points || 1 : 1;
          qData.pointsObtenus = qData.status === 'TB' ? pts : qData.status === 'TB-' ? pts / 2 : 0;
        }
      }
      localStorage.setItem('studentCorrections', JSON.stringify(corr));
      // Update Svelte UI
      if (window.__setEval) window.__setEval(exIndex, qIndex, qData.status);
    } catch { /* ignore */ }
  }

  // Sync compStatus when global status changes (set all comps to same status)
  function syncCompStatusFromGlobal(exIndex, qIndex, globalStatus) {
    const sid = window.__getStudentId ? window.__getStudentId() : null;
    if (!sid) return;
    const comps = getQuestionCompetences(exIndex, qIndex);
    if (comps.length === 0) return;
    try {
      const corr = JSON.parse(localStorage.getItem('studentCorrections') || '{}');
      if (!corr[sid]?.[exIndex]?.[qIndex]) return;
      const qData = corr[sid][exIndex][qIndex];
      if (!qData.compStatus) qData.compStatus = {};
      comps.forEach(c => { qData.compStatus[c] = globalStatus; });
      localStorage.setItem('studentCorrections', JSON.stringify(corr));
    } catch { /* ignore */ }
  }

  // === Backup/Restore : sauvegarde les données TB- dans studentCorrections ===
  // Comme ça l'export JSON natif les embarque, et l'import les restaure.
  function backupTBData() {
    try {
      const corr = JSON.parse(localStorage.getItem('studentCorrections') || '{}');
      corr['__tbMinus'] = {
        presets: JSON.parse(localStorage.getItem(PRESET_KEY) || '{}'),
        recent: JSON.parse(localStorage.getItem(RECENT_KEY) || '{}'),
        comments: JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      };
      localStorage.setItem('studentCorrections', JSON.stringify(corr));
    } catch { /* ignore */ }
  }

  function restoreTBData() {
    try {
      const corr = JSON.parse(localStorage.getItem('studentCorrections') || '{}');
      const backup = corr['__tbMinus'];
      if (!backup) return;
      const isEmpty = (key) => {
        const v = localStorage.getItem(key);
        return !v || v === '{}' || v === '[]';
      };
      if (isEmpty(PRESET_KEY) && backup.presets && Object.keys(backup.presets).length > 0) {
        localStorage.setItem(PRESET_KEY, JSON.stringify(backup.presets));
      }
      if (isEmpty(RECENT_KEY) && backup.recent && Object.keys(backup.recent).length > 0) {
        localStorage.setItem(RECENT_KEY, JSON.stringify(backup.recent));
      }
      if (isEmpty(STORAGE_KEY) && backup.comments && Object.keys(backup.comments).length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(backup.comments));
      }
    } catch { /* ignore */ }
  }

  // Get preset comments for a specific exercise (stored as {exIndex: [comments]})
  function getPresets(exIndex) {
    try {
      let raw = JSON.parse(localStorage.getItem(PRESET_KEY) || '{}');
      // Migration: old format was a flat array → discard, user reconfigures per exercise
      if (Array.isArray(raw)) {
        localStorage.setItem(PRESET_KEY, JSON.stringify({}));
        return [];
      }
      return raw[exIndex] || [];
    } catch { return []; }
  }

  // Save presets for a specific exercise
  function savePresets(exIndex, comments) {
    try {
      let raw = JSON.parse(localStorage.getItem(PRESET_KEY) || '{}');
      if (Array.isArray(raw)) raw = {}; // migrate old format
      raw[exIndex] = comments;
      localStorage.setItem(PRESET_KEY, JSON.stringify(raw));
      backupTBData();
    } catch { /* ignore */ }
  }

  // Get recent comments for a specific exercise (stored as {exIndex: [comments]})
  function getRecentComments(exIndex) {
    try {
      const raw = JSON.parse(localStorage.getItem(RECENT_KEY) || '{}');
      if (Array.isArray(raw)) return [];
      return raw[exIndex] || [];
    } catch { return []; }
  }

  // Add a comment to the recent list for a specific exercise (max 10)
  function addRecentComment(exIndex, comment) {
    if (!comment.trim()) return;
    try {
      let raw = JSON.parse(localStorage.getItem(RECENT_KEY) || '{}');
      if (Array.isArray(raw)) raw = {};
      let list = raw[exIndex] || [];
      list = list.filter(c => c !== comment);
      list.unshift(comment);
      if (list.length > 10) list.pop();
      raw[exIndex] = list;
      localStorage.setItem(RECENT_KEY, JSON.stringify(raw));
      backupTBData();
    } catch { /* ignore */ }
  }

  // Get all chips for an exercise: presets first, then recent (no duplicates)
  function getAllChips(exIndex) {
    const presets = getPresets(exIndex);
    const recent = getRecentComments(exIndex);
    const all = [...presets];
    recent.forEach(c => { if (!all.includes(c)) all.push(c); });
    return all;
  }

  // Get current exercise index from active tab
  function getExIndex() {
    if (window.__getExIndex) return window.__getExIndex();
    const tabs = document.querySelectorAll('nav[aria-label="Tabs"] button');
    for (let i = 0; i < tabs.length; i++) {
      if (tabs[i].className.includes('ring-2')) return i;
    }
    return 0;
  }

  // Get current exercise name from the page heading
  function getExName() {
    const h2 = document.querySelector('h2');
    return h2 ? h2.textContent.trim() : 'Exercice #' + (getExIndex() + 1);
  }

  // Save comment for a specific student/exercise/question
  function saveComment(exIndex, qIndex, comment) {
    const sid = window.__getStudentId ? window.__getStudentId() : window.__lastStudentId;
    if (!sid) return;
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (!data[sid]) data[sid] = {};
    if (!data[sid][exIndex]) data[sid][exIndex] = {};
    data[sid][exIndex][qIndex] = comment;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    addRecentComment(exIndex, comment);
    backupTBData();
  }

  // Get existing comment for current student/exercise/question
  function getExistingComment(exIndex, qIndex) {
    const sid = window.__getStudentId ? window.__getStudentId() : window.__lastStudentId;
    if (!sid) return '';
    try {
      const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return data[sid]?.[exIndex]?.[qIndex] || '';
    } catch { return ''; }
  }

  // Close any open popover
  function closePopover() {
    if (activePopover) {
      activePopover.remove();
      activePopover = null;
    }
    window.__blockAutoAdvance = false;
  }

  // Show comment popover near a button
  function showPopover(btn, exIndex, qIndex) {
    closePopover();
    window.__blockAutoAdvance = true;
    const pop = document.createElement('div');
    pop.className = 'tbm-popover';
    pop.style.flexDirection = 'column';

    const existing = getExistingComment(exIndex, qIndex);
    const chips = getAllChips(exIndex);

    // Input row
    const inputRow = document.createElement('div');
    inputRow.style.cssText = 'display:flex;gap:4px;width:100%';
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Commentaire...';
    input.value = existing;
    input.className = 'tbm-input';
    const okBtn = document.createElement('button');
    okBtn.textContent = 'OK';
    okBtn.className = 'tbm-ok';
    inputRow.appendChild(input);
    inputRow.appendChild(okBtn);
    pop.appendChild(inputRow);

    // Chips (presets + recent for this exercise)
    if (chips.length > 0) {
      const chipsDiv = document.createElement('div');
      chipsDiv.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px;width:100%;margin-top:4px';
      chips.forEach(c => {
        const chip = document.createElement('button');
        chip.className = 'tbm-chip';
        chip.textContent = c;
        chip.addEventListener('click', (e) => {
          e.stopPropagation();
          saveComment(exIndex, qIndex, c);
          closePopover();
        });
        chipsDiv.appendChild(chip);
      });
      pop.appendChild(chipsDiv);
    }

    // Save on OK click or Enter
    function doSave() {
      const val = input.value.trim();
      if (val) saveComment(exIndex, qIndex, val);
      closePopover();
    }
    okBtn.addEventListener('click', (e) => { e.stopPropagation(); doSave(); });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.stopPropagation(); doSave(); }
    });

    btn.parentElement.style.position = 'relative';
    btn.parentElement.appendChild(pop);
    activePopover = pop;
    setTimeout(() => input.focus(), 20);

    // Close on outside click
    setTimeout(() => {
      document.addEventListener('click', function handler(e) {
        if (!pop.contains(e.target)) {
          closePopover();
          document.removeEventListener('click', handler);
        }
      });
    }, 10);
  }

  // Show configuration modal for preset comments (per exercise)
  function showConfigModal() {
    const exIndex = getExIndex();
    const exName = getExName();

    const overlay = document.createElement('div');
    overlay.className = 'tbm-modal-overlay';
    const modal = document.createElement('div');
    modal.className = 'tbm-modal';
    modal.innerHTML = `
      <h3>Commentaires TB- — Ex. #${exIndex + 1}</h3>
      <p><b>${exName}</b><br>Un commentaire par ligne. Spécifiques à cet exercice.</p>
      <textarea class="tbm-config-textarea"></textarea>
      <div class="tbm-modal-actions">
        <button class="tbm-modal-cancel">Annuler</button>
        <button class="tbm-modal-save">Enregistrer</button>
      </div>
    `;
    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    const textarea = modal.querySelector('textarea');
    textarea.value = getPresets(exIndex).join('\n');
    setTimeout(() => textarea.focus(), 20);

    modal.querySelector('.tbm-modal-cancel').addEventListener('click', () => overlay.remove());
    modal.querySelector('.tbm-modal-save').addEventListener('click', () => {
      const lines = textarea.value.split('\n').map(l => l.trim()).filter(l => l);
      savePresets(exIndex, lines);
      overlay.remove();
    });
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.remove();
    });
  }

  // Check if a question has TB- status
  function getStatus(exIndex, qIndex) {
    const sid = window.__getStudentId ? window.__getStudentId() : null;
    if (!sid) return null;
    try {
      const corr = JSON.parse(localStorage.getItem('studentCorrections') || '{}');
      return corr[sid]?.[exIndex]?.[qIndex]?.status || null;
    } catch { return null; }
  }

  // Create a TB- button for per-question evaluation
  function createTBMinusBtn(qIndex) {
    const btn = document.createElement('button');
    btn.className = 'px-3 py-1 rounded text-sm font-bold transition-all tbm-btn';
    btn.textContent = 'TB-';
    btn.title = 'Bien mais erreur mineure (moitié des points)';
    btn.dataset.tbminus = 'question';
    btn.dataset.qindex = qIndex;

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.__blockAutoAdvance = true;
      const exIndex = getExIndex();
      if (window.__setEval) {
        window.__setEval(exIndex, qIndex, 'TB-');
      }
      syncCompStatusFromGlobal(exIndex, qIndex, 'TB-');
      setTimeout(() => updateButtonStyles(), 50);
      showPopover(btn, exIndex, qIndex);
    });

    return btn;
  }

  // Create a TB- button for exercise-level rapid evaluation
  function createTBMinusExBtn() {
    const btn = document.createElement('button');
    btn.style.cssText = 'padding:8px 16px;background:#84cc16;color:#fff;border:none;border-radius:4px;font-weight:700;font-size:14px;cursor:pointer;transition:all .2s';
    btn.addEventListener('mouseenter', () => { btn.style.background = '#65a30d'; });
    btn.addEventListener('mouseleave', () => { btn.style.background = '#84cc16'; });
    btn.textContent = '△ TB- - Erreur mineure';
    btn.title = 'Marquer toutes les questions comme TB- (moitié des points)';
    btn.dataset.tbminus = 'exercise';

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const exIndex = getExIndex();
      if (window.__setExEval) {
        window.__setExEval(exIndex, 'TB-');
      }
      setTimeout(() => updateButtonStyles(), 50);
    });

    return btn;
  }

  function formatScore(n) {
    return n % 1 === 0 ? n.toString() : n.toFixed(1);
  }

  // Read the competency level (TBM/MS/MF/MI) from the active exercise tab
  function getActiveTabLevel() {
    const tabs = document.querySelectorAll('nav[aria-label="Tabs"] button');
    for (const tab of tabs) {
      if (!tab.className.includes('ring-2')) continue;
      const spans = tab.querySelectorAll('span');
      for (const span of spans) {
        const t = span.textContent.trim();
        if (['TBM', 'MS', 'MF', 'MI'].includes(t)) return t;
      }
    }
    return 'MF'; // fallback
  }

  // Update exercise score display (called only on explicit user action)
  function updateExerciseScore() {
    const sid = window.__getStudentId ? window.__getStudentId() : null;
    if (!sid) return;
    const exIndex = getExIndex();
    const exercises = window.__getExercises ? window.__getExercises() : null;
    if (!exercises || !exercises[exIndex]) return;
    const ex = exercises[exIndex];
    let corr;
    try { corr = JSON.parse(localStorage.getItem('studentCorrections') || '{}'); } catch { return; }
    const studentData = corr[sid];
    if (!studentData) return;

    let obtained = 0, total = 0, evaluated = 0;
    ex.questions.forEach((q, qi) => {
      total += q.points || 1;
      const qData = studentData[exIndex]?.[qi];
      if (qData && qData.status && qData.status !== 'NE' && qData.status !== 'Non évalué') {
        evaluated++;
        if (qData.pointsObtenus !== undefined) obtained += qData.pointsObtenus;
        else if (qData.status === 'TB') obtained += (q.points || 1);
        else if (qData.status === 'TB-') obtained += (q.points || 1) / 2;
      }
    });

    const h2 = document.querySelector('h2');
    if (!h2) return;
    let badge = document.getElementById('tbm-ex-score');
    if (evaluated === 0) {
      if (badge) badge.style.display = 'none';
      return;
    }
    const pct = total > 0 ? Math.round(obtained / total * 100) : 0;
    const txt = formatScore(obtained) + ' / ' + formatScore(total) + ' pts (' + pct + '%)';
    if (badge && badge.textContent === txt) return;
    if (!badge) {
      badge = document.createElement('span');
      badge.id = 'tbm-ex-score';
      badge.style.cssText = 'display:inline-flex;align-items:center;font-size:16px;font-weight:800;padding:4px 14px;border-radius:8px;border:2px solid;margin-left:12px;white-space:nowrap';
      h2.parentElement.appendChild(badge);
    }
    badge.style.display = 'inline-flex';
    badge.textContent = txt;
    // Match color to competency level badge on the active tab
    const level = getActiveTabLevel();
    const colors = {
      'TBM': { bg: '#e8f5e9', color: '#2e7d32', border: '#4CAF50' },
      'MS':  { bg: '#e3f2fd', color: '#1565c0', border: '#2196F3' },
      'MF':  { bg: '#fff3e0', color: '#e65100', border: '#FF9800' },
      'MI':  { bg: '#ffebee', color: '#b71c1c', border: '#F44336' }
    };
    const c = colors[level] || colors['MF'];
    badge.style.background = c.bg; badge.style.color = c.color; badge.style.borderColor = c.border;
  }

  // Update TB- button styles based on current status
  function updateButtonStyles() {
    const exIndex = getExIndex();
    document.querySelectorAll('button[data-tbminus="question"]').forEach(btn => {
      const qIndex = parseInt(btn.dataset.qindex);
      const status = getStatus(exIndex, qIndex);
      if (status === 'TB-') {
        btn.className = 'px-3 py-1 rounded text-sm font-bold transition-all tbm-btn tbm-active';
      } else {
        btn.className = 'px-3 py-1 rounded text-sm font-bold transition-all tbm-btn';
      }
    });
    updateExerciseScore();
  }

  // Create competency toggle button (▼) and panel for a question
  function createCompToggle(qIndex) {
    const exIndex = getExIndex();
    const comps = getQuestionCompetences(exIndex, qIndex);
    if (comps.length < 2) return null;

    const wrapper = document.createElement('div');
    wrapper.dataset.compToggle = qIndex;
    wrapper.style.cssText = 'display:inline-flex;align-items:center;position:relative';

    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'px-1 py-1 rounded text-xs transition-all';
    toggleBtn.style.cssText = 'background:none;border:1px solid #cbd5e1;color:#64748b;cursor:pointer;font-size:11px;line-height:1;margin-left:4px;min-width:22px;text-align:center';
    toggleBtn.textContent = '▼';
    toggleBtn.title = 'Scoring par compétence';
    wrapper.appendChild(toggleBtn);

    // Create panel (hidden by default)
    const panel = document.createElement('div');
    panel.style.cssText = 'display:none;position:absolute;top:100%;left:-200px;z-index:100;background:white;border:1px solid #e2e8f0;border-radius:8px;padding:8px 10px;box-shadow:0 4px 12px rgba(0,0,0,.15);min-width:280px;margin-top:4px';
    panel.dataset.compPanel = qIndex;

    function renderPanel() {
      const currentExIndex = getExIndex();
      const currentComps = getQuestionCompetences(currentExIndex, qIndex);
      const compSt = getCompStatus(currentExIndex, qIndex);
      panel.innerHTML = '';
      currentComps.forEach(comp => {
        const row = document.createElement('div');
        row.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:3px 0;gap:8px';

        const label = document.createElement('span');
        label.style.cssText = 'font-size:12px;font-weight:600;color:' + (compColorMap[comp] || '#666') + ';white-space:nowrap';
        label.textContent = (compEmojiMap[comp] || '') + ' ' + niceComp(comp);
        row.appendChild(label);

        const btns = document.createElement('div');
        btns.style.cssText = 'display:flex;gap:3px';

        ['TB', 'TB-', 'TF'].forEach(st => {
          const b = document.createElement('button');
          b.textContent = st;
          const isActive = compSt[comp] === st;
          const colors = {
            'TB': { bg: isActive ? '#22c55e' : '#f0fdf4', color: isActive ? '#fff' : '#16a34a', border: '#86efac' },
            'TB-': { bg: isActive ? '#84cc16' : '#f7fee7', color: isActive ? '#fff' : '#65a30d', border: '#bef264' },
            'TF': { bg: isActive ? '#ef4444' : '#fef2f2', color: isActive ? '#fff' : '#dc2626', border: '#fca5a5' }
          };
          const c = colors[st];
          b.style.cssText = `padding:2px 8px;border:1px solid ${c.border};border-radius:4px;font-size:11px;font-weight:700;cursor:pointer;background:${c.bg};color:${c.color};transition:all .15s`;
          b.addEventListener('click', (e) => {
            e.stopPropagation();
            saveCompStatus(currentExIndex, qIndex, comp, st);
            renderPanel();
            setTimeout(() => updateButtonStyles(), 50);
          });
          btns.appendChild(b);
        });
        row.appendChild(btns);
        panel.appendChild(row);
      });
    }

    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = panel.style.display !== 'none';
      // Close other open panels
      document.querySelectorAll('[data-comp-panel]').forEach(p => { p.style.display = 'none'; });
      document.querySelectorAll('[data-comp-toggle]').forEach(w => {
        const btn = w.querySelector('button');
        if (btn) { btn.textContent = '▼'; btn.style.background = 'none'; btn.style.color = '#64748b'; }
      });
      if (!isVisible) {
        renderPanel();
        panel.style.display = 'block';
        toggleBtn.textContent = '▲';
        toggleBtn.style.background = '#e0f2fe';
        toggleBtn.style.color = '#0284c7';
      }
    });

    // Close panel on outside click
    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target) && !panel.contains(e.target)) {
        panel.style.display = 'none';
        toggleBtn.textContent = '▼';
        toggleBtn.style.background = 'none';
        toggleBtn.style.color = '#64748b';
      }
    });

    wrapper.appendChild(panel);
    return wrapper;
  }

  // Inject TB- buttons into the page
  function injectButtons() {
    const tbButtons = document.querySelectorAll('button[title^="Tout Bon"]');
    tbButtons.forEach((tbBtn, idx) => {
      const parent = tbBtn.parentElement;
      if (!parent || parent.querySelector('[data-tbminus]')) return;
      const tfBtn = parent.querySelector('button[title^="Tout Faux"]');
      if (!tfBtn) return;
      parent.insertBefore(createTBMinusBtn(idx), tfBtn);
      // Add competency toggle button (after TF button)
      if (!parent.querySelector('[data-comp-toggle="' + idx + '"]')) {
        const compToggle = createCompToggle(idx);
        if (compToggle) parent.appendChild(compToggle);
      }
      // Hook TB/TF native buttons to sync compStatus
      if (!tbBtn.dataset.compHooked) {
        tbBtn.dataset.compHooked = '1';
        tbBtn.addEventListener('click', () => {
          setTimeout(() => syncCompStatusFromGlobal(getExIndex(), idx, 'TB'), 50);
        });
      }
      if (tfBtn && !tfBtn.dataset.compHooked) {
        tfBtn.dataset.compHooked = '1';
        tfBtn.addEventListener('click', () => {
          setTimeout(() => syncCompStatusFromGlobal(getExIndex(), idx, 'TF'), 50);
        });
      }
    });

    const rapidTBBtns = document.querySelectorAll('button[title="Marquer toutes les questions comme Tout Bon"]');
    rapidTBBtns.forEach(rapidTB => {
      const parent = rapidTB.parentElement;
      if (!parent || parent.querySelector('[data-tbminus]')) return;
      const rapidTF = parent.querySelector('button[title="Marquer toutes les questions comme Tout Faux"]');
      if (!rapidTF) return;
      parent.insertBefore(createTBMinusExBtn(), rapidTF);
    });

    updateButtonStyles();
  }

  // Inject config button (once)
  function injectConfigButton() {
    if (document.getElementById('tbm-config-trigger')) return;
    const btn = document.createElement('button');
    btn.id = 'tbm-config-trigger';
    btn.className = 'tbm-config-btn';
    btn.textContent = '⚙ Commentaires TB-';
    btn.addEventListener('click', showConfigModal);
    document.body.appendChild(btn);
  }

  // Layout côte à côte : énoncé | correction pour les questions avec figures
  function applySideBySideLayout() {
    document.querySelectorAll('.mb-2').forEach(container => {
      if (container.dataset.sideBySide) return;
      const children = Array.from(container.children);
      const enonce = children.find(el => el.classList.contains('bg-gray-50'));
      const correction = children.find(el => el.className && el.className.includes('bg-green-50'));
      if (!enonce || !correction) return;
      // Only apply if there's a figure (SVG) in the content
      if (!enonce.querySelector('svg') && !correction.querySelector('svg')) return;
      container.dataset.sideBySide = '1';
      const wrapper = document.createElement('div');
      wrapper.style.cssText = 'display:flex;gap:8px;width:100%';
      enonce.style.cssText += ';flex:1;min-width:0';
      correction.style.cssText += ';flex:1;min-width:0';
      container.insertBefore(wrapper, enonce);
      wrapper.appendChild(enonce);
      wrapper.appendChild(correction);
    });
  }

  // Inject comment indicator dots on student cards in overview
  function injectCommentDots() {
    const comments = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    const students = window.__getStudentList ? window.__getStudentList() : null;
    if (!students || students.length === 0) return;

    // Find all student card buttons (they contain h3 with the student name)
    document.querySelectorAll('button').forEach(card => {
      const h3 = card.querySelector('h3');
      if (!h3) return;
      const badges = card.querySelectorAll('div[title^="Exercice"]');
      if (badges.length === 0) return;

      const cardName = h3.textContent.trim();
      const student = students.find(s => s.nom === cardName);
      if (!student) return;
      const studentComments = comments[student.id];
      if (!studentComments) return;

      badges.forEach(badge => {
        if (badge.querySelector('.tbm-dot')) return;
        const titleMatch = badge.title.match(/Exercice\s+(\d+)/);
        if (!titleMatch) return;
        const exIdx = parseInt(titleMatch[1]) - 1;
        const exComments = studentComments[exIdx];
        if (!exComments) return;
        const texts = Object.entries(exComments)
          .filter(([_, v]) => v)
          .map(([q, v]) => 'Q' + (parseInt(q) + 1) + ': ' + v);
        if (texts.length === 0) return;

        const dot = document.createElement('span');
        dot.className = 'tbm-dot';
        dot.textContent = '💬';
        dot.title = texts.join('\n');
        dot.style.cssText = 'font-size:10px;margin-left:3px;cursor:help;filter:brightness(1.2)';
        badge.appendChild(dot);
      });
    });
  }

  // Debounced comment dots injection (Svelte re-renders destroy injected DOM)
  let dotsTimer = null;
  function scheduleCommentDots() {
    clearTimeout(dotsTimer);
    dotsTimer = setTimeout(injectCommentDots, 300);
  }

  // Observe DOM changes to re-inject buttons when needed
  const observer = new MutationObserver(() => {
    const tbBtns = document.querySelectorAll('button[title^="Tout Bon"]');
    if (tbBtns.length > 0) {
      injectButtons();
      installTabListener();
    }
    applySideBySideLayout();
    scheduleCommentDots();
  });

  // Listen for exercise tab clicks to update score badge
  function installTabListener() {
    const nav = document.querySelector('nav[aria-label="Tabs"]');
    if (!nav || nav.dataset.tbmTabListener) return;
    nav.dataset.tbmTabListener = '1';
    nav.addEventListener('click', (e) => {
      if (!e.target.closest('button')) return;
      setTimeout(updateExerciseScore, 200);
    });
  }

  function init() {
    const app = document.getElementById('app') || document.getElementById('appMathalea');
    if (!app) { setTimeout(init, 100); return; }
    restoreTBData();
    observer.observe(app, { childList: true, subtree: true });
    setTimeout(injectButtons, 500);
    setTimeout(applySideBySideLayout, 600);
    setTimeout(injectCommentDots, 800);
    setTimeout(installTabListener, 500);
    injectConfigButton();
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePopover();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

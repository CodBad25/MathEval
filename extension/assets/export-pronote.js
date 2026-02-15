// export-pronote.js — Tableau de compétences copiable pour Pronote
(function () {
  'use strict';

  // --- Helpers (mêmes que bilan-pdf.js) ---
  function getCorr() { try { return JSON.parse(localStorage.getItem('studentCorrections')||'{}'); } catch { return {}; } }
  function getCW() { try { return JSON.parse(localStorage.getItem('competencyWeights')||'null'); } catch { return null; } }
  function getExercises() { return window.__getExercises ? window.__getExercises() : []; }
  function getStudents() { return window.__getStudentList ? window.__getStudentList() : []; }
  function normalizeComp(n) { return n ? n.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim() : n; }

  function getBilanConfig() {
    try { return JSON.parse(localStorage.getItem('bilanPdfConfig') || '{}'); } catch { return {}; }
  }

  // Seuils de maîtrise
  const SEUIL_TBM = 75, SEUIL_MS = 50, SEUIL_MF = 25;

  function levelToLetter(pct) {
    if (pct >= SEUIL_TBM) return 'A';
    if (pct >= SEUIL_MS) return 'B';
    if (pct >= SEUIL_MF) return 'C';
    return 'D';
  }

  function levelToColor(letter) {
    return { A: '#28a745', B: '#17a2b8', C: '#ffc107', D: '#dc3545' }[letter] || '#6c757d';
  }

  // Calcul des scores par compétence pour un élève
  function compScores(sid) {
    const corr = getCorr()[sid], exs = getExercises(), cw = getCW(), we = {};
    if (!corr) return {};
    exs.forEach(ex => ex.questions.forEach(q => {
      const d = corr[ex.exerciceIndex]?.[q.questionIndex];
      if (d?.status) {
        const pts = q.points || 1;
        let earned = d.status === 'TB' ? pts : d.status === 'TB-' ? pts / 2 : 0;
        if (d?.pointsObtenus !== undefined) earned = d.pointsObtenus;
        const w = cw?.[ex.exerciceIndex];
        if (w) Object.entries(w).forEach(([comp, pct]) => {
          const k = normalizeComp(comp);
          if (!we[k]) we[k] = { c: 0, t: 0 }; we[k].t += pts * pct; we[k].c += earned * pct;
        });
        else {
          const cs = ex.detailParQuestion ? q.competences : ex.competencesExercice;
          if (!cs || !cs.length) return;
          const sh = 1 / cs.length;
          cs.forEach(comp => { const k = normalizeComp(comp); if (!we[k]) we[k] = { c: 0, t: 0 }; we[k].t += pts * sh; we[k].c += earned * sh; });
        }
      }
    }));
    const r = {};
    Object.keys(we).forEach(k => { const c = we[k].c, t = we[k].t; if (t > 0) r[k] = { pct: c / t * 100 }; });
    return r;
  }

  function globalScore(sid) {
    const corr = getCorr()[sid], exs = getExercises();
    if (!corr) return { correct: 0, total: 0 };
    let c = 0, t = 0;
    exs.forEach(ex => ex.questions.forEach(q => {
      const d = corr[ex.exerciceIndex]?.[q.questionIndex];
      t += q.points;
      if (d?.pointsObtenus !== undefined) c += d.pointsObtenus;
      else if (d?.status === 'TB') c += q.points;
      else if (d?.status === 'TB-') c += q.points / 2;
    }));
    return { correct: c, total: t };
  }

  function isCorrected(sid) {
    const c = getCorr()[sid];
    return c ? Object.keys(c).some(k => k !== 'commentaire' && Object.keys(c[k]).length > 0) : false;
  }

  const COMP_LABELS = {
    calculer: 'Calculer', modeliser: 'Modéliser', representer: 'Représenter',
    raisonner: 'Raisonner', communiquer: 'Communiquer', chercher: 'Chercher'
  };

  // --- Modale avec tableau ---
  function showPronoteModal() {
    const students = getStudents();
    if (!students.length) { alert('Aucun élève trouvé.'); return; }

    // Compétences évaluées
    const allComps = new Set();
    students.forEach(s => {
      if (!isCorrected(s.id)) return;
      const sc = compScores(s.id);
      Object.keys(sc).forEach(k => allComps.add(k));
    });

    if (!allComps.size) { alert('Aucune correction trouvée.'); return; }

    const compOrder = ['chercher', 'modeliser', 'representer', 'raisonner', 'calculer', 'communiquer'];
    const comps = compOrder.filter(c => allComps.has(c));
    allComps.forEach(c => { if (!comps.includes(c)) comps.push(c); });

    // Classe depuis la config bilan-pdf
    const cfg = getBilanConfig();
    const classe = cfg.classe || '';

    // Ne garder que les vrais élèves (qui ont un nom ou un prénom), triés par nom
    const sorted = [...students]
      .filter(s => (s.nom && s.nom.trim()) || (s.prenom && s.prenom.trim()))
      .sort((a, b) => (a.nom || '').toUpperCase().localeCompare((b.nom || '').toUpperCase(), 'fr'));

    // Construire le tableau
    const compHeaders = comps.map(c => COMP_LABELS[c] || c.charAt(0).toUpperCase() + c.slice(1));

    let tableHTML = '<table id="pronote-table" style="border-collapse:collapse;width:100%;font-size:14px;font-family:Arial,sans-serif">';
    tableHTML += '<thead><tr style="background:#2c3e50;color:white">';
    tableHTML += '<th style="padding:8px 12px;text-align:left;border:1px solid #34495e">Nom</th>';
    tableHTML += '<th style="padding:8px 12px;text-align:center;border:1px solid #34495e">Classe</th>';
    tableHTML += '<th style="padding:8px 12px;text-align:center;border:1px solid #34495e">Note</th>';
    compHeaders.forEach(h => {
      tableHTML += `<th style="padding:8px 12px;text-align:center;border:1px solid #34495e">${h}</th>`;
    });
    tableHTML += '</tr></thead><tbody>';

    sorted.forEach((s, i) => {
      const bg = i % 2 === 0 ? '#fff' : '#f8f9fa';
      const nom = `${(s.nom || '').toUpperCase()} ${s.prenom || ''}`.trim();
      const corrected = isCorrected(s.id);
      const g = globalScore(s.id);
      let noteText = '';
      if (!corrected) {
        noteText = '<span style="color:#999">ABS</span>';
      } else if (g.total > 0) {
        const note = Math.round(g.correct * 10) / 10;
        noteText = note.toString().replace('.', ',');
      }

      tableHTML += `<tr style="background:${bg}">`;
      tableHTML += `<td style="padding:6px 10px;border:1px solid #dee2e6;font-weight:500">${nom}</td>`;
      tableHTML += `<td style="padding:6px 10px;border:1px solid #dee2e6;text-align:center">${classe}</td>`;
      tableHTML += `<td style="padding:6px 10px;border:1px solid #dee2e6;text-align:center;font-weight:600">${noteText}</td>`;

      if (corrected) {
        const sc = compScores(s.id);
        comps.forEach(c => {
          if (sc[c]) {
            const letter = levelToLetter(sc[c].pct);
            const color = levelToColor(letter);
            tableHTML += `<td style="padding:6px 10px;border:1px solid #dee2e6;text-align:center;font-weight:bold;color:${color}">${letter}</td>`;
          } else {
            tableHTML += '<td style="padding:6px 10px;border:1px solid #dee2e6;text-align:center"></td>';
          }
        });
      } else {
        comps.forEach(() => {
          tableHTML += '<td style="padding:6px 10px;border:1px solid #dee2e6;text-align:center;color:#999">ABS</td>';
        });
      }
      tableHTML += '</tr>';
    });

    tableHTML += '</tbody></table>';

    // Légende
    const legend = `<div style="margin-top:12px;font-size:12px;color:#666;display:flex;gap:16px;flex-wrap:wrap">
      <span><b style="color:#28a745">A</b> = Très bonne maîtrise (≥75%)</span>
      <span><b style="color:#17a2b8">B</b> = Maîtrise satisfaisante (≥50%)</span>
      <span><b style="color:#ffc107">C</b> = Maîtrise fragile (≥25%)</span>
      <span><b style="color:#dc3545">D</b> = Maîtrise insuffisante (<25%)</span>
    </div>`;

    // Modale
    const overlay = document.createElement('div');
    overlay.id = 'pronote-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:10000;display:flex;align-items:center;justify-content:center';
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

    const modal = document.createElement('div');
    modal.style.cssText = 'background:white;border-radius:12px;padding:24px;max-width:90vw;max-height:85vh;overflow:auto;box-shadow:0 20px 60px rgba(0,0,0,0.3)';

    modal.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h2 style="margin:0;font-size:20px;color:#2c3e50">📊 Export Pronote — Compétences</h2>
        <button id="pronote-close" style="background:none;border:none;font-size:24px;cursor:pointer;color:#999;padding:4px 8px">&times;</button>
      </div>
      <p style="margin:0 0 12px;color:#666;font-size:13px">
        Sélectionnez les cellules du tableau ci-dessous et collez-les directement dans Pronote.
        Le bouton <b>Copier</b> copie les notes et les compétences (A/B/C/D).
      </p>
      <div style="display:flex;gap:8px;margin-bottom:16px">
        <button id="pronote-copy-comps" style="padding:8px 16px;background:#2980b9;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:13px">
          📋 Copier notes + compétences
        </button>
        <button id="pronote-copy-all" style="padding:8px 16px;background:#27ae60;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:13px">
          📋 Copier tout le tableau
        </button>
        <button id="pronote-download" style="padding:8px 16px;background:#8e44ad;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:13px">
          💾 Télécharger CSV
        </button>
      </div>
      ${tableHTML}
      ${legend}
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Fermer
    document.getElementById('pronote-close').addEventListener('click', () => overlay.remove());

    // Copier notes + compétences (A/B/C/D) — tab-separated pour coller dans un tableur
    document.getElementById('pronote-copy-comps').addEventListener('click', () => {
      const lines = [];
      // Données uniquement (sans en-tête, pour coller directement dans Pronote)
      sorted.forEach(s => {
        const corrected = isCorrected(s.id);
        if (!corrected) {
          lines.push(['ABS', ...comps.map(() => 'ABS')].join('\t'));
          return;
        }
        const g = globalScore(s.id);
        const note = g.total > 0 ? (Math.round(g.correct * 10) / 10).toString().replace('.', ',') : '';
        const sc = compScores(s.id);
        const levels = comps.map(c => sc[c] ? levelToLetter(sc[c].pct) : '');
        lines.push([note, ...levels].join('\t'));
      });
      navigator.clipboard.writeText(lines.join('\n')).then(() => {
        showCopyFeedback('pronote-copy-comps', 'Notes + compétences copiées !');
      });
    });

    // Copier tout le tableau
    document.getElementById('pronote-copy-all').addEventListener('click', () => {
      const lines = [];
      lines.push(['Nom', 'Classe', 'Note', ...compHeaders].join('\t'));
      sorted.forEach(s => {
        const nom = `${(s.nom || '').toUpperCase()} ${s.prenom || ''}`.trim();
        const corrected = isCorrected(s.id);
        if (!corrected) {
          lines.push([nom, classe, 'ABS', ...comps.map(() => 'ABS')].join('\t'));
          return;
        }
        const g = globalScore(s.id);
        const note = g.total > 0 ? (Math.round(g.correct * 10) / 10).toString().replace('.', ',') : '';
        const sc = compScores(s.id);
        const levels = comps.map(c => sc[c] ? levelToLetter(sc[c].pct) : '');
        lines.push([nom, classe, note, ...levels].join('\t'));
      });
      navigator.clipboard.writeText(lines.join('\n')).then(() => {
        showCopyFeedback('pronote-copy-all', 'Tableau copié !');
      });
    });

    // Télécharger CSV
    document.getElementById('pronote-download').addEventListener('click', () => {
      const sep = ';';
      const lines = [];
      lines.push(['Nom', 'Classe', 'Note', ...compHeaders].join(sep));
      sorted.forEach(s => {
        const nom = `${(s.nom || '').toUpperCase()} ${s.prenom || ''}`.trim();
        const corrected = isCorrected(s.id);
        if (!corrected) {
          lines.push([nom, classe, 'ABS', ...comps.map(() => 'ABS')].join(sep));
          return;
        }
        const g = globalScore(s.id);
        const note = g.total > 0 ? (Math.round(g.correct * 10) / 10).toString().replace('.', ',') : '';
        const sc = compScores(s.id);
        const levels = comps.map(c => sc[c] ? levelToLetter(sc[c].pct) : '');
        lines.push([nom, classe, note, ...levels].join(sep));
      });
      const BOM = '\uFEFF';
      const blob = new Blob([BOM + lines.join('\n')], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'export_pronote_competences.csv';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  function showCopyFeedback(btnId, msg) {
    const btn = document.getElementById(btnId);
    const original = btn.innerHTML;
    btn.innerHTML = `✅ ${msg}`;
    btn.style.background = '#27ae60';
    setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; }, 2000);
  }

  // Exposer globalement
  window.__exportCSVPronote = showPronoteModal;

  // --- Injection bouton ---
  let pronoteButtonInjected = false;

  function injectPronoteButton() {
    if (pronoteButtonInjected) return;
    // Chercher un bouton d'ancrage : "Bilans PDF", "Bilan classe", ou "Exporter JSON"
    const anchors = ['Bilans PDF', 'Bilan classe', 'Exporter JSON'];
    let anchorBtn = null;
    for (const text of anchors) {
      document.querySelectorAll('button').forEach(btn => {
        if (!anchorBtn && btn.textContent.includes(text)) anchorBtn = btn;
      });
      if (anchorBtn) break;
    }
    if (!anchorBtn || !anchorBtn.parentElement) return;

    // Vérifier qu'on n'a pas déjà injecté
    const existing = anchorBtn.parentElement.querySelector('[data-pronote-btn]');
    if (existing) { pronoteButtonInjected = true; return; }

    const b = document.createElement('button');
    b.className = anchorBtn.className;
    b.innerHTML = '📊 Export Pronote';
    b.title = 'Tableau de compétences à copier-coller dans Pronote';
    b.style.cssText = anchorBtn.style.cssText;
    b.setAttribute('data-pronote-btn', '1');
    b.addEventListener('click', e => { e.stopPropagation(); e.preventDefault(); showPronoteModal(); });
    // Insérer après le dernier bouton du groupe
    const parent = anchorBtn.parentElement;
    parent.appendChild(b);
    pronoteButtonInjected = true;
    console.log('✅ Bouton Export Pronote injecté');
  }

  const obs = new MutationObserver(() => { injectPronoteButton(); });
  function init() {
    const app = document.getElementById('app') || document.getElementById('appMathalea');
    if (!app) { setTimeout(init, 200); return; }
    obs.observe(app, { childList: true, subtree: true });
    // Essayer plusieurs fois avec des délais croissants
    setTimeout(injectPronoteButton, 1500);
    setTimeout(injectPronoteButton, 3000);
    setTimeout(injectPronoteButton, 5000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

// export-pronote.js — Tableau de compétences copiable pour Pronote
(function () {
  'use strict';

  function getCorr() { try { return JSON.parse(localStorage.getItem('studentCorrections')||'{}'); } catch { return {}; } }
  function getCW() { try { return JSON.parse(localStorage.getItem('competencyWeights')||'null'); } catch { return null; } }
  function getExercises() { return window.__getExercises ? window.__getExercises() : []; }
  function getStudents() { return window.__getStudentList ? window.__getStudentList() : []; }
  function normalizeComp(n) { return n ? n.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim() : n; }
  function getBilanConfig() { try { return JSON.parse(localStorage.getItem('bilanPdfConfig') || '{}'); } catch { return {}; } }
  function getPronoteMapping() { try { return JSON.parse(localStorage.getItem('pronoteCompetencesMapping') || 'null'); } catch { return null; } }

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

  // Score par compétence transversale (6 verbes)
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

  // Score par questions spécifiques (compétences Pronote détaillées)
  function pronoteQScore(sid, questions) {
    const corr = getCorr()[sid], exs = getExercises();
    if (!corr) return null;
    let earned = 0, total = 0;
    questions.forEach(({ ex: exIdx, q: qIdx }) => {
      const exercise = exs.find(e => e.exerciceIndex === exIdx);
      if (!exercise) return;
      const question = exercise.questions.find(q => q.questionIndex === qIdx);
      if (!question) return;
      const d = corr[exIdx]?.[qIdx];
      total += question.points || 1;
      if (d?.pointsObtenus !== undefined) earned += d.pointsObtenus;
      else if (d?.status === 'TB') earned += question.points || 1;
      else if (d?.status === 'TB-') earned += (question.points || 1) / 2;
    });
    return total > 0 ? { pct: earned / total * 100 } : null;
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

  function buildPreviewHTML(sorted, scores, comps, compHeaders, pronoteMap) {
    const preview5 = sorted.slice(0, 5);
    const ABSENT_SIGN = '×';
    let html = '<div style="overflow-x:auto;border:1px solid #c8d6e5;border-radius:8px;background:#f4f6f9">';
    html += '<table style="border-collapse:collapse;font-size:11px;font-family:monospace;white-space:nowrap;width:100%">';
    // En-tête
    html += '<thead><tr style="background:#dde4ed;color:#2c3e50">';
    html += '<th style="padding:4px 8px;text-align:left;border-bottom:1px solid #c8d6e5">Nom</th>';
    html += '<th style="padding:4px 8px;text-align:center;border-bottom:1px solid #c8d6e5">Note</th>';
    compHeaders.forEach((h, i) => {
      const title = pronoteMap ? pronoteMap[i].code : h;
      html += `<th style="padding:4px 6px;text-align:center;border-bottom:1px solid #c8d6e5" title="${title}">${h}</th>`;
    });
    html += '</tr></thead><tbody>';
    // Lignes
    preview5.forEach((s, i) => {
      const bg = i % 2 === 0 ? 'white' : '#f9fafc';
      const nom = `${(s.nom || '').toUpperCase()} ${s.prenom || ''}`.trim();
      const corrected = isCorrected(s.id);
      const g = globalScore(s.id);
      const note = !corrected ? ABSENT_SIGN : g.total > 0 ? (Math.round(g.correct * 10) / 10).toString().replace('.', ',') : '—';
      html += `<tr style="background:${bg}">`;
      html += `<td style="padding:3px 8px;color:#444;border-right:1px solid #e0e7ef">${nom}</td>`;
      html += `<td style="padding:3px 6px;text-align:center;font-weight:bold;border-right:1px solid #e0e7ef">${note}</td>`;
      const sc = scores[s.id];
      comps.forEach((_, idx) => {
        let cell;
        if (!corrected) {
          cell = `<span style="color:#aaa">${ABSENT_SIGN}</span>`;
        } else {
          const s2 = sc?.[idx];
          if (s2) { const l = levelToLetter(s2.pct); cell = `<span style="font-weight:bold;color:${levelToColor(l)}">${l}</span>`; }
          else cell = '<span style="color:#ccc">—</span>';
        }
        html += `<td style="padding:3px 5px;text-align:center">${cell}</td>`;
      });
      html += '</tr>';
    });
    html += '</tbody></table></div>';
    return html;
  }

  function showPronoteModal() {
    const students = getStudents();
    if (!students.length) { alert('Aucun élève trouvé.'); return; }

    const cfg = getBilanConfig();
    const classe = cfg.classe || '';
    const pronoteMap = getPronoteMapping();

    // Colonnes compétences
    let comps, compHeaders, getScore;
    if (pronoteMap) {
      comps = pronoteMap.map(m => m.code);
      // En-têtes courts : juste le code numérique (ex: "7.18") ou le verbe pour les transversales
      compHeaders = pronoteMap.map(m => {
        if (m.normKey) return COMP_LABELS[m.normKey] || m.code;
        return m.code.split(' : ')[0]; // ex: "7.18"
      });
      getScore = (sid, idx) => {
        const m = pronoteMap[idx];
        if (m.normKey) return compScores(sid)[m.normKey] || null;
        return pronoteQScore(sid, m.questions);
      };
    } else {
      // Fallback : 6 transversales
      const allComps = new Set();
      students.forEach(s => {
        if (!isCorrected(s.id)) return;
        Object.keys(compScores(s.id)).forEach(k => allComps.add(k));
      });
      if (!allComps.size) { alert('Aucune correction trouvée.'); return; }
      const compOrder = ['chercher', 'modeliser', 'representer', 'raisonner', 'calculer', 'communiquer'];
      comps = compOrder.filter(c => allComps.has(c));
      allComps.forEach(c => { if (!comps.includes(c)) comps.push(c); });
      compHeaders = comps.map(c => COMP_LABELS[c] || c.charAt(0).toUpperCase() + c.slice(1));
      getScore = (sid, idx) => compScores(sid)[comps[idx]] || null;
    }

    if (!pronoteMap && !comps.length) { alert('Aucune correction trouvée.'); return; }

    const sorted = [...students]
      .filter(s => (s.nom && s.nom.trim()) || (s.prenom && s.prenom.trim()))
      .sort((a, b) => (a.nom || '').toUpperCase().localeCompare((b.nom || '').toUpperCase(), 'fr'));

    // Pré-calcul des scores
    const scores = {};
    sorted.forEach(s => {
      if (!isCorrected(s.id)) { scores[s.id] = null; return; }
      scores[s.id] = comps.map((_, idx) => getScore(s.id, idx));
    });

    // Construction du tableau HTML
    let tableHTML = '<table id="pronote-table" style="border-collapse:collapse;width:100%;font-size:13px;font-family:Arial,sans-serif">';
    tableHTML += '<thead><tr style="background:#2c3e50;color:white">';
    tableHTML += '<th style="padding:6px 10px;text-align:left;border:1px solid #34495e;white-space:nowrap">Nom</th>';
    tableHTML += '<th style="padding:6px 10px;text-align:center;border:1px solid #34495e">Classe</th>';
    tableHTML += '<th style="padding:6px 10px;text-align:center;border:1px solid #34495e">Note</th>';
    compHeaders.forEach((h, i) => {
      const title = pronoteMap ? pronoteMap[i].code : h;
      tableHTML += `<th style="padding:6px 8px;text-align:center;border:1px solid #34495e;white-space:nowrap" title="${title}">${h}</th>`;
    });
    tableHTML += '</tr></thead><tbody>';

    sorted.forEach((s, i) => {
      const bg = i % 2 === 0 ? '#fff' : '#f8f9fa';
      const nom = `${(s.nom || '').toUpperCase()} ${s.prenom || ''}`.trim();
      const corrected = isCorrected(s.id);
      const g = globalScore(s.id);
      let noteText = '';
      if (!corrected) noteText = '<span style="color:#999">ABS</span>';
      else if (g.total > 0) noteText = `<span style="font-weight:600">${(Math.round(g.correct * 10) / 10).toString().replace('.', ',')}</span>`;

      tableHTML += `<tr style="background:${bg}">`;
      tableHTML += `<td style="padding:5px 8px;border:1px solid #dee2e6;font-weight:500;white-space:nowrap">${nom}</td>`;
      tableHTML += `<td style="padding:5px 8px;border:1px solid #dee2e6;text-align:center">${classe}</td>`;
      tableHTML += `<td style="padding:5px 8px;border:1px solid #dee2e6;text-align:center">${noteText}</td>`;

      const sc = scores[s.id];
      comps.forEach((_, idx) => {
        if (!corrected) {
          tableHTML += '<td style="padding:5px 8px;border:1px solid #dee2e6;text-align:center;color:#999">ABS</td>';
        } else {
          const s2 = sc?.[idx];
          if (s2) {
            const letter = levelToLetter(s2.pct);
            const color = levelToColor(letter);
            tableHTML += `<td style="padding:5px 8px;border:1px solid #dee2e6;text-align:center;font-weight:bold;color:${color}">${letter}</td>`;
          } else {
            tableHTML += '<td style="padding:5px 8px;border:1px solid #dee2e6;text-align:center;color:#bbb">—</td>';
          }
        }
      });
      tableHTML += '</tr>';
    });
    tableHTML += '</tbody></table>';

    const legend = `<div style="margin-top:12px;font-size:12px;color:#666;display:flex;gap:16px;flex-wrap:wrap">
      <span><b style="color:#28a745">A</b> ≥ 75%</span>
      <span><b style="color:#17a2b8">B</b> ≥ 50%</span>
      <span><b style="color:#ffc107">C</b> ≥ 25%</span>
      <span><b style="color:#dc3545">D</b> &lt; 25%</span>
      <span style="color:#bbb">— = question non évaluée</span>
    </div>`;

    const overlay = document.createElement('div');
    overlay.id = 'pronote-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:10000;display:flex;align-items:center;justify-content:center';
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

    const modal = document.createElement('div');
    modal.style.cssText = 'background:white;border-radius:12px;padding:24px;max-width:95vw;max-height:88vh;overflow:auto;box-shadow:0 20px 60px rgba(0,0,0,0.3)';

    modal.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h2 style="margin:0;font-size:18px;color:#2c3e50">📊 Export Pronote — ${pronoteMap ? '20 compétences' : 'Compétences'}</h2>
        <button id="pronote-close" style="background:none;border:none;font-size:24px;cursor:pointer;color:#999;padding:4px 8px">&times;</button>
      </div>
      <p style="margin:0 0 10px;color:#666;font-size:13px">
        Survolez les en-têtes pour voir le nom complet de chaque compétence. Les absents sont marqués <b>×</b> (format Pronote).
      </p>
      <div style="margin-bottom:14px">
        <p style="margin:0 0 5px;font-size:12px;font-weight:600;color:#555">👁 Aperçu — ce qui sera collé dans Pronote (5 premiers élèves)</p>
        ${buildPreviewHTML(sorted, scores, comps, compHeaders, pronoteMap)}
      </div>
      <div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">
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
    document.getElementById('pronote-close').addEventListener('click', () => overlay.remove());

    document.getElementById('pronote-copy-comps').addEventListener('click', () => {
      const lines = [];
      sorted.forEach(s => {
        const corrected = isCorrected(s.id);
        if (!corrected) { lines.push(['×', ...comps.map(() => '×')].join('\t')); return; }
        const g = globalScore(s.id);
        const note = g.total > 0 ? (Math.round(g.correct * 10) / 10).toString().replace('.', ',') : '';
        const sc = scores[s.id];
        const levels = comps.map((_, idx) => { const s2 = sc?.[idx]; return s2 ? levelToLetter(s2.pct) : ''; });
        lines.push([note, ...levels].join('\t'));
      });
      navigator.clipboard.writeText(lines.join('\n')).then(() => showCopyFeedback('pronote-copy-comps', 'Notes + compétences copiées !'));
    });

    document.getElementById('pronote-copy-all').addEventListener('click', () => {
      const lines = [];
      lines.push(['Nom', 'Classe', 'Note', ...compHeaders].join('\t'));
      sorted.forEach(s => {
        const nom = `${(s.nom || '').toUpperCase()} ${s.prenom || ''}`.trim();
        const corrected = isCorrected(s.id);
        if (!corrected) { lines.push([nom, classe, '×', ...comps.map(() => '×')].join('\t')); return; }
        const g = globalScore(s.id);
        const note = g.total > 0 ? (Math.round(g.correct * 10) / 10).toString().replace('.', ',') : '';
        const sc = scores[s.id];
        const levels = comps.map((_, idx) => { const s2 = sc?.[idx]; return s2 ? levelToLetter(s2.pct) : ''; });
        lines.push([nom, classe, note, ...levels].join('\t'));
      });
      navigator.clipboard.writeText(lines.join('\n')).then(() => showCopyFeedback('pronote-copy-all', 'Tableau copié !'));
    });

    document.getElementById('pronote-download').addEventListener('click', () => {
      const sep = ';';
      const lines = [];
      lines.push(['Nom', 'Classe', 'Note', ...compHeaders].join(sep));
      sorted.forEach(s => {
        const nom = `${(s.nom || '').toUpperCase()} ${s.prenom || ''}`.trim();
        const corrected = isCorrected(s.id);
        if (!corrected) { lines.push([nom, classe, '×', ...comps.map(() => '×')].join(sep)); return; }
        const g = globalScore(s.id);
        const note = g.total > 0 ? (Math.round(g.correct * 10) / 10).toString().replace('.', ',') : '';
        const sc = scores[s.id];
        const levels = comps.map((_, idx) => { const s2 = sc?.[idx]; return s2 ? levelToLetter(s2.pct) : ''; });
        lines.push([nom, classe, note, ...levels].join(sep));
      });
      const blob = new Blob(['﻿' + lines.join('\n')], { type: 'text/csv;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'export_pronote_competences.csv';
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  function showCopyFeedback(btnId, msg) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    const original = btn.innerHTML;
    btn.innerHTML = `✅ ${msg}`;
    btn.style.background = '#27ae60';
    setTimeout(() => { btn.innerHTML = original; btn.style.background = ''; }, 2000);
  }

  window.__exportCSVPronote = showPronoteModal;

  let pronoteButtonInjected = false;

  function injectPronoteButton() {
    if (pronoteButtonInjected) return;
    const anchors = ['Bilans PDF', 'Bilan classe', 'Exporter JSON'];
    let anchorBtn = null;
    for (const text of anchors) {
      document.querySelectorAll('button').forEach(btn => {
        if (!anchorBtn && btn.textContent.includes(text)) anchorBtn = btn;
      });
      if (anchorBtn) break;
    }
    if (!anchorBtn || !anchorBtn.parentElement) return;
    const existing = anchorBtn.parentElement.querySelector('[data-pronote-btn]');
    if (existing) { pronoteButtonInjected = true; return; }

    const b = document.createElement('button');
    b.className = anchorBtn.className;
    b.innerHTML = '📊 Export Pronote';
    b.title = 'Tableau de compétences à copier-coller dans Pronote';
    b.style.cssText = anchorBtn.style.cssText;
    b.setAttribute('data-pronote-btn', '1');
    b.addEventListener('click', e => { e.stopPropagation(); e.preventDefault(); showPronoteModal(); });
    anchorBtn.parentElement.appendChild(b);
    pronoteButtonInjected = true;
    console.log('✅ Bouton Export Pronote injecté');
  }

  const obs = new MutationObserver(() => { injectPronoteButton(); });
  function init() {
    const app = document.getElementById('app') || document.getElementById('appMathalea');
    if (!app) { setTimeout(init, 200); return; }
    obs.observe(app, { childList: true, subtree: true });
    setTimeout(injectPronoteButton, 1500);
    setTimeout(injectPronoteButton, 3000);
    setTimeout(injectPronoteButton, 5000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

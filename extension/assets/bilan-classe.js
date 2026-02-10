// bilan-classe.js — Bilan de classe : vue HTML + export PDF jsPDF
(function () {
  'use strict';
  if (!new URLSearchParams(window.location.search).get('v')?.includes('correction')) return;

  const jspdfScript = document.createElement('script');
  jspdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
  document.head.appendChild(jspdfScript);

  const CONFIG_KEY = 'bilanConfig';
  const C = {
    primary: [41, 128, 185], success: [39, 174, 96], warning: [230, 126, 34],
    danger: [231, 76, 60], dark: [44, 62, 80], light: [236, 240, 241], white: [255, 255, 255]
  };
  const hex = rgb => '#' + rgb.map(v => v.toString(16).padStart(2, '0')).join('');
  const SEUIL_TBM = 90, SEUIL_MS = 70, SEUIL_MF = 30;
  const compColorMap = {
    modeliser: [155, 89, 182], calculer: [52, 152, 219], raisonner: [46, 204, 113],
    communiquer: [230, 126, 34], representer: [231, 76, 60], chercher: [241, 196, 15],
  };
  const compEmojiMap = {
    modeliser: '🏗️', calculer: '🧮', raisonner: '🧩', communiquer: '💬', representer: '🎨', chercher: '🔍',
  };
  function compColor(k) { return compColorMap[k] || C.primary; }
  function normalizeComp(n) { return n ? n.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim() : n; }
  function niceComp(k) {
    return { modeliser: 'Modéliser', calculer: 'Calculer', raisonner: 'Raisonner', communiquer: 'Communiquer', representer: 'Représenter', chercher: 'Chercher' }[k] || k.charAt(0).toUpperCase() + k.slice(1);
  }
  function levelFromPct(p) {
    if (p >= SEUIL_TBM) return { code: 'TBM', label: 'Très Bonne Maîtrise', color: C.success };
    if (p >= SEUIL_MS) return { code: 'MS', label: 'Maîtrise Satisfaisante', color: C.primary };
    if (p >= SEUIL_MF) return { code: 'MF', label: 'Maîtrise Fragile', color: C.warning };
    return { code: 'MI', label: 'Maîtrise Insuffisante', color: C.danger };
  }
  function fmt(n) { return n % 1 === 0 ? String(n) : n.toFixed(1); }

  // --- Data access ---
  function getConfig() { try { return JSON.parse(localStorage.getItem(CONFIG_KEY) || '{}'); } catch { return {}; } }
  function getCorr() { try { return JSON.parse(localStorage.getItem('studentCorrections') || '{}'); } catch { return {}; } }
  function getCW() { try { return JSON.parse(localStorage.getItem('competencyWeights') || 'null'); } catch { return null; } }
  function getExercises() { return window.__getExercises ? window.__getExercises() : []; }
  function getStudents() { return window.__getStudentList ? window.__getStudentList() : []; }

  // --- Scoring (same logic as bilan-pdf.js) ---
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

  function exScore(sid, i) {
    const corr = getCorr()[sid], ex = getExercises()[i];
    if (!corr || !ex) return { o: 0, t: 0 };
    let o = 0, t = 0;
    ex.questions.forEach(q => {
      const d = corr[ex.exerciceIndex]?.[q.questionIndex];
      t += q.points;
      if (d?.pointsObtenus !== undefined) o += d.pointsObtenus;
      else if (d?.status === 'TB') o += q.points;
      else if (d?.status === 'TB-') o += q.points / 2;
    });
    return { o, t };
  }

  function exClassScore(exIdx) {
    const students = getStudents();
    let sumPct = 0, n = 0;
    students.forEach(s => {
      if (!isCorrected(s.id)) return;
      const sc = exScore(s.id, exIdx);
      if (sc.t > 0) { sumPct += (sc.o / sc.t) * 100; n++; }
    });
    return n > 0 ? { pct: sumPct / n, n } : { pct: 0, n: 0 };
  }

  function compScores(sid) {
    const corr = getCorr()[sid], exs = getExercises(), cw = getCW(), we = {};
    if (!corr) return {};
    exs.forEach(ex => ex.questions.forEach(q => {
      const d = corr[ex.exerciceIndex]?.[q.questionIndex];
      if (d?.status) {
        const pts = q.points || 1;
        let earned = d.status === 'TB' ? pts : d.status === 'TB-' ? pts / 2 : 0;
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
    Object.keys(we).forEach(k => { const c = we[k].c, t = we[k].t; if (t > 0) { const p = c / t * 100; r[k] = { correct: Math.round(c * 10) / 10, total: Math.round(t * 10) / 10, pct: p, lvl: levelFromPct(p) }; } });
    return r;
  }

  function isCorrected(sid) {
    const c = getCorr()[sid];
    return c ? Object.keys(c).some(k => k !== 'commentaire' && Object.keys(c[k]).length > 0) : false;
  }

  function classStats() {
    const scores = [];
    getStudents().forEach(s => { if (!isCorrected(s.id)) return; const g = globalScore(s.id); if (g.total > 0) scores.push(g.correct); });
    if (!scores.length) return null;
    scores.sort((a, b) => a - b);
    const sum = scores.reduce((a, b) => a + b, 0);
    const med = scores.length % 2 === 0 ? (scores[scores.length / 2 - 1] + scores[scores.length / 2]) / 2 : scores[Math.floor(scores.length / 2)];
    return { n: scores.length, avg: Math.round(sum / scores.length * 10) / 10, min: scores[0], max: scores[scores.length - 1], med: Math.round(med * 10) / 10, total: globalScore(getStudents().find(s => isCorrected(s.id)).id).total, scores };
  }

  function classCompAvgs() {
    const a = {};
    getStudents().forEach(s => { if (!isCorrected(s.id)) return; const sc = compScores(s.id); Object.keys(sc).forEach(k => { if (!a[k]) a[k] = { s: 0, n: 0 }; a[k].s += sc[k].pct; a[k].n++; }); });
    return a;
  }

  function scoreDistribution(stats) {
    if (!stats || !stats.scores || !stats.total) return null;
    const total = stats.total, nbBins = 5, binSize = total / nbBins;
    const bins = new Array(nbBins).fill(0), labels = [];
    for (let i = 0; i < nbBins; i++) labels.push(`${fmt(Math.round(binSize * i))}-${fmt(Math.round(binSize * (i + 1)))}`);
    stats.scores.forEach(s => { bins[Math.min(nbBins - 1, Math.floor(s / binSize))]++; });
    return { bins, labels, max: Math.max(...bins) };
  }

  // --- Level counts ---
  function levelCounts() {
    const counts = { TBM: 0, MS: 0, MF: 0, MI: 0 };
    getStudents().forEach(s => {
      if (!isCorrected(s.id)) return;
      const g = globalScore(s.id);
      if (g.total > 0) { const lvl = levelFromPct(g.correct / g.total * 100); counts[lvl.code]++; }
    });
    return counts;
  }

  // --- Student rows for table ---
  function studentRows() {
    const exs = getExercises();
    const rows = [];
    getStudents().forEach(s => {
      if (!isCorrected(s.id)) return;
      const g = globalScore(s.id);
      const pct = g.total > 0 ? g.correct / g.total * 100 : 0;
      const lvl = levelFromPct(pct);
      const sur20 = g.total > 0 ? Math.round(g.correct / g.total * 20 * 10) / 10 : 0;
      const comps = compScores(s.id);
      rows.push({ id: s.id, nom: s.nom || '', prenom: s.prenom || '', score: g.correct, total: g.total, sur20, pct, lvl, comps });
    });
    rows.sort((a, b) => b.score - a.score);
    rows.forEach((r, i) => r.rang = i + 1);
    return rows;
  }

  // ===================== HTML Panel =====================
  function showHTMLPanel() {
    const cfg = getConfig();
    const stats = classStats();
    if (!stats) { alert('Aucun élève corrigé.'); return; }
    const dist = scoreDistribution(stats);
    const cAvg = classCompAvgs();
    const compKeys = Object.keys(cAvg);
    const exs = getExercises();
    const lvlC = levelCounts();
    const rows = studentRows();
    const date = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    const titre = cfg.titre || 'Évaluation';
    const classe = cfg.classe || '';
    const totalStudents = getStudents().length;
    const avgSur20 = stats.total > 0 ? Math.round(stats.avg / stats.total * 20 * 10) / 10 : 0;

    const overlay = document.createElement('div');
    overlay.id = 'bilan-classe-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.6);z-index:10000;display:flex;align-items:center;justify-content:center;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif';

    const panel = document.createElement('div');
    panel.style.cssText = 'background:#fff;width:95vw;max-width:900px;height:90vh;border-radius:12px;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,.4);position:relative';

    // Exercise success data
    const exData = exs.map((ex, i) => {
      const cs = exClassScore(i);
      const cw = getCW();
      let exComps = [];
      const w = cw?.[ex.exerciceIndex];
      if (w) exComps = Object.keys(w).map(c => normalizeComp(c));
      else if (ex.competencesExercice) exComps = ex.competencesExercice.map(c => normalizeComp(c));
      return { idx: i, titre: ex.titre || `Exercice ${i + 1}`, totalPts: ex.questions.reduce((s, q) => s + q.points, 0), pct: cs.pct, lvl: levelFromPct(cs.pct), comps: exComps };
    });

    // Acquis analysis
    const acquis = exData.filter(e => e.pct >= 70);
    const renforcer = exData.filter(e => e.pct >= 30 && e.pct < 70);
    const nonAcquis = exData.filter(e => e.pct < 30);

    // Histogram HTML (canvas)
    const histId = 'bc-hist-' + Date.now();
    const compBarId = 'bc-comp-' + Date.now();

    panel.innerHTML = `
      <!-- Header -->
      <div style="background:${hex(C.primary)};color:#fff;padding:20px 24px;border-radius:12px 12px 0 0;position:sticky;top:0;z-index:1;display:flex;justify-content:space-between;align-items:center">
        <div>
          <h2 style="margin:0;font-size:20px">📊 BILAN DE CLASSE — Mathématiques</h2>
          <p style="margin:4px 0 0;font-size:13px;opacity:.85">${titre}${classe ? ' — ' + classe : ''} • ${date} • ${stats.n} corrigés / ${totalStudents} élèves</p>
        </div>
        <div style="display:flex;gap:8px">
          <button id="bc-export-pdf" style="padding:8px 16px;background:rgba(255,255,255,.2);color:#fff;border:1px solid rgba(255,255,255,.4);border-radius:6px;cursor:pointer;font-size:13px;font-weight:600">📥 Exporter PDF</button>
          <button id="bc-close" style="padding:8px 14px;background:rgba(255,255,255,.15);color:#fff;border:1px solid rgba(255,255,255,.3);border-radius:6px;cursor:pointer;font-size:16px">✕</button>
        </div>
      </div>

      <div style="padding:20px 24px">

        <!-- Stats globales -->
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:12px;margin-bottom:20px">
          <div style="background:${hex(C.primary)};color:#fff;padding:14px;border-radius:8px;text-align:center">
            <div style="font-size:24px;font-weight:700">${fmt(stats.avg)}/${stats.total}</div>
            <div style="font-size:11px;opacity:.8;margin-top:2px">Moyenne (${fmt(avgSur20)}/20)</div>
          </div>
          <div style="background:${hex(C.light)};padding:14px;border-radius:8px;text-align:center">
            <div style="font-size:24px;font-weight:700;color:${hex(C.dark)}">${fmt(stats.med)}</div>
            <div style="font-size:11px;color:#888;margin-top:2px">Médiane</div>
          </div>
          <div style="background:${hex(C.light)};padding:14px;border-radius:8px;text-align:center">
            <div style="font-size:24px;font-weight:700;color:${hex(C.danger)}">${fmt(stats.min)}</div>
            <div style="font-size:11px;color:#888;margin-top:2px">Minimum</div>
          </div>
          <div style="background:${hex(C.light)};padding:14px;border-radius:8px;text-align:center">
            <div style="font-size:24px;font-weight:700;color:${hex(C.success)}">${fmt(stats.max)}</div>
            <div style="font-size:11px;color:#888;margin-top:2px">Maximum</div>
          </div>
        </div>

        <!-- Niveaux -->
        <div style="display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap">
          <div style="flex:1;min-width:100px;padding:10px 14px;border-radius:8px;background:${hex(C.success)}22;border:2px solid ${hex(C.success)};text-align:center">
            <div style="font-size:22px;font-weight:700;color:${hex(C.success)}">${lvlC.TBM}</div>
            <div style="font-size:11px;color:${hex(C.success)};font-weight:600">TBM</div>
          </div>
          <div style="flex:1;min-width:100px;padding:10px 14px;border-radius:8px;background:${hex(C.primary)}22;border:2px solid ${hex(C.primary)};text-align:center">
            <div style="font-size:22px;font-weight:700;color:${hex(C.primary)}">${lvlC.MS}</div>
            <div style="font-size:11px;color:${hex(C.primary)};font-weight:600">MS</div>
          </div>
          <div style="flex:1;min-width:100px;padding:10px 14px;border-radius:8px;background:${hex(C.warning)}22;border:2px solid ${hex(C.warning)};text-align:center">
            <div style="font-size:22px;font-weight:700;color:${hex(C.warning)}">${lvlC.MF}</div>
            <div style="font-size:11px;color:${hex(C.warning)};font-weight:600">MF</div>
          </div>
          <div style="flex:1;min-width:100px;padding:10px 14px;border-radius:8px;background:${hex(C.danger)}22;border:2px solid ${hex(C.danger)};text-align:center">
            <div style="font-size:22px;font-weight:700;color:${hex(C.danger)}">${lvlC.MI}</div>
            <div style="font-size:11px;color:${hex(C.danger)};font-weight:600">MI</div>
          </div>
        </div>

        <!-- Histogramme + Compétences -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:20px">
          <div style="background:${hex(C.light)};border-radius:8px;padding:16px">
            <h3 style="margin:0 0 12px;font-size:14px;color:${hex(C.dark)}">Répartition des notes</h3>
            <canvas id="${histId}" width="400" height="200" style="width:100%;height:auto"></canvas>
          </div>
          <div style="background:${hex(C.light)};border-radius:8px;padding:16px">
            <h3 style="margin:0 0 12px;font-size:14px;color:${hex(C.dark)}">Compétences de la classe</h3>
            <div id="${compBarId}"></div>
          </div>
        </div>

        <!-- Exercices -->
        <h3 style="margin:0 0 10px;font-size:15px;color:${hex(C.dark)}">Taux de réussite par exercice</h3>
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;font-size:13px">
          <thead>
            <tr style="background:${hex(C.dark)};color:#fff">
              <th style="padding:8px 10px;text-align:left;border-radius:6px 0 0 0">#</th>
              <th style="padding:8px 10px;text-align:left">Exercice</th>
              <th style="padding:8px 10px;text-align:center">Points</th>
              <th style="padding:8px 10px;text-align:left;width:35%">Réussite classe</th>
              <th style="padding:8px 10px;text-align:center">Niveau</th>
              <th style="padding:8px 10px;text-align:center;border-radius:0 6px 0 0">Compétences</th>
            </tr>
          </thead>
          <tbody>
            ${exData.map((e, i) => `
              <tr style="background:${i % 2 === 0 ? '#f8f9fa' : '#fff'}">
                <td style="padding:7px 10px;font-weight:600">${e.idx + 1}</td>
                <td style="padding:7px 10px">${e.titre}</td>
                <td style="padding:7px 10px;text-align:center">${e.totalPts}</td>
                <td style="padding:7px 10px">
                  <div style="display:flex;align-items:center;gap:8px">
                    <div style="flex:1;background:#ddd;border-radius:4px;height:14px;overflow:hidden">
                      <div style="width:${Math.round(e.pct)}%;height:100%;background:${hex(e.lvl.color)};border-radius:4px;transition:width .3s"></div>
                    </div>
                    <span style="font-weight:600;font-size:12px;min-width:35px;text-align:right">${Math.round(e.pct)}%</span>
                  </div>
                </td>
                <td style="padding:7px 10px;text-align:center"><span style="background:${hex(e.lvl.color)};color:#fff;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600">${e.lvl.code}</span></td>
                <td style="padding:7px 10px;text-align:center">${e.comps.map(k => `<span style="display:inline-block;margin:1px;padding:1px 6px;border-radius:3px;font-size:10px;background:${hex(compColor(k))}22;color:${hex(compColor(k))};font-weight:600">${compEmojiMap[k] || ''} ${niceComp(k)}</span>`).join(' ')}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <!-- Acquis / Non-acquis -->
        <h3 style="margin:0 0 10px;font-size:15px;color:${hex(C.dark)}">Analyse des acquis</h3>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:20px">
          <div style="background:${hex(C.success)}15;border:2px solid ${hex(C.success)};border-radius:8px;padding:14px">
            <h4 style="margin:0 0 8px;font-size:13px;color:${hex(C.success)}">✅ Acquis (≥70%)</h4>
            ${acquis.length ? acquis.map(e => `<div style="padding:4px 0;font-size:12px;color:${hex(C.dark)}"><strong>Ex ${e.idx + 1}</strong> — ${e.titre} <span style="color:${hex(C.success)};font-weight:600">(${Math.round(e.pct)}%)</span></div>`).join('') : '<div style="font-size:12px;color:#999;font-style:italic">Aucun</div>'}
          </div>
          <div style="background:${hex(C.warning)}15;border:2px solid ${hex(C.warning)};border-radius:8px;padding:14px">
            <h4 style="margin:0 0 8px;font-size:13px;color:${hex(C.warning)}">⚠️ À renforcer (30-70%)</h4>
            ${renforcer.length ? renforcer.map(e => `<div style="padding:4px 0;font-size:12px;color:${hex(C.dark)}"><strong>Ex ${e.idx + 1}</strong> — ${e.titre} <span style="color:${hex(C.warning)};font-weight:600">(${Math.round(e.pct)}%)</span></div>`).join('') : '<div style="font-size:12px;color:#999;font-style:italic">Aucun</div>'}
          </div>
          <div style="background:${hex(C.danger)}15;border:2px solid ${hex(C.danger)};border-radius:8px;padding:14px">
            <h4 style="margin:0 0 8px;font-size:13px;color:${hex(C.danger)}">❌ Non acquis (<30%)</h4>
            ${nonAcquis.length ? nonAcquis.map(e => `<div style="padding:4px 0;font-size:12px;color:${hex(C.dark)}"><strong>Ex ${e.idx + 1}</strong> — ${e.titre} <span style="color:${hex(C.danger)};font-weight:600">(${Math.round(e.pct)}%)</span></div>`).join('') : '<div style="font-size:12px;color:#999;font-style:italic">Aucun</div>'}
          </div>
        </div>

        <!-- Tableau élèves -->
        <h3 style="margin:0 0 10px;font-size:15px;color:${hex(C.dark)}">Récapitulatif par élève</h3>
        <table style="width:100%;border-collapse:collapse;font-size:12px">
          <thead>
            <tr style="background:${hex(C.dark)};color:#fff">
              <th style="padding:7px 8px;text-align:center;border-radius:6px 0 0 0">#</th>
              <th style="padding:7px 8px;text-align:left">Nom Prénom</th>
              <th style="padding:7px 8px;text-align:center">Note</th>
              <th style="padding:7px 8px;text-align:center">/20</th>
              <th style="padding:7px 8px;text-align:center">Niveau</th>
              ${compKeys.map(k => `<th style="padding:7px 4px;text-align:center;font-size:10px">${compEmojiMap[k] || ''}<br>${niceComp(k)}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${rows.map((r, i) => `
              <tr style="background:${i % 2 === 0 ? '#f8f9fa' : '#fff'}">
                <td style="padding:6px 8px;text-align:center;font-weight:600;color:#888">${r.rang}</td>
                <td style="padding:6px 8px;font-weight:500">${r.nom} ${r.prenom}</td>
                <td style="padding:6px 8px;text-align:center;font-weight:600">${fmt(r.score)}/${r.total}</td>
                <td style="padding:6px 8px;text-align:center">${fmt(r.sur20)}</td>
                <td style="padding:6px 8px;text-align:center"><span style="background:${hex(r.lvl.color)};color:#fff;padding:2px 8px;border-radius:4px;font-size:11px;font-weight:600">${r.lvl.code}</span></td>
                ${compKeys.map(k => {
                  const sc = r.comps[k];
                  if (!sc) return '<td style="padding:6px 4px;text-align:center;color:#ccc">—</td>';
                  return `<td style="padding:6px 4px;text-align:center"><span style="background:${hex(sc.lvl.color)}22;color:${hex(sc.lvl.color)};padding:2px 6px;border-radius:3px;font-size:10px;font-weight:600">${sc.lvl.code}</span></td>`;
                }).join('')}
              </tr>
            `).join('')}
            <tr style="background:${hex(C.dark)};color:#fff;font-weight:700">
              <td style="padding:8px" colspan="2">Moyenne</td>
              <td style="padding:8px;text-align:center">${fmt(stats.avg)}/${stats.total}</td>
              <td style="padding:8px;text-align:center">${fmt(avgSur20)}</td>
              <td style="padding:8px;text-align:center">${levelFromPct(stats.avg / stats.total * 100).code}</td>
              ${compKeys.map(k => {
                const avg = Math.round(cAvg[k].s / cAvg[k].n);
                return `<td style="padding:8px;text-align:center;font-size:10px">${avg}%</td>`;
              }).join('')}
            </tr>
          </tbody>
        </table>
      </div>
    `;

    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    // Close
    panel.querySelector('#bc-close').addEventListener('click', () => overlay.remove());
    overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });

    // Export PDF
    panel.querySelector('#bc-export-pdf').addEventListener('click', () => generateClassPDF());

    // Draw histogram canvas
    requestAnimationFrame(() => {
      drawHistogram(histId, dist);
      drawCompBars(compBarId, cAvg, compKeys);
    });
  }

  function drawHistogram(canvasId, dist) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || !dist) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const pad = { top: 10, bottom: 30, left: 10, right: 10 };
    const nbBins = dist.bins.length;
    const barGap = 8;
    const barW = (W - pad.left - pad.right - (nbBins - 1) * barGap) / nbBins;
    const maxH = H - pad.top - pad.bottom;

    ctx.clearRect(0, 0, W, H);

    for (let i = 0; i < nbBins; i++) {
      const x = pad.left + i * (barW + barGap);
      const h = dist.max > 0 ? (dist.bins[i] / dist.max) * maxH : 0;
      const midPct = ((i + 0.5) / nbBins) * 100;
      const color = hex(levelFromPct(midPct).color);

      // Bar
      ctx.fillStyle = color;
      ctx.beginPath();
      const r = 4;
      const by = H - pad.bottom - h;
      if (h > r * 2) {
        ctx.moveTo(x + r, by); ctx.lineTo(x + barW - r, by);
        ctx.quadraticCurveTo(x + barW, by, x + barW, by + r);
        ctx.lineTo(x + barW, H - pad.bottom); ctx.lineTo(x, H - pad.bottom);
        ctx.lineTo(x, by + r); ctx.quadraticCurveTo(x, by, x + r, by);
      } else if (h > 0) {
        ctx.rect(x, by, barW, h);
      }
      ctx.fill();

      // Count above bar
      if (dist.bins[i] > 0) {
        ctx.fillStyle = hex(C.dark);
        ctx.font = 'bold 13px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(String(dist.bins[i]), x + barW / 2, by - 4);
      }

      // Label below
      ctx.fillStyle = '#888';
      ctx.font = '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(dist.labels[i], x + barW / 2, H - pad.bottom + 16);
    }
  }

  function drawCompBars(containerId, cAvg, compKeys) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = compKeys.map(k => {
      const avg = Math.round(cAvg[k].s / cAvg[k].n);
      const lvl = levelFromPct(avg);
      return `
        <div style="margin-bottom:8px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:3px">
            <span style="font-size:12px;font-weight:600;color:${hex(compColor(k))}">${compEmojiMap[k] || ''} ${niceComp(k)}</span>
            <span style="font-size:11px;font-weight:700;color:${hex(lvl.color)}">${lvl.code} ${avg}%</span>
          </div>
          <div style="background:#ddd;border-radius:4px;height:12px;overflow:hidden">
            <div style="width:${avg}%;height:100%;background:${hex(compColor(k))};border-radius:4px"></div>
          </div>
        </div>`;
    }).join('');
  }

  // ===================== PDF Export =====================
  function generateClassPDF() {
    if (!window.jspdf) { alert('jsPDF non chargé.'); return; }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const PW = 210, PH = 297, M = 12, W = PW - 2 * M;
    const cfg = getConfig();
    const stats = classStats();
    if (!stats) return;
    const dist = scoreDistribution(stats);
    const cAvg = classCompAvgs();
    const compKeys = Object.keys(cAvg);
    const exs = getExercises();
    const lvlC = levelCounts();
    const rows = studentRows();
    const date = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    const titre = cfg.titre || 'Évaluation';
    const classe = cfg.classe || '';
    const totalStudents = getStudents().length;
    const avgSur20 = stats.total > 0 ? Math.round(stats.avg / stats.total * 20 * 10) / 10 : 0;

    let y = 0;

    // === PAGE 1 ===

    // En-tête
    doc.setFillColor(...C.primary);
    doc.rect(0, 0, PW, 18, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14); doc.setFont('helvetica', 'bold');
    doc.text('BILAN DE CLASSE — Mathématiques', PW / 2, 8, { align: 'center' });
    doc.setFontSize(9); doc.setFont('helvetica', 'normal');
    doc.text(`${titre}${classe ? ' — ' + classe : ''} • ${date} • ${stats.n} corrigés / ${totalStudents} élèves`, PW / 2, 14.5, { align: 'center' });
    y = 24;

    // Stats globales
    doc.setFontSize(9); doc.setFont('helvetica', 'bold'); doc.setTextColor(...C.dark);
    doc.text('STATISTIQUES GLOBALES', M, y);
    y += 4;

    const boxW = (W - 9) / 4, boxH = 16;
    const statBoxes = [
      { label: `Moyenne (${fmt(avgSur20)}/20)`, val: `${fmt(stats.avg)}/${stats.total}`, color: C.primary },
      { label: 'Médiane', val: fmt(stats.med), color: C.dark },
      { label: 'Minimum', val: fmt(stats.min), color: C.danger },
      { label: 'Maximum', val: fmt(stats.max), color: C.success },
    ];
    statBoxes.forEach((b, i) => {
      const bx = M + i * (boxW + 3);
      doc.setFillColor(...C.light);
      doc.roundedRect(bx, y, boxW, boxH, 2, 2, 'F');
      doc.setFontSize(14); doc.setFont('helvetica', 'bold'); doc.setTextColor(...b.color);
      doc.text(b.val, bx + boxW / 2, y + 7.5, { align: 'center' });
      doc.setFontSize(6.5); doc.setFont('helvetica', 'normal'); doc.setTextColor(120, 120, 120);
      doc.text(b.label, bx + boxW / 2, y + 13, { align: 'center' });
    });
    y += boxH + 4;

    // Niveaux
    const lvlBoxW = (W - 9) / 4;
    const levels = [
      { code: 'TBM', count: lvlC.TBM, color: C.success },
      { code: 'MS', count: lvlC.MS, color: C.primary },
      { code: 'MF', count: lvlC.MF, color: C.warning },
      { code: 'MI', count: lvlC.MI, color: C.danger },
    ];
    levels.forEach((lv, i) => {
      const bx = M + i * (lvlBoxW + 3);
      doc.setDrawColor(...lv.color);
      doc.setLineWidth(0.5);
      doc.roundedRect(bx, y, lvlBoxW, 12, 2, 2, 'S');
      doc.setFontSize(14); doc.setFont('helvetica', 'bold'); doc.setTextColor(...lv.color);
      doc.text(String(lv.count), bx + lvlBoxW / 2, y + 6, { align: 'center' });
      doc.setFontSize(7); doc.setFont('helvetica', 'bold');
      doc.text(lv.code, bx + lvlBoxW / 2, y + 10.5, { align: 'center' });
    });
    y += 16;

    // Histogramme
    doc.setFontSize(9); doc.setFont('helvetica', 'bold'); doc.setTextColor(...C.dark);
    doc.text('RÉPARTITION DES NOTES', M, y);
    y += 4;

    if (dist && dist.max > 0) {
      const histX = M, histW = W / 2 - 5, histH = 40;
      const nbBins = dist.bins.length, barGap = 3;
      const barW = (histW - (nbBins - 1) * barGap) / nbBins;

      for (let i = 0; i < nbBins; i++) {
        const x = histX + i * (barW + barGap);
        const h = (dist.bins[i] / dist.max) * (histH - 10);
        const midPct = ((i + 0.5) / nbBins) * 100;
        doc.setFillColor(...levelFromPct(midPct).color);
        if (h > 0) doc.roundedRect(x, y + histH - 8 - h, barW, h, 1, 1, 'F');
        if (dist.bins[i] > 0) {
          doc.setFontSize(7); doc.setFont('helvetica', 'bold'); doc.setTextColor(...C.dark);
          doc.text(String(dist.bins[i]), x + barW / 2, y + histH - 10 - h, { align: 'center' });
        }
        doc.setFontSize(5.5); doc.setFont('helvetica', 'normal'); doc.setTextColor(120, 120, 120);
        doc.text(dist.labels[i], x + barW / 2, y + histH - 2, { align: 'center' });
      }

      // Compétences à droite
      if (compKeys.length > 0) {
        const cx = M + W / 2 + 5, cw = W / 2 - 5;
        doc.setFontSize(9); doc.setFont('helvetica', 'bold'); doc.setTextColor(...C.dark);
        doc.text('COMPÉTENCES', cx, y - 4);
        const barH = 6, gap = Math.min(3, (histH - compKeys.length * barH) / Math.max(1, compKeys.length));
        compKeys.forEach((k, i) => {
          const avg = Math.round(cAvg[k].s / cAvg[k].n);
          const cc = compColor(k);
          const by = y + i * (barH + gap);
          doc.setFontSize(7); doc.setFont('helvetica', 'bold'); doc.setTextColor(...cc);
          doc.text(`${niceComp(k)}`, cx, by + 4.5);
          const labelW = 26, fillAreaW = cw - labelW - 14;
          doc.setFillColor(220, 220, 220);
          doc.roundedRect(cx + labelW, by + 0.5, fillAreaW, barH - 1, 1, 1, 'F');
          doc.setFillColor(...cc);
          doc.roundedRect(cx + labelW, by + 0.5, Math.max(1, (avg / 100) * fillAreaW), barH - 1, 1, 1, 'F');
          const lvl = levelFromPct(avg);
          doc.setFontSize(6.5); doc.setFont('helvetica', 'bold'); doc.setTextColor(...lvl.color);
          doc.text(`${lvl.code} ${avg}%`, cx + cw - 1, by + 4.5, { align: 'right' });
        });
      }
      y += histH + 4;
    }

    // Exercices
    doc.setFontSize(9); doc.setFont('helvetica', 'bold'); doc.setTextColor(...C.dark);
    doc.text('TAUX DE RÉUSSITE PAR EXERCICE', M, y);
    y += 4;

    // Table header
    const colX = [M, M + 8, M + 8 + W * 0.32, M + 8 + W * 0.32 + 18, M + 8 + W * 0.32 + 18 + W * 0.28, M + 8 + W * 0.32 + 18 + W * 0.28 + 16];
    doc.setFillColor(...C.dark);
    doc.roundedRect(M, y, W, 6, 1.5, 1.5, 'F');
    doc.setFontSize(6); doc.setFont('helvetica', 'bold'); doc.setTextColor(255, 255, 255);
    doc.text('#', colX[0] + 3, y + 4);
    doc.text('Exercice', colX[1], y + 4);
    doc.text('Pts', colX[2] + 4, y + 4);
    doc.text('Réussite classe', colX[3], y + 4);
    doc.text('Niv.', colX[4] + 3, y + 4);
    y += 7;

    const exData = exs.map((ex, i) => {
      const cs = exClassScore(i);
      const cw = getCW();
      let exComps = [];
      const w = cw?.[ex.exerciceIndex];
      if (w) exComps = Object.keys(w).map(c => normalizeComp(c));
      else if (ex.competencesExercice) exComps = ex.competencesExercice.map(c => normalizeComp(c));
      return { idx: i, titre: ex.titre || `Exercice ${i + 1}`, totalPts: ex.questions.reduce((s, q) => s + q.points, 0), pct: cs.pct, lvl: levelFromPct(cs.pct), comps: exComps };
    });

    exData.forEach((e, i) => {
      if (y > PH - 20) { doc.addPage(); y = 15; }
      if (i % 2 === 0) { doc.setFillColor(248, 248, 250); doc.rect(M, y - 1, W, 7, 'F'); }
      doc.setFontSize(6.5); doc.setFont('helvetica', 'bold'); doc.setTextColor(...C.dark);
      doc.text(String(e.idx + 1), colX[0] + 3, y + 3.5);
      doc.setFont('helvetica', 'normal');
      let title = e.titre;
      while (doc.getTextWidth(title) > W * 0.30 && title.length > 5) title = title.slice(0, -1);
      if (title !== e.titre) title += '…';
      doc.text(title, colX[1], y + 3.5);
      doc.text(String(e.totalPts), colX[2] + 6, y + 3.5);
      // Progress bar
      const barX = colX[3], barW2 = W * 0.25, barH2 = 3.5;
      doc.setFillColor(220, 220, 220);
      doc.roundedRect(barX, y + 0.5, barW2, barH2, 1, 1, 'F');
      doc.setFillColor(...e.lvl.color);
      doc.roundedRect(barX, y + 0.5, Math.max(1, (e.pct / 100) * barW2), barH2, 1, 1, 'F');
      doc.setFontSize(5.5); doc.setFont('helvetica', 'bold'); doc.setTextColor(...e.lvl.color);
      doc.text(`${Math.round(e.pct)}%`, barX + barW2 + 2, y + 3.5);
      doc.setFontSize(6.5);
      doc.text(e.lvl.code, colX[4] + 3, y + 3.5);
      y += 7;
    });
    y += 3;

    // Acquis analysis
    if (y > PH - 50) { doc.addPage(); y = 15; }
    doc.setFontSize(9); doc.setFont('helvetica', 'bold'); doc.setTextColor(...C.dark);
    doc.text('ANALYSE DES ACQUIS', M, y);
    y += 5;

    const thirdW = (W - 6) / 3;
    const sections = [
      { title: 'Acquis (≥70%)', items: exData.filter(e => e.pct >= 70), color: C.success },
      { title: 'À renforcer (30-70%)', items: exData.filter(e => e.pct >= 30 && e.pct < 70), color: C.warning },
      { title: 'Non acquis (<30%)', items: exData.filter(e => e.pct < 30), color: C.danger },
    ];
    const maxItems = Math.max(...sections.map(s => s.items.length), 1);
    const sectionH = Math.max(12, 7 + maxItems * 5);

    sections.forEach((sec, si) => {
      const sx = M + si * (thirdW + 3);
      doc.setFillColor(...sec.color); doc.setGlobalAlpha?.(0.1);
      doc.setDrawColor(...sec.color); doc.setLineWidth(0.4);
      doc.roundedRect(sx, y, thirdW, sectionH, 2, 2, 'S');
      doc.setFontSize(7); doc.setFont('helvetica', 'bold'); doc.setTextColor(...sec.color);
      doc.text(sec.title, sx + 3, y + 5);
      doc.setFontSize(6); doc.setFont('helvetica', 'normal'); doc.setTextColor(...C.dark);
      sec.items.forEach((e, ei) => {
        doc.text(`Ex ${e.idx + 1} — ${Math.round(e.pct)}%`, sx + 3, y + 10 + ei * 4.5);
      });
      if (!sec.items.length) {
        doc.setTextColor(180, 180, 180); doc.setFont('helvetica', 'italic');
        doc.text('Aucun', sx + 3, y + 10);
      }
    });
    y += sectionH + 5;

    // === PAGE: Tableau élèves ===
    doc.addPage();
    y = 0;

    doc.setFillColor(...C.primary);
    doc.rect(0, 0, PW, 14, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11); doc.setFont('helvetica', 'bold');
    doc.text('RÉCAPITULATIF PAR ÉLÈVE', PW / 2, 6, { align: 'center' });
    doc.setFontSize(8); doc.setFont('helvetica', 'normal');
    doc.text(`${titre}${classe ? ' — ' + classe : ''} • ${stats.n} élèves corrigés`, PW / 2, 11, { align: 'center' });
    y = 18;

    // Table header
    const tM = 8, tW = PW - 2 * tM;
    const nameW = 42, noteW = 18, sur20W = 14, nivW = 12;
    const compColW = compKeys.length > 0 ? (tW - 8 - nameW - noteW - sur20W - nivW) / compKeys.length : 0;
    const rowH = 6;

    doc.setFillColor(...C.dark);
    doc.roundedRect(tM, y, tW, rowH + 1, 1.5, 1.5, 'F');
    doc.setFontSize(6); doc.setFont('helvetica', 'bold'); doc.setTextColor(255, 255, 255);
    let tx = tM + 2;
    doc.text('#', tx, y + 4.5); tx += 8;
    doc.text('Nom Prénom', tx, y + 4.5); tx += nameW;
    doc.text('Note', tx, y + 4.5); tx += noteW;
    doc.text('/20', tx, y + 4.5); tx += sur20W;
    doc.text('Niv.', tx, y + 4.5); tx += nivW;
    compKeys.forEach(k => {
      doc.text(niceComp(k).substring(0, 5), tx + compColW / 2, y + 4.5, { align: 'center' });
      tx += compColW;
    });
    y += rowH + 2;

    rows.forEach((r, i) => {
      if (y > PH - 15) {
        doc.addPage();
        y = 12;
        // Repeat header
        doc.setFillColor(...C.dark);
        doc.roundedRect(tM, y, tW, rowH + 1, 1.5, 1.5, 'F');
        doc.setFontSize(6); doc.setFont('helvetica', 'bold'); doc.setTextColor(255, 255, 255);
        let hx = tM + 2;
        doc.text('#', hx, y + 4.5); hx += 8;
        doc.text('Nom Prénom', hx, y + 4.5); hx += nameW;
        doc.text('Note', hx, y + 4.5); hx += noteW;
        doc.text('/20', hx, y + 4.5); hx += sur20W;
        doc.text('Niv.', hx, y + 4.5); hx += nivW;
        compKeys.forEach(k => {
          doc.text(niceComp(k).substring(0, 5), hx + compColW / 2, y + 4.5, { align: 'center' });
          hx += compColW;
        });
        y += rowH + 2;
      }

      if (i % 2 === 0) { doc.setFillColor(248, 248, 250); doc.rect(tM, y - 0.5, tW, rowH, 'F'); }

      tx = tM + 2;
      doc.setFontSize(6); doc.setTextColor(...C.dark);
      doc.setFont('helvetica', 'normal');
      doc.text(String(r.rang), tx + 2, y + 4, { align: 'center' }); tx += 8;
      doc.setFont('helvetica', 'bold');
      let name = `${r.nom} ${r.prenom}`;
      while (doc.getTextWidth(name) > nameW - 2 && name.length > 5) name = name.slice(0, -1);
      doc.text(name, tx, y + 4); tx += nameW;
      doc.setFont('helvetica', 'normal');
      doc.text(`${fmt(r.score)}/${r.total}`, tx, y + 4); tx += noteW;
      doc.text(fmt(r.sur20), tx, y + 4); tx += sur20W;
      doc.setTextColor(...r.lvl.color); doc.setFont('helvetica', 'bold');
      doc.text(r.lvl.code, tx, y + 4); tx += nivW;
      compKeys.forEach(k => {
        const sc = r.comps[k];
        if (sc) {
          doc.setTextColor(...sc.lvl.color); doc.setFont('helvetica', 'bold');
          doc.text(sc.lvl.code, tx + compColW / 2, y + 4, { align: 'center' });
        } else {
          doc.setTextColor(200, 200, 200);
          doc.text('—', tx + compColW / 2, y + 4, { align: 'center' });
        }
        tx += compColW;
      });
      y += rowH;
    });

    // Ligne moyenne
    y += 1;
    doc.setFillColor(...C.dark);
    doc.rect(tM, y - 0.5, tW, rowH + 1, 'F');
    tx = tM + 2;
    doc.setFontSize(6.5); doc.setFont('helvetica', 'bold'); doc.setTextColor(255, 255, 255);
    doc.text('Moyenne', tx, y + 4.5); tx += 8 + nameW;
    doc.text(`${fmt(stats.avg)}/${stats.total}`, tx, y + 4.5); tx += noteW;
    doc.text(fmt(avgSur20), tx, y + 4.5); tx += sur20W;
    doc.text(levelFromPct(stats.avg / stats.total * 100).code, tx, y + 4.5); tx += nivW;
    compKeys.forEach(k => {
      const avg = Math.round(cAvg[k].s / cAvg[k].n);
      doc.text(`${avg}%`, tx + compColW / 2, y + 4.5, { align: 'center' });
      tx += compColW;
    });

    const fn = `Bilan_classe${classe ? '_' + classe.replace(/\s+/g, '_') : ''}.pdf`;
    doc.save(fn);
  }

  // ===================== Button injection =====================
  function injectButton() {
    // Inject next to "Bilans PDF" button (added by bilan-pdf.js)
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.includes('Bilans PDF') && !btn.dataset.bcInjected) {
        btn.dataset.bcInjected = '1';
        const b = document.createElement('button');
        b.className = btn.className;
        b.innerHTML = '📊 Bilan classe';
        b.title = 'Afficher le bilan de la classe';
        b.style.cssText = btn.style.cssText || '';
        b.addEventListener('click', e => { e.stopPropagation(); e.preventDefault(); showHTMLPanel(); });
        btn.parentElement.insertBefore(b, btn.nextSibling);
      }
    });
  }

  const obs = new MutationObserver(() => injectButton());
  function init() {
    const app = document.getElementById('app') || document.getElementById('appMathalea');
    if (!app) { setTimeout(init, 200); return; }
    obs.observe(app, { childList: true, subtree: true });
    setTimeout(injectButton, 1500);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

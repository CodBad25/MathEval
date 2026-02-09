// bilan-pdf.js — Génération de bilans individuels PDF avec jsPDF
(function () {
  'use strict';
  if (!new URLSearchParams(window.location.search).get('v')?.includes('correction')) return;

  // Load jsPDF from CDN
  const jspdfScript = document.createElement('script');
  jspdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
  document.head.appendChild(jspdfScript);

  const CONFIG_KEY = 'bilanConfig';

  // --- Couleurs (identiques au gazoil) ---
  const colors = {
    primary: [41, 128, 185],
    success: [39, 174, 96],
    warning: [230, 126, 34],
    danger: [231, 76, 60],
    dark: [44, 62, 80],
    light: [236, 240, 241],
    white: [255, 255, 255]
  };

  // --- Seuils ---
  const SEUIL_TBM = 90, SEUIL_MS = 70, SEUIL_MF = 30;

  // --- Helpers ---
  function getConfig() {
    try { return JSON.parse(localStorage.getItem(CONFIG_KEY) || '{}'); } catch { return {}; }
  }
  function saveConfig(cfg) { localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg)); }

  function normalizeCompetence(name) {
    if (!name) return name;
    return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  }

  function niceCompetence(key) {
    const map = { modeliser: 'Modéliser', calculer: 'Calculer', raisonner: 'Raisonner', communiquer: 'Communiquer', representer: 'Représenter', chercher: 'Chercher' };
    return map[key] || key.charAt(0).toUpperCase() + key.slice(1);
  }

  function levelFromPct(pct) {
    if (pct >= SEUIL_TBM) return { code: 'TBM', label: 'Très Bonne Maîtrise', color: colors.success };
    if (pct >= SEUIL_MS) return { code: 'MS', label: 'Maîtrise Satisfaisante', color: colors.primary };
    if (pct >= SEUIL_MF) return { code: 'MF', label: 'Maîtrise Fragile', color: colors.warning };
    return { code: 'MI', label: 'Maîtrise Insuffisante', color: colors.danger };
  }

  // --- Scoring ---
  function getCorrections() {
    try { return JSON.parse(localStorage.getItem('studentCorrections') || '{}'); } catch { return {}; }
  }
  function getCompetencyWeights() {
    try { return JSON.parse(localStorage.getItem('competencyWeights') || 'null'); } catch { return null; }
  }

  function globalScore(studentId) {
    const corr = getCorrections()[studentId];
    const exercises = window.__getExercises ? window.__getExercises() : [];
    if (!corr) return { correct: 0, total: 0 };
    let correct = 0, total = 0;
    exercises.forEach(ex => {
      ex.questions.forEach(q => {
        const c = corr[ex.exerciceIndex]?.[q.questionIndex];
        total += q.points;
        if (c?.pointsObtenus !== undefined) correct += c.pointsObtenus;
        else if (c?.status === 'TB') correct += q.points;
        else if (c?.status === 'TB-') correct += q.points / 2;
      });
    });
    return { correct, total };
  }

  function exerciseScore(studentId, exIndex) {
    const corr = getCorrections()[studentId];
    const exercises = window.__getExercises ? window.__getExercises() : [];
    const ex = exercises[exIndex];
    if (!corr || !ex) return { obtenus: 0, totaux: 0 };
    let obtenus = 0, totaux = 0;
    ex.questions.forEach(q => {
      const c = corr[ex.exerciceIndex]?.[q.questionIndex];
      totaux += q.points;
      if (c?.pointsObtenus !== undefined) obtenus += c.pointsObtenus;
      else if (c?.status === 'TB') obtenus += q.points;
      else if (c?.status === 'TB-') obtenus += q.points / 2;
    });
    return { obtenus, totaux };
  }

  function competencyScores(studentId) {
    const corr = getCorrections()[studentId];
    const exercises = window.__getExercises ? window.__getExercises() : [];
    const CW = getCompetencyWeights();
    const we = {};
    if (!corr) return {};
    exercises.forEach(ex => {
      ex.questions.forEach(q => {
        const c = corr[ex.exerciceIndex]?.[q.questionIndex];
        if (c?.status) {
          const pts = q.points || 1;
          let earned = 0;
          if (c.status === 'TB') earned = pts;
          else if (c.status === 'TB-') earned = pts / 2;
          const weights = CW?.[ex.exerciceIndex];
          if (weights) {
            Object.entries(weights).forEach(([comp, pct]) => {
              const key = normalizeCompetence(comp);
              if (!we[key]) we[key] = { correct: 0, total: 0 };
              we[key].total += pts * pct;
              we[key].correct += earned * pct;
            });
          } else {
            const comps = ex.detailParQuestion ? q.competences : ex.competencesExercice;
            if (!comps || comps.length === 0) return;
            const share = 1 / comps.length;
            comps.forEach(comp => {
              const key = normalizeCompetence(comp);
              if (!we[key]) we[key] = { correct: 0, total: 0 };
              we[key].total += pts * share;
              we[key].correct += earned * share;
            });
          }
        }
      });
    });
    const result = {};
    Object.keys(we).forEach(key => {
      const c = we[key].correct, t = we[key].total;
      if (t > 0) {
        const pct = c / t * 100;
        result[key] = { correct: Math.round(c * 10) / 10, total: Math.round(t * 10) / 10, pourcentage: pct, level: levelFromPct(pct) };
      }
    });
    return result;
  }

  function isStudentCorrected(studentId) {
    const corr = getCorrections()[studentId];
    if (!corr) return false;
    return Object.keys(corr).some(k => k !== 'commentaire' && Object.keys(corr[k]).length > 0);
  }

  function getStudentComment(studentId) {
    return getCorrections()[studentId]?.commentaire || '';
  }

  function classStats() {
    const students = window.__getStudentList ? window.__getStudentList() : [];
    const scores = [];
    students.forEach(s => {
      if (!isStudentCorrected(s.id)) return;
      const g = globalScore(s.id);
      if (g.total > 0) scores.push(g.correct);
    });
    if (scores.length === 0) return null;
    scores.sort((a, b) => a - b);
    const sum = scores.reduce((a, b) => a + b, 0);
    const med = scores.length % 2 === 0
      ? (scores[scores.length / 2 - 1] + scores[scores.length / 2]) / 2
      : scores[Math.floor(scores.length / 2)];
    return {
      count: scores.length,
      moyenne: Math.round(sum / scores.length * 10) / 10,
      min: scores[0], max: scores[scores.length - 1],
      mediane: Math.round(med * 10) / 10,
      total: globalScore(students.find(s => isStudentCorrected(s.id)).id).total
    };
  }

  function classCompetencyAverages() {
    const students = window.__getStudentList ? window.__getStudentList() : [];
    const avgs = {};
    students.forEach(s => {
      if (!isStudentCorrected(s.id)) return;
      const sc = competencyScores(s.id);
      Object.keys(sc).forEach(k => {
        if (!avgs[k]) avgs[k] = { sum: 0, count: 0 };
        avgs[k].sum += sc[k].pourcentage;
        avgs[k].count++;
      });
    });
    return avgs;
  }

  // --- PDF Generation (layout fidèle au gazoil) ---
  function generatePDF(studentIds, fileName) {
    if (!window.jspdf) { alert('jsPDF non chargé. Réessayez dans quelques secondes.'); return; }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const PW = 210, PH = 297, M = 15;
    const CW = PW - 2 * M;
    const exercises = window.__getExercises ? window.__getExercises() : [];
    const cfg = getConfig();
    const stats = cfg.showStats !== false ? classStats() : null;
    const compAvgs = cfg.showStats !== false ? classCompetencyAverages() : {};
    const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

    function fmt(n) { return n % 1 === 0 ? String(n) : n.toFixed(1); }
    function checkPage(y, need) { if (y + need > PH - 15) { doc.addPage(); return M; } return y; }

    studentIds.forEach((sid, idx) => {
      if (idx > 0) doc.addPage();
      const students = window.__getStudentList ? window.__getStudentList() : [];
      const student = students.find(s => s.id === sid);
      const studentName = student ? `${student.nom || ''} ${student.prenom || ''}`.trim() : sid;
      const g = globalScore(sid);
      const pct = g.total > 0 ? g.correct / g.total * 100 : 0;
      const comment = getStudentComment(sid);
      const comps = competencyScores(sid);

      // ========== EN-TÊTE (bandeau bleu 35mm) ==========
      doc.setFillColor(...colors.primary);
      doc.rect(0, 0, PW, 35, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text("BILAN D'ÉVALUATION", PW / 2, 15, { align: 'center' });
      doc.setFontSize(12);
      doc.setFont('helvetica', 'normal');
      const sub = (cfg.titre || 'Évaluation') + (cfg.classe ? ' — ' + cfg.classe : '');
      doc.text('Mathématiques — ' + sub, PW / 2, 25, { align: 'center' });

      let y = 45;

      // ========== ENCADRÉ ÉLÈVE (25mm) ==========
      doc.setFillColor(...colors.light);
      doc.roundedRect(M, y, CW, 20, 3, 3, 'F');
      doc.setTextColor(...colors.dark);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text(studentName, M + 8, y + 10);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      if (cfg.classe) doc.text('Classe : ' + cfg.classe, M + 8, y + 17);
      doc.setFontSize(10);
      doc.text(today, PW - M - 8, y + 10, { align: 'right' });
      y += 30;

      // ========== NOTE GLOBALE (barre colorée 22mm) ==========
      if (cfg.showNote !== false && g.total > 0) {
        const lvl = levelFromPct(pct);
        doc.setFillColor(...lvl.color);
        doc.roundedRect(M, y, CW, 22, 3, 3, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(24);
        doc.setFont('helvetica', 'bold');
        doc.text(`${fmt(g.correct)} / ${g.total}`, M + 15, y + 15);
        doc.setFontSize(13);
        doc.setFont('helvetica', 'normal');
        doc.text(lvl.code + ' — ' + lvl.label, PW - M - 10, y + 15, { align: 'right' });
        y += 30;
      }

      // ========== APPRÉCIATION ==========
      if (cfg.showComment !== false && comment) {
        y = checkPage(y, 30);
        doc.setTextColor(...colors.dark);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('APPRÉCIATION', M, y);
        y += 6;

        doc.setFillColor(...colors.light);
        const lines = doc.splitTextToSize(comment, CW - 16);
        const boxH = Math.max(20, 10 + lines.length * 5);
        doc.roundedRect(M, y, CW, boxH, 3, 3, 'F');
        // Barre bleue gauche
        doc.setDrawColor(...colors.primary);
        doc.setLineWidth(1);
        doc.line(M, y, M, y + boxH);
        doc.setTextColor(...colors.dark);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(lines, M + 8, y + 8);
        y += boxH + 10;
      }

      // ========== COMPÉTENCES ÉVALUÉES (barres pleines comme gazoil) ==========
      if (cfg.showCompetences !== false && Object.keys(comps).length > 0) {
        y = checkPage(y, 20 + Object.keys(comps).length * 14);
        doc.setTextColor(...colors.dark);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('COMPÉTENCES ÉVALUÉES', M, y);
        y += 8;

        Object.keys(comps).forEach(key => {
          y = checkPage(y, 14);
          const comp = comps[key];
          // Barre pleine colorée (toute la largeur)
          doc.setFillColor(...comp.level.color);
          doc.roundedRect(M, y, CW, 10, 2, 2, 'F');
          // Nom à gauche
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');
          doc.text(niceCompetence(key), M + 5, y + 7);
          // Niveau + score à droite
          doc.text(`${comp.level.code} — ${fmt(comp.correct)}/${fmt(comp.total)} (${Math.round(comp.pourcentage)}%)`, PW - M - 5, y + 7, { align: 'right' });
          y += 12;
        });
        y += 5;
      }

      // ========== DÉTAIL PAR EXERCICE ==========
      if (cfg.showExercises !== false && exercises.length > 0) {
        y = checkPage(y, 20 + exercises.length * 8);
        doc.setTextColor(...colors.dark);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('DÉTAIL PAR EXERCICE', M, y);
        y += 7;

        // En-tête tableau
        doc.setFillColor(...colors.primary);
        doc.rect(M, y, CW, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'bold');
        doc.text('#', M + 4, y + 6);
        doc.text('Exercice', M + 14, y + 6);
        doc.text('Score', PW - M - 40, y + 6);
        doc.text('Niveau', PW - M - 14, y + 6);
        y += 8;

        exercises.forEach((ex, i) => {
          y = checkPage(y, 8);
          const sc = exerciseScore(sid, i);
          const exPct = sc.totaux > 0 ? sc.obtenus / sc.totaux * 100 : 0;
          const lvl = sc.totaux > 0 ? levelFromPct(exPct) : { code: '-', color: [150, 150, 150] };

          doc.setFillColor(i % 2 === 0 ? 250 : 240, i % 2 === 0 ? 250 : 243, i % 2 === 0 ? 250 : 247);
          doc.rect(M, y, CW, 7, 'F');
          doc.setTextColor(...colors.dark);
          doc.setFontSize(9);
          doc.setFont('helvetica', 'bold');
          doc.text(String(i + 1), M + 4, y + 5.5);
          doc.setFont('helvetica', 'normal');
          doc.text((ex.titre || `Exercice ${i + 1}`).substring(0, 60), M + 14, y + 5.5);
          doc.text(`${fmt(sc.obtenus)}/${sc.totaux}`, PW - M - 40, y + 5.5);
          doc.setTextColor(...lvl.color);
          doc.setFont('helvetica', 'bold');
          doc.text(lvl.code, PW - M - 14, y + 5.5);
          y += 7;
        });
        y += 8;
      }

      // ========== STATISTIQUES CLASSE ==========
      if (cfg.showStats !== false && stats) {
        y = checkPage(y, 35);
        doc.setTextColor(...colors.dark);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text('STATISTIQUES CLASSE', M, y);
        y += 7;

        doc.setFillColor(...colors.light);
        doc.roundedRect(M, y, CW, 24, 3, 3, 'F');
        doc.setTextColor(...colors.dark);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Moyenne : ${fmt(stats.moyenne)}/${stats.total}`, M + 6, y + 8);
        doc.text(`Min : ${fmt(stats.min)}`, M + 70, y + 8);
        doc.text(`Médiane : ${fmt(stats.mediane)}`, M + 105, y + 8);
        doc.text(`Max : ${fmt(stats.max)}`, M + 145, y + 8);
        // Compétences moyennes
        if (Object.keys(compAvgs).length > 0) {
          let x = M + 6;
          doc.setFontSize(9);
          Object.keys(compAvgs).forEach(k => {
            const avg = Math.round(compAvgs[k].sum / compAvgs[k].count);
            const lvl = levelFromPct(avg);
            doc.setTextColor(...lvl.color);
            doc.setFont('helvetica', 'bold');
            const txt = `${niceCompetence(k)}: ${avg}%`;
            doc.text(txt, x, y + 18);
            x += doc.getTextWidth(txt) + 10;
          });
        }
        y += 32;
      }

      // ========== SIGNATURES ==========
      if (cfg.showSignatures !== false) {
        y = Math.max(y + 10, PH - 30);
        doc.setDrawColor(...colors.dark);
        doc.setLineWidth(0.3);
        // Signature élève
        doc.line(M, y, M + 65, y);
        doc.setFontSize(9);
        doc.setTextColor(...colors.dark);
        doc.setFont('helvetica', 'normal');
        doc.text('Signature élève', M + 32.5, y + 6, { align: 'center' });
        // Signature parents
        doc.line(PW - M - 65, y, PW - M, y);
        doc.text('Signature parents', PW - M - 32.5, y + 6, { align: 'center' });
      }
    });

    doc.save(fileName);
  }

  // --- Config Modal ---
  function showConfigModal(mode) {
    const cfg = getConfig();
    let detectedTitle = '';
    const h1 = document.querySelector('h1');
    if (h1) detectedTitle = h1.textContent.trim();

    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:10000;display:flex;align-items:center;justify-content:center';
    const modal = document.createElement('div');
    modal.style.cssText = 'background:white;border-radius:12px;padding:24px;max-width:480px;width:90%;font-family:sans-serif;color:#333;box-shadow:0 20px 60px rgba(0,0,0,.3)';
    modal.innerHTML = `
      <h3 style="margin:0 0 16px;font-size:18px;color:#2980b9">📄 Générer les bilans PDF</h3>
      <div style="margin-bottom:12px">
        <label style="font-size:13px;font-weight:600;display:block;margin-bottom:4px">Titre de l'évaluation</label>
        <input id="bpdf-titre" type="text" value="${cfg.titre || detectedTitle}" placeholder="Ex: Bilan 3ème - Calcul littéral"
          style="width:100%;padding:8px;border:1px solid #ddd;border-radius:6px;font-size:13px;box-sizing:border-box">
      </div>
      <div style="margin-bottom:16px">
        <label style="font-size:13px;font-weight:600;display:block;margin-bottom:4px">Classe</label>
        <input id="bpdf-classe" type="text" value="${cfg.classe || ''}" placeholder="Ex: 4ème C"
          style="width:100%;padding:8px;border:1px solid #ddd;border-radius:6px;font-size:13px;box-sizing:border-box">
      </div>
      <div style="font-size:13px;font-weight:600;margin-bottom:8px">Contenu du bilan :</div>
      <div id="bpdf-options" style="display:flex;flex-direction:column;gap:6px;margin-bottom:16px">
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" data-key="showNote" ${cfg.showNote !== false ? 'checked' : ''}> Note globale + niveau</label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" data-key="showComment" ${cfg.showComment !== false ? 'checked' : ''}> Appréciation</label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" data-key="showCompetences" ${cfg.showCompetences !== false ? 'checked' : ''}> Compétences (barres colorées)</label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" data-key="showExercises" ${cfg.showExercises !== false ? 'checked' : ''}> Détail par exercice</label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" data-key="showStats" ${cfg.showStats !== false ? 'checked' : ''}> Statistiques classe</label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" data-key="showSignatures" ${cfg.showSignatures !== false ? 'checked' : ''}> Zones de signature</label>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button id="bpdf-cancel" style="padding:8px 16px;background:#eee;border:none;border-radius:6px;cursor:pointer;font-size:13px">Annuler</button>
        <button id="bpdf-generate" style="padding:8px 16px;background:#2980b9;color:white;border:none;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600">📥 Générer PDF</button>
      </div>`;
    overlay.appendChild(modal);
    document.body.appendChild(overlay);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    modal.querySelector('#bpdf-cancel').addEventListener('click', () => overlay.remove());
    modal.querySelector('#bpdf-generate').addEventListener('click', () => {
      const newCfg = { titre: modal.querySelector('#bpdf-titre').value.trim(), classe: modal.querySelector('#bpdf-classe').value.trim() };
      modal.querySelectorAll('#bpdf-options input[type=checkbox]').forEach(cb => { newCfg[cb.dataset.key] = cb.checked; });
      saveConfig(newCfg);
      const students = window.__getStudentList ? window.__getStudentList() : [];
      let ids = [];
      if (mode === 'all') ids = students.filter(s => isStudentCorrected(s.id)).map(s => s.id);
      else if (mode === 'single') { const cid = window.__getStudentId ? window.__getStudentId() : null; if (cid) ids = [cid]; }
      if (ids.length === 0) { alert('Aucun élève corrigé trouvé.'); return; }
      overlay.remove();
      let fName;
      if (mode === 'single') {
        const s = students.find(st => st.id === ids[0]);
        fName = `Bilan_${(s?.nom || 'eleve').replace(/\s+/g, '_')}.pdf`;
      } else {
        fName = `Bilans${newCfg.classe ? '_' + newCfg.classe.replace(/\s+/g, '_') : ''}.pdf`;
      }
      generatePDF(ids, fName);
    });
  }

  // --- Button injection ---
  function injectButtons() {
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.includes('Imprimer bilans individuels') && !btn.dataset.bpdfInjected) {
        btn.dataset.bpdfInjected = '1';
        const pdfBtn = document.createElement('button');
        pdfBtn.className = btn.className;
        pdfBtn.innerHTML = '📥 Bilans PDF';
        pdfBtn.title = 'Générer les bilans individuels en PDF pour tous les élèves corrigés';
        pdfBtn.style.cssText = btn.style.cssText;
        pdfBtn.addEventListener('click', (e) => { e.stopPropagation(); e.preventDefault(); showConfigModal('all'); });
        btn.parentElement.insertBefore(pdfBtn, btn.nextSibling);
      }
    });
    document.querySelectorAll('button').forEach(btn => {
      if ((btn.textContent.includes('Imprimer ce bilan') || btn.textContent.includes('🖨️ Imprimer')) &&
          btn.closest('.fixed, dialog, [role="dialog"]') && !btn.dataset.bpdfSingle) {
        btn.dataset.bpdfSingle = '1';
        const pdfBtn = document.createElement('button');
        pdfBtn.textContent = '📥 PDF';
        pdfBtn.title = 'Générer le bilan PDF de cet élève';
        pdfBtn.style.cssText = 'padding:10px 20px;background:#2980b9;color:white;border:none;border-radius:5px;cursor:pointer;margin-left:8px;font-weight:600';
        pdfBtn.addEventListener('click', (e) => { e.stopPropagation(); e.preventDefault(); showConfigModal('single'); });
        btn.parentElement.insertBefore(pdfBtn, btn.nextSibling);
      }
    });
  }

  const observer = new MutationObserver(() => { injectButtons(); });
  function init() {
    const app = document.getElementById('app') || document.getElementById('appMathalea');
    if (!app) { setTimeout(init, 200); return; }
    observer.observe(app, { childList: true, subtree: true });
    setTimeout(injectButtons, 1000);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

// bilan-pdf.js — Génération de bilans individuels PDF avec jsPDF
(function () {
  'use strict';
  if (!new URLSearchParams(window.location.search).get('v')?.includes('correction')) return;

  // Load jsPDF from CDN
  const jspdfScript = document.createElement('script');
  jspdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
  document.head.appendChild(jspdfScript);

  const CONFIG_KEY = 'bilanConfig';

  // --- Couleurs ---
  const colors = {
    primary: [41, 128, 185],
    success: [76, 175, 80],
    info: [33, 150, 243],
    warning: [255, 152, 0],
    danger: [244, 67, 54],
    dark: [44, 62, 80],
    light: [236, 240, 241],
    white: [255, 255, 255]
  };

  // --- Seuils (mêmes que dans l'app) ---
  const SEUIL_TBM = 90;
  const SEUIL_MS = 70;
  const SEUIL_MF = 30;

  // --- Helpers ---
  function getConfig() {
    try { return JSON.parse(localStorage.getItem(CONFIG_KEY) || '{}'); }
    catch { return {}; }
  }
  function saveConfig(cfg) {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
  }

  function normalizeCompetence(name) {
    if (!name) return name;
    return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  }

  function niceCompetence(key) {
    const map = {
      'modeliser': 'Modéliser',
      'calculer': 'Calculer',
      'raisonner': 'Raisonner',
      'communiquer': 'Communiquer',
      'representer': 'Représenter',
      'chercher': 'Chercher'
    };
    return map[key] || key.charAt(0).toUpperCase() + key.slice(1);
  }

  function levelFromPct(pct) {
    if (pct >= SEUIL_TBM) return { code: 'TBM', label: 'Très Bonne Maîtrise', color: colors.success };
    if (pct >= SEUIL_MS) return { code: 'MS', label: 'Maîtrise Satisfaisante', color: colors.info };
    if (pct >= SEUIL_MF) return { code: 'MF', label: 'Maîtrise Fragile', color: colors.warning };
    return { code: 'MI', label: 'Maîtrise Insuffisante', color: colors.danger };
  }

  function levelColor(pct) {
    return levelFromPct(pct).color;
  }

  // --- Scoring functions (mirrors bi/Cn/Ft from bundle) ---
  function getCorrections() {
    try { return JSON.parse(localStorage.getItem('studentCorrections') || '{}'); }
    catch { return {}; }
  }

  function getCompetencyWeights() {
    try { return JSON.parse(localStorage.getItem('competencyWeights') || 'null'); }
    catch { return null; }
  }

  function globalScore(studentId) {
    const corr = getCorrections()[studentId];
    const exercises = window.__getExercises ? window.__getExercises() : [];
    if (!corr) return { correct: 0, total: 0 };
    let correct = 0, total = 0;
    exercises.forEach(ex => {
      ex.questions.forEach(q => {
        const c = corr[ex.exerciceIndex]?.[q.questionIndex];
        const status = c?.status;
        total += q.points;
        if (c?.pointsObtenus !== undefined) correct += c.pointsObtenus;
        else if (status === 'TB') correct += q.points;
        else if (status === 'TB-') correct += q.points / 2;
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
      const status = c?.status;
      totaux += q.points;
      if (c?.pointsObtenus !== undefined) obtenus += c.pointsObtenus;
      else if (status === 'TB') obtenus += q.points;
      else if (status === 'TB-') obtenus += q.points / 2;
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
        const status = c?.status;
        if (status) {
          const pts = q.points || 1;
          let earned = 0;
          if (status === 'TB') earned = pts;
          else if (status === 'TB-') earned = pts / 2;
          const weights = CW && CW[ex.exerciceIndex] ? CW[ex.exerciceIndex] : null;
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
        result[key] = {
          correct: Math.round(c * 10) / 10,
          total: Math.round(t * 10) / 10,
          pourcentage: pct,
          level: levelFromPct(pct)
        };
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
    const corr = getCorrections()[studentId];
    return corr?.commentaire || '';
  }

  // --- Class statistics ---
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
    const avg = sum / scores.length;
    const med = scores.length % 2 === 0
      ? (scores[scores.length / 2 - 1] + scores[scores.length / 2]) / 2
      : scores[Math.floor(scores.length / 2)];
    return {
      count: scores.length,
      moyenne: Math.round(avg * 10) / 10,
      min: scores[0],
      max: scores[scores.length - 1],
      mediane: Math.round(med * 10) / 10,
      total: globalScore(students.find(s => isStudentCorrected(s.id)).id).total
    };
  }

  // --- PDF Generation ---
  function generatePDF(studentIds, fileName) {
    if (!window.jspdf) { alert('jsPDF non chargé. Réessayez.'); return; }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const pageWidth = 210, pageHeight = 297, margin = 15;
    const contentWidth = pageWidth - 2 * margin;
    const exercises = window.__getExercises ? window.__getExercises() : [];
    const cfg = getConfig();
    const stats = cfg.showStats !== false ? classStats() : null;

    studentIds.forEach((sid, idx) => {
      if (idx > 0) doc.addPage();
      let y = margin;
      const students = window.__getStudentList ? window.__getStudentList() : [];
      const student = students.find(s => s.id === sid);
      const studentName = student ? (student.nom || `${student.prenom || ''} ${student.nom || ''}`.trim()) : sid;
      const g = globalScore(sid);
      const pct = g.total > 0 ? g.correct / g.total * 100 : 0;
      const comment = getStudentComment(sid);
      const comps = competencyScores(sid);

      // === EN-TÊTE (bandeau bleu) ===
      doc.setFillColor(...colors.primary);
      doc.rect(0, 0, pageWidth, 32, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(18);
      doc.setFont('helvetica', 'bold');
      doc.text("BILAN D'ÉVALUATION — Mathématiques", pageWidth / 2, 13, { align: 'center' });
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      const subtitle = cfg.titre || 'Évaluation';
      const classeText = cfg.classe ? ` — ${cfg.classe}` : '';
      doc.text(subtitle + classeText, pageWidth / 2, 22, { align: 'center' });
      // Date
      doc.setFontSize(9);
      const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
      doc.text(today, pageWidth / 2, 29, { align: 'center' });
      y = 40;

      // === ENCADRÉ ÉLÈVE ===
      doc.setFillColor(...colors.light);
      doc.roundedRect(margin, y, contentWidth, 16, 3, 3, 'F');
      doc.setTextColor(...colors.dark);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text(studentName, margin + 8, y + 10);
      y += 24;

      // === NOTE GLOBALE ===
      if (cfg.showNote !== false && g.total > 0) {
        const noteColor = levelColor(pct);
        doc.setFillColor(...noteColor);
        doc.roundedRect(margin, y, contentWidth, 20, 3, 3, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        const noteText = `${g.correct % 1 === 0 ? g.correct : g.correct.toFixed(1)} / ${g.total}`;
        doc.text(noteText, margin + 10, y + 14);
        // Niveau à droite
        const lvl = levelFromPct(pct);
        doc.setFontSize(12);
        doc.text(lvl.code + ' — ' + lvl.label, pageWidth - margin - 8, y + 14, { align: 'right' });
        y += 28;
      }

      // === COMMENTAIRE ===
      if (cfg.showComment !== false && comment) {
        doc.setTextColor(...colors.dark);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('APPRÉCIATION', margin, y);
        y += 5;
        doc.setFillColor(245, 247, 250);
        const lines = doc.splitTextToSize(comment, contentWidth - 16);
        const boxH = Math.max(14, 8 + lines.length * 5);
        doc.roundedRect(margin, y, contentWidth, boxH, 3, 3, 'F');
        // Barre bleue à gauche
        doc.setFillColor(...colors.primary);
        doc.rect(margin, y, 2.5, boxH, 'F');
        doc.setTextColor(...colors.dark);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(lines, margin + 8, y + 7);
        y += boxH + 8;
      }

      // === COMPÉTENCES ===
      if (cfg.showCompetences !== false && Object.keys(comps).length > 0) {
        doc.setTextColor(...colors.dark);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('COMPÉTENCES ÉVALUÉES', margin, y);
        y += 7;

        const compKeys = Object.keys(comps);
        compKeys.forEach(key => {
          const comp = comps[key];
          const barWidth = contentWidth;
          const barHeight = 10;

          // Background bar (grey)
          doc.setFillColor(230, 230, 230);
          doc.roundedRect(margin, y, barWidth, barHeight, 2, 2, 'F');

          // Filled bar (colored by level)
          const fillWidth = Math.max(0, barWidth * (comp.pourcentage / 100));
          if (fillWidth > 0) {
            doc.setFillColor(...comp.level.color);
            doc.roundedRect(margin, y, fillWidth, barHeight, 2, 2, 'F');
          }

          // Competence name (left)
          doc.setTextColor(255, 255, 255);
          doc.setFontSize(9);
          doc.setFont('helvetica', 'bold');
          const niceName = niceCompetence(key);
          // Draw on the bar or next to it
          if (fillWidth > 40) {
            doc.text(niceName, margin + 4, y + 7);
          } else {
            doc.setTextColor(...colors.dark);
            doc.text(niceName, margin + 4, y + 7);
          }

          // Score + level (right)
          const scoreText = `${comp.correct}/${comp.total} (${Math.round(comp.pourcentage)}%) — ${comp.level.code}`;
          doc.setTextColor(...colors.dark);
          doc.setFontSize(8);
          doc.setFont('helvetica', 'normal');
          doc.text(scoreText, pageWidth - margin - 4, y + 7, { align: 'right' });

          y += barHeight + 3;
        });
        y += 5;
      }

      // === DÉTAIL PAR EXERCICE ===
      if (cfg.showExercises !== false && exercises.length > 0) {
        if (y > pageHeight - 60) { doc.addPage(); y = margin; }
        doc.setTextColor(...colors.dark);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('DÉTAIL PAR EXERCICE', margin, y);
        y += 6;

        // Table header
        const colWidths = [12, contentWidth - 12 - 30 - 30, 30, 30];
        const colX = [margin, margin + 12, margin + contentWidth - 60, margin + contentWidth - 30];
        doc.setFillColor(...colors.primary);
        doc.rect(margin, y, contentWidth, 8, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(8);
        doc.setFont('helvetica', 'bold');
        doc.text('#', colX[0] + 4, y + 6);
        doc.text('Exercice', colX[1] + 2, y + 6);
        doc.text('Score', colX[2] + 2, y + 6);
        doc.text('Niveau', colX[3] + 2, y + 6);
        y += 8;

        exercises.forEach((ex, i) => {
          if (y > pageHeight - 30) { doc.addPage(); y = margin; }
          const sc = exerciseScore(sid, i);
          const exPct = sc.totaux > 0 ? sc.obtenus / sc.totaux * 100 : 0;
          const lvl = sc.totaux > 0 ? levelFromPct(exPct) : { code: '-', color: colors.light };
          const rowColor = i % 2 === 0 ? [250, 250, 250] : [240, 243, 247];
          doc.setFillColor(...rowColor);
          doc.rect(margin, y, contentWidth, 7, 'F');
          doc.setTextColor(...colors.dark);
          doc.setFontSize(8);
          doc.setFont('helvetica', 'bold');
          doc.text(String(i + 1), colX[0] + 4, y + 5);
          doc.setFont('helvetica', 'normal');
          const title = (ex.titre || `Exercice ${i + 1}`).substring(0, 50);
          doc.text(title, colX[1] + 2, y + 5);
          doc.text(`${sc.obtenus % 1 === 0 ? sc.obtenus : sc.obtenus.toFixed(1)}/${sc.totaux}`, colX[2] + 2, y + 5);
          doc.setTextColor(...lvl.color);
          doc.setFont('helvetica', 'bold');
          doc.text(lvl.code, colX[3] + 2, y + 5);
          y += 7;
        });
        y += 8;
      }

      // === STATS CLASSE ===
      if (cfg.showStats !== false && stats) {
        if (y > pageHeight - 45) { doc.addPage(); y = margin; }
        doc.setTextColor(...colors.dark);
        doc.setFontSize(12);
        doc.setFont('helvetica', 'bold');
        doc.text('STATISTIQUES CLASSE', margin, y);
        y += 7;

        doc.setFillColor(245, 247, 250);
        doc.roundedRect(margin, y, contentWidth, 22, 3, 3, 'F');
        doc.setTextColor(...colors.dark);
        doc.setFontSize(9);
        doc.setFont('helvetica', 'normal');

        const statItems = [
          `Moyenne: ${stats.moyenne}/${stats.total}`,
          `Min: ${stats.min}`,
          `Médiane: ${stats.mediane}`,
          `Max: ${stats.max}`,
          `Élèves corrigés: ${stats.count}`
        ];
        const spacing = contentWidth / statItems.length;
        statItems.forEach((item, i) => {
          doc.text(item, margin + 6 + i * spacing, y + 9);
        });

        // Competency averages
        const allStudents = window.__getStudentList ? window.__getStudentList() : [];
        const compAvgs = {};
        let nCorr = 0;
        allStudents.forEach(s => {
          if (!isStudentCorrected(s.id)) return;
          nCorr++;
          const sc = competencyScores(s.id);
          Object.keys(sc).forEach(k => {
            if (!compAvgs[k]) compAvgs[k] = { sum: 0, count: 0 };
            compAvgs[k].sum += sc[k].pourcentage;
            compAvgs[k].count++;
          });
        });

        if (Object.keys(compAvgs).length > 0) {
          const avgText = Object.keys(compAvgs).map(k => {
            const avg = Math.round(compAvgs[k].sum / compAvgs[k].count);
            return `${niceCompetence(k)}: ${avg}%`;
          }).join('   ');
          doc.setFontSize(8);
          doc.text(avgText, margin + 6, y + 17);
        }
        y += 30;
      }

      // === SIGNATURES ===
      if (cfg.showSignatures !== false) {
        y = Math.max(y, pageHeight - 30);
        doc.setDrawColor(...colors.dark);
        doc.setLineWidth(0.3);
        doc.line(margin, y, margin + 65, y);
        doc.setFontSize(9);
        doc.setTextColor(...colors.dark);
        doc.text('Signature élève', margin + 32.5, y + 6, { align: 'center' });
        doc.line(pageWidth - margin - 65, y, pageWidth - margin, y);
        doc.text('Signature parents', pageWidth - margin - 32.5, y + 6, { align: 'center' });
      }
    });

    doc.save(fileName);
  }

  // --- Config Modal ---
  function showConfigModal(mode) {
    const cfg = getConfig();
    // Try to detect evaluation title from page
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
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
          <input type="checkbox" data-key="showNote" ${cfg.showNote !== false ? 'checked' : ''}> Note globale + niveau
        </label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
          <input type="checkbox" data-key="showComment" ${cfg.showComment !== false ? 'checked' : ''}> Commentaire / Appréciation
        </label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
          <input type="checkbox" data-key="showCompetences" ${cfg.showCompetences !== false ? 'checked' : ''}> Compétences (barres colorées)
        </label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
          <input type="checkbox" data-key="showExercises" ${cfg.showExercises !== false ? 'checked' : ''}> Détail par exercice (tableau)
        </label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
          <input type="checkbox" data-key="showStats" ${cfg.showStats !== false ? 'checked' : ''}> Statistiques classe
        </label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer">
          <input type="checkbox" data-key="showSignatures" ${cfg.showSignatures !== false ? 'checked' : ''}> Zones de signature
        </label>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button id="bpdf-cancel" style="padding:8px 16px;background:#eee;border:none;border-radius:6px;cursor:pointer;font-size:13px">Annuler</button>
        <button id="bpdf-generate" style="padding:8px 16px;background:#2980b9;color:white;border:none;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600">📥 Générer PDF</button>
      </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Close on overlay click
    overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });

    modal.querySelector('#bpdf-cancel').addEventListener('click', () => overlay.remove());
    modal.querySelector('#bpdf-generate').addEventListener('click', () => {
      // Save config
      const newCfg = {
        titre: modal.querySelector('#bpdf-titre').value.trim(),
        classe: modal.querySelector('#bpdf-classe').value.trim()
      };
      modal.querySelectorAll('#bpdf-options input[type=checkbox]').forEach(cb => {
        newCfg[cb.dataset.key] = cb.checked;
      });
      saveConfig(newCfg);

      // Gather student IDs
      const students = window.__getStudentList ? window.__getStudentList() : [];
      let ids = [];
      if (mode === 'all') {
        ids = students.filter(s => isStudentCorrected(s.id)).map(s => s.id);
      } else if (mode === 'single') {
        const currentId = window.__getStudentId ? window.__getStudentId() : null;
        if (currentId) ids = [currentId];
      }

      if (ids.length === 0) {
        alert('Aucun élève corrigé trouvé.');
        return;
      }

      overlay.remove();

      // Generate
      let fName;
      if (mode === 'single') {
        const s = students.find(st => st.id === ids[0]);
        const name = s ? (s.nom || '').replace(/\s+/g, '_') : 'eleve';
        fName = `Bilan_${name}.pdf`;
      } else {
        const classe = newCfg.classe ? '_' + newCfg.classe.replace(/\s+/g, '_') : '';
        fName = `Bilans${classe}.pdf`;
      }

      generatePDF(ids, fName);
    });
  }

  // --- Button injection ---
  function injectButtons() {
    // 1. Replace "Imprimer bilans individuels" button in overview
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.includes('Imprimer bilans individuels') && !btn.dataset.bpdfInjected) {
        btn.dataset.bpdfInjected = '1';
        const pdfBtn = document.createElement('button');
        pdfBtn.className = btn.className;
        pdfBtn.innerHTML = '📥 Bilans PDF';
        pdfBtn.title = 'Générer les bilans individuels en PDF pour tous les élèves corrigés';
        pdfBtn.style.cssText = btn.style.cssText;
        pdfBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          showConfigModal('all');
        });
        btn.parentElement.insertBefore(pdfBtn, btn.nextSibling);
      }
    });

    // 2. Add PDF button in student summary modal (Résumé)
    // Look for the print button in the summary
    document.querySelectorAll('button').forEach(btn => {
      if ((btn.textContent.includes('Imprimer ce bilan') || btn.textContent.includes('🖨️ Imprimer')) &&
          btn.closest('.fixed, dialog, [role="dialog"]') && !btn.dataset.bpdfSingle) {
        btn.dataset.bpdfSingle = '1';
        const pdfBtn = document.createElement('button');
        pdfBtn.textContent = '📥 PDF';
        pdfBtn.title = 'Générer le bilan PDF de cet élève';
        pdfBtn.style.cssText = 'padding:10px 20px;background:#2980b9;color:white;border:none;border-radius:5px;cursor:pointer;margin-left:8px;font-weight:600';
        pdfBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          e.preventDefault();
          showConfigModal('single');
        });
        btn.parentElement.insertBefore(pdfBtn, btn.nextSibling);
      }
    });
  }

  // --- Init ---
  const observer = new MutationObserver(() => {
    injectButtons();
  });

  function init() {
    const app = document.getElementById('app') || document.getElementById('appMathalea');
    if (!app) { setTimeout(init, 200); return; }
    observer.observe(app, { childList: true, subtree: true });
    setTimeout(injectButtons, 1000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

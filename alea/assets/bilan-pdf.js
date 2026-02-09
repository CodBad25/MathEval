// bilan-pdf.js — Génération de bilans individuels PDF avec jsPDF (1 page / élève)
(function () {
  'use strict';
  if (!new URLSearchParams(window.location.search).get('v')?.includes('correction')) return;

  const jspdfScript = document.createElement('script');
  jspdfScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
  document.head.appendChild(jspdfScript);

  const qrScript = document.createElement('script');
  qrScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js';
  document.head.appendChild(qrScript);

  const CONFIG_KEY = 'bilanConfig';
  const colors = {
    primary: [41, 128, 185], success: [39, 174, 96], warning: [230, 126, 34],
    danger: [231, 76, 60], dark: [44, 62, 80], light: [236, 240, 241], white: [255, 255, 255]
  };
  const SEUIL_TBM = 90, SEUIL_MS = 70, SEUIL_MF = 30;
  // Couleur unique par compétence
  const compColorMap = {
    modeliser:   [155, 89, 182],   // Violet
    calculer:    [52, 152, 219],   // Bleu
    raisonner:   [46, 204, 113],   // Vert
    communiquer: [230, 126, 34],   // Orange
    representer: [231, 76, 60],    // Rouge
    chercher:    [241, 196, 15],   // Jaune
  };
  const compLetterMap = { modeliser:'M', calculer:'Ca', raisonner:'R', communiquer:'Co', representer:'Re', chercher:'Ch' };
  function compColor(k) { return compColorMap[k] || colors.primary; }

  function getConfig() { try { return JSON.parse(localStorage.getItem(CONFIG_KEY) || '{}'); } catch { return {}; } }
  function saveConfig(c) { localStorage.setItem(CONFIG_KEY, JSON.stringify(c)); }
  function normalizeComp(n) { return n ? n.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim() : n; }
  function niceComp(k) {
    return { modeliser:'Modéliser', calculer:'Calculer', raisonner:'Raisonner', communiquer:'Communiquer', representer:'Représenter', chercher:'Chercher' }[k] || k.charAt(0).toUpperCase()+k.slice(1);
  }
  function levelFromPct(p) {
    if (p >= SEUIL_TBM) return { code:'TBM', label:'Très Bonne Maîtrise', color: colors.success };
    if (p >= SEUIL_MS)  return { code:'MS',  label:'Maîtrise Satisfaisante', color: colors.primary };
    if (p >= SEUIL_MF)  return { code:'MF',  label:'Maîtrise Fragile', color: colors.warning };
    return { code:'MI', label:'Maîtrise Insuffisante', color: colors.danger };
  }
  function fmt(n) { return n % 1 === 0 ? String(n) : n.toFixed(1); }

  // --- Scoring ---
  function getCorr() { try { return JSON.parse(localStorage.getItem('studentCorrections')||'{}'); } catch { return {}; } }
  function getCW() { try { return JSON.parse(localStorage.getItem('competencyWeights')||'null'); } catch { return null; } }
  function getExercises() { return window.__getExercises ? window.__getExercises() : []; }
  function getStudents() { return window.__getStudentList ? window.__getStudentList() : []; }

  function globalScore(sid) {
    const corr = getCorr()[sid], exs = getExercises();
    if (!corr) return { correct:0, total:0 };
    let c=0, t=0;
    exs.forEach(ex => ex.questions.forEach(q => {
      const d = corr[ex.exerciceIndex]?.[q.questionIndex];
      t += q.points;
      if (d?.pointsObtenus !== undefined) c += d.pointsObtenus;
      else if (d?.status==='TB') c += q.points;
      else if (d?.status==='TB-') c += q.points/2;
    }));
    return { correct:c, total:t };
  }

  function exScore(sid, i) {
    const corr = getCorr()[sid], ex = getExercises()[i];
    if (!corr||!ex) return { o:0, t:0 };
    let o=0, t=0;
    ex.questions.forEach(q => {
      const d = corr[ex.exerciceIndex]?.[q.questionIndex];
      t += q.points;
      if (d?.pointsObtenus !== undefined) o += d.pointsObtenus;
      else if (d?.status==='TB') o += q.points;
      else if (d?.status==='TB-') o += q.points/2;
    });
    return { o, t };
  }

  function compScores(sid) {
    const corr = getCorr()[sid], exs = getExercises(), cw = getCW(), we = {};
    if (!corr) return {};
    exs.forEach(ex => ex.questions.forEach(q => {
      const d = corr[ex.exerciceIndex]?.[q.questionIndex];
      if (d?.status) {
        const pts = q.points||1;
        let earned = d.status==='TB' ? pts : d.status==='TB-' ? pts/2 : 0;
        const w = cw?.[ex.exerciceIndex];
        if (w) Object.entries(w).forEach(([comp,pct]) => {
          const k = normalizeComp(comp);
          if (!we[k]) we[k]={c:0,t:0}; we[k].t += pts*pct; we[k].c += earned*pct;
        });
        else {
          const cs = ex.detailParQuestion ? q.competences : ex.competencesExercice;
          if (!cs||!cs.length) return;
          const sh = 1/cs.length;
          cs.forEach(comp => { const k=normalizeComp(comp); if(!we[k]) we[k]={c:0,t:0}; we[k].t+=pts*sh; we[k].c+=earned*sh; });
        }
      }
    }));
    const r = {};
    Object.keys(we).forEach(k => { const c=we[k].c, t=we[k].t; if(t>0) { const p=c/t*100; r[k]={correct:Math.round(c*10)/10, total:Math.round(t*10)/10, pct:p, lvl:levelFromPct(p)}; } });
    return r;
  }

  function isCorrected(sid) {
    const c = getCorr()[sid];
    return c ? Object.keys(c).some(k => k!=='commentaire' && Object.keys(c[k]).length>0) : false;
  }
  function getComment(sid) { return getCorr()[sid]?.commentaire || ''; }

  function classStats() {
    const scores = [];
    getStudents().forEach(s => { if (!isCorrected(s.id)) return; const g=globalScore(s.id); if(g.total>0) scores.push(g.correct); });
    if (!scores.length) return null;
    scores.sort((a,b)=>a-b);
    const sum = scores.reduce((a,b)=>a+b,0);
    const med = scores.length%2===0 ? (scores[scores.length/2-1]+scores[scores.length/2])/2 : scores[Math.floor(scores.length/2)];
    return { n:scores.length, avg:Math.round(sum/scores.length*10)/10, min:scores[0], max:scores[scores.length-1], med:Math.round(med*10)/10, total:globalScore(getStudents().find(s=>isCorrected(s.id)).id).total, scores };
  }

  function classCompAvgs() {
    const a = {};
    getStudents().forEach(s => { if(!isCorrected(s.id)) return; const sc=compScores(s.id); Object.keys(sc).forEach(k => { if(!a[k]) a[k]={s:0,n:0}; a[k].s+=sc[k].pct; a[k].n++; }); });
    return a;
  }

  function scoreDistribution(stats) {
    if (!stats || !stats.scores || !stats.total) return null;
    const total = stats.total;
    const nbBins = 5;
    const binSize = total / nbBins;
    const bins = new Array(nbBins).fill(0);
    const labels = [];
    for (let i = 0; i < nbBins; i++) {
      labels.push(`${fmt(Math.round(binSize*i))}-${fmt(Math.round(binSize*(i+1)))}`);
    }
    stats.scores.forEach(s => {
      const bin = Math.min(nbBins-1, Math.floor(s / binSize));
      bins[bin]++;
    });
    return { bins, labels, max: Math.max(...bins) };
  }

  // --- QR Code helper ---
  function makeQRDataURL(text, size) {
    if (!window.qrcode) return null;
    try {
      const qr = qrcode(0, 'M');
      qr.addData(text);
      qr.make();
      const modules = qr.getModuleCount();
      const cellSize = Math.floor(size / modules);
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = cellSize * modules;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#000000';
      for (let r = 0; r < modules; r++)
        for (let c = 0; c < modules; c++)
          if (qr.isDark(r, c)) ctx.fillRect(c*cellSize, r*cellSize, cellSize, cellSize);
      return canvas.toDataURL('image/png');
    } catch { return null; }
  }

  // ===================== PDF (strict 1 page / élève) =====================
  function generatePDF(ids, fileName) {
    if (!window.jspdf) { alert('jsPDF non chargé.'); return; }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p','mm','a4');
    const PW=210, M=12, W=PW-2*M;
    const exs = getExercises(), cfg = getConfig();
    const stats = cfg.showStats!==false ? classStats() : null;
    const cAvg = cfg.showStats!==false ? classCompAvgs() : {};
    const dist = stats ? scoreDistribution(stats) : null;
    const date = new Date().toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'});

    ids.forEach((sid, idx) => {
      if (idx > 0) doc.addPage();
      const stu = getStudents().find(s=>s.id===sid);
      const name = stu ? `${stu.nom||''} ${stu.prenom||''}`.trim() : sid;
      const g = globalScore(sid);
      const pct = g.total>0 ? g.correct/g.total*100 : 0;
      const comment = getComment(sid);
      const comps = compScores(sid);
      const compKeys = Object.keys(comps);

      let y = 0;

      // ── BANDEAU EN-TÊTE (25mm) ──
      doc.setFillColor(...colors.primary);
      doc.rect(0, 0, PW, 25, 'F');
      doc.setTextColor(255,255,255);
      doc.setFontSize(16); doc.setFont('helvetica','bold');
      doc.text("BILAN D'ÉVALUATION — Mathématiques", PW/2, 10, {align:'center'});
      doc.setFontSize(10); doc.setFont('helvetica','normal');
      const sub = (cfg.titre||'Évaluation') + (cfg.classe ? ' — '+cfg.classe : '');
      doc.text(sub, PW/2, 18, {align:'center'});
      doc.setFontSize(7);
      doc.text(date, PW/2, 23, {align:'center'});
      y = 29;

      // ── NOM ÉLÈVE (bande grise) ──
      doc.setFillColor(...colors.light);
      doc.roundedRect(M, y, W, 9, 2, 2, 'F');
      doc.setTextColor(...colors.dark);
      doc.setFontSize(13); doc.setFont('helvetica','bold');
      doc.text(name, M+4, y+6.5);
      y += 13;

      // ── NOTE + APPRÉCIATION (côte à côte) ──
      if (cfg.showNote!==false && g.total>0) {
        const lvl = levelFromPct(pct);
        const hasComment = cfg.showComment!==false && comment;
        const noteW = hasComment ? 42 : W;
        const noteH = 20;

        // Note box
        doc.setFillColor(...lvl.color);
        doc.roundedRect(M, y, noteW, noteH, 2, 2, 'F');
        doc.setTextColor(255,255,255);
        doc.setFontSize(20); doc.setFont('helvetica','bold');
        doc.text(`${fmt(g.correct)}/${g.total}`, M + noteW/2, y+10, {align:'center'});
        doc.setFontSize(7); doc.setFont('helvetica','normal');
        doc.text(lvl.code+' — '+lvl.label, M + noteW/2, y+16, {align:'center'});

        // Appreciation box (à droite de la note)
        if (hasComment) {
          const appX = M + noteW + 3;
          const appW = W - noteW - 3;
          const lines = doc.splitTextToSize(comment, appW - 10);
          const appH = Math.max(noteH, 6 + lines.length * 3.5);

          doc.setFillColor(248, 249, 250);
          doc.roundedRect(appX, y, appW, appH, 2, 2, 'F');
          doc.setDrawColor(...colors.primary); doc.setLineWidth(0.8);
          doc.line(appX, y, appX, y + appH);
          doc.setTextColor(...colors.dark);
          doc.setFontSize(8); doc.setFont('helvetica','normal');
          doc.text(lines, appX + 5, y + 5);
          y += Math.max(noteH, appH) + 4;
        } else {
          y += noteH + 4;
        }
      } else if (cfg.showComment!==false && comment) {
        // Pas de note mais un commentaire seul
        const lines = doc.splitTextToSize(comment, W - 10);
        const bh = Math.max(10, 6 + lines.length * 3.5);
        doc.setFillColor(248, 249, 250);
        doc.roundedRect(M, y, W, bh, 2, 2, 'F');
        doc.setDrawColor(...colors.primary); doc.setLineWidth(0.8);
        doc.line(M, y, M, y + bh);
        doc.setTextColor(...colors.dark);
        doc.setFontSize(8); doc.setFont('helvetica','normal');
        doc.text(lines, M + 5, y + 5);
        y += bh + 4;
      }

      // ── COMPÉTENCES (barres colorées par compétence) ──
      if (cfg.showCompetences!==false && compKeys.length>0) {
        doc.setTextColor(...colors.dark);
        doc.setFontSize(9); doc.setFont('helvetica','bold');
        doc.text('COMPÉTENCES ÉVALUÉES', M, y);
        y += 4;
        compKeys.forEach(k => {
          const c = comps[k];
          const cc = compColor(k);
          // Barre de fond gris clair
          doc.setFillColor(230, 230, 230);
          doc.roundedRect(M, y, W, 7, 1.5, 1.5, 'F');
          // Barre de progression (couleur de la compétence)
          const filledW = Math.max(8, (c.pct / 100) * W);
          doc.setFillColor(...cc);
          doc.roundedRect(M, y, filledW, 7, 1.5, 1.5, 'F');
          // Nom de la compétence (blanc sur la barre)
          doc.setTextColor(255,255,255);
          doc.setFontSize(7.5); doc.setFont('helvetica','bold');
          doc.text(niceComp(k), M+3, y+5);
          // Score à droite (sur fond gris si la barre n'atteint pas)
          const scoreText = `${c.lvl.code} — ${fmt(c.correct)}/${fmt(c.total)} (${Math.round(c.pct)}%)`;
          doc.setTextColor(...colors.dark);
          doc.setFontSize(6.5); doc.setFont('helvetica','bold');
          doc.text(scoreText, PW-M-2, y+5, {align:'right'});
          y += 8;
        });
        y += 2;
      }

      // ── DÉTAIL PAR EXERCICE ──
      if (cfg.showExercises!==false && exs.length>0) {
        doc.setTextColor(...colors.dark);
        doc.setFontSize(9); doc.setFont('helvetica','bold');
        doc.text('DÉTAIL PAR EXERCICE', M, y);
        y += 3;
        // Header
        doc.setFillColor(...colors.primary);
        doc.rect(M, y, W, 5.5, 'F');
        doc.setTextColor(255,255,255);
        doc.setFontSize(7); doc.setFont('helvetica','bold');
        doc.text('#', M+3, y+4);
        doc.text('Exercice', M+10, y+4);
        doc.text('Score', PW-M-30, y+4);
        doc.text('Niveau', PW-M-12, y+4);
        y += 5.5;
        exs.forEach((ex, i) => {
          const sc = exScore(sid, i);
          const ep = sc.t>0 ? sc.o/sc.t*100 : 0;
          const lv = sc.t>0 ? levelFromPct(ep) : {code:'-',color:[150,150,150]};
          doc.setFillColor(i%2===0?250:242, i%2===0?250:245, i%2===0?250:248);
          doc.rect(M, y, W, 5, 'F');
          doc.setTextColor(...colors.dark);
          doc.setFontSize(6.5); doc.setFont('helvetica','bold');
          doc.text(String(i+1), M+3, y+3.5);
          doc.setFont('helvetica','normal');
          doc.text((ex.titre||`Exercice ${i+1}`).substring(0,70), M+10, y+3.5);
          doc.text(`${fmt(sc.o)}/${sc.t}`, PW-M-30, y+3.5);
          doc.setTextColor(...lv.color); doc.setFont('helvetica','bold');
          doc.text(lv.code, PW-M-12, y+3.5);
          y += 5;
        });
        y += 4;
      }

      // ── RÉSULTATS DE LA CLASSE (histogramme + barres compétences) ──
      if (cfg.showStats!==false && stats) {
        doc.setTextColor(...colors.dark);
        doc.setFontSize(9); doc.setFont('helvetica','bold');
        doc.text('RÉSULTATS DE LA CLASSE', M, y);
        y += 4;

        // Fond de la section stats
        const statsH = 50;
        doc.setFillColor(...colors.light);
        doc.roundedRect(M, y, W, statsH, 2, 2, 'F');

        // --- Texte stats en haut ---
        doc.setTextColor(...colors.dark);
        doc.setFontSize(7.5); doc.setFont('helvetica','normal');
        doc.text(`Moy: ${fmt(stats.avg)}/${stats.total}`, M+4, y+5);
        doc.text(`Min: ${fmt(stats.min)}`, M+40, y+5);
        doc.text(`Méd: ${fmt(stats.med)}`, M+62, y+5);
        doc.text(`Max: ${fmt(stats.max)}`, M+84, y+5);
        doc.text(`${stats.n} corrigé(s)`, M+106, y+5);

        const chartY = y + 9;
        const chartH = 32;

        // --- HISTOGRAMME (moitié gauche) ---
        if (dist && dist.max > 0) {
          const histX = M + 4;
          const histW = W/2 - 10;
          const nbBins = dist.bins.length;
          const barGap = 2;
          const barW = (histW - (nbBins-1)*barGap) / nbBins;

          // Titre
          doc.setFontSize(7); doc.setFont('helvetica','bold');
          doc.setTextColor(...colors.dark);
          doc.text('Distribution des notes', histX + histW/2, chartY, {align:'center'});

          const barsY = chartY + 4;
          const barsH = chartH - 8;

          for (let i = 0; i < nbBins; i++) {
            const x = histX + i * (barW + barGap);
            const h = dist.max > 0 ? (dist.bins[i] / dist.max) * barsH : 0;

            // Couleur selon la tranche
            const midPct = ((i + 0.5) / nbBins) * 100;
            const binLvl = levelFromPct(midPct);
            doc.setFillColor(...binLvl.color);

            if (h > 0) {
              doc.roundedRect(x, barsY + barsH - h, barW, h, 1, 1, 'F');
              // Nombre au-dessus
              doc.setFontSize(6.5); doc.setFont('helvetica','bold');
              doc.setTextColor(...colors.dark);
              doc.text(String(dist.bins[i]), x + barW/2, barsY + barsH - h - 1.5, {align:'center'});
            }

            // Label en dessous
            doc.setFontSize(5.5); doc.setFont('helvetica','normal');
            doc.setTextColor(100,100,100);
            doc.text(dist.labels[i], x + barW/2, barsY + barsH + 3.5, {align:'center'});
          }
        }

        // --- BARRES COMPÉTENCES (moitié droite) ---
        const compAvgKeys = Object.keys(cAvg);
        if (compAvgKeys.length > 0) {
          const barX = M + W/2 + 5;
          const barAreaW = W/2 - 10;

          // Titre
          doc.setFontSize(7); doc.setFont('helvetica','bold');
          doc.setTextColor(...colors.dark);
          doc.text('Réussite par compétence', barX + barAreaW/2, chartY, {align:'center'});

          const labelW = 28;
          const pctW = 12;
          const fillW = barAreaW - labelW - pctW;
          const barH = 5;
          const startY = chartY + 5;
          const gap = Math.min(3, (chartH - 8 - compAvgKeys.length * barH) / Math.max(1, compAvgKeys.length - 1));

          compAvgKeys.forEach((k, i) => {
            const avg = Math.round(cAvg[k].s / cAvg[k].n);
            const cc = compColor(k);
            const by = startY + i * (barH + gap);

            // Label avec couleur de la compétence
            doc.setFontSize(6.5); doc.setFont('helvetica','bold');
            doc.setTextColor(...cc);
            doc.text(niceComp(k), barX, by + 3.5);

            // Fond barre gris
            doc.setFillColor(220, 220, 220);
            doc.roundedRect(barX + labelW, by, fillW, barH, 1, 1, 'F');

            // Barre remplie (couleur de la compétence)
            const filledW = Math.max(1, (avg / 100) * fillW);
            doc.setFillColor(...cc);
            doc.roundedRect(barX + labelW, by, filledW, barH, 1, 1, 'F');

            // Pourcentage
            doc.setFontSize(6.5); doc.setFont('helvetica','bold');
            doc.setTextColor(...cc);
            doc.text(`${avg}%`, barX + labelW + fillW + 2, by + 3.5);
          });
        }

        y += statsH + 4;
      }

      // ── QR CODE + SIGNATURES (bas de page) ──
      const qrUrl = window.location.href.replace('v=correction', 'v=eleve');
      const qrImg = makeQRDataURL(qrUrl, 256);
      const sy = 270;

      if (qrImg) {
        const qrSize = 22;
        const qrX = PW/2 - qrSize/2;
        const qrY = sy - qrSize - 4;
        doc.addImage(qrImg, 'PNG', qrX, qrY, qrSize, qrSize);
        doc.setFontSize(5.5); doc.setTextColor(120,120,120); doc.setFont('helvetica','normal');
        doc.text('Refaire les exercices', PW/2, qrY + qrSize + 3, {align:'center'});
      }

      if (cfg.showSignatures!==false) {
        doc.setDrawColor(...colors.dark); doc.setLineWidth(0.3);
        doc.line(M, sy, M+55, sy);
        doc.setFontSize(7); doc.setTextColor(...colors.dark); doc.setFont('helvetica','normal');
        doc.text('Signature élève', M+27, sy+4, {align:'center'});
        doc.line(PW-M-55, sy, PW-M, sy);
        doc.text('Signature parents', PW-M-27, sy+4, {align:'center'});
      }
    });

    doc.save(fileName);
  }

  // ===================== Config Modal =====================
  function showConfigModal(mode) {
    const cfg = getConfig();
    let dt = ''; const h1 = document.querySelector('h1'); if (h1) dt = h1.textContent.trim();
    const ov = document.createElement('div');
    ov.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.5);z-index:10000;display:flex;align-items:center;justify-content:center';
    const md = document.createElement('div');
    md.style.cssText = 'background:white;border-radius:12px;padding:24px;max-width:480px;width:90%;font-family:sans-serif;color:#333;box-shadow:0 20px 60px rgba(0,0,0,.3)';
    md.innerHTML = `
      <h3 style="margin:0 0 16px;font-size:18px;color:#2980b9">📄 Générer les bilans PDF</h3>
      <div style="margin-bottom:12px">
        <label style="font-size:13px;font-weight:600;display:block;margin-bottom:4px">Titre de l'évaluation</label>
        <input id="bpdf-titre" type="text" value="${cfg.titre||dt}" placeholder="Ex: Bilan 4ème - Calcul littéral"
          style="width:100%;padding:8px;border:1px solid #ddd;border-radius:6px;font-size:13px;box-sizing:border-box">
      </div>
      <div style="margin-bottom:16px">
        <label style="font-size:13px;font-weight:600;display:block;margin-bottom:4px">Classe</label>
        <input id="bpdf-classe" type="text" value="${cfg.classe||''}" placeholder="Ex: 4ème C"
          style="width:100%;padding:8px;border:1px solid #ddd;border-radius:6px;font-size:13px;box-sizing:border-box">
      </div>
      <div style="font-size:13px;font-weight:600;margin-bottom:8px">Contenu du bilan :</div>
      <div id="bpdf-options" style="display:flex;flex-direction:column;gap:6px;margin-bottom:16px">
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" data-key="showNote" ${cfg.showNote!==false?'checked':''}> Note globale + niveau</label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" data-key="showComment" ${cfg.showComment!==false?'checked':''}> Appréciation</label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" data-key="showCompetences" ${cfg.showCompetences!==false?'checked':''}> Compétences</label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" data-key="showExercises" ${cfg.showExercises!==false?'checked':''}> Détail par exercice</label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" data-key="showStats" ${cfg.showStats!==false?'checked':''}> Statistiques classe</label>
        <label style="display:flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" data-key="showSignatures" ${cfg.showSignatures!==false?'checked':''}> Zones de signature</label>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end">
        <button id="bpdf-cancel" style="padding:8px 16px;background:#eee;border:none;border-radius:6px;cursor:pointer;font-size:13px">Annuler</button>
        <button id="bpdf-generate" style="padding:8px 16px;background:#2980b9;color:white;border:none;border-radius:6px;cursor:pointer;font-size:13px;font-weight:600">📥 Générer PDF</button>
      </div>`;
    ov.appendChild(md); document.body.appendChild(ov);
    ov.addEventListener('click', e => { if(e.target===ov) ov.remove(); });
    md.querySelector('#bpdf-cancel').addEventListener('click', () => ov.remove());
    md.querySelector('#bpdf-generate').addEventListener('click', () => {
      const nc = { titre: md.querySelector('#bpdf-titre').value.trim(), classe: md.querySelector('#bpdf-classe').value.trim() };
      md.querySelectorAll('#bpdf-options input[type=checkbox]').forEach(cb => { nc[cb.dataset.key]=cb.checked; });
      saveConfig(nc);
      const sts = getStudents(); let ids=[];
      if (mode==='all') ids = sts.filter(s=>isCorrected(s.id)).map(s=>s.id);
      else { const cid = window.__getStudentId?.(); if(cid) ids=[cid]; }
      if (!ids.length) { alert('Aucun élève corrigé.'); return; }
      ov.remove();
      const fn = mode==='single' ? `Bilan_${(sts.find(s=>s.id===ids[0])?.nom||'eleve').replace(/\s+/g,'_')}.pdf` : `Bilans${nc.classe?'_'+nc.classe.replace(/\s+/g,'_'):''}.pdf`;
      generatePDF(ids, fn);
    });
  }

  // ===================== Injection boutons =====================
  function injectButtons() {
    document.querySelectorAll('button').forEach(btn => {
      if (btn.textContent.includes('Imprimer bilans individuels') && !btn.dataset.bpdfInjected) {
        btn.dataset.bpdfInjected = '1';
        const b = document.createElement('button');
        b.className = btn.className; b.innerHTML = '📥 Bilans PDF';
        b.title = 'Générer les bilans PDF'; b.style.cssText = btn.style.cssText;
        b.addEventListener('click', e => { e.stopPropagation(); e.preventDefault(); showConfigModal('all'); });
        btn.parentElement.insertBefore(b, btn.nextSibling);
      }
    });
    document.querySelectorAll('button').forEach(btn => {
      if ((btn.textContent.includes('Imprimer ce bilan')||btn.textContent.includes('🖨️ Imprimer')) && btn.closest('.fixed,dialog,[role="dialog"]') && !btn.dataset.bpdfSingle) {
        btn.dataset.bpdfSingle = '1';
        const b = document.createElement('button');
        b.textContent = '📥 PDF'; b.title = 'PDF de cet élève';
        b.style.cssText = 'padding:10px 20px;background:#2980b9;color:white;border:none;border-radius:5px;cursor:pointer;margin-left:8px;font-weight:600';
        b.addEventListener('click', e => { e.stopPropagation(); e.preventDefault(); showConfigModal('single'); });
        btn.parentElement.insertBefore(b, btn.nextSibling);
      }
    });
  }

  const obs = new MutationObserver(() => { injectButtons(); });
  function init() {
    const app = document.getElementById('app') || document.getElementById('appMathalea');
    if (!app) { setTimeout(init, 200); return; }
    obs.observe(app, { childList:true, subtree:true });
    setTimeout(injectButtons, 1000);
  }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

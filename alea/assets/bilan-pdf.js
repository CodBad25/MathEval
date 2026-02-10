// bilan-pdf.js — Génération de bilans PDF (2 élèves par page A4)
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
  const C = {
    primary: [41, 128, 185], success: [39, 174, 96], warning: [230, 126, 34],
    danger: [231, 76, 60], dark: [44, 62, 80], light: [236, 240, 241], white: [255, 255, 255]
  };
  const SEUIL_TBM = 90, SEUIL_MS = 70, SEUIL_MF = 30;
  const compColorMap = {
    modeliser: [155, 89, 182], calculer: [52, 152, 219], raisonner: [46, 204, 113],
    communiquer: [230, 126, 34], representer: [231, 76, 60], chercher: [241, 196, 15],
  };
  function compColor(k) { return compColorMap[k] || C.primary; }
  const compEmojiMap = {
    modeliser:'🏗️', calculer:'🧮', raisonner:'🧩', communiquer:'💬', representer:'🎨', chercher:'🔍',
  };
  // Convertit un emoji en image PNG data URL via canvas
  function emojiToDataURL(emoji, sizePx) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = sizePx;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, sizePx, sizePx);
    ctx.font = `${Math.floor(sizePx * 0.8)}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, sizePx / 2, sizePx / 2 + sizePx * 0.05);
    return canvas.toDataURL('image/png');
  }
  // Cache des images emoji pré-générées
  let _compImgCache = null;
  function getCompImages() {
    if (_compImgCache) return _compImgCache;
    _compImgCache = {};
    Object.keys(compEmojiMap).forEach(k => {
      _compImgCache[k] = emojiToDataURL(compEmojiMap[k], 64);
    });
    return _compImgCache;
  }
  // Dessine l'icône emoji d'une compétence dans le PDF
  function drawCompIcon(doc, k, x, y, size) {
    const imgs = getCompImages();
    if (imgs[k]) {
      try { doc.addImage(imgs[k], 'PNG', x, y, size, size); return; } catch(e) {}
    }
    // Fallback : pastille colorée avec lettre
    const cc = compColor(k);
    doc.setFillColor(...cc);
    doc.circle(x + size/2, y + size/2, size/2, 'F');
    doc.setTextColor(255,255,255);
    doc.setFontSize(size * 1.6); doc.setFont('helvetica','bold');
    const abbr = {modeliser:'Mo',calculer:'Ca',raisonner:'Ra',communiquer:'Co',representer:'Re',chercher:'Ch'}[k]||'?';
    doc.text(abbr, x + size/2, y + size/2 + size*0.25, {align:'center'});
  }

  function getConfig() { try { return JSON.parse(localStorage.getItem(CONFIG_KEY) || '{}'); } catch { return {}; } }
  function saveConfig(c) { localStorage.setItem(CONFIG_KEY, JSON.stringify(c)); }
  function normalizeComp(n) { return n ? n.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim() : n; }
  function niceComp(k) {
    return { modeliser:'Modéliser', calculer:'Calculer', raisonner:'Raisonner', communiquer:'Communiquer', representer:'Représenter', chercher:'Chercher' }[k] || k.charAt(0).toUpperCase()+k.slice(1);
  }
  function levelFromPct(p) {
    if (p >= SEUIL_TBM) return { code:'TBM', label:'Très Bonne Maîtrise', color: C.success };
    if (p >= SEUIL_MS)  return { code:'MS',  label:'Maîtrise Satisfaisante', color: C.primary };
    if (p >= SEUIL_MF)  return { code:'MF',  label:'Maîtrise Fragile', color: C.warning };
    return { code:'MI', label:'Maîtrise Insuffisante', color: C.danger };
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
    const total = stats.total, nbBins = 5, binSize = total / nbBins;
    const bins = new Array(nbBins).fill(0), labels = [];
    for (let i = 0; i < nbBins; i++) labels.push(`${fmt(Math.round(binSize*i))}-${fmt(Math.round(binSize*(i+1)))}`);
    stats.scores.forEach(s => { bins[Math.min(nbBins-1, Math.floor(s / binSize))]++; });
    return { bins, labels, max: Math.max(...bins) };
  }

  function makeQRDataURL(text, size) {
    if (!window.qrcode) return null;
    try {
      const qr = qrcode(0, 'M'); qr.addData(text); qr.make();
      const modules = qr.getModuleCount(), cellSize = Math.floor(size / modules);
      const canvas = document.createElement('canvas');
      canvas.width = canvas.height = cellSize * modules;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#000000';
      for (let r = 0; r < modules; r++)
        for (let c = 0; c < modules; c++)
          if (qr.isDark(r, c)) ctx.fillRect(c*cellSize, r*cellSize, cellSize, cellSize);
      return canvas.toDataURL('image/png');
    } catch { return null; }
  }

  // ===================== Render one student in a half-page slot =====================
  function renderStudent(doc, sid, Y0, halfH, cfg, exs, stats, cAvg, dist, date, qrImg) {
    const PW = 210, M = 10, W = PW - 2*M;
    const stu = getStudents().find(s=>s.id===sid);
    const name = stu ? `${stu.nom||''} ${stu.prenom||''}`.trim() : sid;
    const g = globalScore(sid);
    const pct = g.total>0 ? g.correct/g.total*100 : 0;
    const comment = getComment(sid);
    const comps = compScores(sid);
    const compKeys = Object.keys(comps);

    let y = Y0;

    // ── BANDEAU (compact 14mm) ──
    doc.setFillColor(...C.primary);
    doc.rect(0, y, PW, 14, 'F');
    doc.setTextColor(255,255,255);
    doc.setFontSize(11); doc.setFont('helvetica','bold');
    doc.text("BILAN D'ÉVALUATION — Mathématiques", PW/2, y+5.5, {align:'center'});
    doc.setFontSize(7.5); doc.setFont('helvetica','normal');
    const sub = (cfg.titre||'Évaluation') + (cfg.classe ? ' — '+cfg.classe : '');
    doc.text(sub + '  •  ' + date, PW/2, y+11, {align:'center'});
    y += 16;

    // ── NOM + QR code ──
    const qrInNameSize = 10;
    const nameBarH = qrImg ? qrInNameSize + 2 : 6;
    doc.setFillColor(...C.light);
    doc.roundedRect(M, y, W, nameBarH, 1.5, 1.5, 'F');
    doc.setTextColor(...C.dark);
    doc.setFontSize(10); doc.setFont('helvetica','bold');
    doc.text(name, M+3, y + nameBarH/2 + 1.5);
    if (qrImg) {
      doc.addImage(qrImg, 'PNG', PW - M - qrInNameSize - 1, y + 1, qrInNameSize, qrInNameSize);
      doc.setFontSize(3.5); doc.setTextColor(130,130,130); doc.setFont('helvetica','normal');
      doc.text('Refaire', PW - M - qrInNameSize/2 - 1, y + qrInNameSize + 1.5, {align:'center'});
    }
    y += nameBarH + 2;

    // ── NOTE + APPRÉCIATION (côte à côte, compact) ──
    if (cfg.showNote!==false && g.total>0) {
      const lvl = levelFromPct(pct);
      const hasComment = cfg.showComment!==false && comment;
      const noteW = hasComment ? 32 : W;
      const noteH = 14;

      doc.setFillColor(...lvl.color);
      doc.roundedRect(M, y, noteW, noteH, 1.5, 1.5, 'F');
      doc.setTextColor(255,255,255);
      doc.setFontSize(15); doc.setFont('helvetica','bold');
      doc.text(`${fmt(g.correct)}/${g.total}`, M + noteW/2, y+5.5, {align:'center'});
      const sur20 = Math.round(g.correct / g.total * 20 * 10) / 10;
      doc.setFontSize(7); doc.setFont('helvetica','normal');
      doc.text(`(${fmt(sur20)}/20)`, M + noteW/2, y+9, {align:'center'});
      doc.setFontSize(5.5);
      doc.text(lvl.code+' — '+lvl.label, M + noteW/2, y+12.5, {align:'center'});

      if (hasComment) {
        const appX = M + noteW + 2;
        const appW = W - noteW - 2;
        doc.setFontSize(6.5); doc.setFont('helvetica','normal');
        const lines = doc.splitTextToSize(comment, appW - 6);
        const maxLines = 5;
        const displayLines = lines.slice(0, maxLines);
        if (lines.length > maxLines) displayLines[maxLines-1] += '...';
        const appH = Math.max(noteH, 4 + displayLines.length * 2.8);

        doc.setFillColor(248, 249, 250);
        doc.roundedRect(appX, y, appW, appH, 1.5, 1.5, 'F');
        doc.setDrawColor(...C.primary); doc.setLineWidth(0.6);
        doc.line(appX, y+1, appX, y + appH - 1);
        doc.setTextColor(...C.dark);
        doc.setFontSize(6.5); doc.setFont('helvetica','normal');
        doc.text(displayLines, appX + 3, y + 3.5);
        y += Math.max(noteH, appH) + 2;
      } else {
        y += noteH + 2;
      }
    } else if (cfg.showComment!==false && comment) {
      doc.setFontSize(6.5); doc.setFont('helvetica','normal');
      const lines = doc.splitTextToSize(comment, W - 6);
      const displayLines = lines.slice(0, 4);
      const bh = Math.max(8, 4 + displayLines.length * 2.8);
      doc.setFillColor(248, 249, 250);
      doc.roundedRect(M, y, W, bh, 1.5, 1.5, 'F');
      doc.setDrawColor(...C.primary); doc.setLineWidth(0.6);
      doc.line(M, y+1, M, y + bh - 1);
      doc.setTextColor(...C.dark);
      doc.setFontSize(6.5); doc.setFont('helvetica','normal');
      doc.text(displayLines, M + 3, y + 3.5);
      y += bh + 2;
    }

    // ── COMPÉTENCES (barres de progression compactes) ──
    if (cfg.showCompetences!==false && compKeys.length>0) {
      doc.setTextColor(...C.dark);
      doc.setFontSize(7); doc.setFont('helvetica','bold');
      doc.text('COMPÉTENCES', M, y+1);
      y += 3;
      compKeys.forEach(k => {
        const c = comps[k], cc = compColor(k);
        const badgeSize = 4;
        // Pastille icône
        drawCompIcon(doc, k, M, y + 0.75, badgeSize);
        // Barre de fond
        doc.setFillColor(230, 230, 230);
        doc.roundedRect(M + badgeSize + 1.5, y, W - badgeSize - 1.5, 5.5, 1, 1, 'F');
        const barW = W - badgeSize - 1.5;
        const filledW = Math.max(6, (c.pct / 100) * barW);
        doc.setFillColor(...cc);
        doc.roundedRect(M + badgeSize + 1.5, y, filledW, 5.5, 1, 1, 'F');
        doc.setTextColor(255,255,255);
        doc.setFontSize(6); doc.setFont('helvetica','bold');
        doc.text(niceComp(k), M + badgeSize + 3.5, y+4);
        doc.setTextColor(...C.dark);
        doc.setFontSize(5.5); doc.setFont('helvetica','bold');
        doc.text(`${c.lvl.code} ${fmt(c.correct)}/${fmt(c.total)} (${Math.round(c.pct)}%)`, PW-M-1, y+4, {align:'right'});
        y += 6;
      });
      y += 1;
    }

    // ── EXERCICES (grille 2 colonnes + pastilles compétences) ──
    if (cfg.showExercises!==false && exs.length>0) {
      const cw = getCW();
      doc.setTextColor(...C.dark);
      doc.setFontSize(7); doc.setFont('helvetica','bold');
      doc.text('EXERCICES', M, y+1);
      y += 3.5;
      const cols = 2, colGap = 2, colW = (W - colGap) / cols, rowH = 5.5;
      exs.forEach((ex, i) => {
        const col = i % cols, row = Math.floor(i / cols);
        const cx = M + col * (colW + colGap);
        const cy = y + row * rowH;
        const sc = exScore(sid, i);
        const ep = sc.t>0 ? sc.o/sc.t*100 : 0;
        const lv = sc.t>0 ? levelFromPct(ep) : {code:'-',color:[150,150,150]};
        // Compétences de cet exercice
        let exComps = [];
        const w = cw?.[ex.exerciceIndex];
        if (w) exComps = Object.keys(w).map(c => normalizeComp(c));
        else if (ex.competencesExercice) exComps = ex.competencesExercice.map(c => normalizeComp(c));
        // Fond alterné
        doc.setFillColor(row%2===0 ? 248 : 240, row%2===0 ? 248 : 243, row%2===0 ? 250 : 247);
        doc.rect(cx, cy, colW, rowH, 'F');
        // Pastilles compétences (à gauche)
        const badgeS = 3;
        let bx = cx + 1;
        exComps.forEach(k => {
          drawCompIcon(doc, k, bx, cy + 0.5, badgeS);
          bx += badgeS + 0.5;
        });
        // Numéro + titre tronqué (après les pastilles)
        const textStart = bx + 1;
        doc.setTextColor(...C.dark); doc.setFontSize(5.5); doc.setFont('helvetica','bold');
        doc.text(`${i+1}.`, textStart, cy + 3.2);
        doc.setFont('helvetica','normal');
        const titleMaxW = cx + colW - textStart - 18;
        let title = ex.titre || `Exercice ${i+1}`;
        while (doc.getTextWidth(title) > titleMaxW && title.length > 5) title = title.slice(0,-1);
        if (title !== (ex.titre || `Exercice ${i+1}`)) title += '…';
        doc.text(title, textStart + 4, cy + 3.2);
        // Score + niveau (aligné à droite)
        doc.text(`${fmt(sc.o)}/${sc.t}`, cx + colW - 14, cy + 3.2);
        doc.setTextColor(...lv.color); doc.setFont('helvetica','bold');
        doc.text(lv.code, cx + colW - 3, cy + 3.2);
      });
      y += Math.ceil(exs.length / cols) * rowH + 1.5;
    }

    // ── STATS CLASSE (compact) + QR + SIGNATURES ──
    const bottomY = Y0 + halfH;

    if (cfg.showStats!==false && stats) {
      doc.setTextColor(...C.dark);
      doc.setFontSize(7); doc.setFont('helvetica','bold');
      doc.text('CLASSE', M, y+1);
      y += 3;

      const statsH = 30;
      doc.setFillColor(...C.light);
      doc.roundedRect(M, y, W, statsH, 1.5, 1.5, 'F');

      // Stats texte
      doc.setTextColor(...C.dark);
      doc.setFontSize(6); doc.setFont('helvetica','normal');
      doc.text(`Moy: ${fmt(stats.avg)}/${stats.total}   Min: ${fmt(stats.min)}   Méd: ${fmt(stats.med)}   Max: ${fmt(stats.max)}   (${stats.n} corrigés)`, M+3, y+4);

      const chartY = y + 6;
      const chartH = 20;

      // Histogramme (gauche)
      if (dist && dist.max > 0) {
        const histX = M + 3, histW = W/2 - 12;
        const nbBins = dist.bins.length, barGap = 1.5;
        const barW = (histW - (nbBins-1)*barGap) / nbBins;
        const barsY = chartY + 2, barsH = chartH - 5;

        for (let i = 0; i < nbBins; i++) {
          const x = histX + i * (barW + barGap);
          const h = dist.max > 0 ? (dist.bins[i] / dist.max) * barsH : 0;
          const midPct = ((i + 0.5) / nbBins) * 100;
          doc.setFillColor(...levelFromPct(midPct).color);
          if (h > 0) {
            doc.roundedRect(x, barsY + barsH - h, barW, h, 0.8, 0.8, 'F');
            doc.setFontSize(5); doc.setFont('helvetica','bold'); doc.setTextColor(...C.dark);
            doc.text(String(dist.bins[i]), x + barW/2, barsY + barsH - h - 1, {align:'center'});
          }
          doc.setFontSize(4.5); doc.setFont('helvetica','normal'); doc.setTextColor(120,120,120);
          doc.text(dist.labels[i], x + barW/2, barsY + barsH + 2.5, {align:'center'});
        }
      }

      // Barres compétences (droite)
      const compAvgKeys = Object.keys(cAvg);
      if (compAvgKeys.length > 0) {
        const barX = M + W/2, barAreaW = W/2 - 5;
        const labelW = 22, pctW = 10, fillW = barAreaW - labelW - pctW;
        const barH = 4, startY = chartY + 1;
        const gap = Math.min(2, (chartH - compAvgKeys.length * barH) / Math.max(1, compAvgKeys.length - 1));

        compAvgKeys.forEach((k, i) => {
          const avg = Math.round(cAvg[k].s / cAvg[k].n);
          const cc = compColor(k);
          const by = startY + i * (barH + gap);
          doc.setFontSize(5.5); doc.setFont('helvetica','bold'); doc.setTextColor(...cc);
          doc.text(niceComp(k), barX, by + 3);
          doc.setFillColor(220, 220, 220);
          doc.roundedRect(barX + labelW, by, fillW, barH, 0.8, 0.8, 'F');
          doc.setFillColor(...cc);
          doc.roundedRect(barX + labelW, by, Math.max(1, (avg/100)*fillW), barH, 0.8, 0.8, 'F');
          doc.setFontSize(5.5); doc.setFont('helvetica','bold'); doc.setTextColor(...cc);
          doc.text(`${avg}%`, barX + labelW + fillW + 1, by + 3);
        });
      }

      y += statsH + 1;
    }

    // Signatures (positionnées en bas de la demi-page, avec espace pour signer)
    if (cfg.showSignatures!==false) {
      const sigY = Math.min(y + 3, bottomY - 6);
      doc.setFontSize(5.5); doc.setTextColor(150,150,150); doc.setFont('helvetica','normal');
      doc.text('Signature élève', M+25, sigY, {align:'center'});
      doc.text('Signature parents', PW-M-25, sigY, {align:'center'});
    }
  }

  // ===================== PDF (2 élèves par page A4) =====================
  function generatePDF(ids, fileName) {
    if (!window.jspdf) { alert('jsPDF non chargé.'); return; }
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p','mm','a4');
    const PH = 297, halfH = PH / 2;
    const cfg = getConfig(), exs = getExercises();
    const stats = cfg.showStats!==false ? classStats() : null;
    const cAvg = cfg.showStats!==false ? classCompAvgs() : {};
    const dist = stats ? scoreDistribution(stats) : null;
    const date = new Date().toLocaleDateString('fr-FR',{day:'numeric',month:'long',year:'numeric'});
    // Build student URL with exercise UUIDs and seeds (alea= param for seed)
    const seeds = JSON.parse(localStorage.getItem('mathalea_exercices_seeds') || '{}');
    const qrUrlObj = new URL(window.location.origin + '/alea/index.html');
    exs.forEach((e, i) => {
      qrUrlObj.searchParams.append('uuid', e.uuid);
      if (seeds[i]) qrUrlObj.searchParams.append('alea', seeds[i]);
    });
    qrUrlObj.searchParams.set('v', 'eleve');
    const qrUrl = qrUrlObj.toString();
    const qrImg = makeQRDataURL(qrUrl, 200);

    for (let i = 0; i < ids.length; i++) {
      const pageIdx = Math.floor(i / 2);
      const slot = i % 2; // 0=top, 1=bottom

      if (pageIdx > 0 && slot === 0) doc.addPage();

      const Y0 = slot * halfH;
      renderStudent(doc, ids[i], Y0, halfH, cfg, exs, stats, cAvg, dist, date, qrImg);

      // Ligne de séparation (ciseaux) entre les deux moitiés
      if (slot === 0) {
        doc.setDrawColor(180, 180, 180); doc.setLineWidth(0.15);
        doc.setLineDashPattern([2, 2], 0);
        doc.line(5, halfH, 205, halfH);
        doc.setLineDashPattern([], 0);
        doc.setFontSize(6); doc.setTextColor(180,180,180);
        doc.text('✂', 3, halfH + 1.5);
      }
    }

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

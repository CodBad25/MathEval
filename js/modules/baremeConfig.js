// ============================================================================
// MODULE BAREME CONFIG - Points + compétences chips pour import PDF
// ============================================================================

function renderPdfBaremeConfig() {
    var container = document.getElementById('pdfBaremeContent');
    var questions = appState.pdfImport.questions;

    container.innerHTML = questions.map(function (q, i) {
        return '<div style="background:white;padding:20px;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.08);">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">' +
            '<h3 style="color:#2c3e50;margin:0;">' + q.label + '</h3>' +
            '<div style="display:flex;align-items:center;gap:8px;">' +
            '<label style="font-weight:600;color:#555;">Points :</label>' +
            '<input type="number" min="0.5" max="20" step="0.5" value="' + q.points + '" ' +
            'onchange="setPdfQuestionPoints(' + i + ', this.value)" ' +
            'style="width:70px;padding:6px;border:2px solid #d1d5db;border-radius:6px;text-align:center;font-weight:bold;">' +
            '</div></div>' +
            '<div style="margin-bottom:8px;font-weight:600;color:#555;font-size:0.9em;">Compétences :</div>' +
            '<div id="pdfQComp_' + i + '" style="display:flex;flex-wrap:wrap;gap:6px;"></div>' +
            '</div>';
    }).join('');

    // Rendre les chips pour chaque question
    questions.forEach(function (q, i) { renderPdfCompetenceChips(i); });
    updatePdfTotalPoints();
}

function renderPdfCompetenceChips(qIndex) {
    var container = document.getElementById('pdfQComp_' + qIndex);
    if (!container) return;
    var q = appState.pdfImport.questions[qIndex];
    var allComps = defaultCompetences.concat(appState.pdfImport.customCompetences);

    container.innerHTML = allComps.map(function (comp) {
        var sel = q.competences.indexOf(comp.name) >= 0;
        var bg = sel ? comp.color : 'white';
        var fg = sel ? 'white' : comp.color;
        return '<button type="button" onclick="togglePdfCompetence(' + qIndex + ',\'' + comp.name + '\')" ' +
            'style="padding:6px 12px;border:2px solid ' + comp.color + ';border-radius:18px;cursor:pointer;' +
            'font-weight:600;background:' + bg + ';color:' + fg + ';font-size:0.85em;transition:all 0.2s;">' +
            comp.icon + ' ' + comp.name + '</button>';
    }).join('') +
    '<button type="button" onclick="promptAddCustomCompetence()" ' +
    'style="padding:6px 12px;border:2px dashed #9ca3af;border-radius:18px;cursor:pointer;' +
    'background:white;color:#6b7280;font-size:0.85em;">+ Ajouter</button>';
}

function togglePdfCompetence(qIndex, compName) {
    var comps = appState.pdfImport.questions[qIndex].competences;
    var idx = comps.indexOf(compName);
    if (idx >= 0) comps.splice(idx, 1); else comps.push(compName);
    renderPdfCompetenceChips(qIndex);
}

function setPdfQuestionPoints(qIndex, value) {
    appState.pdfImport.questions[qIndex].points = parseFloat(value) || 1;
    updatePdfTotalPoints();
}

function updatePdfTotalPoints() {
    var total = appState.pdfImport.questions.reduce(function (sum, q) {
        return sum + (q.points || 0);
    }, 0);
    var el = document.getElementById('pdfCurrentTotal');
    if (el) el.textContent = total;
}

function promptAddCustomCompetence() {
    var name = prompt('Nom de la compétence :');
    if (!name || !name.trim()) return;
    var colors = ['#e11d48', '#0891b2', '#7c3aed', '#ca8a04', '#16a34a', '#dc2626'];
    var color = colors[appState.pdfImport.customCompetences.length % colors.length];
    appState.pdfImport.customCompetences.push({ name: name.trim(), icon: '📋', color: color });
    // Re-rendre tous les chips
    appState.pdfImport.questions.forEach(function (q, i) { renderPdfCompetenceChips(i); });
}

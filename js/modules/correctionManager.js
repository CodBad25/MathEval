// ============================================================================
// MODULE CORRECTION MANAGER - 3 chemins + génération exercisesData
// ============================================================================

function selectCorrectionPath(path) {
    appState.pdfImport.correctionPath = path;
    // UI : highlight la carte sélectionnée
    ['corrPathPdf', 'corrPathPhoto', 'corrPathJson'].forEach(function (id) {
        var el = document.getElementById(id);
        el.style.borderColor = '#e2e8f0';
        el.classList.remove('selected');
    });
    var selected = document.getElementById('corrPath' + path.charAt(0).toUpperCase() + path.slice(1));
    var colors = { pdf: '#ef4444', photo: '#3b82f6', json: '#10b981' };
    selected.style.borderColor = colors[path];
    selected.classList.add('selected');

    renderCorrectionPathContent(path);
    document.getElementById('btnFinalizePdfImport').disabled = false;
}

function renderCorrectionPathContent(path) {
    var container = document.getElementById('correctionPathContent');
    container.style.display = 'block';

    if (path === 'pdf') {
        container.innerHTML =
            '<div style="background:white;padding:20px;border-radius:12px;">' +
            '<h3 style="color:#2c3e50;margin-bottom:15px;">Uploadez le PDF corrigé</h3>' +
            '<input type="file" accept=".pdf" onchange="handleCorrectedPdfUpload(event)" ' +
            'style="padding:10px;border:2px dashed #d1d5db;border-radius:8px;width:100%;cursor:pointer;">' +
            '<div id="correctedPdfPreview" style="margin-top:15px;"></div></div>';
    } else if (path === 'photo') {
        container.innerHTML =
            '<div style="background:white;padding:20px;border-radius:12px;">' +
            '<h3 style="color:#2c3e50;margin-bottom:15px;">Uploadez les photos de corrections</h3>' +
            '<input type="file" accept="image/*" multiple onchange="handlePhotoUpload(event)" ' +
            'style="padding:10px;border:2px dashed #d1d5db;border-radius:8px;width:100%;cursor:pointer;">' +
            '<div id="photoGallery" style="margin-top:15px;display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px;"></div></div>';
    } else if (path === 'json') {
        container.innerHTML =
            '<div style="background:white;padding:20px;border-radius:12px;">' +
            '<h3 style="color:#2c3e50;margin-bottom:15px;">Collez le JSON de corrections</h3>' +
            '<textarea id="jsonCorrectionInput" rows="10" placeholder=\'{"questions":[{"numero":1,"correction":"..."}]}\' ' +
            'style="width:100%;padding:12px;border:2px solid #d1d5db;border-radius:8px;font-family:monospace;font-size:0.85em;"></textarea>' +
            '<button onclick="parseJsonCorrection()" style="margin-top:10px;padding:8px 20px;background:#10b981;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:600;">Importer le JSON</button>' +
            '<div id="jsonPreview" style="margin-top:15px;"></div></div>';
    }
}

function handleCorrectedPdfUpload(event) {
    var file = event.target.files[0];
    if (!file) return;
    document.getElementById('correctedPdfPreview').innerHTML =
        '<p style="color:#10b981;font-weight:600;">PDF corrigé chargé : ' + file.name + '</p>';
    appState.pdfImport.corrections._correctedPdf = file;
}

function handlePhotoUpload(event) {
    var files = Array.from(event.target.files);
    var gallery = document.getElementById('photoGallery');
    var questions = appState.pdfImport.questions;
    gallery.innerHTML = files.map(function (f, i) {
        var url = URL.createObjectURL(f);
        var qLabel = i < questions.length ? questions[i].label : 'Non assignée';
        if (i < questions.length) appState.pdfImport.corrections[questions[i].id] = { imageUrl: url };
        return '<div style="text-align:center;background:#f8fafc;padding:8px;border-radius:8px;">' +
            '<img src="' + url + '" style="max-width:100%;max-height:120px;border-radius:4px;">' +
            '<div style="font-size:0.8em;color:#555;margin-top:4px;">' + qLabel + '</div></div>';
    }).join('');
}

function parseJsonCorrection() {
    var raw = document.getElementById('jsonCorrectionInput').value;
    try {
        var data = JSON.parse(raw);
        var qs = data.questions || [];
        qs.forEach(function (item) {
            var idx = (item.numero || 1) - 1;
            var q = appState.pdfImport.questions[idx];
            if (!q) return;
            q.answer = item.correction || item.answer || '';
            if (item.points) q.points = item.points;
            if (item.competences) q.competences = item.competences;
            appState.pdfImport.corrections[q.id] = { text: q.answer };
        });
        document.getElementById('jsonPreview').innerHTML =
            '<p style="color:#10b981;font-weight:600;">' + qs.length + ' corrections importées</p>';
        renderPdfBaremeConfig(); // Rafraîchir le barème avec les données JSON
    } catch (e) {
        alert('JSON invalide : ' + e.message);
    }
}

function finalizePdfImport() {
    var questions = appState.pdfImport.questions;
    if (questions.length === 0) { alert('Aucune question définie.'); return; }

    var allComps = defaultCompetences.concat(appState.pdfImport.customCompetences);

    // Générer exercisesData compatible avec le moteur de correction
    exercisesData = {};
    exercisesData[1] = {
        title: 'Import PDF - ' + (appState.pdfImport.file ? appState.pdfImport.file.name : 'Sujet'),
        totalPoints: questions.reduce(function (s, q) { return s + (q.points || 0); }, 0),
        questions: questions.map(function (q) {
            var corr = appState.pdfImport.corrections[q.id] || {};
            return {
                id: q.id,
                title: q.label,
                points: q.points || 1,
                statement: q.statement || q.label,
                answer: corr.text || q.answer || '(correction non fournie)',
                competences: (q.competences || []).map(function (cName) {
                    var found = allComps.find(function (c) { return c.name === cName; });
                    return {
                        name: cName,
                        color: found ? found.color : '#666',
                        description: '', tooltip: '',
                        points: Math.round((q.points / Math.max(q.competences.length, 1)) * 10) / 10,
                        increment: 0.5
                    };
                })
            };
        })
    };

    // Configurer baremeConfig pour correspondre
    appState.baremeConfig.exercises = {};
    appState.baremeConfig.exercises['1'] = {
        totalPoints: exercisesData[1].totalPoints,
        selectedCompetences: [],
        questionCompetences: {},
        questionCompetencePoints: {},
        questionPoints: {},
        competenceDetails: {},
        questionCompetenceDetails: {}
    };

    console.log('exercisesData généré:', exercisesData);
    showPage('setupPage');
}

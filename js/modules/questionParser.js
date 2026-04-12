// ============================================================================
// MODULE QUESTION PARSER - Détection auto + gestion manuelle des questions
// ============================================================================

function syncQuestionsFromZones() {
    var zones = appState.pdfImport.zones;
    var existing = appState.pdfImport.questions;

    // Ajuster la taille de la liste
    while (existing.length < zones.length) {
        var n = existing.length + 1;
        existing.push({
            id: 'q' + n, label: 'Question ' + n,
            points: 1, competences: [], statement: '', answer: ''
        });
    }
    while (existing.length > zones.length) {
        existing.pop();
    }
    // Synchroniser les labels
    existing.forEach(function (q, i) {
        q.id = 'q' + (i + 1);
        q.label = 'Question ' + (i + 1);
    });
}

function autoDetectQuestions() {
    var pdf = appState.pdfImport.pdfDoc;
    if (!pdf) { alert('Chargez un PDF d\'abord.'); return; }

    var page = appState.pdfImport.currentPage;
    pdf.getPage(page).then(function (p) {
        return p.getTextContent();
    }).then(function (textContent) {
        var viewport = pdf.getPage(page).then(function (p) {
            return p.getViewport({ scale: pdfImportScale });
        });
        return Promise.all([textContent, viewport]);
    }).then(function (results) {
        var textContent = results[0];
        var viewport = results[1];
        var detected = [];

        textContent.items.forEach(function (item) {
            var text = item.str.trim();
            // Chercher "Exercice N", "Question N", "Partie N"
            if (/^(exercice|question|partie)\s+\d/i.test(text)) {
                var tx = pdfjsLib.Util.transform(viewport.transform, item.transform);
                detected.push({
                    text: text,
                    y: viewport.height - tx[5], // pdf.js y inversé
                    x: tx[4]
                });
            }
        });

        if (detected.length === 0) {
            alert('Aucun marqueur "Exercice/Question/Partie" détecté sur cette page.\nDessinez les zones manuellement.');
            return;
        }

        // Trier par position verticale
        detected.sort(function (a, b) { return a.y - b.y; });

        // Créer des zones approximatives entre chaque marqueur
        var canvasH = viewport.height;
        var canvasW = viewport.width;

        detected.forEach(function (d, i) {
            var yStart = Math.max(0, d.y - 10);
            var yEnd = (i < detected.length - 1) ? detected[i + 1].y - 10 : canvasH;
            var qNum = appState.pdfImport.zones.length + 1;
            appState.pdfImport.zones.push({
                page: page, x: 20, y: yStart,
                w: canvasW - 40, h: yEnd - yStart,
                questionNum: qNum, label: d.text
            });
        });

        syncQuestionsFromZones();
        redrawAllZones();
        renderZonesList();
        updateZonesButtons();
    });
}

function addManualQuestion() {
    var zones = appState.pdfImport.zones;
    var qNum = zones.length + 1;
    // Ajouter une zone par défaut (milieu de page, petite)
    zones.push({
        page: appState.pdfImport.currentPage,
        x: 50, y: 50 + (qNum - 1) * 80, w: 500, h: 60,
        questionNum: qNum, label: 'Question ' + qNum
    });
    syncQuestionsFromZones();
    redrawAllZones();
    renderZonesList();
    updateZonesButtons();
}

function renderZonesList() {
    var panel = document.getElementById('questionsPanel');
    var zones = appState.pdfImport.zones;
    if (zones.length === 0) {
        panel.innerHTML = '<div style="text-align:center;color:#9ca3af;padding:40px 20px;">' +
            '<div style="font-size:48px;margin-bottom:15px;">✏️</div>' +
            '<p>Dessinez des rectangles sur le PDF pour délimiter les questions</p></div>';
        return;
    }
    var colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
    panel.innerHTML = zones.map(function (z, i) {
        var color = colors[i % colors.length];
        return '<div style="padding:12px;margin-bottom:8px;border-radius:8px;border:2px solid ' + color + ';background:' + color + '10;">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;">' +
            '<strong style="color:' + color + ';">Q' + z.questionNum + '</strong>' +
            '<span style="font-size:0.8em;color:#666;">p.' + z.page + '</span>' +
            '<button onclick="deleteZone(' + i + ')" style="background:#ef4444;color:white;border:none;border-radius:4px;padding:2px 8px;cursor:pointer;font-size:0.8em;">x</button>' +
            '</div></div>';
    }).join('');
}

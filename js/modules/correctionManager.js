// ============================================================================
// MODULE CORRECTION MANAGER - 3 chemins + génération exercisesData
// ============================================================================

function selectCorrectionPath(path) {
    appState.pdfImport.correctionPath = path;
    // UI : highlight la carte sélectionnée
    var cardIds = { pdf: 'corrPathPdf', photo: 'corrPathPhoto', json: 'corrPathJson', none: 'corrPathNone' };
    var colors = { pdf: '#ef4444', photo: '#3b82f6', json: '#10b981', none: '#6b7280' };
    Object.values(cardIds).forEach(function (id) {
        var el = document.getElementById(id);
        if (el) { el.style.borderColor = '#e2e8f0'; el.classList.remove('selected'); }
    });
    var selected = document.getElementById(cardIds[path]);
    if (selected) {
        selected.style.borderColor = colors[path];
        selected.classList.add('selected');
    }

    if (path === 'none') {
        document.getElementById('correctionPathContent').style.display = 'none';
    } else {
        renderCorrectionPathContent(path);
    }
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
            '<h3 style="color:#2c3e50;margin-bottom:15px;">Importer les corrections (JSON)</h3>' +
            '<div style="display:flex;gap:10px;margin-bottom:12px;">' +
            '<button onclick="document.getElementById(\'jsonFileInput\').click()" style="padding:10px 20px;background:#4F46E5;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:600;font-size:0.95em;">📁 Charger un fichier JSON</button>' +
            '<input type="file" id="jsonFileInput" accept=".json" style="display:none;" onchange="loadJsonFile(event)">' +
            '<span style="color:#999;align-self:center;">ou collez le JSON ci-dessous</span>' +
            '</div>' +
            '<textarea id="jsonCorrectionInput" rows="8" placeholder=\'{"exercises":[{"questions":[{"numero":1,"correction":"..."}]}]}\' ' +
            'style="width:100%;padding:12px;border:2px solid #d1d5db;border-radius:8px;font-family:monospace;font-size:0.85em;"></textarea>' +
            '<button onclick="parseJsonCorrection()" style="margin-top:10px;padding:8px 20px;background:#10b981;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:600;">Importer</button>' +
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
    // Aplatir toutes les questions de tous les exercices
    var allQuestions = [];
    (appState.pdfImport.exercises || []).forEach(function (ex) {
        ex.questions.forEach(function (q) {
            allQuestions.push({ q: q, exTitle: ex.title });
        });
    });
    gallery.innerHTML = files.map(function (f, i) {
        var url = URL.createObjectURL(f);
        var label = i < allQuestions.length ? allQuestions[i].exTitle + ' — ' + allQuestions[i].q.label : 'Non assignée';
        if (i < allQuestions.length) appState.pdfImport.corrections[allQuestions[i].q.id] = { imageUrl: url };
        return '<div style="text-align:center;background:#f8fafc;padding:8px;border-radius:8px;">' +
            '<img src="' + url + '" style="max-width:100%;max-height:120px;border-radius:4px;">' +
            '<div style="font-size:0.8em;color:#555;margin-top:4px;">' + label + '</div></div>';
    }).join('');
}

function loadJsonFile(event) {
    var file = event.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
        document.getElementById('jsonCorrectionInput').value = e.target.result;
        parseJsonCorrection();
    };
    reader.readAsText(file);
}

function parseJsonCorrection() {
    var raw = document.getElementById('jsonCorrectionInput').value;
    if (!raw || !raw.trim()) {
        alert('Collez le JSON dans le champ texte avant de cliquer Importer.');
        return;
    }
    try {
        var data = JSON.parse(raw);
        var exercises = appState.pdfImport.exercises || [];
        var imported = 0;

        console.log('📥 Import JSON : ' + exercises.length + ' exercices dans l\'app, données JSON:', data);

        if (exercises.length === 0) {
            alert('Aucun exercice détecté dans l\'app. Uploadez d\'abord un document (ODT/PDF) et lancez la détection.');
            return;
        }

        // Format supporté : { exercises: [{ questions: [{numero, correction, points, competences}] }] }
        // Ou format plat : { questions: [{exercice, numero, correction}] }
        if (data.exercises && Array.isArray(data.exercises)) {
            data.exercises.forEach(function (jsonEx, ei) {
                var ex = exercises[ei];
                if (!ex) {
                    console.warn('⚠️ Exercice ' + (ei + 1) + ' du JSON n\'a pas de correspondance dans l\'app');
                    return;
                }
                (jsonEx.questions || []).forEach(function (item) {
                    var idx = (item.numero || 1) - 1;
                    var q = ex.questions[idx];
                    if (!q) {
                        console.warn('⚠️ Question ' + item.numero + ' de l\'exercice ' + (ei + 1) + ' n\'existe pas');
                        return;
                    }
                    q.answer = item.correction || item.answer || '';
                    if (item.points) q.points = item.points;
                    if (item.competences) q.competences = item.competences;
                    appState.pdfImport.corrections[q.id] = { text: q.answer };
                    console.log('✅ Ex' + (ei + 1) + ' Q' + item.numero + ' : correction importée (' + q.answer.substring(0, 50) + '...)');
                    imported++;
                });
            });
        } else if (data.questions && Array.isArray(data.questions)) {
            // Format plat : toutes les questions dans l'ordre
            var allQuestions = [];
            exercises.forEach(function (ex) {
                ex.questions.forEach(function (q) { allQuestions.push(q); });
            });
            data.questions.forEach(function (item, i) {
                var q = allQuestions[i];
                if (!q) return;
                q.answer = item.correction || item.answer || '';
                if (item.points) q.points = item.points;
                if (item.competences) q.competences = item.competences;
                appState.pdfImport.corrections[q.id] = { text: q.answer };
                imported++;
            });
        }

        if (imported === 0) {
            document.getElementById('jsonPreview').innerHTML =
                '<p style="color:#ef4444;font-weight:600;">Aucune correction importée. Vérifiez que le JSON correspond aux exercices détectés (' + exercises.length + ' exercices attendus).</p>';
        } else {
            document.getElementById('jsonPreview').innerHTML =
                '<p style="color:#10b981;font-weight:600;">✅ ' + imported + ' corrections importées avec succès !</p>';
            // Activer le bouton "Lancer la correction"
            var btn = document.getElementById('btnFinalizePdfImport');
            if (btn) btn.disabled = false;
        }
        renderPdfBaremeConfig();
    } catch (e) {
        alert('JSON invalide : ' + e.message);
    }
}

function finalizePdfImport() {
    var exercises = appState.pdfImport.exercises || [];
    if (exercises.length === 0) { alert('Aucun exercice défini.'); return; }

    var totalQ = exercises.reduce(function (s, ex) { return s + ex.questions.length; }, 0);
    if (totalQ === 0) { alert('Aucune question définie.'); return; }

    var allComps = defaultCompetences.concat(appState.pdfImport.customCompetences);

    // Générer exercisesData compatible avec le moteur de correction
    // Un entry par exercice (comme la section DNB)
    exercisesData = {};
    appState.baremeConfig.exercises = {};

    exercises.forEach(function (ex, ei) {
        var exNum = ei + 1;
        var exTotal = ex.questions.reduce(function (s, q) { return s + (q.points || 0); }, 0);

        exercisesData[exNum] = {
            title: ex.title,
            totalPoints: exTotal,
            questions: ex.questions.map(function (q, qi) {
                var corr = appState.pdfImport.corrections[q.id] || {};
                var qNum = qi + 1;
                var qCompetences = q.competences || [];
                var numComps = Math.max(qCompetences.length, 1);

                return {
                    id: 'q' + qNum,
                    title: 'Question ' + qNum,
                    points: q.points || 1,
                    statement: q.text || q.label || '',
                    answer: corr.text || q.answer || '',
                    competences: qCompetences.map(function (cName) {
                        var found = allComps.find(function (c) { return c.name === cName; });
                        return {
                            name: cName,
                            color: found ? found.color : '#666',
                            description: found ? found.description : '',
                            tooltip: '',
                            points: Math.round(((q.points || 1) / numComps) * 10) / 10,
                            increment: 0.5
                        };
                    })
                };
            })
        };

        appState.baremeConfig.exercises[String(exNum)] = {
            totalPoints: exTotal,
            selectedCompetences: [],
            questionCompetences: {},
            questionCompetencePoints: {},
            questionPoints: {},
            competenceDetails: {},
            questionCompetenceDetails: {}
        };
    });

    console.log('✅ exercisesData généré : ' + exercises.length + ' exercices, ' + totalQ + ' questions');
    console.log(exercisesData);
    showPage('setupPage');
}

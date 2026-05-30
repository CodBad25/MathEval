// ============================================================================
// MODULE CORRECTION MANAGER - 3 chemins + génération exercisesData
// ============================================================================

// Distribue les points d'une question entre ses compétences :
//   - en multiples de 0.5 (compatible avec increment 0.5 des clics badges)
//   - somme exacte = q.points
//   - répartition aussi équitable que possible (reste va aux 1ères comp)
//   - max 2 compétences par question : si le JSON en liste plus, on garde
//     les 2 premières (par convention, l'ordre dans le JSON = ordre d'importance)
// Limitation connue : Q 0.5pt avec 2 comp donne "0.5 + 0" — voir
// memory/project_matheval_bareme_v2.md
function _distributeCompetencePoints(qPoints, competenceNames) {
    var names = competenceNames || [];
    if (names.length > 2) {
        console.warn('⚠️ Question avec ' + names.length + ' compétences détectée. ' +
            'Max 2 supporté. Conservées : [' + names.slice(0, 2).join(', ') +
            '], ignorées : [' + names.slice(2).join(', ') + '].');
        names = names.slice(0, 2);
    }
    var n = Math.max(names.length, 1);
    var halves = Math.round((qPoints || 1) * 2);
    var base = Math.floor(halves / n);
    var rem = halves - base * n;
    var pts = [];
    for (var i = 0; i < n; i++) {
        pts.push((base + (i < rem ? 1 : 0)) * 0.5);
    }
    return { names: names, pointsPerComp: pts };
}

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
            '<div style="display:flex;flex-wrap:wrap;gap:10px;margin-bottom:12px;">' +
            '<button onclick="pasteAndImportJson()" style="padding:10px 20px;background:#8b5cf6;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:600;font-size:0.95em;">📋 Coller les corrections</button>' +
            '<button onclick="document.getElementById(\'jsonFileInput\').click()" style="padding:10px 20px;background:#4F46E5;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:600;font-size:0.95em;">📁 Charger un fichier</button>' +
            '<input type="file" id="jsonFileInput" accept=".json" style="display:none;" onchange="loadJsonFile(event)">' +
            '</div>' +
            '<textarea id="jsonCorrectionInput" rows="6" placeholder=\'Ou collez le JSON manuellement ici\' ' +
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

function pasteAndImportJson() {
    navigator.clipboard.readText().then(function (text) {
        if (!text || !text.trim()) {
            alert('Le presse-papier est vide. Lancez d\'abord /correction dans Claude Code.');
            return;
        }
        // Vérifier que c'est du JSON valide
        try {
            JSON.parse(text);
        } catch (e) {
            alert('Le presse-papier ne contient pas de JSON valide.');
            return;
        }
        var textarea = document.getElementById('jsonCorrectionInput');
        if (textarea) textarea.value = text;
        parseJsonCorrection();
    }).catch(function (err) {
        alert('Impossible de lire le presse-papier. Utilisez Cmd+V dans le champ texte puis cliquez Importer.');
    });
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
        //
        // STRATÉGIE D'IMPORT : on aplatit le JSON (toutes questions de tous exos dans l'ordre)
        // et on aplatit l'app (toutes questions détectées par l'OCR dans l'ordre), puis on mappe
        // 1-à-1 par index. Cela rend l'import robuste :
        //  - aux numero string ("1a", "1b", "a", "b"...)
        //  - aux découpages en exercices différents entre JSON et OCR (Bonus séparés ou fusionnés)
        if (data.exercises && Array.isArray(data.exercises)) {
            // Aplatir les questions détectées par l'app (OCR) — sert de pool de réutilisation
            var appAllQuestions = [];
            exercises.forEach(function (ex) {
                ex.questions.forEach(function (q) { appAllQuestions.push(q); });
            });
            // Compter les questions du JSON
            var jsonQCount = 0;
            data.exercises.forEach(function (je) { jsonQCount += (je.questions || []).length; });
            console.log('📊 Mapping : ' + jsonQCount + ' questions JSON → ' + appAllQuestions.length + ' questions détectées par l\'app');
            if (jsonQCount !== appAllQuestions.length) {
                console.warn('⚠️ Décompte différent : ' + jsonQCount + ' (JSON) vs ' + appAllQuestions.length + ' (app). Le JSON est la source de vérité pour la structure.');
            }

            // RECONSTRUCTION DE LA STRUCTURE EXERCICES selon le JSON
            // → si l'OCR a fusionné des exos (ex: Bonus absorbés dans Ex4), on les sépare
            //   en respectant le découpage du JSON. Les questions OCR sont réutilisées
            //   par index ; si l'app en a moins, on crée des questions à partir du JSON.
            var newExercises = [];
            var qIdx = 0;
            data.exercises.forEach(function (jsonEx, ei) {
                var newEx = {
                    id: 'ex' + (ei + 1),
                    num: ei + 1,
                    title: jsonEx.title || ('Exercice ' + (ei + 1)),
                    isBonus: /^bonus/i.test(jsonEx.title || ''),
                    page: 1,
                    y: 0,
                    questions: []
                };
                (jsonEx.questions || []).forEach(function (item, qi) {
                    var q = appAllQuestions[qIdx];
                    if (!q) {
                        // Aucune question OCR correspondante — on crée à partir du JSON
                        q = {
                            id: 'q_json_' + (ei + 1) + '_' + (qi + 1),
                            num: qi + 1,
                            label: String(item.numero || (qi + 1)),
                            text: '',
                            answer: '',
                            points: 1,
                            competences: []
                        };
                    }
                    if (item.enonce) q.text = item.enonce;
                    q.answer = item.correction || item.answer || '';
                    if (item.points) q.points = item.points;
                    if (item.competences) q.competences = item.competences;
                    if (item.numero) q.numero = String(item.numero); // vrai numéro du sujet (1a, 2a, a, b...) pour l'affichage
                    appState.pdfImport.corrections[q.id] = { text: q.answer };
                    newEx.questions.push(q);
                    qIdx++;
                    imported++;
                });
                newExercises.push(newEx);
            });
            // Si l'app avait plus de questions OCR que le JSON, on les laisse dans le dernier exo en fin
            // (cas atypique, on évite de perdre du contenu)
            if (qIdx < appAllQuestions.length && newExercises.length === 0) {
                // pas d'exo JSON du tout — on garde l'OCR
            } else if (qIdx < appAllQuestions.length && newExercises.length > 0) {
                var lastEx = newExercises[newExercises.length - 1];
                for (var i = qIdx; i < appAllQuestions.length; i++) {
                    lastEx.questions.push(appAllQuestions[i]);
                }
            }
            appState.pdfImport.exercises = newExercises;
        } else if (data.questions && Array.isArray(data.questions)) {
            // Format plat : toutes les questions dans l'ordre
            var allQuestions = [];
            exercises.forEach(function (ex) {
                ex.questions.forEach(function (q) { allQuestions.push(q); });
            });
            data.questions.forEach(function (item, i) {
                var q = allQuestions[i];
                if (!q) return;
                if (item.enonce) q.text = item.enonce;
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

        // Si l'utilisateur a DÉJÀ finalisé l'import et corrige des copies, le JSON
        // recollé peut changer la structure (ex: bonus séparés). On régénère
        // exercisesData + on rafraîchit l'UI de correction si elle est active.
        var alreadyFinalized = window.exercisesData && Object.keys(window.exercisesData).length > 0;
        if (alreadyFinalized) {
            console.log('🔁 Régénération exercisesData suite à re-collage du JSON');
            regenerateExercisesDataFromPdfImport();
            // Rafraîchir uniquement les vues compatibles : on évite renderCurrentExercise
            // qui suppose un candidat actif (peut être undefined si on est encore à
            // l'étape "Source des corrections")
            var hasActiveCandidate = appState.activeCandidates
                && appState.activeCandidates.length > 0
                && appState.activeCandidates[appState.currentCandidateIndex];
            try { if (typeof renderExerciseTabs === 'function') renderExerciseTabs(); } catch (e) { console.warn(e); }
            try { if (typeof renderExerciseTabContents === 'function') renderExerciseTabContents(); } catch (e) { console.warn(e); }
            if (hasActiveCandidate) {
                try { if (typeof renderCurrentExercise === 'function') renderCurrentExercise(); } catch (e) { console.warn(e); }
                try { if (typeof updateTotalScore === 'function') updateTotalScore(); } catch (e) { console.warn(e); }
            }
            try { if (typeof renderCandidatesOverview === 'function') renderCandidatesOverview(); } catch (e) { console.warn(e); }
            if (typeof savePdfSession === 'function') savePdfSession();
        }
    } catch (e) {
        alert('JSON invalide : ' + e.message);
    }
}

// Régénère exercisesData + baremeConfig.exercises depuis appState.pdfImport.exercises
// Utilisé par finalizePdfImport() (1er passage) et par parseJsonCorrection() lorsque
// l'utilisateur recolle un JSON après avoir déjà finalisé : la structure change
// (ex: bonus extraits en exercices distincts) et il faut propager partout.
function regenerateExercisesDataFromPdfImport() {
    var exercises = appState.pdfImport.exercises || [];
    if (exercises.length === 0) return false;
    var allComps = defaultCompetences.concat(appState.pdfImport.customCompetences || []);

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
                var distrib = _distributeCompetencePoints(q.points, q.competences || []);
                return {
                    id: 'q' + qNum,
                    title: 'Question ' + (q.numero || qNum),
                    points: q.points || 1,
                    statement: q.text || q.label || '',
                    answer: corr.text || q.answer || '',
                    images: q.images || [],
                    competences: distrib.names.map(function (cName, ci) {
                        var found = allComps.find(function (c) { return c.name === cName; });
                        return {
                            name: cName,
                            color: found ? found.color : '#666',
                            description: found ? found.description : '',
                            tooltip: '',
                            points: distrib.pointsPerComp[ci],
                            increment: 0.5
                        };
                    })
                };
            })
        };

        var qPoints = {};
        var qComps = {};
        var allSelectedComps = [];
        exercisesData[exNum].questions.forEach(function (q) {
            qPoints[q.id] = q.points;
            qComps[q.id] = q.competences.map(function (c) { return c.name; });
            q.competences.forEach(function (c) {
                if (allSelectedComps.indexOf(c.name) < 0) allSelectedComps.push(c.name);
            });
        });

        appState.baremeConfig.exercises[String(exNum)] = {
            totalPoints: exTotal,
            selectedCompetences: allSelectedComps,
            questionCompetences: qComps,
            questionCompetencePoints: {},
            questionPoints: qPoints,
            competenceDetails: {},
            questionCompetenceDetails: {}
        };
    });
    return true;
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
                var distrib = _distributeCompetencePoints(q.points, q.competences || []);

                return {
                    id: 'q' + qNum,
                    title: 'Question ' + (q.numero || qNum),
                    points: q.points || 1,
                    statement: q.text || q.label || '',
                    answer: corr.text || q.answer || '',
                    images: q.images || [],
                    competences: distrib.names.map(function (cName, ci) {
                        var found = allComps.find(function (c) { return c.name === cName; });
                        return {
                            name: cName,
                            color: found ? found.color : '#666',
                            description: found ? found.description : '',
                            tooltip: '',
                            points: distrib.pointsPerComp[ci],
                            increment: 0.5
                        };
                    })
                };
            })
        };

        // Construire questionPoints et questionCompetences pour le format canonique
        var qPoints = {};
        var qComps = {};
        var allSelectedComps = [];
        exercisesData[exNum].questions.forEach(function (q) {
            qPoints[q.id] = q.points;
            qComps[q.id] = q.competences.map(function (c) { return c.name; });
            q.competences.forEach(function (c) {
                if (allSelectedComps.indexOf(c.name) < 0) allSelectedComps.push(c.name);
            });
        });

        appState.baremeConfig.exercises[String(exNum)] = {
            totalPoints: exTotal,
            selectedCompetences: allSelectedComps,
            questionCompetences: qComps,
            questionCompetencePoints: {},
            questionPoints: qPoints,
            competenceDetails: {},
            questionCompetenceDetails: {}
        };
    });

    console.log('✅ exercisesData généré : ' + exercises.length + ' exercices, ' + totalQ + ' questions');
    console.log(exercisesData);
    showPage('setupPage');
}

function exportBilansPdfJson() {
    if (!appState || !appState.candidates || !appState.scores || !appState.baremeConfig) {
        alert('⚠️ Aucune donnée de correction disponible. Commencez une correction d\'abord.');
        return;
    }

    var candidates = appState.candidates || [];
    var activeCandidates = appState.activeCandidates || [];
    var scores = appState.scores || {};
    var quickButtonStates = appState.quickButtonStates || {};
    var candidateComments = appState.candidateComments || {};
    var baremeConfig = appState.baremeConfig || {};
    var validatedCandidates = appState.validatedCandidates || {};
    var presentationScores = appState.presentationScores || {};

    var questionPointsMap = {};
    var questionCompetencesMap = {};

    Object.keys(exercisesData || {}).forEach(function (exId) {
        var ex = exercisesData[exId];
        var exConfig = baremeConfig.exercises ? baremeConfig.exercises[exId] : {};

        questionPointsMap[exId] = {};
        questionCompetencesMap[exId] = {};

        (ex.questions || []).forEach(function (q) {
            var qId = q.id;
            var qPoints = q.points || 1;

            questionPointsMap[exId][qId] = qPoints;

            var qComps = q.competences ? q.competences.map(function (c) { return c.name; }) : [];
            questionCompetencesMap[exId][qId] = qComps;
        });
    });

    var canonical = {
        appState: {
            candidates: candidates,
            activeCandidates: activeCandidates,
            scores: scores,
            quickButtonStates: quickButtonStates,
            candidateComments: candidateComments,
            validatedCandidates: validatedCandidates,
            presentationScores: presentationScores,
            baremeConfig: {
                mode: baremeConfig.mode || 'b',
                totalMax: baremeConfig.totalMax || 20,
                exercises: {}
            }
        },
        exercisesData: exercisesData || {},
        exportDate: new Date().toISOString(),
        version: '1.0'
    };

    Object.keys(exercisesData || {}).forEach(function (exId) {
        var exData = exercisesData[exId];
        var exConfig = baremeConfig.exercises ? baremeConfig.exercises[exId] : {};

        canonical.appState.baremeConfig.exercises[exId] = {
            totalPoints: exData.totalPoints || 0,
            selectedCompetences: exConfig.selectedCompetences || [],
            questionPoints: questionPointsMap[exId] || {},
            questionCompetences: questionCompetencesMap[exId] || {}
        };
    });

    var filename = 'bilans-' + new Date().toISOString().split('T')[0] + '.json';
    var blob = new Blob([JSON.stringify(canonical, null, 2)], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    console.log('✅ Export bilans PDF JSON : ' + filename);
}

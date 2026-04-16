// ============================================================================
// MODULE QUESTION PARSER - Détection hiérarchique Exercice → Questions
// ============================================================================

/**
 * Détection automatique : analyse le texte du PDF via getTextContent()
 * et crée la structure hiérarchique exercices → questions.
 *
 * Heuristiques :
 * - "Exercice N" avec taille police ≥ 11 → nouveau exercice
 * - "N)" ou "N." en début de ligne → nouvelle question dans l'exercice courant
 * - Lignes sur le même Y → fusionnées en une seule ligne
 */
function autoDetectQuestions() {
    // Si on a des paragraphes ODT/DOCX, utiliser ceux-là
    var odtParagraphs = appState.pdfImport._odtParagraphs;
    if (odtParagraphs && odtParagraphs.length > 0) {
        autoDetectFromOdt(odtParagraphs);
        return;
    }

    var pdf = appState.pdfImport.pdfDoc;
    if (!pdf) { alert('Chargez un fichier (PDF, ODT ou DOCX) d\'abord.'); return; }

    // Analyser toutes les pages
    var allItems = [];
    var promises = [];
    for (var p = 1; p <= appState.pdfImport.totalPages; p++) {
        promises.push(extractPageItems(pdf, p));
    }

    Promise.all(promises).then(function (pagesItems) {
        // Fusionner tous les items de toutes les pages
        pagesItems.forEach(function (items) {
            allItems = allItems.concat(items);
        });

        // Cacher le texte brut pour la détection IA
        appState.pdfImport._cachedText = allItems.map(function (i) { return i.text; }).join(' ');

        // Fusionner les items sur la même ligne (même page + même Y ±2px)
        var lines = mergeItemsIntoLines(allItems);

        // Détecter la structure exercices → questions
        var exercises = parseExercisesFromLines(lines);

        if (exercises.length === 0) {
            alert('Aucun exercice détecté.\nL\'app cherche "Exercice 1", "Exercice 2", etc. dans le PDF.\nVous pouvez ajouter des exercices manuellement.');
            return;
        }

        // Stocker dans appState
        appState.pdfImport.exercises = exercises;

        // Créer les zones visuelles sur le canvas
        createZonesFromExercises(exercises, pagesItems);

        // Mettre à jour l'interface
        redrawAllZones();
        renderExercisePanel();
        updateZonesButtons();

        // Message de confirmation
        var totalQ = exercises.reduce(function (s, ex) { return s + ex.questions.length; }, 0);
        console.log('✅ Détecté : ' + exercises.length + ' exercices, ' + totalQ + ' questions');
    });
}

/**
 * Extrait les items texte d'une page avec coordonnées normalisées
 */
function extractPageItems(pdf, pageNum) {
    return pdf.getPage(pageNum).then(function (page) {
        var viewport = page.getViewport({ scale: pdfImportScale });
        return page.getTextContent().then(function (content) {
            return content.items
                .filter(function (item) { return item.str.trim(); })
                .map(function (item) {
                    return {
                        text: item.str,
                        height: item.height || 10,
                        // Convertir en coordonnées canvas (Y inversé)
                        x: item.transform[4] * pdfImportScale,
                        y: viewport.height - (item.transform[5] * pdfImportScale),
                        page: pageNum
                    };
                });
        });
    });
}

/**
 * Fusionne les items qui sont sur la même ligne (même page, Y similaire)
 */
function mergeItemsIntoLines(items) {
    if (items.length === 0) return [];

    // Trier par page, puis par Y, puis par X
    items.sort(function (a, b) {
        if (a.page !== b.page) return a.page - b.page;
        if (Math.abs(a.y - b.y) > 3) return a.y - b.y;
        return a.x - b.x;
    });

    var lines = [];
    var currentLine = { text: items[0].text, page: items[0].page, y: items[0].y, x: items[0].x, height: items[0].height };

    for (var i = 1; i < items.length; i++) {
        var item = items[i];
        // Même ligne si même page et Y proche (±3px après scale)
        if (item.page === currentLine.page && Math.abs(item.y - currentLine.y) <= 3) {
            currentLine.text += ' ' + item.text;
            currentLine.height = Math.max(currentLine.height, item.height);
        } else {
            lines.push(currentLine);
            currentLine = { text: item.text, page: item.page, y: item.y, x: item.x, height: item.height };
        }
    }
    lines.push(currentLine);

    // Nettoyer les espaces multiples
    lines.forEach(function (l) {
        l.text = l.text.replace(/\s+/g, ' ').trim();
    });

    return lines;
}

/**
 * Parse les lignes fusionnées en structure exercices → questions
 */
function parseExercisesFromLines(lines) {
    var exercises = [];
    var currentExercise = null;
    var currentQuestion = null;

    // Patterns de détection
    var exPattern = /exercice\s+(\d+)/i;
    var qNumPattern = /^(\d+)\s*[).]\s*/;
    var qLetterPattern = /^([a-f])\s*[).]\s*/i;
    var questionCounter = 0;

    lines.forEach(function (line) {
        var text = line.text.trim();

        // Détecter un exercice
        var exMatch = text.match(exPattern);
        if (exMatch) {
            // Sauvegarder la question en cours
            if (currentQuestion && currentExercise) {
                currentExercise.questions.push(currentQuestion);
                currentQuestion = null;
            }
            questionCounter = 0;
            // Nouvel exercice
            currentExercise = {
                id: 'ex' + exMatch[1],
                num: parseInt(exMatch[1]),
                title: text,
                page: line.page,
                y: line.y,
                questions: []
            };
            exercises.push(currentExercise);
            return;
        }

        // Pas encore d'exercice détecté → ignorer (en-tête, compétences, etc.)
        if (!currentExercise) return;

        // Détecter une question numérique (1), 2), 3)...) ou lettrée (a), b), c)...)
        var qNumMatch = text.match(qNumPattern);
        var qLetterMatch = !qNumMatch ? text.match(qLetterPattern) : null;
        var qMatch = qNumMatch || qLetterMatch;

        if (qMatch) {
            // Sauvegarder la question précédente
            if (currentQuestion) {
                currentExercise.questions.push(currentQuestion);
            }
            questionCounter++;
            var qLabel;
            if (qNumMatch) {
                qLabel = 'Question ' + qNumMatch[1];
            } else {
                qLabel = 'Question ' + qLetterMatch[1] + ')';
            }
            currentQuestion = {
                id: currentExercise.id + '_q' + questionCounter,
                num: questionCounter,
                label: qLabel,
                text: text.replace(qMatch[0], '').trim(),
                page: line.page,
                y: line.y,
                points: 1,
                competences: [],
                answer: ''
            };
            return;
        }

        // Texte de continuation (ni exercice, ni nouvelle question)
        if (currentQuestion) {
            currentQuestion.text += ' ' + text;
        } else if (currentExercise) {
            // Texte après un exercice mais avant la première question numérotée
            // → on accumule comme texte d'énoncé global de l'exercice
            if (!currentExercise._pendingText) currentExercise._pendingText = '';
            currentExercise._pendingText += (currentExercise._pendingText ? ' ' : '') + text;
            // Mettre à jour le Y de début (première ligne de texte)
            if (!currentExercise._pendingY) {
                currentExercise._pendingY = line.y;
                currentExercise._pendingPage = line.page;
            }
        }
    });

    // Sauvegarder la dernière question
    if (currentQuestion && currentExercise) {
        currentExercise.questions.push(currentQuestion);
    }

    // Post-traitement : exercices sans questions numérotées
    exercises.forEach(function (ex) {
        if (ex.questions.length === 0) {
            // Créer une Question 1 unique avec le texte en attente (ou vide)
            ex.questions.push({
                id: ex.id + '_q1',
                num: 1,
                label: 'Question 1',
                text: ex._pendingText || '',
                page: ex._pendingPage || ex.page,
                y: ex._pendingY || (ex.y + 20),
                points: 1,
                competences: [],
                answer: ''
            });
        }
        // Nettoyage des propriétés temporaires
        delete ex._pendingText;
        delete ex._pendingY;
        delete ex._pendingPage;
    });

    return exercises;
}

/**
 * Crée les zones visuelles sur le canvas à partir des exercices détectés
 */
function createZonesFromExercises(exercises, pagesItems) {
    appState.pdfImport.zones = [];

    // Pour chaque page, calculer la hauteur totale du canvas
    var pageHeights = {};
    pagesItems.forEach(function (items, idx) {
        var maxY = 0;
        items.forEach(function (item) { if (item.y > maxY) maxY = item.y; });
        pageHeights[idx + 1] = maxY + 50;
    });

    exercises.forEach(function (ex) {
        ex.questions.forEach(function (q) {
            // Calculer la zone : de la question au prochain élément
            var yStart = Math.max(0, q.y - 5);
            var yEnd = yStart + 40; // hauteur par défaut

            // Chercher la fin de la zone (prochaine question ou prochain exercice)
            var nextY = findNextElementY(exercises, ex, q);
            if (nextY > 0) {
                yEnd = nextY - 5;
            }

            appState.pdfImport.zones.push({
                page: q.page,
                x: 20,
                y: yStart,
                w: 550,
                h: Math.max(25, yEnd - yStart),
                exerciseId: ex.id,
                exerciseNum: ex.num,
                questionId: q.id,
                questionNum: q.num,
                label: 'Ex' + ex.num + ' Q' + q.num
            });
        });
    });
}

/**
 * Trouve le Y du prochain élément (question ou exercice suivant)
 */
function findNextElementY(exercises, currentEx, currentQ) {
    // Chercher la question suivante dans le même exercice
    var qIdx = currentEx.questions.indexOf(currentQ);
    if (qIdx < currentEx.questions.length - 1) {
        return currentEx.questions[qIdx + 1].y;
    }
    // Sinon chercher l'exercice suivant
    var exIdx = exercises.indexOf(currentEx);
    if (exIdx < exercises.length - 1) {
        return exercises[exIdx + 1].y;
    }
    return 0; // dernier élément
}

// ============================================================================
// GESTION MANUELLE — Ajout/suppression exercices et questions
// ============================================================================

function addManualExercise() {
    var exercises = appState.pdfImport.exercises || [];
    var num = exercises.length + 1;
    exercises.push({
        id: 'ex' + num,
        num: num,
        title: 'Exercice ' + num,
        page: appState.pdfImport.currentPage,
        y: 50,
        questions: []
    });
    appState.pdfImport.exercises = exercises;
    renderExercisePanel();
    updateZonesButtons();
}

function addManualQuestion(exIndex) {
    var ex = appState.pdfImport.exercises[exIndex];
    if (!ex) return;
    var qNum = ex.questions.length + 1;
    var q = {
        id: ex.id + '_q' + qNum,
        num: qNum,
        label: 'Question ' + qNum,
        text: '',
        page: appState.pdfImport.currentPage,
        y: 50 + (qNum - 1) * 60,
        points: 1,
        competences: [],
        answer: ''
    };
    ex.questions.push(q);

    // Ajouter une zone visuelle
    appState.pdfImport.zones.push({
        page: q.page,
        x: 50, y: q.y, w: 500, h: 50,
        exerciseId: ex.id, exerciseNum: ex.num,
        questionId: q.id, questionNum: q.num,
        label: 'Ex' + ex.num + ' Q' + qNum
    });

    redrawAllZones();
    renderExercisePanel();
    updateZonesButtons();
}

function deleteExercise(exIndex) {
    var ex = appState.pdfImport.exercises[exIndex];
    if (!ex) return;
    // Supprimer les zones associées
    appState.pdfImport.zones = appState.pdfImport.zones.filter(function (z) {
        return z.exerciseId !== ex.id;
    });
    appState.pdfImport.exercises.splice(exIndex, 1);
    // Renuméroter
    appState.pdfImport.exercises.forEach(function (e, i) {
        e.num = i + 1;
        e.id = 'ex' + (i + 1);
        e.title = 'Exercice ' + (i + 1);
        e.questions.forEach(function (q, j) {
            q.id = e.id + '_q' + (j + 1);
        });
    });
    redrawAllZones();
    renderExercisePanel();
    updateZonesButtons();
}

function deleteQuestion(exIndex, qIndex) {
    var ex = appState.pdfImport.exercises[exIndex];
    if (!ex) return;
    var q = ex.questions[qIndex];
    // Supprimer la zone associée
    appState.pdfImport.zones = appState.pdfImport.zones.filter(function (z) {
        return z.questionId !== q.id;
    });
    ex.questions.splice(qIndex, 1);
    // Renuméroter
    ex.questions.forEach(function (q2, j) {
        q2.num = j + 1;
        q2.id = ex.id + '_q' + (j + 1);
        q2.label = 'Question ' + (j + 1);
    });
    redrawAllZones();
    renderExercisePanel();
    updateZonesButtons();
}

// ============================================================================
// RENDU DU PANNEAU LATÉRAL (hiérarchique)
// ============================================================================

function renderExercisePanel() {
    var panel = document.getElementById('questionsPanel');
    var exercises = appState.pdfImport.exercises || [];

    if (exercises.length === 0) {
        panel.innerHTML = '<div style="text-align:center;color:#9ca3af;padding:40px 20px;">' +
            '<div style="font-size:48px;margin-bottom:15px;">✏️</div>' +
            '<p>Dessinez des rectangles sur le PDF ou utilisez la détection automatique</p>' +
            '<button onclick="addManualExercise()" style="margin-top:12px;padding:8px 16px;background:#4F46E5;color:white;border:none;border-radius:6px;cursor:pointer;">+ Ajouter un exercice</button>' +
            '</div>';
        return;
    }

    var exColors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

    panel.innerHTML = exercises.map(function (ex, ei) {
        var color = exColors[ei % exColors.length];
        var questionsHtml = ex.questions.map(function (q, qi) {
            var imgHtml = '';
            if (q.images && q.images.length > 0) {
                imgHtml = q.images.map(function (src) {
                    return '<img src="' + src + '" style="max-width:100%;max-height:80px;border-radius:4px;margin-top:4px;border:1px solid #e5e7eb;" alt="figure">';
                }).join('');
            }
            return '<div style="margin-left:12px;padding:8px 10px;margin-bottom:4px;border-radius:6px;background:' + color + '08;border-left:3px solid ' + color + ';">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;">' +
                '<span style="font-size:0.85em;"><strong>Q' + q.num + '</strong> <span style="color:#666;">' + (q.text ? truncate(q.text, 40) : '<em style="color:#bbb;">voir le PDF</em>') + '</span></span>' +
                '<button onclick="deleteQuestion(' + ei + ',' + qi + ')" style="background:none;border:none;color:#ef4444;cursor:pointer;font-size:0.8em;" title="Supprimer">✕</button>' +
                '</div>' + imgHtml + '</div>';
        }).join('');

        // Bouton OCR si l'exercice a des questions sans texte (probablement une image)
        var hasEmptyQuestions = ex.questions.some(function (q) { return !q.text; });
        var ocrBtn = hasEmptyQuestions ?
            '<button onclick="ocrExercise(' + ei + ')" id="ocrBtn_' + ei + '" style="background:#8b5cf6;color:white;border:none;border-radius:4px;padding:2px 8px;cursor:pointer;font-size:0.75em;" title="Extraire le texte par IA">OCR</button>' : '';

        return '<div style="margin-bottom:12px;">' +
            '<div style="padding:10px 12px;border-radius:8px;background:' + color + '15;border:2px solid ' + color + ';">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;">' +
            '<strong style="color:' + color + ';">' + ex.title + '</strong>' +
            '<div style="display:flex;gap:4px;">' +
            ocrBtn +
            '<button onclick="addManualQuestion(' + ei + ')" style="background:' + color + ';color:white;border:none;border-radius:4px;padding:2px 8px;cursor:pointer;font-size:0.75em;">+Q</button>' +
            '<button onclick="deleteExercise(' + ei + ')" style="background:#ef4444;color:white;border:none;border-radius:4px;padding:2px 8px;cursor:pointer;font-size:0.75em;">✕</button>' +
            '</div></div>' +
            '<div style="font-size:0.8em;color:#666;margin-top:2px;">' + ex.questions.length + ' question(s)</div>' +
            '</div>' +
            questionsHtml +
            '</div>';
    }).join('') +
    '<button onclick="addManualExercise()" style="width:100%;padding:8px;background:#f8fafc;border:2px dashed #d1d5db;border-radius:8px;cursor:pointer;color:#6b7280;font-size:0.85em;">+ Ajouter un exercice</button>';
}

function truncate(text, maxLen) {
    if (!text) return '';
    return text.length > maxLen ? text.substring(0, maxLen) + '…' : text;
}

// ============================================================================
// COMPAT — syncQuestionsFromZones (appelé par pdfExtract.js quand on dessine)
// ============================================================================

function syncQuestionsFromZones() {
    // Si on a déjà une structure exercises, ne pas écraser
    if (appState.pdfImport.exercises && appState.pdfImport.exercises.length > 0) return;

    // Fallback : créer un exercice unique avec les zones comme questions
    var zones = appState.pdfImport.zones;
    if (zones.length === 0) return;

    var ex = {
        id: 'ex1', num: 1, title: 'Exercice 1',
        page: zones[0].page, y: zones[0].y,
        questions: zones.map(function (z, i) {
            return {
                id: 'ex1_q' + (i + 1), num: i + 1,
                label: 'Question ' + (i + 1), text: '',
                page: z.page, y: z.y,
                points: 1, competences: [], answer: ''
            };
        })
    };
    appState.pdfImport.exercises = [ex];
}

// Garder la compat avec renderZonesList appelé par pdfExtract.js
function renderZonesList() {
    renderExercisePanel();
}

function updateZonesButtons() {
    var btn = document.getElementById('btnGoToBareme');
    var exercises = appState.pdfImport.exercises || [];
    var totalQ = exercises.reduce(function (s, ex) { return s + ex.questions.length; }, 0);
    if (btn) btn.disabled = totalQ === 0 && appState.pdfImport.zones.length === 0;
}

// ============================================================================
// DÉTECTION IA — Parsing structure via Mistral (plus fiable que les heuristiques)
// ============================================================================

function aiDetectQuestions() {
    var apiKey = getMistralApiKey();
    if (!apiKey) {
        alert('Clé API Mistral non configurée.\nAllez dans Paramètres → OCR par IA pour saisir votre clé.\n\nSinon, utilisez la détection auto (heuristiques).');
        return;
    }

    // Feedback visuel
    var btn = document.querySelector('[onclick*="aiDetectQuestions"]');
    if (btn) { btn.textContent = '⏳ Extraction...'; btn.disabled = true; }

    // Si on a le fichier PDF original → utiliser Mistral OCR (le vrai, parfait)
    // Sinon (ODT/DOCX) → envoyer le texte à mistral-small
    var file = appState.pdfImport.file;
    if (file && appState.pdfImport.fileType === 'pdf') {
        if (btn) btn.textContent = '⏳ Upload PDF...';
        mistralOcrPipeline(file, btn);
    } else {
        extractAllText().then(function (text) {
            if (!text || text.trim().length < 20) {
                alert('Aucun texte extrait du document.');
                if (btn) { btn.textContent = '🤖 Détection IA'; btn.disabled = false; }
                return;
            }
            if (btn) btn.textContent = '⏳ Analyse IA...';
            sendToMistralForParsing(text, btn);
        });
    }
}

function extractAllText() {
    // ODT/DOCX : paragraphes déjà extraits
    var paragraphs = appState.pdfImport._odtParagraphs;
    if (paragraphs && paragraphs.length > 0) {
        var text = paragraphs.map(function (p) { return p.text || ''; }).filter(function (t) { return t; }).join('\n');
        return Promise.resolve(text);
    }

    // PDF : extraire le texte de toutes les pages
    var pdf = appState.pdfImport.pdfDoc;
    if (!pdf) return Promise.resolve(null);

    var promises = [];
    for (var p = 1; p <= pdf.numPages; p++) {
        (function (pageNum) {
            promises.push(
                pdf.getPage(pageNum).then(function (page) {
                    return page.getTextContent().then(function (content) {
                        var items = content.items.filter(function (i) { return i.str.trim(); });
                        items.sort(function (a, b) {
                            var yDiff = b.transform[5] - a.transform[5];
                            if (Math.abs(yDiff) > 5) return yDiff;
                            return a.transform[4] - b.transform[4];
                        });
                        return items.map(function (i) { return i.str; }).join(' ');
                    });
                })
            );
        })(p);
    }

    return Promise.all(promises).then(function (pages) {
        var text = pages.join('\n\n');
        appState.pdfImport._cachedText = text;
        return text;
    });
}

function sendToMistralForParsing(text, btn) {

    console.log('🤖 Détection IA : envoi de ' + text.length + ' caractères à Mistral');

    var apiKey = getMistralApiKey();
    fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'mistral-small-latest',
            messages: [{
                role: 'user',
                content: 'Tu es un parser de devoirs de mathématiques français (collège). Extrais la structure du devoir en JSON strict.\n\nFormat attendu :\n{"exercises":[{"title":"Exercice 1 — Titre","questions":[{"numero":1,"text":"texte complet de la question"}]}]}\n\nRègles :\n- Chaque exercice a un titre (ex: "Exercice 1 — Cours")\n- Les sous-questions a), b), c) comptent comme des questions séparées\n- Garde le texte complet de chaque question avec le contexte\n- Inclus les tableaux Markdown dans le texte si présents\n- Ne mets PAS les corrections, uniquement les énoncés\n- Ignore les en-têtes (nom, classe, date, compétences évaluées)\n\nDevoir :\n' + text.substring(0, 6000)
            }],
            max_tokens: 6000,
            response_format: { type: 'json_object' }
        })
    }).then(function (response) {
        if (!response.ok) throw new Error('Erreur Mistral ' + response.status);
        return response.json();
    }).then(function (data) {
        if (!data.choices || !data.choices[0]) throw new Error('Réponse vide');

        if (data.usage) trackMistralUsage(data.usage.prompt_tokens || 0, data.usage.completion_tokens || 0);

        var result = JSON.parse(data.choices[0].message.content);
        // Gérer les deux clés possibles (exercises ou exercices)
        if (!result.exercises && result.exercices) result.exercises = result.exercices;
        console.log('✅ Détection IA (texte) : ' + (result.exercises || []).length + ' exercices');
        applyMistralResult(result, btn);
    }).catch(function (err) {
        console.error('❌ Détection IA échouée:', err);
        alert('Erreur : ' + err.message);
        if (btn) { btn.textContent = '🤖 Détection IA'; btn.disabled = false; }
    });
}


/**
 * Pipeline Mistral OCR : Upload PDF → OCR → Markdown → Structure JSON
 * Utilise le VRAI endpoint /v1/ocr (pas le chat vision)
 */
function mistralOcrPipeline(file, btn) {
    var apiKey = getMistralApiKey();

    // Étape 1 : Upload du fichier PDF
    console.log('📤 Upload PDF vers Mistral (' + file.size + ' bytes)...');

    var formData = new FormData();
    formData.append('file', file);
    formData.append('purpose', 'ocr');

    fetch('https://api.mistral.ai/v1/files', {
        method: 'POST',
        headers: { 'Authorization': 'Bearer ' + apiKey },
        body: formData
    }).then(function (response) {
        if (!response.ok) throw new Error('Upload échoué : ' + response.status);
        return response.json();
    }).then(function (uploadResult) {
        var fileId = uploadResult.id;
        console.log('✅ PDF uploadé, ID : ' + fileId);

        // Étape 2 : Appeler Mistral OCR
        if (btn) btn.textContent = '⏳ OCR en cours...';

        return fetch('https://api.mistral.ai/v1/ocr', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'mistral-ocr-latest',
                document: { type: 'file', file_id: fileId },
                include_image_base64: true
            })
        });
    }).then(function (response) {
        if (!response.ok) return response.text().then(function (t) { throw new Error('OCR échoué : ' + t); });
        return response.json();
    }).then(function (ocrResult) {
        // Combiner le markdown de toutes les pages
        var markdown = '';
        var ocrImages = {};

        (ocrResult.pages || []).forEach(function (page) {
            markdown += (page.markdown || '') + '\n\n';
            // Extraire les images avec leur ID
            (page.images || []).forEach(function (img) {
                if (img.id && img.image_base64) {
                    // image_base64 contient déjà le préfixe data:image/...;base64,
                    ocrImages[img.id] = img.image_base64.startsWith('data:') ? img.image_base64 : ('data:image/jpeg;base64,' + img.image_base64);
                }
            });
        });

        var nbImages = Object.keys(ocrImages).length;
        console.log('✅ OCR terminé : ' + markdown.length + ' chars, ' + (ocrResult.pages || []).length + ' page(s), ' + nbImages + ' image(s)');

        // Stocker le texte OCR et les images SÉPARÉMENT
        // Le markdown envoyé au parsing ne contient PAS les base64 (sinon il explose la limite)
        appState.pdfImport._cachedText = markdown;
        appState.pdfImport._ocrMarkdown = markdown;
        appState.pdfImport._ocrImages = ocrImages;

        // Étape 3 : Parser la structure avec mistral-small
        if (btn) btn.textContent = '⏳ Structuration...';
        sendToMistralForParsing(markdown, btn);
    }).catch(function (err) {
        console.error('❌ Pipeline OCR échoué:', err);
        alert('Erreur OCR : ' + err.message);
        if (btn) { btn.textContent = '🤖 Détection IA'; btn.disabled = false; }
    });
}

/**
 * Capture toutes les pages du PDF en images base64
 */
function capturePdfPagesAsImages(pdf) {
    var promises = [];
    for (var p = 1; p <= pdf.numPages; p++) {
        (function (pageNum) {
            promises.push(
                pdf.getPage(pageNum).then(function (page) {
                    var scale = 1.5;
                    var viewport = page.getViewport({ scale: scale });
                    var canvas = document.createElement('canvas');
                    canvas.width = viewport.width;
                    canvas.height = viewport.height;
                    var ctx = canvas.getContext('2d');
                    return page.render({ canvasContext: ctx, viewport: viewport }).promise.then(function () {
                        return canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
                    });
                })
            );
        })(p);
    }
    return Promise.all(promises);
}

/**
 * Envoie les images PDF à Pixtral pour parsing visuel
 */
function sendPdfImagesToMistral(images, btn) {
    var apiKey = getMistralApiKey();
    console.log('🤖 Détection IA (vision) : ' + images.length + ' page(s)');

    // Construire le contenu avec toutes les images
    var content = [
        {
            type: 'text',
            text: 'Tu es un parser de devoirs de mathématiques français (collège). Analyse les images de ce devoir et extrais la structure en JSON strict.\n\nFormat attendu :\n{"exercises":[{"title":"Exercice 1 — Titre","questions":[{"numero":1,"text":"texte complet de la question"}]}]}\n\nRègles :\n- Chaque exercice a un titre\n- Les sous-questions a), b), c) comptent comme des questions séparées\n- Garde le texte complet de chaque question\n- Ne mets PAS les corrections, uniquement les énoncés\n- Ignore les en-têtes (nom, classe, date, compétences évaluées)\n- Gère les mises en page multi-colonnes'
        }
    ];

    images.forEach(function (base64) {
        content.push({
            type: 'image_url',
            image_url: { url: 'data:image/jpeg;base64,' + base64 }
        });
    });

    fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + apiKey,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'pixtral-large-latest',
            messages: [{ role: 'user', content: content }],
            max_tokens: 4000,
            response_format: { type: 'json_object' }
        })
    }).then(function (response) {
        if (!response.ok) return response.text().then(function (t) { throw new Error('Mistral ' + response.status + ': ' + t); });
        return response.json();
    }).then(function (data) {
        if (!data.choices || !data.choices[0]) throw new Error('Réponse vide');
        if (data.usage) trackMistralUsage(data.usage.prompt_tokens || 0, data.usage.completion_tokens || 0);

        var result = JSON.parse(data.choices[0].message.content);
        console.log('✅ Détection IA (vision) : ' + (result.exercises || []).length + ' exercices');
        applyMistralResult(result, btn);
    }).catch(function (err) {
        console.error('❌ Détection IA échouée:', err);
        alert('Erreur : ' + err.message);
        if (btn) { btn.textContent = '🤖 Détection IA'; btn.disabled = false; }
    });
}

/**
 * Applique le résultat Mistral (commun aux modes texte et vision)
 */
function applyMistralResult(result, btn) {
    var ocrImages = appState.pdfImport._ocrImages || {};
    var ocrMarkdown = appState.pdfImport._ocrMarkdown || '';

    var exercises = (result.exercises || []).map(function (ex, ei) {
        var exNum = ei + 1;
        return {
            id: 'ex' + exNum,
            num: exNum,
            title: ex.title || ('Exercice ' + exNum),
            page: 1, y: ei * 200 + 50,
            questions: (ex.questions || []).map(function (q, qi) {
                var qNum = qi + 1;
                // Chercher les images associées à cette question
                var questionImages = [];
                var qText = q.text || '';
                // Chercher les refs ![img-X.jpeg](img-X.jpeg) dans le texte
                var imgRefs = qText.match(/!\[([^\]]*)\]\([^)]*\)/g) || [];
                imgRefs.forEach(function (ref) {
                    var idMatch = ref.match(/!\[([^\]]*)\]/);
                    if (idMatch) {
                        var imgId = idMatch[1];
                        if (ocrImages[imgId]) questionImages.push(ocrImages[imgId]);
                    }
                });
                // Aussi chercher les IDs d'images mentionnés directement (img-0, img-1, etc.)
                if (questionImages.length === 0) {
                    var idRefs = qText.match(/img-\d+\.\w+/g) || [];
                    idRefs.forEach(function (id) {
                        if (ocrImages[id]) questionImages.push(ocrImages[id]);
                    });
                }
                return {
                    id: 'ex' + exNum + '_q' + qNum, num: qNum,
                    label: 'Question ' + qNum,
                    text: (q.text || '').replace(/!\[[^\]]*\]\([^)]*\)/g, '').trim(),
                    images: questionImages,
                    page: 1, y: ei * 200 + 50 + qNum * 40,
                    points: q.points || 1, competences: q.competences || [], answer: ''
                };
            })
        };
    });

    // Associer les images OCR aux exercices depuis le markdown
    if (Object.keys(ocrImages).length > 0 && ocrMarkdown) {
        // Découper le markdown par section # (heading)
        var exSections = ocrMarkdown.split(/(?=^#+\s)/m);
        var exSectionMap = {}; // exNum → section text

        exSections.forEach(function (section) {
            // Chercher le numéro d'exercice dans le titre de la section
            var exMatch = section.match(/exercice\s+(\d+)/i);
            if (exMatch) exSectionMap[parseInt(exMatch[1])] = section;
        });

        console.log('🖼️ Association images OCR aux exercices:', Object.keys(exSectionMap).map(function(k) { return 'Ex' + k; }));

        exercises.forEach(function (ex) {
            var section = exSectionMap[ex.num] || '';
            // Trouver les IDs d'images uniques dans cette section
            var sectionImgs = section.match(/img-\d+\.\w+/g) || [];
            var uniqueImgs = [];
            sectionImgs.forEach(function (id) {
                if (uniqueImgs.indexOf(id) < 0) uniqueImgs.push(id);
            });

            uniqueImgs.forEach(function (imgId) {
                if (!ocrImages[imgId]) return;
                var dataUrl = ocrImages[imgId];
                // Vérifier si déjà assignée
                var alreadyAssigned = ex.questions.some(function (q) {
                    return q.images && q.images.indexOf(dataUrl) >= 0;
                });
                if (!alreadyAssigned && ex.questions.length > 0) {
                    // Assigner à la première question
                    if (!ex.questions[0].images) ex.questions[0].images = [];
                    ex.questions[0].images.push(dataUrl);
                    console.log('🖼️ Image ' + imgId + ' → ' + ex.title + ' Q1');
                }
            });
        });
    }

    appState.pdfImport.exercises = exercises;
    appState.pdfImport.zones = [];
    exercises.forEach(function (ex) {
        ex.questions.forEach(function (q) {
            appState.pdfImport.zones.push({
                page: 1, x: 20, y: q.y, w: 550, h: 35,
                exerciseId: ex.id, exerciseNum: ex.num,
                questionId: q.id, questionNum: q.num,
                label: 'Ex' + ex.num + ' Q' + q.num
            });
        });
    });

    renderExercisePanel();
    updateZonesButtons();

    var pdf = appState.pdfImport.pdfDoc;
    if (pdf) realignZonesFromPdf(pdf);
    if (btn) { btn.textContent = '🤖 Détection IA'; btn.disabled = false; }

    var totalQ = exercises.reduce(function (s, ex) { return s + ex.questions.length; }, 0);
    console.log('✅ ' + exercises.length + ' exercices, ' + totalQ + ' questions');
}

// ============================================================================
// OCR — Extraction de texte depuis une image via Mistral Pixtral
// ============================================================================

/**
 * Lance l'OCR sur l'image associée à un exercice (ODT ou zone PDF)
 */
function ocrExercise(exIndex) {
    var ex = appState.pdfImport.exercises[exIndex];
    if (!ex) return;

    var btn = document.getElementById('ocrBtn_' + exIndex);
    if (btn) {
        btn.textContent = '⏳';
        btn.disabled = true;
    }

    var apiKey = getMistralApiKey();
    if (!apiKey) {
        alert('Clé API Mistral non configurée.\n\nAllez dans Paramètres → OCR par IA pour saisir votre clé.');
        if (btn) { btn.textContent = 'OCR'; btn.disabled = false; }
        return;
    }

    // Trouver l'image associée à cet exercice
    getExerciseImageBase64(exIndex).then(function (imageData) {
        if (!imageData) {
            alert('Pas d\'image trouvée pour ' + ex.title);
            if (btn) { btn.textContent = 'OCR'; btn.disabled = false; }
            return;
        }

        console.log('🔍 OCR: Envoi image pour ' + ex.title + ' (' + imageData.base64.length + ' chars)');

        // Appel direct à Mistral (Pixtral Large)
        return fetch('https://api.mistral.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: 'pixtral-large-latest',
                messages: [{
                    role: 'user',
                    content: [
                        { type: 'text', text: 'Tu es un assistant spécialisé dans l\'extraction de contenu mathématique depuis des images de devoirs. Extrais le texte visible dans l\'image en préservant la structure (exercices, questions numérotées). Utilise la notation LaTeX pour les formules mathématiques (ex: $\\frac{3}{4}$, $\\angle BEC$). Numérote les questions si elles sont numérotées dans l\'image. Ne mets pas de titre "Exercice N" en début de réponse.' },
                        { type: 'image_url', image_url: { url: 'data:' + imageData.mimeType + ';base64,' + imageData.base64 } }
                    ]
                }],
                max_tokens: 4096
            })
        });
    }).then(function (response) {
        if (!response) return;
        if (!response.ok) {
            return response.json().then(function (err) {
                throw new Error(err.message || 'Erreur Mistral ' + response.status);
            });
        }
        return response.json();
    }).then(function (data) {
        if (!data || !data.choices || !data.choices[0]) {
            throw new Error('Réponse Mistral invalide');
        }

        // Suivre les coûts
        if (data.usage) {
            trackMistralUsage(data.usage.prompt_tokens || 0, data.usage.completion_tokens || 0);
        }

        var extractedText = data.choices[0].message.content;
        console.log('✅ OCR réussi pour ' + ex.title);
        console.log(extractedText);

        // Parser le texte extrait en questions
        parseOcrResultIntoExercise(exIndex, extractedText);

        if (btn) { btn.textContent = '✓'; btn.style.background = '#10b981'; }
    }).catch(function (err) {
        console.error('❌ OCR échoué:', err);
        alert('Erreur OCR : ' + err.message);
        if (btn) { btn.textContent = 'OCR'; btn.disabled = false; }
    });
}

/**
 * Récupère l'image base64 associée à un exercice
 */
function getExerciseImageBase64(exIndex) {
    var images = appState.pdfImport._odtImages || {};
    var paragraphs = appState.pdfImport._odtParagraphs || [];

    // Chercher l'image de l'exercice dans les paragraphes ODT
    var ex = appState.pdfImport.exercises[exIndex];
    var exPattern = new RegExp('exercice\\s+' + ex.num, 'i');
    var foundExercise = false;

    for (var i = 0; i < paragraphs.length; i++) {
        var p = paragraphs[i];
        if (exPattern.test(p.text)) foundExercise = true;

        if (foundExercise && p.imagePaths && p.imagePaths.length > 0) {
            // Prendre la première image de type 'image' (pas formule)
            for (var j = 0; j < p.imagePaths.length; j++) {
                var img = p.imagePaths[j];
                if (img.type === 'image' && images[img.path]) {
                    var dataUrl = images[img.path];
                    // Extraire le base64 et le mime type du data URL
                    var parts = dataUrl.split(',');
                    var mimeMatch = parts[0].match(/data:([^;]+)/);
                    return Promise.resolve({
                        base64: parts[1],
                        mimeType: mimeMatch ? mimeMatch[1] : 'image/png'
                    });
                }
            }
        }

        // S'arrêter au prochain exercice
        if (foundExercise && i > 0 && /exercice\s+\d/i.test(p.text) && !exPattern.test(p.text)) {
            break;
        }
    }

    // Fallback : si on a un PDF avec un canvas, capturer la zone de l'exercice
    var pdf = appState.pdfImport.pdfDoc;
    if (pdf) {
        return capturePdfZone(exIndex);
    }

    return Promise.resolve(null);
}

/**
 * Capture la zone d'un exercice depuis le canvas PDF
 */
function capturePdfZone(exIndex) {
    var ex = appState.pdfImport.exercises[exIndex];
    var zones = appState.pdfImport.zones.filter(function (z) {
        return z.exerciseId === ex.id;
    });

    if (zones.length === 0) return Promise.resolve(null);

    // Calculer la zone englobante de toutes les questions de l'exercice
    var minY = Infinity, maxY = 0, minX = Infinity, maxX = 0;
    zones.forEach(function (z) {
        if (z.y < minY) minY = z.y;
        if (z.y + z.h > maxY) maxY = z.y + z.h;
        if (z.x < minX) minX = z.x;
        if (z.x + z.w > maxX) maxX = z.x + z.w;
    });

    // Agrandir la zone pour inclure le contexte
    minY = Math.max(0, minY - 30);
    maxY = maxY + 30;
    minX = Math.max(0, minX - 10);

    var canvas = document.getElementById('pdfCanvas');
    if (!canvas) return Promise.resolve(null);

    // Créer un canvas temporaire pour le crop
    var cropCanvas = document.createElement('canvas');
    var w = maxX - minX;
    var h = maxY - minY;
    cropCanvas.width = w;
    cropCanvas.height = h;
    var ctx = cropCanvas.getContext('2d');
    ctx.drawImage(canvas, minX, minY, w, h, 0, 0, w, h);

    var dataUrl = cropCanvas.toDataURL('image/png');
    var base64 = dataUrl.split(',')[1];

    return Promise.resolve({ base64: base64, mimeType: 'image/png' });
}

/**
 * Parse le texte OCR et met à jour les questions de l'exercice.
 * Si pas de questions numérotées : extrait la question principale (phrase avec ?)
 * et garde le reste du texte OCR comme contexte/réponse.
 */
function parseOcrResultIntoExercise(exIndex, ocrText) {
    var ex = appState.pdfImport.exercises[exIndex];
    var lines = ocrText.split('\n').filter(function (l) { return l.trim(); });

    // Nettoyer les lignes : retirer markdown (**, ##, ---, |)
    var cleanLines = lines.map(function (l) {
        return l.trim()
            .replace(/^#+\s*/, '')       // titres markdown
            .replace(/\*\*/g, '')        // gras markdown
            .replace(/^\|.*\|$/, '')     // lignes de tableau markdown
            .replace(/^[-|]+$/, '')      // séparateurs de tableau
            .replace(/^---+$/, '')       // séparateurs
            .trim();
    }).filter(function (l) { return l; });

    var questions = [];
    var currentQ = null;
    var qNumPattern = /^(\d+)\s*[).]\s*/;
    var qLetterPattern = /^([a-f])\s*[).]\s*/i;
    var hasNumberedQuestions = cleanLines.some(function (l) { return qNumPattern.test(l) || qLetterPattern.test(l); });
    var qCounter = 0;

    if (hasNumberedQuestions) {
        // Mode classique : questions numérotées ou lettrées
        cleanLines.forEach(function (text) {
            if (/^exercice\s+\d/i.test(text)) return;
            var qNumMatch = text.match(qNumPattern);
            var qLetMatch = !qNumMatch ? text.match(qLetterPattern) : null;
            var qMatch = qNumMatch || qLetMatch;
            if (qMatch) {
                if (currentQ) questions.push(currentQ);
                qCounter++;
                var qLabel = qNumMatch ? 'Question ' + qNumMatch[1] : 'Question ' + qLetMatch[1] + ')';
                currentQ = {
                    id: ex.id + '_q' + qCounter, num: qCounter,
                    label: qLabel,
                    text: text.replace(qMatch[0], '').trim(),
                    page: ex.page || 1, y: ex.y + qCounter * 40,
                    points: 1, competences: [], answer: ''
                };
            } else if (currentQ) {
                currentQ.text += ' ' + text;
            }
        });
        if (currentQ) questions.push(currentQ);
    } else {
        // Pas de questions numérotées : extraire la question principale
        var allText = cleanLines.filter(function (l) {
            return !/^exercice\s+\d/i.test(l);
        });

        // Chercher la phrase-question (se terminant par ?)
        var questionText = '';
        var contextBefore = [];
        var contextAfter = [];
        var foundQuestion = false;

        allText.forEach(function (line) {
            if (!foundQuestion && line.indexOf('?') >= 0) {
                // Inclure le contexte avant + la ligne question
                questionText = contextBefore.concat([line]).join(' ');
                foundQuestion = true;
            } else if (!foundQuestion) {
                contextBefore.push(line);
            } else {
                contextAfter.push(line);
            }
        });

        if (!questionText && allText.length > 0) {
            // Pas de "?" trouvé, prendre la première phrase comme question
            questionText = allText[0];
            contextAfter = allText.slice(1);
        }

        questions.push({
            id: ex.id + '_q1', num: 1,
            label: 'Question 1',
            text: questionText,
            page: ex.page || 1, y: ex.y + 20,
            points: 1, competences: [],
            answer: contextAfter.join('\n')
        });
    }

    // Mettre à jour l'exercice
    if (questions.length > 0) {
        ex.questions = questions;
        // Mettre à jour les zones correspondantes
        appState.pdfImport.zones = appState.pdfImport.zones.filter(function (z) {
            return z.exerciseId !== ex.id;
        });
        questions.forEach(function (q) {
            appState.pdfImport.zones.push({
                page: q.page, x: 20, y: q.y, w: 550, h: 35,
                exerciseId: ex.id, exerciseNum: ex.num,
                questionId: q.id, questionNum: q.num,
                label: 'Ex' + ex.num + ' Q' + q.num
            });
        });
    }

    renderExercisePanel();
    updateZonesButtons();
}

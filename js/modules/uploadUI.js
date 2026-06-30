// ============================================================================
// MODULE UPLOAD UI - Drag & drop + preview PDF/DOCX
// ============================================================================

var pdfImportScale = 1.5; // Échelle de rendu du canvas PDF

function initPdfImportPage() {
    console.log('📄 Initialisation Import PDF/DOCX');
    // Adapter le header pour le mode Import PDF (au lieu de "Correcteur Universel - DNB")
    var title = document.getElementById('appTitle');
    if (title) title.innerHTML = '📄 Correcteur Universel — Import PDF';
    document.title = 'Correcteur Universel — Import PDF';
    // Masquer le bouton Admin global (non pertinent pour le flow Import PDF).
    // On garde Paramètres pour permettre la modif manuelle du barème.
    var adminBtn = document.getElementById('adminToggleBtnHeader');
    if (adminBtn) adminBtn.style.display = 'none';
    // Configurer le worker pdf.js
    if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }
    // Charger la clé API Mistral si elle existe
    loadMistralApiKey();

    // Réinitialisation via URL : app.html?source=upload&reset=1
    // Efface la session sauvegardée pour repartir de zéro sur l'écran d'import
    var resetParam = (new URLSearchParams(window.location.search)).get('reset');
    if (resetParam === '1' && typeof clearPdfSession === 'function') {
        // Demander confirmation : un simple rechargement de l'URL avec &reset=1
        // ne doit JAMAIS effacer silencieusement une session de correction.
        if (confirm('⚠️ Effacer la session sauvegardée (exercices, élèves, notes saisies) ?')) {
            clearPdfSession();
            console.log('🗑️ Session effacée via ?reset=1 — démarrage sur l\'écran d\'import');
        }
        // Retirer reset=1 de l'URL pour que les prochains rechargements soient inoffensifs
        try {
            var cleanUrl = new URL(window.location.href);
            cleanUrl.searchParams.delete('reset');
            history.replaceState(null, '', cleanUrl.toString());
        } catch (e) { /* ignore */ }
        return;
    }

    // Restaurer la session précédente (silencieux) — exos détectés, élèves, scores, etc.
    if (typeof restorePdfSession === 'function') {
        var restored = restorePdfSession();
        if (restored && window.appState && appState.pdfImport && appState.pdfImport.exercises && appState.pdfImport.exercises.length > 0) {
            console.log('♻️ Session restaurée : ' + appState.pdfImport.exercises.length + ' exercices, '
                + ((appState.candidates && appState.candidates.length) || 0) + ' élèves');
            // Aller à la dernière étape utile : si des élèves existent, on va à l'overview ; sinon barème
            if (appState.candidates && appState.candidates.length > 0) {
                if (typeof showPage === 'function') showPage('candidatesOverviewPage');
                if (typeof renderCandidatesOverview === 'function') renderCandidatesOverview();
            } else if (typeof pdfImportGoToStep === 'function') {
                pdfImportGoToStep(3); // configuration barème
            }
        }
    }
}

function retourAccueil() {
    window.location.href = 'index.html';
}

// ============================================================================
// MISTRAL API KEY & SUIVI DES COÛTS
// ============================================================================

var MISTRAL_KEY_STORAGE = 'matheval_mistral_api_key';
var MISTRAL_USAGE_STORAGE = 'matheval_mistral_usage';

function saveMistralApiKey(key) {
    if (key && key.trim()) {
        localStorage.setItem(MISTRAL_KEY_STORAGE, key.trim());
        console.log('🔑 Clé API Mistral sauvegardée');
    } else {
        localStorage.removeItem(MISTRAL_KEY_STORAGE);
    }
}

function loadMistralApiKey() {
    var key = localStorage.getItem(MISTRAL_KEY_STORAGE) || '';
    var input = document.getElementById('mistralApiKeyInput');
    if (input && key) input.value = key;
    updateMistralUsageDisplay();
}

function getMistralApiKey() {
    return localStorage.getItem(MISTRAL_KEY_STORAGE) || '';
}

function toggleMistralKeyVisibility() {
    var input = document.getElementById('mistralApiKeyInput');
    if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
}

function trackMistralUsage(inputTokens, outputTokens) {
    var usage = JSON.parse(localStorage.getItem(MISTRAL_USAGE_STORAGE) || '{"calls":0,"inputTokens":0,"outputTokens":0,"cost":0}');
    usage.calls += 1;
    usage.inputTokens += (inputTokens || 0);
    usage.outputTokens += (outputTokens || 0);
    // Pixtral Large : ~$2/1M input, ~$6/1M output
    usage.cost = (usage.inputTokens / 1000000) * 2 + (usage.outputTokens / 1000000) * 6;
    localStorage.setItem(MISTRAL_USAGE_STORAGE, JSON.stringify(usage));
    updateMistralUsageDisplay();
}

function updateMistralUsageDisplay() {
    var el = document.getElementById('mistralUsageStats');
    if (!el) return;
    var usage = JSON.parse(localStorage.getItem(MISTRAL_USAGE_STORAGE) || '{"calls":0,"inputTokens":0,"outputTokens":0,"cost":0}');
    if (usage.calls === 0) {
        el.innerHTML = 'Aucun appel OCR effectué.';
        return;
    }
    el.innerHTML = '<strong>Utilisation OCR :</strong> ' + usage.calls + ' appel(s) — ' +
        usage.inputTokens.toLocaleString() + ' tokens entrée / ' + usage.outputTokens.toLocaleString() + ' tokens sortie — ' +
        '<strong>Coût estimé : ' + usage.cost.toFixed(4) + ' $</strong>' +
        ' <button onclick="resetMistralUsage()" style="margin-left:8px;padding:2px 8px;border:1px solid #d1d5db;border-radius:4px;cursor:pointer;font-size:0.8em;background:white;">Réinitialiser</button>';
}

function resetMistralUsage() {
    localStorage.removeItem(MISTRAL_USAGE_STORAGE);
    updateMistralUsageDisplay();
}

function testMistralApiKey() {
    var input = document.getElementById('mistralApiKeyInput');
    var key = input ? input.value.trim() : '';
    if (!key) { alert('Saisissez une clé API d\'abord.'); return; }

    var btn = document.getElementById('mistralTestBtn');
    var result = document.getElementById('mistralTestResult');
    if (btn) { btn.textContent = '⏳'; btn.disabled = true; }
    if (result) result.innerHTML = '<span style="color:#666;">Test en cours...</span>';

    // Appel léger : demander à Mistral de répondre "ok"
    fetch('https://api.mistral.ai/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + key,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'mistral-small-latest',
            messages: [{ role: 'user', content: 'Réponds uniquement "ok".' }],
            max_tokens: 5
        })
    }).then(function (response) {
        if (!response.ok) {
            return response.json().then(function (err) {
                throw new Error(err.message || 'Erreur ' + response.status);
            });
        }
        return response.json();
    }).then(function (data) {
        if (data.choices && data.choices[0]) {
            saveMistralApiKey(key);
            if (result) result.innerHTML = '<span style="color:#10b981;font-weight:600;">✅ Clé valide — connexion réussie</span>';
            if (btn) { btn.textContent = '✓'; btn.style.background = '#10b981'; }
            setTimeout(function () {
                if (btn) { btn.textContent = 'Tester'; btn.style.background = '#4F46E5'; btn.disabled = false; }
            }, 3000);
        } else {
            throw new Error('Réponse inattendue');
        }
    }).catch(function (err) {
        console.error('❌ Test clé Mistral:', err);
        if (result) result.innerHTML = '<span style="color:#ef4444;font-weight:600;">❌ ' + err.message + '</span>';
        if (btn) { btn.textContent = 'Tester'; btn.style.background = '#4F46E5'; btn.disabled = false; }
    });
}

function handlePdfFileDrop(event) {
    var file = event.dataTransfer.files[0];
    if (file) processUploadedFile(file);
}

function handlePdfFileSelect(event) {
    var file = event.target.files[0];
    if (file) processUploadedFile(file);
}

function processUploadedFile(file) {
    var ext = file.name.split('.').pop().toLowerCase();
    if (ext !== 'pdf' && ext !== 'docx' && ext !== 'odt') {
        alert('Format non supporté. Utilisez un fichier PDF, ODT ou DOCX.');
        return;
    }
    appState.pdfImport.file = file;
    appState.pdfImport.fileType = ext;
    console.log('📁 Fichier chargé:', file.name, '(' + ext + ')');

    if (ext === 'pdf') {
        loadPdfFile(file);
    } else if (ext === 'odt') {
        loadOdtFile(file);
    } else {
        loadDocxFile(file);
    }
}

function loadPdfFile(file) {
    var reader = new FileReader();
    reader.onload = function (e) {
        var typedArray = new Uint8Array(e.target.result);
        pdfjsLib.getDocument(typedArray).promise.then(function (pdf) {
            appState.pdfImport.pdfDoc = pdf;
            appState.pdfImport.totalPages = pdf.numPages;
            appState.pdfImport.currentPage = 1;
            console.log('📄 PDF chargé:', pdf.numPages, 'pages');
            renderPdfPage(1);
            pdfImportGoToStep(2);
        });
    };
    reader.readAsArrayBuffer(file);
}

function loadDocxFile(file) {
    var reader = new FileReader();
    reader.onload = function (e) {
        mammoth.convertToHtml({ arrayBuffer: e.target.result }).then(function (result) {
            var htmlContent = result.value;
            console.log('📄 DOCX converti en HTML (' + htmlContent.length + ' caractères)');

            // Extraire les paragraphes du HTML pour la détection
            var tempDiv = document.createElement('div');
            tempDiv.innerHTML = htmlContent;
            var paragraphs = [];
            var elements = tempDiv.querySelectorAll('p, h1, h2, h3, h4, h5, h6, li, td, th');
            for (var i = 0; i < elements.length; i++) {
                var el = elements[i];
                var text = (el.textContent || '').trim();
                if (text) {
                    var isBold = el.tagName.charAt(0) === 'H' || el.querySelector('strong, b') !== null;
                    paragraphs.push({
                        text: text,
                        style: '', bold: isBold, underline: false,
                        fontSize: '', hasImage: el.querySelector('img') !== null, imagePaths: []
                    });
                }
            }
            appState.pdfImport._odtParagraphs = paragraphs;

            // Lancer la détection auto
            autoDetectFromOdt(paragraphs);

            // Afficher le HTML dans le container
            var container = document.getElementById('pdfCanvasContainer');
            document.getElementById('pdfCanvas').style.display = 'none';
            document.getElementById('zoneOverlay').style.display = 'none';
            var div = document.getElementById('docxContent') || document.createElement('div');
            div.id = 'docxContent';
            div.style.cssText = 'padding:30px; background:white; max-width:800px; margin:0 auto; font-family:Verdana,sans-serif; font-size:10pt; line-height:1.5;';
            div.innerHTML = htmlContent;
            container.appendChild(div);
            container.scrollTop = 0;

            appState.pdfImport.totalPages = 1;
            pdfImportGoToStep(2);
        }).catch(function (err) {
            console.error('Erreur DOCX:', err);
            alert('Erreur lors de la lecture du fichier DOCX : ' + err.message);
        });
    };
    reader.readAsArrayBuffer(file);
}

function loadOdtFile(file) {
    var reader = new FileReader();
    reader.onload = function (e) {
        var zipInstance = null;

        JSZip.loadAsync(e.target.result).then(function (zip) {
            zipInstance = zip;
            return zip.file('content.xml').async('string');
        }).then(function (xmlString) {
            console.log('📄 ODT content.xml extrait (' + xmlString.length + ' caractères)');

            return extractOdtImages(zipInstance).then(function (images) {
                return { xmlString: xmlString, images: images };
            });
        }).then(function (result) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(result.xmlString, 'application/xml');

            var paragraphs = extractOdtParagraphs(doc);
            appState.pdfImport._odtParagraphs = paragraphs;
            appState.pdfImport._odtImages = result.images;

            // Lancer la détection auto depuis le texte ODT
            autoDetectFromOdt(paragraphs);

            // Demander le PDF pour l'affichage visuel
            showPdfUploadPrompt();

            pdfImportGoToStep(2);
        }).catch(function (err) {
            console.error('Erreur ODT:', err);
            alert('Erreur lors de la lecture du fichier ODT : ' + err.message);
        });
    };
    reader.readAsArrayBuffer(file);
}

/**
 * Affiche une zone pour uploader le PDF associé (rendu visuel)
 * pendant que l'ODT a déjà extrait le texte
 */
function showPdfUploadPrompt() {
    var container = document.getElementById('pdfCanvasContainer');
    document.getElementById('pdfCanvas').style.display = 'none';
    document.getElementById('zoneOverlay').style.display = 'none';

    var div = document.getElementById('docxContent') || document.createElement('div');
    div.id = 'docxContent';
    div.style.cssText = 'padding:40px; background:white; max-width:700px; margin:20px auto; text-align:center;';
    div.innerHTML =
        '<div style="font-size:48px;margin-bottom:15px;">✅</div>' +
        '<h3 style="color:#10b981;margin-bottom:8px;">Texte extrait avec succès depuis l\'ODT</h3>' +
        '<p style="color:#666;margin-bottom:20px;">Pour un aperçu visuel fidèle, ajoutez le PDF correspondant :</p>' +
        '<div id="pdfForVisualZone" style="border:3px dashed #cbd5e1;border-radius:12px;padding:30px;cursor:pointer;transition:all 0.3s;"' +
        ' ondragover="event.preventDefault();this.style.borderColor=\'#4F46E5\';this.style.background=\'#f0f0ff\';"' +
        ' ondragleave="this.style.borderColor=\'#cbd5e1\';this.style.background=\'white\';"' +
        ' ondrop="event.preventDefault();this.style.borderColor=\'#cbd5e1\';this.style.background=\'white\';loadPdfForVisual(event.dataTransfer.files[0]);"' +
        ' onclick="document.getElementById(\'pdfVisualInput\').click();">' +
        '<div style="font-size:32px;margin-bottom:8px;">📄</div>' +
        '<div style="color:#666;">Glissez le PDF ici ou cliquez pour parcourir</div>' +
        '<span style="display:inline-block;margin-top:8px;padding:4px 12px;background:#fee2e2;color:#dc2626;border-radius:16px;font-size:0.8em;font-weight:600;">PDF</span>' +
        '</div>' +
        '<input type="file" id="pdfVisualInput" accept=".pdf" style="display:none;" onchange="loadPdfForVisual(this.files[0]);">' +
        '<button onclick="skipPdfVisual()" style="margin-top:15px;padding:8px 16px;background:none;border:1px solid #d1d5db;border-radius:6px;cursor:pointer;color:#666;font-size:0.85em;">Continuer sans PDF</button>';
    container.appendChild(div);
    container.scrollTop = 0;
}

/**
 * Charge le PDF pour l'affichage visuel (le texte vient de l'ODT)
 */
function loadPdfForVisual(file) {
    if (!file || !file.name.toLowerCase().endsWith('.pdf')) {
        alert('Sélectionnez un fichier PDF.');
        return;
    }
    var reader = new FileReader();
    reader.onload = function (e) {
        var typedArray = new Uint8Array(e.target.result);
        pdfjsLib.getDocument(typedArray).promise.then(function (pdf) {
            appState.pdfImport.pdfDoc = pdf;
            appState.pdfImport.totalPages = pdf.numPages;
            appState.pdfImport.currentPage = 1;
            console.log('📄 PDF visuel chargé:', pdf.numPages, 'pages');

            // Supprimer le prompt et afficher le PDF
            var docxDiv = document.getElementById('docxContent');
            if (docxDiv) docxDiv.remove();
            document.getElementById('pdfCanvas').style.display = 'block';
            document.getElementById('zoneOverlay').style.display = 'block';

            renderPdfPage(1);

            // Recalculer les zones depuis le texte du PDF pour les aligner
            realignZonesFromPdf(pdf);
        });
    };
    reader.readAsArrayBuffer(file);
}

/**
 * Recalcule les positions Y des zones à partir du texte du PDF
 * pour les aligner avec le rendu canvas
 */
function realignZonesFromPdf(pdf) {
    var exercises = appState.pdfImport.exercises || [];
    if (exercises.length === 0) return;

    // Scanner toutes les pages pour trouver les positions réelles
    var promises = [];
    for (var p = 1; p <= pdf.numPages; p++) {
        promises.push(extractPageItems(pdf, p));
    }

    Promise.all(promises).then(function (pagesItems) {
        // Fusionner les items de toutes les pages en lignes
        var allItems = [];
        pagesItems.forEach(function (items) { allItems = allItems.concat(items); });
        var lines = mergeItemsIntoLines(allItems);

        // Patterns
        var exPattern = /exercice\s+(\d+)/i;
        var qPattern = /^(\d+)\s*[).]\s*/;

        // Trouver les positions Y réelles de chaque exercice et question
        var exPositions = {}; // { exNum: { y, page, questions: { qNum: { y, page } } } }

        var currentExNum = null;
        lines.forEach(function (line) {
            var text = line.text.trim();
            var exMatch = text.match(exPattern);
            if (exMatch) {
                currentExNum = parseInt(exMatch[1]);
                exPositions[currentExNum] = { y: line.y, page: line.page, questions: {} };
                return;
            }
            if (currentExNum) {
                var qMatch = text.match(qPattern);
                if (qMatch) {
                    var qNum = parseInt(qMatch[1]);
                    exPositions[currentExNum].questions[qNum] = { y: line.y, page: line.page };
                }
            }
        });

        console.log('📐 Positions PDF recalculées:', exPositions);

        // Mettre à jour les zones avec les positions réelles
        var newZones = [];
        exercises.forEach(function (ex) {
            var exPos = exPositions[ex.num];
            if (!exPos) return;

            ex.questions.forEach(function (q) {
                var qPos = exPos.questions[q.num];
                var yStart, page;

                if (qPos) {
                    yStart = qPos.y - 5;
                    page = qPos.page;
                } else {
                    // Question sans position (ajoutée manuellement ou OCR)
                    // Placer après le titre de l'exercice
                    yStart = exPos.y + 25 + (q.num - 1) * 40;
                    page = exPos.page;
                }

                // Calculer la fin de la zone
                var yEnd = yStart + 35;
                // Chercher la prochaine question ou exercice pour la hauteur
                var nextQPos = exPos.questions[q.num + 1];
                if (nextQPos) {
                    yEnd = nextQPos.y - 3;
                } else {
                    // Dernière question : chercher l'exercice suivant
                    var nextExPos = exPositions[ex.num + 1];
                    if (nextExPos) {
                        yEnd = nextExPos.y - 10;
                    } else {
                        yEnd = yStart + 60;
                    }
                }

                newZones.push({
                    page: page,
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

        appState.pdfImport.zones = newZones;
        redrawAllZones();
        console.log('✅ ' + newZones.length + ' zones réalignées sur le PDF');
    });
}

/**
 * Continuer sans PDF — afficher un résumé texte
 */
function skipPdfVisual() {
    var paragraphs = appState.pdfImport._odtParagraphs || [];
    var images = appState.pdfImport._odtImages || {};
    var div = document.getElementById('docxContent');
    if (div) {
        div.style.textAlign = 'left';
        div.style.padding = '30px';
        div.innerHTML = renderOdtToHtml(paragraphs, images);
    }
}

/**
 * Extrait toutes les images du ZIP ODT et les convertit en data URLs
 */
function extractOdtImages(zip) {
    var imageFiles = [];
    zip.forEach(function (path, entry) {
        if (path.startsWith('Pictures/') || path.startsWith('ObjectReplacements/')) {
            imageFiles.push({ path: path, entry: entry });
        }
    });

    if (imageFiles.length === 0) return Promise.resolve({});

    var promises = imageFiles.map(function (img) {
        return img.entry.async('base64').then(function (base64) {
            var ext = img.path.split('.').pop().toLowerCase();
            var mime = 'image/png';
            if (ext === 'jpg' || ext === 'jpeg') mime = 'image/jpeg';
            else if (ext === 'gif') mime = 'image/gif';
            else if (ext === 'svg') mime = 'image/svg+xml';
            return { path: img.path, dataUrl: 'data:' + mime + ';base64,' + base64 };
        });
    });

    return Promise.all(promises).then(function (results) {
        var images = {};
        results.forEach(function (r) { images[r.path] = r.dataUrl; });
        console.log('🖼️ ' + Object.keys(images).length + ' images extraites de l\'ODT');
        return images;
    });
}

/**
 * Extrait les paragraphes du XML ODT avec leur style
 */
function extractOdtParagraphs(doc) {
    var ns = 'urn:oasis:names:tc:opendocument:xmlns:text:1.0';
    var drawNs = 'urn:oasis:names:tc:opendocument:xmlns:drawing:1.0';
    var styleNs = 'urn:oasis:names:tc:opendocument:xmlns:style:1.0';

    // Récupérer les styles pour détecter gras/souligné (exercices) et les clips d'images
    var styles = {};
    var frameStyles = {};
    var autoStyles = doc.getElementsByTagNameNS(styleNs, 'style');
    for (var i = 0; i < autoStyles.length; i++) {
        var s = autoStyles[i];
        var sName = s.getAttribute('style:name');
        var family = s.getAttribute('style:family');
        var textProps = s.getElementsByTagName('style:text-properties')[0];
        if (textProps) {
            styles[sName] = {
                bold: textProps.getAttribute('fo:font-weight') === 'bold',
                underline: textProps.getAttribute('style:text-underline-style') === 'solid',
                fontSize: textProps.getAttribute('fo:font-size') || ''
            };
        }
        // Récupérer les clips des styles graphiques (pour le recadrage d'images)
        if (family === 'graphic') {
            var graphProps = s.getElementsByTagName('style:graphic-properties')[0];
            if (graphProps) {
                var clip = graphProps.getAttribute('fo:clip');
                if (clip) frameStyles[sName] = { clip: clip };
            }
        }
    }

    // Rendre frameStyles accessible à getTextAndImagesFromNode
    _odtFrameStyles = frameStyles;

    // Parcourir les paragraphes
    var body = doc.getElementsByTagNameNS('urn:oasis:names:tc:opendocument:xmlns:office:1.0', 'text')[0];
    if (!body) return [];

    var paragraphs = [];
    var children = body.childNodes;
    for (var j = 0; j < children.length; j++) {
        var node = children[j];
        if (node.localName === 'p') {
            var result = getTextAndImagesFromNode(node);
            var styleName = node.getAttribute('text:style-name') || '';
            var pStyle = styles[styleName] || {};

            paragraphs.push({
                text: result.text.trim(),
                style: styleName,
                bold: pStyle.bold || false,
                underline: pStyle.underline || false,
                fontSize: pStyle.fontSize || '',
                hasImage: result.imagePaths.length > 0,
                imagePaths: result.imagePaths
            });
        } else if (node.localName === 'table') {
            // Extraire le tableau en lignes/colonnes
            var rows = node.getElementsByTagNameNS('urn:oasis:names:tc:opendocument:xmlns:table:1.0', 'table-row');
            var tableRows = [];
            for (var r = 0; r < rows.length; r++) {
                var cellNodes = rows[r].getElementsByTagNameNS('urn:oasis:names:tc:opendocument:xmlns:table:1.0', 'table-cell');
                var row = [];
                for (var c = 0; c < cellNodes.length; c++) {
                    var cellText = getTextFromNode(cellNodes[c]).trim();
                    row.push(cellText);
                }
                tableRows.push(row);
            }
            if (tableRows.length > 0) {
                paragraphs.push({
                    text: '',
                    style: '', bold: false, underline: false,
                    fontSize: '', hasImage: false, isTable: true,
                    tableRows: tableRows
                });
            }
        }
    }

    return paragraphs;
}

/**
 * Extrait le texte brut et les chemins d'images d'un noeud XML (récursif)
 * Retourne { text, imagePaths }
 */
var _odtFrameStyles = {};

function getTextAndImagesFromNode(node) {
    var frameStyles = _odtFrameStyles;
    var text = '';
    var imagePaths = [];
    for (var i = 0; i < node.childNodes.length; i++) {
        var child = node.childNodes[i];
        if (child.nodeType === 3) { // Text node
            text += child.textContent;
        } else if (child.localName === 'span' || child.localName === 'p' || child.localName === 'h') {
            var sub = getTextAndImagesFromNode(child);
            text += sub.text;
            imagePaths = imagePaths.concat(sub.imagePaths);
        } else if (child.localName === 's') {
            text += ' ';
        } else if (child.localName === 'tab') {
            text += '\t';
        } else if (child.localName === 'frame') {
            // Chercher le chemin de l'image
            var drawImages = child.getElementsByTagNameNS('urn:oasis:names:tc:opendocument:xmlns:drawing:1.0', 'image');
            if (drawImages.length === 0) drawImages = child.getElementsByTagName('draw:image');
            var imgPath = null;
            // Prendre l'image principale (pas ObjectReplacements si une image Pictures/ existe)
            for (var k = 0; k < drawImages.length; k++) {
                var href = drawImages[k].getAttribute('xlink:href') || drawImages[k].getAttributeNS('http://www.w3.org/1999/xlink', 'href');
                if (href && href.startsWith('Pictures/')) { imgPath = href; break; }
                if (href && !imgPath) imgPath = href;
            }

            // Récupérer les dimensions et le style de recadrage
            var w = child.getAttribute('svg:width') || '';
            var h = child.getAttribute('svg:height') || '';
            var frameStyleName = child.getAttribute('draw:style-name') || '';
            var clipRect = (frameStyles && frameStyles[frameStyleName]) ? frameStyles[frameStyleName].clip : '';

            // Détecter si c'est une formule : soit par svg:desc, soit par ancrage inline + petite taille
            var desc = child.getElementsByTagName('svg:desc');
            var isFormula = (desc.length > 0 && desc[0].textContent === 'formule');
            var anchorType = child.getAttribute('text:anchor-type') || '';
            var widthCm = parseFloat(w) || 0;
            if (!isFormula && anchorType === 'as-char' && widthCm < 3) {
                isFormula = true;
            }

            if (isFormula) {
                if (imgPath) {
                    imagePaths.push({ path: imgPath.replace('./', ''), type: 'formula', w: w, h: h, clip: '' });
                }
                text += '[formule]';
            } else if (imgPath) {
                imagePaths.push({ path: imgPath.replace('./', ''), type: 'image', w: w, h: h, clip: clipRect });
                text += '[image]';
            }
        }
    }
    return { text: text, imagePaths: imagePaths };
}

// Compat : ancien nom utilisé par extractOdtParagraphs
function getTextFromNode(node) {
    return getTextAndImagesFromNode(node).text;
}

/**
 * Rendu HTML avec images pour l'affichage dans le container
 */
function renderOdtToHtml(paragraphs, images) {
    images = images || {};

    return paragraphs.map(function (p) {
        // Rendu des tableaux
        if (p.isTable && p.tableRows) {
            var tableHtml = '<table style="border-collapse:collapse;width:100%;margin:8px 0;font-size:0.85em;">';
            p.tableRows.forEach(function (row, ri) {
                tableHtml += '<tr>';
                row.forEach(function (cell) {
                    var tag = ri === 0 ? 'th' : 'td';
                    var cellStyle = 'border:1px solid #d1d5db;padding:6px 10px;';
                    if (ri === 0) cellStyle += 'background:#f3f4f6;font-weight:bold;text-align:center;';
                    tableHtml += '<' + tag + ' style="' + cellStyle + '">' + escapeHtml(cell) + '</' + tag + '>';
                });
                tableHtml += '</tr>';
            });
            tableHtml += '</table>';
            return tableHtml;
        }

        if (!p.text && (!p.imagePaths || p.imagePaths.length === 0)) {
            return '<p style="min-height:0.5em;"></p>';
        }

        var style = 'margin:4px 0;';
        if (p.bold) style += 'font-weight:bold;';
        if (p.underline) style += 'text-decoration:underline;';
        if (p.fontSize) style += 'font-size:' + p.fontSize + ';';

        // Construire le contenu avec images inline
        var content = escapeHtml(p.text || '');

        if (p.imagePaths && p.imagePaths.length > 0) {
            p.imagePaths.forEach(function (img) {
                var dataUrl = images[img.path];
                if (!dataUrl) return;

                var imgStyle = 'max-width:100%;border-radius:4px;';
                if (img.type === 'formula') {
                    // Formules : inline, petite taille
                    imgStyle = 'vertical-align:middle;height:1.4em;margin:0 2px;';
                    content = content.replace('[formule]',
                        '<img src="' + dataUrl + '" style="' + imgStyle + '" alt="formule">');
                } else {
                    // Images normales : affichage simplifié avec taille contrôlée
                    var imgW = img.w ? 'width:min(' + img.w + ',100%);' : 'max-width:100%;';
                    imgStyle += imgW + 'max-height:250px;display:block;margin:8px auto;object-fit:contain;border:1px solid #e5e7eb;border-radius:4px;padding:4px;';
                    content = content.replace('[image]',
                        '<img src="' + dataUrl + '" style="' + imgStyle + '" alt="figure">');
                }
            });
        }

        return '<p style="' + style + '">' + content + '</p>';
    }).join('');
}

function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Détection auto depuis le texte ODT (plus fiable que pdf.js)
 */
function autoDetectFromOdt(paragraphs) {
    var exercises = [];
    var currentExercise = null;
    var currentQuestion = null;

    var exPattern = /exercice\s+(\d+)/i;
    var qNumPattern = /^(\d+)\s*[).]\s*/;
    var qLetterPattern = /^([a-f])\s*[).]\s*/i;
    var questionCounter = 0;

    paragraphs.forEach(function (p) {
        var text = p.text.trim();
        if (!text) return;

        // Détecter un exercice (texte gras/souligné ou match pattern)
        var exMatch = text.match(exPattern);
        if (exMatch) {
            if (currentQuestion && currentExercise) {
                currentExercise.questions.push(currentQuestion);
                currentQuestion = null;
            }
            questionCounter = 0;
            currentExercise = {
                id: 'ex' + exMatch[1], num: parseInt(exMatch[1]),
                title: text.replace(/\[image\]/g, '').trim(),
                page: 1, y: exercises.length * 200 + 50,
                questions: []
            };
            exercises.push(currentExercise);
            return;
        }

        if (!currentExercise) return;

        // Détecter une question numérique (1), 2)...) ou lettrée (a), b)...)
        var qNumMatch = text.match(qNumPattern);
        var qLetterMatch = !qNumMatch ? text.match(qLetterPattern) : null;
        var qMatch = qNumMatch || qLetterMatch;

        if (qMatch) {
            if (currentQuestion) currentExercise.questions.push(currentQuestion);
            questionCounter++;
            var qLabel = qNumMatch ? 'Question ' + qNumMatch[1] : 'Question ' + qLetterMatch[1] + ')';
            currentQuestion = {
                id: currentExercise.id + '_q' + questionCounter, num: questionCounter,
                label: qLabel,
                text: text.replace(qMatch[0], '').trim(),
                page: 1, y: currentExercise.y + questionCounter * 40,
                points: 1, competences: [], answer: ''
            };
            return;
        }

        // Texte de continuation
        if (currentQuestion) {
            currentQuestion.text += ' ' + text;
        } else if (currentExercise) {
            if (!currentExercise._pendingText) currentExercise._pendingText = '';
            currentExercise._pendingText += (currentExercise._pendingText ? ' ' : '') + text;
        }
    });

    // Dernière question
    if (currentQuestion && currentExercise) {
        currentExercise.questions.push(currentQuestion);
    }

    // Post-traitement : exercices sans questions → question unique
    exercises.forEach(function (ex) {
        if (ex.questions.length === 0) {
            ex.questions.push({
                id: ex.id + '_q1', num: 1, label: 'Question 1',
                text: ex._pendingText || '',
                page: 1, y: ex.y + 20,
                points: 1, competences: [], answer: ''
            });
        }
        delete ex._pendingText;
    });

    if (exercises.length > 0) {
        appState.pdfImport.exercises = exercises;
        appState.pdfImport.zones = [];

        // Créer les zones (simplifiées pour ODT — pas de canvas)
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

        var totalQ = exercises.reduce(function (s, ex) { return s + ex.questions.length; }, 0);
        console.log('✅ ODT : ' + exercises.length + ' exercices, ' + totalQ + ' questions détectées');
    }
}

function renderPdfPage(pageNum) {
    var pdf = appState.pdfImport.pdfDoc;
    if (!pdf) return;
    pdf.getPage(pageNum).then(function (page) {
        var viewport = page.getViewport({ scale: pdfImportScale });
        var canvas = document.getElementById('pdfCanvas');
        var ctx = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.display = 'block';
        page.render({ canvasContext: ctx, viewport: viewport }).promise.then(function () {
            setupZoneOverlay(canvas.width, canvas.height);
            redrawAllZones();
        });
        document.getElementById('pdfPageInfo').textContent =
            'Page ' + pageNum + ' / ' + appState.pdfImport.totalPages;
    });
}

function navigatePdfPage(direction) {
    var p = appState.pdfImport;
    var next = p.currentPage + direction;
    if (next < 1 || next > p.totalPages) return;
    p.currentPage = next;
    renderPdfPage(next);
}

function pdfImportGoToStep(step) {
    ['pdfUploadStep', 'pdfZonesStep', 'pdfBaremeStep', 'pdfCorrectionStep'].forEach(function (id) {
        document.getElementById(id).style.display = 'none';
    });
    var targets = { 1: 'pdfUploadStep', 2: 'pdfZonesStep', 3: 'pdfBaremeStep', 4: 'pdfCorrectionStep' };
    document.getElementById(targets[step]).style.display = 'block';
    if (step === 3) renderPdfBaremeConfig();
    if (typeof savePdfSession === 'function') savePdfSession();
}

// ============================================================================
// MODULE DNB 2026 — Correction clé en main
// ----------------------------------------------------------------------------
// Parcours dédié : le sujet DNB 2026 Métropole est pré-chargé depuis le JSON
// `import-pdf/correction-dnb-2026-metropole.json`. L'enseignant saisit une
// plage de copies (Du n° / Au n°) puis clique « Démarrer la correction » :
// on reconstruit la structure des exercices, le barème et les candidats, puis
// on arrive directement sur l'écran de correction — SANS upload, SANS OCR.
// ============================================================================

// JSON du sujet, chargé une seule fois au démarrage de la page de lancement.
window.__dnb2026Json = null;

// Initialise la page de lancement « Correction DNB 2026 — clé en main ».
function initDnb2026LaunchPage() {
    console.log('🎯 Initialisation page de lancement DNB 2026');

    // Adapter le header (comme initPdfImportPage).
    var title = document.getElementById('appTitle');
    if (title) title.innerHTML = '🎯 Correction DNB 2026 — clé en main';
    document.title = 'Correction DNB 2026 — clé en main';

    // Masquer le bouton Admin global (non pertinent pour ce flow).
    var adminBtn = document.getElementById('adminToggleBtnHeader');
    if (adminBtn) adminBtn.style.display = 'none';

    // Mode clé en main : marquer l'état + masquer les contrôles hérités du flux
    // Import PDF générique, inutiles ou risqués ici (le barème est déjà figé).
    if (typeof appState !== 'undefined' && appState) appState.isDnb2026Mode = true;
    var paramBtn = document.getElementById('parametresBtnHeader');
    if (paramBtn) paramBtn.style.display = 'none';          // config barème Mode A/B/C
    var restaurerBtn = document.getElementById('btnRestaurerSauvegarde');
    if (restaurerBtn) restaurerBtn.style.display = 'none';  // restaurer un JSON (écraserait le barème)

    // Charger le sujet pré-configuré.
    fetch('import-pdf/correction-dnb-2026-metropole.json')
        .then(function (r) { return r.json(); })
        .then(function (data) {
            window.__dnb2026Json = data;
            console.log('✅ Sujet DNB 2026 chargé :', data.title);
            updateDnb2026Preview();
        })
        .catch(function (err) {
            console.error('❌ Échec du chargement du sujet DNB 2026 :', err);
            var preview = document.getElementById('dnb2026Preview');
            if (preview) {
                preview.textContent = 'Erreur de chargement du sujet. Rechargez la page.';
            }
        });

    // Brancher les inputs sur l'aperçu en direct.
    var startInput = document.getElementById('dnb2026Start');
    var endInput = document.getElementById('dnb2026End');
    if (startInput) startInput.addEventListener('input', updateDnb2026Preview);
    if (endInput) endInput.addEventListener('input', updateDnb2026Preview);

    updateDnb2026Preview();
}

// Met à jour le bandeau d'aperçu « X candidats — numéros A à B ».
function updateDnb2026Preview() {
    var preview = document.getElementById('dnb2026Preview');
    if (!preview) return;

    var start = parseInt(document.getElementById('dnb2026Start').value, 10);
    var end = parseInt(document.getElementById('dnb2026End').value, 10);

    if (isNaN(start) || isNaN(end) || start > end || start < 1) {
        preview.textContent = 'Saisissez une plage de copies valide (du plus petit au plus grand numéro).';
        return;
    }

    var n = end - start + 1;
    preview.textContent = n + ' candidat' + (n > 1 ? 's' : '') +
        ' — numéros ' + start + ' à ' + end;
}

// Lance la correction clé en main : reconstruit exercices + barème + candidats
// puis bascule directement sur l'écran de correction.
function startDnb2026Correction() {
    var preview = document.getElementById('dnb2026Preview');

    try {
        var start = parseInt(document.getElementById('dnb2026Start').value, 10);
        var end = parseInt(document.getElementById('dnb2026End').value, 10);

        if (isNaN(start) || isNaN(end) || start > end || start < 1) {
            if (preview) preview.textContent = 'Plage de copies invalide. Vérifiez « Du numéro » et « Au numéro ».';
            return;
        }

        if (!window.__dnb2026Json) {
            if (preview) preview.textContent = 'Sujet en cours de chargement, réessayez dans un instant.';
            return;
        }

        // Marqueur de mode (garde-fou : masque les contrôles hérités hors-sujet).
        appState.isDnb2026Mode = true;

        // 1. Préparer le conteneur pdfImport.
        appState.pdfImport = appState.pdfImport || {};
        appState.pdfImport.corrections = {};
        appState.pdfImport.customCompetences = appState.pdfImport.customCompetences || [];

        // 2. Exercices vides pour passer le garde-fou de parseJsonCorrection()
        //    (qui refuse un import si appState.pdfImport.exercises est vide).
        appState.pdfImport.exercises = window.__dnb2026Json.exercises.map(function () {
            return { questions: [] };
        });

        // 3. Injecter le JSON dans la textarea et reconstruire la structure.
        //    #jsonCorrectionInput n'existe pas dans le DOM statique (créé seulement
        //    à la demande par le bouton « Réimporter »). On le crée caché si absent.
        var jsonInput = document.getElementById('jsonCorrectionInput');
        if (!jsonInput) {
            jsonInput = document.createElement('textarea');
            jsonInput.id = 'jsonCorrectionInput';
            jsonInput.style.display = 'none';
            document.body.appendChild(jsonInput);
        }
        jsonInput.value = JSON.stringify(window.__dnb2026Json);
        parseJsonCorrection();

        // 4. Construire exercisesData + baremeConfig depuis pdfImport.exercises.
        regenerateExercisesDataFromPdfImport();

        // 5. Candidats : remplir la plage et forcer l'onglet manuel.
        document.getElementById('startNumber').value = start;
        document.getElementById('endNumber').value = end;
        var tm = document.getElementById('tabManual');
        if (tm) tm.classList.add('active');
        var tc = document.getElementById('tabCsv');
        if (tc) tc.classList.remove('active');

        // 6. Générer la liste des candidats puis démarrer la correction.
        generateCandidates();
        startCorrection();
    } catch (e) {
        console.error('❌ Erreur lors du démarrage de la correction DNB 2026 :', e);
        if (preview) preview.textContent = 'Le démarrage a échoué. Rechargez la page et réessayez.';
    }
}

// Exposition globale (les autres modules du projet utilisent des fonctions
// globales accessibles via onclick).
window.initDnb2026LaunchPage = initDnb2026LaunchPage;
window.updateDnb2026Preview = updateDnb2026Preview;
window.startDnb2026Correction = startDnb2026Correction;

// ============================================================================
// MODULE PERSISTANCE SESSION IMPORT PDF
// Sauvegarde/restaure automatiquement les données de la session Import PDF :
//   - appState.pdfImport (exercices détectés OCR + corrections importées)
//   - appState.candidates (liste élèves avec noms)
//   - appState.scores (notes saisies par candidat)
//   - appState.candidateComments
//   - window.candidateNamesMap (mapping num→nom Pronote)
//   - csvCandidates
// ============================================================================

var PDF_SESSION_STORAGE = 'matheval_pdfImport_session';
var PDF_SESSION_VERSION = 1;

// Champs de appState.pdfImport non-sérialisables (objets PDF.js, références circulaires)
var PDF_IMPORT_NON_SERIALIZABLE = ['pdfDoc', 'pdfFile', 'loadingTask', 'worker'];

function _serializablePdfImport() {
    if (!appState || !appState.pdfImport) return null;
    var clone = {};
    Object.keys(appState.pdfImport).forEach(function (k) {
        if (PDF_IMPORT_NON_SERIALIZABLE.indexOf(k) === -1) {
            clone[k] = appState.pdfImport[k];
        }
    });
    return clone;
}

function savePdfSession() {
    try {
        if (!window.appState) return;
        var snapshot = {
            v: PDF_SESSION_VERSION,
            t: Date.now(),
            pdfImport: _serializablePdfImport(),
            candidates: appState.candidates || [],
            activeCandidates: appState.activeCandidates || [],
            scores: appState.scores || {},
            quickButtonStates: appState.quickButtonStates || {},
            validatedCandidates: appState.validatedCandidates || {},
            candidateComments: appState.candidateComments || {},
            currentCandidateIndex: appState.currentCandidateIndex || 0,
            currentTab: appState.currentTab || 'exercise1',
            baremeConfig: appState.baremeConfig || null,
            exercisesData: window.exercisesData || null,
            candidateNamesMap: window.candidateNamesMap || {},
            csvCandidates: typeof csvCandidates !== 'undefined' ? csvCandidates : null
        };
        localStorage.setItem(PDF_SESSION_STORAGE, JSON.stringify(snapshot));
    } catch (e) {
        console.warn('⚠️ Sauvegarde session PDF échouée :', e.message);
    }
}

function restorePdfSession() {
    try {
        var raw = localStorage.getItem(PDF_SESSION_STORAGE);
        if (!raw) return false;
        var snapshot = JSON.parse(raw);
        if (snapshot.v !== PDF_SESSION_VERSION) {
            console.log('🔄 Version de session obsolète, ignorée');
            return false;
        }
        if (!window.appState) {
            console.warn('⚠️ appState pas encore initialisé, restauration différée');
            return false;
        }
        if (snapshot.pdfImport) appState.pdfImport = snapshot.pdfImport;
        if (snapshot.candidates && snapshot.candidates.length) {
            appState.candidates = snapshot.candidates;
            appState.activeCandidates = snapshot.activeCandidates && snapshot.activeCandidates.length
                ? snapshot.activeCandidates
                : [].concat(snapshot.candidates);
        }
        if (snapshot.scores) appState.scores = snapshot.scores;
        if (snapshot.quickButtonStates) appState.quickButtonStates = snapshot.quickButtonStates;
        if (snapshot.validatedCandidates) appState.validatedCandidates = snapshot.validatedCandidates;
        if (snapshot.candidateComments) appState.candidateComments = snapshot.candidateComments;
        if (typeof snapshot.currentCandidateIndex === 'number') appState.currentCandidateIndex = snapshot.currentCandidateIndex;
        if (snapshot.currentTab) appState.currentTab = snapshot.currentTab;
        if (snapshot.baremeConfig) appState.baremeConfig = snapshot.baremeConfig;
        if (snapshot.exercisesData) window.exercisesData = snapshot.exercisesData;
        if (snapshot.candidateNamesMap) window.candidateNamesMap = snapshot.candidateNamesMap;
        if (snapshot.csvCandidates) {
            // csvCandidates est une variable globale du module app.js
            try { csvCandidates = snapshot.csvCandidates; } catch (e) { window.csvCandidates = snapshot.csvCandidates; }
        }
        console.log('♻️ Session Import PDF restaurée (sauvegardée le ' + new Date(snapshot.t).toLocaleString() + ')');
        return true;
    } catch (e) {
        console.warn('⚠️ Restauration session PDF échouée :', e.message);
        return false;
    }
}

function clearPdfSession() {
    localStorage.removeItem(PDF_SESSION_STORAGE);
    console.log('🗑️ Session Import PDF effacée');
}

// Reset complet déclenché depuis l'UI : demande confirmation, efface tout, recharge
function resetPdfImportSessionFromUI() {
    var hasData = false;
    try {
        if (window.appState && appState.pdfImport && appState.pdfImport.exercises) {
            hasData = appState.pdfImport.exercises.length > 0
                || (appState.candidates && appState.candidates.length > 0);
        }
    } catch (e) { /* ignore */ }
    var msg = hasData
        ? 'Effacer toutes les données ? (exercices détectés, élèves, notes saisies)\n\nCette action est irréversible.'
        : 'Effacer toute trace de session Import PDF en localStorage ?';
    if (!confirm(msg)) return;
    clearPdfSession();
    // Réinitialiser les variables globales en mémoire
    if (window.appState) {
        if (appState.pdfImport) appState.pdfImport = { exercises: [], corrections: {}, customCompetences: [] };
        appState.candidates = [];
        appState.activeCandidates = [];
        appState.scores = {};
        appState.quickButtonStates = {};
        appState.validatedCandidates = {};
        appState.candidateComments = {};
        appState.currentCandidateIndex = 0;
    }
    window.candidateNamesMap = {};
    if (typeof csvCandidates !== 'undefined') {
        try { csvCandidates = null; } catch (e) { window.csvCandidates = null; }
    }
    // Recharger la page proprement
    window.location.href = 'app.html?source=upload';
}

// Auto-save toutes les 3 secondes en fond (filet de sécurité pour les saisies non hookées)
var _pdfSessionLastSave = '';
function _pdfSessionTick() {
    if (!window.appState || !appState.pdfImport) return;
    // Sauve seulement si on a au moins un PDF importé ou des candidats
    var hasContent = (appState.pdfImport.exercises && appState.pdfImport.exercises.length > 0)
        || (appState.candidates && appState.candidates.length > 0);
    if (!hasContent) return;
    // Petit dédoublonnage pour éviter d'écrire si rien n'a changé
    var sig = (appState.candidates ? appState.candidates.length : 0)
        + ':' + JSON.stringify(appState.scores || {}).length
        + ':' + JSON.stringify(appState.candidateComments || {}).length;
    if (sig === _pdfSessionLastSave) return;
    _pdfSessionLastSave = sig;
    savePdfSession();
}

setInterval(_pdfSessionTick, 3000);
window.addEventListener('beforeunload', savePdfSession);

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
    if (title) title.innerHTML = '🎯 Correction DNB 2026 — Métropole';
    document.title = 'Correction DNB 2026 — Métropole';

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
    var bilansBtn = document.getElementById('btnExportBilansPdf');
    if (bilansBtn) bilansBtn.style.display = 'none';        // bilans élèves = usage classe, hors-sujet DNB
    var pronoteBtn = document.getElementById('btnExportPronote');
    if (pronoteBtn) pronoteBtn.style.display = 'none';      // pas de Pronote pour l'examen national

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

    // ♻️ Reprise de session : un rechargement de la page ne doit JAMAIS faire
    // perdre les saisies (l'auto-save tourne toutes les 3 s, mais sans cette
    // étape le parcours clé en main repartait de zéro à chaque refresh).
    _dnb2026OfferResume();
}

// Lit la sauvegarde automatique et la résume (nb de copies, validées, date).
function _dnb2026SessionInfo() {
    try {
        var raw = localStorage.getItem('matheval_pdfImport_session');
        if (!raw) return null;
        var s = JSON.parse(raw);
        if (!s.candidates || !s.candidates.length) return null;
        var validated = 0;
        Object.keys(s.validatedCandidates || {}).forEach(function (k) {
            if (s.validatedCandidates[k] && s.validatedCandidates[k].validated) validated++;
        });
        var touched = Object.keys(s.scores || {}).length;
        return { nb: s.candidates.length, validated: validated, touched: touched, date: new Date(s.t) };
    } catch (e) { return null; }
}

// Affiche la bannière « Reprendre la correction en cours » sur l'écran de lancement.
function _dnb2026OfferResume() {
    var info = _dnb2026SessionInfo();
    if (!info || (info.touched === 0 && info.validated === 0)) return;
    var card = document.querySelector('#dnb2026LaunchPage .dnb2026-card');
    if (!card || document.getElementById('dnb2026ResumeBanner')) return;

    var quand = info.date.toLocaleDateString('fr-FR') + ' à ' +
        info.date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    var banner = document.createElement('div');
    banner.id = 'dnb2026ResumeBanner';
    banner.style.cssText = 'margin-bottom:18px;padding:14px 16px;border:2px solid #86efac;' +
        'border-radius:12px;background:#f0fdf4;';
    banner.innerHTML =
        '<div style="font-weight:700;color:#166534;margin-bottom:4px;">♻️ Correction en cours détectée</div>' +
        '<div style="font-size:.9em;color:#374151;margin-bottom:10px;">' +
            info.nb + ' copie' + (info.nb > 1 ? 's' : '') +
            ' — ' + info.validated + ' validée' + (info.validated > 1 ? 's' : '') +
            ' — dernière sauvegarde le ' + quand + '.' +
        '</div>' +
        '<div style="display:flex;gap:10px;flex-wrap:wrap;">' +
            '<button onclick="dnb2026ResumeSession()" style="flex:1;min-width:190px;padding:10px 16px;' +
                'border:none;border-radius:10px;background:#16a34a;color:#fff;font-weight:700;cursor:pointer;font-size:1em;">' +
                '▶ Reprendre la correction</button>' +
            '<button onclick="dnb2026DiscardSession()" style="padding:10px 16px;border:2px solid #d1d5db;' +
                'border-radius:10px;background:#fff;color:#6b7280;font-weight:600;cursor:pointer;">' +
                'Repartir de zéro</button>' +
        '</div>';
    card.insertBefore(banner, card.firstChild);
}

// Restaure la session sauvegardée et reprend sur la vue d'ensemble des candidats.
function dnb2026ResumeSession() {
    if (typeof restorePdfSession !== 'function' || !restorePdfSession()) {
        alert('Impossible de restaurer la session sauvegardée.');
        return;
    }
    appState.isDnb2026Mode = true;
    appState.modeSelected = true;
    if (!appState.correctionMode) appState.correctionMode = 'candidate';
    showPage('candidatesOverviewPage');
    if (typeof renderCandidatesOverview === 'function') renderCandidatesOverview();
    console.log('♻️ Correction DNB 2026 reprise (' + (appState.candidates || []).length + ' copies)');
}

// Efface la session sauvegardée (confirmation obligatoire) et reste sur le lancement.
function dnb2026DiscardSession() {
    if (!confirm('⚠️ Repartir de zéro effacera définitivement les notes déjà saisies.\n\nContinuer ?')) return;
    if (typeof clearPdfSession === 'function') clearPdfSession();
    appState.scores = {};
    appState.quickButtonStates = {};
    appState.validatedCandidates = {};
    appState.candidateComments = {};
    appState.candidates = [];
    appState.activeCandidates = [];
    var banner = document.getElementById('dnb2026ResumeBanner');
    if (banner) banner.remove();
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

        // Garde-fou : ne JAMAIS écraser silencieusement une correction en cours.
        var existing = _dnb2026SessionInfo();
        if (existing && (existing.touched > 0 || existing.validated > 0)) {
            if (!confirm('⚠️ Une correction est déjà en cours (' + existing.nb + ' copies, ' +
                existing.validated + ' validées).\n\nDémarrer une NOUVELLE correction ' +
                'effacera définitivement ces saisies.\n\nPour les conserver, annulez et ' +
                'cliquez sur « Reprendre la correction ».\n\nÉcraser et recommencer ?')) {
                return;
            }
            if (typeof clearPdfSession === 'function') clearPdfSession();
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

        // 6. Générer la liste des candidats et s'ARRÊTER sur l'écran de validation
        //    (candidatesPage) : l'utilisateur peut y éliminer les copies absentes,
        //    puis lance lui-même la correction via « Commencer la correction ».
        //    (Ne PAS appeler startCorrection() ici, sinon la page d'élimination
        //    des absents est écrasée immédiatement.)
        generateCandidates();
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
window.dnb2026ResumeSession = dnb2026ResumeSession;
window.dnb2026DiscardSession = dnb2026DiscardSession;

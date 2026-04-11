// ============================================================================
//  TOUR GUIDÉ DNB BLANC 2 — Vanilla JS
// ============================================================================
//
//  Présente les fonctionnalités clés de la page de correction en 9 étapes.
//  - Inspiré de SupChaissac-v2 et dictee-master (overlay + spotlight + tooltip)
//  - Aucune dépendance externe
//  - État persisté dans localStorage["dnb2_tour_completed"]
//  - Démarré automatiquement quand l'URL contient ?tour=1
//  - Peut aussi être relancé manuellement via startDnb2Tour()
//
// ============================================================================

(function () {
    const LS_KEY = 'dnb2_tour_completed';

    // Définition des étapes. Les sélecteurs ciblent `[data-tour="..."]`
    // Types d'interactions supportés :
    //   { type: 'click-tab-change'    } → clic sur un onglet différent
    //   { type: 'focus-toggle'        } → toggle du mode Focus (F / bouton)
    //   { type: 'hover-competence'    } → survol ≥ 800 ms sur un bouton de compétence
    //   { type: 'click-quickbtn'      } → clic sur un bouton TB/TF/NR par question
    //   { type: 'click-validate-btn'  } → clic sur "Valider la correction" (ouvre la modale)
    //   { type: 'drag-redaction'      } → changement de valeur du curseur Rédaction
    //   { type: 'click-return-btn'    } → clic sur "Valider et revenir à la liste"
    const STEPS = [
        {
            target: '[data-tour="candidate-bar"]',
            title: "📋 La barre de correction",
            description: "Le candidat n°999 est un candidat fictif pour vous montrer l'outil. Vous voyez ici son numéro, sa progression et son score total sur 24 points.",
            position: 'bottom'
        },
        {
            target: '[data-tour="exercise-tabs"]',
            title: "📑 Les onglets d'exercices",
            description: "Naviguez entre les 6 exercices du sujet. Chaque icône rappelle le thème, l'onglet actif est bleu.",
            instruction: "👉 Cliquez sur un autre onglet pour essayer",
            position: 'bottom',
            interactive: { type: 'click-tab-change' }
        },
        {
            target: '[data-tour="progress-indicator"]',
            title: "🔵 La puce de progression",
            description: "Cette petite puce en haut à gauche de chaque question montre son état : gris = pas commencée, orange = partiellement corrigée, vert = terminée avec tous les points.",
            position: 'bottom'
        },
        {
            target: '[data-tour="score-display"]',
            title: "📊 Le score de la question",
            description: "Le score attribué s'affiche en bas à droite de chaque question : « X / Y pts ». Il se met à jour en temps réel quand vous cliquez sur les compétences ou les boutons rapides.",
            position: 'top'
        },
        {
            target: '[data-tour="notation-guide"]',
            title: "📋 Guide de notation",
            description: "Le post-it jaune sous chaque énoncé indique précisément comment attribuer les points pour cette question. Consultez-le avant de noter pour rester cohérent entre les copies.",
            position: 'bottom'
        },
        {
            target: '[data-tour="competence-btn"]',
            title: "🎯 Boutons de compétences",
            description: "Chaque clic ajoute 0,5 pt à la compétence. Recliquez pour en ajouter encore. Pour repartir à zéro, faites un appui long (maintenez le clic enfoncé > 400 ms). Au survol, une bulle explique pourquoi cette compétence est évaluée sur cette question.",
            instruction: "👉 Cliquez sur un bouton de compétence pour essayer",
            position: 'top',
            interactive: { type: 'click-competence' }
        },
        {
            target: '[data-tour="question-quickbtns"]',
            title: "✓ Notes rapides par question",
            description: "Les boutons TB / TF / NR évaluent une question en un clic : TB = tous les points, TF = zéro, NR = non rendue par l'élève.",
            instruction: "👉 Cliquez sur TB, TF ou NR pour essayer",
            position: 'top',
            interactive: { type: 'click-quickbtn' }
        },
        {
            target: '[data-tour="exercise-quickbtns"]',
            title: "⚡ Notes rapides globales",
            description: "Ces trois boutons appliquent une note TB (parfait), TF (zéro) ou NR (non rendue) à toutes les questions de l'exercice d'un seul clic. Utile pour un exercice totalement raté ou parfait.",
            position: 'left'
        },
        {
            target: '[data-tour="focus-btn"]',
            title: "⛶ Mode Focus",
            description: "Passez en plein écran pour maximiser la place dédiée à la correction.",
            instruction: "👉 Appuyez sur la touche F (ou cliquez le bouton)",
            position: 'left',
            interactive: { type: 'focus-toggle' }
        },
        {
            target: '[data-tour="validate-btn"]',
            title: "✅ Valider la correction",
            description: "Maintenant que toutes les questions sont notées, cliquez sur « Valider la correction » pour ouvrir le bilan final.",
            instruction: "👉 Cliquez sur « Valider la correction »",
            position: 'top',
            interactive: { type: 'click-validate-btn' }
        },
        {
            target: '[data-tour="validation-main-score"]',
            title: "🏆 La note finale",
            description: "Le gros badge affiche la note effective sur 20 (plafonnée), et la ligne en italique en dessous indique la note réelle sur 26 avec le pourcentage. Le niveau de maîtrise global (TBM / MS / MF / MI) est reflété par la couleur.",
            position: 'right'
        },
        {
            target: '[data-tour="redaction-slider"]',
            title: "📝 Rédaction / Justifications",
            description: "Attribuez 0 à 2 points pour la qualité de rédaction et les justifications de la copie. Les boutons de validation restent grisés tant que vous n'avez pas attribué ces points.",
            instruction: "👉 Faites glisser le curseur pour attribuer une note",
            position: 'right',
            interactive: { type: 'drag-redaction' }
        },
        {
            target: '[data-tour="comment-textarea"]',
            title: "💬 Commentaire global",
            description: "Zone libre pour écrire un commentaire destiné à l'élève. Le bouton « 🎤 Dictée vocale » juste au-dessus permet de dicter à la voix plutôt que de taper au clavier.",
            position: 'top'
        },
        {
            target: '[data-tour="validate-return-btn"]',
            title: "🎯 Fin de la correction",
            description: "Cliquez sur « Valider et revenir à la liste » pour valider définitivement cette copie et retourner à la vue d'ensemble. Vous pouvez aussi enchaîner directement avec le candidat suivant via le bouton cyan au milieu.",
            position: 'top'
        }
    ];

    let currentStep = 0;
    let overlayEl = null;
    let tooltipEl = null;
    let spotlightEl = null;
    // Fonction de cleanup pour l'étape interactive courante (détache les listeners)
    let currentInteractiveCleanup = null;

    // Avance à l'étape suivante (ou termine le tour si dernière)
    function goNext() {
        if (currentInteractiveCleanup) { currentInteractiveCleanup(); currentInteractiveCleanup = null; }
        if (currentStep < STEPS.length - 1) { currentStep++; renderStep(); }
        else { endTour(); }
    }
    function goPrev() {
        if (currentInteractiveCleanup) { currentInteractiveCleanup(); currentInteractiveCleanup = null; }
        if (currentStep > 0) { currentStep--; renderStep(); }
    }

    // ------------------------------------------------------------------------
    //  Création du DOM du tour (une seule fois)
    // ------------------------------------------------------------------------
    function buildTour() {
        if (overlayEl) return;

        overlayEl = document.createElement('div');
        overlayEl.className = 'dnb2-tour-overlay';

        spotlightEl = document.createElement('div');
        spotlightEl.className = 'dnb2-tour-spotlight';
        overlayEl.appendChild(spotlightEl);

        tooltipEl = document.createElement('div');
        tooltipEl.className = 'dnb2-tour-tooltip';
        tooltipEl.innerHTML = `
            <div class="dnb2-tour-header">
                <span class="dnb2-tour-progress"></span>
                <button class="dnb2-tour-close" type="button" aria-label="Fermer">×</button>
            </div>
            <div class="dnb2-tour-title"></div>
            <div class="dnb2-tour-description"></div>
            <div class="dnb2-tour-instruction"></div>
            <div class="dnb2-tour-footer">
                <button class="dnb2-tour-btn dnb2-tour-btn-skip" type="button">Quitter</button>
                <div class="dnb2-tour-nav">
                    <button class="dnb2-tour-btn dnb2-tour-btn-prev" type="button">← Précédent</button>
                    <button class="dnb2-tour-btn dnb2-tour-btn-next" type="button">Suivant →</button>
                </div>
            </div>
        `;
        overlayEl.appendChild(tooltipEl);
        document.body.appendChild(overlayEl);

        tooltipEl.querySelector('.dnb2-tour-close').addEventListener('click', endTour);
        tooltipEl.querySelector('.dnb2-tour-btn-skip').addEventListener('click', endTour);
        tooltipEl.querySelector('.dnb2-tour-btn-prev').addEventListener('click', goPrev);
        tooltipEl.querySelector('.dnb2-tour-btn-next').addEventListener('click', goNext);

        // Keyboard : Echap = quitter, flèches = naviguer
        document.addEventListener('keydown', onKeyDown);
    }

    function onKeyDown(e) {
        if (!overlayEl || !overlayEl.classList.contains('active')) return;
        if (e.key === 'Escape') { endTour(); }
        else if (e.key === 'ArrowRight') { goNext(); }
        else if (e.key === 'ArrowLeft') { goPrev(); }
    }

    // ------------------------------------------------------------------------
    //  Étapes interactives : attache un écouteur qui déclenche goNext()
    //  Retourne une fonction de cleanup à appeler quand on quitte l'étape
    // ------------------------------------------------------------------------
    function attachInteractiveListener(interactive) {
        switch (interactive.type) {

            // -- Étape 2 : cliquer sur un onglet différent de celui actif --
            case 'click-tab-change': {
                const tabsContainer = document.getElementById('mainTabs');
                if (!tabsContainer) return null;
                const initialActive = tabsContainer.querySelector('.main-tab.active');
                const initialTabKey = initialActive ? initialActive.getAttribute('data-tab') : null;

                const handler = (e) => {
                    const tab = e.target.closest('.main-tab');
                    if (!tab) return;
                    const tabKey = tab.getAttribute('data-tab');
                    if (tabKey && tabKey !== initialTabKey) {
                        setTimeout(goNext, 350);
                    }
                };
                tabsContainer.addEventListener('click', handler, true);
                return () => tabsContainer.removeEventListener('click', handler, true);
            }

            // -- Étape 3 : activer/désactiver le mode Focus --
            // On écoute directement le clic sur le bouton Focus + la touche F
            // (plus fiable qu'un MutationObserver sur body.classList qui peut
            // avoir des faux positifs quand d'autres classes changent).
            case 'focus-toggle': {
                let triggered = false;
                const onFocusAction = () => {
                    if (triggered) return;
                    triggered = true;
                    // Laisser le temps à app.js de compléter le toggle
                    setTimeout(() => {
                        if (document.body.classList.contains('focus-mode')) {
                            // Le focus a été activé : on le désactive automatiquement
                            // après 900 ms pour que le reste du tour reste visible
                            setTimeout(() => {
                                try {
                                    if (typeof toggleFocusMode === 'function') toggleFocusMode();
                                } catch (e) {}
                                setTimeout(goNext, 300);
                            }, 900);
                        } else {
                            setTimeout(goNext, 300);
                        }
                    }, 120);
                };
                const focusBtn = document.getElementById('focusModeBtn');
                const onBtnClick = () => onFocusAction();
                const onKeyF = (e) => {
                    if (e.key !== 'f' && e.key !== 'F') return;
                    const tag = (e.target.tagName || '').toLowerCase();
                    if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
                    onFocusAction();
                };
                if (focusBtn) focusBtn.addEventListener('click', onBtnClick);
                document.addEventListener('keydown', onKeyF);
                return () => {
                    if (focusBtn) focusBtn.removeEventListener('click', onBtnClick);
                    document.removeEventListener('keydown', onKeyF);
                };
            }

            // -- Étape 6 : survoler un bouton de compétence (≥ 800 ms) --
            case 'hover-competence': {
                let timer = null;
                const handleEnter = (e) => {
                    const btn = e.target.closest('.competence-btn');
                    if (!btn) return;
                    if (timer) clearTimeout(timer);
                    timer = setTimeout(goNext, 800);
                };
                const handleLeave = (e) => {
                    const btn = e.target.closest('.competence-btn');
                    if (!btn) return;
                    if (timer) { clearTimeout(timer); timer = null; }
                };
                document.addEventListener('mouseenter', handleEnter, true);
                document.addEventListener('mouseleave', handleLeave, true);
                return () => {
                    document.removeEventListener('mouseenter', handleEnter, true);
                    document.removeEventListener('mouseleave', handleLeave, true);
                    if (timer) clearTimeout(timer);
                };
            }

            // -- Étape 7 : cliquer sur un bouton TB/TF/NR par question --
            case 'click-quickbtn': {
                const handler = (e) => {
                    const btn = e.target.closest('.quick-btn-main');
                    if (!btn) return;
                    setTimeout(goNext, 450);
                };
                document.addEventListener('click', handler, true);
                return () => document.removeEventListener('click', handler, true);
            }

            // -- Étape compétence : cliquer sur un bouton de compétence --
            case 'click-competence': {
                const handler = (e) => {
                    const btn = e.target.closest('.competence-btn');
                    if (!btn) return;
                    setTimeout(goNext, 500);
                };
                document.addEventListener('click', handler, true);
                return () => document.removeEventListener('click', handler, true);
            }

            // -- Étape 10 : cliquer sur "Valider la correction" → ouvre la modale --
            case 'click-validate-btn': {
                const handler = (e) => {
                    const btn = e.target.closest('#validateBtn, [data-tour="validate-btn"]');
                    if (!btn) return;
                    // validateCorrection() ouvre la modale. Attendre qu'elle soit visible.
                    setTimeout(() => {
                        const modal = document.getElementById('validationModal');
                        if (modal && modal.classList.contains('active')) {
                            goNext();
                        } else {
                            // Retry : la modale peut mettre un peu de temps à s'ouvrir
                            setTimeout(() => goNext(), 400);
                        }
                    }, 350);
                };
                document.addEventListener('click', handler, true);
                return () => document.removeEventListener('click', handler, true);
            }

            // -- Étape 12 : déplacer le curseur Rédaction/Justifications --
            case 'drag-redaction': {
                let triggered = false;
                // Écouter les clics sur le slider (track + marques)
                const onTrackInteraction = (e) => {
                    if (triggered) return;
                    const slider = e.target.closest('.redaction-slider-track, .redaction-slider-mark');
                    if (!slider) return;
                    triggered = true;
                    // Attendre que l'action de set soit appliquée
                    setTimeout(goNext, 500);
                };
                document.addEventListener('click', onTrackInteraction, true);
                document.addEventListener('mouseup', onTrackInteraction, true);
                document.addEventListener('touchend', onTrackInteraction, true);
                return () => {
                    document.removeEventListener('click', onTrackInteraction, true);
                    document.removeEventListener('mouseup', onTrackInteraction, true);
                    document.removeEventListener('touchend', onTrackInteraction, true);
                };
            }
        }
        return null;
    }

    // ------------------------------------------------------------------------
    //  Rendu d'une étape : positionnement spotlight + tooltip
    // ------------------------------------------------------------------------
    function renderStep() {
        const step = STEPS[currentStep];
        if (!step) return;

        // Nettoyer l'écouteur de l'étape précédente si elle était interactive
        if (currentInteractiveCleanup) { currentInteractiveCleanup(); currentInteractiveCleanup = null; }

        // Texte
        tooltipEl.querySelector('.dnb2-tour-progress').textContent =
            `Étape ${currentStep + 1} / ${STEPS.length}`;
        tooltipEl.querySelector('.dnb2-tour-title').textContent = step.title;
        tooltipEl.querySelector('.dnb2-tour-description').textContent = step.description;

        // Instruction interactive (affichée si étape interactive)
        const instrEl = tooltipEl.querySelector('.dnb2-tour-instruction');
        if (step.interactive && step.instruction) {
            instrEl.textContent = step.instruction;
            instrEl.style.display = 'block';
        } else {
            instrEl.textContent = '';
            instrEl.style.display = 'none';
        }

        // Boutons navigation
        const prevBtn = tooltipEl.querySelector('.dnb2-tour-btn-prev');
        const nextBtn = tooltipEl.querySelector('.dnb2-tour-btn-next');
        prevBtn.disabled = (currentStep === 0);
        if (step.interactive) {
            // Pendant une étape interactive, le bouton principal devient "Passer cette étape"
            nextBtn.textContent = 'Passer cette étape';
            nextBtn.classList.add('is-skip');
        } else {
            nextBtn.textContent = (currentStep === STEPS.length - 1) ? 'Terminer ✓' : 'Suivant →';
            nextBtn.classList.remove('is-skip');
        }

        // Attacher l'écouteur de l'action interactive si présent
        if (step.interactive) {
            currentInteractiveCleanup = attachInteractiveListener(step.interactive);
        }

        // Cible
        const targetEl = step.target ? document.querySelector(step.target) : null;

        if (!targetEl || step.position === 'center') {
            // Mode centré (pas de spotlight spécifique)
            spotlightEl.style.display = 'none';
            tooltipEl.style.position = 'fixed';
            tooltipEl.style.left = '50%';
            tooltipEl.style.top = '50%';
            tooltipEl.style.transform = 'translate(-50%, -50%)';
            return;
        }

        // Spotlight sur l'élément
        // Scroll si nécessaire
        const rect = targetEl.getBoundingClientRect();
        const needScroll = rect.top < 60 || rect.bottom > window.innerHeight - 60;
        if (needScroll) {
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setTimeout(() => positionSpotlightAndTooltip(targetEl, step), 360);
        } else {
            positionSpotlightAndTooltip(targetEl, step);
        }
    }

    function positionSpotlightAndTooltip(targetEl, step) {
        const rect = targetEl.getBoundingClientRect();
        const padding = 8;
        spotlightEl.style.display = 'block';
        spotlightEl.style.left   = `${rect.left - padding}px`;
        spotlightEl.style.top    = `${rect.top - padding}px`;
        spotlightEl.style.width  = `${rect.width + padding * 2}px`;
        spotlightEl.style.height = `${rect.height + padding * 2}px`;

        // Position de la tooltip
        const tt = tooltipEl;
        tt.style.position = 'fixed';
        tt.style.transform = 'none';
        const ttRect = { width: 340, height: 220 }; // estimation initiale
        const gap = 18;
        const pos = step.position || 'bottom';
        let left, top;

        switch (pos) {
            case 'top':
                top  = rect.top - ttRect.height - gap;
                left = rect.left + rect.width / 2 - ttRect.width / 2;
                break;
            case 'bottom':
                top  = rect.bottom + gap;
                left = rect.left + rect.width / 2 - ttRect.width / 2;
                break;
            case 'left':
                top  = rect.top + rect.height / 2 - ttRect.height / 2;
                left = rect.left - ttRect.width - gap;
                break;
            case 'right':
                top  = rect.top + rect.height / 2 - ttRect.height / 2;
                left = rect.right + gap;
                break;
            default:
                top  = rect.bottom + gap;
                left = rect.left + rect.width / 2 - ttRect.width / 2;
        }

        // Fallback : si sort de l'écran, recentrer
        const margin = 10;
        if (left < margin) left = margin;
        if (top < margin) top = margin;
        if (left + ttRect.width > window.innerWidth - margin) {
            left = window.innerWidth - ttRect.width - margin;
        }
        if (top + ttRect.height > window.innerHeight - margin) {
            top = window.innerHeight - ttRect.height - margin;
        }

        tt.style.left = `${left}px`;
        tt.style.top  = `${top}px`;
    }

    // ------------------------------------------------------------------------
    //  API publique : démarrer / terminer
    // ------------------------------------------------------------------------
    function startTour(opts) {
        opts = opts || {};
        buildTour();
        currentStep = 0;
        overlayEl.classList.add('active');
        renderStep();
        // Reposition si redimensionnement
        window.addEventListener('resize', onResize);
    }

    function onResize() {
        if (overlayEl && overlayEl.classList.contains('active')) {
            renderStep();
        }
    }

    function endTour() {
        if (currentInteractiveCleanup) { currentInteractiveCleanup(); currentInteractiveCleanup = null; }
        if (overlayEl) overlayEl.classList.remove('active');
        try { localStorage.setItem(LS_KEY, '1'); } catch (e) {}
        window.removeEventListener('resize', onResize);

        // Si on était en mode démo, restaurer l'état original de l'app et
        // rediriger vers l'accueil pour que l'utilisateur repartie sur du propre
        if (isDemoMode) {
            // Fermer la modale de validation si elle est ouverte
            const vm = document.getElementById('validationModal');
            if (vm) vm.classList.remove('active');
            restoreAppStateAfterDemo();
            // Retour à l'accueil (plus propre que de rester sur mainPage avec des candidats disparus)
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 400);
        }
    }

    // Expose pour utilisation externe (bouton "Découverte" dans un futur menu)
    window.startDnb2Tour = startTour;
    window.endDnb2Tour = endTour;

    // Bandeau flottant qui invite l'utilisateur à démarrer la correction
    let waitingBannerEl = null;
    function showWaitingBanner() {
        if (waitingBannerEl) return;
        waitingBannerEl = document.createElement('div');
        waitingBannerEl.className = 'dnb2-tour-waiting-banner';
        waitingBannerEl.innerHTML = `
            <span class="dnb2-tour-waiting-icon">🎓</span>
            <div class="dnb2-tour-waiting-text">
                <strong>Visite guidée en attente</strong>
                <span class="dnb2-tour-waiting-hint">Démarrez la correction pour lancer la visite.</span>
            </div>
            <button class="dnb2-tour-waiting-cancel" type="button" title="Annuler la visite">×</button>
        `;
        document.body.appendChild(waitingBannerEl);
        waitingBannerEl.querySelector('.dnb2-tour-waiting-cancel').addEventListener('click', () => {
            hideWaitingBanner();
            try {
                const url = new URL(window.location.href);
                url.searchParams.delete('tour');
                window.history.replaceState({}, '', url);
            } catch (e) {}
        });
        updateWaitingBannerMessage();
    }
    function hideWaitingBanner() {
        if (waitingBannerEl) {
            waitingBannerEl.remove();
            waitingBannerEl = null;
        }
    }
    // Adapte le message du bandeau à la page actuellement active
    function updateWaitingBannerMessage() {
        if (!waitingBannerEl) return;
        const hintEl = waitingBannerEl.querySelector('.dnb2-tour-waiting-hint');
        if (!hintEl) return;
        const activePage = document.querySelector('.main-page.active, .setup-page.active, .candidates-page.active, .candidates-overview-page.active, [id$="Page"].active');
        const pageId = activePage ? activePage.id : '';
        let msg;
        switch (pageId) {
            case 'setupPage':
                msg = 'Saisissez les numéros des candidats puis cliquez sur « Continuer ».';
                break;
            case 'candidatesPage':
                msg = 'Cliquez sur « Commencer la correction » pour lancer la visite.';
                break;
            case 'candidatesOverviewPage':
                msg = 'Cliquez sur une carte candidat pour démarrer la correction et la visite guidée.';
                break;
            case 'mainPage':
                msg = 'Démarrage de la visite…';
                break;
            default:
                msg = 'Démarrez la correction d\'un candidat pour lancer la visite.';
        }
        hintEl.textContent = msg;
    }

    // ------------------------------------------------------------------------
    //  MODE DÉMO : crée un candidat fictif n°999 avec scores variés,
    //  sauvegarde l'état original, et restaure à la fin du tour.
    // ------------------------------------------------------------------------
    const DEMO_CANDIDATE_NUMBER = 999;
    let savedAppState = null; // Snapshot pour restauration
    let isDemoMode = false;

    function saveAppStateForDemo() {
        savedAppState = {
            candidates: JSON.parse(JSON.stringify(appState.candidates || [])),
            activeCandidates: JSON.parse(JSON.stringify(appState.activeCandidates || [])),
            scores: JSON.parse(JSON.stringify(appState.scores || {})),
            quickButtonStates: JSON.parse(JSON.stringify(appState.quickButtonStates || {})),
            presentationScores: JSON.parse(JSON.stringify(appState.presentationScores || {})),
            candidateComments: JSON.parse(JSON.stringify(appState.candidateComments || {})),
            validatedCandidates: JSON.parse(JSON.stringify(appState.validatedCandidates || {})),
            currentCandidateIndex: appState.currentCandidateIndex,
            currentExerciseIndex: appState.currentExerciseIndex,
            currentTab: appState.currentTab,
            correctionMode: appState.correctionMode,
            modeSelected: appState.modeSelected
        };
    }

    function restoreAppStateAfterDemo() {
        if (!savedAppState) return;
        Object.assign(appState, savedAppState);
        savedAppState = null;
        isDemoMode = false;
        try { saveData(); } catch (e) {}
    }

    // Pré-remplit des scores variés sur toutes les questions de tous les exercices
    // pour le candidat démo. Le but : montrer vert / orange / rouge / gris côte à côte.
    function fillDemoCandidateScores(n) {
        if (!appState.scores[n])            appState.scores[n] = {};
        if (!appState.quickButtonStates[n]) appState.quickButtonStates[n] = {};

        // Pattern visuel : alterner TB / TF / NR / partiel / non-traité
        const patterns = ['tb', 'tf', 'nr', 'partial', 'tb', 'tb', 'tf', 'partial'];
        let patternIdx = 0;

        Object.keys(exercisesData).forEach(exKey => {
            const ex = exercisesData[exKey];
            if (!ex || !ex.questions) return;

            appState.scores[n][exKey] = {};
            appState.quickButtonStates[n][exKey] = {};

            ex.questions.forEach((q) => {
                const pat = patterns[patternIdx % patterns.length];
                patternIdx++;
                const qScore = { score: 0, competences: {} };

                if (pat === 'tb') {
                    appState.quickButtonStates[n][exKey][q.id] = 'tb';
                    qScore.score = q.points;
                    (q.competences || []).forEach(c => { qScore.competences[c.name] = c.points; });
                } else if (pat === 'tf') {
                    appState.quickButtonStates[n][exKey][q.id] = 'tf';
                    (q.competences || []).forEach(c => { qScore.competences[c.name] = 0; });
                } else if (pat === 'nr') {
                    appState.quickButtonStates[n][exKey][q.id] = 'nr';
                    (q.competences || []).forEach(c => { qScore.competences[c.name] = 0; });
                } else if (pat === 'partial') {
                    // Score partiel via compétences (sans bouton rapide)
                    const comps = q.competences || [];
                    comps.forEach((c, idx) => {
                        if (idx === 0) {
                            qScore.competences[c.name] = c.points; // première comp : full
                            qScore.score += c.points;
                        } else {
                            qScore.competences[c.name] = 0; // autres : zéro
                        }
                    });
                }
                appState.scores[n][exKey][q.id] = qScore;
            });
        });

        // Un exercice entier non commencé (le dernier) pour montrer les puces grises
        const lastExKey = Object.keys(exercisesData).sort().pop();
        if (lastExKey) {
            delete appState.scores[n][lastExKey];
            delete appState.quickButtonStates[n][lastExKey];
        }

        // Pas de presentationScore → le curseur sera à "— / 2" au début (option b pédagogique)
        if (appState.presentationScores) delete appState.presentationScores[n];
    }

    function startDemoTour() {
        isDemoMode = true;
        saveAppStateForDemo();

        // Remplacer les candidats par un seul candidat démo
        const demoCandidate = { number: DEMO_CANDIDATE_NUMBER, active: true };
        appState.candidates = [demoCandidate];
        appState.activeCandidates = [demoCandidate];
        appState.currentCandidateIndex = 0;
        appState.currentExerciseIndex = 1;
        appState.currentTab = 'exercise1';
        appState.correctionMode = 'candidate';
        appState.modeSelected = true;

        // Nettoyer les anciens scores pour le candidat démo et pré-remplir
        if (appState.scores) delete appState.scores[DEMO_CANDIDATE_NUMBER];
        if (appState.quickButtonStates) delete appState.quickButtonStates[DEMO_CANDIDATE_NUMBER];
        fillDemoCandidateScores(DEMO_CANDIDATE_NUMBER);

        // Aller directement sur la page de correction
        if (typeof showPage === 'function') showPage('mainPage');
        if (typeof renderExerciseTabs === 'function') renderExerciseTabs();
        if (typeof renderExerciseTabContents === 'function') renderExerciseTabContents();
        if (typeof showTab === 'function') showTab('exercise1');
        if (typeof loadCurrentCandidate === 'function') loadCurrentCandidate();

        // Démarrer le tour après un petit délai pour laisser le rendu se faire
        setTimeout(() => {
            hideWaitingBanner();
            startTour();
        }, 700);
    }

    // Auto-start si ?tour=1 dans l'URL (ou ?tour=demo pour le mode démo complet)
    function initAutoStart() {
        const params = new URLSearchParams(window.location.search);
        const tourParam = params.get('tour');
        if (!tourParam) return;

        // Mode démo : candidat fictif + pré-remplissage + tour complet avec modale
        if (tourParam === 'demo') {
            console.log('🎓 Tour en mode DÉMO : candidat fictif + scores variés');
            // CRUCIAL : attendre que l'auto-import soit VRAIMENT terminé.
            // Sans ça, exercisesData est déjà rempli par les exos hardcodés
            // par défaut dans app.js, et startDemoTour() serait appelé AVANT
            // que l'auto-import ne résolve son fetch() → conflit + écrasement
            // des candidates par Object.assign(appState, data.appState).
            const waitForAutoImport = () => {
                if (appState._configImported === true &&
                    typeof exercisesData !== 'undefined' &&
                    Object.keys(exercisesData).length > 0) {
                    // Encore un petit délai pour que le showPage de l'auto-import
                    // ait terminé avant qu'on prenne la main
                    setTimeout(startDemoTour, 150);
                } else {
                    setTimeout(waitForAutoImport, 200);
                }
            };
            waitForAutoImport();
            return;
        }

        // Mode classique : attente du démarrage de la correction par l'utilisateur
        if (tourParam !== '1') return;

        console.log('🎓 Tour guidé : ?tour=1 détecté');

        const tryStart = () => {
            const mainPage = document.getElementById('mainPage');
            if (mainPage && mainPage.classList.contains('active')) {
                console.log('🎓 mainPage active, démarrage du tour');
                hideWaitingBanner();
                // Petit délai pour laisser les onglets et les questions se rendre
                setTimeout(() => startTour(), 600);
                return true;
            }
            return false;
        };

        // Essai immédiat
        if (tryStart()) return;

        // Afficher le bandeau d'attente
        showWaitingBanner();

        // Observer les changements de classe sur toutes les pages du workflow
        // (pour mettre à jour le message + détecter l'activation de mainPage)
        const pageIds = [
            'configurationPage', 'automatismesSelectionPage', 'dnbSelectionPage',
            'baremeDesignPage', 'setupPage', 'candidatesPage',
            'candidatesOverviewPage', 'mainPage'
        ];
        const observer = new MutationObserver(() => {
            updateWaitingBannerMessage();
            if (tryStart()) observer.disconnect();
        });
        pageIds.forEach(id => {
            const page = document.getElementById(id);
            if (page) {
                observer.observe(page, { attributes: true, attributeFilter: ['class', 'style'] });
            }
        });
        // Première mise à jour du message
        updateWaitingBannerMessage();
    }

    // Gestion robuste du DOMContentLoaded : si le DOM est déjà prêt quand ce
    // script s'exécute (cas normal car tour.js est chargé après app.js),
    // on lance init() immédiatement. Sinon on attend l'événement.
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAutoStart);
    } else {
        initAutoStart();
    }
})();

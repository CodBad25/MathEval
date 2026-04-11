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
    const STEPS = [
        {
            target: '[data-tour="candidate-bar"]',
            title: "📋 La barre de correction",
            description: "Voici la zone principale : numéro du candidat en cours, progression globale et score total. Tout reste à portée de regard pendant la correction.",
            position: 'bottom'
        },
        {
            target: '[data-tour="exercise-tabs"]',
            title: "📑 Les onglets d'exercices",
            description: "Naviguez entre les 6 exercices du sujet. L'onglet actif est mis en évidence en bleu. Chaque icône représente le thème de l'exercice.",
            position: 'bottom'
        },
        {
            target: '[data-tour="focus-btn"]',
            title: "⛶ Mode Focus",
            description: "Cliquez sur ce bouton (ou appuyez sur F) pour passer en plein écran et masquer la barre supérieure. Idéal pour se concentrer sur la correction.",
            position: 'left'
        },
        {
            target: '[data-tour="exercise-quickbtns"]',
            title: "⚡ Notes rapides globales",
            description: "Ces trois boutons appliquent une note TB (parfait), TF (zéro) ou NR (non rendue) à toutes les questions de l'exercice d'un seul clic.",
            position: 'left'
        },
        {
            target: '[data-tour="notation-guide"]',
            title: "📋 Guide de notation",
            description: "Ce bloc jaune indique précisément comment attribuer les points pour cette question. À consulter avant chaque correction pour rester cohérent.",
            position: 'bottom'
        },
        {
            target: '[data-tour="competence-btn"]',
            title: "🎯 Boutons de compétences",
            description: "Cliquez pour ajouter des points par compétence. Au survol, une bulle explique pourquoi cette compétence est évaluée sur cette question précise.",
            position: 'top'
        },
        {
            target: '[data-tour="question-quickbtns"]',
            title: "✓ Notes rapides par question",
            description: "Les boutons TB / TF / NR permettent d'évaluer une question en un clic : TB = tous les points, TF = zéro, NR = non rendue.",
            position: 'top'
        },
        {
            target: '[data-tour="validate-btn"]',
            title: "✅ Valider la correction",
            description: "Quand toutes les questions sont traitées, cliquez ici pour ouvrir le bilan : note effective sur 20, réussite par exercice, niveaux de maîtrise par compétence.",
            position: 'top'
        },
        {
            target: null,
            title: "⚠️ Avant de valider : la Rédaction / Justifications",
            description: "Dans la fenêtre de bilan, n'oubliez pas d'attribuer les points de Rédaction / Justifications (0 à 2 pts) via le curseur. Les boutons de validation restent grisés tant que ce choix n'est pas fait.",
            position: 'center'
        }
    ];

    let currentStep = 0;
    let overlayEl = null;
    let tooltipEl = null;
    let spotlightEl = null;

    // ------------------------------------------------------------------------
    //  Création du DOM du tour (une seule fois)
    // ------------------------------------------------------------------------
    function buildTour() {
        if (overlayEl) return;

        overlayEl = document.createElement('div');
        overlayEl.className = 'dnb2-tour-overlay';
        overlayEl.addEventListener('click', (e) => {
            if (e.target === overlayEl) { /* pas de fermeture au clic fond */ }
        });

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
            <div class="dnb2-tour-footer">
                <button class="dnb2-tour-btn dnb2-tour-btn-skip" type="button">Passer</button>
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
        tooltipEl.querySelector('.dnb2-tour-btn-prev').addEventListener('click', () => {
            if (currentStep > 0) { currentStep--; renderStep(); }
        });
        tooltipEl.querySelector('.dnb2-tour-btn-next').addEventListener('click', () => {
            if (currentStep < STEPS.length - 1) { currentStep++; renderStep(); }
            else { endTour(); }
        });

        // Keyboard : Echap = quitter, flèches = naviguer
        document.addEventListener('keydown', onKeyDown);
    }

    function onKeyDown(e) {
        if (!overlayEl || !overlayEl.classList.contains('active')) return;
        if (e.key === 'Escape') { endTour(); }
        else if (e.key === 'ArrowRight') {
            if (currentStep < STEPS.length - 1) { currentStep++; renderStep(); }
        } else if (e.key === 'ArrowLeft') {
            if (currentStep > 0) { currentStep--; renderStep(); }
        }
    }

    // ------------------------------------------------------------------------
    //  Rendu d'une étape : positionnement spotlight + tooltip
    // ------------------------------------------------------------------------
    function renderStep() {
        const step = STEPS[currentStep];
        if (!step) return;

        // Texte
        tooltipEl.querySelector('.dnb2-tour-progress').textContent =
            `Étape ${currentStep + 1} / ${STEPS.length}`;
        tooltipEl.querySelector('.dnb2-tour-title').textContent = step.title;
        tooltipEl.querySelector('.dnb2-tour-description').textContent = step.description;

        // Boutons navigation
        const prevBtn = tooltipEl.querySelector('.dnb2-tour-btn-prev');
        const nextBtn = tooltipEl.querySelector('.dnb2-tour-btn-next');
        prevBtn.disabled = (currentStep === 0);
        nextBtn.textContent = (currentStep === STEPS.length - 1) ? 'Terminer ✓' : 'Suivant →';

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
        if (overlayEl) overlayEl.classList.remove('active');
        try { localStorage.setItem(LS_KEY, '1'); } catch (e) {}
        window.removeEventListener('resize', onResize);
    }

    // Expose pour utilisation externe (bouton "Découverte" dans un futur menu)
    window.startDnb2Tour = startTour;
    window.endDnb2Tour = endTour;

    // Auto-start si ?tour=1 dans l'URL
    document.addEventListener('DOMContentLoaded', () => {
        const params = new URLSearchParams(window.location.search);
        if (params.get('tour') === '1') {
            // Attendre que l'app soit rendue avant de démarrer
            // (les data-tour dépendent de l'affichage de la page de correction)
            setTimeout(() => {
                // Si on est sur la page de correction (mainPage visible), démarrer
                const mainPage = document.getElementById('mainPage');
                if (mainPage && mainPage.classList.contains('active')) {
                    startTour();
                } else {
                    // Attendre que la page soit affichée
                    const observer = new MutationObserver(() => {
                        if (mainPage && mainPage.classList.contains('active')) {
                            observer.disconnect();
                            setTimeout(startTour, 400);
                        }
                    });
                    if (mainPage) {
                        observer.observe(mainPage, { attributes: true, attributeFilter: ['class'] });
                    }
                }
            }, 1000);
        }
    });
})();

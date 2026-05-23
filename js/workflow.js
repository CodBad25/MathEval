// ============================================================================
// SYSTÈME DE GUIDAGE WORKFLOW - CORRECTEUR DNB PRO
// ============================================================================

// Configuration des étapes du workflow
const workflowSteps = [
    {
        id: 1,
        name: 'Automatismes',
        title: 'Étape 1 : Sélection des automatismes',
        description: 'Choisissez les questions d\'automatismes pour l\'exercice 1 (6 points)',
        instruction: 'Parcourez la liste et cliquez sur les questions que vous souhaitez inclure dans votre sujet.',
        page: 'automatismesSelectionPage',
        icon: '📝',
        nextButton: 'Continuer avec les exercices DNB'
    },
    {
        id: 2,
        name: 'Exercices DNB',
        title: 'Étape 2 : Sélection des exercices du Brevet',
        description: 'Choisissez 4 exercices parmi la base MathALÉA (14 points à répartir)',
        instruction: 'Sélectionnez 4 exercices qui composeront les exercices 2, 3, 4 et 5 de votre sujet.',
        page: 'dnbSelectionPage',
        icon: '📚',
        nextButton: 'Continuer vers le barème'
    },
    {
        id: 3,
        name: 'Barème',
        title: 'Étape 3 : Conception du barème',
        description: 'Définissez les compétences et répartissez les points pour chaque exercice',
        instruction: 'Configurez le nombre de points et les compétences évaluées pour chaque exercice.',
        page: 'baremeDesignPage',
        icon: '⚖️',
        nextButton: 'Continuer vers les candidats'
    },
    {
        id: 4,
        name: 'Candidats',
        title: 'Étape 4 : Sélection des candidats',
        description: 'Définissez la liste des candidats à corriger',
        instruction: 'Saisissez manuellement les numéros de candidats ou importez un fichier CSV.',
        page: 'setupPage',
        icon: '👥',
        nextButton: 'Générer les copies'
    },
    {
        id: 5,
        name: 'Correction',
        title: 'Étape 5 : Correction des copies',
        description: 'Corrigez les copies de vos candidats',
        instruction: 'Utilisez l\'interface de correction pour évaluer chaque candidat.',
        page: 'candidatesOverviewPage',
        icon: '✍️',
        nextButton: 'Commencer la correction'
    }
];

// État du workflow
var workflowState = {
    currentStep: 1,
    completedSteps: [],
    modalShown: {},
    skipAutomatismes: false,
    disableGuidance: false
};

// Créer le stepper en haut de la page
function createWorkflowStepper() {
    console.log(`🎨 createWorkflowStepper() - Étape actuelle: ${workflowState.currentStep}`);

    // Supprimer l'ancien stepper s'il existe
    const oldStepper = document.getElementById('workflowStepper');
    if (oldStepper) {
        oldStepper.remove();
        console.log('🗑️ Ancien stepper supprimé');
    }

    const stepperHTML = `
        <div id="workflowStepper" style="
            position: sticky;
            top: 0;
            z-index: 500;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 15px 20px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        ">
            <div style="
                max-width: 1400px;
                margin: 0 auto;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 10px;
            ">
                ${workflowSteps.map((step, index) => `
                    <div class="step-item" data-step="${step.id}" style="
                        flex: 1;
                        display: flex;
                        align-items: center;
                        gap: 10px;
                        color: white;
                        opacity: ${workflowState.currentStep === step.id ? '1' : '0.6'};
                        transition: all 0.3s ease;
                    ">
                        <div class="step-circle" style="
                            width: 36px;
                            height: 36px;
                            border-radius: 50%;
                            background: ${workflowState.currentStep === step.id ? '#fff' : 'rgba(255,255,255,0.2)'};
                            color: ${workflowState.currentStep === step.id ? '#667eea' : '#fff'};
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            font-weight: bold;
                            font-size: 18px;
                            flex-shrink: 0;
                            border: 2px solid ${workflowState.currentStep === step.id ? '#fff' : 'rgba(255,255,255,0.3)'};
                            box-shadow: ${workflowState.currentStep === step.id ? '0 4px 12px rgba(0,0,0,0.2)' : 'none'};
                        ">
                            ${workflowState.completedSteps.includes(step.id) ? '✓' : step.icon}
                        </div>
                        <div style="flex: 1; min-width: 0;">
                            <div style="
                                font-weight: ${workflowState.currentStep === step.id ? 'bold' : '500'};
                                font-size: ${workflowState.currentStep === step.id ? '15px' : '13px'};
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                            ">${step.name}</div>
                            ${workflowState.currentStep === step.id ? `
                                <div style="font-size: 11px; opacity: 0.9;">En cours...</div>
                            ` : ''}
                        </div>
                        ${index < workflowSteps.length - 1 ? `
                            <div style="
                                width: 40px;
                                height: 2px;
                                background: rgba(255,255,255,0.3);
                                flex-shrink: 0;
                            "></div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    // Insérer le stepper après le header
    const header = document.querySelector('.header');
    if (header && !document.getElementById('workflowStepper')) {
        header.insertAdjacentHTML('afterend', stepperHTML);
    }
}

// Créer le HTML de la modale de guidage
function createGuidanceModal() {
    const modalHTML = `
        <div id="guidanceModal" class="guidance-modal" style="display: none;">
            <div class="guidance-overlay" onclick="closeGuidanceModal()" style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.7);
                backdrop-filter: blur(4px);
                z-index: 9998;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            "></div>
            <div class="guidance-content" style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%) scale(0.9);
                background: white;
                border-radius: 20px;
                padding: 40px;
                max-width: 600px;
                width: 90%;
                z-index: 9999;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                animation: modalSlideIn 0.4s ease forwards;
            ">
                <div id="guidanceIcon" style="
                    font-size: 64px;
                    text-align: center;
                    margin-bottom: 20px;
                "></div>
                <h2 id="guidanceTitle" style="
                    color: #2c3e50;
                    text-align: center;
                    margin-bottom: 15px;
                    font-size: 24px;
                "></h2>
                <p id="guidanceDescription" style="
                    color: #666;
                    text-align: center;
                    font-size: 16px;
                    margin-bottom: 20px;
                    line-height: 1.6;
                "></p>
                <div id="guidanceInstruction" style="
                    background: #f8f9fa;
                    padding: 15px 20px;
                    border-radius: 12px;
                    border-left: 4px solid #667eea;
                    margin-bottom: 30px;
                    color: #495057;
                    font-size: 14px;
                    line-height: 1.6;
                "></div>
                <button onclick="closeGuidanceModal()" style="
                    width: 100%;
                    padding: 15px 30px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-size: 16px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
                " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(102, 126, 234, 0.6)';" onmouseout="this.style.transform=''; this.style.boxShadow='0 4px 15px rgba(102, 126, 234, 0.4)';">
                    Compris, commencer ! 🚀
                </button>
            </div>
        </div>

        <style>
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }

            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
        </style>
    `;

    // Insérer la modale dans le body
    if (!document.getElementById('guidanceModal')) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }
}

// Afficher la modale de guidage pour une étape
function showGuidanceModal(stepId) {
    // Pas de modale en mode Import PDF/DOCX : ces modales décrivent le workflow DNB
    // (Automatismes, Exos DNB, etc.) et n'ont pas de sens pour l'import PDF
    var urlParams = new URLSearchParams(window.location.search);
    var pdfImportActive = document.getElementById('pdfImportPage') && document.getElementById('pdfImportPage').style.display !== 'none';
    var hasPdfImportState = window.appState && appState.pdfImport && appState.pdfImport.exercises && appState.pdfImport.exercises.length > 0;
    if (urlParams.get('source') === 'upload' || pdfImportActive || hasPdfImportState) {
        console.log('💡 Mode Import PDF détecté - modale d\'aide DNB ignorée');
        return;
    }
    // Si les écrans d'aide sont désactivés, ne rien afficher
    if (workflowState.disableGuidance) {
        console.log('💡 Écrans d\'aide désactivés - modale ignorée');
        return;
    }

    const step = workflowSteps.find(s => s.id === stepId);
    if (!step) return;

    // Créer la modale si elle n'existe pas
    createGuidanceModal();

    // Remplir le contenu
    document.getElementById('guidanceIcon').textContent = step.icon;
    document.getElementById('guidanceTitle').textContent = step.title;
    document.getElementById('guidanceDescription').textContent = step.description;
    document.getElementById('guidanceInstruction').innerHTML = `<strong>💡 Conseil :</strong> ${step.instruction}`;

    // Afficher la modale
    const modal = document.getElementById('guidanceModal');
    modal.style.display = 'block';

    // Marquer comme affichée
    workflowState.modalShown[stepId] = true;

    console.log(`📋 Modale de guidage affichée pour l'étape ${stepId}: ${step.title}`);
}

// Fermer la modale de guidage
function closeGuidanceModal() {
    const modal = document.getElementById('guidanceModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Aller à une étape spécifique
function goToStep(stepId) {
    const step = workflowSteps.find(s => s.id === stepId);
    if (!step) return;

    console.log(`🎯 Navigation vers l'étape ${stepId}: ${step.name}`);

    // Mettre à jour l'état
    workflowState.currentStep = stepId;

    // Afficher la page correspondante
    showPage(step.page);

    // Mettre à jour le stepper
    updateWorkflowStepper();

    // Scroll vers le haut pour voir la nouvelle page
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    // Afficher la modale de guidage si pas encore montrée
    if (!workflowState.modalShown[stepId]) {
        setTimeout(() => showGuidanceModal(stepId), 500);
    }
}

// Marquer une étape comme complétée et passer à la suivante
function completeStepAndNext(stepId) {
    console.log(`✅✅✅ completeStepAndNext(${stepId}) APPELÉ`);
    console.log(`État avant: currentStep=${workflowState.currentStep}, completedSteps=${JSON.stringify(workflowState.completedSteps)}`);

    // Marquer comme complétée
    if (!workflowState.completedSteps.includes(stepId)) {
        workflowState.completedSteps.push(stepId);
        console.log(`✓ Étape ${stepId} marquée comme complétée`);
    }

    // Passer à l'étape suivante
    const nextStep = workflowSteps.find(s => s.id === stepId + 1);
    if (nextStep) {
        console.log(`➡️ Passage à l'étape suivante: ${nextStep.id} - ${nextStep.name}`);
        goToStep(nextStep.id);
    } else {
        console.log(`⚠️ Pas d'étape suivante après ${stepId}`);
    }

    console.log(`État après: currentStep=${workflowState.currentStep}, completedSteps=${JSON.stringify(workflowState.completedSteps)}`);
}

// Mettre à jour le stepper
function updateWorkflowStepper() {
    console.log('🔄 updateWorkflowStepper() - Recréation du stepper...');
    createWorkflowStepper();
}

// Initialiser le workflow
function initWorkflow() {
    console.log('🚀 Initialisation du workflow guidé');

    // Charger les préférences depuis localStorage
    workflowState.skipAutomatismes = localStorage.getItem('dnb_skipAutomatismes') === 'true';
    workflowState.disableGuidance = localStorage.getItem('dnb_disableGuidance') === 'true';

    // Mettre à jour les checkboxes avec les valeurs sauvegardées
    const skipCheckbox = document.getElementById('skipAutomatismes');
    const disableCheckbox = document.getElementById('disableGuidance');
    if (skipCheckbox) skipCheckbox.checked = workflowState.skipAutomatismes;
    if (disableCheckbox) disableCheckbox.checked = workflowState.disableGuidance;

    // Afficher l'écran de configuration initial
    showPage('configurationPage');
}

// Démarrer avec la configuration choisie
function startWithConfiguration() {
    // Lire les préférences
    const skipAutomatismes = document.getElementById('skipAutomatismes').checked;
    const disableGuidance = document.getElementById('disableGuidance').checked;

    // Sauvegarder dans localStorage
    localStorage.setItem('dnb_skipAutomatismes', skipAutomatismes);
    localStorage.setItem('dnb_disableGuidance', disableGuidance);

    // Mettre à jour l'état
    workflowState.skipAutomatismes = skipAutomatismes;
    workflowState.disableGuidance = disableGuidance;

    console.log(`⚙️ Configuration: skipAutomatismes=${skipAutomatismes}, disableGuidance=${disableGuidance}`);

    // Créer le stepper
    createWorkflowStepper();

    // Démarrer au bon endroit
    if (skipAutomatismes) {
        // Passer directement à l'étape 2 (exercices DNB)
        workflowState.completedSteps.push(1); // Marquer étape 1 comme "passée"
        goToStep(2);
    } else {
        // Commencer par les automatismes
        goToStep(1);
    }
}

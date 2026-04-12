/**
 * État global de l'application Correcteur DNB Pro
 * Gère toutes les données centralisées de l'application
 */

// État global de l'application - Déclaration dans le scope global
var appState = {
    candidates: [],
    activeCandidates: [],
    currentCandidateIndex: 0,
    currentTab: 'exercise1',
    scores: {}, // candidateNumber: { ex1: { q1: {score: X, competences: {...}}, ... }, ... }
    quickButtonStates: {}, // candidateNumber: { ex1: { q1: 'tb'|'tf'|'nr'|null, ... }, ... }
    validatedCandidates: {}, // candidateNumber: { validated: true, comment: "...", timestamp: "..." }
    candidateComments: {}, // candidateNumber: "commentaire..."
    autoUpdateOverview: true, // Mise à jour automatique de la vue d'ensemble
    correctionMode: '', // 'candidate' ou 'exercise' ou '' (non sélectionné)
    currentExerciseIndex: 1, // Pour le mode par exercice (1-5)
    modeSelected: false, // Indique si un mode a été explicitement choisi
    // Nouvelles propriétés pour la sélection DNB
    dnbData: {}, // Dictionnaire des exercices DNB from MathALÉA
    selectedExercises: [], // IDs des exercices sélectionnés
    parsedExercises: {}, // Contenu parsé des exercices sélectionnés
    // Propriétés pour les automatismes DNB 2025
    automatismesData: {}, // Dictionnaire des automatismes
    selectedAutomatismes: [], // IDs des automatismes sélectionnés pour Ex1
    parsedAutomatismes: {}, // Contenu parsé des automatismes sélectionnés
    // Configuration du barème
    baremeConfig: {
        mode: 'b', // 'a' = points par compétence, 'b' = répartition auto, 'c' = total uniquement
        totalMax: 20, // DNB 2025 sur 20 points (Ex1: 6pts + Ex2-5: 14pts)
        exercises: {} // exerciseId: { totalPoints, selectedCompetences, pointsPerCompetence }
    },
    // Seed pour les valeurs aléatoires (conserve les mêmes valeurs entre prévisualisation et évaluation)
    exerciseSeed: null,
    // Verrouillage global des exercices
    exercisesLocked: false,
    globalSeed: null,
    // Import PDF/DOCX
    pdfImport: {
        file: null,             // Fichier uploadé (File object)
        fileType: null,         // 'pdf' ou 'docx'
        pdfDoc: null,           // Instance pdf.js
        currentPage: 1,         // Page courante
        totalPages: 0,          // Nombre total de pages
        zones: [],              // [{page, x, y, w, h, exerciseId, questionId, label}]
        exercises: [],          // [{id, num, title, questions: [{id, num, text, points, competences, answer}]}]
        correctionPath: null,   // 'pdf', 'photo', 'json', 'none'
        corrections: {},        // {questionId: {text, imageUrl, ...}}
        customCompetences: []   // Compétences ajoutées par l'utilisateur
    }
};

/**
 * Initialise l'état de l'application
 */
function initAppState() {
    console.log('📦 État de l\'application initialisé');
}

/**
 * Réinitialise l'état à zéro
 */
function resetAppState() {
    appState.candidates = [];
    appState.activeCandidates = [];
    appState.currentCandidateIndex = 0;
    appState.scores = {};
    appState.quickButtonStates = {};
    appState.validatedCandidates = {};
    appState.candidateComments = {};
    appState.selectedExercises = [];
    appState.selectedAutomatismes = [];
    appState.parsedExercises = {};
    appState.parsedAutomatismes = {};
    appState.exerciseSeed = null; // Réinitialiser le seed pour de nouvelles valeurs
    appState.exercisesLocked = false;
    appState.globalSeed = null;
    appState.pdfImport = {
        file: null, fileType: null, pdfDoc: null,
        currentPage: 1, totalPages: 0, zones: [],
        exercises: [], correctionPath: null, corrections: {},
        customCompetences: []
    };
    console.log('🔄 État réinitialisé');
}

// Note: avec 'var' au niveau global, appState, initAppState et resetAppState
// sont automatiquement disponibles globalement (window.appState, etc.)

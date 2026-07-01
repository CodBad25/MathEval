// ============================================================================
// CORRECTEUR DNB PRO - LOGIQUE MÉTIER
// ============================================================================
//
// IMPORTANT : L'état global (appState) est défini dans js/state/appState.js
//             et chargé avant ce fichier dans index.html
//

// === SYSTÈME DE NAVIGATION ENTRE PAGES ===
// Fonction utilitaire pour gérer l'affichage des pages de manière cohérente
function showPage(pageId) {
    console.log(`🔄 Navigation vers la page: ${pageId}`);

    // Liste de toutes les pages de l'application
    const allPages = [
        'configurationPage',
        'automatismesSelectionPage',
        'dnbSelectionPage',
        'pdfImportPage',
        'dnb2026LaunchPage',
        'baremeDesignPage',
        'setupPage',
        'candidatesPage',
        'candidatesOverviewPage',
        'mainPage'
    ];

    // MASQUER toutes les pages en retirant .active ET en forçant display:none
    allPages.forEach(id => {
        const page = document.getElementById(id);
        if (page) {
            page.classList.remove('active');
            page.style.display = 'none';  // ✅ FORCER le masquage
        }
    });

    // Afficher uniquement la page demandée
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
        targetPage.style.display = 'block';  // ✅ FORCER l'affichage
        console.log(`✅ Page ${pageId} activée et affichée`);

        // 🎯 Appeler automatiquement le rendu approprié selon la page
        if (pageId === 'dnbSelectionPage' && typeof renderExercises === 'function') {
            console.log('🔄 Appel automatique de renderExercises()');
            setTimeout(() => renderExercises(), 50); // Petit délai pour s'assurer que la page est bien affichée
        } else if (pageId === 'automatismesSelectionPage' && typeof renderAutomatismes === 'function') {
            console.log('🔄 Appel automatique de renderAutomatismes()');
            setTimeout(() => renderAutomatismes(), 50);
        } else if (pageId === 'candidatesOverviewPage') {
            // Bouton "Réimporter corrections" : visible uniquement en mode Import PDF
            const reimportBtn = document.getElementById('btnReimportCorrections');
            if (reimportBtn) reimportBtn.style.display = (appState && appState.pdfImport && !appState.isDnb2026Mode) ? 'flex' : 'none';
            // Repartir d'une recherche vierge + curseur prêt pour enchaîner directement l'élève suivant
            const si = document.getElementById('candidateSearchInput');
            if (si) {
                si.value = '';
                if (typeof filterCandidateCards === 'function') filterCandidateCards();
                setTimeout(() => { try { si.focus(); } catch (e) {} }, 50);
            }
        }
    } else {
        console.error(`❌ Page ${pageId} introuvable`);
    }

    // Mettre à jour l'affichage de la barre de verrouillage selon la page
    updateLockBarVisibility(pageId);
}

// === SYSTÈME DE VERROUILLAGE GLOBAL DES EXERCICES ===

/**
 * Affiche/masque la barre de verrouillage selon la page active
 */
function updateLockBarVisibility(pageId) {
    const lockBar = document.getElementById('lockBar');
    if (!lockBar) return;

    // Afficher la barre uniquement sur les pages de sélection/configuration
    const pagesWithLockBar = ['automatismesSelectionPage', 'dnbSelectionPage', 'baremeDesignPage'];
    if (pagesWithLockBar.includes(pageId)) {
        lockBar.style.display = 'flex';
    } else {
        lockBar.style.display = 'none';
    }
}

/**
 * Met à jour l'affichage de la barre de verrouillage
 */
function updateLockBarUI() {
    const lockBarUnlocked = document.getElementById('lockBarUnlocked');
    const lockBarLocked = document.getElementById('lockBarLocked');
    const lockBarSeed = document.getElementById('lockBarSeed');
    const lockBar = document.getElementById('lockBar');

    if (!lockBarUnlocked || !lockBarLocked || !lockBar) return;

    if (appState.exercisesLocked) {
        lockBarUnlocked.style.display = 'none';
        lockBarLocked.style.display = 'flex';
        lockBarSeed.textContent = appState.globalSeed || appState.exerciseSeed || '-';
        lockBar.style.background = 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)';
        lockBar.style.borderBottomColor = '#28a745';
    } else {
        lockBarUnlocked.style.display = 'flex';
        lockBarLocked.style.display = 'none';
        lockBar.style.background = 'linear-gradient(135deg, #fff3cd 0%, #ffeeba 100%)';
        lockBar.style.borderBottomColor = '#ffc107';
    }
}

/**
 * Verrouille tous les exercices avec le seed actuel
 */
function lockAllExercises() {
    // Générer un seed global si nécessaire
    if (!appState.exerciseSeed && window.mathaleaUtils) {
        appState.exerciseSeed = window.mathaleaUtils.generateSeed();
    }

    appState.globalSeed = appState.exerciseSeed;
    appState.exercisesLocked = true;

    // Sauvegarder dans localStorage
    localStorage.setItem('matheval_seed', appState.globalSeed);
    localStorage.setItem('matheval_locked', 'true');

    // Mettre à jour l'URL avec le seed
    const url = new URL(window.location.href);
    url.searchParams.set('seed', appState.globalSeed);
    window.history.replaceState({}, '', url.toString());

    // Appliquer le seed
    if (window.mathaleaUtils) {
        window.mathaleaUtils.setSeed(appState.globalSeed);
    }

    // Mettre à jour l'UI
    updateLockBarUI();

    console.log('🔒 Exercices verrouillés avec seed:', appState.globalSeed);

    // Notification visuelle
    showLockNotification('🔒 Exercices verrouillés ! Les valeurs sont maintenant figées.');
}

/**
 * Déverrouille les exercices et régénère les valeurs
 */
function unlockAllExercises() {
    if (!confirm('⚠️ Déverrouiller va générer de NOUVELLES valeurs aléatoires.\n\nÊtes-vous sûr de vouloir continuer ?')) {
        return;
    }

    // Générer un nouveau seed
    if (window.mathaleaUtils) {
        appState.exerciseSeed = window.mathaleaUtils.generateSeed();
        window.mathaleaUtils.setSeed(appState.exerciseSeed);
    }

    appState.globalSeed = null;
    appState.exercisesLocked = false;

    // Supprimer du localStorage
    localStorage.removeItem('matheval_seed');
    localStorage.removeItem('matheval_locked');

    // Supprimer le seed de l'URL
    const url = new URL(window.location.href);
    url.searchParams.delete('seed');
    window.history.replaceState({}, '', url.toString());

    // Mettre à jour l'UI
    updateLockBarUI();

    // Regénérer les aperçus
    if (typeof updateExercice1Preview === 'function') {
        updateExercice1Preview();
    }

    console.log('🔓 Exercices déverrouillés, nouveau seed:', appState.exerciseSeed);

    // Notification visuelle
    showLockNotification('🔓 Exercices déverrouillés ! Nouvelles valeurs générées.');
}

/**
 * Charge le seed depuis l'URL ou localStorage au démarrage
 */
function loadSeedFromStorage() {
    // Priorité 1: URL
    const urlParams = new URLSearchParams(window.location.search);
    const urlSeed = urlParams.get('seed');

    // Priorité 2: localStorage
    const storedSeed = localStorage.getItem('matheval_seed');
    const storedLocked = localStorage.getItem('matheval_locked') === 'true';

    if (urlSeed) {
        appState.exerciseSeed = urlSeed;
        appState.globalSeed = urlSeed;
        appState.exercisesLocked = true;
        localStorage.setItem('matheval_seed', urlSeed);
        localStorage.setItem('matheval_locked', 'true');
        console.log('🔒 Seed chargé depuis URL:', urlSeed);
    } else if (storedSeed && storedLocked) {
        appState.exerciseSeed = storedSeed;
        appState.globalSeed = storedSeed;
        appState.exercisesLocked = true;
        // Mettre à jour l'URL
        const url = new URL(window.location.href);
        url.searchParams.set('seed', storedSeed);
        window.history.replaceState({}, '', url.toString());
        console.log('🔒 Seed chargé depuis localStorage:', storedSeed);
    }

    // Appliquer le seed si existant
    if (appState.exerciseSeed && window.mathaleaUtils) {
        window.mathaleaUtils.setSeed(appState.exerciseSeed);
    }

    // Mettre à jour l'UI
    setTimeout(updateLockBarUI, 100);
}

/**
 * Affiche une notification temporaire
 */
function showLockNotification(message) {
    // Supprimer notification existante
    const existing = document.getElementById('lockNotification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.id = 'lockNotification';
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: #2c3e50;
        color: white;
        padding: 15px 30px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        animation: slideDown 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    // Supprimer après 3 secondes
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Ajouter les animations CSS
const lockAnimStyle = document.createElement('style');
lockAnimStyle.textContent = `
    @keyframes slideDown {
        from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
        to { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    @keyframes slideUp {
        from { opacity: 1; transform: translateX(-50%) translateY(0); }
        to { opacity: 0; transform: translateX(-50%) translateY(-20px); }
    }
`;
document.head.appendChild(lockAnimStyle);

// Définition des exercices (version complète - comme dans votre fichier original)
// ⚠️ IMPORTANT : var pour scope global et remplacement dynamique possible
var exercisesData = {
    1: {
        title: "Exercice 1 - Automatismes",
        totalPoints: 6,
        questions: [
            { 
                id: "q1", 
                title: "Question 1", 
                points: 3, 
                statement: "On tire une boule dans l'urne A, quelle est la probabilité d'obtenir un nombre pair ?", 
                answer: "Urne A : {7, 10, 12, 15, 24, 30}\nNombres pairs : 10, 12, 24, 30 → 4 nombres\nP = 4/6 = 2/3",
                competences: [
                    { name: "Calculer", color: "#28a745", description: "Effectuer le calcul de probabilité", tooltip: "Dénombrer les cas favorables", points: 2, increment: 1 },
                    { name: "Communiquer", color: "#ffc107", description: "Présenter la réponse finale", tooltip: "Fraction irréductible ou décimal", points: 1, increment: 1 }
                ]
            },
            { 
                id: "q2", 
                title: "Question 2", 
                points: 4, 
                statement: "On tire une boule dans l'urne B, justifier que la probabilité d'obtenir un nombre premier est de 1/3.", 
                answer: "Urne B : {2, 5, 6, 8, 17, 18, 21, 22, 25}\nNombres premiers : 2, 5, 17 → 3 nombres\nP = 3/9 = 1/3",
                competences: [
                    { name: "Raisonner", color: "#dc3545", description: "Identifier les nombres premiers", tooltip: "2, 3, 5, 7, 11, 13, 17, 19...", points: 1, increment: 1 },
                    { name: "Calculer", color: "#28a745", description: "Calculer la probabilité", tooltip: "Nombre de cas favorables / total", points: 2, increment: 1 },
                    { name: "Communiquer", color: "#ffc107", description: "Justifier le résultat", tooltip: "Expliquer pourquoi 1/3", points: 1, increment: 1 }
                ]
            },
            { 
                id: "q3", 
                title: "Question 3", 
                points: 4, 
                statement: "Quelle urne contient le plus grand nombre de boules dont le numéro est un multiple de 6 ?", 
                answer: "Urne A : multiples de 6 → 12, 24, 30 → 3 boules\nUrne B : multiples de 6 → 6, 18 → 2 boules\nL'urne A contient le plus grand nombre de multiples de 6.",
                competences: [
                    { name: "Raisonner", color: "#dc3545", description: "Identifier les multiples de 6", tooltip: "6, 12, 18, 24, 30, 36...", points: 2, increment: 1 },
                    { name: "Communiquer", color: "#ffc107", description: "Comparer et conclure", tooltip: "Quelle urne en contient le plus", points: 2, increment: 1 }
                ]
            },
            { 
                id: "q4", 
                title: "Question 4", 
                points: 5, 
                statement: "On tire une boule au hasard dans l'une des urnes. Démontrer que la probabilité d'obtenir un nombre supérieur ou égal à 20 est la même quelle que soit l'urne choisie ?", 
                answer: "Urne A : nombres ≥ 20 → 24, 30 → 2 boules → P = 2/6 = 1/3\nUrne B : nombres ≥ 20 → 21, 22, 25 → 3 boules → P = 3/9 = 1/3\nLes deux probabilités sont égales à 1/3.",
                competences: [
                    { name: "Chercher", color: "#fd7e14", description: "Identifier la stratégie de démonstration", tooltip: "Calculer P(A) et P(B) puis comparer", points: 1, increment: 1 },
                    { name: "Raisonner", color: "#17a2b8", description: "Identifier les nombres ≥ 20 dans chaque urne", tooltip: "Analyser les deux urnes", points: 1, increment: 1 },
                    { name: "Calculer", color: "#28a745", description: "Calculer les deux probabilités", tooltip: "P(A) et P(B)", points: 2, increment: 1 },
                    { name: "Communiquer", color: "#ffc107", description: "Démontrer l'égalité des probabilités", tooltip: "Prouver que P(A) = P(B)", points: 1, increment: 1 }
                ]
            },
            { 
                id: "q5", 
                title: "Question 5", 
                points: 4, 
                statement: "En repartant avec la composition initiale des urnes A et B on décide d'ajouter une boule numérotée 50 dans chacune d'entre elles. Dans ces conditions, la probabilité d'obtenir un résultat supérieur ou égal à 20 est-t-elle toujours égale quelle que soit l'urne choisie ?", 
                answer: "Urne A : nombres ≥ 20 → 24, 30, 50 → 3 boules → P = 3/7\nUrne B : nombres ≥ 20 → 21, 22, 25, 50 → 4 boules → P = 4/10 = 2/5\n3/7 ≠ 2/5, donc les probabilités ne sont plus égales.",
                competences: [
                    { name: "Modéliser", color: "#6f42c1", description: "Modéliser la situation avec ajout de boules", tooltip: "Nouvelle composition des urnes", points: 1, increment: 1 },
                    { name: "Calculer", color: "#28a745", description: "Calculer les nouvelles probabilités", tooltip: "P(A) et P(B) après ajout", points: 2, increment: 1 },
                    { name: "Communiquer", color: "#ffc107", description: "Conclure sur l'égalité ou non", tooltip: "Comparaison 3/7 vs 2/5", points: 1, increment: 1 }
                ]
            }
        ]
    },
    2: {
        title: "Exercice 2 - Géométrie et Statistiques",
        totalPoints: 23,
        questions: [
            { 
                id: "q1", 
                title: "Question 1", 
                points: 3, 
                statement: "Justifier que AD = 200 m.", 
                answer: "A, D, E alignés avec AE = 250 m et DE = 50 m\nDonc AD = AE - DE = 250 - 50 = 200 m",
                competences: [
                    { name: "Raisonner", color: "#17a2b8", description: "Comprendre l'alignement des points", tooltip: "Utiliser les données géométriques", points: 1, increment: 1 },
                    { name: "Calculer", color: "#28a745", description: "Effectuer le calcul de soustraction", tooltip: "250 - 50 = 200", points: 2, increment: 1 }
                ]
            },
            { 
                id: "q2", 
                title: "Question 2", 
                points: 4, 
                statement: "Calculer la longueur CD.", 
                answer: "Triangle ADC rectangle en A\nAC = 480 m, AD = 200 m\nD'après le théorème de Pythagore :\nCD² = AC² + AD² = 480² + 200² = 230400 + 40000 = 270400\nCD = √270400 = 520 m",
                competences: [
                    { name: "Chercher", color: "#fd7e14", description: "Identifier la méthode de calcul", tooltip: "Reconnaître qu'il faut utiliser Pythagore", points: 1, increment: 1 },
                    { name: "Raisonner", color: "#dc3545", description: "Utiliser le théorème de Pythagore", tooltip: "Triangle rectangle ADC", points: 1, increment: 1 },
                    { name: "Calculer", color: "#28a745", description: "Effectuer les calculs numériques", tooltip: "CD² = AC² + AD²", points: 1, increment: 1 },
                    { name: "Communiquer", color: "#ffc107", description: "Présenter le résultat avec unité", tooltip: "CD = 520 m", points: 1, increment: 1 }
                ]
            },
            { 
                id: "q3a", 
                title: "Question 3a", 
                points: 3, 
                statement: "Les droites (CD) et (BE) sont-elles parallèles ?", 
                answer: "Utilisation du théorème de Thalès réciproque :\nAD/AE = 200/250 = 4/5\nAC/AB = 480/600 = 4/5\nLes rapports sont égaux, donc (CD) // (BE)",
                competences: [
                    { name: "Raisonner", color: "#dc3545", description: "Utiliser le théorème de Thalès réciproque", tooltip: "Vérifier si AD/AE = AC/AB", points: 1, increment: 1 },
                    { name: "Calculer", color: "#28a745", description: "Calculer les rapports", tooltip: "200/250 et 480/600", points: 1, increment: 1 },
                    { name: "Communiquer", color: "#ffc107", description: "Conclure sur le parallélisme", tooltip: "Les rapports sont égaux donc (CD) // (BE)", points: 1, increment: 1 }
                ]
            },
            { 
                id: "q3b", 
                title: "Question 3b", 
                points: 4, 
                statement: "La mesure de l'angle ACD est-elle supérieure à 20° ?", 
                answer: "Dans le triangle rectangle ADC :\ntan(ACD) = AD/AC = 200/480 = 5/12 ≈ 0,417\nACD = arctan(5/12) ≈ 22,6°\n22,6° > 20°, donc oui.",
                competences: [
                    { name: "Raisonner", color: "#dc3545", description: "Utiliser la trigonométrie", tooltip: "tan(ACD) = opposé / adjacent", points: 2, increment: 1 },
                    { name: "Calculer", color: "#28a745", description: "Calculer l'angle", tooltip: "ACD = arctan(200/480)", points: 1, increment: 1 },
                    { name: "Communiquer", color: "#ffc107", description: "Comparer avec 20°", tooltip: "22,6° > 20°", points: 1, increment: 1 }
                ]
            },
            { 
                id: "q3c", 
                title: "Question 3c", 
                points: 2, 
                statement: "Le parcours est-il validé ?", 
                answer: "Oui, le parcours est validé car :\n- Les droites (CD) et (BE) sont parallèles\n- L'angle ACD > 20°",
                competences: [
                    { name: "Communiquer", color: "#ffc107", description: "Synthèse des résultats précédents", tooltip: "Rassembler les deux conditions", points: 2, increment: 1 }
                ]
            },
            { 
                id: "q4", 
                title: "Question 4", 
                points: 3, 
                statement: "Quel est le temps médian de cette série ?", 
                answer: "Série ordonnée : 5min30s, 5min45s, 5min49s, 5min50s, 6min, 6min11s, 6min12s, 6min20s, 6min40s\n9 valeurs → médiane = 5e valeur = 6 min",
                competences: [
                    { name: "Raisonner", color: "#dc3545", description: "Ordonner la série statistique", tooltip: "Classer les 9 valeurs", points: 1, increment: 1 },
                    { name: "Communiquer", color: "#ffc107", description: "Identifier la médiane", tooltip: "5e valeur sur 9", points: 2, increment: 1 }
                ]
            },
            { 
                id: "q5", 
                title: "Question 5", 
                points: 4, 
                statement: "Un poisson rouge nage à la vitesse de 5 km/h. Nage-t-il plus vite que l'élève le plus rapide ?", 
                answer: "Élève le plus rapide : 5min30s pour 200m\nVitesse = 200m/330s = 0,606 m/s = 2,18 km/h\n5 km/h > 2,18 km/h, donc le poisson nage plus vite.",
                competences: [
                    { name: "Modéliser", color: "#17a2b8", description: "Convertir les unités", tooltip: "min/s vers km/h", points: 1, increment: 1 },
                    { name: "Calculer", color: "#28a745", description: "Calculer la vitesse", tooltip: "v = d/t", points: 2, increment: 1 },
                    { name: "Communiquer", color: "#ffc107", description: "Comparer les vitesses", tooltip: "5 km/h vs 2,18 km/h", points: 1, increment: 1 }
                ]
            }
        ]
    },
    3: {
        title: "Exercice 3 - QCM",
        totalPoints: 18,
        questions: [
            { 
                id: "q1", 
                title: "Question 1", 
                points: 3, 
                statement: "Le prix de 3 melons est 8,40 €. Combien coûtent 5 melons ?", 
                answer: "1 melon = 8,40 ÷ 3 = 2,80 €\n5 melons = 5 × 2,80 = 14 €\nRéponse : C",
                qcm: true,
                options: [
                    { label: "A: 16,40 €", correct: false },
                    { label: "B: 42 €", correct: false },
                    { label: "C: 14 €", correct: true },
                    { label: "D: 10,40 €", correct: false }
                ],
                competences: [
                    { name: "Calculer", color: "#28a745", description: "Calcul de proportionnalité", tooltip: "Règle de trois", points: 3, increment: 1 }
                ]
            },
            { 
                id: "q2", 
                title: "Question 2", 
                points: 3, 
                statement: "Quelle transformation permet de passer de la figure 1 à la figure 2 ?", 
                answer: "La figure 2 est l'image de la figure 1 par une symétrie axiale.\nRéponse : D",
                qcm: true,
                options: [
                    { label: "A: Une symétrie centrale", correct: false },
                    { label: "B: Une rotation", correct: false },
                    { label: "C: Une translation", correct: false },
                    { label: "D: Une symétrie axiale", correct: true }
                ],
                competences: [
                    { name: "Raisonner", color: "#17a2b8", description: "Reconnaissance transformation", tooltip: "Identifier le type de transformation", points: 2, increment: 1 },
                    { name: "Communiquer", color: "#ffc107", description: "Bonne réponse choisie", tooltip: "Sélection correcte", points: 1, increment: 1 }
                ]
            },
            { 
                id: "q3", 
                title: "Question 3", 
                points: 3, 
                statement: "Un article coûte 350 €. Son prix augmente de 20 %. Quel est son nouveau prix ?", 
                answer: "Nouveau prix = 350 × 1,20 = 420 €\nRéponse : A",
                qcm: true,
                options: [
                    { label: "A: 420 €", correct: true },
                    { label: "B: 330 €", correct: false },
                    { label: "C: 370 €", correct: false },
                    { label: "D: 280 €", correct: false }
                ],
                competences: [
                    { name: "Calculer", color: "#28a745", description: "Calcul de pourcentage", tooltip: "350 × 1,20 = 420€", points: 3, increment: 1 }
                ]
            },
            { 
                id: "q4", 
                title: "Question 4", 
                points: 3, 
                statement: "Quelle est l'aire du triangle rectangle ABC ?", 
                answer: "Aire = (4,5 × 6) ÷ 2 = 13,5 cm²\nRéponse : B",
                qcm: true,
                options: [
                    { label: "A: 27 cm²", correct: false },
                    { label: "B: 13,5 cm²", correct: true },
                    { label: "C: 18 cm²", correct: false },
                    { label: "D: 9 cm²", correct: false }
                ],
                competences: [
                    { name: "Calculer", color: "#28a745", description: "Calcul d'aire de triangle", tooltip: "(4,5 × 6) ÷ 2 = 13,5 cm²", points: 3, increment: 1 }
                ]
            },
            { 
                id: "q5", 
                title: "Question 5", 
                points: 3, 
                statement: "Quelle est la forme développée et réduite de l'expression (2x + 3)(x − 4) ?", 
                answer: "(2x + 3)(x - 4) = 2x² - 8x + 3x - 12 = 2x² - 5x - 12\nRéponse : A",
                qcm: true,
                options: [
                    { label: "A: 2x² - 5x - 12", correct: true },
                    { label: "B: 2x² - 11x - 12", correct: false },
                    { label: "C: 2x² - 12", correct: false },
                    { label: "D: 3x - 1", correct: false }
                ],
                competences: [
                    { name: "Calculer", color: "#28a745", description: "Développement d'expression algébrique", tooltip: "(2x + 3)(x - 4) = 2x² - 5x - 12", points: 3, increment: 1 }
                ]
            },
            { 
                id: "q6", 
                title: "Question 6", 
                points: 3, 
                statement: "Quel est le volume de cette pyramide à base rectangulaire ?", 
                answer: "V = (1/3) × aire base × hauteur = (1/3) × (7 × 4) × 12 = 112 cm³\nRéponse : B",
                qcm: true,
                options: [
                    { label: "A: 23 cm³", correct: false },
                    { label: "B: 112 cm³", correct: true },
                    { label: "C: 336 cm³", correct: false },
                    { label: "D: 168 cm³", correct: false }
                ],
                competences: [
                    { name: "Calculer", color: "#28a745", description: "Calcul de volume de pyramide", tooltip: "V = (1/3) × aire base × hauteur", points: 3, increment: 1 }
                ]
            }
        ]
    },
    4: {
        title: "Exercice 4 - Algorithmes",
        totalPoints: 20,
        questions: [
            { 
                id: "q1", 
                title: "Question 1", 
                points: 2, 
                statement: "Vérifier que si on choisit 10 comme nombre de départ, on obtient 20 avec ce programme.", 
                answer: "10 - 4 = 6\n6 × 2 = 12\n12 + 8 = 20 ✓",
                competences: [
                    { name: "Calculer", color: "#28a745", description: "Appliquer le programme étape par étape", tooltip: "10 → 6 → 12 → 20", points: 2, increment: 1 }
                ]
            },
            { 
                id: "q2", 
                title: "Question 2", 
                points: 3, 
                statement: "Quel résultat obtient-on avec ce programme si on choisit −7 comme nombre de départ ?", 
                answer: "-7 - 4 = -11\n-11 × 2 = -22\n-22 + 8 = -14",
                competences: [
                    { name: "Calculer", color: "#28a745", description: "Effectuer les calculs avec nombres négatifs", tooltip: "-7 → -11 → -22 → -14", points: 2, increment: 1 },
                    { name: "Communiquer", color: "#ffc107", description: "Présenter le résultat final", tooltip: "Résultat = -14", points: 1, increment: 1 }
                ]
            },
            { 
                id: "q3", 
                title: "Question 3", 
                points: 4, 
                statement: "Zoé prétend que son programme est « magique » car, quel que soit le nombre choisi, le résultat est toujours le double du nombre de départ. A-t-elle raison ?", 
                answer: "Avec x comme nombre de départ :\nx - 4 → (x-4)×2 → 2(x-4)+8 = 2x - 8 + 8 = 2x\nOui, le résultat est toujours le double du nombre de départ.",
                competences: [
                    { name: "Raisonner", color: "#dc3545", description: "Utiliser le calcul littéral", tooltip: "Remplacer x par une expression", points: 1, increment: 1 },
                    { name: "Calculer", color: "#28a745", description: "Développer l'expression", tooltip: "2(x-4)+8 = 2x", points: 2, increment: 1 },
                    { name: "Communiquer", color: "#ffc107", description: "Conclure sur le caractère magique", tooltip: "Oui, le résultat est toujours le double", points: 1, increment: 1 }
                ]
            },
            { 
                id: "q4", 
                title: "Question 4", 
                points: 4, 
                statement: "Démontrer que si le nombre de départ est x, le résultat obtenu avec le programme de Fred est 20x + 50.", 
                answer: "x × 4 = 4x\n4x + 10\n(4x + 10) × 5 = 20x + 50",
                competences: [
                    { name: "Raisonner", color: "#dc3545", description: "Suivre le programme de Fred étape par étape", tooltip: "x → 4x → 4x+10 → (4x+10)×5", points: 2, increment: 1 },
                    { name: "Calculer", color: "#28a745", description: "Effectuer le calcul littéral", tooltip: "Développer (4x+10)×5", points: 2, increment: 1 }
                ]
            },
            { 
                id: "q5", 
                title: "Question 5", 
                points: 3, 
                statement: "Quel nombre faut-il choisir au départ pour obtenir 75 avec le programme de Fred ?", 
                answer: "20x + 50 = 75\n20x = 25\nx = 1,25",
                competences: [
                    { name: "Chercher", color: "#fd7e14", description: "Identifier la stratégie de résolution", tooltip: "Utiliser l'expression trouvée pour poser une équation", points: 1, increment: 1 },
                    { name: "Modéliser", color: "#17a2b8", description: "Poser l'équation", tooltip: "20x + 50 = 75", points: 1, increment: 1 },
                    { name: "Calculer", color: "#28a745", description: "Résoudre l'équation", tooltip: "20x = 25, donc x = 1,25", points: 1, increment: 1 }
                ]
            },
            { 
                id: "q6", 
                title: "Question 6", 
                points: 4, 
                statement: "Constatant que son programme n'a rien de magique, Fred souhaite le modifier afin que le résultat soit toujours 20 fois plus grand que le nombre de départ. Recopier et compléter sur la copie la sixième ligne du programme pour que ce soit le cas.", 
                answer: "Remplacer \"+ 10\" par \"+ 0\" ou supprimer l'addition\n→ 4x × 5 = 20x",
                competences: [
                    { name: "Raisonner", color: "#dc3545", description: "Analyser la modification nécessaire", tooltip: "Pour obtenir 20x, que changer ?", points: 2, increment: 1 },
                    { name: "Communiquer", color: "#ffc107", description: "Proposer la solution", tooltip: "Remplacer +10 par +0", points: 2, increment: 1 }
                ]
            }
        ]
    },
    5: {
        title: "Exercice 5 - Fonctions",
        totalPoints: 19,
        questions: [
            { 
                id: "q1", 
                title: "Question 1", 
                points: 3, 
                statement: "Montrer qu'avec l'option Achat la dépense à la fin de la première année est de 23 300 €.", 
                answer: "Prix d'achat : 22 400 €\nAssurance pour 12 mois : 75 × 12 = 900 €\nTotal : 22 400 + 900 = 23 300 €",
                competences: [
                    { name: "Calculer", color: "#28a745", description: "Effectuer les calculs numériques", tooltip: "22 400 + 75×12", points: 2, increment: 1 },
                    { name: "Communiquer", color: "#ffc107", description: "Vérifier le résultat attendu", tooltip: "Total = 23 300 €", points: 1, increment: 1 }
                ]
            },
            { 
                id: "q2", 
                title: "Question 2", 
                points: 4, 
                statement: "Après 36 mois, calculer l'économie réalisée par le client s'il choisit l'option Location ?", 
                answer: "Option Achat (36 mois) : 22 400 + 75 × 36 = 22 400 + 2 700 = 25 100 €\nOption Location (36 mois) : 425 × 36 = 15 300 €\nÉconomie : 25 100 - 15 300 = 9 800 €",
                competences: [
                    { name: "Modéliser", color: "#17a2b8", description: "Calculer pour les deux options", tooltip: "Achat vs Location sur 36 mois", points: 1, increment: 1 },
                    { name: "Calculer", color: "#28a745", description: "Effectuer les calculs numériques", tooltip: "25 100 - 15 300", points: 2, increment: 1 },
                    { name: "Communiquer", color: "#ffc107", description: "Présenter l'économie réalisée", tooltip: "Économie = 9 800 €", points: 1, increment: 1 }
                ]
            },
            { 
                id: "q3", 
                title: "Question 3", 
                points: 4, 
                statement: "Quelle formule doit être saisie dans la cellule B3 qui, étendue jusqu'à la cellule F3, permet de compléter le tableau ?", 
                answer: "=B1*425\nou\n=425*B1",
                competences: [
                    { name: "Modéliser", color: "#17a2b8", description: "Comprendre la logique du tableur", tooltip: "Référence aux cellules", points: 4, increment: 1 }
                ]
            },
            { 
                id: "q4", 
                title: "Question 4", 
                points: 4, 
                statement: "Déterminer l'expression de f(x) permettant de calculer la dépense correspondant à l'option Achat.", 
                answer: "f(x) = 22 400 + 75x\nPrix d'achat fixe + assurance mensuelle × nombre de mois",
                competences: [
                    { name: "Modéliser", color: "#17a2b8", description: "Établir la fonction affine", tooltip: "Coût fixe + coût variable", points: 2, increment: 1 },
                    { name: "Communiquer", color: "#ffc107", description: "Écrire l'expression de f(x)", tooltip: "f(x) = 22 400 + 75x", points: 2, increment: 1 }
                ]
            },
            { 
                id: "q5", 
                title: "Question 5", 
                points: 4, 
                statement: "Par lecture graphique, déterminer à partir de combien de mois, l'option Achat est la plus avantageuse.", 
                answer: "Par lecture graphique : les courbes se croisent vers x = 64 mois\nL'option Achat devient plus avantageuse à partir de 64 mois.",
                competences: [
                    { name: "Chercher", color: "#fd7e14", description: "Identifier la méthode de résolution", tooltip: "Chercher l'intersection des courbes", points: 1, increment: 1 },
                    { name: "Représenter", color: "#6f42c1", description: "Lire un graphique", tooltip: "Intersection des courbes", points: 2, increment: 1 },
                    { name: "Communiquer", color: "#ffc107", description: "Interpréter le résultat", tooltip: "À partir de 64 mois", points: 1, increment: 1 }
                ]
            }
        ]
    }
};

// === FONCTIONS POUR LA SÉLECTION AUTOMATISMES ===

// Initialiser les données automatismes
function initAutomatismesData() {
    console.log('🚀 initAutomatismesData appelée');
    console.log('📦 dictionnaireAutomatismes défini?', typeof window.dictionnaireAutomatismes !== 'undefined');
    
    if (typeof window.dictionnaireAutomatismes !== 'undefined') {
        appState.automatismesData = window.dictionnaireAutomatismes;
        console.log(`✅ ${Object.keys(appState.automatismesData).length} automatismes chargés`);
        renderAutomatismes();
    } else {
        console.error('❌ dictionnaireAutomatismes non chargé');
        console.log('⏳ Nouvel essai dans 1 seconde...');
        setTimeout(() => {
            if (typeof window.dictionnaireAutomatismes !== 'undefined') {
                appState.automatismesData = window.dictionnaireAutomatismes;
                console.log(`✅ ${Object.keys(appState.automatismesData).length} automatismes chargés (retry)`);
                renderAutomatismes();
            } else {
                console.error('❌ dictionnaireAutomatismes toujours non chargé');
            }
        }, 1000);
    }
}

// Rendre les automatismes dans la grille
function renderAutomatismes() {
    // Protection: ne render que si la page automatismes est active
    const autoPage = document.getElementById('automatismesSelectionPage');
    if (!autoPage || !autoPage.classList.contains('active')) {
        console.log('⚠️ renderAutomatismes() ignoré - page automatismes non active');
        return;
    }

    console.log('🎨 renderAutomatismes appelée - page automatismes active ✅');
    const grid = document.getElementById('automatismesGrid');
    console.log('📍 Grid element:', grid);
    if (!grid) {
        console.error('❌ automatismesGrid introuvable !');
        return;
    }

    const searchFilter = document.getElementById('searchAutomatismes')?.value.toLowerCase() || '';
    const categorieFilter = document.getElementById('categorieFilterAutomatismes')?.value || '';

    console.log('🔍 Filtres:', { searchFilter, categorieFilter });
    console.log('📦 automatismesData:', appState.automatismesData);

    let filtered = Object.entries(appState.automatismesData || {});
    console.log(`📊 Nombre total d'automatismes: ${filtered.length}`);

    // Filtrer par catégorie
    if (categorieFilter) {
        filtered = filtered.filter(([id, data]) => data.categorie === categorieFilter);
        console.log(`📊 Après filtre catégorie: ${filtered.length}`);
    }

    // Filtrer par recherche
    if (searchFilter) {
        filtered = filtered.filter(([id, data]) => {
            const searchLower = searchFilter.toLowerCase();
            return id.toLowerCase().includes(searchLower) ||
                   data.titre.toLowerCase().includes(searchLower);
        });
        console.log(`📊 Après filtre recherche: ${filtered.length}`);
    }

    // DÉDUPLIQUER : Regrouper par groupe et ne garder qu'un seul représentant
    const groupes = {};
    filtered.forEach(([id, data]) => {
        const groupe = data.groupe || id.replace(/-\d+$/, ''); // Ex: 3AutoP01-1 -> 3AutoP01
        if (!groupes[groupe]) {
            groupes[groupe] = [id, data];
        }
    });
    filtered = Object.values(groupes);
    console.log(`📊 Après déduplication (groupes uniques): ${filtered.length}`);

    grid.innerHTML = '';
    console.log(`✅ Affichage de ${filtered.length} automatismes dans la grille`);

    filtered.forEach(([id, data]) => {
        const card = document.createElement('div');
        card.className = 'exercise-card';
        if (appState.selectedAutomatismes?.includes(id)) {
            card.classList.add('selected');
        }

        card.addEventListener('click', () => toggleAutomatisme(id));

        const categorieLabel = {
            '3AutoN': '🔢 Nombres',
            '3AutoG': '📐 Géométrie',
            '3AutoP': '📊 Proportionnalité',
            '3AutoI': '💻 Informatique'
        }[data.categorie] || data.categorie;

        card.innerHTML = `
            <div class="exercise-card-header">
                <div class="exercise-title">${id}</div>
                <input type="checkbox" ${appState.selectedAutomatismes?.includes(id) ? 'checked' : ''}
                       style="pointer-events: none;">
            </div>
            <div class="exercise-meta">
                <span class="exercise-badge">${categorieLabel}</span>
            </div>
            <div style="margin-top: 10px; color: #495057; font-size: 0.9em;">
                ${data.titre}
            </div>
        `;

        grid.appendChild(card);
    });

    updateAutomatismesDisplay();
}

// Toggle sélection d'un automatisme
async function toggleAutomatisme(automatismeId) {
    if (!appState.selectedAutomatismes) {
        appState.selectedAutomatismes = [];
    }
    const index = appState.selectedAutomatismes.indexOf(automatismeId);
    if (index > -1) {
        appState.selectedAutomatismes.splice(index, 1);
    } else {
        appState.selectedAutomatismes.push(automatismeId);
        // Plus besoin de charger depuis MathALÉA, on génère localement
    }
    updateAutomatismesDisplay();
    renderAutomatismes();
}

// Fonction supprimée : plus besoin de charger depuis MathALÉA via iframe
// On génère les questions localement avec nos générateurs

// Fonction supprimée : plus besoin de charger depuis MathALÉA
// On génère les questions localement avec nos générateurs

// Mettre à jour l'affichage de la sélection
function updateAutomatismesDisplay() {
    const count = appState.selectedAutomatismes?.length || 0;
    const countSpan = document.getElementById('automatismesCount');
    const pointsSpan = document.getElementById('automatismesPoints');
    const btnContinue = document.getElementById('btnContinueAutomatismes');
    
    if (countSpan) {
        countSpan.textContent = `${count} automatisme${count > 1 ? 's' : ''} sélectionné${count > 1 ? 's' : ''}`;
    }
    
    // Calculer les points (1 point par automatisme par défaut)
    const totalPoints = count;
    if (pointsSpan) {
        const color = totalPoints > 6 ? '#dc3545' : (totalPoints === 6 ? '#28a745' : '#495057');
        pointsSpan.innerHTML = `Total: <strong style="color: ${color}">${totalPoints} / 6 points</strong>`;
    }
    
    if (btnContinue) {
        if (count > 0) {
            btnContinue.innerHTML = `Continuer avec les exercices DNB (${count} automatisme${count > 1 ? 's' : ''}) →`;
            btnContinue.disabled = false;
        } else {
            btnContinue.innerHTML = 'Continuer avec les exercices DNB →';
            btnContinue.disabled = false;
        }
    }
    
    // Afficher/masquer l'aperçu et le mettre à jour
    updateExercice1Preview();
}

// Mettre à jour l'aperçu de l'Exercice 1
function updateExercice1Preview() {
    const previewDiv = document.getElementById('exercice1Preview');
    const contentDiv = document.getElementById('exercice1PreviewContent');

    if (!previewDiv || !contentDiv) return;

    const selected = appState.selectedAutomatismes || [];

    if (selected.length === 0) {
        previewDiv.style.display = 'none';
        return;
    }

    previewDiv.style.display = 'block';

    // 🎲 Initialiser le seed pour des valeurs aléatoires reproductibles
    // Si exercices verrouillés, utiliser le globalSeed
    if (appState.exercisesLocked && appState.globalSeed) {
        appState.exerciseSeed = appState.globalSeed;
        console.log('🔒 Utilisation du seed verrouillé:', appState.exerciseSeed);
    } else if (!appState.exerciseSeed) {
        appState.exerciseSeed = window.mathaleaUtils.generateSeed();
        console.log('🎲 Nouveau seed généré:', appState.exerciseSeed);
    }
    window.mathaleaUtils.setSeed(appState.exerciseSeed);

    let html = '<div style="display: flex; flex-direction: column; gap: 15px;">';

    selected.forEach((autoId, index) => {
        const autoData = appState.automatismesData[autoId];
        if (!autoData) return;
        
        // GÉNÉRATION INSTANTANÉE de la question
        let questionPreview = '';
        let hasGenerator = false;
        
        if (typeof window.genererAutomatisme === 'function') {
            const generated = window.genererAutomatisme(autoId);
            if (generated !== null) {
                hasGenerator = true;
                // Garder le HTML avec les formules LaTeX
                questionPreview = generated.question;
            }
        }
        
        html += `
            <div style="border-left: 4px solid #4285f4; padding-left: 15px; background: white; padding: 12px; border-radius: 6px;">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 8px;">
                    <strong style="color: #2c3e50;">Question ${index + 1}</strong>
                    <span style="background: #4285f4; color: white; padding: 3px 8px; border-radius: 12px; font-size: 0.85em; font-weight: bold;">1 pt</span>
                </div>
                <div style="color: #495057; margin-top: 5px;">
                    <strong>${autoId}:</strong> ${autoData.titre}
                </div>
                ${hasGenerator ? `
                    <div style="margin-top: 10px; padding: 10px; background: #e8f5e9; border-radius: 6px; border: 1px solid #4caf50;">
                        <div style="font-size: 0.85em; color: #2e7d32; line-height: 1.5;">
                            ✅ <strong>Aperçu :</strong> ${questionPreview}
                        </div>
                    </div>
                ` : `
                    <div style="margin-top: 10px; padding: 8px; background: #fff3cd; border-radius: 6px; font-size: 0.85em; color: #856404;">
                        ⚠️ Générateur à implémenter
                    </div>
                `}
                <div style="margin-top: 8px;">
                    <span style="background: #e3f2fd; color: #1565c0; padding: 4px 8px; border-radius: 12px; font-size: 0.8em;">
                        ${autoData.categorie === '3AutoN' ? '🔢 Nombres' : 
                          autoData.categorie === '3AutoG' ? '📐 Géométrie' : 
                          autoData.categorie === '3AutoP' ? '📊 Proportionnalité' : 
                          autoData.categorie === '3AutoI' ? '💻 Informatique' : autoData.categorie}
                    </span>
                </div>
            </div>
        `;
    });
    
    const totalPoints = selected.length;
    const pointsStatus = totalPoints > 6 ? '⚠️ Trop de points !' : 
                        totalPoints === 6 ? '✅ Parfait (6/6 points)' : 
                        `ℹ️ Il reste ${6 - totalPoints} point${6 - totalPoints > 1 ? 's' : ''} à attribuer`;
    
    html += `
        <div style="padding: 12px; background: ${totalPoints > 6 ? '#fff3cd' : totalPoints === 6 ? '#d4edda' : '#d1ecf1'}; 
                    border-radius: 6px; border-left: 4px solid ${totalPoints > 6 ? '#ffc107' : totalPoints === 6 ? '#28a745' : '#17a2b8'};">
            <strong style="color: ${totalPoints > 6 ? '#856404' : totalPoints === 6 ? '#155724' : '#0c5460'};">
                ${pointsStatus}
            </strong>
        </div>
    `;
    
    html += '</div>';
    contentDiv.innerHTML = html;
    
    // Rendre les formules LaTeX avec KaTeX
    if (typeof renderMathInElement !== 'undefined') {
        setTimeout(() => {
            renderMathInElement(contentDiv, {
                delimiters: [
                    {left: "$$", right: "$$", display: true},
                    {left: "$", right: "$", display: false},
                    {left: "\\[", right: "\\]", display: true},
                    {left: "\\(", right: "\\)", display: false}
                ],
                throwOnError: false
            });
        }, 100);
    }
}

// Toggle l'aperçu (plier/déplier)
function toggleExercice1Preview() {
    const contentDiv = document.getElementById('exercice1PreviewContent');
    const toggleText = document.getElementById('previewToggleText');
    
    if (contentDiv.style.display === 'none') {
        contentDiv.style.display = 'block';
        toggleText.textContent = '▼';
    } else {
        contentDiv.style.display = 'none';
        toggleText.textContent = '▶';
    }
}

// Filtrer les automatismes
function filterAutomatismes() {
    renderAutomatismes();
}

// Effacer les filtres
function clearAutomatismesFilters() {
    document.getElementById('searchAutomatismes').value = '';
    document.getElementById('categorieFilterAutomatismes').value = '';
    renderAutomatismes();
}

// Passer l'étape automatismes sans en sélectionner
function skipAutomatismesStep() {
    console.log('⏭️ Passage de l\'étape automatismes');
    // Passer directement à l'étape suivante
    completeStepAndNext(1);
}

// Continuer vers la sélection DNB après automatismes
function continueFromAutomatismes() {
    if (!appState.selectedAutomatismes || appState.selectedAutomatismes.length === 0) {
        // Demander confirmation pour passer sans automatismes
        if (!confirm('⚠️ Aucun automatisme sélectionné.\n\nVoulez-vous continuer sans exercice 1 (Automatismes) ?')) {
            return;
        }
        console.log('⏭️ Passage des automatismes - aucun exercice 1 créé');
        // Passer à l'étape suivante sans créer l'exercice 1
        completeStepAndNext(1);
        return;
    }

    const totalPoints = appState.selectedAutomatismes.length;

    if (totalPoints > 6) {
        alert('❌ Vous avez sélectionné trop d\'automatismes (max 6 points)');
        return;
    }

    // 🔒 Avertir si les exercices ne sont pas verrouillés
    if (!appState.exercisesLocked) {
        const confirmContinue = confirm(
            '⚠️ ATTENTION : Les exercices ne sont pas verrouillés !\n\n' +
            'Si vous continuez sans verrouiller, les valeurs aléatoires pourraient changer lors de la correction.\n\n' +
            '🔒 Cliquez sur "Annuler" pour verrouiller d\'abord.\n' +
            '➡️ Cliquez sur "OK" pour continuer quand même.'
        );
        if (!confirmContinue) {
            return;
        }
    }

    console.log('🔄 Génération des questions pour les automatismes sélectionnés...');

    // Créer l'exercice 1 directement (génération locale via notre code)
    createExercise1FromAutomatismes();

    console.log('✅ Exercice 1 créé avec génération locale');

    // Passer à l'étape suivante du workflow
    completeStepAndNext(1);
}

// Créer l'exercice 1 (Automatismes) à partir des automatismes sélectionnés
function createExercise1FromAutomatismes() {
    const selected = appState.selectedAutomatismes || [];
    const nbQuestions = selected.length;

    console.log('🔧🔧🔧 createExercise1FromAutomatismes APPELÉE 🔧🔧🔧');
    console.log('📊 Automatismes sélectionnés:', selected);
    console.log('📦 parsedAutomatismes:', appState.parsedAutomatismes);

    // 🎲 Réinitialiser le seed pour reproduire les mêmes valeurs aléatoires
    if (appState.exerciseSeed && window.mathaleaUtils) {
        window.mathaleaUtils.setSeed(appState.exerciseSeed);
        console.log('🎲 Seed réinitialisé:', appState.exerciseSeed);
    }

    // Répartition automatique des 6 points
    const pointsPerQuestion = distributePoints(6, nbQuestions);
    
    console.log(`📝 Création Exercice 1: ${nbQuestions} questions, répartition: [${pointsPerQuestion.join(', ')}]`);
    
    // Construire les questions de l'exercice 1
    const questions = [];
    selected.forEach((autoId, index) => {
        const autoData = appState.automatismesData[autoId];
        
        if (!autoData) {
            console.warn(`⚠️ Automatisme ${autoId} introuvable`);
            return;
        }
        
        // Génération avec nos générateurs locaux (PRODUCTION)
        let statement, answer;
        
        if (typeof window.genererAutomatisme === 'function') {
            const generated = window.genererAutomatisme(autoId);
            if (generated !== null) {
                statement = generated.question;
                answer = generated.correction;
                console.log(`  ✅ ${autoId} généré localement`);
            } else {
                // Fallback : utiliser le titre
                statement = `<p><strong>${autoData.titre}</strong></p>`;
                answer = `<p><em>Compétence à évaluer : ${autoData.titre}</em></p>`;
                console.warn(`  ⚠️ ${autoId} : pas de générateur`);
            }
        } else {
            console.warn('⚠️ genererAutomatisme non disponible');
            statement = `<p><strong>${autoData.titre}</strong></p>`;
            answer = `<p><em>Compétence à évaluer : ${autoData.titre}</em></p>`;
        }
        
        questions.push({
            id: `q${index + 1}`,
            title: `Question ${index + 1}`,
            points: pointsPerQuestion[index],
            statement: statement,
            answer: answer,
            competences: [], // Pas de compétences par défaut, elles seront ajoutées via le barème
            metadata: {
                autoId: autoId,
                categorie: autoData.categorie,
                titre: autoData.titre,
                uuid: autoData.uuid,
                url: autoData.url
            }
        });
    });
    
    // Remplacer l'exercice 1 dans exercisesData
    exercisesData[1] = {
        title: "📝 Exercice 1 - Automatismes",
        totalPoints: 6,
        questions: questions,
        isAutomatismes: true
    };
    
    console.log('✅ Exercice 1 créé:', exercisesData[1]);
    console.log(`✅ ${questions.length} questions créées pour Ex1`);
    questions.forEach((q, i) => {
        console.log(`  Q${i+1}: ${q.points}pts - ${q.metadata.titre}`);
    });
}

// Fonction pour distribuer les points de manière équitable
function distributePoints(totalPoints, nbQuestions) {
    if (nbQuestions === 0) return [];
    
    const basePoints = Math.floor(totalPoints / nbQuestions);
    const remainder = totalPoints - (basePoints * nbQuestions);
    
    const distribution = new Array(nbQuestions).fill(basePoints);
    
    // Distribuer le reste point par point sur les premières questions
    for (let i = 0; i < remainder; i++) {
        distribution[i]++;
    }
    
    return distribution;
}

// === FONCTIONS POUR LA SÉLECTION DNB ===

// Initialiser les données DNB
function initDNBData() {
    console.log('🚀 initDNBData appelée');
    console.log('📦 dictionnaireDNB défini?', typeof dictionnaireDNB !== 'undefined');

    if (typeof dictionnaireDNB !== 'undefined') {
        appState.dnbData = dictionnaireDNB;
        console.log(`✅ ${Object.keys(appState.dnbData).length} exercices DNB chargés`);

        // Préparer les filtres (mais ne pas render encore, la page n'est pas active)
        populateFilters();
        // renderExercises() sera appelé automatiquement quand l'utilisateur navigera vers la page DNB
    } else {
        console.error('❌ dictionnaireDNB non chargé');
    }
}

// Remplir les filtres
function populateFilters() {
    const years = new Set();
    const themes = new Set();
    
    Object.values(appState.dnbData).forEach(ex => {
        years.add(ex.annee);
        if (ex.tags && ex.tags.length > 0) {
            ex.tags.forEach(tag => themes.add(tag));
        }
    });

    const yearSelect = document.getElementById('filterYear');
    Array.from(years).sort().reverse().forEach(year => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    });

    const themeSelect = document.getElementById('filterTheme');
    Array.from(themes).sort().forEach(theme => {
        const option = document.createElement('option');
        option.value = theme;
        option.textContent = theme;
        themeSelect.appendChild(option);
    });
}

// Filtrer et afficher les exercices
// Fonction pour retirer les accents (comme MathALÉA)
function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Fonction de recherche avancée (inspirée de MathALÉA)
function advancedSearch(input, data) {
    if (!input || input.length === 0) return Object.entries(data);
    
    // Parser l'input : séparer les mots et identifier les opérateurs + (OU)
    const words = [];
    const tempWords = input.trim().split(/\s+/);
    
    for (const w of tempWords) {
        if (w.includes('+')) {
            const parts = w.split('+');
            const first = parts.shift();
            if (first) words.push({ word: first, connector: 'ET' });
            for (const p of parts) {
                words.push({ word: p, connector: 'OU' });
            }
        } else {
            words.push({ word: w, connector: 'ET' });
        }
    }
    
    // Fonction pour tester si un exercice matche un mot
    function matchesWord(word, id, ex) {
        const wordNoAccent = removeAccents(word.toLowerCase());
        
        // Match ID
        if (removeAccents(id.toLowerCase()).includes(wordNoAccent)) return true;
        
        // Match année
        if (ex.annee.toString().includes(wordNoAccent)) return true;
        
        // Match lieu
        if (removeAccents(ex.lieu.toLowerCase()).includes(wordNoAccent)) return true;
        
        // Match mois
        if (ex.mois && removeAccents(ex.mois.toLowerCase()).includes(wordNoAccent)) return true;
        
        // Match tags
        if (ex.tags && ex.tags.some(tag => 
            removeAccents(tag.toLowerCase()).includes(wordNoAccent)
        )) return true;
        
        return false;
    }
    
    // Appliquer la logique ET/OU
    return Object.entries(data).filter(([id, ex]) => {
        let currentGroupMatches = [];
        let allGroups = [];
        
        for (let i = 0; i < words.length; i++) {
            const { word, connector } = words[i];
            const matches = matchesWord(word, id, ex);
            
            if (i === 0 || connector === 'OU') {
                currentGroupMatches.push(matches);
            } else {
                // Connector ET : on finalise le groupe précédent
                allGroups.push(currentGroupMatches.some(m => m));
                currentGroupMatches = [matches];
            }
        }
        
        // Finaliser le dernier groupe
        allGroups.push(currentGroupMatches.some(m => m));
        
        // Tous les groupes ET doivent être vrais
        return allGroups.every(g => g);
    });
}

// Effacer le champ de recherche
function clearSearch() {
    document.getElementById('filterSearch').value = '';
    applyFilters();
}

// Réinitialiser tous les filtres
function clearAllFilters() {
    document.getElementById('filterYear').value = '';
    document.getElementById('filterTheme').value = '';
    document.getElementById('filterSearch').value = '';
    applyFilters();
}

function applyFilters() {
    renderExercises();
}

function renderExercises() {
    // Protection: ne render que si la page DNB est active
    const dnbPage = document.getElementById('dnbSelectionPage');
    if (!dnbPage || !dnbPage.classList.contains('active')) {
        console.log('⚠️ renderExercises() ignoré - page DNB non active');
        return;
    }

    console.log('🔍 renderExercises appelée');
    const grid = document.getElementById('exercisesGrid');

    const yearFilter = document.getElementById('filterYear').value;
    const themeFilter = document.getElementById('filterTheme').value;
    const searchFilter = document.getElementById('filterSearch').value;

    // Gérer l'affichage du bouton "×" dans le champ de recherche
    const btnClearSearch = document.getElementById('btnClearSearch');
    if (searchFilter && searchFilter.trim().length > 0) {
        btnClearSearch.style.display = 'block';
    } else {
        btnClearSearch.style.display = 'none';
    }

    let filtered = Object.entries(appState.dnbData);
    const totalExercises = filtered.length;

    // Filtre par recherche avancée (si présent)
    if (searchFilter && searchFilter.trim().length > 0) {
        filtered = advancedSearch(searchFilter, appState.dnbData);
    }

    // Filtre par année
    if (yearFilter) {
        filtered = filtered.filter(([id, ex]) => ex.annee == yearFilter);
    }

    // Filtre par thème
    if (themeFilter) {
        filtered = filtered.filter(([id, ex]) => ex.tags && ex.tags.includes(themeFilter));
    }

    // Détecter si des filtres sont actifs
    const hasActiveFilters = yearFilter || themeFilter || (searchFilter && searchFilter.trim().length > 0);

    // Afficher/masquer le bouton "Réinitialiser les filtres"
    const btnClearFilters = document.getElementById('btnClearFilters');
    if (hasActiveFilters) {
        btnClearFilters.style.display = 'block';
    } else {
        btnClearFilters.style.display = 'none';
    }

    // Afficher/masquer l'indicateur de filtres actifs
    const activeFiltersIndicator = document.getElementById('activeFiltersIndicator');
    const activeFiltersList = document.getElementById('activeFiltersList');
    if (hasActiveFilters) {
        const activeFiltersText = [];
        if (yearFilter) activeFiltersText.push(`Année: ${yearFilter}`);
        if (themeFilter) activeFiltersText.push(`Thème: ${themeFilter}`);
        if (searchFilter && searchFilter.trim().length > 0) activeFiltersText.push(`Recherche: "${searchFilter}"`);

        activeFiltersList.textContent = activeFiltersText.join(' | ');
        activeFiltersIndicator.style.display = 'block';
    } else {
        activeFiltersIndicator.style.display = 'none';
    }

    // TRI : Plus récents en premier (année décroissante, puis mois)
    filtered.sort((a, b) => {
        const [idA, dataA] = a;
        const [idB, dataB] = b;

        // Priorité 1 : Année (décroissante)
        if (dataA.annee !== dataB.annee) {
            return dataB.annee - dataA.annee;
        }

        // Priorité 2 : Mois (décroissant si possible)
        const moisOrdre = {
            'Janvier': 1, 'Février': 2, 'Mars': 3, 'Avril': 4,
            'Mai': 5, 'Juin': 6, 'Juillet': 7, 'Août': 8,
            'Septembre': 9, 'Octobre': 10, 'Novembre': 11, 'Décembre': 12
        };
        const moisA = moisOrdre[dataA.mois] || 0;
        const moisB = moisOrdre[dataB.mois] || 0;
        if (moisA !== moisB) {
            return moisB - moisA;
        }

        // Priorité 3 : Lieu (alphabétique)
        return (dataA.lieu || '').localeCompare(dataB.lieu || '');
    });

    // Afficher le compteur de résultats de manière plus claire
    const filterResultsEl = document.getElementById('filterResults');
    if (hasActiveFilters) {
        filterResultsEl.innerHTML = `
            <span style="color: #856404; font-weight: 600;">
                📊 ${filtered.length} exercice(s) trouvé(s)
            </span>
            <span style="color: #999; font-weight: normal; margin-left: 8px;">
                (sur ${totalExercises} au total)
            </span>
        `;
    } else {
        filterResultsEl.innerHTML = `
            <span style="color: #28a745; font-weight: 600;">
                📚 ${filtered.length} exercice(s) disponible(s)
            </span>
        `;
    }

    console.log(`📊 Affichage de ${filtered.length} exercices`);

    grid.innerHTML = '';

    filtered.forEach(([id, data]) => {
        const card = document.createElement('div');
        card.className = 'exercise-card';
        if (appState.selectedExercises.includes(id)) {
            card.classList.add('selected');
        }

        // Clic sur la carte pour sélectionner
        card.addEventListener('click', (e) => {
            // Ne pas sélectionner si on clique sur le bouton Aperçu
            if (e.target.closest('.btn-preview')) return;
            toggleExercise(id);
        });

        // Filtrer les tags valides (non vides)
        const validTags = data.tags ? data.tags.filter(tag => tag && tag.trim().length > 0) : [];

        card.innerHTML = `
            <div class="exercise-card-header">
                <div class="exercise-title">${id}</div>
                <input type="checkbox" ${appState.selectedExercises.includes(id) ? 'checked' : ''}
                       style="pointer-events: none;">
            </div>
            <div class="exercise-meta">
                <span class="exercise-badge">📅 ${data.annee}</span>
                <span class="exercise-badge">📍 ${data.lieu}</span>
                ${data.mois ? `<span class="exercise-badge">📆 ${data.mois}</span>` : ''}
            </div>
            ${validTags.length > 0 ? `
                <div style="margin-top: 10px; display: flex; flex-wrap: wrap; gap: 6px;">
                    ${validTags.map(tag => `
                        <span style="
                            display: inline-block;
                            padding: 4px 10px;
                            background: #e3f2fd;
                            color: #1565c0;
                            border-radius: 12px;
                            font-size: 0.75em;
                            font-weight: 600;
                            line-height: 1.2;
                        ">${tag}</span>
                    `).join('')}
                </div>
            ` : ''}
            <div class="exercise-actions">
                <button class="btn-preview" onclick="event.stopPropagation(); previewExercise('${id}')">
                    👁️ Aperçu
                </button>
            </div>
        `;

        grid.appendChild(card);
    });
}

// Sélectionner/désélectionner un exercice
function toggleExercise(exerciseId) {
    const index = appState.selectedExercises.indexOf(exerciseId);
    if (index > -1) {
        appState.selectedExercises.splice(index, 1);
        console.log(`➖ Exercice retiré: ${exerciseId}`);
    } else {
        appState.selectedExercises.push(exerciseId);
        console.log(`➕ Exercice ajouté: ${exerciseId}`);
    }
    console.log(`📋 Total sélectionné: ${appState.selectedExercises.length}`, appState.selectedExercises);
    updateSelectionDisplay();
    renderExercises();
}

function updateSelectionDisplay() {
    const count = appState.selectedExercises.length;
    const countEl = document.getElementById('selectionCount');
    const btnContinue = document.getElementById('btnContinue');

    console.log(`📊 updateSelectionDisplay: ${count} exercices sélectionnés`);

    countEl.textContent = `${count} exercice${count > 1 ? 's' : ''} sélectionné${count > 1 ? 's' : ''}`;
    btnContinue.disabled = count === 0;

    console.log(`🔘 Bouton btnContinue.disabled = ${btnContinue.disabled}`);
    
    // Mettre à jour le texte du bouton avec le nombre en couleur
    if (count > 0) {
        btnContinue.innerHTML = `Continuer avec les <span style="color: #ff6b35; font-weight: bold;">${count}</span> exercice${count > 1 ? 's' : ''} sélectionné${count > 1 ? 's' : ''} →`;
    } else {
        btnContinue.innerHTML = 'Continuer avec les exercices sélectionnés →';
    }
}

// Prévisualiser un exercice
async function previewExercise(exerciseId) {
    const data = appState.dnbData[exerciseId];
    const year = data.annee;
    const texPath = `dnb/${year}/tex/${exerciseId}.tex`;
    const pngUrl = `https://coopmaths.fr/alea/static/dnb/${year}/tex/png/${exerciseId}.png`;

    try {
        const latexContent = await fetch(texPath).then(r => r.text());
        const modal = document.getElementById('previewModal');
        const body = document.getElementById('previewBody');
        
        body.innerHTML = `
            <h2>${exerciseId}</h2>
            <p><strong>Année:</strong> ${data.annee} | <strong>Lieu:</strong> ${data.lieu}</p>
            <img src="${pngUrl}" class="preview-image" alt="Aperçu exercice">
            <div class="preview-questions">
                <h3>Questions détectées:</h3>
                <pre style="background: #f5f5f5; padding: 15px; border-radius: 8px; overflow-x: auto;">${latexContent.substring(0, 500)}...</pre>
            </div>
        `;
        
        modal.classList.add('active');
    } catch (error) {
        alert('❌ Impossible de charger l\'aperçu. Serveur local requis (python3 server.py)');
    }
}

function closePreview() {
    document.getElementById('previewModal').classList.remove('active');
}

// Continuer vers la configuration
async function continueToSetup() {
    console.log('🎯 continueToSetup() appelé');
    console.log('📋 selectedExercises:', appState.selectedExercises);

    if (appState.selectedExercises.length === 0) {
        alert('⚠️ Veuillez sélectionner au moins un exercice');
        return;
    }

    console.log(`🔄 Chargement de ${appState.selectedExercises.length} exercices...`);
    
    // Charger et parser tous les exercices sélectionnés
    try {
        await loadAndParseSelectedExercises();
        
        console.log(`✅ ${appState.selectedExercises.length} exercices chargés`);
        
        // Créer exercisesData avec Ex1 (automatismes) + Ex2-5 (DNB)
        createFinalExercisesData();
        
        // Initialiser le barème pour tous les exercices (1-5)
        appState.baremeConfig.exercises = {};
        appState.baremeConfig.totalMax = 20; // DNB 2025 est sur 20 points
        
        // Ex1 (Automatismes) : totalPoints = nombre de questions, 1 pt/question par défaut
        if (exercisesData[1]) {
            const nbQuestions = exercisesData[1].questions.length;
            const questionPoints = {};
            for (let i = 0; i < nbQuestions; i++) {
                questionPoints[`q${i}`] = 1; // 1 point par question par défaut
            }

            appState.baremeConfig.exercises['1'] = {
                totalPoints: nbQuestions, // Total = nombre de questions
                selectedCompetences: [], // Pas de pré-sélection, l'utilisateur choisit par question
                pointsPerCompetence: {},
                questionCompetences: {}, // q{index}: ['Calculer', ...]
                questionPoints: questionPoints, // Points par question
                isFixed: false // Modifiable dans le barème
            };
        }

        // Ex2-5 (DNB) : totalPoints = nombre de questions, 1 pt/question par défaut
        console.log('🔧 Initialisation du barème pour les exercices DNB...');
        appState.selectedExercises.forEach((exerciseId, index) => {
            const exerciseNum = index + 2; // Ex2, Ex3, Ex4, Ex5
            const exerciseData = exercisesData[exerciseNum];
            const nbQuestions = exerciseData ? exerciseData.questions.length : 0;

            console.log(`📊 Ex${exerciseNum} (${exerciseId}): ${nbQuestions} questions`);
            console.log('  - exerciseData:', exerciseData);

            const questionPoints = {};
            for (let i = 0; i < nbQuestions; i++) {
                questionPoints[`q${i}`] = 1; // 1 point par question par défaut
            }

            appState.baremeConfig.exercises[exerciseNum.toString()] = {
                totalPoints: nbQuestions, // Total = nombre de questions
                selectedCompetences: [], // Pas de pré-sélection, l'utilisateur choisit par question
                pointsPerCompetence: {},
                questionPoints: questionPoints, // Points par question
                dnbId: exerciseId
            };

            console.log(`  ✅ Barème Ex${exerciseNum}: ${nbQuestions} pts (${nbQuestions} questions × 1 pt)`);
        });
        
        // Masquer la sélection, afficher la page de barème
        console.log('🔄 Transition vers le barème...');

        // Rendre la page de conception du barème
        console.log('🎨 Appel de renderBaremeDesignPage()...');
        renderBaremeDesignPage();
        console.log('✅ continueToSetup() terminé avec succès');

        // Passer à l'étape suivante du workflow
        completeStepAndNext(2);

    } catch (error) {
        console.error('❌ Erreur lors du chargement des exercices:', error);
        alert('❌ Impossible de charger les exercices. Assurez-vous que le serveur tourne.');
    }
}

// Créer exercisesData final avec Ex1 + Ex2-5
function createFinalExercisesData() {
    // Ex1 est déjà dans exercisesData (créé par createExercise1FromAutomatismes)

    console.log('🔧 createFinalExercisesData - Début');
    console.log('📋 selectedExercises:', appState.selectedExercises);
    console.log('📊 parsedExercises:', appState.parsedExercises);

    // Ajouter les exercices DNB comme Ex2, Ex3, Ex4, Ex5
    appState.selectedExercises.forEach((exerciseId, index) => {
        const exerciseNum = index + 2; // Ex2, Ex3, Ex4, Ex5
        const parsedExercise = appState.parsedExercises[exerciseId];
        const dnbData = appState.dnbData[exerciseId];

        console.log(`📝 Exercice ${exerciseNum} (${exerciseId}):`);
        console.log('  - parsedExercise:', parsedExercise);
        console.log('  - dnbData:', dnbData);
        console.log('  - questions:', parsedExercise?.questions?.length || 0);

        if (parsedExercise && dnbData) {
            exercisesData[exerciseNum] = {
                title: `Exercice ${exerciseNum} - ${exerciseId}`,
                totalPoints: 3.5, // Sera remplacé par la config du barème
                questions: parsedExercise.questions.map((qItem, qIndex) => {
                    // Gérer les objets (nouvelle structure) et strings (rétrocompatibilité)
                    const isObject = typeof qItem === 'object' && qItem !== null;
                    const statement = isObject ? qItem.content : qItem;
                    const isSubQuestion = isObject && qItem.isSubQuestion;

                    // Déterminer le titre de la question
                    let questionTitle;
                    if (isSubQuestion) {
                        questionTitle = `Question ${qItem.parentNumber}.${qItem.subLetter}`;
                    } else if (isObject && qItem.number) {
                        questionTitle = `Question ${qItem.number}`;
                    } else {
                        questionTitle = `Question ${qIndex + 1}`;
                    }

                    // Récupérer la correction correspondante
                    const corrItem = parsedExercise.corrections[qIndex];
                    const answer = corrItem ? (typeof corrItem === 'object' ? corrItem.content : corrItem) : "Correction à venir";

                    return {
                        id: `q${qIndex + 1}`,
                        title: questionTitle,
                        points: 1,
                        statement: statement,
                        answer: answer,
                        competences: [] // Pas de compétences par défaut, elles seront ajoutées via le barème
                    };
                }),
                dnbId: exerciseId,
                metadata: {
                    annee: dnbData.annee,
                    lieu: dnbData.lieu
                }
            };
            console.log(`  ✅ Exercice ${exerciseNum} créé avec ${exercisesData[exerciseNum].questions.length} questions`);
        } else {
            console.warn(`  ⚠️ Exercice ${exerciseNum} NON créé (parsedExercise=${!!parsedExercise}, dnbData=${!!dnbData})`);
        }
    });

    console.log('✅ exercisesData final créé:', exercisesData);
}

// Regénérer exercisesData avec les compétences configurées dans le barème
function applyBaremeCompetencesToExercisesData() {
    console.log('🔄 Application des compétences du barème...');
    
    // Pour chaque exercice dans exercisesData
    Object.keys(exercisesData).forEach(exNum => {
        const exercise = exercisesData[exNum];
        const baremeData = appState.baremeConfig.exercises[exNum];
        
        if (!baremeData || !baremeData.questionCompetences) return;
        
        // Pour chaque question
        exercise.questions.forEach((question, qIndex) => {
            const qKey = `q${qIndex}`;
            const selectedCompNames = baremeData.questionCompetences[qKey] || [];

            if (selectedCompNames.length === 0) return;

            // Récupérer les points de cette question depuis le barème
            const questionPoints = baremeData.questionPoints && baremeData.questionPoints[qKey]
                ? baremeData.questionPoints[qKey]
                : question.points;

            // Calculer les points par compétence (divisé équitablement entre les compétences)
            const pointsPerCompetence = questionPoints / selectedCompNames.length;

            // Remplacer les compétences par celles sélectionnées dans le barème
            question.competences = selectedCompNames.map(compName => {
                const defaultComp = defaultCompetences.find(dc => dc.name === compName);

                // Récupérer les détails personnalisés depuis le barème
                // Priorité 1 : détails au niveau question (questionCompetenceDetails)
                // Priorité 2 : détails au niveau exercice (competenceDetails)
                // Priorité 3 : valeurs par défaut
                const questionDetails = baremeData.questionCompetenceDetails &&
                                      baremeData.questionCompetenceDetails[qKey] &&
                                      baremeData.questionCompetenceDetails[qKey][compName];

                const exerciseDetails = baremeData.competenceDetails &&
                                       baremeData.competenceDetails[compName];

                // Utiliser questionDetails en priorité, sinon exerciseDetails, sinon défaut
                const customDetails = questionDetails || exerciseDetails;

                return {
                    name: compName,
                    color: defaultComp.color,
                    description: customDetails?.description || defaultComp.description,
                    tooltip: customDetails?.tooltip || defaultComp.description,
                    points: customDetails?.points || pointsPerCompetence,
                    increment: customDetails?.increment || 0.5
                };
            });
        });
    });
    
    console.log('✅ Compétences du barème appliquées à exercisesData');
}

// === FONCTIONS POUR LA PAGE DE CONCEPTION DU BARÈME ===

// Variable pour suivre l'exercice actuellement affiché
let currentBaremeExerciseIndex = 0;

/**
 * Initialise la configuration du barème pour les exercices sélectionnés
 */
function initBaremeConfig() {
    console.log('🎯 Initialisation de la configuration du barème');

    // Initialiser baremeConfig si nécessaire
    if (!appState.baremeConfig) {
        appState.baremeConfig = {
            mode: 'b',
            exercises: {}
        };
    }

    // Déterminer la source d'exercices
    const source = appState.evaluationMetadata?.source || 'automatismes';

    if (source === 'mathalea') {
        // Initialiser pour les exercices MathALÉA
        appState.exercises.forEach((exercise, index) => {
            const exerciseNum = (index + 1).toString();

            if (!appState.baremeConfig.exercises[exerciseNum]) {
                appState.baremeConfig.exercises[exerciseNum] = {
                    source: 'mathalea',
                    title: exercise.title,
                    totalPoints: 5, // Valeur par défaut
                    selectedCompetences: [],
                    questionCompetences: {},
                    questionCompetencePoints: {},
                    questionPoints: {},
                    competenceDetails: {},
                    questionCompetenceDetails: {}
                };
            }
        });

        console.log('✅ Barème configuré pour MathALÉA:', appState.baremeConfig);
    } else {
        // Initialiser pour Automatismes/DNB (comportement existant)
        // Le code existant devrait gérer cela
        console.log('✅ Barème configuré pour', source);
    }

    // Afficher la page du barème
    renderBaremeDesignPage();
}

function renderBaremeDesignPage() {
    console.log('🎨 renderBaremeDesignPage appelée');
    console.log('📋 Exercices sélectionnés:', appState.selectedExercises);
    console.log('📊 Config barème:', appState.baremeConfig);

    // Générer les onglets des exercices
    renderBaremeExerciseTabs();

    // Afficher le premier exercice par défaut
    showBaremeExercise(0);

    calculateTotalPoints();
    updateCompetencesSummary();

    // Valider tous les exercices en Mode A
    if (appState.baremeConfig.mode === 'a') {
        setTimeout(() => {
            appState.selectedExercises.forEach((exerciseId) => {
                validateExerciseCompetencesTotal(exerciseId);
            });
        }, 100);
    }
}

// === Helpers compétences (barème) ===
function renderAutomatismeQuestionCompetences(qIndex) {
    const container = document.getElementById(`qcomp_${qIndex}`);
    if (!container) return;
    const baremeData = appState.baremeConfig.exercises['1'];
    const qKey = `q${qIndex}`;
    const selected = baremeData.questionCompetences[qKey] || [];
    container.innerHTML = defaultCompetences.map(comp => {
        const sel = selected.includes(comp.name);
        const bg = sel ? comp.color : 'white';
        const fg = sel ? 'white' : comp.color;
        return `
            <div style="position: relative; display: inline-flex; margin: 4px;">
                <button type="button"
                        onclick="toggleCompetenceForAutomatismeQuestion(${qIndex}, '${comp.name}')"
                        style="padding:6px 12px; border:2px solid ${comp.color}; border-radius:18px; cursor:pointer; font-weight:600; background:${bg}; color:${fg};">
                    ${comp.icon} ${comp.name}
                </button>
                ${sel ? `
                    <button type="button"
                            onclick="event.stopPropagation(); openBaremeQuestionCompetenceModal('1', ${qIndex}, '${comp.name}')"
                            style="position: absolute; top: -6px; right: -6px; width: 20px; height: 20px; border-radius: 50%; background: white; border: 2px solid ${comp.color}; cursor: pointer; font-size: 10px; display: flex; align-items: center; justify-content: center; padding: 0;"
                            title="Éditer les détails de cette compétence">
                        ✏️
                    </button>
                ` : ''}
            </div>`;
    }).join('');
}

function toggleCompetenceForAutomatismeQuestion(qIndex, compName) {
    const baremeData = appState.baremeConfig.exercises['1'];
    if (!baremeData.questionCompetences) baremeData.questionCompetences = {};
    const qKey = `q${qIndex}`;
    if (!baremeData.questionCompetences[qKey]) baremeData.questionCompetences[qKey] = [];
    const list = baremeData.questionCompetences[qKey];
    const i = list.indexOf(compName);
    if (i >= 0) list.splice(i, 1); else list.push(compName);
    renderAutomatismeQuestionCompetences(qIndex);
    updateCompetencesSummary();
    saveData();
}

// Pour les questions DNB (Ex2-5)
function renderDNBQuestionCompetences(exerciseNum, qIndex) {
    const container = document.getElementById(`qcomp_dnb_${exerciseNum}_${qIndex}`);
    if (!container) return;
    const baremeData = appState.baremeConfig.exercises[exerciseNum];
    if (!baremeData.questionCompetences) baremeData.questionCompetences = {};
    const qKey = `q${qIndex}`;
    const selected = baremeData.questionCompetences[qKey] || [];

    // Initialiser les points des compétences si nécessaire
    if (!baremeData.questionCompetencePoints) baremeData.questionCompetencePoints = {};
    if (!baremeData.questionCompetencePoints[qKey]) baremeData.questionCompetencePoints[qKey] = {};

    // Récupérer les points de la question
    const questionPoints = baremeData.questionPoints && baremeData.questionPoints[qKey]
        ? baremeData.questionPoints[qKey]
        : 1;

    container.innerHTML = defaultCompetences.map(comp => {
        const sel = selected.includes(comp.name);
        const bg = sel ? comp.color : 'white';
        const fg = sel ? 'white' : comp.color;

        // Points de cette compétence (répartis équitablement par défaut)
        let compPoints = 0;
        if (sel) {
            if (!baremeData.questionCompetencePoints[qKey][comp.name]) {
                // Répartition équitable par défaut
                compPoints = Math.round((questionPoints / selected.length) * 10) / 10;
                baremeData.questionCompetencePoints[qKey][comp.name] = compPoints;
            } else {
                compPoints = baremeData.questionCompetencePoints[qKey][comp.name];
            }
        }

        return `
            <div style="position: relative; display: inline-flex; flex-direction: column; margin: 4px; background: ${sel ? 'rgba(255,255,255,0.1)' : 'transparent'}; padding: ${sel ? '8px' : '0'}; border-radius: 12px;">
                <button type="button"
                        onclick="toggleCompetenceForDNBQuestion('${exerciseNum}', ${qIndex}, '${comp.name}')"
                        style="padding:6px 12px; border:2px solid ${comp.color}; border-radius:18px; cursor:pointer; font-weight:600; background:${bg}; color:${fg};">
                    ${comp.icon} ${comp.name}
                </button>
                ${sel ? `
                    <div style="display: flex; align-items: center; justify-content: center; gap: 6px; margin-top: 6px;">
                        <button type="button"
                                onclick="adjustCompetencePoints('${exerciseNum}', ${qIndex}, '${comp.name}', -0.5)"
                                style="width: 24px; height: 24px; border-radius: 50%; background: #dc3545; color: white; border: none; cursor: pointer; font-weight: bold; font-size: 16px; display: flex; align-items: center; justify-content: center;"
                                title="Diminuer de 0.5 pt">
                            −
                        </button>
                        <span style="font-weight: bold; color: ${comp.color}; min-width: 40px; text-align: center; font-size: 14px;">
                            ${compPoints} pt
                        </span>
                        <button type="button"
                                onclick="adjustCompetencePoints('${exerciseNum}', ${qIndex}, '${comp.name}', 0.5)"
                                style="width: 24px; height: 24px; border-radius: 50%; background: #28a745; color: white; border: none; cursor: pointer; font-weight: bold; font-size: 16px; display: flex; align-items: center; justify-content: center;"
                                title="Augmenter de 0.5 pt">
                            +
                        </button>
                    </div>
                ` : ''}
            </div>`;
    }).join('');
}

function toggleCompetenceForDNBQuestion(exerciseNum, qIndex, compName) {
    const baremeData = appState.baremeConfig.exercises[exerciseNum];
    if (!baremeData.questionCompetences) baremeData.questionCompetences = {};
    const qKey = `q${qIndex}`;
    if (!baremeData.questionCompetences[qKey]) baremeData.questionCompetences[qKey] = [];
    const list = baremeData.questionCompetences[qKey];
    const i = list.indexOf(compName);

    // Ajouter ou retirer la compétence
    if (i >= 0) {
        list.splice(i, 1);
        // Supprimer les points de cette compétence
        if (baremeData.questionCompetencePoints && baremeData.questionCompetencePoints[qKey]) {
            delete baremeData.questionCompetencePoints[qKey][compName];
        }
    } else {
        list.push(compName);
    }

    // Redistribuer les points entre les compétences
    redistributeQuestionCompetencePoints(exerciseNum, qIndex);

    updateCompetencesSummary();
    saveData();
}

// Fonction pour ajuster les points d'une compétence avec les boutons +/-
function adjustCompetencePoints(exerciseNum, questionIndex, compName, delta) {
    const baremeData = appState.baremeConfig.exercises[exerciseNum];
    const qKey = `q${questionIndex}`;

    if (!baremeData.questionCompetencePoints) baremeData.questionCompetencePoints = {};
    if (!baremeData.questionCompetencePoints[qKey]) baremeData.questionCompetencePoints[qKey] = {};

    // Récupérer les points actuels
    let currentPoints = baremeData.questionCompetencePoints[qKey][compName] || 0;
    let newPoints = Math.round((currentPoints + delta) * 10) / 10;

    // Ne pas descendre en dessous de 0
    if (newPoints < 0) newPoints = 0;

    // Mettre à jour les points
    baremeData.questionCompetencePoints[qKey][compName] = newPoints;

    // Vérifier la cohérence : la somme des points des compétences ne doit pas dépasser les points de la question
    const selectedCompetences = baremeData.questionCompetences[qKey] || [];
    let totalCompPoints = 0;
    selectedCompetences.forEach(comp => {
        totalCompPoints += baremeData.questionCompetencePoints[qKey][comp] || 0;
    });

    const questionPoints = baremeData.questionPoints && baremeData.questionPoints[qKey]
        ? baremeData.questionPoints[qKey]
        : 1;

    // Si le total dépasse, ajuster les autres compétences proportionnellement
    if (totalCompPoints > questionPoints + 0.1) { // tolérance de 0.1
        console.warn(`⚠️ Total des compétences (${totalCompPoints}) dépasse les points de la question (${questionPoints})`);
        // On pourrait implémenter un ajustement automatique ici si nécessaire
    }

    // Re-render les compétences
    renderDNBQuestionCompetences(exerciseNum, questionIndex);
    updateCompetencesSummary();
    saveData();

    console.log(`✅ Compétence ${compName}: ${newPoints} pts (delta: ${delta})`);
}

function renderBaremeExerciseTabs() {
    const tabsContainer = document.getElementById('baremeExerciseTabs');
    if (!tabsContainer) return;
    
    tabsContainer.innerHTML = '';
    const defaultIcons = ['📝', '📐', '🔢', '💻', '📊', '🎯', '📈', '🧮'];
    
    // Récupérer tous les exercices (1 à 5)
    const allExerciseNums = Object.keys(appState.baremeConfig.exercises).sort((a, b) => parseInt(a) - parseInt(b));
    
    allExerciseNums.forEach((exerciseNum, index) => {
        const baremeData = appState.baremeConfig.exercises[exerciseNum];
        const icon = defaultIcons[index] || '📝';
        const isActive = index === currentBaremeExerciseIndex;
        
        // Titre différent pour Ex1 (Automatismes)
        const exTitle = exerciseNum === '1' ? 'Ex1 (Automatismes)' : `Exercice ${exerciseNum}`;

        // Vérifier la cohérence des points
        const consistency = checkExercisePointsConsistency(exerciseNum);
        const warningBadge = !consistency.isConsistent ?
            `<span title="⚠️ Incohérence : Somme questions = ${consistency.sumQuestions} pts (total exercice = ${consistency.totalExercise} pts)"
                   style="margin-left: 4px; cursor: help; font-size: 1.1em;">⚠️</span>` : '';

        const tabBtn = document.createElement('button');
        tabBtn.className = `bareme-exercise-tab ${isActive ? 'active' : ''}`;
        tabBtn.onclick = () => showBaremeExercise(index);
        tabBtn.innerHTML = `
            <span>${icon}</span>
            <span>${exTitle}</span>
            <span style="margin-left: 8px; font-size: 0.85em; opacity: 0.8;">(${baremeData.totalPoints} pts)</span>
            ${warningBadge}
        `;
        tabBtn.style.cssText = `
            padding: 10px 16px;
            border: 2px solid ${isActive ? '#4285f4' : '#dee2e6'};
            background: ${isActive ? '#4285f4' : 'white'};
            color: ${isActive ? 'white' : '#495057'};
            border-radius: 8px;
            cursor: pointer;
            font-weight: ${isActive ? 'bold' : '500'};
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 6px;
        `;
        
        tabsContainer.appendChild(tabBtn);
    });
}

function showBaremeExercise(exerciseIndex) {
    currentBaremeExerciseIndex = exerciseIndex;

    // Récupérer tous les numéros d'exercices triés
    const allExerciseNums = Object.keys(appState.baremeConfig.exercises).sort((a, b) => parseInt(a) - parseInt(b));
    const exerciseNum = allExerciseNums[exerciseIndex];

    const baremeData = appState.baremeConfig.exercises[exerciseNum];

    // Déterminer le type d'exercice et afficher la bonne page
    if (exerciseNum === '1') {
        // Automatismes
        showBaremeExercise1Automatismes();
    } else if (baremeData.source === 'mathalea') {
        // MathALÉA
        showBaremeExerciseMathALEA(exerciseNum);
    } else {
        // DNB
        showBaremeExerciseDNB(exerciseNum);
    }
}

// Afficher Ex1 (Automatismes) dans la page barème
function showBaremeExercise1Automatismes() {
    const exerciseNum = '1';
    const baremeData = appState.baremeConfig.exercises[exerciseNum];
    const exerciseData = exercisesData[1];
    
    console.log('🎯 showBaremeExercise1Automatismes appelée');
    console.log('📦 exerciseData:', exerciseData);
    console.log('📋 Questions:', exerciseData?.questions);
    
    // Mettre à jour les onglets
    renderBaremeExerciseTabs();
    
    const contentContainer = document.getElementById('baremeExerciseContent');
    if (!contentContainer) {
        console.error('❌ contentContainer introuvable');
        return;
    }
    
    let html = `
        <div style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid #e9ecef;">
            <div style="display: flex; justify-content: space-between; align-items: start; gap: 20px; margin-bottom: 15px;">
                <div style="flex: 1;">
                    <h3 style="color: #2c3e50; margin-bottom: 10px;">
                        📝 Exercice 1 - Automatismes
                    </h3>
                    <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                        <span class="exercise-badge">🎯 ${appState.selectedAutomatismes.length} automatismes sélectionnés</span>
                        <span class="exercise-badge">📌 Total fixe : 6 points</span>
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: end; gap: 10px;">
                    <label style="font-weight: bold; color: #495057;">
                        Points total de l'exercice :
                    </label>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <input type="number" 
                               id="points_1" 
                               value="6" 
                               min="6" 
                               max="6" 
                               step="0.5"
                               disabled
                               style="padding: 8px 12px; font-size: 1.1em; width: 100px; border: 2px solid #dee2e6; border-radius: 6px; background: #f8f9fa;">
                        <span style="color: #666;">points (fixe)</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Compétences calculées automatiquement depuis les questions -->
        <div style="margin-bottom: 25px; padding: 15px; background: #e3f2fd; border-radius: 8px; border-left: 4px solid #2196F3;">
            <label style="display: block; font-weight: bold; margin-bottom: 12px; color: #1565C0;">
                📊 Compétences évaluées (calculées depuis les questions) :
            </label>
            <div id="competences_1" style="display: flex; flex-wrap: wrap; gap: 10px;">
                <!-- Contenu généré dynamiquement -->
            </div>
            <p style="margin: 8px 0 0 0; font-size: 12px; color: #666; font-style: italic;">
                💡 Les compétences se configurent question par question ci-dessous
            </p>
        </div>

        <!-- Questions séparées -->
        <div style="margin-top: 25px;">
            <h4 style="color: #2c3e50; margin-bottom: 15px;">📋 Questions de l'exercice :</h4>
            <div class="bareme-questions-grid">
    `;

    // Afficher les questions d'automatismes
    if (exerciseData && exerciseData.questions && exerciseData.questions.length > 0) {
        console.log(`✅ Affichage de ${exerciseData.questions.length} questions automatismes`);
        exerciseData.questions.forEach((question, qIndex) => {
            const qKey = `q${qIndex}`;
            if (!baremeData.questionCompetences[qKey]) {
                baremeData.questionCompetences[qKey] = []; // Pas de pré-sélection
            }
            html += `
                <div style="background: white; border: 2px solid #e9ecef; border-radius: 8px; padding: 20px; margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #e9ecef;">
                        <h5 style="color: #4285f4; margin: 0;">Question ${qIndex + 1}</h5>
                        <div style="font-weight: bold; color: #6c757d;">${question.points} pt${question.points > 1 ? 's' : ''}</div>
                    </div>
                    <div style="margin-bottom: 10px; padding: 8px 12px; background: #e3f2fd; border-radius: 6px;">
                        <strong style="font-size: 0.85em; color: #1565c0;">
                            ${question.metadata?.categorie === '3AutoN' ? '🔢 Nombres' : 
                              question.metadata?.categorie === '3AutoG' ? '📐 Géométrie' : 
                              question.metadata?.categorie === '3AutoP' ? '📊 Proportionnalité' : 
                              question.metadata?.categorie === '3AutoI' ? '💻 Informatique' : question.metadata?.categorie}
                            - ${question.metadata?.titre}
                        </strong>
                    </div>
                    <div style="margin-bottom: 15px; padding: 12px; background: #f8f9fa; border-radius: 6px;">
                        <strong style="display: block; margin-bottom: 8px; color: #495057;">Énoncé :</strong>
                        <div style="color: #2c3e50; line-height: 1.6; text-align: justify;" id="enonce_auto_${qIndex}"></div>
                    </div>
                    <div style="padding: 12px; background: #e8f5e9; border-radius: 6px;">
                        <strong style="display: block; margin-bottom: 8px; color: #2e7d32;">Réponse attendue :</strong>
                        <div style="color: #1b5e20; line-height: 1.6; text-align: justify;" id="correction_auto_${qIndex}"></div>
                    </div>
                    <div style="margin-top: 15px; padding-top: 12px; border-top: 1px dashed #e0e0e0;">
                        <label style="display:block; font-weight:600; margin-bottom:8px; color:#495057;">Compétences évaluées (question) :</label>
                        <div id="qcomp_${qIndex}" style="display:flex; flex-wrap:wrap; gap:8px;">
                            <!-- Généré dynamiquement -->
                        </div>
                    </div>
                </div>
            `;
        });
    } else {
        console.warn('⚠️ Pas de questions pour Ex1');
        html += `
            <div style="padding: 20px; background: #fff3cd; border-radius: 8px; text-align: center; color: #856404;">
                ⚠️ Aucune question chargée pour l'Exercice 1.
                <br>Vérifiez que les automatismes ont été correctement chargés depuis l'API.
            </div>
        `;
    }

    html += '</div></div>'; // Fermer bareme-questions-grid et le div parent
    contentContainer.innerHTML = html;
    
    // Remplir les divs avec le HTML parsé et appliquer KaTeX
    if (exerciseData && exerciseData.questions) {
        exerciseData.questions.forEach((question, qIndex) => {
            const enonceDiv = document.getElementById(`enonce_auto_${qIndex}`);
            const correctionDiv = document.getElementById(`correction_auto_${qIndex}`);
            
            if (enonceDiv) {
                enonceDiv.innerHTML = question.statement;
                setTimeout(() => {
                    renderKatexInElement(enonceDiv);
                    renderScratchblocksInElement(enonceDiv);
                }, 50);
            }

            if (correctionDiv) {
                correctionDiv.innerHTML = question.answer;
                setTimeout(() => {
                    renderKatexInElement(correctionDiv);
                    renderScratchblocksInElement(correctionDiv);
                }, 50);
            }
            // Initialiser l'affichage des compétences sélectionnées
            renderAutomatismeQuestionCompetences(qIndex);
        });
    }

    // 📊 Mettre à jour l'affichage des compétences de l'exercice
    updateExerciseCompetencesSummary('1');
}

// Helper : Calculer les compétences utilisées dans un exercice (depuis les questions)
function getExerciseCompetencesFromQuestions(exerciseNum) {
    const baremeData = appState.baremeConfig.exercises[exerciseNum];
    if (!baremeData || !baremeData.questionCompetences) return {};

    const competencesCount = {};

    // Parcourir toutes les questions
    Object.keys(baremeData.questionCompetences).forEach(qKey => {
        const selectedComps = baremeData.questionCompetences[qKey] || [];

        selectedComps.forEach(compName => {
            if (!competencesCount[compName]) {
                competencesCount[compName] = 0;
            }

            // Utiliser les points ajustés de la compétence si disponibles
            if (baremeData.questionCompetencePoints &&
                baremeData.questionCompetencePoints[qKey] &&
                baremeData.questionCompetencePoints[qKey][compName] !== undefined) {
                competencesCount[compName] += baremeData.questionCompetencePoints[qKey][compName];
            } else {
                // Sinon, répartir équitablement les points de la question
                const questionPoints = baremeData.questionPoints && baremeData.questionPoints[qKey]
                    ? baremeData.questionPoints[qKey]
                    : 1;
                competencesCount[compName] += questionPoints / selectedComps.length;
            }
        });
    });

    // Arrondir à 1 décimale
    Object.keys(competencesCount).forEach(key => {
        competencesCount[key] = Math.round(competencesCount[key] * 10) / 10;
    });

    return competencesCount;
}

// Afficher Ex2-5 (DNB) dans la page barème
function showBaremeExerciseDNB(exerciseNum) {
    const baremeData = appState.baremeConfig.exercises[exerciseNum];
    const exerciseId = baremeData.dnbId;
    const parsedExercise = appState.parsedExercises[exerciseId];
    const exerciseIndex = parseInt(exerciseNum) - 1;
    
    // Mettre à jour les onglets
    renderBaremeExerciseTabs();
    
    // Générer le contenu de l'exercice avec questions séparées
    const contentContainer = document.getElementById('baremeExerciseContent');
    if (!contentContainer) return;
    
    const year = appState.dnbData[exerciseId].annee;
    const localPngUrl = `dnb/${year}/tex/png/${exerciseId}.png`;
    const remotePngUrl = `https://coopmaths.fr/alea/static/dnb/${year}/tex/png/${exerciseId}.png`;
    
    let html = `
        <div style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid #e9ecef;">
            <div style="display: flex; justify-content: space-between; align-items: start; gap: 20px; margin-bottom: 15px;">
                <div style="flex: 1;">
                    <h3 style="color: #2c3e50; margin-bottom: 10px;">
                        📝 Exercice ${exerciseNum} - ${exerciseId}
                    </h3>
                    <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                        <span class="exercise-badge">📅 ${appState.dnbData[exerciseId].annee}</span>
                        <span class="exercise-badge">📍 ${appState.dnbData[exerciseId].lieu}</span>
                    </div>
                    <button onclick="toggleExercisePreview('preview_${exerciseId}')" 
                            style="padding: 6px 12px; background: #6c757d; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 0.9em;">
                        👁️ Aperçu complet
                    </button>
                </div>
                <div style="display: flex; flex-direction: column; align-items: end; gap: 10px;">
                    <label style="font-weight: bold; color: #495057;">
                        Points total de l'exercice :
                    </label>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <input type="number" 
                               id="points_${exerciseNum}" 
                               value="${baremeData.totalPoints}" 
                               min="0" 
                               max="100" 
                               step="0.5"
                               onchange="updateExercisePoints('${exerciseNum}', this.value)"
                               style="padding: 8px 12px; font-size: 1.1em; width: 100px; border: 2px solid #dee2e6; border-radius: 6px;">
                        <span style="color: #666;">points</span>
                    </div>
                </div>
            </div>
            <div id="preview_${exerciseId}" style="display: none; margin-top: 15px; padding: 15px; background: #f8f9fa; border-radius: 8px; border: 2px solid #dee2e6;">
                <strong style="display: block; margin-bottom: 8px; color: #2c3e50;">📋 Aperçu complet de l'exercice (PNG) :</strong>
                <p style="color: #666; font-size: 0.85em; margin-bottom: 10px;">
                    Cette image montre l'exercice complet avec graphiques et tableaux.
                </p>
                <img src="${localPngUrl}" 
                     style="max-width: 100%; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);" 
                     alt="Exercice ${exerciseId}"
                     onerror="this.src='${remotePngUrl}'; this.onerror=function(){this.parentElement.innerHTML='<p style=color:#dc3545>❌ Image non disponible (local et distant)</p>';}">
            </div>
        </div>
        
        <!-- Compétences calculées automatiquement depuis les questions -->
        <div style="margin-bottom: 25px; padding: 15px; background: #e3f2fd; border-radius: 8px; border-left: 4px solid #2196F3;">
            <label style="display: block; font-weight: bold; margin-bottom: 12px; color: #1565C0;">
                📊 Compétences évaluées (calculées depuis les questions) :
            </label>
            <div id="competences_${exerciseNum}" style="display: flex; flex-wrap: wrap; gap: 10px;">
                ${(() => {
                    const competencesCount = getExerciseCompetencesFromQuestions(exerciseNum);
                    const competenceNames = Object.keys(competencesCount);

                    if (competenceNames.length === 0) {
                        return '<p style="color: #666; font-style: italic; margin: 0;">Aucune compétence sélectionnée dans les questions</p>';
                    }

                    return competenceNames.map(compName => {
                        const comp = defaultCompetences.find(c => c.name === compName);
                        if (!comp) return '';
                        const points = competencesCount[compName];
                        return `
                            <div style="
                                padding: 10px 16px;
                                border: 2px solid ${comp.color};
                                background: ${comp.color};
                                color: white;
                                border-radius: 20px;
                                font-weight: 600;
                                display: flex;
                                align-items: center;
                                gap: 8px;
                            ">
                                <span style="font-size: 16px;">${comp.icon}</span>
                                <span>${comp.name}</span>
                                <span style="
                                    background: rgba(255,255,255,0.3);
                                    padding: 2px 8px;
                                    border-radius: 12px;
                                    font-size: 12px;
                                    font-weight: bold;
                                ">${points}pt${points > 1 ? 's' : ''}</span>
                            </div>
                        `;
                    }).join('');
                })()}
            </div>
            <p style="margin: 8px 0 0 0; font-size: 12px; color: #666; font-style: italic;">
                💡 Les compétences se configurent question par question ci-dessous
            </p>
        </div>

        <div style="display: none;">
            <div id="competences_${exerciseNum}_old" style="display: none;">
                ${defaultCompetences.map(comp => {
                    const isSelected = baremeData.selectedCompetences.includes(comp.name);
                    return `
                        <div style="position: relative; display: inline-flex;">
                            <button type="button"
                                    onclick="toggleCompetenceForExercise('${exerciseNum}', '${comp.name}')"
                                    style="
                                        padding: 10px 16px;
                                        border: 2px solid ${comp.color};
                                        background: ${isSelected ? comp.color : 'white'};
                                        color: ${isSelected ? 'white' : comp.color};
                                        border-radius: 20px;
                                        font-weight: 600;
                                        cursor: pointer;
                                        transition: all 0.2s ease;
                                        display: flex;
                                        align-items: center;
                                        gap: 6px;
                                    ">
                                <span style="font-size: 16px;">${comp.icon}</span>
                                <span>${comp.name}</span>
                            </button>
                            ${isSelected ? `
                                <button type="button"
                                        onclick="event.stopPropagation(); openBaremeCompetenceModal('${exerciseNum}', '${comp.name}')"
                                        style="
                                            position: absolute;
                                            top: -6px;
                                            right: -6px;
                                            width: 24px;
                                            height: 24px;
                                            border-radius: 50%;
                                            background: white;
                                            border: 2px solid ${comp.color};
                                            color: ${comp.color};
                                            display: flex;
                                            align-items: center;
                                            justify-content: center;
                                            cursor: pointer;
                                            font-size: 12px;
                                            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                                            transition: all 0.2s ease;
                                        "
                                        onmouseover="this.style.transform='scale(1.1)'; this.style.background='${comp.color}'; this.style.color='white';"
                                        onmouseout="this.style.transform=''; this.style.background='white'; this.style.color='${comp.color}';"
                                        title="Éditer les détails de cette compétence">
                                    ✏️
                                </button>
                            ` : ''}
                        </div>
                    `;
                }).join('')}
            </div>
            
            <!-- Répartition des points selon le mode -->
            <div id="pointsDistribution_${exerciseNum}" style="margin-top: 20px;">
                ${renderPointsDistribution(exerciseNum, baremeData)}
            </div>
        </div>
        
        <!-- Questions séparées -->
        <div style="margin-top: 25px;">
            <h4 style="color: #2c3e50; margin-bottom: 15px;">📋 Questions de l'exercice :</h4>
            <div class="bareme-questions-grid">
    `;

    // Afficher les questions séparément
    if (parsedExercise && parsedExercise.questions && parsedExercise.questions.length > 0) {
        parsedExercise.questions.forEach((qItem, qIndex) => {
            // Gérer les objets (nouvelle structure) et strings (rétrocompatibilité)
            const isObject = typeof qItem === 'object' && qItem !== null;
            const qText = isObject ? qItem.content : qItem;
            const isSubQuestion = isObject && qItem.isSubQuestion;

            // Déterminer le titre de la question
            let questionTitle;
            if (isSubQuestion) {
                questionTitle = `Question ${qItem.parentNumber}.${qItem.subLetter}`;
            } else if (isObject && qItem.number) {
                questionTitle = `Question ${qItem.number}`;
            } else {
                questionTitle = `Question ${qIndex + 1}`;
            }

            const qId = `q${qIndex + 1}`;

            // Récupérer la correction correspondante
            const corrItem = parsedExercise.corrections && parsedExercise.corrections[qIndex] ? parsedExercise.corrections[qIndex] : '';
            const correction = typeof corrItem === 'object' ? corrItem.content : corrItem;

            const qKey = `q${qIndex}`;
            if (!baremeData.questionCompetences) baremeData.questionCompetences = {};
            if (!baremeData.questionCompetences[qKey]) {
                baremeData.questionCompetences[qKey] = []; // Aucune compétence pré-sélectionnée
            }

            // Calculer les points par défaut pour cette question
            if (!baremeData.questionPoints) baremeData.questionPoints = {};
            if (!baremeData.questionPoints[qKey]) {
                baremeData.questionPoints[qKey] = Math.round((baremeData.totalPoints / parsedExercise.questions.length) * 10) / 10;
            }
            const questionPoints = baremeData.questionPoints[qKey];

            html += `
                <div style="background: white; border: 2px solid #e9ecef; border-radius: 8px; padding: 20px; margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #e9ecef;">
                        <h5 style="color: #4285f4; margin: 0;">${questionTitle}</h5>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <input type="number"
                                   id="questionPoints_${exerciseNum}_${qIndex}"
                                   value="${questionPoints}"
                                   min="0"
                                   max="20"
                                   step="0.5"
                                   onchange="updateQuestionPoints('${exerciseNum}', ${qIndex}, this.value)"
                                   style="width: 70px; padding: 4px 8px; font-size: 1em; font-weight: bold; border: 2px solid #dee2e6; border-radius: 6px; text-align: center;">
                            <span style="font-weight: bold; color: #6c757d;">pts</span>
                        </div>
                    </div>
                    <div style="margin-bottom: 15px; padding: 12px; background: #f8f9fa; border-radius: 6px;">
                        <strong style="display: block; margin-bottom: 8px; color: #495057;">Énoncé :</strong>
                        <div style="color: #2c3e50; line-height: 1.6; text-align: justify;" id="enonce_q${exerciseIndex}_${qIndex}"></div>
                    </div>
                    <div style="padding: 12px; background: #e8f5e9; border-radius: 6px;">
                        <strong style="display: block; margin-bottom: 8px; color: #2e7d32;">Réponse attendue :</strong>
                        <div style="color: #1b5e20; line-height: 1.6; text-align: justify; max-height: 400px; overflow-y: auto;" id="correction_q${exerciseIndex}_${qIndex}"></div>
                    </div>
                    <div style="margin-top: 15px; padding-top: 12px; border-top: 1px dashed #e0e0e0;">
                        <label style="display:block; font-weight:600; margin-bottom:8px; color:#495057;">Compétences évaluées (question) :</label>
                        <div id="qcomp_dnb_${exerciseNum}_${qIndex}" style="display:flex; flex-wrap:wrap; gap:8px;">
                            <!-- Généré dynamiquement -->
                        </div>
                    </div>
                </div>
            `;
        });
    } else {
        html += `
            <div style="padding: 20px; background: #fff3cd; border-radius: 8px; text-align: center; color: #856404;">
                ℹ️ Aucune question parsée. Voir l'image de l'exercice ci-dessus.
            </div>
        `;
    }

    html += '</div></div>'; // Fermer bareme-questions-grid et le div parent
    contentContainer.innerHTML = html;
    
    // Remplir les divs d'énoncé et correction avec le HTML parsé
    if (parsedExercise && parsedExercise.questions && parsedExercise.questions.length > 0) {
        parsedExercise.questions.forEach((qItem, qIndex) => {
            // Gérer les objets (nouvelle structure) et strings (rétrocompatibilité)
            const isObject = typeof qItem === 'object' && qItem !== null;
            const qText = isObject ? qItem.content : qItem;

            const enonceDiv = document.getElementById(`enonce_q${exerciseIndex}_${qIndex}`);
            const correctionDiv = document.getElementById(`correction_q${exerciseIndex}_${qIndex}`);

            if (enonceDiv) {
                enonceDiv.innerHTML = qText;
                // Rendre les formules mathématiques avec KaTeX (comme MathALÉA)
                setTimeout(() => {
                    renderKatexInElement(enonceDiv);
                    renderScratchblocksInElement(enonceDiv);
                }, 50);
            }

            // Initialiser l'affichage des compétences pour cette question
            renderDNBQuestionCompetences(exerciseNum, qIndex);
            if (correctionDiv) {
                const corrItem = parsedExercise.corrections && parsedExercise.corrections[qIndex]
                    ? parsedExercise.corrections[qIndex]
                    : 'Pas de correction disponible';
                const correction = typeof corrItem === 'object' ? corrItem.content : corrItem;
                correctionDiv.innerHTML = correction;
                // Rendre les formules mathématiques avec KaTeX
                setTimeout(() => {
                    renderKatexInElement(correctionDiv);
                    renderScratchblocksInElement(correctionDiv);
                }, 50);
            }
        });
    }
}

/**
 * Affiche un exercice MathALÉA dans la configuration du barème
 */
function showBaremeExerciseMathALEA(exerciseNum) {
    const baremeData = appState.baremeConfig.exercises[exerciseNum];
    const exerciseData = appState.exercises[parseInt(exerciseNum) - 1];

    // Mettre à jour les onglets
    renderBaremeExerciseTabs();

    // Générer le contenu de l'exercice avec questions séparées
    const contentContainer = document.getElementById('baremeExerciseContent');
    if (!contentContainer) return;

    let html = `
        <div style="margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid #e9ecef;">
            <div style="display: flex; justify-content: space-between; align-items: start; gap: 20px; margin-bottom: 15px;">
                <div style="flex: 1;">
                    <h3 style="color: #2c3e50; margin-bottom: 10px;">
                        🎓 Exercice ${exerciseNum} - ${exerciseData.title}
                    </h3>
                    <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                        <span class="exercise-badge">📚 MathALÉA</span>
                        ${exerciseData.metadata?.uuid ? `<span class="exercise-badge">🔑 ${exerciseData.metadata.uuid}</span>` : ''}
                    </div>
                </div>
                <div style="display: flex; flex-direction: column; align-items: end; gap: 10px;">
                    <label style="font-weight: bold; color: #495057;">
                        Points total de l'exercice :
                    </label>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <input type="number"
                               id="points_${exerciseNum}"
                               value="${baremeData.totalPoints}"
                               min="0"
                               max="100"
                               step="0.5"
                               onchange="updateExercisePoints('${exerciseNum}', this.value)"
                               style="padding: 8px 12px; font-size: 1.1em; width: 100px; border: 2px solid #dee2e6; border-radius: 6px;">
                        <span style="color: #666;">points</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Compétences calculées automatiquement depuis les questions -->
        <div style="margin-bottom: 25px; padding: 15px; background: #e3f2fd; border-radius: 8px; border-left: 4px solid #2196F3;">
            <label style="display: block; font-weight: bold; margin-bottom: 12px; color: #1565C0;">
                📊 Compétences évaluées (calculées depuis les questions) :
            </label>
            <div id="competences_${exerciseNum}" style="display: flex; flex-wrap: wrap; gap: 10px;">
                ${(() => {
                    const competencesCount = getExerciseCompetencesFromQuestions(exerciseNum);
                    const competenceNames = Object.keys(competencesCount);

                    if (competenceNames.length === 0) {
                        return '<p style="color: #666; font-style: italic; margin: 0;">Aucune compétence sélectionnée dans les questions</p>';
                    }

                    return competenceNames.map(compName => {
                        const comp = defaultCompetences.find(c => c.name === compName);
                        if (!comp) return '';
                        const points = competencesCount[compName];
                        return `
                            <div style="
                                padding: 10px 16px;
                                border: 2px solid ${comp.color};
                                background: ${comp.color};
                                color: white;
                                border-radius: 20px;
                                font-weight: 600;
                                display: flex;
                                align-items: center;
                                gap: 8px;
                            ">
                                <span style="font-size: 16px;">${comp.icon}</span>
                                <span>${comp.name}</span>
                                <span style="
                                    background: rgba(255,255,255,0.3);
                                    padding: 2px 8px;
                                    border-radius: 12px;
                                    font-size: 12px;
                                    font-weight: bold;
                                ">${points}pt${points > 1 ? 's' : ''}</span>
                            </div>
                        `;
                    }).join('');
                })()}
            </div>
            <p style="margin: 8px 0 0 0; font-size: 12px; color: #666; font-style: italic;">
                💡 Les compétences se configurent question par question ci-dessous
            </p>
        </div>

        <!-- Questions séparées -->
        <div style="margin-top: 25px;">
            <h4 style="color: #2c3e50; margin-bottom: 15px;">📋 Questions de l'exercice :</h4>
            <div class="bareme-questions-grid">
    `;

    // Afficher les questions
    if (exerciseData.questions && exerciseData.questions.length > 0) {
        exerciseData.questions.forEach((question, qIndex) => {
            const qKey = `q${qIndex}`;
            if (!baremeData.questionCompetences) baremeData.questionCompetences = {};
            if (!baremeData.questionCompetences[qKey]) {
                baremeData.questionCompetences[qKey] = [];
            }

            // Calculer les points par défaut pour cette question
            if (!baremeData.questionPoints) baremeData.questionPoints = {};
            if (!baremeData.questionPoints[qKey]) {
                baremeData.questionPoints[qKey] = Math.round((baremeData.totalPoints / exerciseData.questions.length) * 10) / 10;
            }
            const questionPoints = baremeData.questionPoints[qKey];

            html += `
                <div style="background: white; border: 2px solid #e9ecef; border-radius: 8px; padding: 20px; margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 1px solid #e9ecef;">
                        <h5 style="color: #4285f4; margin: 0;">Question ${question.number || qIndex + 1}</h5>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <input type="number"
                                   id="questionPoints_${exerciseNum}_${qIndex}"
                                   value="${questionPoints}"
                                   min="0"
                                   max="20"
                                   step="0.5"
                                   onchange="updateQuestionPoints('${exerciseNum}', ${qIndex}, this.value)"
                                   style="width: 70px; padding: 4px 8px; font-size: 1em; font-weight: bold; border: 2px solid #dee2e6; border-radius: 6px; text-align: center;">
                            <span style="font-weight: bold; color: #6c757d;">pts</span>
                        </div>
                    </div>
                    <div style="margin-bottom: 15px; padding: 12px; background: #f8f9fa; border-radius: 6px;">
                        <strong style="display: block; margin-bottom: 8px; color: #495057;">Énoncé :</strong>
                        <div style="color: #2c3e50; line-height: 1.6; text-align: justify;" id="enonce_mathalea_${exerciseNum}_${qIndex}">${question.content || 'Pas d\'énoncé disponible'}</div>
                    </div>
                    ${question.answer ? `
                    <div style="padding: 12px; background: #e8f5e9; border-radius: 6px;">
                        <strong style="display: block; margin-bottom: 8px; color: #2e7d32;">Réponse attendue :</strong>
                        <div style="color: #1b5e20; line-height: 1.6; text-align: justify;" id="answer_mathalea_${exerciseNum}_${qIndex}">${question.answer}</div>
                    </div>
                    ` : ''}
                    <div style="margin-top: 15px; padding-top: 12px; border-top: 1px dashed #e0e0e0;">
                        <label style="display:block; font-weight:600; margin-bottom:8px; color:#495057;">Compétences évaluées (question) :</label>
                        <div id="qcomp_mathalea_${exerciseNum}_${qIndex}" style="display:flex; flex-wrap:wrap; gap:8px;">
                            <!-- Généré dynamiquement -->
                        </div>
                    </div>
                </div>
            `;
        });
    } else {
        html += `
            <div style="padding: 20px; background: #fff3cd; border-radius: 8px; text-align: center; color: #856404;">
                ℹ️ Aucune question détectée pour cet exercice.
            </div>
        `;
    }

    html += '</div></div>'; // Fermer bareme-questions-grid
    contentContainer.innerHTML = html;

    // Rendre les formules mathématiques avec KaTeX
    if (exerciseData.questions && exerciseData.questions.length > 0) {
        exerciseData.questions.forEach((question, qIndex) => {
            const enonceDiv = document.getElementById(`enonce_mathalea_${exerciseNum}_${qIndex}`);
            const answerDiv = document.getElementById(`answer_mathalea_${exerciseNum}_${qIndex}`);

            if (enonceDiv) {
                setTimeout(() => {
                    renderKatexInElement(enonceDiv);
                    renderScratchblocksInElement(enonceDiv);
                }, 50);
            }

            if (answerDiv) {
                setTimeout(() => {
                    renderKatexInElement(answerDiv);
                    renderScratchblocksInElement(answerDiv);
                }, 50);
            }

            // Initialiser l'affichage des compétences pour cette question
            renderMathALEAQuestionCompetences(exerciseNum, qIndex);
        });
    }
}

/**
 * Affiche les compétences pour une question MathALÉA
 */
function renderMathALEAQuestionCompetences(exerciseNum, qIndex) {
    const container = document.getElementById(`qcomp_mathalea_${exerciseNum}_${qIndex}`);
    if (!container) return;

    const baremeData = appState.baremeConfig.exercises[exerciseNum];
    if (!baremeData.questionCompetences) baremeData.questionCompetences = {};
    const qKey = `q${qIndex}`;
    const selected = baremeData.questionCompetences[qKey] || [];

    // Initialiser les points des compétences si nécessaire
    if (!baremeData.questionCompetencePoints) baremeData.questionCompetencePoints = {};
    if (!baremeData.questionCompetencePoints[qKey]) baremeData.questionCompetencePoints[qKey] = {};

    // Récupérer les points de la question
    const questionPoints = baremeData.questionPoints && baremeData.questionPoints[qKey]
        ? baremeData.questionPoints[qKey]
        : 1;

    container.innerHTML = defaultCompetences.map(comp => {
        const sel = selected.includes(comp.name);
        const bg = sel ? comp.color : 'white';
        const fg = sel ? 'white' : comp.color;

        // Points de cette compétence (répartis équitablement par défaut)
        let compPoints = 0;
        if (sel) {
            if (!baremeData.questionCompetencePoints[qKey][comp.name]) {
                // Répartition équitable par défaut
                compPoints = Math.round((questionPoints / selected.length) * 10) / 10;
                baremeData.questionCompetencePoints[qKey][comp.name] = compPoints;
            } else {
                compPoints = baremeData.questionCompetencePoints[qKey][comp.name];
            }
        }

        return `
            <div style="position: relative; display: inline-flex; margin: 4px;">
                <button type="button"
                        onclick="toggleCompetenceForMathALEAQuestion('${exerciseNum}', ${qIndex}, '${comp.name}')"
                        style="padding:6px 12px; border:2px solid ${comp.color}; border-radius:18px; cursor:pointer; font-weight:600; background:${bg}; color:${fg};">
                    ${comp.icon} ${comp.name} ${sel ? `<span style="margin-left:4px; opacity:0.8;">(${compPoints}pt)</span>` : ''}
                </button>
                ${sel ? `
                    <button type="button"
                            onclick="event.stopPropagation(); openBaremeQuestionCompetenceModal('${exerciseNum}', ${qIndex}, '${comp.name}')"
                            style="position: absolute; top: -6px; right: -6px; width: 20px; height: 20px; border-radius: 50%; background: white; border: 2px solid ${comp.color}; cursor: pointer; font-size: 10px; display: flex; align-items: center; justify-content: center; padding: 0;"
                            title="Éditer les détails de cette compétence">
                        ✏️
                    </button>
                ` : ''}
            </div>`;
    }).join('');
}

/**
 * Toggle une compétence pour une question MathALÉA
 */
function toggleCompetenceForMathALEAQuestion(exerciseNum, qIndex, compName) {
    const baremeData = appState.baremeConfig.exercises[exerciseNum];
    if (!baremeData.questionCompetences) baremeData.questionCompetences = {};
    const qKey = `q${qIndex}`;
    if (!baremeData.questionCompetences[qKey]) baremeData.questionCompetences[qKey] = [];
    const list = baremeData.questionCompetences[qKey];
    const i = list.indexOf(compName);
    if (i >= 0) list.splice(i, 1); else list.push(compName);
    renderMathALEAQuestionCompetences(exerciseNum, qIndex);
    updateExerciseCompetencesSummary(exerciseNum);
    updateCompetencesSummary();
    saveData();
}

// Mettre à jour l'affichage des compétences d'un exercice spécifique
function updateExerciseCompetencesSummary(exerciseNum) {
    const container = document.getElementById(`competences_${exerciseNum}`);
    if (!container) return;

    const competencesCount = getExerciseCompetencesFromQuestions(exerciseNum);
    const competenceNames = Object.keys(competencesCount);

    if (competenceNames.length === 0) {
        container.innerHTML = '<p style="color: #666; font-style: italic; margin: 0;">Aucune compétence sélectionnée dans les questions</p>';
        return;
    }

    container.innerHTML = competenceNames.map(compName => {
        const comp = defaultCompetences.find(c => c.name === compName);
        if (!comp) return '';
        const points = competencesCount[compName];
        return `
            <div style="
                padding: 10px 16px;
                border: 2px solid ${comp.color};
                background: ${comp.color};
                color: white;
                border-radius: 20px;
                font-weight: 600;
                display: flex;
                align-items: center;
                gap: 8px;
            ">
                <span style="font-size: 16px;">${comp.icon}</span>
                <span>${comp.name}</span>
                <span style="
                    background: rgba(255,255,255,0.3);
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-size: 12px;
                    font-weight: bold;
                ">${points.toFixed(1)}pt${points > 1 ? 's' : ''}</span>
            </div>
        `;
    }).join('');
}

function updateCompetencesSummary() {
    const summaryContainer = document.getElementById('competencesSummaryContent');
    if (!summaryContainer) return;

    // Calculer la somme des points par compétence sur tous les exercices
    // EN UTILISANT LES COMPÉTENCES DES QUESTIONS (bottom-up)
    const competencesTotal = {};

    Object.keys(appState.baremeConfig.exercises).forEach(exerciseId => {
        // Utiliser la fonction helper pour calculer depuis les questions
        const exerciseCompetences = getExerciseCompetencesFromQuestions(exerciseId);

        // Mettre à jour l'affichage des compétences de cet exercice
        updateExerciseCompetencesSummary(exerciseId);

        Object.entries(exerciseCompetences).forEach(([compName, points]) => {
            if (!competencesTotal[compName]) {
                competencesTotal[compName] = {
                    total: 0,
                    comp: defaultCompetences.find(c => c.name === compName)
                };
            }
            competencesTotal[compName].total += points;
        });
    });
    
    // Générer les badges
    summaryContainer.innerHTML = Object.entries(competencesTotal)
        .sort((a, b) => b[1].total - a[1].total)
        .map(([compName, data]) => {
            const comp = data.comp || { color: '#6c757d', icon: '📋' };
            return `
                <div style="
                    padding: 6px 12px;
                    background: ${comp.color};
                    color: white;
                    border-radius: 16px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.9em;
                ">
                    <span>${comp.icon}</span>
                    <span>${compName}</span>
                    <span style="margin-left: 4px; opacity: 0.9;">${data.total.toFixed(1)} pts</span>
                </div>
            `;
        }).join('');
}

function renderPointsDistribution(exerciseId, baremeData) {
    const mode = appState.baremeConfig.mode;
    
    if (mode === 'a') {
        // Mode A: Points par compétence individuellement
        return `
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px;">
                <strong style="display: block; margin-bottom: 10px;">Points par compétence :</strong>
                ${baremeData.selectedCompetences.map(compName => {
                    const comp = defaultCompetences.find(c => c.name === compName);
                    const points = baremeData.pointsPerCompetence[compName] || 0;
                    return `
                        <div style="margin-bottom: 10px; display: flex; align-items: center; gap: 10px;">
                            <span style="min-width: 120px; font-weight: 600; color: ${comp.color};">
                                ${comp.icon} ${compName}:
                            </span>
                            <input type="number" 
                                   value="${points}" 
                                   min="0" 
                                   step="0.5"
                                   onchange="updateCompetencePointsForBareme('${exerciseId}', '${compName}', this.value)"
                                   style="width: 80px; padding: 6px; border: 1px solid #dee2e6; border-radius: 4px;">
                            <span>pts</span>
                        </div>
                    `;
                }).join('')}
                <div id="warning_${exerciseId}" style="display: none;"></div>
            </div>
        `;
    } else if (mode === 'b') {
        // Mode B: Répartition automatique
        const nbComp = baremeData.selectedCompetences.length;
        const pointsPerComp = nbComp > 0 ? (baremeData.totalPoints / nbComp).toFixed(1) : 0;
        return `
            <div style="background: #e3f2fd; padding: 12px; border-radius: 6px; font-size: 0.9em; color: #1565c0;">
                ℹ️ Les ${baremeData.totalPoints} points seront répartis automatiquement entre les ${nbComp} compétence(s) sélectionnée(s) 
                (≈ ${pointsPerComp} pts chacune)
            </div>
        `;
    } else {
        // Mode C: Pas de répartition détaillée
        return `
            <div style="background: #fff3cd; padding: 12px; border-radius: 6px; font-size: 0.9em; color: #856404;">
                ℹ️ Les compétences seront évaluées globalement sans répartition détaillée des points
            </div>
        `;
    }
}

function toggleCompetenceForExercise(exerciseId, competenceName) {
    const baremeData = appState.baremeConfig.exercises[exerciseId];
    const index = baremeData.selectedCompetences.indexOf(competenceName);
    
    if (index > -1) {
        baremeData.selectedCompetences.splice(index, 1);
        delete baremeData.pointsPerCompetence[competenceName];
    } else {
        baremeData.selectedCompetences.push(competenceName);
        if (appState.baremeConfig.mode === 'a') {
            baremeData.pointsPerCompetence[competenceName] = 2; // Valeur par défaut
        }
    }
    
    // Re-afficher l'exercice courant
    showBaremeExercise(currentBaremeExerciseIndex);
    updateCompetencesSummary();
}

/**
 * Vérifie la cohérence entre le total de l'exercice et la somme des points des questions
 * @param {string} exerciseId - L'ID de l'exercice
 * @returns {object} {isConsistent, diff, sumQuestions, totalExercise}
 */
function checkExercisePointsConsistency(exerciseId) {
    const baremeData = appState.baremeConfig.exercises[exerciseId];
    if (!baremeData || !baremeData.questionPoints) {
        return {isConsistent: true, diff: 0, sumQuestions: 0, totalExercise: baremeData?.totalPoints || 0};
    }

    const totalExercise = baremeData.totalPoints || 0;
    const sumQuestions = Object.values(baremeData.questionPoints).reduce((sum, pts) => sum + (parseFloat(pts) || 0), 0);
    const diff = Math.round((totalExercise - sumQuestions) * 10) / 10;
    const isConsistent = Math.abs(diff) < 0.01; // Tolérance de 0.01 pour les arrondis

    return {
        isConsistent,
        diff,
        sumQuestions: Math.round(sumQuestions * 10) / 10,
        totalExercise: Math.round(totalExercise * 10) / 10
    };
}

function updateExercisePoints(exerciseId, value) {
    const points = parseFloat(value) || 0;
    appState.baremeConfig.exercises[exerciseId].totalPoints = points;

    // Recalculer la répartition si mode B
    if (appState.baremeConfig.mode === 'b') {
        const baremeData = appState.baremeConfig.exercises[exerciseId];
        const nbComp = baremeData.selectedCompetences.length;
        if (nbComp > 0) {
            const pointsPerComp = points / nbComp;
            baremeData.selectedCompetences.forEach(comp => {
                baremeData.pointsPerCompetence[comp] = pointsPerComp;
            });
        }
    }

    calculateTotalPoints();
    updateCompetencesSummary();

    // Re-render la section de distribution et l'onglet
    const distDiv = document.getElementById(`pointsDistribution_${exerciseId}`);
    if (distDiv) {
        distDiv.innerHTML = renderPointsDistribution(exerciseId, appState.baremeConfig.exercises[exerciseId]);
    }

    // Mettre à jour l'onglet avec le nouveau total + vérifier incohérence
    renderBaremeExerciseTabs();
}

// Fonction pour mettre à jour les points d'une question
function updateQuestionPoints(exerciseNum, questionIndex, value) {
    const points = parseFloat(value) || 0;
    const baremeData = appState.baremeConfig.exercises[exerciseNum];
    const qKey = `q${questionIndex}`;

    console.log(`🔄 updateQuestionPoints - Ex${exerciseNum} Q${questionIndex + 1}: ${points} pts`);
    console.log(`  📦 baremeData avant:`, baremeData);

    // Mettre à jour les points de la question
    if (!baremeData.questionPoints) baremeData.questionPoints = {};
    baremeData.questionPoints[qKey] = points;

    // Recalculer le total de l'exercice
    const totalQuestions = Object.keys(baremeData.questionPoints).length;
    let newTotal = 0;
    Object.values(baremeData.questionPoints).forEach(pts => {
        newTotal += parseFloat(pts) || 0;
    });
    baremeData.totalPoints = Math.round(newTotal * 10) / 10;

    console.log(`  ✅ Nouveau total calculé: ${newTotal} pts (${totalQuestions} questions)`);
    console.log(`  📊 baremeData.totalPoints: ${baremeData.totalPoints}`);

    // Mettre à jour le champ de points total de l'exercice
    const exercisePointsInput = document.getElementById(`points_${exerciseNum}`);
    if (exercisePointsInput) {
        console.log(`  🔧 Mise à jour de l'input points_${exerciseNum}: ${baremeData.totalPoints}`);
        exercisePointsInput.value = baremeData.totalPoints;
    } else {
        console.warn(`  ⚠️ Input points_${exerciseNum} non trouvé`);
    }

    // IMPORTANT : Réinitialiser les points des compétences pour forcer la redistribution équitable
    if (baremeData.questionCompetencePoints && baremeData.questionCompetencePoints[qKey]) {
        console.log(`  🔄 Suppression des points de compétences existants pour ${qKey}`);
        delete baremeData.questionCompetencePoints[qKey];
    }

    // Redistribuer les points entre les compétences de cette question
    console.log(`  📊 Redistribution des compétences pour Ex${exerciseNum} Q${questionIndex + 1}`);
    redistributeQuestionCompetencePoints(exerciseNum, questionIndex);

    // Recalculer le total global
    console.log(`  🔄 Appel de calculateTotalPoints()`);
    calculateTotalPoints();
    console.log(`  🔄 Appel de updateCompetencesSummary()`);
    updateCompetencesSummary();
    console.log(`  🔄 Appel de renderBaremeExerciseTabs()`);
    renderBaremeExerciseTabs();

    console.log(`✅ Question ${questionIndex + 1} de Ex${exerciseNum}: ${points} pts → Redistribution équitable des compétences terminée`);
}

// Fonction pour redistribuer équitablement les points entre les compétences d'une question
function redistributeQuestionCompetencePoints(exerciseNum, questionIndex) {
    const baremeData = appState.baremeConfig.exercises[exerciseNum];
    const qKey = `q${questionIndex}`;

    if (!baremeData.questionCompetences || !baremeData.questionCompetences[qKey]) return;

    const selectedCompetences = baremeData.questionCompetences[qKey];
    if (selectedCompetences.length === 0) return;

    const questionPoints = baremeData.questionPoints && baremeData.questionPoints[qKey]
        ? baremeData.questionPoints[qKey]
        : 1;

    // Répartition équitable par défaut
    const pointsPerComp = Math.round((questionPoints / selectedCompetences.length) * 10) / 10;

    // Initialiser questionCompetencePoints si nécessaire
    if (!baremeData.questionCompetencePoints) baremeData.questionCompetencePoints = {};
    if (!baremeData.questionCompetencePoints[qKey]) baremeData.questionCompetencePoints[qKey] = {};

    // TOUJOURS appliquer la répartition équitable (même si les points existaient déjà)
    selectedCompetences.forEach(compName => {
        baremeData.questionCompetencePoints[qKey][compName] = pointsPerComp;
    });

    console.log(`📊 Redistribution équitable: ${selectedCompetences.length} compétences × ${pointsPerComp} pts = ${questionPoints} pts`);

    // Re-render les compétences avec les points mis à jour
    renderDNBQuestionCompetences(exerciseNum, questionIndex);
}

function updateCompetencePointsForBareme(exerciseId, competenceName, value) {
    const points = parseFloat(value) || 0;
    appState.baremeConfig.exercises[exerciseId].pointsPerCompetence[competenceName] = points;
    
    calculateTotalPoints();
    
    // Valider après un court délai pour laisser le DOM se mettre à jour
    setTimeout(() => {
        validateExerciseCompetencesTotal(exerciseId);
    }, 10);
}

function validateExerciseCompetencesTotal(exerciseId) {
    const baremeData = appState.baremeConfig.exercises[exerciseId];
    if (!baremeData) {
        console.warn(`❌ Pas de baremeData pour ${exerciseId}`);
        return;
    }
    
    const totalExercise = baremeData.totalPoints;
    
    // Calculer la somme des points par compétence
    let sumCompetences = 0;
    baremeData.selectedCompetences.forEach(compName => {
        const pts = parseFloat(baremeData.pointsPerCompetence[compName]) || 0;
        sumCompetences += pts;
    });
    
    console.log(`🔍 Validation ${exerciseId}: Total=${totalExercise}, Somme=${sumCompetences}`);
    
    // Afficher un avertissement si dépassement
    const warningDiv = document.getElementById(`warning_${exerciseId}`);
    if (!warningDiv) {
        console.warn(`❌ warning_${exerciseId} non trouvé dans le DOM`);
        return;
    }
    
    if (sumCompetences > totalExercise) {
        warningDiv.style.display = 'block';
        warningDiv.innerHTML = `
            <div style="background: #fff3cd; padding: 10px; border-radius: 6px; border-left: 4px solid #ffc107; margin-top: 10px; color: #856404;">
                ⚠️ <strong>Attention :</strong> La somme des compétences (${sumCompetences.toFixed(1)} pts) dépasse le total de l'exercice (${totalExercise} pts)
            </div>
        `;
    } else if (sumCompetences < totalExercise && sumCompetences > 0) {
        warningDiv.style.display = 'block';
        warningDiv.innerHTML = `
            <div style="background: #e3f2fd; padding: 10px; border-radius: 6px; border-left: 4px solid #2196f3; margin-top: 10px; color: #1565c0;">
                ℹ️ Reste ${(totalExercise - sumCompetences).toFixed(1)} pts à répartir
            </div>
        `;
    } else if (sumCompetences === totalExercise) {
        warningDiv.style.display = 'block';
        warningDiv.innerHTML = `
            <div style="background: #d4edda; padding: 10px; border-radius: 6px; border-left: 4px solid #28a745; margin-top: 10px; color: #155724;">
                ✅ <strong>Parfait !</strong> Tous les points sont répartis
            </div>
        `;
    } else {
        warningDiv.style.display = 'none';
    }
}

function toggleExercisePreview(previewId) {
    const preview = document.getElementById(previewId);
    if (preview) {
        preview.style.display = preview.style.display === 'none' ? 'block' : 'none';
    }
}

function showExerciseInMathalea(exerciseId) {
    const url = `https://coopmaths.fr/alea/?uuid=${exerciseId}&v=eleve`;
    window.open(url, '_blank', 'noopener,noreferrer');
}

function calculateTotalPoints() {
    let total = 0;
    const globalCompetences = {};

    // Calculer le total et agréger les compétences de tous les exercices
    Object.entries(appState.baremeConfig.exercises).forEach(([exerciseId, ex]) => {
        total += ex.totalPoints;

        // Agréger les compétences de cet exercice
        const exerciseComps = getExerciseCompetencesFromQuestions(exerciseId);
        Object.entries(exerciseComps).forEach(([compName, points]) => {
            if (!globalCompetences[compName]) {
                globalCompetences[compName] = 0;
            }
            globalCompetences[compName] += points;
        });
    });

    // Arrondir les compétences globales
    Object.keys(globalCompetences).forEach(key => {
        globalCompetences[key] = Math.round(globalCompetences[key] * 10) / 10;
    });

    const totalSpan = document.getElementById('currentTotal');
    const warningDiv = document.getElementById('totalWarning');
    const detailsDiv = document.getElementById('totalDetails');
    const btnContinue = document.getElementById('btnContinueToCandidates');

    if (totalSpan) {
        totalSpan.textContent = total.toFixed(1);

        // Afficher le résumé horizontal avec total + compétences
        if (detailsDiv) {
            let html = `
                <div style="display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
                    <div style="font-size: 1.1em; font-weight: bold; color: #2c3e50;">
                        Total: <span style="color: ${total === 20 ? '#28a745' : (total > 20 ? '#dc3545' : '#2196f3')}">${total.toFixed(1)}</span> / 20 pts
                    </div>
                    <div style="flex: 1; display: flex; gap: 12px; flex-wrap: wrap; align-items: center;">
            `;

            // Afficher chaque compétence avec ses points
            const sortedComps = Object.entries(globalCompetences).sort((a, b) => b[1] - a[1]);
            sortedComps.forEach(([compName, points]) => {
                const comp = defaultCompetences.find(c => c.name === compName);
                if (comp && points > 0) {
                    html += `
                        <div style="display: flex; align-items: center; gap: 6px; padding: 6px 12px; background: ${comp.color}; color: white; border-radius: 20px; font-size: 0.9em; font-weight: 600;">
                            <span>${comp.icon}</span>
                            <span>${comp.name}</span>
                            <span style="background: rgba(255,255,255,0.3); padding: 2px 8px; border-radius: 12px; font-size: 0.85em;">
                                ${points} pt${points > 1 ? 's' : ''}
                            </span>
                        </div>
                    `;
                }
            });

            html += `
                    </div>
                </div>
            `;

            detailsDiv.innerHTML = html;
        }

        if (total > 20) {
            totalSpan.style.color = '#dc3545';
            if (warningDiv) {
                warningDiv.style.display = 'block';
                warningDiv.innerHTML = '⚠️ Le total dépasse 20 points';
            }
            if (btnContinue) btnContinue.disabled = true;
        } else if (total === 0) {
            totalSpan.style.color = '#6c757d';
            if (warningDiv) warningDiv.style.display = 'none';
            if (btnContinue) btnContinue.disabled = true;
        } else if (total < 20) {
            totalSpan.style.color = '#2196f3';
            if (warningDiv) {
                warningDiv.style.display = 'block';
                warningDiv.innerHTML = `ℹ️ Reste ${(20 - total).toFixed(1)} points à attribuer`;
                warningDiv.style.background = '#e3f2fd';
                warningDiv.style.borderColor = '#2196f3';
                warningDiv.style.color = '#1565c0';
            }
            if (btnContinue) btnContinue.disabled = false;
        } else {
            totalSpan.style.color = '#28a745';
            if (warningDiv) warningDiv.style.display = 'none';
            if (btnContinue) btnContinue.disabled = false;
        }
    }

    // Mettre à jour le résumé des compétences (conservé pour compatibilité)
    updateCompetencesSummary();
}

function goBackToSelection() {
    var isUpload = (new URLSearchParams(window.location.search)).get('source') === 'upload'
        || (appState && appState.pdfImport && appState.pdfImport.exercises && appState.pdfImport.exercises.length > 0);
    if (isUpload) {
        showPage('pdfImportPage');
        return;
    }
    showPage('dnbSelectionPage');
}

function continueToCandidates() {
    // Valider le barème
    let hasError = false;
    Object.entries(appState.baremeConfig.exercises).forEach(([exerciseId, baremeData]) => {
        // Vérifier si des compétences sont assignées au niveau exercice OU au niveau des questions
        const hasExerciseCompetences = baremeData.selectedCompetences.length > 0;
        const hasQuestionCompetences = baremeData.questionCompetences &&
            Object.values(baremeData.questionCompetences).some(comps => comps && comps.length > 0);

        if (!hasExerciseCompetences && !hasQuestionCompetences) {
            alert(`⚠️ Veuillez sélectionner au moins une compétence pour l'exercice ${exerciseId}`);
            hasError = true;
        }
    });

    if (hasError) return;

    const total = Object.values(appState.baremeConfig.exercises).reduce((sum, ex) => sum + ex.totalPoints, 0);
    if (total > 20) {
        alert('⚠️ Le total dépasse 20 points (nouveau barème DNB 2025)');
        return;
    }
    
    // ✅ APPLIQUER LES COMPÉTENCES CONFIGURÉES À EXERCISESDATA
    applyBaremeCompetencesToExercisesData();

    // Passer à l'étape suivante du workflow
    completeStepAndNext(3);
}

// Charger et parser tous les exercices sélectionnés
async function loadAndParseSelectedExercises() {
    appState.parsedExercises = {};
    
    const promises = appState.selectedExercises.map(async (exerciseId) => {
        const data = appState.dnbData[exerciseId];
        const year = data.annee;
        const texPath = `dnb/${year}/tex/${exerciseId}.tex`;
        const texCorPath = `dnb/${year}/tex/${exerciseId}_cor.tex`;
        
        try {
            const [latexContent, latexCorrection] = await Promise.all([
                fetch(texPath).then(r => r.text()),
                fetch(texCorPath).then(r => r.text()).catch(() => '')
            ]);
            
            const parsed = parseLatexQuestions(latexContent, latexCorrection, exerciseId);
            
            if (parsed) {
                appState.parsedExercises[exerciseId] = {
                    metadata: data,
                    questions: parsed.enonces,  // Array de strings HTML
                    corrections: parsed.corrections  // Array de strings HTML
                };
                console.log(`  ✓ ${exerciseId}: ${parsed.enonces.length} question(s)`);
            } else {
                console.warn(`  ⚠️ ${exerciseId}: Parsing échoué (erreur 404?)`);
            }
        } catch (error) {
            console.error(`  ✗ Erreur ${exerciseId}:`, error);
        }
    });
    
    await Promise.all(promises);
}

// === PARSER LATEX (inspiré de MathALÉA) ===

function latexToHtml(latex, exerciceId) {
    let html = latex;

    // ⚠️ IMPORTANT : Préserver les formules mathématiques AVANT toute autre conversion
    // MathALÉA préserve les formules pour que KaTeX les traite ensuite

    // Nettoyer les commentaires LaTeX EN PREMIER (avant toute autre conversion)
    // Les commentaires LaTeX commencent par % et vont jusqu'à la fin de la ligne
    // IMPORTANT: faire ceci AVANT de convertir \% en % pour éviter de supprimer les pourcentages
    html = html.replace(/%[^\n]*/g, '');

    // ÉTAPE 1: Protéger les formules mathématiques en les remplaçant par des placeholders
    const mathFormulas = [];
    let mathCounter = 0;

    // Protéger les formules display mode \[ \]
    html = html.replace(/\\\[([\s\S]*?)\\\]/g, (match) => {
        const placeholder = `___MATH_DISPLAY_${mathCounter}___`;
        mathFormulas[mathCounter] = match;
        mathCounter++;
        return placeholder;
    });

    // Protéger les formules inline mode \( \)
    html = html.replace(/\\\(([\s\S]*?)\\\)/g, (match) => {
        const placeholder = `___MATH_INLINE_${mathCounter}___`;
        mathFormulas[mathCounter] = match;
        mathCounter++;
        return placeholder;
    });

    // Protéger les formules $$ ... $$
    html = html.replace(/\$\$([\s\S]*?)\$\$/g, (match) => {
        const placeholder = `___MATH_DISPLAY_${mathCounter}___`;
        mathFormulas[mathCounter] = match;
        mathCounter++;
        return placeholder;
    });

    // Protéger les formules $ ... $
    html = html.replace(/\$([^\$]+?)\$/g, (match) => {
        const placeholder = `___MATH_INLINE_${mathCounter}___`;
        mathFormulas[mathCounter] = match;
        mathCounter++;
        return placeholder;
    });

    // Nettoyer les commandes de taille de police LaTeX (à ignorer pour HTML/KaTeX)
    html = html.replace(/\\Large\s*/g, '');
    html = html.replace(/\\large\s*/g, '');
    html = html.replace(/\\small\s*/g, '');
    html = html.replace(/\\tiny\s*/g, '');
    html = html.replace(/\\scriptsize\s*/g, '');
    html = html.replace(/\\footnotesize\s*/g, '');
    html = html.replace(/\\normalsize\s*/g, '');
    html = html.replace(/\\huge\s*/g, '');
    html = html.replace(/\\Huge\s*/g, '');

    // Nettoyer les commandes d'espacement LaTeX
    html = html.replace(/\\vspace\*?\{[^}]*\}/g, '');
    html = html.replace(/\\hspace\*?\{[^}]*\}/g, ' ');
    html = html.replace(/\\vskip[^\n]*/g, '');
    html = html.replace(/\\quad/g, ' ');
    html = html.replace(/\\qquad/g, '  ');

    // Commandes LaTeX simples → HTML (en évitant les formules math)
    html = html.replace(/\\textbf\{([^}]*)\}/g, '<strong>$1</strong>');
    html = html.replace(/\\textit\{([^}]*)\}/g, '<em>$1</em>');
    html = html.replace(/\\emph\{([^}]*)\}/g, '<em>$1</em>');
    // Guillemets français : gérer \og et \fg avec ou sans accolades
    html = html.replace(/\\og\{\}/g, '«');
    html = html.replace(/\\fg\{\}/g, '»');
    html = html.replace(/\\og\s+/g, '« ');
    html = html.replace(/\\fg\s+/g, ' »');
    html = html.replace(/\\medskip/gi, '<br>');
    html = html.replace(/\\bigskip/gi, '<br><br>');
    html = html.replace(/\\smallskip/gi, '<br>');
    html = html.replace(/\\no\s+/g, 'n°');
    // Conversion \np avec ou sans paramètre optionnel : \np[cm]{29} → 29 cm
    html = html.replace(/\\np\[([^\]]*)\]\{([^}]*)\}/g, '$2 $1');
    html = html.replace(/\\np\{([^}]*)\}/g, '$1');
    html = html.replace(/\\text\{([^}]*)\}/g, '$1');
    html = html.replace(/\\hfill/g, ' ');
    html = html.replace(/\\degres/g, '°');
    html = html.replace(/\\euro/g, '€');
    
    // Convertir les exposants \up{e} en <sup>e</sup>
    html = html.replace(/\\up\{([^}]*)\}/g, '<sup>$1</sup>');
    
    html = html.replace(/\\,/g, ' ');
    html = html.replace(/~/g, ' ');
    html = html.replace(/\\\s+/g, ' ');
    html = html.replace(/\\%/g, '%');

    // Convertir les environnements math LaTeX vers le format KaTeX
    // \( \) pour inline, \[ \] pour display
    // Si le LaTeX utilise déjà $ ou $$, les préserver
    // Si le LaTeX utilise \begin{equation}, convertir en \[ \]
    html = html.replace(/\\begin\{equation\*?\}[\s\S]*?\\end\{equation\*?\}/g, (match) => {
        const content = match.replace(/\\begin\{equation\*?\}/g, '').replace(/\\end\{equation\*?\}/g, '').trim();
        return `\\[${content}\\]`;
    });
    html = html.replace(/\\begin\{align\*?\}[\s\S]*?\\end\{align\*?\}/g, (match) => {
        const content = match.replace(/\\begin\{align\*?\}/g, '').replace(/\\end\{align\*?\}/g, '').trim();
        return `\\[${content}\\]`;
    });
    
    // Convertir les listes LaTeX en HTML
    // 1. Convertir \begin{enumerate}...\end{enumerate} en <ol>...</ol>
    html = html.replace(/\\begin\{enumerate\}(?:\[[^\]]*\])?([\s\S]*?)\\end\{enumerate\}/gi, (match, content) => {
        // Découper par \item
        const items = content.split(/\\item\s*/);
        let listHtml = '<ol class="latex-enumerate">';
        for (let i = 1; i < items.length; i++) {
            if (items[i].trim()) {
                listHtml += `<li>${items[i].trim()}</li>`;
            }
        }
        listHtml += '</ol>';
        return listHtml;
    });

    // 2. Convertir \begin{itemize}...\end{itemize} en <ul>...</ul>
    html = html.replace(/\\begin\{itemize\}(?:\[[^\]]*\])?([\s\S]*?)\\end\{itemize\}/gi, (match, content) => {
        // Découper par \item
        const items = content.split(/\\item\s*/);
        let listHtml = '<ul class="latex-itemize">';
        for (let i = 1; i < items.length; i++) {
            if (items[i].trim()) {
                listHtml += `<li>${items[i].trim()}</li>`;
            }
        }
        listHtml += '</ul>';
        return listHtml;
    });

    // 3. Nettoyer les \item résiduels (au cas où)
    html = html.replace(/\\item\s*/g, '');
    html = html.replace(/\\begin\{description\}/gi, '');
    html = html.replace(/\\end\{description\}/gi, '');
    html = html.replace(/\\begin\{minipage\}[\s\S]*?\{[\s\S]*?\}/gi, '');
    html = html.replace(/\\end\{minipage\}/gi, '');
    // Supprimer les commandes multicols (non supportées par KaTeX)
    html = html.replace(/\\begin\{multicols\}\{[^}]*\}/gi, '');
    html = html.replace(/\\end\{multicols\}/gi, '');
    html = html.replace(/\\columnbreak/gi, ' ');
    html = html.replace(/\\newline/gi, '<br>');
    html = html.replace(/\\break/gi, '<br>');
    html = html.replace(/\\vspace\{[^}]*\}/gi, '');
    html = html.replace(/\\hspace\{[^}]*\}/gi, ' ');

    // Nettoyer les caractères invisibles (zero-width space, etc.)
    html = html.replace(/[\u200B-\u200D\uFEFF]/g, '');
    
    // Réparer les formules mathématiques coupées (ajouter le délimiteur manquant)
    // Remplacer \$ échappé par $ simple dans les formules mathématiques
    // Pattern $...\$ devient $...$
    html = html.replace(/\$([^$]*?)\\$/g, '$$1$');
    
    // Si on a $... sans le $ de fermeture, l'ajouter
    // Compter les $ non échappés
    let dollarCount = 0;
    for (let i = 0; i < html.length; i++) {
        if (html[i] === '$' && (i === 0 || html[i-1] !== '\\')) {
            dollarCount++;
        }
    }
    if (dollarCount % 2 !== 0) {
        // Nombre impair de $, il en manque un
        html += '$';
    }
    // Même chose pour \( \)
    const parenMatches = (html.match(/\\\(/g) || []).length;
    const closeParenMatches = (html.match(/\\\)/g) || []).length;
    if (parenMatches > closeParenMatches) {
        html += '\\)';
    }
    // Même chose pour \[ \]
    const bracketMatches = (html.match(/\\\[/g) || []).length;
    const closeBracketMatches = (html.match(/\\\]/g) || []).length;
    if (bracketMatches > closeBracketMatches) {
        html += '\\]';
    }
    
    // Nettoyer les sauts de ligne
    html = html.replace(/\n\s*\n/g, '<br>');

    // Nettoyage final des artefacts résiduels
    html = html.replace(/\$\s*\}/g, '');  // $ suivis de }
    html = html.replace(/\{\s*\$\s*\}/g, '');  // {$}
    html = html.replace(/_[a-zA-Z]\$\}/g, '');  // _x$}
    html = html.replace(/\}\s*\$\s*\}/g, '}');  // }$}
    html = html.replace(/\s{3,}/g, ' ');  // Espaces multiples
    html = html.replace(/\(\s*\)\s*\(\s*\)/g, '');  // ()() vides
    html = html.replace(/\{\s*\}\s*\{\s*\}/g, '');  // {}{} vides

    // ÉTAPE FINALE: Restaurer les formules mathématiques protégées
    for (let i = 0; i < mathFormulas.length; i++) {
        const placeholder = `___MATH_DISPLAY_${i}___`;
        html = html.replace(placeholder, mathFormulas[i]);

        const placeholderInline = `___MATH_INLINE_${i}___`;
        html = html.replace(placeholderInline, mathFormulas[i]);
    }

    html = html.trim();

    return html;
}

// Fonction pour déclencher le rendu KaTeX sur un élément
function renderKatexInElement(element) {
    if (typeof renderMathInElement !== 'undefined') {
        renderMathInElement(element, {
            delimiters: [
                { left: '\\[', right: '\\]', display: true },
                { left: '\\(', right: '\\)', display: false },
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false }
            ],
            throwOnError: false,
            errorColor: '#CC0000',
            strict: 'warn',
            trust: false
        });
    }
}

// Fonction pour déclencher le rendu Scratchblocks sur un élément
function renderScratchblocksInElement(element) {
    if (typeof scratchblocks !== 'undefined') {
        // Trouver tous les éléments <pre class="blocks"> dans l'élément
        const blocks = element.querySelectorAll('pre.blocks');
        blocks.forEach(block => {
            try {
                // Rendre le bloc Scratch
                scratchblocks.renderMatching('pre.blocks', {
                    style: 'scratch3',
                    languages: ['en'],
                    scale: 0.75
                });
            } catch (e) {
                console.error('Erreur rendu scratchblocks:', e);
            }
        });
    }
}

function cleanComplexLatex(latex, exerciceId) {
    let cleaned = latex;

    const badge = (emoji, label) =>
        `<span style="display: inline-flex; align-items: center; gap: 4px; padding: 4px 8px; background: #e3f2fd; border: 1px solid #90caf9; border-radius: 12px; font-size: 11px; color: #1976d2; font-weight: 600;">
            <span>${emoji}</span>
            <span>${label}</span>
        </span>`;

    // Supprimer TOUS les environnements complexes
    cleaned = cleaned.replace(/\\begin\{center\}[\s\S]*?\\end\{center\}/gi, '');

    // Gérer les environnements pspicture et pspicture* (graphiques PSTricks)
    // Utiliser un regex plus robuste qui capture même du contenu mal formaté
    cleaned = cleaned.replace(/\\begin\{pspicture\*?\}[\s\S]*?\\end\{pspicture\*?\}/gi, badge('📐', 'Figure graphique'));

    // Nettoyer les fragments de pspicture isolés (cas où le \begin ou \end manque)
    cleaned = cleaned.replace(/\\begin\{pspicture\*?\}[\s\S]{0,500}?(?=\\begin|$)/gi, badge('📐', 'Figure graphique'));

    // Nettoyer les commandes PST résiduelles qui pourraient rester
    cleaned = cleaned.replace(/\\pspicture\*?\([^)]*\)\([^)]*\)/gi, '');
    cleaned = cleaned.replace(/\\psplot[\s\S]*?\}/gi, '');
    cleaned = cleaned.replace(/\\ps[a-z]+\{[^}]*\}/gi, '');
    cleaned = cleaned.replace(/\\ps[a-z]+\[[^\]]*\]/gi, '');

    // Nettoyer les $ isolés ou mal formés qui restent après suppression de graphiques
    cleaned = cleaned.replace(/\$\s*\}/g, '');
    cleaned = cleaned.replace(/\{\s*\$\s*\}/g, '');

    // Traiter les blocs Scratch avec scratchblocks
    cleaned = cleaned.replace(/\\begin\{scratch\}([\s\S]*?)\\end\{scratch\}/gi, (match, content) => {
        // Nettoyer le contenu : soit c'est déjà du texte scratchblocks, soit ce sont des commandes LaTeX
        let scratchCode = content.trim();

        // Si le contenu contient des commandes LaTeX (\block...), les convertir
        if (scratchCode.includes('\\block')) {
            scratchCode = scratchCode
                .replace(/\\blockinitclone/g, 'when I start as a clone')
                .replace(/\\blockinit/g, 'when green flag clicked')
                .replace(/\\blockrepeat\{([^}]*)\}\{/g, 'repeat ($1)\n')
                .replace(/\\blockmove\{([^}]*)\}/g, 'move ($1) steps')
                .replace(/\\blockif\{([^}]*)\}\{/g, 'if <$1> then\n')
                .replace(/\\blockelse\{([^}]*)\}\{([^}]*)\}\{/g, 'if <$1> then\n$2\nelse\n')
                .replace(/\\blockturn\{([^}]*)\}/g, 'turn cw ($1) degrees')
                .replace(/\\blocksay\{([^}]*)\}/g, 'say [$1]')
                .replace(/\\blockwait\{([^}]*)\}/g, 'wait ($1) seconds')
                .replace(/\\blockglide\{([^}]*)\}\{([^}]*)\}\{([^}]*)\}/g, 'glide ($1) secs to x: ($2) y: ($3)')
                .replace(/\\blockgoto\{([^}]*)\}\{([^}]*)\}/g, 'go to x: ($1) y: ($2)')
                .replace(/\\blocksetvar\{([^}]*)\}\{([^}]*)\}/g, 'set [$1 v] to ($2)')
                .replace(/\\blockchangevar\{([^}]*)\}\{([^}]*)\}/g, 'change [$1 v] by ($2)')
                .replace(/\}/g, '\nend')
                .replace(/\n+/g, '\n')
                .trim();
        }

        // Retourner un élément pre avec classe "blocks" pour scratchblocks
        return `<pre class="blocks" style="margin: 10px 0;">${scratchCode}</pre>`;
    });

    // Remplacer les tableaux complexes par un badge
    cleaned = cleaned.replace(/\\begin\{tabular[x]?\}[\s\S]*?\\end\{tabular[x]?\}/gi, badge('📊', 'Tableau'));
    cleaned = cleaned.replace(/\\begin\{longtable\}[\s\S]*?\\end\{longtable\}/gi, badge('📊', 'Tableau'));

    // Remplacer les environnements graphiques complexes
    cleaned = cleaned.replace(/\\pstree[\s\S]*?(?=\\item|\\end|$)/gi, badge('🌳', 'Arbre'));
    cleaned = cleaned.replace(/\\psset\{[^}]*\}/gi, '');
    cleaned = cleaned.replace(/\\ps[a-z]+(\[[^\]]*\])?(\([^\)]*\))?(\{[^}]*\})?/gi, '');
    cleaned = cleaned.replace(/\\parbox[\s\S]*?\{[\s\S]*?\}/gi, '');
    cleaned = cleaned.replace(/\\rput[\s\S]*?\{[^}]*\}/gi, '');
    cleaned = cleaned.replace(/\\uput[\s\S]*?\{[^}]*\}/gi, '');

    // Convertir les listes LaTeX en HTML (IMPORTANT: AVANT la suppression!)
    // 1. Convertir \begin{enumerate}...\end{enumerate} en <ol>...</ol>
    cleaned = cleaned.replace(/\\begin\{enumerate\}(?:\[[^\]]*\])?([\s\S]*?)\\end\{enumerate\}/gi, (match, content) => {
        const items = content.split(/\\item\s*/);
        let listHtml = '<ol class="latex-enumerate">';
        for (let i = 1; i < items.length; i++) {
            if (items[i].trim()) {
                listHtml += `<li>${items[i].trim()}</li>`;
            }
        }
        listHtml += '</ol>';
        return listHtml;
    });

    // 2. Convertir \begin{itemize}...\end{itemize} en <ul>...</ul>
    cleaned = cleaned.replace(/\\begin\{itemize\}(?:\[[^\]]*\])?([\s\S]*?)\\end\{itemize\}/gi, (match, content) => {
        const items = content.split(/\\item\s*/);
        let listHtml = '<ul class="latex-itemize">';
        for (let i = 1; i < items.length; i++) {
            if (items[i].trim()) {
                listHtml += `<li>${items[i].trim()}</li>`;
            }
        }
        listHtml += '</ul>';
        return listHtml;
    });

    // 3. Nettoyer les \item résiduels (au cas où)
    cleaned = cleaned.replace(/\\item\s*/g, '');
    cleaned = cleaned.replace(/\\begin\{description\}/gi, '');
    cleaned = cleaned.replace(/\\end\{description\}/gi, '');
    cleaned = cleaned.replace(/\\begin\{minipage\}[\s\S]*?\{[\s\S]*?\}/gi, '');
    cleaned = cleaned.replace(/\\end\{minipage\}/gi, '');

    // Remplacer les array en mode math par un badge (car complexe avec KaTeX)
    cleaned = cleaned.replace(/\\begin\{array\}[\s\S]*?\\end\{array\}/gi, badge('📐', 'Matrice'));
    
    // Supprimer les commentaires LaTeX
    cleaned = cleaned.replace(/%[^\n]*/g, '');
    
    // Nettoyer les espaces LaTeX spéciaux
    cleaned = cleaned.replace(/\\,/g, ' ');
    cleaned = cleaned.replace(/~+/g, ' ');
    cleaned = cleaned.replace(/\\\s+/g, ' ');
    
    // Nettoyer les retours à la ligne multiples
    cleaned = cleaned.replace(/\n\s*\n\s*\n/g, '\n\n');
    cleaned = cleaned.trim();
    
    return cleaned;
}

function parseLatexQuestions(latexContent, latexCorrection, exerciceId) {
    // Vérifier si le contenu est du HTML (erreur 404)
    if (latexContent.trim().toLowerCase().startsWith('<!doctype') || latexContent.trim().toLowerCase().startsWith('<html')) {
        console.warn('⚠️ Fichier LaTeX non disponible (erreur 404)');
        return null;
    }
    
    if (latexCorrection && (latexCorrection.trim().toLowerCase().startsWith('<!doctype') || latexCorrection.trim().toLowerCase().startsWith('<html'))) {
        console.warn('⚠️ Fichier LaTeX de correction non disponible (erreur 404)');
        latexCorrection = '';
    }
    
    const enonces = [];
    const corrections = [];
    
    // Fonction helper pour extraire les items
    function extractItems(content, isEnonce) {
        const items = [];

        // Nettoyer les commentaires LaTeX AVANT de parser
        // Les commentaires LaTeX commencent par % et vont jusqu'à la fin de la ligne
        content = content.replace(/%[^\n]*/g, '');

        // Fonction pour extraire TOUS les blocs enumerate de niveau 0 (pas imbriqués)
        function extractAllEnumerateBlocks(text) {
            const blocks = [];
            let searchPos = 0;

            while (searchPos < text.length) {
                // Chercher le prochain \begin{enumerate}
                const beginMatch = text.substring(searchPos).match(/\\begin\{enumerate\}(?:\[([^\]]*)\])?/i);
                if (!beginMatch) {
                    break; // Plus de blocs enumerate
                }

                const blockStart = searchPos + beginMatch.index;
                const headerLength = beginMatch[0].length;

                // Extraire le paramètre [start=N] s'il existe
                let startNumber = 1;
                if (beginMatch[1]) {
                    const startMatch = beginMatch[1].match(/start\s*=\s*(\d+)/i);
                    if (startMatch) {
                        startNumber = parseInt(startMatch[1]);
                    }
                }

                const contentStart = blockStart + headerLength;
                let depth = 1;
                let pos = contentStart;

                // Parcourir le texte en comptant les niveaux d'imbrication
                while (pos < text.length && depth > 0) {
                    const remainingText = text.substring(pos);

                    // Chercher le prochain \begin{enumerate} ou \end{enumerate}
                    const nextBegin = remainingText.search(/\\begin\{enumerate\}/i);
                    const nextEnd = remainingText.search(/\\end\{enumerate\}/i);

                    if (nextEnd === -1) {
                        console.warn('⚠️ Bloc enumerate mal formé - pas de \\end{enumerate}');
                        break;
                    }

                    // Le prochain tag est-il un begin ou un end?
                    if (nextBegin !== -1 && nextBegin < nextEnd) {
                        // C'est un \begin imbriqué - augmenter la profondeur
                        depth++;
                        pos += nextBegin + 17;
                    } else {
                        // C'est un \end - diminuer la profondeur
                        depth--;
                        if (depth === 0) {
                            // Bloc trouvé !
                            blocks.push({
                                content: text.substring(contentStart, pos + nextEnd),
                                startNumber: startNumber
                            });
                            searchPos = pos + nextEnd + 15; // Continuer après ce bloc
                            break;
                        }
                        pos += nextEnd + 15;
                    }
                }

                if (depth > 0) {
                    // Bloc mal fermé, arrêter la recherche
                    break;
                }
            }

            return blocks;
        }

        // Trouver tous les blocs enumerate
        const enumerateBlocks = extractAllEnumerateBlocks(content);
        if (enumerateBlocks.length === 0) {
            // Pas de enumerate = exercice en bloc unique
            // Nettoyer le contenu et le retourner comme une seule question
            let cleanContent = cleanComplexLatex(content, exerciceId);
            cleanContent = latexToHtml(cleanContent, exerciceId);

            // Si le contenu est trop court ou vide, utiliser le PNG
            if (cleanContent.trim().length < 50) {
                const pngUrl = `https://coopmaths.fr/alea/static/dnb/${appState.dnbData[exerciceId].annee}/tex/png/${exerciceId}.png`;
                return [`<div style="padding: 15px; background: #e3f2fd; border: 2px solid #2196F3; border-radius: 8px; text-align: center;">
                    <p style="margin-bottom: 10px; font-weight: 600;">📋 Exercice complet (avec graphiques/tableaux)</p>
                    <img src="${pngUrl}" style="max-width: 100%; border-radius: 8px;" alt="Exercice complet">
                </div>`];
            }

            return [cleanContent];
        }

        // Fonction pour extraire les items de niveau 0 uniquement (en respectant les imbrications)
        function extractTopLevelItems(text) {
            const topItems = [];
            let pos = 0;
            let depth = 0; // Profondeur d'imbrication enumerate/itemize

            // Trouver tous les \item en comptant la profondeur
            while (pos < text.length) {
                // Chercher le prochain \item
                const itemMatch = text.substring(pos).match(/\\item[\s\n\r\t]*/);

                // Chercher les prochains \begin{enumerate} et \begin{itemize}
                const nextEnumBegin = text.substring(pos).search(/\\begin\{enumerate\}/i);
                const nextItemBegin = text.substring(pos).search(/\\begin\{itemize\}/i);

                // Chercher les prochains \end{enumerate} et \end{itemize}
                const nextEnumEnd = text.substring(pos).search(/\\end\{enumerate\}/i);
                const nextItemEnd = text.substring(pos).search(/\\end\{itemize\}/i);

                // Déterminer quel est le prochain token
                let nextTokenPos = Infinity;
                let nextTokenType = null;

                if (itemMatch && (nextTokenPos > itemMatch.index)) {
                    nextTokenPos = itemMatch.index;
                    nextTokenType = 'item';
                }
                if (nextEnumBegin !== -1 && (nextTokenPos > nextEnumBegin)) {
                    nextTokenPos = nextEnumBegin;
                    nextTokenType = 'enumBegin';
                }
                if (nextItemBegin !== -1 && (nextTokenPos > nextItemBegin)) {
                    nextTokenPos = nextItemBegin;
                    nextTokenType = 'itemBegin';
                }
                if (nextEnumEnd !== -1 && (nextTokenPos > nextEnumEnd)) {
                    nextTokenPos = nextEnumEnd;
                    nextTokenType = 'enumEnd';
                }
                if (nextItemEnd !== -1 && (nextTokenPos > nextItemEnd)) {
                    nextTokenPos = nextItemEnd;
                    nextTokenType = 'itemEnd';
                }

                // Si aucun token trouvé, on a fini
                if (nextTokenType === null) break;

                // Traiter le token
                if (nextTokenType === 'enumBegin' || nextTokenType === 'itemBegin') {
                    depth++;
                    pos += nextTokenPos + (nextTokenType === 'enumBegin' ? 17 : 15);
                } else if (nextTokenType === 'enumEnd' || nextTokenType === 'itemEnd') {
                    depth--;
                    pos += nextTokenPos + 15;
                } else if (nextTokenType === 'item') {
                    if (depth === 0) {
                        // C'est un \item de niveau 0 - marquer sa position
                        topItems.push(pos + nextTokenPos + itemMatch[0].length);
                    }
                    pos += nextTokenPos + itemMatch[0].length;
                }
            }

            // Extraire le contenu entre chaque \item de niveau 0
            const items = [];
            for (let i = 0; i < topItems.length; i++) {
                const start = topItems[i];
                const end = i < topItems.length - 1 ? topItems[i + 1] : text.length;

                // Trouver le début du prochain \item pour exclure le mot-clé lui-même
                let content = text.substring(start, end).trim();

                // Supprimer le \item suivant s'il est à la fin
                content = content.replace(/\\item[\s\n\r\t]*$/, '').trim();

                if (content) {
                    items.push(content);
                }
            }

            return items;
        }

        // Fonction pour extraire le contenu d'un bloc enumerate imbriqué
        function extractNestedEnumerate(text) {
            const match = text.match(/\\begin\{enumerate\}(?:\[[^\]]*\])?([\s\S]*?)\\end\{enumerate\}/i);
            if (!match) return null;

            const beforeEnum = text.substring(0, match.index).trim();
            const enumContent = match[1];
            const afterEnum = text.substring(match.index + match[0].length).trim();

            return { beforeEnum, enumContent, afterEnum };
        }

        // Traiter tous les blocs enumerate
        let currentQuestionNumber = 1;

        enumerateBlocks.forEach((block) => {
            // Extraire les items de niveau 0 de ce bloc
            const topLevelItems = extractTopLevelItems(block.content);

            // Traiter chaque item de ce bloc
            topLevelItems.forEach((itemContent, blockIndex) => {
                if (!itemContent) return;

                // Le numéro de la question courante (utilise startNumber du bloc)
                const questionNumber = block.startNumber + blockIndex;

                // Vérifier si cet item contient un enumerate imbriqué (sous-questions)
                const nestedEnum = extractNestedEnumerate(itemContent);

                if (nestedEnum) {
                    // Cet item a des sous-questions - les séparer
                    const subParts = nestedEnum.enumContent.split(/\\item[\s\n\r\t]*/);

                    for (let j = 1; j < subParts.length; j++) {
                        let subContent = subParts[j].trim();
                        if (!subContent) continue;

                        // Pour la première sous-question, ajouter l'intro
                        if (j === 1 && nestedEnum.beforeEnum) {
                            subContent = nestedEnum.beforeEnum + '\n\n' + subContent;
                        }

                        // Nettoyer et convertir
                        subContent = cleanComplexLatex(subContent, exerciceId);
                        const htmlContent = latexToHtml(subContent, exerciceId);

                        // Ajouter avec métadonnées pour la numérotation
                        items.push({
                            content: htmlContent,
                            isSubQuestion: true,
                            parentNumber: questionNumber,
                            subIndex: j - 1,
                            subLetter: String.fromCharCode(96 + j) // a, b, c, d...
                        });
                    }
                } else {
                    // Item normal sans sous-questions
                    itemContent = cleanComplexLatex(itemContent, exerciceId);
                    const htmlContent = latexToHtml(itemContent, exerciceId);

                    items.push({
                        content: htmlContent,
                        isSubQuestion: false,
                        number: questionNumber
                    });
                }
            });
        });

        return items;
    }
    
    // Extraire les énoncés
    const enonceItems = extractItems(latexContent, true);

    // Extraire les corrections
    let correctionItems = latexCorrection ? extractItems(latexCorrection, false) : [];

    console.log(`📄 Parser: ${enonceItems.length} question(s) détectée(s) pour ${exerciceId}`);
    console.log(`📝 Parser: ${correctionItems.length} correction(s) trouvée(s) pour ${exerciceId}`);

    // Avertir si mismatch entre questions et corrections
    if (correctionItems.length > 0 && enonceItems.length !== correctionItems.length) {
        console.warn(`⚠️ Mismatch: ${enonceItems.length} questions mais ${correctionItems.length} corrections pour ${exerciceId}`);
    }

    return {
        enonces: enonceItems,
        corrections: correctionItems
    };
}

// Générer exercisesData depuis la sélection
function generateExercisesDataFromSelection() {
    console.log('🔧 Génération de exercisesData depuis le barème...');
    console.log('📋 exercisesData AVANT:', Object.keys(exercisesData), exercisesData);
    console.log('📋 appState.selectedAutomatismes:', appState.selectedAutomatismes);
    const newData = {};

    // 🎲 Réinitialiser le seed pour reproduire les mêmes valeurs aléatoires
    if (appState.exerciseSeed && window.mathaleaUtils) {
        window.mathaleaUtils.setSeed(appState.exerciseSeed);
        console.log('🎲 Seed réinitialisé pour régénération:', appState.exerciseSeed);
    }

    // 🎯 RECRÉER L'EXERCICE 1 (AUTOMATISMES) depuis appState
    if (appState.selectedAutomatismes && appState.selectedAutomatismes.length > 0) {
        console.log('✅ Recréation de l\'exercice 1 (automatismes) depuis appState');

        // Recréer l'exercice 1 exactement comme dans createExercise1FromAutomatismes()
        const selected = appState.selectedAutomatismes;
        const nbQuestions = selected.length;
        const pointsPerQuestion = distributePoints(6, nbQuestions);

        const questions = [];
        selected.forEach((autoId, index) => {
            const autoData = appState.automatismesData[autoId];

            if (!autoData) {
                console.warn(`⚠️ Automatisme ${autoId} introuvable`);
                return;
            }

            let statement, answer;

            if (typeof window.genererAutomatisme === 'function') {
                const generated = window.genererAutomatisme(autoId);
                if (generated !== null) {
                    statement = generated.question;
                    answer = generated.correction;
                } else {
                    statement = `<p><strong>${autoData.titre}</strong></p>`;
                    answer = `<p><em>Compétence à évaluer : ${autoData.titre}</em></p>`;
                }
            } else {
                statement = `<p><strong>${autoData.titre}</strong></p>`;
                answer = `<p><em>Compétence à évaluer : ${autoData.titre}</em></p>`;
            }

            questions.push({
                id: `q${index + 1}`,
                title: `Question ${index + 1}`,
                points: pointsPerQuestion[index],
                statement: statement,
                answer: answer,
                competences: [], // Pas de compétences par défaut, elles seront ajoutées via le barème
                metadata: {
                    autoId: autoId,
                    categorie: autoData.categorie,
                    titre: autoData.titre,
                    uuid: autoData.uuid,
                    url: autoData.url
                }
            });
        });

        newData[1] = {
            title: "📝 Exercice 1 - Automatismes",
            totalPoints: 6,
            questions: questions,
            isAutomatismes: true
        };

        console.log('✅ Exercice 1 recréé:', newData[1]);
    } else {
        console.warn('⚠️ Aucun automatisme sélectionné, exercice 1 non créé');
    }

    appState.selectedExercises.forEach((exerciseId, index) => {
        const parsed = appState.parsedExercises[exerciseId];
        if (!parsed) {
            console.warn(`⚠️ Exercice ${exerciseId} non parsé, ignoré`);
            return;
        }

        // 🔧 Commencer à 2 si l'exercice 1 existe, sinon à 1
        const exerciseNum = newData[1] ? index + 2 : index + 1;

        // 🔧 FIX: Le barème est stocké avec exerciseNum (ex: "2"), pas avec exerciseId (ex: "dnb_2025_09_metropole_2")
        const baremeData = appState.baremeConfig.exercises[exerciseNum.toString()];
        console.log(`🔍 Récupération barème pour Ex${exerciseNum}:`, baremeData);

        const questions = [];
        let totalPoints = baremeData ? baremeData.totalPoints : 0;

        console.log(`📊 Ex${exerciseNum} (${exerciseId}): totalPoints=${totalPoints}, baremeData exists=${!!baremeData}`);

        // Si pas de questions, créer une question unique avec le PNG
        if (!parsed.questions || parsed.questions.length === 0) {
            const pngUrl = `https://coopmaths.fr/alea/static/dnb/${parsed.metadata.annee}/tex/png/${exerciseId}.png`;
            questions.push({
                id: 'q1',
                title: 'Exercice complet',
                points: totalPoints,
                statement: `<img src="${pngUrl}" style="max-width: 100%; border-radius: 8px;" alt="Exercice ${exerciseId}">`,
                answer: "Voir correction complète",
                competences: []
            });
        } else {
            // Créer une question par item parsé avec les points et compétences du barème
            parsed.questions.forEach((qItem, qIndex) => {
                // Gérer les objets (nouvelle structure) et strings (rétrocompatibilité)
                const isObject = typeof qItem === 'object' && qItem !== null;
                const qText = isObject ? qItem.content : qItem;
                const isSubQuestion = isObject && qItem.isSubQuestion;

                // Déterminer le titre de la question
                let questionTitle;
                if (isSubQuestion) {
                    questionTitle = `Question ${qItem.parentNumber}.${qItem.subLetter}`;
                } else if (isObject && qItem.number) {
                    questionTitle = `Question ${qItem.number}`;
                } else {
                    questionTitle = `Question ${qIndex + 1}`;
                }

                const qKey = `q${qIndex}`;
                const qId = `q${qIndex + 1}`;

                // Récupérer la correction correspondante
                const corrItem = parsed.corrections && parsed.corrections[qIndex] ? parsed.corrections[qIndex] : '';
                const correction = typeof corrItem === 'object' ? corrItem.content : corrItem;

                // Récupérer les points de la question depuis le barème
                const questionPoints = baremeData && baremeData.questionPoints && baremeData.questionPoints[qKey]
                    ? baremeData.questionPoints[qKey]
                    : 1;

                // Récupérer les compétences de la question depuis le barème
                const questionCompetences = [];
                if (baremeData && baremeData.questionCompetences && baremeData.questionCompetences[qKey]) {
                    const selectedCompNames = baremeData.questionCompetences[qKey];

                    selectedCompNames.forEach(compName => {
                        const defaultComp = defaultCompetences.find(dc => dc.name === compName);
                        if (defaultComp) {
                            // Récupérer les points de la compétence depuis le barème
                            const compPoints = baremeData.questionCompetencePoints &&
                                             baremeData.questionCompetencePoints[qKey] &&
                                             baremeData.questionCompetencePoints[qKey][compName]
                                ? baremeData.questionCompetencePoints[qKey][compName]
                                : (questionPoints / selectedCompNames.length);

                            questionCompetences.push({
                                name: compName,
                                color: defaultComp.color,
                                description: defaultComp.description,
                                tooltip: defaultComp.tooltip,
                                points: compPoints,
                                increment: 0.5  // 🔧 FIX: Incrément de 0.5 pour correspondre aux points configurés
                            });
                        }
                    });
                }

                console.log(`  📝 ${questionTitle}: ${questionPoints} pts, ${questionCompetences.length} compétences`);

                questions.push({
                    id: qId,
                    title: questionTitle,
                    points: questionPoints,
                    statement: qText,
                    answer: correction || "Pas de correction disponible",
                    competences: questionCompetences
                });
            });
        }
        
        // Titre de l'exercice : utiliser le premier tag (thème) si disponible
        const metadata = parsed.metadata;
        let exerciseTitle = `Exercice ${exerciseNum}`;
        if (metadata.tags && metadata.tags.length > 0) {
            exerciseTitle = `Exercice ${exerciseNum} : ${metadata.tags[0]}`;
        }
        
        // Extraire les compétences uniques utilisées dans l'exercice
        const usedCompetences = [...new Set(
            questions.flatMap(q => q.competences.map(c => c.name))
        )];
        
        newData[exerciseNum] = {
            title: exerciseTitle,
            totalPoints: totalPoints,
            questions: questions,
            selectedCompetences: usedCompetences // Pré-sélectionner les compétences utilisées
        };
    });
    
    return newData;
}

// Générer dynamiquement les onglets d'exercices
function renderExerciseTabs() {
    console.log('🎯 renderExerciseTabs appelée');
    console.log('📊 exercisesData:', exercisesData);
    console.log('🔑 Clés de exercisesData:', Object.keys(exercisesData));
    console.log('📝 Exercice 1:', exercisesData[1]);

    const tabsContainer = document.getElementById('mainTabs');
    if (!tabsContainer) {
        console.error('❌ Container mainTabs non trouvé!');
        return;
    }
    
    tabsContainer.innerHTML = '';
    
    // Icônes par défaut pour les exercices
    const defaultIcons = ['📝', '📐', '🔢', '💻', '📊', '🎯', '📈', '🧮'];
    
    Object.keys(exercisesData).forEach((exerciseNum, index) => {
        const exercise = exercisesData[exerciseNum];
        const icon = defaultIcons[index] || '📝';
        const currentTab = (appState && appState.currentTab) || 'exercise1';
        const tabName = `exercise${exerciseNum}`;
        const isActive = currentTab === tabName;

        const button = document.createElement('button');
        button.className = `main-tab ${isActive ? 'active' : ''}`;
        button.dataset.tabName = tabName;
        button.onclick = () => showTab(tabName);
        
        // Extraire le thème du titre (en retirant "Exercice X -" si présent)
        let theme = `Ex ${exerciseNum}`;
        if (exercise.title) {
            const parts = exercise.title.split(':');
            if (parts.length > 1) {
                theme = parts[1].trim();
            } else {
                theme = exercise.title.replace(/^Exercice \d+\s*[-–—]?\s*/i, '').trim();
            }
        }
        // Préfixe : "Ex N — " pour les exercices normaux, rien pour les bonus
        // (leur titre contient déjà "BONUS N — ...")
        const isBonus = !!exercise.isBonus || /^bonus/i.test(exercise.title || '');
        // Mode Import PDF (option 3) UNIQUEMENT : respecter la numérotation officielle
        // portée par le titre (« Automatismes » non numéroté, « Exercice N — … » gardé
        // tel quel). Le DNB blanc (appState.pdfImport absent) conserve « Ex N — … ».
        const isPdfImportMode = !!(appState && appState.pdfImport);
        const rawTitle = (exercise.title || '').trim();
        let displayTitle;
        if (isBonus) {
            displayTitle = theme;
        } else if (isPdfImportMode && /^automatismes/i.test(rawTitle)) {
            displayTitle = theme;
        } else if (isPdfImportMode && /^exercice\s*\d+/i.test(rawTitle)) {
            displayTitle = rawTitle;
        } else {
            displayTitle = `Ex ${exerciseNum} — ${theme}`;
        }
        button.innerHTML = `
            <span class="tab-icon">${icon}</span>
            <span>${displayTitle}</span>
        `;
        
        tabsContainer.appendChild(button);
    });
}

// Générer dynamiquement les contenus des onglets d'exercices
function renderExerciseTabContents() {
    const container = document.getElementById('exerciseTabsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    Object.keys(exercisesData).forEach((exerciseNum, index) => {
        const isFirst = index === 0;
        
        const tabContent = document.createElement('div');
        tabContent.className = `tab-content ${isFirst ? 'active' : ''}`;
        tabContent.id = `exercise${exerciseNum}Tab`;
        
        const exerciseContent = document.createElement('div');
        exerciseContent.className = 'exercise-content';
        exerciseContent.id = `exercise${exerciseNum}Content`;
        exerciseContent.innerHTML = '<!-- Contenu généré dynamiquement -->';
        
        tabContent.appendChild(exerciseContent);
        container.appendChild(tabContent);
    });
}

// Compétences prédéfinies avec icônes - var pour scope global
var defaultCompetences = [
    { name: "Calculer", icon: "🧮", color: "#28a745", description: "Effectuer des calculs numériques et littéraux" },
    { name: "Modéliser", icon: "📊", color: "#17a2b8", description: "Traduire en langage mathématique une situation" },
    { name: "Représenter", icon: "📈", color: "#6f42c1", description: "Créer des représentations graphiques, schémas" },
    { name: "Raisonner", icon: "🤔", color: "#dc3545", description: "Tenir une démarche logique, argumenter" },
    { name: "Communiquer", icon: "✓", color: "#ffc107", description: "Expliquer, justifier, présenter une solution" },
    { name: "Chercher", icon: "🔍", color: "#fd7e14", description: "Identifier et mettre en œuvre une stratégie" }
];

// Variables pour les modaux
let modalExerciseId = null;
let modalQuestionId = null;
let modalCompetenceIndex = null;
let pendingExerciseId = null;
let pendingQuestionId = null;

// === FONCTIONS DE CONFIGURATION ===
function updateCandidatesPreview() {
    const startValue = document.getElementById('startNumber').value;
    const endValue = document.getElementById('endNumber').value;
    
    if (!startValue || !endValue) {
        document.getElementById('candidatesPreview').textContent = 
            'Saisissez les numéros de début et de fin pour voir l\'aperçu';
        return;
    }
    
    const start = parseInt(startValue);
    const end = parseInt(endValue);
    const count = Math.max(0, end - start + 1);
    
    document.getElementById('candidatesPreview').textContent = 
        `${count} candidats seront générés (du n°${start} au n°${end})`;
}

function generateCandidates() {
    appState.candidates = [];

    // Vérifier quelle méthode est active
    const isManual = document.getElementById('tabManual').classList.contains('active');

    if (isManual) {
        // Méthode manuelle
        const start = parseInt(document.getElementById('startNumber').value);
        const end = parseInt(document.getElementById('endNumber').value);
        
        if (!start || !end || start > end) {
            alert('Veuillez saisir des numéros valides');
            return;
        }

        // Sauvegarder les valeurs pour le développement
        localStorage.setItem('dnb_dev_startNumber', start);
        localStorage.setItem('dnb_dev_endNumber', end);

        for (let i = start; i <= end; i++) {
            appState.candidates.push({
                number: i,
                active: true
            });
        }
    } else {
        // Méthode CSV
        if (!csvCandidates || csvCandidates.length === 0) {
            alert('Veuillez d\'abord importer un fichier CSV');
            return;
        }

        csvCandidates.forEach(num => {
            const entry = { number: num, active: true };
            const name = (window.candidateNamesMap || {})[num];
            if (name) entry.name = name;
            appState.candidates.push(entry);
        });
    }

    appState.activeCandidates = [...appState.candidates];

    renderCandidatesGrid();
    updateCandidatesStats();

    // Afficher la page de validation des candidats (pas encore l'étape 5)
    showPage('candidatesPage');
}

function renderCandidatesGrid() {
    const grid = document.getElementById('candidatesGrid');
    grid.innerHTML = '';

    appState.candidates.forEach(candidate => {
        const card = document.createElement('div');
        card.className = `candidate-card ${candidate.active ? '' : 'eliminated'}`;
        card.onclick = () => toggleCandidate(candidate.number);
        
        const cname = (window.candidateNamesMap || {})[candidate.number];
        card.innerHTML = `
            <div class="candidate-number">${candidate.number}</div>
            ${cname ? `<div class="candidate-name" style="font-size:0.8em;font-weight:600;margin-top:2px;">${cname}</div>` : ''}
            <div class="candidate-status">${candidate.active ? 'ACTIF' : 'ÉLIMINÉ'}</div>
        `;
        
        grid.appendChild(card);
    });
}

function toggleCandidate(number) {
    const candidate = appState.candidates.find(c => c.number === number);
    if (candidate) {
        candidate.active = !candidate.active;
        renderCandidatesGrid();
        updateCandidatesStats();
    }
}

function updateCandidatesStats() {
    const active = appState.candidates.filter(c => c.active).length;
    const eliminated = appState.candidates.filter(c => !c.active).length;
    const total = appState.candidates.length;

    document.getElementById('activeCount').textContent = active;
    document.getElementById('eliminatedCount').textContent = eliminated;
    document.getElementById('totalCount').textContent = total;
    document.getElementById('startCorrectionBtn').textContent = 
        `Commencer la correction (${active} candidats) →`;
}

function startCorrection() {
    appState.activeCandidates = appState.candidates.filter(c => c.active);

    if (appState.activeCandidates.length === 0) {
        alert('Aucun candidat actif sélectionné !');
        return;
    }

    // 🔧 Générer exercisesData depuis le barème et les exercices parsés
    // Si on vient de l'import PDF, exercisesData est déjà configuré par finalizePdfImport()
    if (appState.pdfImport && appState.pdfImport.exercises && appState.pdfImport.exercises.length > 0) {
        console.log('📄 Mode Import PDF : exercisesData déjà configuré, on ne régénère pas');
    } else {
        console.log('🎯 Génération de exercisesData avant la correction...');
        exercisesData = generateExercisesDataFromSelection();
    }
    console.log('✅ exercisesData:', exercisesData);

    // 🎯 Sélectionner automatiquement le mode "Par candidat" par défaut
    appState.correctionMode = 'candidate';
    appState.modeSelected = true;
    console.log('✅ Mode de correction par défaut: Par candidat');

    renderCandidatesOverview();

    // Passer à l'étape 5 (correction)
    completeStepAndNext(4);

    // Mettre à jour le sélecteur de mode après l'affichage de la page
    setTimeout(() => {
        const modeSelect = document.getElementById('correctionMode');
        if (modeSelect) {
            modeSelect.value = 'candidate';
            updateCorrectionMode();
        }
    }, 100);
}

// === FONCTIONS DE NAVIGATION ===
function loadCurrentCandidate() {
    const candidate = appState.activeCandidates[appState.currentCandidateIndex];
    const titleElement = document.getElementById('currentCandidateTitle');
    
    // 🎯 Mise en évidence du candidat (nom Pronote s'il existe, sinon numéro)
    const candidateLabel = candidate.name || (window.candidateNamesMap || {})[candidate.number] || ('n°' + candidate.number);
    titleElement.innerHTML = `
        Correction de
        <span style="
            color: #007bff;
            font-weight: bold;
            background: linear-gradient(135deg, #e3f2fd, #bbdefb);
            padding: 4px 12px;
            border-radius: 20px;
            border: 2px solid #007bff;
            box-shadow: 0 2px 8px rgba(0, 123, 255, 0.3);
            animation: candidateHighlight 0.6s ease-out;
        ">${candidateLabel}</span>
    `;
    
    // Réinitialiser la compétence en cours quand on change de candidat
    currentlyEditingCompetence = null;
    
    updateTotalScore();
    // updateNavigationLabels avant updateNavigationButtons pour que la
    // personnalisation par nom (dans updateNavigationButtons) écrase le label générique
    updateNavigationLabels();
    updateNavigationButtons();
    renderCurrentExercise();
    updateAllProgressIndicators();
}

function showTab(tabName) {
    appState.currentTab = tabName;
    
    // Synchroniser l'index de l'exercice
    if (tabName.startsWith('exercise')) {
        appState.currentExerciseIndex = parseInt(tabName.replace('exercise', ''));
    }
    
    // Réinitialiser la compétence en cours quand on change d'exercice
    currentlyEditingCompetence = null;
    
    // Mise à jour des onglets - méthode compatible avec les onglets dynamiques
    document.querySelectorAll('.main-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Trouver l'onglet correspondant via dataset.tabName
    const targetTab = document.querySelector(`.main-tab[data-tab-name="${tabName}"]`);
    if (targetTab) {
        targetTab.classList.add('active');
    }

    // Mise à jour du contenu
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    if (tabName === 'admin') {
        document.getElementById('adminTab').classList.add('active');
    } else {
        const exerciseNumber = tabName.replace('exercise', '');
        document.getElementById(`exercise${exerciseNumber}Tab`).classList.add('active');
        renderExerciseContent(parseInt(exerciseNumber));
    }
    
    // Mettre à jour les boutons de navigation
    updateNavigationButtons();
}

// === RENDU DU CONTENU ADMIN ===
function renderAdminContent() {
    const container = document.getElementById('adminExercises');
    // Protection : Si l'élément n'existe pas, ne rien faire
    if (!container) {
        console.log('⚠️ Element adminExercises non trouvé - fonction ignorée');
        return;
    }
    container.innerHTML = '';

    Object.entries(exercisesData).forEach(([exerciseId, exercise]) => {
        const exerciseDiv = document.createElement('div');
        exerciseDiv.className = 'exercise-admin';
        
        exerciseDiv.innerHTML = `
            <div class="exercise-admin-header">
                <span>${exercise.title}</span>
                <span>Total : ${exercise.totalPoints} pts</span>
            </div>
            
            <!-- Sélection des compétences pour l'exercice -->
            <div class="exercise-competences-selector" style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin: 15px 0; border: 2px solid #dee2e6;">
                <label style="display: block; font-weight: bold; margin-bottom: 10px; color: #495057;">
                    🎯 Compétences évaluées dans cet exercice :
                </label>
                <div class="competences-buttons" id="exercise_competences_${exerciseId}" style="display: flex; flex-wrap: wrap; gap: 10px;">
                    ${defaultCompetences.map((comp, idx) => {
                        const isSelected = exercise.selectedCompetences && exercise.selectedCompetences.includes(comp.name);
                        return `
                            <button type="button" 
                                    class="competence-select-btn ${isSelected ? 'selected' : ''}"
                                    data-competence="${comp.name}"
                                    onclick="toggleExerciseCompetence(${exerciseId}, '${comp.name}')"
                                    style="
                                        padding: 10px 16px;
                                        border: 2px solid ${comp.color};
                                        background: ${isSelected ? comp.color : 'white'};
                                        color: ${isSelected ? 'white' : comp.color};
                                        border-radius: 20px;
                                        font-weight: 600;
                                        cursor: pointer;
                                        transition: all 0.2s ease;
                                        display: flex;
                                        align-items: center;
                                        gap: 6px;
                                    ">
                                <span style="font-size: 16px;">${comp.icon}</span>
                                <span>${comp.name}</span>
                            </button>
                        `;
                    }).join('')}
                </div>
                <button type="button" 
                        class="apply-competences-btn"
                        onclick="applyCompetencesToAllQuestions(${exerciseId})"
                        style="
                            margin-top: 12px;
                            padding: 8px 16px;
                            background: #28a745;
                            color: white;
                            border: none;
                            border-radius: 6px;
                            font-weight: 600;
                            cursor: pointer;
                        ">
                    ✓ Appliquer ces compétences à toutes les questions
                </button>
            </div>
            
            <div class="exercise-admin-content">
                ${exercise.questions.map(question => `
                    <div class="question-admin">
                        <div class="question-admin-header">
                            <span class="question-admin-title">${question.title}</span>
                            <div>
                                <input type="number" class="points-admin-input"
                                       value="${question.points}"
                                       onchange="updateQuestionPointsAdmin(${exerciseId}, '${question.id}', this.value)"
                                       min="0" max="20" step="0.5"> pts
                            </div>
                        </div>
                        
                        <label><strong>Énoncé :</strong></label>
                        <textarea class="editable-field statement" 
                                  onchange="updateQuestionStatement(${exerciseId}, '${question.id}', this.value)"
                                  placeholder="Énoncé de la question...">${question.statement}</textarea>
                        
                        <label><strong>Correction :</strong></label>
                        <textarea class="editable-field answer" 
                                  onchange="updateQuestionAnswer(${exerciseId}, '${question.id}', this.value)"
                                  placeholder="Correction détaillée...">${question.answer}</textarea>
                        
                        <label><strong>Compétences évaluées :</strong></label>
                        <div class="competences-admin" id="competences_${exerciseId}_${question.id}">
                            ${question.competences.map((comp, index) => {
                                const defaultComp = defaultCompetences.find(dc => dc.name === comp.name.split(' ')[0]);
                                const icon = defaultComp ? defaultComp.icon : '📋';
                                return `
                                <div class="competence-item" 
                                     style="cursor: pointer; padding: 12px; background: ${comp.color}; color: white; border-radius: 25px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; border: 2px solid ${comp.color};"
                                     onclick="openCompetenceModal(${exerciseId}, '${question.id}', ${index})">
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <span style="font-size: 16px;">${icon}</span>
                                        <span style="font-weight: bold;">${comp.name}</span>
                                        <span style="margin-left: 10px; font-size: 0.8em;">Max: ${comp.points}pt${comp.points > 1 ? 's' : ''}</span>
                                        <input type="number" class="competence-increment-input" 
                                           value="${comp.increment || 1}" 
                                           onchange="updateCompetenceIncrement(${exerciseId}, '${question.id}', ${index}, this.value)"
                                           onclick="event.stopPropagation()"
                                           min="0.5" max="5" step="0.5" title="Incrément par clic">
                                        <span style="font-size: 0.8em;">inc</span>
                                    </div>
                                    <button type="button" onclick="event.stopPropagation(); removeCompetence(${exerciseId}, '${question.id}', ${index})" 
                                            class="competence-remove-btn">×</button>
                                </div>
                            `;
                            }).join('')}
                            <button type="button" class="add-competence-btn" 
                                    onclick="openCompetenceSelectionModal(${exerciseId}, '${question.id}')">+ Ajouter compétence</button>
                            
                            <div id="validation_${exerciseId}_${question.id}" style="margin-top: 10px; padding: 8px; border-radius: 4px; font-weight: bold; text-align: center;">
                                <!-- Validation automatique -->
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        
        container.appendChild(exerciseDiv);
    });
    
    // Déclencher la validation pour toutes les questions après le rendu
    setTimeout(() => {
        Object.entries(exercisesData).forEach(([exerciseId, exercise]) => {
            exercise.questions.forEach(question => {
                validateQuestionPoints(exerciseId, question.id);
            });
        });
    }, 100);
}

// === FONCTIONS UTILITAIRES ===
function getCandidateQuestionScore(candidateNumber, exerciseNumber, questionId) {
    if (!appState.scores[candidateNumber]) return 0;
    if (!appState.scores[candidateNumber][exerciseNumber]) return 0;
    if (!appState.scores[candidateNumber][exerciseNumber][questionId]) return 0;
    return appState.scores[candidateNumber][exerciseNumber][questionId].score || 0;
}

function getCandidateCompetenceScore(candidateNumber, exerciseNumber, questionId, competenceName) {
    if (!appState.scores[candidateNumber]) return 0;
    if (!appState.scores[candidateNumber][exerciseNumber]) return 0;
    if (!appState.scores[candidateNumber][exerciseNumber][questionId]) return 0;
    if (!appState.scores[candidateNumber][exerciseNumber][questionId].competences) return 0;
    return appState.scores[candidateNumber][exerciseNumber][questionId].competences[competenceName] || 0;
}

function getQuickButtonState(candidateNumber, exerciseNumber, questionId) {
    if (!appState.quickButtonStates[candidateNumber]) return null;
    if (!appState.quickButtonStates[candidateNumber][exerciseNumber]) return null;
    return appState.quickButtonStates[candidateNumber][exerciseNumber][questionId] || null;
}

// Fonction utilitaire pour définir le score d'une compétence pour un candidat
function setCandidateCompetenceScore(candidateNumber, exerciseNumber, questionId, competenceName, score) {
    if (!appState.scores[candidateNumber]) {
        appState.scores[candidateNumber] = {};
    }
    if (!appState.scores[candidateNumber][exerciseNumber]) {
        appState.scores[candidateNumber][exerciseNumber] = {};
    }
    if (!appState.scores[candidateNumber][exerciseNumber][questionId]) {
        appState.scores[candidateNumber][exerciseNumber][questionId] = { score: 0, competences: {} };
    }
    
    appState.scores[candidateNumber][exerciseNumber][questionId].competences[competenceName] = score;
    
    // Recalculer le score total de la question
    const question = exercisesData[exerciseNumber].questions.find(q => q.id === questionId);
    let totalScore = 0;
    question.competences.forEach(comp => {
        totalScore += appState.scores[candidateNumber][exerciseNumber][questionId].competences[comp.name] || 0;
    });
    appState.scores[candidateNumber][exerciseNumber][questionId].score = totalScore;
}

// 🔥 NOUVEAU : Gestion de l'appui long pour mettre à 0
let competencePressTimer = null;
let competencePressStartTime = 0;
const LONG_PRESS_DURATION = 600; // 600ms pour considérer comme un appui long

function handleCompetenceButtonPress(exerciseNumber, questionId, competenceName, maxPoints, event, action) {
    if (action === 'start') {
        // Début de l'appui
        competencePressStartTime = Date.now();
        const buttonId = `comp_${exerciseNumber}_${questionId}_${competenceName.replace(/\s/g, '_')}`;
        const button = document.getElementById(buttonId);

        // Timer pour afficher le feedback visuel
        competencePressTimer = setTimeout(() => {
            // Ajouter classe de feedback visuel après 600ms
            if (button) {
                button.classList.add('long-press-active');
            }
        }, LONG_PRESS_DURATION);

    } else if (action === 'end') {
        // Fin de l'appui
        const pressDuration = Date.now() - competencePressStartTime;
        const buttonId = `comp_${exerciseNumber}_${questionId}_${competenceName.replace(/\s/g, '_')}`;
        const button = document.getElementById(buttonId);

        // Nettoyer le timer et le feedback visuel
        if (competencePressTimer) {
            clearTimeout(competencePressTimer);
            competencePressTimer = null;
        }
        if (button) {
            button.classList.remove('long-press-active');
        }

        // Déterminer l'action selon la durée
        if (pressDuration >= LONG_PRESS_DURATION) {
            // Appui long → mettre à 0
            console.log(`🔥 Appui long détecté (${pressDuration}ms) → Mise à 0`);
            toggleCompetenceScore(exerciseNumber, questionId, competenceName, maxPoints, true);
        } else {
            // Appui court → incrément normal
            toggleCompetenceScore(exerciseNumber, questionId, competenceName, maxPoints, false);
        }

        competencePressStartTime = 0;
    } else if (action === 'cancel') {
        // Annulation (souris sort du bouton)
        if (competencePressTimer) {
            clearTimeout(competencePressTimer);
            competencePressTimer = null;
        }
        const buttonId = `comp_${exerciseNumber}_${questionId}_${competenceName.replace(/\s/g, '_')}`;
        const button = document.getElementById(buttonId);
        if (button) {
            button.classList.remove('long-press-active');
        }
        competencePressStartTime = 0;
    }
}

// ✅ CORRECTION 2 : Système de clics incrémentiels avec protection dépassement
function toggleCompetenceScore(exerciseNumber, questionId, competenceName, maxPoints, setToZero = false) {
    const candidate = appState.activeCandidates[appState.currentCandidateIndex];
    const question = exercisesData[exerciseNumber].questions.find(q => q.id === questionId);
    const competence = question.competences.find(c => c.name === competenceName);

    // 🎯 Gestion de la compétence "en cours" pour les compétences 2+ points
    const competenceKey = `${candidate.number}_${exerciseNumber}_${questionId}_${competenceName}`;

    // Si on clique sur une compétence multi-points, elle devient "en cours"
    if (competence.points > 1) {
        currentlyEditingCompetence = competenceKey;
    }

    // Initialisation
    if (!appState.scores[candidate.number]) {
        appState.scores[candidate.number] = {};
    }
    if (!appState.scores[candidate.number][exerciseNumber]) {
        appState.scores[candidate.number][exerciseNumber] = {};
    }
    if (!appState.scores[candidate.number][exerciseNumber][questionId]) {
        appState.scores[candidate.number][exerciseNumber][questionId] = { score: 0, competences: {} };
    }

    const currentScore = appState.scores[candidate.number][exerciseNumber][questionId].competences[competenceName] || 0;
    let newScore;

    // 🔥 NOUVEAU : Appui long pour mettre directement à 0
    if (setToZero) {
        newScore = 0;
        // Si on met à 0 via appui long, la compétence n'est plus "en cours"
        if (competence.points > 1 && currentlyEditingCompetence === competenceKey) {
            currentlyEditingCompetence = null;
        }
    } else {
        // Comportement normal : incrément
        const increment = competence.increment || 1;
        newScore = currentScore + increment;

        // ✅ CORRECTION 2 : Système de clics incrémentiels - Si on dépasse le max, retour à 0
        if (newScore > competence.points) {
            newScore = 0;
            // Si on remet à 0 une compétence multi-points, elle n'est plus "en cours"
            if (competence.points > 1 && currentlyEditingCompetence === competenceKey) {
                currentlyEditingCompetence = null;
            }
        }
    }

    appState.scores[candidate.number][exerciseNumber][questionId].competences[competenceName] = newScore;
    
    // Si on atteint le score maximum pour une compétence multi-points, elle n'est plus "en cours"
    if (newScore === competence.points && competence.points > 1) {
        currentlyEditingCompetence = null;
    }

    // ✅ CORRECTION 3 : Protection contre dépassement X > Y
    let totalScore = 0;
    question.competences.forEach(comp => {
        const compScore = appState.scores[candidate.number][exerciseNumber][questionId].competences[comp.name] || 0;
        totalScore += compScore;
    });
    
    // S'assurer que le total ne dépasse jamais le maximum de la question
    if (totalScore > question.points) {
        const ratio = question.points / totalScore;
        question.competences.forEach(comp => {
            const compScore = appState.scores[candidate.number][exerciseNumber][questionId].competences[comp.name] || 0;
            appState.scores[candidate.number][exerciseNumber][questionId].competences[comp.name] = 
                Math.round(compScore * ratio * 2) / 2; // Arrondi à 0.5
        });
        totalScore = question.points;
    }
    
    appState.scores[candidate.number][exerciseNumber][questionId].score = totalScore;

    // Initialiser les boutons rapides s'ils n'existent pas
    if (!appState.quickButtonStates[candidate.number]) {
        appState.quickButtonStates[candidate.number] = {};
    }
    if (!appState.quickButtonStates[candidate.number][exerciseNumber]) {
        appState.quickButtonStates[candidate.number][exerciseNumber] = {};
    }

    // Logique d'activation automatique des boutons TB/TF selon le score
    const currentQuickButtonState = appState.quickButtonStates[candidate.number][exerciseNumber][questionId];
    
    // Ne pas modifier si c'est déjà NR (non rendu)
    if (currentQuickButtonState !== 'nr') {
        if (totalScore === question.points) {
            // Score parfait → activer TB
            appState.quickButtonStates[candidate.number][exerciseNumber][questionId] = 'tb';
        } else if (totalScore === 0) {
            // Vérifier que TOUS les critères sont explicitement à 0 (pas par défaut)
            let allCriteriaAtZero = true;
            let hasCriteriaSet = false;
            
            question.competences.forEach(comp => {
                const compScore = appState.scores[candidate.number][exerciseNumber][questionId].competences[comp.name];
                if (compScore === undefined) {
                    // Critère pas encore touché (valeur par défaut)
                    allCriteriaAtZero = false;
                } else {
                    hasCriteriaSet = true;
                    if (compScore !== 0) {
                        allCriteriaAtZero = false;
                    }
                }
            });
            
            // TF seulement si tous les critères ont été explicitement mis à 0
            if (allCriteriaAtZero && hasCriteriaSet) {
                appState.quickButtonStates[candidate.number][exerciseNumber][questionId] = 'tf';
            } else {
                appState.quickButtonStates[candidate.number][exerciseNumber][questionId] = null;
            }
        } else {
            // Score partiel → aucun bouton rapide
            appState.quickButtonStates[candidate.number][exerciseNumber][questionId] = null;
        }
    }

    renderCurrentExercise();
    updateExerciseScore(exerciseNumber);
    updateTotalScore();
    updateAllProgressIndicators();
    saveData();
    
    // 🚀 Navigation automatique si question terminée
    checkAutoNavigationAfterCompetence(exerciseNumber, questionId);
}

function setQuestionScore(exerciseNumber, questionId, type) {
    const candidate = appState.activeCandidates[appState.currentCandidateIndex];
    const exercise = exercisesData[exerciseNumber];
    const question = exercise.questions.find(q => q.id === questionId);
    
    // Initialisation des structures de données
    if (!appState.scores[candidate.number]) {
        appState.scores[candidate.number] = {};
    }
    if (!appState.scores[candidate.number][exerciseNumber]) {
        appState.scores[candidate.number][exerciseNumber] = {};
    }
    if (!appState.scores[candidate.number][exerciseNumber][questionId]) {
        appState.scores[candidate.number][exerciseNumber][questionId] = { score: 0, competences: {} };
    }
    if (!appState.quickButtonStates[candidate.number]) {
        appState.quickButtonStates[candidate.number] = {};
    }
    if (!appState.quickButtonStates[candidate.number][exerciseNumber]) {
        appState.quickButtonStates[candidate.number][exerciseNumber] = {};
    }

    const currentState = appState.quickButtonStates[candidate.number][exerciseNumber][questionId];
    
    // Double-clic pour annuler
    if (currentState === type) {
        // Annuler - remettre à l'état non commencé
        delete appState.quickButtonStates[candidate.number][exerciseNumber][questionId];
        delete appState.scores[candidate.number][exerciseNumber][questionId];
    } else {
        // Appliquer le nouveau type
        appState.quickButtonStates[candidate.number][exerciseNumber][questionId] = type;
        
        // Réinitialiser la compétence en cours car on utilise un bouton rapide
        currentlyEditingCompetence = null;
        
        if (type === 'tb') {
            appState.scores[candidate.number][exerciseNumber][questionId].score = question.points;
            // Attribuer tous les points aux compétences
            question.competences.forEach(comp => {
                appState.scores[candidate.number][exerciseNumber][questionId].competences[comp.name] = comp.points;
            });
        } else if (type === 'tf' || type === 'nr') {
            appState.scores[candidate.number][exerciseNumber][questionId].score = 0;
            // Remettre toutes les compétences à 0
            question.competences.forEach(comp => {
                appState.scores[candidate.number][exerciseNumber][questionId].competences[comp.name] = 0;
            });
        }
    }

    renderCurrentExercise();
    updateExerciseScore(exerciseNumber);
    updateTotalScore();
    updateAllProgressIndicators();
    saveData();
    
    // 🚀 Navigation automatique si question terminée (aussi pour TB/TF/NR)
    checkAutoNavigationAfterCompetence(exerciseNumber, questionId);
}

function setQuestionScoreWithNavigation(exerciseNumber, questionId, type) {
    const candidate = appState.activeCandidates[appState.currentCandidateIndex];
    const currentState = appState.quickButtonStates[candidate.number]?.[exerciseNumber]?.[questionId];
    
    // Effet visuel sur le bouton cliqué
    const clickedButton = event.target.closest('.quick-btn-main');
    if (clickedButton) {
        clickedButton.classList.add('clicked');
        setTimeout(() => {
            clickedButton.classList.remove('clicked');
        }, 300);
    }
    
    // Appliquer le score
    setQuestionScore(exerciseNumber, questionId, type);
    
    // PAS de navigation automatique pour les questions individuelles
    // Le correcteur reste sur la même question/exercice/candidat
}

function autoNavigateAfterQuickButton() {
    if (appState.correctionMode === 'exercise') {
        // Mode par exercice : corriger le même exercice pour tous les candidats
        // → passer au candidat suivant (même exercice)
        if (appState.currentCandidateIndex < appState.activeCandidates.length - 1) {
            // Passer au candidat suivant pour le même exercice
            nextCandidate();
        } else {
            // Dernier candidat : passer à l'exercice suivant, candidat 1
            if (appState.currentExerciseIndex < Object.keys(exercisesData).length) {
                appState.currentCandidateIndex = 0; // Retour au premier candidat
                nextExercise();
            } else {
                // Fin de la correction en mode exercice
                showExerciseModeCompletionSummary();
            }
        }
    } else if (appState.correctionMode === 'candidate') {
        // Mode par candidat : corriger tous les exercices pour le même candidat
        // → passer à l'exercice suivant (même candidat)
        if (appState.currentExerciseIndex < Object.keys(exercisesData).length) {
            // Passer à l'exercice suivant pour le même candidat
            nextExercise();
        } else {
            // Dernier exercice : si toute la copie est corrigée, ouvrir DIRECTEMENT la modale de validation
            const candidate = appState.activeCandidates[appState.currentCandidateIndex];
            const details = calculateCandidateDetails(candidate.number);
            if (details.questionsAnswered >= details.totalQuestions) {
                validateCorrection(); // modale directe (pas de confirm puisque 100% corrigé)
            } else if (appState.currentCandidateIndex < appState.activeCandidates.length - 1) {
                // Copie encore incomplète : passer au candidat suivant
                appState.currentExerciseIndex = 1;
                nextCandidate();
                showTab('exercise1');
            }
        }
    }
}

// 🚀 Navigation automatique après correction complète d'une question par compétences
function checkAutoNavigationAfterCompetence(exerciseNumber, questionId) {
    // Vérifier si un mode de correction est sélectionné
    if (!appState.correctionMode) return;
    
    const candidate = appState.activeCandidates[appState.currentCandidateIndex];
    const questionState = getQuestionProgressState(candidate.number, exerciseNumber, questionId);
    
    // La question doit être terminée (completed ou perfect) pour déclencher la navigation
    if (questionState !== 'completed' && questionState !== 'perfect') {
        return;
    }
    
    // Délai court pour que le correcteur voie le changement d'état
    setTimeout(() => {
        autoNavigateAfterCompetenceCorrection(exerciseNumber, questionId);
    }, 600); // 0.6 seconde pour voir le point vert
}

function autoNavigateAfterCompetenceCorrection(originalExerciseNumber, questionId) {
    const candidate = appState.activeCandidates[appState.currentCandidateIndex];
    
    if (appState.correctionMode === 'candidate') {
        // 🚨 CORRECTION BUG : Utiliser l'exercice ACTUEL, pas l'exercice d'origine
        const currentExerciseNumber = appState.currentExerciseIndex;
        
        // Mode par candidat : vérifier si tout l'exercice ACTUEL est terminé
        const exerciseState = getExerciseProgressState(candidate.number, currentExerciseNumber);
        
        // 🐛 DEBUG DÉTAILLÉ : Afficher l'état de l'exercice et de chaque question
        console.log(`🔍 DEBUG - Exercice ACTUEL ${currentExerciseNumber} pour candidat ${candidate.number}:`);
        console.log(`(Déclenché depuis exercice ${originalExerciseNumber})`);
        console.log(`État global de l'exercice: ${exerciseState}`);
        
        // Vérifier chaque question individuellement avec détails
        const exercise = exercisesData[currentExerciseNumber];
        let questionsTerminees = 0;
        let totalQuestions = exercise.questions.length;
        
        exercise.questions.forEach((question, index) => {
            const questionState = getQuestionProgressState(candidate.number, currentExerciseNumber, question.id);
            const questionScore = getCandidateQuestionScore(candidate.number, currentExerciseNumber, question.id);
            const quickState = getQuickButtonState(candidate.number, currentExerciseNumber, question.id);
            
            // Compter les compétences touchées
            let competencesTouchees = 0;
            question.competences.forEach(comp => {
                if (appState.scores[candidate.number]?.[currentExerciseNumber]?.[question.id]?.competences?.hasOwnProperty(comp.name)) {
                    competencesTouchees++;
                }
            });
            
            if (questionState === 'completed' || questionState === 'perfect') {
                questionsTerminees++;
            }
            
            console.log(`  Q${question.id}: état="${questionState}", score=${questionScore}/${question.points}, bouton="${quickState}", compétences=${competencesTouchees}/${question.competences.length}`);
        });
        
        console.log(`📊 RÉSUMÉ: ${questionsTerminees}/${totalQuestions} questions terminées`);
        console.log(`🎯 Condition pour navigation: exerciceState='completed' ou 'perfect' → ${exerciseState === 'completed' || exerciseState === 'perfect'}`);
        
        if (exerciseState === 'completed' || exerciseState === 'perfect') {
            // TOUT l'exercice est terminé → passer à l'exercice suivant
            console.log('✅ NAVIGATION AUTOMATIQUE DÉCLENCHÉE !');
            if (appState.currentExerciseIndex < Object.keys(exercisesData).length) {
                console.log(`📍 Passage de l'exercice ${appState.currentExerciseIndex} vers ${appState.currentExerciseIndex + 1}`);
                nextExercise();
            } else {
                // Dernier exercice terminé : si toute la copie est corrigée, ouvrir la modale de validation
                const details = calculateCandidateDetails(candidate.number);
                if (details.questionsAnswered >= details.totalQuestions) {
                    console.log('🏁 Copie 100% corrigée → ouverture automatique de la modale de validation');
                    validateCorrection(); // modale directe, sans demander de confirmation
                } else {
                    console.log('🏁 Dernier exercice atteint mais copie incomplète - validation manuelle possible');
                }
            }
        } else {
            // Exercice pas entièrement terminé → chercher la prochaine question non terminée
            console.log('⏸️ Exercice pas entièrement terminé, recherche de la prochaine question...');
            navigateToNextIncompleteQuestion(currentExerciseNumber);
        }
        
    } else if (appState.correctionMode === 'exercise') {
        // Mode par exercice : passer au candidat suivant (même exercice, même question)
        console.log(`🔄 Mode exercice: passage au candidat suivant`);
        if (appState.currentCandidateIndex < appState.activeCandidates.length - 1) {
            nextCandidate();
        } else {
            // Dernier candidat : retour au premier candidat
            appState.currentCandidateIndex = 0;
            loadCurrentCandidate();
        }
    }
}

// Navigation intelligente vers la prochaine question non terminée du même exercice
function navigateToNextIncompleteQuestion(exerciseNumber) {
    const candidate = appState.activeCandidates[appState.currentCandidateIndex];
    const exercise = exercisesData[exerciseNumber];
    
    // Chercher la première question non terminée dans l'exercice actuel
    for (let i = 0; i < exercise.questions.length; i++) {
        const question = exercise.questions[i];
        const questionState = getQuestionProgressState(candidate.number, exerciseNumber, question.id);
        
        if (questionState === 'not-started' || questionState === 'in-progress') {
            // Trouver l'index de cette question dans l'affichage et faire défiler vers elle
            setTimeout(() => {
                const questionCard = document.querySelector(`[data-question-id="${question.id}"]`);
                if (questionCard) {
                    questionCard.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                    // Effet visuel sur la question ciblée
                    questionCard.style.boxShadow = '0 0 20px rgba(66, 133, 244, 0.5)';
                    setTimeout(() => {
                        questionCard.style.boxShadow = '';
                    }, 2000);
                }
            }, 100);
            return; // Sortir dès qu'on trouve une question incomplète
        }
    }
    
    // Si on arrive ici, toutes les questions sont terminées mais le statut exercice n'est pas encore mis à jour
    console.log('Toutes les questions semblent terminées, exercice complet');
}

function setExerciseScore(exerciseNumber, type) {
    const exercise = exercisesData[exerciseNumber];
    exercise.questions.forEach(question => {
        setQuestionScore(exerciseNumber, question.id, type);
    });
}

function setExerciseScoreWithNavigation(exerciseNumber, type) {
    // Appliquer le score à tout l'exercice
    setExerciseScore(exerciseNumber, type);
    
    // Navigation automatique après un petit délai
    setTimeout(() => {
        autoNavigateAfterQuickButton();
    }, 500); // Délai plus long pour un exercice complet
}

function resetQuestionScore(exerciseNumber, questionId) {
    const candidate = appState.activeCandidates[appState.currentCandidateIndex];
    
    // Réinitialiser la compétence en cours si elle concerne cette question
    if (currentlyEditingCompetence && currentlyEditingCompetence.includes(`${candidate.number}_${exerciseNumber}_${questionId}_`)) {
        currentlyEditingCompetence = null;
    }
    
    // Réinitialiser complètement la question (retour à l'état non commencé)
    if (appState.scores[candidate.number] && 
        appState.scores[candidate.number][exerciseNumber] && 
        appState.scores[candidate.number][exerciseNumber][questionId]) {
        
        // Supprimer complètement la question pour qu'elle redevienne "non commencée"
        delete appState.scores[candidate.number][exerciseNumber][questionId];
    }
    
    if (appState.quickButtonStates[candidate.number] && 
        appState.quickButtonStates[candidate.number][exerciseNumber]) {
        delete appState.quickButtonStates[candidate.number][exerciseNumber][questionId];
    }

    renderCurrentExercise();
    updateExerciseScore(exerciseNumber);
    updateTotalScore();
    updateAllProgressIndicators();
    saveData();
}

function resetExerciseScore(exerciseNumber) {
    const exercise = exercisesData[exerciseNumber];
    exercise.questions.forEach(question => {
        resetQuestionScore(exerciseNumber, question.id);
    });
}


// === FONCTIONS ADMIN ===
function updateQuestionPointsAdmin(exerciseId, questionId, newPoints) {
    const points = parseFloat(newPoints) || 0;
    exercisesData[exerciseId].questions.find(q => q.id === questionId).points = points;

    // Recalculer le total de l'exercice
    exercisesData[exerciseId].totalPoints = exercisesData[exerciseId].questions
        .reduce((sum, q) => sum + q.points, 0);

    // Valider les points des critères
    validateQuestionPoints(exerciseId, questionId);
}

function updateQuestionStatement(exerciseId, questionId, newStatement) {
    exercisesData[exerciseId].questions.find(q => q.id === questionId).statement = newStatement;
}

function updateQuestionAnswer(exerciseId, questionId, newAnswer) {
    exercisesData[exerciseId].questions.find(q => q.id === questionId).answer = newAnswer;
}

// Fonction pour basculer la sélection d'une compétence pour un exercice
function toggleExerciseCompetence(exerciseId, competenceName) {
    const exercise = exercisesData[exerciseId];
    
    // Initialiser selectedCompetences si nécessaire
    if (!exercise.selectedCompetences) {
        exercise.selectedCompetences = [];
    }
    
    // Basculer la sélection
    const index = exercise.selectedCompetences.indexOf(competenceName);
    if (index > -1) {
        exercise.selectedCompetences.splice(index, 1);
    } else {
        exercise.selectedCompetences.push(competenceName);
    }
    
    // Re-render l'interface admin pour mettre à jour visuellement
    renderAdminContent();
}

// Fonction pour appliquer les compétences sélectionnées à toutes les questions de l'exercice
function applyCompetencesToAllQuestions(exerciseId) {
    const exercise = exercisesData[exerciseId];
    
    if (!exercise.selectedCompetences || exercise.selectedCompetences.length === 0) {
        alert('⚠️ Veuillez d\'abord sélectionner au moins une compétence !');
        return;
    }
    
    // Trouver les infos complètes des compétences sélectionnées
    const selectedCompetencesData = exercise.selectedCompetences.map(name => {
        const defaultComp = defaultCompetences.find(dc => dc.name === name);
        return {
            name: name,
            color: defaultComp.color,
            description: defaultComp.description,
            tooltip: defaultComp.description,
            points: 2, // Points par défaut
            increment: 1 // Incrément par défaut
        };
    });
    
    // Appliquer à toutes les questions
    exercise.questions.forEach(question => {
        question.competences = JSON.parse(JSON.stringify(selectedCompetencesData));
    });
    
    // Re-render l'interface admin
    renderAdminContent();
    
    alert(`✅ Les compétences ont été appliquées à toutes les ${exercise.questions.length} question(s) de l'exercice !`);
}

function updateCompetenceIncrement(exerciseId, questionId, competenceIndex, newIncrement) {
    const increment = parseFloat(newIncrement) || 1;
    exercisesData[exerciseId].questions.find(q => q.id === questionId).competences[competenceIndex].increment = increment;
}

function updateCompetencePoints(exerciseId, questionId, competenceIndex, newPoints) {
    const points = parseFloat(newPoints) || 0;
    exercisesData[exerciseId].questions.find(q => q.id === questionId).competences[competenceIndex].points = points;
    validateQuestionPoints(exerciseId, questionId);
}

function validateQuestionPoints(exerciseId, questionId) {
    const question = exercisesData[exerciseId].questions.find(q => q.id === questionId);
    const competencesSum = question.competences.reduce((sum, comp) => sum + (comp.points || 0), 0);
    const validationDiv = document.getElementById(`validation_${exerciseId}_${questionId}`);
    
    if (validationDiv) {
        if (competencesSum === question.points) {
            validationDiv.innerHTML = `✅ Total critères: ${competencesSum} pts = Total question: ${question.points} pts`;
            validationDiv.style.background = '#d4edda';
            validationDiv.style.color = '#155724';
        } else {
            validationDiv.innerHTML = `❌ Total critères: ${competencesSum} pts ≠ Total question: ${question.points} pts`;
            validationDiv.style.background = '#f8d7da';
            validationDiv.style.color = '#721c24';
        }
    }
}

function removeCompetence(exerciseId, questionId, competenceIndex) {
    const question = exercisesData[exerciseId].questions.find(q => q.id === questionId);
    question.competences.splice(competenceIndex, 1);
    renderAdminContent();
}

// === FONCTIONS MODAL MODIFICATION ===
function openCompetenceModal(exerciseId, questionId, competenceIndex) {
    modalExerciseId = exerciseId;
    modalQuestionId = questionId;
    modalCompetenceIndex = competenceIndex;
    
    const competence = exercisesData[exerciseId].questions.find(q => q.id === questionId).competences[competenceIndex];
    const defaultComp = defaultCompetences.find(dc => dc.name === competence.name.split(' ')[0]);
    
    document.getElementById('modalCompetenceType').textContent = competence.name.split(' ')[0];
    document.getElementById('modalCompetenceIcon').textContent = defaultComp ? defaultComp.icon : '📋';
    document.getElementById('modalCompetenceName').textContent = competence.name;
    document.getElementById('modalDescription').value = competence.description || '';
    document.getElementById('modalPoints').value = competence.points;
    document.getElementById('modalIncrement').value = competence.increment || 1;
    document.getElementById('modalTooltip').value = competence.tooltip || '';
    
    // Mettre à jour l'affichage des points dans le badge
    const pointsDisplay = document.querySelector('#competenceModal .modal-competence-badge span:last-child');
    if (pointsDisplay) {
        pointsDisplay.textContent = `${competence.points} pt${competence.points > 1 ? 's' : ''}`;
    }
    
    // Appliquer la couleur de la compétence à la modal
    const modalHeader = document.querySelector('#competenceModal .modal-header');
    const modalBadge = document.querySelector('#competenceModal .modal-competence-badge');
    const saveBtn = document.querySelector('#competenceModal .modal-btn.save');
    
    if (modalHeader) {
        modalHeader.style.background = competence.color;
        modalHeader.style.borderColor = competence.color;
    }
    
    if (modalBadge) {
        modalBadge.style.background = competence.color;
        modalBadge.style.borderColor = competence.color;
    }
    
    if (saveBtn) {
        saveBtn.style.background = competence.color;
        saveBtn.style.borderColor = competence.color;
    }
    
    document.getElementById('competenceModal').classList.add('active');
}

function closeCompetenceModal() {
    document.getElementById('competenceModal').classList.remove('active');
    
    // Réinitialiser les couleurs par défaut
    const modalHeader = document.querySelector('#competenceModal .modal-header');
    const modalBadge = document.querySelector('#competenceModal .modal-competence-badge');
    const saveBtn = document.querySelector('#competenceModal .modal-btn.save');
    
    if (modalHeader) {
        modalHeader.style.background = '#2ecc71';
        modalHeader.style.borderColor = '#2ecc71';
    }
    
    if (modalBadge) {
        modalBadge.style.background = '#2ecc71';
        modalBadge.style.borderColor = '#2ecc71';
    }
    
    if (saveBtn) {
        saveBtn.style.background = '#2ecc71';
        saveBtn.style.borderColor = '#2ecc71';
    }
    
    modalExerciseId = null;
    modalQuestionId = null;
    modalCompetenceIndex = null;
}

function saveCompetenceModal() {
    if (modalExerciseId === null || modalQuestionId === null || modalCompetenceIndex === null) return;
    
    const competence = exercisesData[modalExerciseId].questions.find(q => q.id === modalQuestionId).competences[modalCompetenceIndex];
    
    competence.description = document.getElementById('modalDescription').value;
    competence.tooltip = document.getElementById('modalTooltip').value;
    competence.points = parseFloat(document.getElementById('modalPoints').value) || 1;
    competence.increment = parseFloat(document.getElementById('modalIncrement').value) || 1;
    
    // Mettre à jour l'affichage des points dans le badge avant de fermer
    const pointsDisplay = document.querySelector('#competenceModal .modal-competence-badge span:last-child');
    if (pointsDisplay) {
        pointsDisplay.textContent = `${competence.points} pt${competence.points > 1 ? 's' : ''}`;
    }
    
    closeCompetenceModal();
    renderAdminContent();
}

function updateModalPointsDisplay() {
    const points = parseFloat(document.getElementById('modalPoints').value) || 0;
    const pointsDisplay = document.querySelector('#competenceModal .modal-competence-badge span:last-child');
    if (pointsDisplay) {
        pointsDisplay.textContent = `${points} pt${points > 1 ? 's' : ''}`;
    }
}

// === FONCTIONS MODAL SÉLECTION ===
function openCompetenceSelectionModal(exerciseId, questionId) {
    pendingExerciseId = exerciseId;
    pendingQuestionId = questionId;
    document.getElementById('competenceSelectionModal').classList.add('active');
}

function closeCompetenceSelectionModal() {
    document.getElementById('competenceSelectionModal').classList.remove('active');
    pendingExerciseId = null;
    pendingQuestionId = null;
}

function selectCompetence(competenceName) {
    if (pendingExerciseId === null || pendingQuestionId === null) return;
    
    const question = exercisesData[pendingExerciseId].questions.find(q => q.id === pendingQuestionId);
    const defaultComp = defaultCompetences.find(dc => dc.name === competenceName);
    
    // Trouver un nom unique pour cette compétence
    let finalName = competenceName;
    let counter = 1;
    while (question.competences.some(c => c.name === finalName)) {
        counter++;
        finalName = `${competenceName} ${counter}`;
    }
    
    const newCompetence = {
        name: finalName,
        color: defaultComp.color,
        description: defaultComp.description,
        tooltip: defaultComp.tooltip,
        points: 1,
        increment: 1
    };
    
    question.competences.push(newCompetence);
    closeCompetenceSelectionModal();
    renderAdminContent();
}

function createNewCompetenceType() {
    alert('Fonctionnalité à venir : Création de nouveaux types de compétences');
}

function saveBareme() {
    // Vérifier que toutes les questions ont des critères valides
    let allValid = true;
    let invalidQuestions = [];
    
    Object.entries(exercisesData).forEach(([exerciseId, exercise]) => {
        exercise.questions.forEach(question => {
            const competencesSum = question.competences.reduce((sum, comp) => sum + (comp.points || 0), 0);
            if (competencesSum !== question.points) {
                allValid = false;
                invalidQuestions.push(`${exercise.title} - ${question.title}`);
            }
        });
    });
    
    if (!allValid) {
        alert(`❌ Impossible de sauvegarder !\n\nLes questions suivantes ont des critères invalides :\n\n${invalidQuestions.join('\n')}\n\nLa somme des points des critères doit égaler le total de la question.`);
        return;
    }
    
    if (confirm('✅ Tous les critères sont valides !\n\nSauvegarder le barème en mémoire ?\nCela s\'appliquera à tous les candidats.')) {
        saveData();
        alert('Barème sauvegardé en mémoire avec succès !\n\n💡 Pensez à exporter le barème en JSON pour le conserver de manière permanente.');
    }
}

// === FONCTIONS IMPORT/EXPORT BARÈME ===
function exportBareme() {
    // Vérifier que le barème est valide avant l'export
    let allValid = true;
    let invalidQuestions = [];
    
    Object.entries(exercisesData).forEach(([exerciseId, exercise]) => {
        exercise.questions.forEach(question => {
            const competencesSum = question.competences.reduce((sum, comp) => sum + (comp.points || 0), 0);
            if (competencesSum !== question.points) {
                allValid = false;
                invalidQuestions.push(`${exercise.title} - ${question.title}`);
            }
        });
    });
    
    if (!allValid) {
        if (!confirm(`⚠️ ATTENTION : Le barème contient des erreurs !\n\nQuestions avec problèmes :\n${invalidQuestions.join('\n')}\n\nVoulez-vous tout de même exporter ce barème ?`)) {
            return;
        }
    }
    
    const baremeData = {
        metadata: {
            version: "1.0",
            exportDate: new Date().toISOString(),
            description: "Barème DNB Personnalisé - MathALÉA",
            totalExercises: Object.keys(exercisesData).length
        },
        exercisesData: exercisesData
    };
    
    const jsonString = JSON.stringify(baremeData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `bareme-dnb-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('📤 Barème exporté avec succès !\n\n💾 Fichier téléchargé : bareme-dnb-' + new Date().toISOString().split('T')[0] + '.json\n\n💡 Conservez ce fichier pour réutiliser ce barème plus tard.');
}

function importBareme() {
    if (!confirm('⚠️ ATTENTION !\n\nImporter un barème remplacera complètement le barème actuel.\n\nToutes vos modifications non exportées seront perdues.\n\nContinuer ?')) {
        return;
    }
    
    document.getElementById('importBaremeInput').click();
}

function handleBaremeImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            // Vérifier la structure du fichier
            if (!data.exercisesData) {
                throw new Error("Structure invalide : 'exercisesData' manquant");
            }
            
            // Vérification basique de la structure
            const importedExercises = data.exercisesData;
            let totalQuestions = 0;
            
            Object.entries(importedExercises).forEach(([exerciseId, exercise]) => {
                if (!exercise.title || !exercise.questions || !Array.isArray(exercise.questions)) {
                    throw new Error(`Exercice ${exerciseId} mal formaté`);
                }
                totalQuestions += exercise.questions.length;
            });
            
            // Confirmation avec informations
            const confirmMessage = `📋 BARÈME À IMPORTER :\n\n` +
                `📅 Date d'export : ${data.metadata?.exportDate ? new Date(data.metadata.exportDate).toLocaleDateString() : 'Inconnue'}\n` +
                `📊 Exercices : ${Object.keys(importedExercises).length}\n` +
                `❓ Questions : ${totalQuestions}\n` +
                `📝 Version : ${data.metadata?.version || 'Inconnue'}\n\n` +
                `Remplacer le barème actuel par celui-ci ?`;
            
            if (confirm(confirmMessage)) {
                // Remplacer exercisesData
                Object.keys(exercisesData).forEach(key => delete exercisesData[key]);
                Object.assign(exercisesData, importedExercises);
                
                // Recharger l'interface admin
                showAdminExercise(currentAdminExercise);
                
                alert('✅ Barème importé avec succès !\n\n🔄 L\'interface a été mise à jour.\n\n💾 Pensez à sauvegarder en mémoire si vous voulez l\'appliquer aux candidats.');
            }
            
        } catch (error) {
            alert(`❌ Erreur lors de l'import du barème :\n\n${error.message}\n\nVérifiez que le fichier JSON est valide et provient bien de cet outil.`);
        }
    };
    
    reader.onerror = function() {
        alert('❌ Erreur lors de la lecture du fichier.\n\nVérifiez que le fichier n\'est pas corrompu.');
    };
    
    reader.readAsText(file);
    
    // Reset le input pour permettre de réimporter le même fichier
    event.target.value = '';
}

// === RENDU DES EXERCICES ===
/**
 * Rend le statement d'une question avec conversion des tableaux Markdown en HTML
 */
function renderStatementWithTables(text) {
    if (!text) return '';
    // Détecter les blocs de tableau Markdown (lignes commençant par |)
    var lines = text.split('\n');
    var result = [];
    var tableLines = [];
    var inTable = false;

    function flushTable() {
        if (tableLines.length < 2) {
            result.push(tableLines.join('\n'));
            tableLines = [];
            return;
        }
        var html = '<table style="border-collapse:collapse;margin:8px 0;font-size:0.9em;">';
        tableLines.forEach(function (line, i) {
            // Ignorer les lignes séparateurs (| --- | --- |)
            if (/^\|[\s\-:]+\|$/.test(line.trim())) return;
            var cells = line.split('|').filter(function (c, ci, arr) { return ci > 0 && ci < arr.length - 1; });
            var tag = i === 0 ? 'th' : 'td';
            html += '<tr>';
            cells.forEach(function (cell) {
                var style = 'border:1px solid #d1d5db;padding:6px 10px;';
                if (i === 0) style += 'background:#f3f4f6;font-weight:bold;';
                html += '<' + tag + ' style="' + style + '">' + cell.trim() + '</' + tag + '>';
            });
            html += '</tr>';
        });
        html += '</table>';
        result.push(html);
        tableLines = [];
    }

    lines.forEach(function (line) {
        if (line.trim().startsWith('|')) {
            inTable = true;
            tableLines.push(line);
        } else {
            if (inTable) { flushTable(); inTable = false; }
            result.push(line);
        }
    });
    if (inTable) flushTable();

    var out = result.join('\n');
    // Surlignage des éléments de réponse marqués ==X== → rouge gras
    // Appliqué uniquement HORS des blocs LaTeX ($...$, $$...$$, \(...\), \[...\])
    // pour ne pas insérer de HTML que KaTeX ne saurait pas parser.
    var mathBlocks = [];
    var mathRegex = /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$|\\\([\s\S]+?\\\)|\\\[[\s\S]+?\\\])/g;
    out = out.replace(mathRegex, function (match) {
        mathBlocks.push(match);
        return 'MATH' + (mathBlocks.length - 1) + '';
    });
    out = out.replace(/==([^=\n]+?)==/g, '<span class="highlight-answer">$1</span>');
    out = out.replace(/MATH(\d+)/g, function (_, i) {
        var block = mathBlocks[parseInt(i, 10)];
        // Retirer les marqueurs ==...== à l'intérieur du LaTeX (KaTeX ne les rend pas en couleur,
        // mais on les rendra rouges via \color{} pour conserver le repère visuel).
        block = block.replace(/==([^=\n]+?)==/g, '{\\color{#dc2626}$1}');
        return block;
    });
    return out;
}

function renderExerciseContent(exerciseNumber) {
    const exercise = exercisesData[exerciseNumber];
    const candidate = appState.activeCandidates[appState.currentCandidateIndex];

    // 🔧 Calculer les compétences de l'exercice
    const exerciseCompetences = {};
    exercise.questions.forEach(question => {
        question.competences.forEach(comp => {
            if (!exerciseCompetences[comp.name]) {
                exerciseCompetences[comp.name] = {
                    color: comp.color,
                    totalPoints: 0
                };
            }
            exerciseCompetences[comp.name].totalPoints += comp.points;
        });
    });

    const cleanTitle = exercise.title || '';
    let html = `
        <div class="exercise-header">
            <div class="exercise-title-section">
                <div class="exercise-title">${cleanTitle}</div>
                <div class="exercise-score-badge" id="exerciseScore${exerciseNumber}">0 / ${exercise.totalPoints} pts</div>
            </div>
            <div class="exercise-actions">
                <div class="exercise-quick-buttons">
                    <button class="quick-btn tb" onclick="setExerciseScoreWithNavigation(${exerciseNumber}, 'tb')">TB</button>
                    <button class="quick-btn tf" onclick="setExerciseScoreWithNavigation(${exerciseNumber}, 'tf')">TF</button>
                    <button class="quick-btn nr" onclick="setExerciseScoreWithNavigation(${exerciseNumber}, 'nr')">NR</button>
                </div>
                <button class="exercise-reset-btn" onclick="resetExerciseScore(${exerciseNumber})">
                    <span class="btn-icon">↻</span>
                    <span>Réinitialiser</span>
                </button>
            </div>
        </div>

        <!-- Compétences évaluées dans cet exercice -->
        ${Object.keys(exerciseCompetences).length > 0 ? `
        <div style="margin: 15px 0; padding: 15px; background: #f0f7ff; border-radius: 8px; border-left: 4px solid #2196F3;">
            <div style="font-weight: bold; margin-bottom: 10px; color: #1565C0;">📊 Compétences évaluées dans cet exercice :</div>
            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                ${Object.entries(exerciseCompetences).map(([compName, compData]) => {
                    const defaultComp = defaultCompetences.find(c => c.name === compName);
                    const icon = defaultComp ? defaultComp.icon : '📋';
                    return `
                        <div style="
                            padding: 8px 14px;
                            background: ${compData.color};
                            color: white;
                            border-radius: 20px;
                            font-weight: 600;
                            display: flex;
                            align-items: center;
                            gap: 6px;
                            font-size: 0.9em;
                        ">
                            <span>${icon}</span>
                            <span>${compName}</span>
                            <span style="background: rgba(255,255,255,0.3); padding: 2px 8px; border-radius: 12px; font-size: 0.85em;">
                                ${compData.totalPoints.toFixed(1)} pt${compData.totalPoints > 1 ? 's' : ''}
                            </span>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
        ` : ''}

        <div class="questions-grid">
    `;

    exercise.questions.forEach(question => {
        const candidateScore = getCandidateQuestionScore(candidate.number, exerciseNumber, question.id);
        const quickButtonState = getQuickButtonState(candidate.number, exerciseNumber, question.id);
        
        const questionProgressState = getQuestionProgressState(candidate.number, exerciseNumber, question.id);
        
        html += `
            <div class="question-card" data-question-id="${question.id}">
                <div class="question-progress-indicator progress-indicator ${questionProgressState}"></div>
                <div class="question-header">
                    <div class="question-title-section">
                        <div class="question-title">${question.title} (${question.points} pts)</div>
                    </div>
                </div>
                
                <div class="question-text">${renderStatementWithTables(question.statement)}</div>
                ${(question.images && question.images.length > 0) ? `
                <div style="margin: 10px 0; display: flex; flex-wrap: wrap; gap: 10px;">
                    ${question.images.map(src => `<img src="${src}" style="max-width:100%; max-height:200px; border-radius:6px; border:1px solid #e5e7eb;" alt="figure">`).join('')}
                </div>
                ` : ''}

                <div class="answer-section">
                    <div class="answer-label">Réponse attendue :</div>
                    <div class="answer-content">
                        ${renderStatementWithTables(question.answer).split('\n').map(line => `<p>${line}</p>`).join('')}
                    </div>
                </div>
                
                ${question.qcm ? `
                    <div class="qcm-options"${(appState && appState.pdfImport) ? ' style="display:flex;flex-wrap:wrap;gap:6px;"' : ''}>
                        ${question.options.map(option => `
                            <div class="qcm-option ${option.correct ? 'correct' : ''}"${(appState && appState.pdfImport) ? ' style="white-space:nowrap;"' : ''}>${option.label}</div>
                        `).join('')}
                    </div>
                ` : ''}
                
                <div class="competences-section">
                    <div class="competences-list">
                        ${question.competences.map(competence => {
                            const compScore = getCandidateCompetenceScore(candidate.number, exerciseNumber, question.id, competence.name);
                            const isActive = compScore > 0;
                            const defaultComp = defaultCompetences.find(dc => dc.name === competence.name.split(' ')[0]);
                            const icon = defaultComp ? defaultComp.icon : '📋';
                            const description = competence.description || '';
                            const tooltip = competence.tooltip || '';
                            const tooltipId = `tooltip_${exerciseNumber}_${question.id}_${competence.name.replace(/\s/g, '_')}`;
                            const competenceProgressState = getCompetenceProgressState(candidate.number, exerciseNumber, question.id, competence.name);
                            const buttonId = `comp_${exerciseNumber}_${question.id}_${competence.name.replace(/\s/g, '_')}`;
                            return `
                                <button id="${buttonId}" class="competence-btn ${isActive ? 'active' : ''}"
                                        style="border-color: ${competence.color}; color: ${isActive ? competence.color : competence.color}; background: ${isActive ? competence.color : 'white'}; opacity: 1;"
                                        onmouseenter="showDescriptionTooltip(event, '${description.replace(/'/g, "\\'")}', '${tooltipId}')"
                                        onmouseleave="hideDescriptionTooltip('${tooltipId}'); handleCompetenceButtonPress(${exerciseNumber}, '${question.id}', '${competence.name}', ${question.points}, event, 'cancel');"
                                        onmousedown="handleCompetenceButtonPress(${exerciseNumber}, '${question.id}', '${competence.name}', ${question.points}, event, 'start'); event.preventDefault();"
                                        onmouseup="handleCompetenceButtonPress(${exerciseNumber}, '${question.id}', '${competence.name}', ${question.points}, event, 'end')"
                                        ontouchstart="handleCompetenceButtonPress(${exerciseNumber}, '${question.id}', '${competence.name}', ${question.points}, event, 'start'); event.preventDefault();"
                                        ontouchend="handleCompetenceButtonPress(${exerciseNumber}, '${question.id}', '${competence.name}', ${question.points}, event, 'end')"
                                        ontouchcancel="handleCompetenceButtonPress(${exerciseNumber}, '${question.id}', '${competence.name}', ${question.points}, event, 'cancel')">
                                    <span class="competence-icon">${icon}</span>
                                    <span class="competence-name" style="color: ${isActive ? 'white' : competence.color}; font-weight: bold;">${competence.name}</span>
                                    <span class="competence-points-display" style="background: ${isActive ? 'rgba(255,255,255,0.9)' : competence.color}; color: ${isActive ? competence.color : 'white'};">${compScore}/${competence.points}pt${competence.points > 1 ? 's' : ''}</span>
                                    <div class="progress-indicator ${competenceProgressState}"></div>
                                    ${tooltip ? `<span class="competence-info-i" onclick="event.stopPropagation(); toggleOptionalTooltip('${tooltipId}')">i</span>` : ''}
                                    <div class="description-tooltip" id="desc_${tooltipId}" style="display:none;">${description}</div>
                                    ${tooltip ? `<div class="tooltip-optional-new" id="${tooltipId}" style="display:none;">${tooltip}</div>` : ''}
                                </button>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <div class="quick-actions">
                    <div class="quick-buttons-container">
                        <div class="quick-buttons-main">
                            <button class="quick-btn-main tb ${quickButtonState === 'tb' ? 'active' : ''}" 
                                    onclick="setQuestionScoreWithNavigation(${exerciseNumber}, '${question.id}', 'tb')">
                                <span class="btn-icon">✓</span>
                                <span>TB</span>
                            </button>
                            <button class="quick-btn-main tf ${quickButtonState === 'tf' ? 'active' : ''}" 
                                    onclick="setQuestionScoreWithNavigation(${exerciseNumber}, '${question.id}', 'tf')">
                                <span class="btn-icon">✗</span>
                                <span>TF</span>
                            </button>
                            <button class="quick-btn-main nr ${quickButtonState === 'nr' ? 'active' : ''}" 
                                    onclick="setQuestionScoreWithNavigation(${exerciseNumber}, '${question.id}', 'nr')">
                                <span>NR</span>
                            </button>
                        </div>
                        <button class="quick-btn-reset" 
                                onclick="resetQuestionScore(${exerciseNumber}, '${question.id}')">
                            <span class="btn-icon">↻</span>
                        </button>
                    </div>
                    <div class="score-display" id="score_${exerciseNumber}_${question.id}">
                        ${candidateScore} / ${question.points} pts
                    </div>
                </div>
            </div>
        `;
    });

    html += '</div>';
    
    const exerciseContent = document.getElementById(`exercise${exerciseNumber}Content`);
    exerciseContent.innerHTML = html;
    
    // Rendre les formules mathématiques avec KaTeX (comme dans la page barème)
    setTimeout(() => {
        renderKatexInElement(exerciseContent);
        renderScratchblocksInElement(exerciseContent);
    }, 50);
    
    updateExerciseScore(exerciseNumber);
}

function renderCurrentExercise() {
    if (appState.currentTab.startsWith('exercise')) {
        const exerciseNumber = parseInt(appState.currentTab.replace('exercise', ''));
        renderExerciseContent(exerciseNumber);
    }
}

function updateExerciseScore(exerciseNumber) {
    const candidate = appState.activeCandidates[appState.currentCandidateIndex];
    const exercise = exercisesData[exerciseNumber];
    
    let totalScore = 0;
    exercise.questions.forEach(question => {
        totalScore += getCandidateQuestionScore(candidate.number, exerciseNumber, question.id);
    });

    const scoreElement = document.getElementById(`exerciseScore${exerciseNumber}`);
    if (scoreElement) {
        scoreElement.textContent = `${totalScore} / ${exercise.totalPoints} pts`;
        
        // Appliquer les styles selon le score
        const percentage = (totalScore / exercise.totalPoints) * 100;
        scoreElement.className = 'exercise-score-badge';
        
        if (percentage === 100) {
            scoreElement.classList.add('perfect-score');
        } else if (percentage >= 75) {
            scoreElement.classList.add('good-score');
        }
        // Sinon, garde le style par défaut (bleu)
    }
}

function updateTotalScore() {
    const candidate = appState.activeCandidates[appState.currentCandidateIndex];
    let totalScore = 0;
    let totalPossible = 0;

    // Boucler uniquement sur les exercices qui existent
    Object.keys(exercisesData).forEach(ex => {
        const exercise = exercisesData[ex];
        if (!exercise) return;
        totalPossible += exercise.totalPoints;
        exercise.questions.forEach(question => {
            totalScore += getCandidateQuestionScore(candidate.number, ex, question.id);
        });
    });

    // Mettre à jour le score
    document.getElementById('totalScoreDisplay').textContent = 
        `Score: ${totalScore} / ${totalPossible} points`;
    
    // Mettre à jour la progression
    const { questionsAnswered, totalQuestions } = calculateCandidateProgress(candidate.number);
    const percentage = Math.round((questionsAnswered / totalQuestions) * 100);
    document.getElementById('progressInfo').textContent = 
        `Progression : ${percentage}% (${questionsAnswered}/${totalQuestions} questions)`;
    
    // Mettre à jour l'affichage du bouton de validation
    updateNavigationButtons();
}

// === GESTION DU MODE DE CORRECTION ===
function updateCorrectionMode() {
    const selectedMode = document.getElementById('correctionMode').value;
    const modeSelector = document.getElementById('correctionModeSelector');
    const modeInstruction = document.getElementById('modeInstruction');
    
    if (selectedMode === '') {
        // Aucun mode sélectionné
        appState.modeSelected = false;
        appState.correctionMode = '';
        modeSelector.classList.add('not-selected');
        modeInstruction.classList.add('show');
        disableCandidateCards();
    } else {
        // Mode sélectionné
        appState.modeSelected = true;
        appState.correctionMode = selectedMode;
        modeSelector.classList.remove('not-selected');
        modeInstruction.classList.remove('show');
        enableCandidateCards();
        updateNavigationLabels();
        updateNavigationButtons();
    }
}

function disableCandidateCards() {
    document.querySelectorAll('.candidate-overview-card').forEach(card => {
        card.classList.add('disabled');
        card.onclick = null;
    });
}

function enableCandidateCards() {
    document.querySelectorAll('.candidate-overview-card').forEach(card => {
        card.classList.remove('disabled');
        // Restaurer l'événement onclick depuis l'attribut data-candidate
        const candidateNumber = card.getAttribute('data-candidate');
        if (candidateNumber) {
            card.onclick = () => startCandidateCorrection(parseInt(candidateNumber));
        }
    });
}

function updateNavigationLabels() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (appState.correctionMode === 'candidate') {
        prevBtn.innerHTML = '← Candidat précédent';
        nextBtn.innerHTML = 'Candidat suivant →';
    } else {
        prevBtn.innerHTML = '← Exercice précédent';
        nextBtn.innerHTML = 'Exercice suivant →';
    }
}

// === NAVIGATION UNIFIÉE ===
function navigatePrevious() {
    if (appState.correctionMode === 'candidate') {
        previousCandidate();
    } else {
        previousExercise();
    }
}

// === SAUT VERS UN CANDIDAT QUELCONQUE (utile si copies dans le désordre) ===
function openJumpToCandidate() {
    const modal = document.getElementById('jumpCandidateModal');
    if (!modal) return;
    modal.style.display = 'flex';
    const input = document.getElementById('jumpSearchInput');
    if (input) { input.value = ''; setTimeout(() => input.focus(), 50); }
    renderJumpList('');
}

function closeJumpToCandidate() {
    const modal = document.getElementById('jumpCandidateModal');
    if (modal) modal.style.display = 'none';
}

function filterJumpList() {
    const q = (document.getElementById('jumpSearchInput').value || '').toLowerCase().trim();
    renderJumpList(q);
}

function renderJumpList(filter) {
    const list = document.getElementById('jumpCandidatesList');
    if (!list) return;
    const candidates = appState.activeCandidates || [];
    const currentNum = (appState.activeCandidates[appState.currentCandidateIndex] || {}).number;
    const labelOf = (c) => c.name || (window.candidateNamesMap || {})[c.number] || ('Candidat n°' + c.number);
    const items = candidates
        .map((c, idx) => ({ c: c, idx: idx, label: labelOf(c) }))
        .filter(it => !filter || it.label.toLowerCase().includes(filter));
    if (items.length === 0) {
        list.innerHTML = '<div style="padding:20px; text-align:center; color:#9ca3af;">Aucun élève trouvé.</div>';
        return;
    }
    list.innerHTML = items.map(it => {
        const prog = calculateCandidateProgress(it.c.number);
        const ratio = prog.totalQuestions > 0 ? (prog.questionsAnswered / prog.totalQuestions) : 0;
        let statusEmoji = '⚪'; let statusColor = '#9ca3af';
        if (ratio === 1) { statusEmoji = '✅'; statusColor = '#10b981'; }
        else if (ratio > 0) { statusEmoji = '🟡'; statusColor = '#f59e0b'; }
        const isCurrent = it.c.number === currentNum;
        return `<div onclick="jumpToCandidate(${it.idx})"
                 style="padding:12px 14px; border-bottom:1px solid #f3f4f6; cursor:pointer; display:flex; align-items:center; gap:10px; ${isCurrent ? 'background:#eef2ff;' : ''}"
                 onmouseover="this.style.background='#f9fafb';" onmouseout="this.style.background='${isCurrent ? '#eef2ff' : 'white'}';">
                <span style="font-size:1.2em;">${statusEmoji}</span>
                <span style="flex:1; font-weight:${isCurrent ? '700' : '500'}; color:#1f2937;">${it.label}</span>
                <span style="font-size:0.85em; color:${statusColor};">${prog.questionsAnswered}/${prog.totalQuestions}</span>
              </div>`;
    }).join('');
}

function jumpToCandidate(activeIndex) {
    appState.currentCandidateIndex = activeIndex;
    closeJumpToCandidate();
    // Rebuild de l'affichage candidat courant
    if (typeof loadCurrentCandidate === 'function') loadCurrentCandidate();
    if (typeof renderCurrentExercise === 'function') renderCurrentExercise();
    if (typeof updateTotalScore === 'function') updateTotalScore();
    if (typeof updateNavigationLabels === 'function') updateNavigationLabels();
    if (typeof updateNavigationButtons === 'function') updateNavigationButtons();
    if (typeof savePdfSession === 'function') savePdfSession();
}

// === RACCOURCIS CLAVIER ===
// Cmd/Ctrl+K : ouvre la recherche d'élève
// Échap : ferme la modale
// Entrée (dans le champ recherche) : saute au premier résultat
document.addEventListener('keydown', function (e) {
    // Cmd+K ou Ctrl+K → ouvrir saut candidat
    if ((e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K')) {
        // ne pas court-circuiter si on est dans un champ texte non lié à notre modale
        const activeTag = (document.activeElement && document.activeElement.tagName) || '';
        const isInput = (activeTag === 'INPUT' || activeTag === 'TEXTAREA');
        const isOurInput = document.activeElement && document.activeElement.id === 'jumpSearchInput';
        if (isInput && !isOurInput) return; // on laisse le user finir sa saisie
        e.preventDefault();
        openJumpToCandidate();
        return;
    }
    // Échap → fermer la modale de saut si ouverte
    if (e.key === 'Escape') {
        const modal = document.getElementById('jumpCandidateModal');
        if (modal && modal.style.display === 'flex') {
            closeJumpToCandidate();
            return;
        }
    }
    // Entrée dans le champ recherche → saut au premier résultat affiché
    if (e.key === 'Enter' && document.activeElement && document.activeElement.id === 'jumpSearchInput') {
        const firstItem = document.querySelector('#jumpCandidatesList > div[onclick^="jumpToCandidate"]');
        if (firstItem) {
            e.preventDefault();
            firstItem.click();
        }
    }
});

function navigateNext() {
    if (appState.correctionMode === 'candidate') {
        nextCandidate();
    } else {
        nextExercise();
    }
}

// === NAVIGATION CANDIDATS ===
function previousCandidate() {
    if (appState.currentCandidateIndex > 0) {
        appState.currentCandidateIndex--;
        loadCurrentCandidate();
    }
}

function nextCandidate() {
    if (appState.currentCandidateIndex < appState.activeCandidates.length - 1) {
        appState.currentCandidateIndex++;
        loadCurrentCandidate();
    }
}

// === NAVIGATION EXERCICES ===
function previousExercise() {
    if (appState.currentExerciseIndex > 1) {
        appState.currentExerciseIndex--;
        showTab(`exercise${appState.currentExerciseIndex}`);
    } else {
        // Si on est au premier exercice, passer au candidat précédent et au dernier exercice
        if (appState.currentCandidateIndex > 0) {
            appState.currentCandidateIndex--;
            appState.currentExerciseIndex = 5;
            loadCurrentCandidate();
            showTab(`exercise${appState.currentExerciseIndex}`);
        }
    }
}

function nextExercise() {
    if (appState.currentExerciseIndex < Object.keys(exercisesData).length) {
        appState.currentExerciseIndex++;
        showTab(`exercise${appState.currentExerciseIndex}`);
    } else {
        // Si on est au dernier exercice, passer au candidat suivant et au premier exercice
        if (appState.currentCandidateIndex < appState.activeCandidates.length - 1) {
            appState.currentCandidateIndex++;
            appState.currentExerciseIndex = 1;
            loadCurrentCandidate();
            showTab(`exercise${appState.currentExerciseIndex}`);
        } else {
            // Fin de la correction en mode exercice - proposer le bilan
            if (appState.correctionMode === 'exercise') {
                showExerciseModeCompletionSummary();
            }
        }
    }
}

function showExerciseModeCompletionSummary() {
    if (confirm('🎉 Félicitations ! Vous avez terminé la correction de tous les exercices pour tous les candidats.\n\nVoulez-vous consulter le bilan global et ajouter des commentaires individuels ?')) {
        backToCandidates();
    }
}

function updateCorrectionModeInfo() {
    const infoDiv = document.getElementById('correctionModeInfo');
    if (!infoDiv) return;
    
    if (appState.correctionMode === 'candidate') {
        infoDiv.innerHTML = '📋 <strong>Mode par candidat</strong> : Cliquez sur une carte pour corriger entièrement un candidat<br><small>💬 Bouton commentaire disponible • ✓ Validation individuelle après 100% des questions</small>';
    } else if (appState.correctionMode === 'exercise') {
        infoDiv.innerHTML = '🎯 <strong>Mode par exercice</strong> : Correction exercice par exercice pour tous les candidats<br><small>💬 Bouton commentaire disponible • 📊 Bilan global proposé à la fin</small>';
    } else {
        infoDiv.innerHTML = '';
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const validateBtn = document.getElementById('validateBtn');
    
    if (appState.correctionMode === 'candidate') {
        // Mode par candidat
        const currentIndex = appState.currentCandidateIndex;
        const isFirstCandidate = currentIndex === 0;
        const isLastCandidate = currentIndex === appState.activeCandidates.length - 1;
        
        prevBtn.disabled = isFirstCandidate;
        nextBtn.disabled = isLastCandidate;
        
        // 🎯 Afficher le numéro du candidat précédent/suivant
        const labelOf = (cand) => cand && (cand.name || (window.candidateNamesMap || {})[cand.number] || ('Candidat n°' + cand.number));
        if (isFirstCandidate) {
            prevBtn.innerHTML = '← Candidat précédent';
        } else {
            prevBtn.innerHTML = '← ' + labelOf(appState.activeCandidates[currentIndex - 1]);
        }

        if (isLastCandidate) {
            nextBtn.innerHTML = 'Candidat suivant →';
        } else {
            nextBtn.innerHTML = labelOf(appState.activeCandidates[currentIndex + 1]) + ' →';
        }
        
        // Afficher le bouton "Valider la correction" seulement si 100% des questions sont traitées
        const candidate = appState.activeCandidates[appState.currentCandidateIndex];
        const { questionsAnswered, totalQuestions } = calculateCandidateProgress(candidate.number);
        const isComplete = questionsAnswered === totalQuestions;
        
        if (validateBtn) {
            validateBtn.style.display = isComplete ? 'block' : 'none';
        }
    } else {
        // Mode par exercice
        const isFirstExerciseFirstCandidate = appState.currentExerciseIndex === 1 && appState.currentCandidateIndex === 0;
        const isLastExerciseLastCandidate = appState.currentExerciseIndex === Object.keys(exercisesData).length && appState.currentCandidateIndex === appState.activeCandidates.length - 1;
        
        prevBtn.disabled = isFirstExerciseFirstCandidate;
        nextBtn.disabled = isLastExerciseLastCandidate;
        
        // 🎯 Textes pour le mode exercice
        prevBtn.innerHTML = '← Exercice précédent';
        nextBtn.innerHTML = 'Exercice suivant →';
        
        // En mode exercice, pas de validation individuelle
        if (validateBtn) {
            validateBtn.style.display = 'none';
        }
    }
}

// === FONCTION POUR DÉTERMINER LA COULEUR DES SCORES ===
function getExerciseScoreColor(exerciseScore, exerciseNumber, candidateNumber) {
    if (exerciseScore.score === 0) {
        // Vérifier si l'exercice a été tenté (au moins une question traitée)
        const exercise = exercisesData[exerciseNumber];
        let hasAttempted = false;
        let hasOnlyNR = true;
        
        if (exercise && exercise.questions) {
            exercise.questions.forEach(question => {
                const score = getCandidateQuestionScore(candidateNumber, exerciseNumber, question.id);
                const state = getQuickButtonState(candidateNumber, exerciseNumber, question.id);
                
                // L'exercice est considéré comme tenté si :
                // - Il y a un score > 0 (même partiel)
                // - Il y a un état TF (tentative mais fausse)
                // MAIS PAS si toutes les questions sont seulement NR
                if (score > 0 || state === 'tf') {
                    hasAttempted = true;
                    hasOnlyNR = false;
                } else if (state === 'nr') {
                    // NR seul ne compte pas comme une tentative
                    hasOnlyNR = hasOnlyNR && true;
                } else if (state === 'tb') {
                    // TB avec score 0 ne devrait pas arriver, mais on le traite comme tenté
                    hasAttempted = true;
                    hasOnlyNR = false;
                }
            });
        }
        
        // Debug pour comprendre la logique
        console.log(`Exercice ${exerciseNumber} - Candidat ${candidateNumber}: hasAttempted=${hasAttempted}, hasOnlyNR=${hasOnlyNR}, couleur=${hasAttempted ? 'ROUGE' : 'GRIS'}`);
        
        // Si score = 0 ET exercice tenté (TF ou scores partiels) → Rouge (échec)
        // Si score = 0 ET exercice non tenté ou seulement NR → Gris (non rendu)
        return hasAttempted ? '#dc3545' : '#6c757d';
    }
    
    // Scores normaux selon les niveaux de maîtrise
    const percentage = exerciseScore.maxScore > 0 ? Math.round((exerciseScore.score / exerciseScore.maxScore) * 100) : 0;
    if (percentage >= 75) {
        return '#28a745'; // Vert TBM
    } else if (percentage >= 50) {
        return '#17a2b8'; // Bleu MS
    } else if (percentage >= 25) {
        return '#ffc107'; // Orange MF
    } else {
        return '#dc3545'; // Rouge MI
    }
}

// === RENDU VUE D'ENSEMBLE ===
function renderCandidatesOverview() {
    const grid = document.getElementById('candidatesOverviewGrid');
    grid.innerHTML = '';

    // Mettre à jour l'info du mode de correction
    updateCorrectionModeInfo();

    // Bouton "Réimporter corrections" : visible uniquement en mode Import PDF
    const reimportBtn = document.getElementById('btnReimportCorrections');
    if (reimportBtn) reimportBtn.style.display = (appState && appState.pdfImport && !appState.isDnb2026Mode) ? 'flex' : 'none';

    // Si un mode est déjà actif (ex: session de correction restaurée), synchroniser le
    // sélecteur visuel pour éviter le faux avertissement "choisir un mode de correction".
    if (appState.modeSelected && appState.correctionMode) {
        const modeSelectEl = document.getElementById('correctionMode');
        if (modeSelectEl && modeSelectEl.value !== appState.correctionMode) modeSelectEl.value = appState.correctionMode;
        const modeSelectorEl = document.getElementById('correctionModeSelector');
        if (modeSelectorEl) modeSelectorEl.classList.remove('not-selected');
        const modeInstructionEl = document.getElementById('modeInstruction');
        if (modeInstructionEl) modeInstructionEl.classList.remove('show');
    }

    appState.activeCandidates.forEach(candidate => {
        const details = calculateCandidateDetails(candidate.number);
        const percentage = Math.round((details.questionsAnswered / details.totalQuestions) * 100);
        
        const card = document.createElement('div');
        card.className = `candidate-overview-card ${details.status}`;
        card.setAttribute('data-candidate', candidate.number);
        card.setAttribute('data-name', candidate.name || (window.candidateNamesMap || {})[candidate.number] || ('Candidat n°' + candidate.number));

        // Désactiver la carte si aucun mode n'est sélectionné
        if (!appState.modeSelected) {
            card.classList.add('disabled');
            card.onclick = null;
        } else {
            card.onclick = () => startCandidateCorrection(candidate.number);
        }
        
        let statusText = '';
        let statusIcon = '';
        
        switch (details.status) {
            case 'not-started':
                statusText = 'Pas commencé';
                statusIcon = '⚪';
                break;
            case 'in-progress':
                statusText = 'En cours';
                statusIcon = '🟡';
                break;
            case 'completed':
                if (details.isValidated) {
                    statusText = 'Validé ✓';
                    statusIcon = '✅';
                } else {
                    statusText = 'Terminé';
                    statusIcon = '🟢';
                }
                break;
        }
        
        // Calcul du score principal à afficher avec niveaux de maîtrise
        let mainScoreText = '';
        let mainScoreClass = '';
        
        if (details.status === 'not-started') {
            mainScoreText = 'Pas commencée';
            mainScoreClass = 'not-started';
        } else if (details.status === 'completed') {
            mainScoreText = `${details.noteOn20}/20`;
            // Niveaux de maîtrise selon la note sur 20 (barème DNB 2025)
            if (details.noteOn20 >= 15) {
                mainScoreClass = details.isValidated ? 'validated tbm' : 'tbm'; // Très bonne maîtrise (≥15/20)
            } else if (details.noteOn20 >= 10) {
                mainScoreClass = details.isValidated ? 'validated ms' : 'ms'; // Maîtrise satisfaisante (≥10/20)
            } else if (details.noteOn20 >= 5) {
                mainScoreClass = details.isValidated ? 'validated mf' : 'mf'; // Maîtrise fragile (≥5/20)
            } else {
                mainScoreClass = details.isValidated ? 'validated mi' : 'mi'; // Maîtrise insuffisante (<5/20)
            }
        } else {
            mainScoreText = `${details.totalScore}/${details.maxScore}`;
            mainScoreClass = 'in-progress';
        }
        
        // Génération des scores par exercice — obligatoires puis bonus groupés sur une 2e ligne
        const isBonusExercise = (ex) => {
            const d = exercisesData[ex.exerciseNumber] || {};
            return !!d.isBonus || /^\s*bonus/i.test(d.title || '');
        };
        const renderExScore = (ex) => {
            const bonus = isBonusExercise(ex);
            const icon = bonus ? '⭐' : String(ex.exerciseNumber);
            const scoreColor = getExerciseScoreColor(ex, ex.exerciseNumber, candidate.number);
            return `
                <div class="exercise-score-container${bonus ? ' exercise-score-bonus' : ''}">
                    <div class="exercise-icon">${icon}</div>
                    <div class="exercise-score" style="background: ${scoreColor} !important; color: white !important;">${ex.score}/${ex.maxScore}</div>
                </div>`;
        };
        const obligScores = details.exerciseScores.filter(ex => !isBonusExercise(ex));
        const bonusScores = details.exerciseScores.filter(ex => isBonusExercise(ex));
        const exerciseScoresHtml = obligScores.map(renderExScore).join('')
            + (bonusScores.length ? '<div class="exercise-scores-break"></div>' + bonusScores.map(renderExScore).join('') : '');

        // Bandeau compétences (A) : 6 pastilles colorées par niveau + détail au survol (B)
        let competenceStripHtml = '';
        try {
            const compScores = (typeof calculateCompetencesScores === 'function') ? calculateCompetencesScores(candidate.number) : {};
            const chips = Object.entries(compScores).map(([name, data]) => {
                const pct = data.max > 0 ? Math.round((data.total / data.max) * 100) : 0;
                let lvl, color;
                if (pct >= 75) { lvl = 'TBM'; color = '#28a745'; }
                else if (pct >= 50) { lvl = 'MS'; color = '#17a2b8'; }
                else if (pct >= 25) { lvl = 'MF'; color = '#ffc107'; }
                else { lvl = 'MI'; color = '#dc3545'; }
                return `<div class="competence-chip" style="border-color:${color};" title="${name} : ${pct}% — ${lvl}">${data.icon || '📋'}</div>`;
            }).join('');
            if (chips) competenceStripHtml = `<div class="competence-strip">${chips}</div>`;
        } catch (e) { /* pas de bandeau si calcul indisponible */ }
        
        // Badge de validation
        const validationBadge = details.isValidated ? '<div class="validation-badge">✓</div>' : '';
        
        // Indicateur de progression global
        let globalProgressState = 'not-started';
        if (details.isValidated) {
            globalProgressState = 'perfect';
        } else if (details.status === 'completed') {
            globalProgressState = 'completed';
        } else if (details.status === 'in-progress') {
            globalProgressState = 'in-progress';
        }
        const progressIndicator = `<div class="progress-indicator ${globalProgressState}"></div>`;
        
        // Bouton commentaire
        const hasComment = appState.candidateComments[candidate.number];
        const commentTooltip = hasComment ? hasComment : 'Ajouter un commentaire';
        const commentBtn = `
            <div class="candidate-actions">
                <button class="comment-btn ${hasComment ? 'has-comment' : ''}" 
                        onclick="event.stopPropagation(); openCommentModal(${candidate.number})">
                    💬
                    <div class="comment-tooltip">${commentTooltip}</div>
                </button>
            </div>
        `;
        
        card.innerHTML = `
            ${validationBadge}
            ${progressIndicator}
            ${commentBtn}
            <div>
                <div class="candidate-header">
                    <div class="candidate-number">${candidate.name || (window.candidateNamesMap || {})[candidate.number] || ('Candidat n°' + candidate.number)}</div>
                    <div class="candidate-main-score ${mainScoreClass}">${mainScoreText}</div>
                </div>
                
                ${details.status === 'completed' ? `
                    <div class="candidate-details completed">
                        <div class="exercise-scores-grid">${exerciseScoresHtml}</div>
                        ${competenceStripHtml}
                        ${details.nrCount > 0 ? `<div class="nr-info">NR : ${details.nrCount} question${details.nrCount > 1 ? 's' : ''}</div>` : ''}
                    </div>
                ` : details.status === 'in-progress' ? `
                    <div class="candidate-details">
                        <div class="exercise-scores-grid">${exerciseScoresHtml}</div>
                        ${competenceStripHtml}
                    </div>
                ` : ''}
                
                <div class="candidate-progress-bottom">
                    ${details.questionsAnswered}/${details.totalQuestions}
                </div>
                
                ${details.status === 'completed' ? `
                    <div class="candidate-status-bottom">
                        Terminé
                    </div>
                ` : ''}
            </div>
        `;
        
        grid.appendChild(card);
    });

    // Réappliquer le filtre courant (préserve la recherche lors d'un rafraîchissement en place).
    // Le vidage + focus à l'ARRIVÉE sur la page est géré dans showPage().
    filterCandidateCards();
}

// === RECHERCHE INTELLIGENTE D'UN ÉLÈVE (page vue d'ensemble) ===
function _normalizeSearch(s) {
    return (s || '').toString().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').trim();
}

function filterCandidateCards() {
    const input = document.getElementById('candidateSearchInput');
    if (!input) return;
    const countEl = document.getElementById('candidateSearchCount');
    const clearBtn = document.getElementById('candidateSearchClear');
    const q = _normalizeSearch(input.value);
    if (clearBtn) clearBtn.style.display = input.value ? 'flex' : 'none';

    const cards = document.querySelectorAll('#candidatesOverviewGrid .candidate-overview-card');
    let visible = 0;
    cards.forEach(card => {
        const name = _normalizeSearch(card.getAttribute('data-name'));
        const num = (card.getAttribute('data-candidate') || '').toString();
        const match = !q || name.includes(q) || num.includes(q) || ('n' + num) === q;
        card.style.display = match ? '' : 'none';
        if (match) visible++;
    });

    if (countEl) {
        countEl.textContent = q ? (visible + ' élève' + (visible > 1 ? 's' : '')) : '';
        countEl.classList.toggle('none', !!q && visible === 0);
    }
}

function handleCandidateSearchKey(e) {
    if (e.key === 'Escape') { clearCandidateSearch(); return; }
    if (e.key === 'Enter') {
        const visibles = Array.from(document.querySelectorAll('#candidatesOverviewGrid .candidate-overview-card'))
            .filter(c => c.style.display !== 'none');
        if (visibles.length === 1) {
            const num = parseInt(visibles[0].getAttribute('data-candidate'), 10);
            if (!isNaN(num)) startCandidateCorrection(num);
        }
    }
}

function clearCandidateSearch() {
    const input = document.getElementById('candidateSearchInput');
    if (input) { input.value = ''; filterCandidateCards(); input.focus(); }
}

function calculateCandidateTotal(candidateNumber) {
    let total = 0;
    Object.keys(exercisesData).forEach(ex => {
        const exercise = exercisesData[ex];
        if (!exercise) return;
        exercise.questions.forEach(question => {
            total += getCandidateQuestionScore(candidateNumber, ex, question.id);
        });
    });
    return total;
}

function calculateMaxScore() {
    let total = 0;
    Object.keys(exercisesData).forEach(ex => {
        if (exercisesData[ex]) {
            total += exercisesData[ex].totalPoints;
        }
    });
    return total;
}

function calculateCandidateProgress(candidateNumber) {
    let questionsAnswered = 0;
    let totalQuestions = 0;

    Object.keys(exercisesData).forEach(ex => {
        const exercise = exercisesData[ex];
        if (!exercise) {
            console.error(`Exercice ${ex} non trouvé dans exercisesData`);
            return;
        }

        exercise.questions.forEach(question => {
            totalQuestions++;

            // Une question est considérée comme traitée si :
            // 1. Elle a un score > 0, OU
            // 2. Elle a un état de bouton rapide (TB/TF/NR)
            const hasScore = getCandidateQuestionScore(candidateNumber, ex, question.id) > 0;
            const hasQuickButtonState = getQuickButtonState(candidateNumber, ex, question.id) !== null;

            if (hasScore || hasQuickButtonState) {
                questionsAnswered++;
            }

            // Debug pour l'exercice 5
            if (ex === 5) {
                console.log(`Ex5 Q${question.id}: score=${hasScore}, state=${hasQuickButtonState}, treated=${hasScore || hasQuickButtonState}`);
            }
        });
    });

    console.log(`Total: ${questionsAnswered}/${totalQuestions} questions traitées`);
    return { questionsAnswered, totalQuestions };
}

function calculateCandidateDetails(candidateNumber) {
    const totalScore = calculateCandidateTotal(candidateNumber);
    const maxScore = calculateMaxScore();
    const { questionsAnswered, totalQuestions } = calculateCandidateProgress(candidateNumber);

    // La note sur 20 est calculée plus bas (après le détail par exercice), pour gérer
    // les exercices bonus en points additionnels plafonnés, sans diluer le dénominateur.
    let noteOn20 = 0;
    
    // Compter les questions NR
    let nrCount = 0;
    let exerciseScores = [];

    Object.keys(exercisesData).forEach(ex => {
        const exercise = exercisesData[ex];
        if (!exercise) return;

        let exerciseScore = 0;

        exercise.questions.forEach(question => {
            const questionScore = getCandidateQuestionScore(candidateNumber, ex, question.id);
            const quickButtonState = getQuickButtonState(candidateNumber, ex, question.id);

            exerciseScore += questionScore;

            if (quickButtonState === 'nr') {
                nrCount++;
            }
        });

        exerciseScores.push({
            exerciseNumber: ex,
            score: exerciseScore,
            maxScore: exercise.totalPoints
        });
    });

    // Note sur 20 : exercices de base ramenés sur 20, BONUS ajoutés en points par-dessus
    // (plafond 20). Les bonus ne doivent pas gonfler le dénominateur ni pénaliser l'élève.
    let baseScore = 0, baseMax = 0, bonusScore = 0;
    exerciseScores.forEach(es => {
        const exData = exercisesData[es.exerciseNumber] || {};
        const isBonusEx = !!exData.isBonus || /^\s*bonus/i.test(exData.title || '');
        if (isBonusEx) {
            bonusScore += es.score;
        } else {
            baseScore += es.score;
            baseMax += es.maxScore;
        }
    });
    // Mode Import PDF (option 3) : barème officiel = exercices (sur baseMax, = 18) +
    // points de présentation / maîtrise de la langue (sur 2), SANS règle de trois.
    // Hors ce mode (DNB blanc) : on conserve la mise à l'échelle /20 d'origine.
    const isPdfImport = !!(appState && appState.pdfImport);
    let presentationScore = 0, presentationAttributed = false;
    if (isPdfImport) {
        const ps = (appState.presentationScores || {})[candidateNumber];
        presentationAttributed = (typeof ps === 'number');
        presentationScore = presentationAttributed ? ps : 0;
        noteOn20 = Math.round(Math.min(20, baseScore + presentationScore + bonusScore) * 10) / 10;
    } else {
        const baseNote = baseMax > 0 ? (baseScore / baseMax) * 20 : 0;
        noteOn20 = Math.round(Math.min(20, baseNote + bonusScore) * 10) / 10;
    }

    // Déterminer le statut
    let status = 'not-started';
    const isValidated = appState.validatedCandidates[candidateNumber]?.validated || false;
    
    if (isValidated) {
        status = 'completed';
    } else if (questionsAnswered === totalQuestions) {
        status = 'completed';
    } else if (questionsAnswered > 0) {
        status = 'in-progress';
    }
    
    return {
        totalScore,
        maxScore,
        noteOn20,
        baseScore,
        baseMax,
        bonusScore,
        questionsAnswered,
        totalQuestions,
        nrCount,
        exerciseScores,
        status,
        isValidated,
        isPdfImport,
        presentationScore,
        presentationAttributed
    };
}

function startCandidateCorrection(candidateNumber) {
    // Vérifier qu'un mode de correction est sélectionné
    if (!appState.modeSelected) {
        alert('⚠️ Veuillez d\'abord choisir un mode de correction !\n\n📋 Par candidat : correction complète candidat par candidat\n🎯 Par exercice : correction exercice par exercice');
        return;
    }

    // Trouver l'index du candidat dans la liste active
    const candidateIndex = appState.activeCandidates.findIndex(c => c.number === candidateNumber);
    if (candidateIndex !== -1) {
        appState.currentCandidateIndex = candidateIndex;
        appState.currentTab = 'exercise1';
        appState.currentExerciseIndex = 1;

        // Utiliser showPage() pour une navigation cohérente
        showPage('mainPage');

        // Générer les onglets d'exercices dynamiquement
        renderExerciseTabs();
        renderExerciseTabContents();

        // Initialiser le sélecteur de mode
        const modeSelect = document.getElementById('correctionMode');
        if (modeSelect) {
            modeSelect.value = appState.correctionMode;
            updateCorrectionMode();
        }

        loadCurrentCandidate();
        renderAdminContent();
        showTab('exercise1');
    }
}

// === NAVIGATION PAGES ===
// showPage() est défini au début du fichier (ligne 11) - pas de duplication nécessaire

function backToSetup() {
    // En mode Import PDF, "Recommencer" doit revenir sur la page d'upload
    // et non sur la page de setup DNB.
    var isUpload = (new URLSearchParams(window.location.search)).get('source') === 'upload'
        || (appState && appState.pdfImport && appState.pdfImport.exercises && appState.pdfImport.exercises.length > 0);
    if (isUpload) {
        showPage('pdfImportPage');
        return;
    }
    showPage('setupPage');
}

function backToCandidates() {
    showPage('candidatesOverviewPage');
}

function backToCandidatesFromOverview() {
    showPage('candidatesPage');
}

function startCorrectionFromOverview() {
    if (appState.activeCandidates.length === 0) {
        alert('Aucun candidat actif !');
        return;
    }

    appState.currentCandidateIndex = 0;
    appState.currentTab = 'exercise1';
    appState.currentExerciseIndex = 1;

    showPage('mainPage');

    // Initialiser le sélecteur de mode (vide par défaut)
    document.getElementById('correctionMode').value = appState.correctionMode;
    updateCorrectionMode();

    loadCurrentCandidate();
    renderAdminContent();
    showTab('exercise1');
}

// === FONCTIONS EXPORT/IMPORT ===
function toggleSaveMenu(event) {
    if (event) event.stopPropagation();
    var menu = document.getElementById('saveMenu');
    if (!menu) return;
    var isOpen = menu.style.display === 'block';
    menu.style.display = isOpen ? 'none' : 'block';
    if (!isOpen) {
        setTimeout(function() {
            document.addEventListener('click', closeSaveMenuOnOutsideClick);
        }, 0);
    }
}

function closeSaveMenu() {
    var menu = document.getElementById('saveMenu');
    if (menu) menu.style.display = 'none';
    document.removeEventListener('click', closeSaveMenuOnOutsideClick);
}

function closeSaveMenuOnOutsideClick(e) {
    var menu = document.getElementById('saveMenu');
    if (menu && !menu.contains(e.target) && !e.target.closest('.save-menu-wrapper')) {
        closeSaveMenu();
    }
}

function exportJSON() {
    // Certaines propriétés de appState.pdfImport ne sont PAS sérialisables et
    // faisaient planter JSON.stringify (objet File, document pdf.js avec
    // références circulaires, PDF corrigé). On les exclut de la sauvegarde :
    // elles sont de toute façon régénérées au ré-upload du PDF.
    const replacer = (key, value) => {
        if (key === 'file' || key === 'pdfDoc' || key === '_correctedPdf') return undefined;
        if (typeof File !== 'undefined' && value instanceof File) return undefined;
        if (typeof Blob !== 'undefined' && value instanceof Blob) return undefined;
        return value;
    };

    try {
        const dataToExport = {
            appState: appState,
            exercisesData: exercisesData,
            exportDate: new Date().toISOString(),
            version: "1.0"
        };

        const jsonString = JSON.stringify(dataToExport, replacer, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = `matheval-sauvegarde-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        alert('Export JSON réussi !');
    } catch (err) {
        console.error('exportJSON a échoué :', err);
        alert('Échec de l\'export JSON : ' + (err && err.message ? err.message : err));
    }
}

function importJSON() {
    document.getElementById('importFileInput').click();
}

function handleFileImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const data = JSON.parse(e.target.result);
            
            if (data.appState && data.exercisesData) {
                if (confirm('Voulez-vous vraiment importer ces données ? Cela remplacera toute la correction en cours.')) {
                    Object.assign(appState, data.appState);
                    Object.assign(exercisesData, data.exercisesData);

                    // Re-sauvegarder immédiatement la session restaurée et amener
                    // l'utilisateur sur la vue d'ensemble (cas : restauration depuis
                    // l'écran de départ après une session perdue).
                    if (typeof savePdfSession === 'function') savePdfSession();
                    showPage('candidatesOverviewPage');
                    renderCandidatesOverview();
                    alert('Import JSON réussi !');
                }
            } else {
                alert('Fichier JSON invalide : structure de données incorrecte.');
            }
        } catch (error) {
            alert('Erreur lors de l\'import : fichier JSON invalide.');
        }
    };
    reader.readAsText(file);
    
    // Reset le input pour permettre de réimporter le même fichier
    event.target.value = '';
}

function toggleMotivationAnimation() {
    const isChecked = document.getElementById('motivationAnimation').checked;
    // Cette fonction peut être étendue pour activer des animations motivantes
    console.log('Animation motivation:', isChecked ? 'activée' : 'désactivée');
}

function resetSetup() {
    document.getElementById('startNumber').value = '';
    document.getElementById('endNumber').value = '';
    updateCandidatesPreview();
}

// === GESTION DES ONGLETS DE SÉLECTION DES CANDIDATS ===
let csvCandidates = null;

function switchCandidateTab(tab) {
    // Activer/désactiver les onglets
    document.getElementById('tabManual').classList.toggle('active', tab === 'manual');
    document.getElementById('tabCsv').classList.toggle('active', tab === 'csv');
    
    // Afficher/masquer les méthodes
    document.getElementById('manualInput').style.display = tab === 'manual' ? 'block' : 'none';
    document.getElementById('csvInput').style.display = tab === 'csv' ? 'block' : 'none';
}

function goBackToBareme() {
    showPage('baremeDesignPage');
}

// Décode un buffer en Latin1 si UTF-8 échoue (CSV Pronote)
function decodeCsvBuffer(buf) {
    const utf8 = new TextDecoder('utf-8', { fatal: false }).decode(buf);
    if (!/[�]/.test(utf8)) return utf8;
    return new TextDecoder('windows-1252').decode(buf);
}

async function handleCsvImport(event) {
    const file = event.target.files[0];
    if (!file) return;

    document.getElementById('csvFileName').textContent = file.name;

    const buf = await file.arrayBuffer();
    const text = decodeCsvBuffer(buf);
    // Auto-détecter séparateur : ; (Pronote) ou , ou tab
    const firstLine = text.split('\n')[0];
    const sep = firstLine.includes(';') ? ';' : (firstLine.includes('\t') ? '\t' : ',');
    const lines = text.trim().split('\n');
    const headerLower = lines[0].trim().toLowerCase();
    const headerCols = lines[0].split(sep).map(s => s.trim().toLowerCase().replace(/^"|"$/g, ''));

    csvCandidates = [];
    window.candidateNamesMap = {};

    // Cas 1 : format "numero" historique (DNB) — une seule colonne avec numéro
    if (headerLower.includes('numero') && !headerCols.some(c => c === 'nom' || c === 'prénom' || c === 'prenom')) {
        for (let i = 1; i < lines.length; i++) {
            const num = parseInt(lines[i].trim());
            if (!isNaN(num)) csvCandidates.push(num);
        }
    } else {
        // Cas 2 : format Pronote — colonnes NOM, Prénom, ...
        const idxNom = headerCols.findIndex(c => c === 'nom' || c === 'nom de famille' || c === 'name');
        const idxPrenom = headerCols.findIndex(c => c === 'prénom' || c === 'prenom' || c === 'first name');
        if (idxNom < 0) {
            alert('⚠️ Le CSV doit contenir soit une colonne "numero", soit une colonne "NOM" (format Pronote).');
            return;
        }
        for (let i = 1; i < lines.length; i++) {
            const row = lines[i].split(sep).map(s => s.trim().replace(/^"|"$/g, ''));
            const nom = (row[idxNom] || '').trim();
            if (!nom) continue;
            const prenom = idxPrenom >= 0 ? (row[idxPrenom] || '').trim() : '';
            const num = csvCandidates.length + 1;
            csvCandidates.push(num);
            window.candidateNamesMap[num] = prenom ? `${nom} ${prenom}` : nom;
        }
    }

    // Afficher l'aperçu
    const preview = document.getElementById('csvPreview');
    preview.style.display = 'block';
    const previewItems = csvCandidates.slice(0, 10).map(n => {
        const name = window.candidateNamesMap[n];
        return name ? `${n} — ${name}` : `${n}`;
    }).join(', ');
    preview.innerHTML = `
        <div style="font-weight: 600; margin-bottom: 10px; color: #28a745;">
            ✓ ${csvCandidates.length} candidat(s) importé(s) depuis le CSV
        </div>
        <div style="font-size: 0.9em; color: #666;">
            ${previewItems}${csvCandidates.length > 10 ? '...' : ''}
        </div>
    `;
}

// === GESTION DES COMMENTAIRES ===
let currentCommentCandidateNumber = null;

function openCommentModal(candidateNumber) {
    currentCommentCandidateNumber = candidateNumber;
    const details = calculateCandidateDetails(candidateNumber);
    
    // Remplir la modale avec les informations du candidat (nom Pronote ou numéro)
    const _cand = (appState.candidates || []).find(c => c.number === candidateNumber);
    const _label = (_cand && _cand.name) || (window.candidateNamesMap || {})[candidateNumber] || ('n°' + candidateNumber);
    document.getElementById('commentCandidateNumber').textContent = _label;
    document.getElementById('commentScore').textContent = details.noteOn20;
    document.getElementById('commentProgress').textContent = `${details.questionsAnswered}/${details.totalQuestions} questions traitées`;
    
    if (details.nrCount > 0) {
        document.getElementById('commentNR').textContent = `• ${details.nrCount} question${details.nrCount > 1 ? 's' : ''} non rendue${details.nrCount > 1 ? 's' : ''}`;
    } else {
        document.getElementById('commentNR').textContent = '';
    }
    
    // Charger le commentaire existant
    document.getElementById('candidateComment').value = appState.candidateComments[candidateNumber] || '';
    
    // Afficher la modale
    document.getElementById('commentModal').classList.add('active');
}

function closeCommentModal() {
    document.getElementById('commentModal').classList.remove('active');
    currentCommentCandidateNumber = null;
}

function saveComment() {
    if (currentCommentCandidateNumber === null) return;
    
    const comment = document.getElementById('candidateComment').value.trim();
    
    if (comment) {
        appState.candidateComments[currentCommentCandidateNumber] = comment;
    } else {
        delete appState.candidateComments[currentCommentCandidateNumber];
    }
    
    closeCommentModal();
    saveData();
    updateOverviewIfVisible();
}

// === FONCTION DE DIAGNOSTIC ===
function diagnoseCandidateProgress(candidateNumber) {
    console.log(`=== DIAGNOSTIC CANDIDAT ${candidateNumber} ===`);

    Object.keys(exercisesData).forEach(ex => {
        const exercise = exercisesData[ex];
        console.log(`\nExercice ${ex}: ${exercise?.title || 'NON DÉFINI'}`);
        
        if (exercise && exercise.questions) {
            exercise.questions.forEach(question => {
                const score = getCandidateQuestionScore(candidateNumber, ex, question.id);
                const state = getQuickButtonState(candidateNumber, ex, question.id);
                const treated = score > 0 || state !== null;

                console.log(`  Q${question.id}: score=${score}, state=${state}, treated=${treated}`);
            });
        } else {
            console.log(`  ERREUR: Exercice ${ex} mal défini`);
        }
    });

    const { questionsAnswered, totalQuestions } = calculateCandidateProgress(candidateNumber);
    console.log(`\nRÉSULTAT: ${questionsAnswered}/${totalQuestions} questions traitées`);
}

// === VALIDATION DE CORRECTION ===
function validateCorrection() {
    const candidate = appState.activeCandidates[appState.currentCandidateIndex];
    
    // Diagnostic pour debug
    diagnoseCandidateProgress(candidate.number);
    
    const details = calculateCandidateDetails(candidate.number);
    
    // Vérifier si toutes les questions sont traitées
    if (details.questionsAnswered < details.totalQuestions) {
        if (!confirm(`Attention ! Seulement ${details.questionsAnswered}/${details.totalQuestions} questions ont été traitées.\n\nVoulez-vous vraiment valider cette correction incomplète ?`)) {
            return;
        }
    }
    
    // Calculer les scores par compétence
    const competencesScores = calculateCompetencesScores(candidate.number);
    
    // Remplir la modale avec les informations du candidat (nom Pronote ou numéro)
    document.getElementById('validationCandidateNumber').textContent =
        candidate.name || (window.candidateNamesMap || {})[candidate.number] || ('n°' + candidate.number);
    document.getElementById('validationMainScore').textContent = `${details.noteOn20}/20`;

    // Appliquer la couleur selon le niveau de maîtrise (barème DNB 2025)
    const mainScoreElement = document.getElementById('validationMainScore');
    mainScoreElement.className = 'main-score-badge';
    if (details.noteOn20 >= 15) {
        mainScoreElement.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
    } else if (details.noteOn20 >= 10) {
        mainScoreElement.style.background = 'linear-gradient(135deg, #17a2b8, #007bff)';
    } else if (details.noteOn20 >= 5) {
        mainScoreElement.style.background = 'linear-gradient(135deg, #ffc107, #fd7e14)';
    } else {
        mainScoreElement.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
    }
    
    if (details.nrCount > 0) {
        document.getElementById('validationNR').textContent = ` • ${details.nrCount} question${details.nrCount > 1 ? 's' : ''} non rendue${details.nrCount > 1 ? 's' : ''}`;
        document.getElementById('validationNR').style.color = '#dc3545';
    } else {
        document.getElementById('validationNR').textContent = '';
    }
    
    // Charger le commentaire existant
    const existingComment = appState.candidateComments[candidate.number] || '';
    document.getElementById('validationComment').value = existingComment;
    
    // Note réelle (transparence) : détail base + bonus, plafonné à 20
    const rawScoreEl = document.getElementById('validationRawScore');
    if (rawScoreEl) {
        const fmtFr = (n) => Number(n).toString().replace('.', ',');
        if (details.bonusScore > 0) {
            const raw = Math.round((details.baseScore + details.bonusScore) * 10) / 10;
            rawScoreEl.textContent = `Base ${fmtFr(details.baseScore)}/${fmtFr(details.baseMax)} + bonus ${fmtFr(details.bonusScore)}`
                + (raw > 20 ? ' → plafonné à 20' : ` → ${fmtFr(raw)}/20`);
        } else {
            rawScoreEl.textContent = `Base ${fmtFr(details.baseScore)}/${fmtFr(details.baseMax)}`;
        }
    }

    // Générer les grilles des exercices et compétences
    renderExercisesValidation(candidate.number);
    renderCompetencesValidation(competencesScores);
    renderNRGrid(candidate.number);

    // Gérer l'affichage du bouton "candidat suivant"
    const btnValidateNext = document.getElementById('btnValidateNext');
    const isLastCandidate = appState.currentCandidateIndex >= appState.activeCandidates.length - 1;
    
    if (isLastCandidate) {
        btnValidateNext.disabled = true;
        btnValidateNext.innerHTML = '🏁 <strong>Dernier candidat</strong>';
        btnValidateNext.title = 'Vous êtes sur le dernier candidat';
        btnValidateNext.style.background = '#6c757d';
        btnValidateNext.style.cursor = 'not-allowed';
    } else {
        btnValidateNext.disabled = false;
        const nextCandidate = appState.activeCandidates[appState.currentCandidateIndex + 1];
        const nextLabel = nextCandidate.name || (window.candidateNamesMap || {})[nextCandidate.number] || ('n°' + nextCandidate.number);
        btnValidateNext.innerHTML = `➡️ Valider et passer à <strong style="color: #fff; background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 12px;">${nextLabel}</strong>`;
        btnValidateNext.title = `Valider et passer à ${nextLabel}`;
        btnValidateNext.style.background = '#17a2b8';
        btnValidateNext.style.cursor = 'pointer';
    }
    btnValidateNext.dataset.last = isLastCandidate ? '1' : '0';

    // Initialiser le contrôle "présentation / maîtrise de la langue" (mode Import PDF)
    setupPresentationControl(candidate.number);

    // Afficher la modale
    document.getElementById('validationModal').classList.add('active');
}

function closeValidationModal() {
    document.getElementById('validationModal').classList.remove('active');
}

// === Points de présentation / maîtrise de la langue (sur 2) — mode Import PDF ===
function setupPresentationControl(candidateNumber) {
    const box = document.getElementById('presentationBox');
    const slider = document.getElementById('presentationSlider');
    const isPdfImport = !!(appState && appState.pdfImport);
    if (box) box.style.display = isPdfImport ? 'block' : 'none';
    if (!isPdfImport || !slider) return;
    if (!appState.presentationScores) appState.presentationScores = {};
    const ps = appState.presentationScores[candidateNumber];
    slider.value = (typeof ps === 'number') ? ps : 0;
    updatePresentationUI();
}

function markPresentationTouched() {
    const candidate = appState.activeCandidates[appState.currentCandidateIndex];
    if (!candidate) return;
    if (!appState.presentationScores) appState.presentationScores = {};
    // Première interaction = attribution (même si la valeur reste 0)
    if (typeof appState.presentationScores[candidate.number] !== 'number') {
        const slider = document.getElementById('presentationSlider');
        appState.presentationScores[candidate.number] = slider ? parseFloat(slider.value) : 0;
        updatePresentationUI();
    }
}

function onPresentationSliderInput(value) {
    const candidate = appState.activeCandidates[appState.currentCandidateIndex];
    if (!candidate) return;
    if (!appState.presentationScores) appState.presentationScores = {};
    appState.presentationScores[candidate.number] = parseFloat(value);
    updatePresentationUI();
}

function updatePresentationUI() {
    const candidate = appState.activeCandidates[appState.currentCandidateIndex];
    if (!candidate) return;
    const details = calculateCandidateDetails(candidate.number);
    const ps = (appState.presentationScores || {})[candidate.number];
    const attributed = (typeof ps === 'number');

    const valEl = document.getElementById('presentationValue');
    if (valEl) valEl.textContent = attributed ? (ps.toString().replace('.', ',') + ' / 2') : '— / 2';

    const hintEl = document.getElementById('presentationHint');
    if (hintEl) hintEl.style.display = attributed ? 'none' : 'block';

    const boxEl = document.getElementById('presentationBox');
    if (boxEl) {
        boxEl.style.borderColor = attributed ? '#86efac' : '#fca5a5';
        boxEl.style.background = attributed ? '#f0fdf4' : '#fef2f2';
    }

    const mainScoreElement = document.getElementById('validationMainScore');
    if (mainScoreElement) {
        mainScoreElement.textContent = `${details.noteOn20}/20`;
        if (details.noteOn20 >= 15) mainScoreElement.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
        else if (details.noteOn20 >= 10) mainScoreElement.style.background = 'linear-gradient(135deg, #17a2b8, #007bff)';
        else if (details.noteOn20 >= 5) mainScoreElement.style.background = 'linear-gradient(135deg, #ffc107, #fd7e14)';
        else mainScoreElement.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
    }

    refreshValidationButtonsState(details);
}

function refreshValidationButtonsState(details) {
    const block = !!(details.isPdfImport && !details.presentationAttributed);
    const btnReturn = document.querySelector('#validationModal .btn-validate');
    if (btnReturn) {
        btnReturn.disabled = block;
        btnReturn.style.opacity = block ? '0.5' : '1';
        btnReturn.style.cursor = block ? 'not-allowed' : 'pointer';
    }
    const btnNext = document.getElementById('btnValidateNext');
    if (btnNext) {
        const isLast = btnNext.dataset.last === '1';
        btnNext.disabled = block || isLast;
        if (!isLast) {
            btnNext.style.opacity = block ? '0.5' : '1';
            btnNext.style.cursor = block ? 'not-allowed' : 'pointer';
        }
    }
}

// Réimport du JSON de corrections depuis le presse-papier (déclenché par un clic réel,
// ce qui autorise navigator.clipboard.readText() — impossible depuis la console).
function reimportCorrectionsFromClipboard() {
    if (typeof parseJsonCorrection !== 'function') {
        alert("La fonction d'import des corrections est indisponible.");
        return;
    }
    // Le navigateur bloque souvent la lecture auto du presse-papier : on propose un collage
    // manuel (⌘V) dans un champ texte, puis import via parseJsonCorrection().
    const existing = document.getElementById('reimportPasteModal');
    if (existing) existing.remove();
    const overlay = document.createElement('div');
    overlay.id = 'reimportPasteModal';
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:20000;display:flex;align-items:center;justify-content:center;';
    overlay.innerHTML =
        '<div style="background:#fff;border-radius:14px;max-width:560px;width:92%;padding:22px;box-shadow:0 20px 60px rgba(0,0,0,.3);">' +
            '<h3 style="margin:0 0 6px;font-size:1.2em;color:#1f2937;">🔄 Réimporter les corrections</h3>' +
            '<p style="margin:0 0 6px;color:#6b7280;font-size:.92em;">Clique dans le champ, fais <strong>⌘V</strong> pour coller le JSON, puis <strong>Importer</strong>.</p>' +
            '<p style="margin:0 0 12px;color:#b45309;font-size:.82em;">⚠️ À faire avant de corriger les vraies copies (les scores déjà saisis peuvent être réinitialisés).</p>' +
            '<textarea id="reimportPasteArea" style="width:100%;height:150px;border:2px solid #d1d5db;border-radius:8px;padding:10px;font-family:monospace;font-size:.8em;box-sizing:border-box;" placeholder="Colle ici le JSON (⌘V)…"></textarea>' +
            '<div style="display:flex;justify-content:flex-end;gap:10px;margin-top:14px;">' +
                '<button id="reimportCancelBtn" style="padding:9px 16px;border:none;border-radius:8px;background:#e5e7eb;color:#374151;font-weight:600;cursor:pointer;">Annuler</button>' +
                '<button id="reimportConfirmBtn" style="padding:9px 16px;border:none;border-radius:8px;background:#8b5cf6;color:#fff;font-weight:600;cursor:pointer;">Importer</button>' +
            '</div>' +
        '</div>';
    document.body.appendChild(overlay);
    const area = document.getElementById('reimportPasteArea');
    setTimeout(function () { try { area.focus(); } catch (e) {} }, 50);
    document.getElementById('reimportCancelBtn').onclick = function () { overlay.remove(); };
    document.getElementById('reimportConfirmBtn').onclick = function () {
        const txt = area.value;
        if (!txt || !txt.trim()) { alert('Colle d\'abord le JSON dans le champ (⌘V).'); return; }
        try { JSON.parse(txt); } catch (e) { alert('Le contenu collé n\'est pas un JSON valide.'); return; }
        // Le champ #jsonCorrectionInput (étape 4 du workflow) peut être absent du DOM
        // quand on déclenche le réimport depuis la vue candidats : on le crée caché.
        let target = document.getElementById('jsonCorrectionInput');
        if (!target) {
            target = document.createElement('textarea');
            target.id = 'jsonCorrectionInput';
            target.style.display = 'none';
            document.body.appendChild(target);
        }
        target.value = txt;
        overlay.remove();
        try {
            parseJsonCorrection();
            alert('✅ Corrections réimportées (énoncés, barème, compétences, figures, QCM).');
        } catch (e) {
            alert('Erreur lors de l\'import : ' + e.message);
        }
    };
}

function ensurePresentationAttributed() {
    if (!(appState && appState.pdfImport)) return true;
    const candidate = appState.activeCandidates[appState.currentCandidateIndex];
    const ps = (appState.presentationScores || {})[candidate && candidate.number];
    if (typeof ps !== 'number') {
        const hintEl = document.getElementById('presentationHint');
        if (hintEl) { hintEl.style.display = 'block'; hintEl.textContent = '⚠️ Attribue les points de présentation (même 0) avant de valider.'; }
        const boxEl = document.getElementById('presentationBox');
        if (boxEl) boxEl.style.borderColor = '#dc2626';
        return false;
    }
    return true;
}



function calculateCompetencesScores(candidateNumber) {
    const competencesData = {
        'Calculer': { total: 0, max: 0, itemsSuccess: 0, itemsTotal: 0, icon: '🧮' },
        'Modéliser': { total: 0, max: 0, itemsSuccess: 0, itemsTotal: 0, icon: '📊' },
        'Représenter': { total: 0, max: 0, itemsSuccess: 0, itemsTotal: 0, icon: '📈' },
        'Raisonner': { total: 0, max: 0, itemsSuccess: 0, itemsTotal: 0, icon: '🤔' },
        'Communiquer': { total: 0, max: 0, itemsSuccess: 0, itemsTotal: 0, icon: '💬' },
        'Chercher': { total: 0, max: 0, itemsSuccess: 0, itemsTotal: 0, icon: '🔍' }
    };

    // Parcourir tous les exercices et questions
    Object.keys(exercisesData).forEach(ex => {
        const exercise = exercisesData[ex];
        if (!exercise) return;

        exercise.questions.forEach(question => {
            question.competences.forEach(comp => {
                const competenceType = comp.name.split(' ')[0]; // Prendre le premier mot
                if (competencesData[competenceType]) {
                    const candidateScore = getCandidateCompetenceScore(candidateNumber, ex, question.id, comp.name);
                    competencesData[competenceType].total += candidateScore;
                    competencesData[competenceType].max += comp.points;
                    competencesData[competenceType].itemsTotal += 1;
                    
                    // Un item est considéré comme réussi s'il a au moins 50% des points
                    const successThreshold = comp.points * 0.5;
                    if (candidateScore >= successThreshold) {
                        competencesData[competenceType].itemsSuccess += 1;
                    }
                    
                    // Debug pour voir quelles compétences sont trouvées
                    if (candidateScore > 0) {
                        console.log(`Compétence ${competenceType}: +${candidateScore}/${comp.points} pts (Ex${ex} Q${question.id}) - ${candidateScore >= successThreshold ? 'RÉUSSI' : 'ÉCHOUÉ'}`);
                    }
                } else {
                    console.warn(`Compétence non reconnue: ${competenceType} dans Ex${ex} Q${question.id}`);
                }
            });
        });
    });

    // Debug final
    console.log('Scores finaux des compétences:', competencesData);
    
    return competencesData;
}

function renderExercisesValidation(candidateNumber) {
    const container = document.getElementById('exercisesValidationGrid');
    container.innerHTML = '';
    
    // Récupérer les scores par exercice depuis calculateCandidateDetails
    const details = calculateCandidateDetails(candidateNumber);
    
    const exercisesInfo = [
        { name: 'Probabilités', icon: '🎲' },
        { name: 'Géométrie', icon: '📐' },
        { name: 'QCM', icon: '☐' },
        { name: 'Algorithmes', icon: '💻' },
        { name: 'Fonctions', icon: '📈' }
    ];
    
    let bonusSeparatorAdded = false;
    details.exerciseScores.forEach((exerciseScore) => {
        const exData = (window.exercisesData && exercisesData[exerciseScore.exerciseNumber]) || {};
        const title = exData.title || ('Exercice ' + exerciseScore.exerciseNumber);
        const isBonus = !!exData.isBonus || /^\s*bonus/i.test(title);

        // Séparateur visuel net entre exercices obligatoires et bonus
        if (isBonus && !bonusSeparatorAdded) {
            const sep = document.createElement('div');
            sep.className = 'exercise-badge-separator';
            sep.style.cssText = 'align-self:stretch;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;padding:4px 10px;margin:0 4px;color:#b45309;font-weight:800;font-size:0.75em;border-left:3px dashed #f59e0b;';
            sep.innerHTML = '⭐<span>BONUS</span>';
            container.appendChild(sep);
            bonusSeparatorAdded = true;
        }

        // Obligatoire : numéro de l'exercice ; bonus : étoile pour tous
        const icon = isBonus ? '⭐' : String(exerciseScore.exerciseNumber);
        const name = isBonus ? title : title.replace(/^Exercice\s+/i, 'Ex ');
        const scoreColor = getExerciseScoreColor(exerciseScore, exerciseScore.exerciseNumber, candidateNumber);

        const badge = document.createElement('div');
        badge.className = 'exercise-badge' + (isBonus ? ' exercise-badge-bonus' : '');
        if (isBonus) badge.style.background = '#fffbeb';
        badge.innerHTML = `
            <div class="exercise-badge-icon">${icon}</div>
            <div class="exercise-badge-name">${name}</div>
            <div class="exercise-badge-score" style="background: ${scoreColor} !important;">
                ${exerciseScore.score}/${exerciseScore.maxScore}
            </div>
        `;

        container.appendChild(badge);
    });
}

// Encart "Questions par exercice" : un carré par question (vert=réussi, orange=partiel,
// rouge=raté, gris=NR), avec compteur points obtenus/max par exercice + total.
// Obligatoires = numéro ; bonus = ⭐.
function renderNRGrid(candidateNumber) {
    const container = document.getElementById('nrGridContainer');
    if (!container) return;
    const fmt = (n) => Number(n).toString().replace('.', ',');
    const shortName = (title) => {
        if (!title) return '';
        return title
            .replace(/^Exercice\s+\d+\s*[—–-]\s*/i, '')
            .replace(/^BONUS\s+\d+\s*[—–-]\s*/i, '');
    };

    let totalEarned = 0, totalMax = 0;
    let html = '<div class="nr-grid-title">Questions par exercice</div>';

    Object.keys(exercisesData).forEach(exKey => {
        const exercise = exercisesData[exKey];
        if (!exercise || !exercise.questions) return;
        const isBonus = !!exercise.isBonus || /^\s*bonus/i.test(exercise.title || '');
        const icon = isBonus ? '⭐' : String(exKey);
        const name = shortName(exercise.title);

        let exEarned = 0, exMax = 0;
        const qHtml = [];
        exercise.questions.forEach((question, qIndex) => {
            const qKey = question.id || `q${qIndex}`;
            const quickState = appState.quickButtonStates[candidateNumber]?.[exKey]?.[qKey];
            const scoreData = appState.scores[candidateNumber]?.[exKey]?.[qKey];
            const qScore = (scoreData && typeof scoreData.score === 'number') ? scoreData.score : 0;
            const qMax = question.points || 0;
            exMax += qMax;

            let cls = '';
            let tip = `Q${qIndex + 1}`;
            if (quickState === 'nr') { cls = 'nr'; tip += ' — Non rendue'; }
            else if (quickState === 'tb') { cls = 'answered'; exEarned += qMax; tip += ' — Très bien'; }
            else if (quickState === 'tf') { cls = 'wrong'; tip += ' — Faux'; }
            else if (scoreData && Object.keys(scoreData).length > 0) {
                exEarned += qScore;
                if (qMax > 0 && qScore >= qMax) { cls = 'answered'; }
                else if (qScore > 0) { cls = 'partial'; }
                else { cls = 'wrong'; }
                tip += ` — ${fmt(qScore)}/${fmt(qMax)}`;
            }
            qHtml.push(`<div class="nr-grid-question ${cls}" title="${tip}"></div>`);
        });

        totalEarned += exEarned; totalMax += exMax;
        const allOk = exMax > 0 && exEarned === exMax;
        html += `
            <div class="nr-grid-exercise${isBonus ? ' nr-grid-bonus' : ''}">
                <span class="nr-grid-exercise-icon">${icon}</span>
                <span class="nr-grid-exercise-name" title="${(exercise.title || '').replace(/"/g, '&quot;')}">${name}</span>
                <div class="nr-grid-questions">${qHtml.join('')}</div>
                <span class="nr-grid-count ${allOk ? 'all-answered' : ''}">${fmt(exEarned)}/${fmt(exMax)}</span>
            </div>`;
    });

    const allPerfect = totalMax > 0 && totalEarned === totalMax;
    html += `
        <div class="nr-grid-total">
            <span class="nr-grid-total-label">Total</span>
            <span class="nr-grid-total-value ${!allPerfect ? 'has-nr' : ''}">${fmt(totalEarned)}/${fmt(totalMax)}</span>
        </div>`;

    container.innerHTML = html;
}

function renderCompetencesValidation(competencesScores) {
    const tbody = document.getElementById('competencesValidationTable');
    tbody.innerHTML = '';
    
    Object.entries(competencesScores).forEach(([competenceName, data]) => {
        const percentage = data.max > 0 ? Math.round((data.total / data.max) * 100) : 0;
        
        let levelText = '';
        let levelColor = '';
        
        if (percentage >= 75) {
            levelText = 'TBM';
            levelColor = '#28a745';
        } else if (percentage >= 50) {
            levelText = 'MS';
            levelColor = '#17a2b8';
        } else if (percentage >= 25) {
            levelText = 'MF';
            levelColor = '#ffc107';
        } else {
            levelText = 'MI';
            levelColor = '#dc3545';
        }
        
        const row = document.createElement('tr');
        // Trouver la couleur de la compétence dans le code
        const defaultComp = defaultCompetences.find(dc => dc.name === competenceName);
        const competenceColor = defaultComp ? defaultComp.color : '#6c757d';
        
        row.innerHTML = `
            <td>
                <div class="competence-name">
                    <span style="font-size: 16px;">${data.icon}</span>
                    <span class="competence-name-text" style="color: ${competenceColor};">${competenceName}</span>
                </div>
            </td>
            <td>
                <div class="competence-percentage" style="color: ${levelColor};">
                    ${percentage}%
                </div>
                <div class="competence-items" style="font-size: 0.75em; color: #6c757d; margin-top: 2px;">
                    ${data.itemsSuccess}/${data.itemsTotal} items
                </div>
            </td>
            <td>
                <div class="competence-level">
                    <span class="level-badge" style="background: ${levelColor};">
                        ${levelText}
                    </span>
                </div>
            </td>
            <td>
                <div class="competence-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percentage}%; background: ${levelColor};"></div>
                    </div>
                </div>
            </td>
        `;
        
        tbody.appendChild(row);
    });
}

function renderCompetencesSynthesis(competencesScores) {
    const grid = document.getElementById('competencesSynthesisGrid');
    grid.innerHTML = '';
    
    Object.entries(competencesScores).forEach(([competenceName, data]) => {
        const percentage = data.max > 0 ? Math.round((data.total / data.max) * 100) : 0;
        
        let levelText = '';
        let levelClass = '';
        let levelColor = '';
        
        if (percentage >= 75) {
            levelText = 'TBM';
            levelClass = 'tbm';
            levelColor = '#28a745';
        } else if (percentage >= 50) {
            levelText = 'MS';
            levelClass = 'ms';
            levelColor = '#17a2b8';
        } else if (percentage >= 25) {
            levelText = 'MF';
            levelClass = 'mf';
            levelColor = '#ffc107';
        } else {
            levelText = 'MI';
            levelClass = 'mi';
            levelColor = '#dc3545';
        }
        
        const item = document.createElement('div');
        item.className = 'competence-synthesis-item';
        item.innerHTML = `
            <div class="competence-synthesis-icon">${data.icon}</div>
            <div class="competence-synthesis-name">${competenceName}</div>
            <div class="competence-synthesis-percentage" style="color: ${levelColor};">${percentage}%</div>
            <div class="competence-synthesis-progress">
                <div class="competence-synthesis-progress-bar" style="width: ${percentage}%; background: ${levelColor};"></div>
            </div>
            <div class="competence-synthesis-level" style="background: ${levelColor};">${levelText}</div>
            <div class="competence-synthesis-score">${data.total}/${data.max} pts</div>
            <div class="competence-synthesis-items" style="font-size: 0.7em; color: #6c757d; margin-top: 2px;">
                ${data.itemsSuccess}/${data.itemsTotal} items réussis
            </div>
        `;
        
        grid.appendChild(item);
    });
}

function closeSynthesisModal() {
    document.getElementById('competencesSynthesisModal').classList.remove('active');
}

// === DICTÉE VOCALE ===
let recognition = null;
let isListening = false;

function initSpeechRecognition() {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
    } else if ('SpeechRecognition' in window) {
        recognition = new SpeechRecognition();
    } else {
        return false;
    }

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'fr-FR';

    recognition.onstart = function() {
        isListening = true;
        document.getElementById('voiceBtn').classList.add('listening');
        document.getElementById('voiceBtn').textContent = '⏹️ Arrêter';
        document.getElementById('voiceStatus').style.display = 'block';
    };

    recognition.onend = function() {
        isListening = false;
        document.getElementById('voiceBtn').classList.remove('listening');
        document.getElementById('voiceBtn').textContent = '🎤 Dictée vocale';
        document.getElementById('voiceStatus').style.display = 'none';
    };

    recognition.onresult = function(event) {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
            if (event.results[i].isFinal) {
                finalTranscript += event.results[i][0].transcript;
            }
        }

        if (finalTranscript) {
            const textarea = document.getElementById('validationComment');
            const formattedText = formatSpeechText(finalTranscript);
            
            // Ajouter le texte formaté au contenu existant
            if (textarea.value && !textarea.value.endsWith(' ')) {
                textarea.value += ' ';
            }
            textarea.value += formattedText;
        }
    };

    recognition.onerror = function(event) {
        console.error('Erreur de reconnaissance vocale:', event.error);
        isListening = false;
        document.getElementById('voiceBtn').classList.remove('listening');
        document.getElementById('voiceBtn').textContent = '🎤 Dictée vocale';
        document.getElementById('voiceStatus').style.display = 'none';
    };

    return true;
}

function formatSpeechText(text) {
    // Nettoyer le texte
    let formatted = text.trim();
    
    // Mettre une majuscule au début
    if (formatted.length > 0) {
        formatted = formatted.charAt(0).toUpperCase() + formatted.slice(1);
    }
    
    // Ajouter un point final s'il n'y en a pas
    if (formatted.length > 0 && !formatted.match(/[.!?]$/)) {
        formatted += '.';
    }
    
    return formatted;
}

function toggleVoiceRecognition() {
    if (!recognition && !initSpeechRecognition()) {
        alert('La reconnaissance vocale n\'est pas supportée par votre navigateur.');
        return;
    }

    if (isListening) {
        recognition.stop();
    } else {
        recognition.start();
    }
}

function saveValidationData() {
    const candidate = appState.activeCandidates[appState.currentCandidateIndex];
    const comment = document.getElementById('validationComment').value;
    
    // Sauvegarder le commentaire
    if (comment.trim()) {
        appState.candidateComments[candidate.number] = comment.trim();
    }
    
    // Marquer le candidat comme validé
    appState.validatedCandidates[candidate.number] = {
        validated: true,
        comment: comment,
        timestamp: new Date().toISOString()
    };
    
    saveData();
    
    // Mettre à jour la vue d'ensemble si elle est active
    updateOverviewIfVisible();
}

function confirmValidationAndNext() {
    if (!ensurePresentationAttributed()) return;
    // Arrêter la dictée vocale si elle est en cours
    if (isListening && recognition) {
        recognition.stop();
    }

    saveValidationData();
    closeValidationModal();

    // Passer au candidat suivant
    if (appState.currentCandidateIndex < appState.activeCandidates.length - 1) {
        nextCandidate();
    }
}

function confirmValidationAndReturn() {
    if (!ensurePresentationAttributed()) return;
    // Arrêter la dictée vocale si elle est en cours
    if (isListening && recognition) {
        recognition.stop();
    }

    saveValidationData();
    closeValidationModal();
    
    // Vérifier s'il reste des candidats non validés
    const remainingCandidates = appState.activeCandidates.filter(c => 
        !appState.validatedCandidates[c.number]?.validated
    );
    
    if (remainingCandidates.length === 0) {
        alert('🎉 Félicitations ! Vous avez terminé la correction de tous les candidats.');
    }
    
    // Retourner à la liste des candidats
    backToCandidates();
}

function confirmSynthesisValidation() {
    const candidate = appState.activeCandidates[appState.currentCandidateIndex];
    const comment = document.getElementById('synthesisComment').value;
    
    // Sauvegarder le commentaire
    if (comment.trim()) {
        appState.candidateComments[candidate.number] = comment.trim();
    }
    
    // Marquer le candidat comme validé
    appState.validatedCandidates[candidate.number] = {
        validated: true,
        comment: comment,
        timestamp: new Date().toISOString()
    };
    
    closeSynthesisModal();
    saveData();
    
    // Mettre à jour la vue d'ensemble si elle est active
    updateOverviewIfVisible();
    
    // Passer au candidat suivant s'il y en a un
    if (appState.currentCandidateIndex < appState.activeCandidates.length - 1) {
        nextCandidate();
    } else {
        alert('🎉 Félicitations ! Vous avez terminé la correction de tous les candidats.');
        backToCandidates();
    }
}

function updateOverviewIfVisible() {
    // Toujours mettre à jour la vue d'ensemble pour que les changements soient reflétés
    if (appState.autoUpdateOverview) {
        renderCandidatesOverview();
    }
}

// === SAUVEGARDE ===
function saveData() {
    const dataToSave = {
        appState: appState,
        exercisesData: exercisesData
    };
    // Note: localStorage n'est pas disponible dans cet environnement
    // La sauvegarde se ferait normalement ici
    console.log('Données sauvegardées:', dataToSave);
    
    // Mettre à jour la vue d'ensemble après chaque sauvegarde
    updateOverviewIfVisible();
}

function loadData() {
    // Note: localStorage n'est pas disponible dans cet environnement
    // Le chargement se ferait normalement ici
    console.log('Chargement des données...');
}

// === OUTILS DE TEST ET ANIMATIONS ===

// Variable globale pour compter les copies validées
let validatedCopiesCount = 0;

// Fonction pour basculer l'affichage de la section de test
function toggleTestSection() {
    const content = document.getElementById('testSectionContent');
    const toggle = document.getElementById('testSectionToggle');
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        toggle.textContent = '🔽';
    } else {
        content.style.display = 'none';
        toggle.textContent = '▶️';
    }
}

// Générer des candidats de test
function generateTestCandidates() {
    if (confirm('Générer 5 candidats de test (150-154) ? Cela écrasera les candidats existants.')) {
        // Réinitialiser l'état
        appState.candidates = [];
        appState.activeCandidates = [];
        appState.scores = {};
        appState.quickButtonStates = {};
        appState.validatedCandidates = {};
        appState.candidateComments = {};
        
        // Générer 5 candidats
        for (let i = 150; i <= 154; i++) {
            const candidate = { number: i, active: true };
            appState.candidates.push(candidate);
            appState.activeCandidates.push(candidate);
        }
        
        // Aller à la vue d'ensemble
        showPage('candidatesOverviewPage');
        renderCandidatesOverview();
        
        alert('5 candidats de test générés avec succès !');
    }
}

// Pré-remplir tous les candidats avec des scores aléatoires
function quickFillAllCandidates() {
    if (!appState.activeCandidates.length) {
        alert('Aucun candidat actif. Générez d\'abord des candidats.');
        return;
    }
    
    if (confirm('Pré-remplir tous les candidats avec des scores aléatoires ?')) {
        appState.activeCandidates.forEach(candidate => {
            fillCandidateRandomly(candidate.number);
        });
        
        renderCandidatesOverview();
        alert('Tous les candidats ont été pré-remplis !');
    }
}

// Remplir un candidat avec des scores aléatoires
function fillCandidateRandomly(candidateNumber) {
    Object.keys(exercisesData).forEach(ex => {
        const exercise = exercisesData[ex];
        if (!exercise) return;
        
        exercise.questions.forEach(question => {
            // Score aléatoire entre 0 et le maximum de points
            const randomScore = Math.floor(Math.random() * (question.points + 1));
            
            // Répartir les points sur les compétences
            question.competences.forEach(comp => {
                const compScore = Math.min(randomScore, comp.points);
                setCandidateCompetenceScore(candidateNumber, ex, question.id, comp.name, compScore);
            });
        });
    });

    // Marquer comme validé parfois
    if (Math.random() > 0.3) {
        appState.validatedCandidates[candidateNumber] = {
            validated: true,
            comment: `Commentaire automatique pour le candidat ${candidateNumber}`,
            timestamp: new Date().toISOString()
        };
        validatedCopiesCount++;
    }
}

// Tester l'animation de motivation
function testAnimation(copiesCount) {
    validatedCopiesCount = copiesCount;
    showMotivationAnimation(copiesCount);
}

// Messages motivants variés pour chaque palier
const motivationMessages = [
    // Palier 5
    {
        icon: '🎉',
        title: 'Excellent début !',
        text: '5 copies corrigées ! Vous prenez un bon rythme !',
        colors: ['#667eea', '#764ba2']
    },
    // Palier 10
    {
        icon: '🚀',
        title: 'Formidable !',
        text: '10 copies ! Votre efficacité s\'améliore !',
        colors: ['#f093fb', '#f5576c']
    },
    // Palier 15
    {
        icon: '⭐',
        title: 'Impressionnant !',
        text: '15 copies ! Vous maîtrisez parfaitement l\'outil !',
        colors: ['#4facfe', '#00f2fe']
    },
    // Palier 20
    {
        icon: '🏆',
        title: 'Exceptionnel !',
        text: '20 copies ! Vous êtes dans une dynamique formidable !',
        colors: ['#a8edea', '#fed6e3']
    },
    // Palier 25
    {
        icon: '💎',
        title: 'Remarquable !',
        text: '25 copies ! Votre endurance est exemplaire !',
        colors: ['#ffecd2', '#fcb69f']
    },
    // Palier 30
    {
        icon: '🌟',
        title: 'Phénoménal !',
        text: '30 copies ! Vous approchez de la ligne d\'arrivée !',
        colors: ['#a8caba', '#5d9674']
    },
    // Paliers suivants (générique mais varié)
    {
        icon: '🔥',
        title: 'Incroyable performance !',
        text: 'Votre rythme de correction est impressionnant !',
        colors: ['#ff9a9e', '#fecfef']
    },
                 {
         icon: '⚡',
         title: 'Vitesse de croisière !',
         text: 'Vous corrigez avec une efficacité redoutable !',
         colors: ['#a1c4fd', '#c2e9fb']
     },
    {
        icon: '🎊',
        title: 'Concentration maximale !',
        text: 'Votre focus est exemplaire ! Bravo !',
        colors: ['#fad0c4', '#ffd1ff']
    }
];

// Afficher l'animation de motivation
function showMotivationAnimation(copiesCount) {
    const modal = document.getElementById('motivationModal');
    const icon = document.getElementById('motivationIcon');
    const title = document.getElementById('motivationTitle');
    const text = document.getElementById('motivationText');
    
    // Sélectionner le message selon le palier
    let config;
    const palierIndex = Math.floor(copiesCount / 5) - 1; // 5→0, 10→1, 15→2, etc.
    
    if (palierIndex < motivationMessages.length) {
        // Message spécifique pour ce palier
        config = motivationMessages[palierIndex];
    } else {
        // Messages alternés pour les paliers élevés
        const highPalierMessages = motivationMessages.slice(-3); // 3 derniers messages
        const messageIndex = (palierIndex - 6) % highPalierMessages.length;
        config = highPalierMessages[messageIndex];
    }
    
    // Ajouter le nombre de copies au texte
    const textWithCount = `${copiesCount} copies ! ${config.text}`;
    
    // Appliquer la configuration
    icon.textContent = config.icon;
    title.textContent = config.title;
    text.textContent = textWithCount;
    
    // Changer le dégradé de fond
    const content = modal.querySelector('.motivation-content');
    content.style.background = `linear-gradient(135deg, ${config.colors[0]} 0%, ${config.colors[1]} 100%)`;
    
    // Créer les confettis
    createConfetti();
    
    // Afficher la modal
    modal.style.display = 'flex';
    
    // Fermer automatiquement après 4 secondes
    setTimeout(() => {
        modal.style.display = 'none';
    }, 4000);
}

// Créer l'animation de confettis
function createConfetti() {
    const container = document.getElementById('confettiContainer');
    container.innerHTML = '';
    
    const colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
        container.appendChild(confetti);
    }
}

// Tester la modal de fin de correction
function testCompletionModal() {
    showCompletionModal();
}

// Afficher la modal de fin de correction
function showCompletionModal() {
    const modal = document.getElementById('completionModal');
    modal.style.display = 'flex';
    
    // Générer les questions d'évaluation
    generateSurveyQuestions();
}

// Fermer la modal de fin de correction
function closeCompletionModal() {
    document.getElementById('completionModal').style.display = 'none';
}

// Générer les questions d'évaluation
function generateSurveyQuestions() {
    const questions = [
        {
            text: "Comment évaluez-vous la facilité d'utilisation de l'outil ?",
            options: ["Très difficile", "Difficile", "Moyen", "Facile", "Très facile"]
        },
        {
            text: "L'outil vous a-t-il fait gagner du temps ?",
            options: ["Pas du tout", "Un peu", "Moyennement", "Beaucoup", "Énormément"]
        },
        {
            text: "Recommanderiez-vous cet outil à d'autres correcteurs ?",
            options: ["Pas du tout", "Probablement pas", "Peut-être", "Probablement", "Certainement"]
        }
    ];
    
    const container = document.getElementById('surveyQuestions');
    container.innerHTML = '';
    
    questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'survey-question';
        
        const questionText = document.createElement('div');
        questionText.className = 'survey-question-text';
        questionText.textContent = question.text;
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'survey-options';
        
        question.options.forEach((option, optionIndex) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'survey-option';
            
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = `question_${index}`;
            radio.value = optionIndex;
            radio.id = `q${index}_o${optionIndex}`;
            
            const label = document.createElement('label');
            label.htmlFor = `q${index}_o${optionIndex}`;
            label.textContent = option;
            
            optionDiv.appendChild(radio);
            optionDiv.appendChild(label);
            optionsDiv.appendChild(optionDiv);
        });
        
        questionDiv.appendChild(questionText);
        questionDiv.appendChild(optionsDiv);
        container.appendChild(questionDiv);
    });
}

// Afficher l'évaluation
function showSurvey() {
    document.getElementById('completionSurvey').style.display = 'block';
    document.getElementById('btnShowSurvey').style.display = 'none';
}

// Passer l'évaluation
function skipSurvey() {
    closeCompletionModal();
}

// Envoyer l'évaluation
function submitSurvey() {
    const answers = [];
    const questions = document.querySelectorAll('.survey-question');
    
    questions.forEach((question, index) => {
        const selectedOption = question.querySelector(`input[name="question_${index}"]:checked`);
        answers.push(selectedOption ? selectedOption.value : null);
    });
    
    console.log('Réponses de l\'évaluation:', answers);
    alert('Merci pour votre évaluation ! Elle sera prise en compte pour améliorer l\'outil.');
    closeCompletionModal();
}

// Exporter les données finales
function exportFinalData() {
    const finalData = {
        metadata: {
            exportDate: new Date().toISOString(),
            toolVersion: '2025.1',
            candidatesCount: appState.activeCandidates.length,
            validatedCount: Object.keys(appState.validatedCandidates).length
        },
        appState: appState,
        exercisesData: exercisesData,
        statistics: calculateFinalStatistics()
    };
    
    const blob = new Blob([JSON.stringify(finalData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `correction-dnb-final-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('Données exportées avec succès !');
}

// Calculer les statistiques finales
function calculateFinalStatistics() {
    const stats = {
        totalCandidates: appState.activeCandidates.length,
        validatedCandidates: Object.keys(appState.validatedCandidates).length,
        averageScore: 0,
        competencesStats: {},
        exercisesStats: {}
    };
    
    let totalScore = 0;
    let validatedCount = 0;
    
    appState.activeCandidates.forEach(candidate => {
        if (appState.validatedCandidates[candidate.number]?.validated) {
            const details = calculateCandidateDetails(candidate.number);
            totalScore += details.totalScore;
            validatedCount++;
        }
    });
    
    if (validatedCount > 0) {
        stats.averageScore = Math.round(totalScore / validatedCount);
    }
    
    return stats;
}

// Mettre à jour le compteur de test
function updateTestCounter() {
    const newCount = parseInt(document.getElementById('testCounter').value) || 0;
    validatedCopiesCount = newCount;
    alert(`Compteur mis à jour à ${newCount} copies validées.`);
}

// Réinitialiser toutes les données
function resetAllData() {
    if (confirm('⚠️ ATTENTION : Cela va supprimer TOUTES les données de correction. Êtes-vous sûr ?')) {
        if (confirm('Dernière confirmation : toutes les données seront perdues définitivement !')) {
            // Réinitialiser l'état complet
            appState.candidates = [];
            appState.activeCandidates = [];
            appState.scores = {};
            appState.quickButtonStates = {};
            appState.validatedCandidates = {};
            appState.candidateComments = {};
            appState.correctionMode = '';
            appState.currentExerciseIndex = 1;
            appState.modeSelected = false;
            validatedCopiesCount = 0;
            
            // Retourner à la page de configuration
            showPage('setupPage');
            
            // Réinitialiser les champs
            document.getElementById('startNumber').value = '';
            document.getElementById('endNumber').value = '';
            updateCandidatesPreview();
            
            alert('✅ Toutes les données ont été réinitialisées.');
        }
    }
}

// Vérifier automatiquement les animations de motivation
function checkMotivationTrigger() {
    const motivationEnabled = document.getElementById('motivationAnimation')?.checked;
    if (!motivationEnabled) return;
    
    const validatedCount = Object.keys(appState.validatedCandidates).length;
    
    // Déclencher l'animation aux paliers 5, 10, 15, 20, etc.
    if (validatedCount > validatedCopiesCount && validatedCount % 5 === 0) {
        validatedCopiesCount = validatedCount;
        showMotivationAnimation(validatedCount);
    }
}

// Vérifier la fin de correction
function checkCompletionTrigger() {
    const totalCandidates = appState.activeCandidates.length;
    const validatedCount = Object.keys(appState.validatedCandidates).length;
    
    if (totalCandidates > 0 && validatedCount === totalCandidates) {
        // Délai pour laisser l'animation de validation se terminer
        setTimeout(() => {
            showCompletionModal();
        }, 1000);
    }
}

// Activer/désactiver l'animation de motivation
function toggleMotivationAnimation() {
    const checkbox = document.getElementById('motivationAnimation');
    const isEnabled = checkbox.checked;
    
    if (isEnabled) {
        console.log('✅ Animations de motivation activées - Messages variés toutes les 5 copies');
    } else {
        console.log('❌ Animations de motivation désactivées');
    }
}

// === GESTION DU PANNEAU D'ADMINISTRATION ===

let currentAdminExercise = 1;

// Basculer l'affichage du panneau d'administration
// === GESTION DU PANNEAU PARAMÈTRES ===
function toggleParametresPanel() {
    const panel = document.getElementById('parametresPanel');
    const btnHeader = document.getElementById('parametresBtnHeader');
    
    if (panel.style.display === 'none' || panel.style.display === '') {
        panel.style.display = 'flex';
        if (btnHeader) btnHeader.classList.add('active');
    } else {
        panel.style.display = 'none';
        if (btnHeader) btnHeader.classList.remove('active');
    }
}

function changeBaremeMode(mode) {
    console.log(`🎛️ Changement de mode barème : ${mode}`);
    appState.baremeConfig.mode = mode;
    
    // Mettre à jour les bordures des labels
    document.querySelectorAll('input[name="baremeMode"]').forEach(input => {
        const label = input.closest('label');
        if (input.value === mode) {
            label.style.borderColor = '#4285f4';
            label.style.background = '#e3f2fd';
        } else {
            label.style.borderColor = '#dee2e6';
            label.style.background = 'white';
        }
    });
    
    // Sauvegarder dans localStorage
    localStorage.setItem('dnb_bareme_mode', mode);
    
    alert(`✅ Mode ${mode.toUpperCase()} sélectionné ! Les modifications seront appliquées lors de la prochaine configuration du barème.`);
}

function toggleAdminPanel() {
    const panel = document.getElementById('adminPanel');
    const btnHeader = document.getElementById('adminToggleBtnHeader');
    
    if (panel.style.display === 'none' || panel.style.display === '') {
        panel.style.display = 'flex';
        if (btnHeader) btnHeader.classList.add('active');
        // Charger l'exercice 1 par défaut
        showAdminExercise(1);
    } else {
        panel.style.display = 'none';
        if (btnHeader) btnHeader.classList.remove('active');
    }
}

// Afficher un onglet d'administration
function showAdminTab(tabName) {
    // Désactiver tous les onglets
    document.querySelectorAll('.admin-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelectorAll('.admin-tab-content').forEach(content => {
        content.classList.remove('active');
    });
    
    // Activer l'onglet sélectionné
    document.querySelector(`[onclick="showAdminTab('${tabName}')"]`).classList.add('active');
    document.getElementById(`admin${tabName.charAt(0).toUpperCase() + tabName.slice(1)}Tab`).classList.add('active');
}

// Afficher un exercice dans l'onglet barème
function showAdminExercise(exerciseNumber) {
    currentAdminExercise = exerciseNumber;
    
    // Mettre à jour les onglets d'exercice
    document.querySelectorAll('.admin-exercise-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[onclick="showAdminExercise(${exerciseNumber})"]`).classList.add('active');
    
    // Générer le contenu de l'exercice
    renderAdminExercise(exerciseNumber);
}

// Générer le contenu d'un exercice pour l'administration
function renderAdminExercise(exerciseNumber) {
    const container = document.getElementById('adminExerciseContent');
    const exercise = exercisesData[exerciseNumber];
    
    if (!exercise) {
        container.innerHTML = '<p>Exercice non trouvé.</p>';
        return;
    }
    
    let html = `
        <div class="admin-exercise-header">
            <h3>${exercise.title}</h3>
            <div class="exercise-total-points">Total : ${exercise.totalPoints} points</div>
        </div>
        <div class="admin-questions-list">
    `;
    
    exercise.questions.forEach(question => {
        html += `
            <div class="admin-question-card">
                <div class="admin-question-header">
                    <h4>${question.title} (${question.points} points)</h4>
                </div>
                <div class="admin-question-statement">
                    <strong>Énoncé :</strong> ${question.statement}
                </div>
                <div class="admin-question-answer">
                    <strong>Réponse attendue :</strong><br>
                    <pre>${question.answer}</pre>
                </div>
                <div class="admin-competences-list">
                    <strong>Compétences évaluées :</strong>
                    <div class="competences-grid">
        `;
        
        question.competences.forEach((comp, compIndex) => {
            const competenceId = `${exerciseNumber}_${question.id}_${compIndex}`;
            html += `
                <div class="admin-competence-item">
                    <div class="competence-badge" style="background: ${comp.color};">
                        <span class="competence-name">${comp.name}</span>
                        <span class="competence-points">${comp.points} pt</span>
                    </div>
                    <div class="competence-details">
                        <div class="competence-description">${comp.description}</div>
                        ${comp.tooltip ? `<div class="competence-tooltip-text">💡 ${comp.tooltip}</div>` : ''}
                    </div>
                    <button class="edit-competence-btn" onclick="openCompetenceModal(${exerciseNumber}, '${question.id}', ${compIndex})">
                        ✏️ Modifier
                    </button>
                </div>
            `;
        });
        
        html += `
                    </div>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// Modifier la fonction de validation pour inclure les vérifications
const originalSaveValidationData = saveValidationData;
saveValidationData = function() {
    originalSaveValidationData();
    checkMotivationTrigger();
    checkCompletionTrigger();
};

// === INITIALISATION ===
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Correcteur Universel - Initialisation');

    // 🔒 Charger le seed verrouillé depuis URL/localStorage
    loadSeedFromStorage();

    // Charger le mode de barème depuis localStorage
    const savedBaremeMode = localStorage.getItem('dnb_bareme_mode') || 'b';
    appState.baremeConfig.mode = savedBaremeMode;
    console.log(`🎛️ Mode barème chargé: ${savedBaremeMode.toUpperCase()}`);

    // 🎓 Initialiser MathALÉA si sélectionné
    if (typeof window.initMathaleaPage === 'function') {
        window.initMathaleaPage();
    }

    // DNB 2025 : Initialiser le workflow guidé
    initWorkflow();
    initAutomatismesData();

    // Détection du mode Import PDF/DOCX via ?source=upload
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('subject') === 'dnb-2026') {
        console.log('🎯 Mode DNB 2026 clé en main');
        showPage('dnb2026LaunchPage');
        if (typeof initDnb2026LaunchPage === 'function') {
            initDnb2026LaunchPage();
        }
    } else if (urlParams.get('source') === 'upload') {
        console.log('📄 Mode Import PDF/DOCX détecté');
        showPage('pdfImportPage');
        if (typeof initPdfImportPage === 'function') {
            initPdfImportPage();
        }
    }

    // Charger les numéros de candidats depuis localStorage (DEV MODE)
    const savedStartNumber = localStorage.getItem('dnb_dev_startNumber') || '150';
    const savedEndNumber = localStorage.getItem('dnb_dev_endNumber') || '170';
    
    const startNumberInput = document.getElementById('startNumber');
    const endNumberInput = document.getElementById('endNumber');
    
    startNumberInput.value = savedStartNumber;
    endNumberInput.value = savedEndNumber;
    
    console.log(`📝 Numéros de candidats chargés: ${savedStartNumber} → ${savedEndNumber}`);
    
    // Sauvegarder automatiquement à chaque changement
    startNumberInput.addEventListener('input', (e) => {
        localStorage.setItem('dnb_dev_startNumber', e.target.value);
        updateCandidatesPreview();
    });
    
    endNumberInput.addEventListener('input', (e) => {
        localStorage.setItem('dnb_dev_endNumber', e.target.value);
        updateCandidatesPreview();
    });
    
    // Mettre à jour l'aperçu au démarrage avec les valeurs sauvegardées
    updateCandidatesPreview();
    
    loadData();
    
    // Initialiser les données DNB
    initDNBData();
    
    // Event listeners pour fermer les modaux
    document.addEventListener('click', function(e) {
        if (e.target.id === 'competenceModal') {
            closeCompetenceModal();
        }
        if (e.target.id === 'competenceSelectionModal') {
            closeCompetenceSelectionModal();
        }
        if (e.target.id === 'validationModal') {
            closeValidationModal();
        }
        if (e.target.id === 'commentModal') {
            closeCommentModal();
        }
        if (e.target.id === 'competencesSynthesisModal') {
            closeSynthesisModal();
        }
        if (e.target.id === 'motivationModal') {
            document.getElementById('motivationModal').style.display = 'none';
        }
        if (e.target.id === 'completionModal') {
            closeCompletionModal();
        }
        if (e.target.id === 'adminPanel') {
            toggleAdminPanel();
        }
    });
});

// === FONCTIONS INDICATEURS DE PROGRESSION ===

// Calculer l'état d'une question pour un candidat
function getQuestionProgressState(candidateNumber, exerciseNumber, questionId) {
    const question = exercisesData[exerciseNumber].questions.find(q => q.id === questionId);
    const currentScore = getCandidateQuestionScore(candidateNumber, exerciseNumber, questionId);
    const quickButtonState = getQuickButtonState(candidateNumber, exerciseNumber, questionId);
    
    // Si bouton rapide utilisé, c'est terminé
    if (quickButtonState === 'tb') {
        return 'perfect';
    }
    if (quickButtonState === 'tf' || quickButtonState === 'nr') {
        return 'completed';
    }
    
    // Vérifier combien de compétences ont été touchées
    let competencesTouched = 0;
    let totalCompetences = question.competences.length;
    
    question.competences.forEach(comp => {
        const compScore = getCandidateCompetenceScore(candidateNumber, exerciseNumber, questionId, comp.name);
        // Une compétence est "touchée" si elle a un score défini (même 0 explicite)
        const isTouched = appState.scores[candidateNumber]?.[exerciseNumber]?.[questionId]?.competences?.hasOwnProperty(comp.name);
        if (isTouched) {
            competencesTouched++;
        }
        
        // 🐛 DEBUG : détail de chaque compétence
        if (exerciseNumber <= 2) { // Debug pour exercices 1 et 2
            console.log(`      Compétence "${comp.name}": score=${compScore}, touchée=${isTouched}`);
        }
    });
    
    // 🐛 DEBUG étendu pour plusieurs exercices
    if (exerciseNumber <= 2) { // Debug pour exercices 1 et 2
        console.log(`      🔍 Question Ex${exerciseNumber}Q${questionId}: ${competencesTouched}/${totalCompetences} compétences touchées, score: ${currentScore}/${question.points}, bouton: ${quickButtonState}`);
    }
    
    // Aucune compétence touchée = pas commencé
    if (competencesTouched === 0) {
        if (exerciseNumber <= 2) console.log(`      ➡️ État: 'not-started' (aucune compétence touchée)`);
        return 'not-started';
    }
    
    // Toutes les compétences touchées = terminé
    if (competencesTouched === totalCompetences) {
        // Score parfait = parfait
        if (currentScore === question.points) {
            if (exerciseNumber <= 2) console.log(`      ➡️ État: 'perfect' (toutes compétences + score parfait)`);
            return 'perfect';
        }
        // Sinon terminé normalement
        if (exerciseNumber <= 2) console.log(`      ➡️ État: 'completed' (toutes compétences mais score non parfait)`);
        return 'completed';
    }
    
    // Quelques compétences touchées mais pas toutes = en cours
    if (exerciseNumber <= 2) console.log(`      ➡️ État: 'in-progress' (${competencesTouched}/${totalCompetences} compétences)`);
    return 'in-progress';
}

// Calculer l'état d'un exercice pour un candidat
function getExerciseProgressState(candidateNumber, exerciseNumber) {
    const exercise = exercisesData[exerciseNumber];
    let totalScore = 0;
    let questionsCompleted = 0;
    let questionsStarted = 0;
    let totalQuestions = exercise.questions.length;
    
    // 🐛 DEBUG : Log détaillé pour cet exercice
    console.log(`  🔬 getExerciseProgressState(candidat=${candidateNumber}, exercice=${exerciseNumber}):`);
    
    exercise.questions.forEach(question => {
        const questionScore = getCandidateQuestionScore(candidateNumber, exerciseNumber, question.id);
        const questionState = getQuestionProgressState(candidateNumber, exerciseNumber, question.id);
        
        console.log(`    Q${question.id}: score=${questionScore}, état="${questionState}"`);
        
        totalScore += questionScore;
        
        if (questionState !== 'not-started') {
            questionsStarted++;
        }
        
        if (questionState === 'completed' || questionState === 'perfect') {
            questionsCompleted++;
        }
    });
    
    console.log(`  📈 Bilan: ${questionsCompleted}/${totalQuestions} terminées, ${questionsStarted}/${totalQuestions} commencées, score=${totalScore}/${exercise.totalPoints}`);
    
    // Aucune question commencée
    if (questionsStarted === 0) {
        console.log(`  ➡️ Résultat: 'not-started' (aucune question commencée)`);
        return 'not-started';
    }
    
    // Toutes les questions terminées
    if (questionsCompleted === totalQuestions) {
        // Score parfait = parfait
        if (totalScore === exercise.totalPoints) {
            console.log(`  ➡️ Résultat: 'perfect' (toutes terminées + score parfait)`);
            return 'perfect';
        }
        // Sinon terminé normalement
        console.log(`  ➡️ Résultat: 'completed' (toutes terminées mais score non parfait)`);
        return 'completed';
    }
    
    // Certaines questions en cours
    console.log(`  ➡️ Résultat: 'in-progress' (${questionsCompleted}/${totalQuestions} terminées)`);
    return 'in-progress';
}

// Variable pour traquer la compétence actuellement en cours de correction
let currentlyEditingCompetence = null; // Format: "candidateNumber_exerciseNumber_questionId_competenceName"

// Calculer l'état d'une compétence pour un candidat dans une question
function getCompetenceProgressState(candidateNumber, exerciseNumber, questionId, competenceName) {
    const question = exercisesData[exerciseNumber].questions.find(q => q.id === questionId);
    const competence = question.competences.find(c => c.name === competenceName);
    
    // Vérifier si cette compétence a été touchée (explicitement cliquée)
    const hasBeenTouched = appState.scores[candidateNumber]?.[exerciseNumber]?.[questionId]?.competences?.hasOwnProperty(competenceName);
    
    if (!hasBeenTouched) {
        return 'not-started';
    }
    
    const currentScore = getCandidateCompetenceScore(candidateNumber, exerciseNumber, questionId, competenceName);
    
    // 🎯 Pour les compétences à 1 point : toujours terminé une fois cliquée
    if (competence.points === 1) {
        if (currentScore === 1) {
            return 'perfect'; // Score maximal
        } else {
            return 'completed'; // Touchée mais pas de point (décision du correcteur)
        }
    }
    
    // 🎯 Pour les compétences multi-points (2+ pts) : nouvelle logique
    const competenceKey = `${candidateNumber}_${exerciseNumber}_${questionId}_${competenceName}`;
    
    // Si cette compétence est actuellement en cours d'édition
    if (currentlyEditingCompetence === competenceKey) {
        if (currentScore === competence.points) {
            return 'perfect'; // Score maximal atteint
        } else {
            return 'in-progress'; // En cours de correction
        }
    }
    
    // Si une autre compétence est en cours, celle-ci est terminée
    if (currentScore === competence.points) {
        return 'perfect'; // Score maximal
    } else {
        return 'completed'; // Correction terminée (score partiel accepté)
    }
}

// Créer un indicateur de progression HTML
function createProgressIndicator(state, size = 'normal') {
    const sizeClass = size === 'small' ? 'small' : size === 'large' ? 'large' : '';
    return `<div class="progress-indicator ${state} ${sizeClass}"></div>`;
}

// Mettre à jour tous les indicateurs de progression pour le candidat actuel
function updateAllProgressIndicators() {
    if (!appState.activeCandidates[appState.currentCandidateIndex]) return;
    
    const candidateNumber = appState.activeCandidates[appState.currentCandidateIndex].number;
    
    // Mettre à jour les indicateurs des onglets d'exercices
    updateTabsProgressIndicators(candidateNumber);
}

// Mettre à jour les indicateurs dans les onglets d'exercices
function updateTabsProgressIndicators(candidateNumber) {
    Object.keys(exercisesData).forEach(ex => {
        const tabButton = document.querySelector(`[onclick="showTab('exercise${ex}')"]`);
        if (tabButton) {
            // Supprimer l'ancien indicateur s'il existe
            const existingIndicator = tabButton.querySelector('.progress-indicator');
            if (existingIndicator) {
                existingIndicator.remove();
            }
            
            // Ajouter le nouvel indicateur
            const state = getExerciseProgressState(candidateNumber, ex);
            const indicator = document.createElement('div');
            indicator.className = `progress-indicator ${state}`;
            tabButton.appendChild(indicator);
        }
    });
}

// === FONCTIONS TOOLTIPS ===
function showDescriptionTooltip(event, text, tooltipId) {
    const tooltip = document.getElementById('desc_' + tooltipId);
    if (tooltip && text) {
        tooltip.style.display = 'block';
        tooltip.style.opacity = '1';
        tooltip.style.visibility = 'visible';
    }
}

function hideDescriptionTooltip(tooltipId) {
    const tooltip = document.getElementById('desc_' + tooltipId);
    if (tooltip) {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
        setTimeout(() => {
            tooltip.style.display = 'none';
        }, 300);
    }
}

function toggleOptionalTooltip(tooltipId) {
    // Fermer tous les autres tooltips facultatifs
    document.querySelectorAll('.tooltip-optional-new').forEach(el => {
        if (el.id !== tooltipId) {
            el.style.display = 'none';
        }
    });
    
    const tooltip = document.getElementById(tooltipId);
    if (tooltip) {
        tooltip.style.display = (tooltip.style.display === 'block') ? 'none' : 'block';
    }
}

// Fermer l'info-bulle facultative si on clique ailleurs
document.addEventListener('click', function(e) {
    if (!e.target.classList.contains('competence-info-i')) {
        document.querySelectorAll('.tooltip-optional-new').forEach(el => {
            el.style.display = 'none';
        });
    }
});

// === GESTION DE LA MODALE D'ÉDITION DES COMPÉTENCES DU BARÈME ===

// Variables globales pour la modale de barème
var currentEditExerciseId = null;
var currentEditCompetenceName = null;
var currentEditQuestionIndex = null; // null = niveau exercice, nombre = niveau question

function openBaremeCompetenceModal(exerciseId, competenceName) {
    console.log(`🔧 openBaremeCompetenceModal(${exerciseId}, ${competenceName})`);

    currentEditExerciseId = exerciseId;
    currentEditCompetenceName = competenceName;
    currentEditQuestionIndex = null; // Niveau exercice

    // Récupérer ou initialiser les détails de la compétence
    if (!appState.baremeConfig.exercises[exerciseId].competenceDetails) {
        appState.baremeConfig.exercises[exerciseId].competenceDetails = {};
    }

    const details = appState.baremeConfig.exercises[exerciseId].competenceDetails[competenceName] || {
        description: '',
        tooltip: '',
        points: 2,
        increment: 1
    };

    // Trouver la compétence dans defaultCompetences pour la couleur et l'icône
    const comp = defaultCompetences.find(c => c.name === competenceName);

    // Remplir la modale
    document.getElementById('baremeCompModalIcon').textContent = comp ? comp.icon : '📋';
    document.getElementById('baremeCompModalSubtitle').textContent = competenceName;
    document.getElementById('baremeCompDescription').value = details.description || '';
    document.getElementById('baremeCompTooltip').value = details.tooltip || '';
    document.getElementById('baremeCompPoints').value = details.points || 2;
    document.getElementById('baremeCompIncrement').value = details.increment || 1;

    // Appliquer la couleur de la compétence
    const header = document.getElementById('baremeCompModalHeader');
    if (header && comp) {
        header.style.background = comp.color;
    }

    // Masquer l'erreur
    document.getElementById('descriptionError').style.display = 'none';

    // Afficher la modale
    const modal = document.getElementById('baremeCompetenceModal');
    modal.style.display = 'flex';
}

function closeBaremeCompetenceModal() {
    const modal = document.getElementById('baremeCompetenceModal');
    modal.style.display = 'none';

    currentEditExerciseId = null;
    currentEditCompetenceName = null;
    currentEditQuestionIndex = null;
}

// Nouvelle fonction pour ouvrir la modale au niveau question
function openBaremeQuestionCompetenceModal(exerciseId, questionIndex, competenceName) {
    console.log(`🔧 openBaremeQuestionCompetenceModal(${exerciseId}, q${questionIndex}, ${competenceName})`);

    currentEditExerciseId = exerciseId;
    currentEditCompetenceName = competenceName;
    currentEditQuestionIndex = questionIndex; // Niveau question

    const qKey = `q${questionIndex}`;

    // Récupérer ou initialiser les détails de la compétence au niveau question
    if (!appState.baremeConfig.exercises[exerciseId].questionCompetenceDetails) {
        appState.baremeConfig.exercises[exerciseId].questionCompetenceDetails = {};
    }
    if (!appState.baremeConfig.exercises[exerciseId].questionCompetenceDetails[qKey]) {
        appState.baremeConfig.exercises[exerciseId].questionCompetenceDetails[qKey] = {};
    }

    const details = appState.baremeConfig.exercises[exerciseId].questionCompetenceDetails[qKey][competenceName] || {
        description: '',
        tooltip: '',
        points: 2,
        increment: 1
    };

    // Trouver la compétence dans defaultCompetences pour la couleur et l'icône
    const comp = defaultCompetences.find(c => c.name === competenceName);

    // Remplir la modale
    document.getElementById('baremeCompModalIcon').textContent = comp ? comp.icon : '📋';
    document.getElementById('baremeCompModalSubtitle').textContent = `${competenceName} - Question ${questionIndex + 1}`;
    document.getElementById('baremeCompDescription').value = details.description || '';
    document.getElementById('baremeCompTooltip').value = details.tooltip || '';
    document.getElementById('baremeCompPoints').value = details.points || 2;
    document.getElementById('baremeCompIncrement').value = details.increment || 1;

    // Appliquer la couleur de la compétence
    const header = document.getElementById('baremeCompModalHeader');
    if (header && comp) {
        header.style.background = comp.color;
    }

    // Masquer l'erreur
    document.getElementById('descriptionError').style.display = 'none';

    // Afficher la modale
    const modal = document.getElementById('baremeCompetenceModal');
    modal.style.display = 'flex';
}

function saveBaremeCompetenceModal() {
    if (!currentEditExerciseId || !currentEditCompetenceName) return;

    const description = document.getElementById('baremeCompDescription').value.trim();

    // Validation : description obligatoire
    if (!description) {
        document.getElementById('descriptionError').style.display = 'block';
        document.getElementById('baremeCompDescription').style.borderColor = '#dc3545';
        return;
    }

    const tooltip = document.getElementById('baremeCompTooltip').value.trim();
    const points = parseFloat(document.getElementById('baremeCompPoints').value) || 2;
    const increment = parseFloat(document.getElementById('baremeCompIncrement').value) || 1;

    // Sauvegarder les détails : distinguer niveau exercice vs niveau question
    if (currentEditQuestionIndex !== null) {
        // NIVEAU QUESTION
        const qKey = `q${currentEditQuestionIndex}`;

        if (!appState.baremeConfig.exercises[currentEditExerciseId].questionCompetenceDetails) {
            appState.baremeConfig.exercises[currentEditExerciseId].questionCompetenceDetails = {};
        }
        if (!appState.baremeConfig.exercises[currentEditExerciseId].questionCompetenceDetails[qKey]) {
            appState.baremeConfig.exercises[currentEditExerciseId].questionCompetenceDetails[qKey] = {};
        }

        appState.baremeConfig.exercises[currentEditExerciseId].questionCompetenceDetails[qKey][currentEditCompetenceName] = {
            description,
            tooltip,
            points,
            increment
        };

        console.log('✅ Détails de compétence question sauvegardés:', {
            exerciseId: currentEditExerciseId,
            questionIndex: currentEditQuestionIndex,
            competence: currentEditCompetenceName,
            details: appState.baremeConfig.exercises[currentEditExerciseId].questionCompetenceDetails[qKey][currentEditCompetenceName]
        });
    } else {
        // NIVEAU EXERCICE
        if (!appState.baremeConfig.exercises[currentEditExerciseId].competenceDetails) {
            appState.baremeConfig.exercises[currentEditExerciseId].competenceDetails = {};
        }

        appState.baremeConfig.exercises[currentEditExerciseId].competenceDetails[currentEditCompetenceName] = {
            description,
            tooltip,
            points,
            increment
        };

        console.log('✅ Détails de compétence exercice sauvegardés:', {
            exerciseId: currentEditExerciseId,
            competence: currentEditCompetenceName,
            details: appState.baremeConfig.exercises[currentEditExerciseId].competenceDetails[currentEditCompetenceName]
        });
    }

    // Refermer la modale
    closeBaremeCompetenceModal();

    // Re-afficher l'exercice pour mettre à jour les boutons
    if (currentEditExerciseId === '1') {
        showBaremeExercise1Automatismes();
    } else {
        showBaremeExerciseDNB(currentEditExerciseId);
    }
}

// ========================================
// INTÉGRATION MATHALÉA VIA IFRAME + RPC
// ========================================

let mathaleaRPC = null;

/**
 * Initialise la page MathALÉA si la source sélectionnée est 'mathalea'
 * MathALÉA est complètement séparé des automatismes et du DNB
 */
function initMathaleaPage() {
    const selectedSource = localStorage.getItem('selectedSource');

    console.log('🎯 initMathaleaPage - selectedSource:', selectedSource);

    if (selectedSource === 'mathalea') {
        // Afficher UNIQUEMENT la page MathALÉA, cacher tout le reste
        document.getElementById('mathaleaPage').style.display = 'block';
        document.getElementById('automatismesSelectionPage').style.display = 'none';
        document.getElementById('dnbSelectionPage').style.display = 'none';

        // Cacher aussi le workflow guidé qui n'est pas adapté pour MathALÉA
        const workflowModal = document.getElementById('workflowModal');
        if (workflowModal) {
            workflowModal.style.display = 'none';
        }

        // Charger l'iframe avec la source appropriée
        updateMathaleaSource();
    }
}

/**
 * Met à jour la source MathALÉA (local ou production) et initialise le RPC
 */
function updateMathaleaSource() {
    const source = document.getElementById('mathaleaSourceSelect').value;
    const origin = source === 'local' ? 'http://localhost:5173/MathEval' : 'https://coopmaths.fr';
    const iframeUrl = `${origin}/alea/?recorder=correcteur-universel&v=eleve`;

    // Créer l'iframe dynamiquement s'il n'existe pas encore
    let iframe = document.getElementById('mathaleaFrame');
    if (!iframe) {
        const container = document.getElementById('mathaleaFrameContainer');
        iframe = document.createElement('iframe');
        iframe.id = 'mathaleaFrame';
        iframe.style.cssText = 'width: 100%; height: 700px; border: none; border-radius: 8px;';
        iframe.setAttribute('allow', 'fullscreen');
        container.appendChild(iframe);
        console.log('✅ Iframe MathALÉA créé dynamiquement');
    }

    iframe.src = iframeUrl;

    iframe.onload = () => {
        console.log('🔌 Initialisation RPC avec MathALÉA:', origin);

        // Vérifier que la bibliothèque RPC est chargée
        if (typeof RPC === 'undefined') {
            console.error('❌ Bibliothèque @mixer/postmessage-rpc non chargée');
            alert('Erreur: La bibliothèque RPC n\'est pas chargée. Veuillez recharger la page.');
            return;
        }

        // Initialiser RPC avec l'iframe MathALÉA
        mathaleaRPC = new RPC({
            target: iframe.contentWindow,
            serviceId: 'correcteur-universel',
            origin: origin
        });

        // Exposer les méthodes que MathALÉA peut appeler
        mathaleaRPC.expose('toolGetActivityParams', () => {
            console.log('📞 MathALÉA appelle toolGetActivityParams');
            return {
                mode: 'create',
                workflow: 'current',
                recorder: 'correcteur-universel'
            };
        });

        mathaleaRPC.expose('saveStudentAssignment', (params) => {
            console.log('📞 MathALÉA appelle saveStudentAssignment:', params);
            // Pas besoin de sauvegarder côté élève
            return { success: true };
        });

        mathaleaRPC.expose('getStudentAssignment', () => {
            console.log('📞 MathALÉA appelle getStudentAssignment');
            // Retourner null = pas de travail sauvegardé
            return null;
        });

        console.log('✅ RPC initialisé avec succès');
    };
}

/**
 * Valide la sélection d'exercices MathALÉA et récupère les données via RPC
 */
async function validerSelectionMathALEA() {
    if (!mathaleaRPC) {
        alert('⚠️ MathALÉA n\'est pas encore initialisé. Veuillez patienter...');
        return;
    }

    try {
        console.log('🔍 Récupération des paramètres d\'activité depuis MathALÉA...');

        // Appeler la méthode RPC exposée par MathALÉA
        const activityParams = await mathaleaRPC.call('platformGetActivityParams', {});

        console.log('📦 Paramètres d\'activité reçus:', activityParams);

        if (!activityParams || !activityParams.exercises || activityParams.exercises.length === 0) {
            alert('⚠️ Aucun exercice sélectionné. Veuillez sélectionner des exercices dans MathALÉA.');
            return;
        }

        // Transformer les données MathALÉA en format Correcteur Universel
        const exercisesData = transformMathaleaToCorrecteurUniversel(activityParams);

        // Stocker dans appState
        appState.exercises = exercisesData;
        appState.evaluationMetadata = {
            source: 'mathalea',
            title: activityParams.title || 'Exercices MathALÉA',
            uuid: activityParams.uuid || null,
            date: new Date().toISOString()
        };

        console.log('✅ Exercices MathALÉA transformés:', exercisesData);

        // Naviguer vers la configuration du barème
        showPage('baremePage');
        initBaremeConfig();

    } catch (error) {
        console.error('❌ Erreur lors de la récupération des exercices:', error);
        alert('❌ Erreur lors de la communication avec MathALÉA. Veuillez réessayer.');
    }
}

/**
 * Transforme les données MathALÉA en format Correcteur Universel
 * MathALÉA renvoie exercicesParams (array d'objets avec id, alea, cd, nbQuestions, sup, etc.)
 */
function transformMathaleaToCorrecteurUniversel(activityParams) {
    const exercises = [];

    // Les exercices sont dans exercicesParams
    const exercicesParams = activityParams.exercicesParams || activityParams.exercises || [];

    exercicesParams.forEach((ex, index) => {
        const exerciseId = (index + 1).toString();

        // ex contient : { id, alea, cd, nbQuestions, sup, sup2, ... }
        // id = l'identifiant de l'exercice MathALÉA (ex: "6C10")

        exercises.push({
            id: exerciseId,
            title: `Exercice ${ex.id || exerciseId}`,
            content: '',  // On génèrera le contenu plus tard via l'API MathALÉA
            questions: generateQuestionsFromParams(ex),
            metadata: {
                mathaleaId: ex.id || null,
                alea: ex.alea || null,
                cd: ex.cd || null,
                nbQuestions: ex.nbQuestions || 1,
                sup: ex.sup || null,
                sup2: ex.sup2 || null,
                interactif: ex.interactif || false
            }
        });
    });

    return exercises;
}

/**
 * Génère des questions par défaut basées sur nbQuestions
 */
function generateQuestionsFromParams(exerciseParams) {
    const nbQuestions = exerciseParams.nbQuestions || 1;
    const questions = [];

    for (let i = 0; i < nbQuestions; i++) {
        questions.push({
            id: `q${i + 1}`,
            number: i + 1,
            content: `Question ${i + 1}`,
            answer: null
        });
    }

    return questions;
}

/**
 * Parse les questions depuis un exercice MathALÉA
 */
function parseQuestionsFromMathaleaExercise(exercise) {
    const questions = [];

    // Si l'exercice a explicitement des questions
    if (exercise.questions && Array.isArray(exercise.questions)) {
        exercise.questions.forEach((q, idx) => {
            questions.push({
                id: `q${idx + 1}`,
                number: idx + 1,
                content: q.content || q.text || '',
                answer: q.answer || null
            });
        });
    } else {
        // Sinon, essayer de parser le contenu
        const content = exercise.content || '';

        // Chercher des patterns de questions numérotées
        const questionPatterns = [
            /(\d+)\.\s*([^\n]+)/g,  // Pattern: "1. Question"
            /Question\s+(\d+)\s*:?\s*([^\n]+)/gi,  // Pattern: "Question 1: ..."
        ];

        let found = false;
        for (const pattern of questionPatterns) {
            const matches = [...content.matchAll(pattern)];
            if (matches.length > 0) {
                matches.forEach((match, idx) => {
                    questions.push({
                        id: `q${idx + 1}`,
                        number: idx + 1,
                        content: match[2].trim(),
                        answer: null
                    });
                });
                found = true;
                break;
            }
        }

        // Si aucune question trouvée, créer une question unique
        if (!found) {
            questions.push({
                id: 'q1',
                number: 1,
                content: content || 'Question',
                answer: null
            });
        }
    }

    return questions;
}

/**
 * Initialisation au chargement de la page
 */
document.addEventListener('DOMContentLoaded', () => {
    // Vérifier si on revient de mathalea.html avec des exercices
    const mathaleaExercises = localStorage.getItem('mathaleaExercises');
    const selectedSource = localStorage.getItem('selectedSource');

    if (mathaleaExercises && selectedSource === 'mathalea') {
        console.log('🎓 Chargement des exercices MathALÉA depuis localStorage');

        // Parser les données
        const activityParams = JSON.parse(mathaleaExercises);

        // Transformer en format Correcteur Universel
        const exercisesData = transformMathaleaToCorrecteurUniversel(activityParams);

        // Stocker dans appState
        appState.exercises = exercisesData;
        appState.evaluationMetadata = {
            source: 'mathalea',
            title: activityParams.title || 'Exercices MathALÉA',
            uuid: activityParams.uuid || null,
            date: new Date().toISOString()
        };

        // Nettoyer localStorage
        localStorage.removeItem('mathaleaExercises');

        console.log('✅ Exercices MathALÉA chargés:', exercisesData);

        // Naviguer vers la configuration du barème
        showPage('baremePage');
        initBaremeConfig();
    } else {
        // Comportement normal pour DNB/Automatismes
        initMathaleaPage();
    }
});

// ========================================
// APPLICATION MATHALÉA - VERSION SIMPLE (SANS RPC)
// ========================================

/**
 * Initialise la page et charge l'iframe MathALÉA
 */
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎓 Initialisation application MathALÉA (version simple)');
    loadMathaleaIframe();
});

/**
 * Charge l'iframe MathALÉA avec l'URL correcte
 */
function loadMathaleaIframe() {
    // Utiliser coopmaths.fr en production, localhost en développement
    const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
    const origin = isProduction ? 'https://coopmaths.fr' : 'http://localhost:8000';

    // URL simple - pas besoin de recorder=capytale
    // On utilise juste v=prof pour que l'utilisateur puisse sélectionner des exercices
    const iframeUrl = `${origin}/alea/?v=prof`;

    console.log('🔗 Chargement de MathALÉA:', iframeUrl);

    const iframe = document.getElementById('mathaleaFrame');
    iframe.src = iframeUrl;

    iframe.onload = () => {
        console.log('✅ MathALÉA chargé avec succès!');
    };

    iframe.onerror = () => {
        console.error('❌ Erreur lors du chargement de MathALÉA');
        alert('❌ Impossible de charger MathALÉA. Vérifiez que le serveur est lancé sur ' + origin);
    };
}

/**
 * Met à jour la source MathALÉA (local ou production)
 */
function updateMathaleaSource() {
    console.log('🔄 Changement de source MathALÉA');
    loadMathaleaIframe();
}

/**
 * Récupère l'URL de l'iframe et parse les paramètres d'exercices
 */
function parseExercicesFromIframeUrl(url) {
    console.log('📝 Parsing URL:', url);

    const urlObj = new URL(url);
    const params = urlObj.searchParams;

    // MathALÉA encode les exercices avec : uuid, id, alea
    // Format: ?uuid=e10d1&id=6G4A&alea=kKbi&uuid=fe08e&id=6G4A-2&alea=wlAy
    const exercices = [];

    // Récupérer tous les paramètres
    const uuids = params.getAll('uuid');
    const ids = params.getAll('id');
    const aleas = params.getAll('alea');

    console.log('🔍 Trouvé:', uuids.length, 'uuid,', ids.length, 'id,', aleas.length, 'alea');

    // Vérifier qu'on a le même nombre de uuid, id et alea
    if (ids.length === 0) {
        console.warn('⚠️ Aucun exercice trouvé dans l\'URL (pas de paramètre "id")');
        return null;
    }

    // Construire les exercices à partir des triplets (uuid, id, alea)
    for (let i = 0; i < ids.length; i++) {
        const exId = ids[i];
        const exAlea = aleas[i] || '';
        const exUuid = uuids[i] || '';

        exercices.push({
            id: exId,
            uuid: exUuid,
            alea: exAlea,
            nbQuestions: 5, // Valeur par défaut, sera peut-être dans l'URL plus tard
            serie: 1
        });
    }

    console.log('✅ Exercices parsés:', exercices);
    return exercices;
}

/**
 * Valide la sélection d'exercices MathALÉA et récupère les données de l'iframe
 */
function validerSelectionMathALEA() {
    console.log('🔍 Validation de la sélection...');

    try {
        const iframe = document.getElementById('mathaleaFrame');

        if (!iframe) {
            alert('❌ Iframe MathALÉA introuvable');
            return;
        }

        // Récupérer l'URL actuelle de l'iframe
        let iframeUrl;
        try {
            iframeUrl = iframe.contentWindow.location.href;
            console.log('📍 URL de l\'iframe:', iframeUrl);
        } catch (e) {
            console.error('❌ Impossible de lire l\'URL de l\'iframe (CORS?):', e);
            alert('❌ Impossible de lire l\'URL de l\'iframe.\n\n' +
                  'Assurez-vous que MathALÉA est bien servi depuis le même serveur (localhost:8000).\n\n' +
                  'Erreur: ' + e.message);
            return;
        }

        // Parser les exercices depuis l'URL
        const exercices = parseExercicesFromIframeUrl(iframeUrl);

        if (!exercices || exercices.length === 0) {
            alert('⚠️ Aucun exercice détecté.\n\n' +
                  'Veuillez sélectionner des exercices dans MathALÉA en cliquant sur les boutons d\'exercices.\n\n' +
                  'L\'URL doit contenir des paramètres "ex=..." pour que le correcteur puisse récupérer les exercices.');
            return;
        }

        // Préparer les données au format attendu par app.html
        const mathaleaData = {
            exercicesParams: exercices.map((ex, index) => ({
                id: ex.id,
                uuid: ex.uuid,
                alea: ex.alea, // Utiliser l'aléa de MathALÉA
                nbQuestions: ex.nbQuestions,
                serie: ex.serie
            })),
            globalOptions: {
                v: 'eleve',
                isInteractive: true,
                nbExos: exercices.length
            }
        };

        console.log('📦 Données MathALÉA préparées:', mathaleaData);

        // Stocker les données dans localStorage
        localStorage.setItem('mathaleaExercises', JSON.stringify(mathaleaData));
        localStorage.setItem('selectedSource', 'mathalea');

        console.log('✅ Exercices sauvegardés, redirection vers app.html...');

        // Rediriger vers app.html
        window.location.href = 'app.html';

    } catch (error) {
        console.error('❌ Erreur lors de la récupération des exercices:', error);
        alert('❌ Erreur lors de la récupération des exercices.\n\n' +
              'Détails: ' + error.message + '\n\n' +
              'Consultez la console pour plus d\'informations.');
    }
}

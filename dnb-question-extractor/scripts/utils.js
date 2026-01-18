/**
 * Fonctions utilitaires pour le parsing LaTeX
 */

/**
 * Parse un fichier LaTeX et extrait les questions (\item)
 * @param {string} latexContent - Contenu LaTeX
 * @returns {Array} - Liste des questions avec leur LaTeX
 */
function extractQuestionsFromLatex(latexContent) {
    const questions = [];
    let currentQuestion = null;
    let depth = 0;
    let inEnumerate = false;
    let questionNumber = 0;

    // Découper par lignes
    const lines = latexContent.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();

        // Détecter \begin{enumerate}
        if (line.includes('\\begin{enumerate}')) {
            depth++;
            if (depth === 1) {
                inEnumerate = true;
            }
        }

        // Détecter \end{enumerate}
        if (line.includes('\\end{enumerate}')) {
            depth--;
            if (depth === 0) {
                // Fin de la liste principale, sauvegarder la dernière question
                if (currentQuestion) {
                    questions.push(currentQuestion);
                    currentQuestion = null;
                }
                inEnumerate = false;
            }
        }

        // Détecter \item (question principale)
        if (line.startsWith('\\item') && depth === 1 && inEnumerate) {
            // Sauvegarder la question précédente
            if (currentQuestion) {
                questions.push(currentQuestion);
            }

            questionNumber++;
            currentQuestion = {
                numero: questionNumber,
                latex: '',
                sousQuestions: []
            };

            // Extraire le texte après \item
            const itemContent = line.substring(5).trim();
            if (itemContent && !itemContent.startsWith('%')) {
                currentQuestion.latex += itemContent + '\n';
            }
        }
        // Ajouter le contenu à la question courante
        else if (currentQuestion && depth === 1 && !line.includes('\\begin{enumerate}') && !line.includes('\\end{enumerate}')) {
            // Ignorer les commentaires
            if (!line.startsWith('%')) {
                currentQuestion.latex += line + '\n';
            }
        }

        // Détecter sous-questions (\item dans enumerate imbriqué)
        if (line.startsWith('\\item') && depth === 2 && currentQuestion) {
            const sousQuestionContent = line.substring(5).trim();
            if (sousQuestionContent && !sousQuestionContent.startsWith('%')) {
                currentQuestion.sousQuestions.push({
                    lettre: String.fromCharCode(97 + currentQuestion.sousQuestions.length), // a, b, c...
                    latex: sousQuestionContent
                });
            }
        }
    }

    // Sauvegarder la dernière question
    if (currentQuestion) {
        questions.push(currentQuestion);
    }

    return questions;
}

/**
 * Identifie le fichier .tex correspondant à un exercice
 * @param {number} exerciceNum - Numéro de l'exercice
 * @param {string} sujetNom - Nom du sujet (ex: "Amérique du Nord")
 * @returns {string} - Chemin du fichier .tex
 */
function identifyTexFile(exerciceNum, sujetNom) {
    // Mapping des noms de sujets vers les codes de fichiers
    const sujetMap = {
        'amérique du nord': 'ameriquenord',
        'asie': 'asie',
        'centres étrangers': 'etrangers',
        'métropole': 'metropole',
        'polynésie': 'polynesie'
    };

    // Nettoyer le nom du sujet
    const sujetClean = sujetNom.toLowerCase()
        .replace(/\^/g, '')
        .replace(/,.*$/, '')
        .replace(/\s+/g, ' ')
        .trim();

    // Trouver le code correspondant
    let code = null;
    for (const [key, value] of Object.entries(sujetMap)) {
        if (sujetClean.includes(key)) {
            code = value;
            break;
        }
    }

    if (!code) {
        console.warn(`⚠️  Code non trouvé pour sujet: "${sujetNom}" (nettoyé: "${sujetClean}")`);
        return null;
    }

    // Construire le chemin
    const basePath = '/Users/macbelhaj/correcteur-universel/dnb/2025/tex';
    const fileName = `dnb_2025_06_${code}_${exerciceNum}.tex`;

    return `${basePath}/${fileName}`;
}

module.exports = {
    extractQuestionsFromLatex,
    identifyTexFile
};

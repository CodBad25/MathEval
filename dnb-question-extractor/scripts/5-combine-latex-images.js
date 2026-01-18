#!/usr/bin/env node

/**
 * Script 5 : Combiner LaTeX + Images UPDF
 *
 * Croise :
 * - Le texte LaTeX (propre, sans erreur OCR)
 * - Les images extraites par UPDF (graphiques, figures)
 * - La structure du HTML pour savoir quelles images vont avec quelles questions
 *
 * Output : JSON avec question = {texte_latex, images_paths}
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Chemins
const HTML_PATH = '/Users/macbelhaj/Library/Application Support/Client PRONOTE/Bottles/v2024_FRANCE/drive_c/users/badri/Documents/Annee_2025_Brevet_OCR.htm';
const IMAGES_DIR = '/Users/macbelhaj/Library/Application Support/Client PRONOTE/Bottles/v2024_FRANCE/drive_c/users/badri/Documents/Annee_2025_Brevet_OCR_files';
const QUESTIONS_PATH = path.join(__dirname, '../output/questions.json');
const OUTPUT_PATH = path.join(__dirname, '../output/combined-questions.json');

console.log('📖 Chargement des données...\n');

// Lire le HTML OCR
const htmlContent = fs.readFileSync(HTML_PATH, 'utf-8');
const dom = new JSDOM(htmlContent);
const document = dom.window.document;

// Lire les questions LaTeX déjà extraites
const questionsData = JSON.parse(fs.readFileSync(QUESTIONS_PATH, 'utf-8'));

console.log('🔍 Analyse du HTML pour détecter les images par question...\n');

// Résultat : questions avec texte + images
const combinedQuestions = {};

// Parcourir le HTML pour associer images aux exercices
let currentExercice = null;
let currentQuestion = null;
const exerciceImages = {};

// Trouver tous les éléments H1 (exercices) et les images
const allElements = Array.from(document.querySelectorAll('*'));

for (let i = 0; i < allElements.length; i++) {
    const element = allElements[i];
    const text = element.textContent.trim();

    // Détecter un exercice
    if (element.tagName === 'H1' && text.match(/Exercice\s+(\d+)/i)) {
        const match = text.match(/Exercice\s+(\d+)/i);
        if (match) {
            currentExercice = parseInt(match[1]);
            if (!exerciceImages[currentExercice]) {
                exerciceImages[currentExercice] = [];
            }
            console.log(`📝 Exercice ${currentExercice} détecté`);
        }
    }

    // Détecter une image
    if (element.tagName === 'IMG' && currentExercice) {
        const src = element.getAttribute('src');
        if (src && src.includes('Annee_2025_Brevet_OCR_files/')) {
            const imageName = src.split('/').pop();
            exerciceImages[currentExercice].push({
                name: imageName,
                fullPath: path.join(IMAGES_DIR, imageName),
                width: element.getAttribute('width'),
                height: element.getAttribute('height')
            });
            console.log(`  📸 Image: ${imageName}`);
        }
    }
}

console.log('\n📊 Images par exercice:');
for (const [exNum, images] of Object.entries(exerciceImages)) {
    console.log(`   Ex${exNum}: ${images.length} images`);
}

// Maintenant, combiner avec les questions LaTeX
console.log('\n🔗 Combinaison LaTeX + Images...\n');

for (const [exerciceId, data] of Object.entries(questionsData)) {
    const exNum = data.exerciceNum;
    const imagesForEx = exerciceImages[exNum] || [];

    combinedQuestions[exerciceId] = {
        exerciceNum: exNum,
        sujet: data.sujet,
        points: data.points,
        images: imagesForEx,
        questions: data.questions.map(q => ({
            numero: q.numero,
            latex: q.latex,
            sousQuestions: q.sousQuestions
        }))
    };

    console.log(`✅ ${exerciceId}: ${data.questions.length} questions + ${imagesForEx.length} images`);
}

// Sauvegarder
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(combinedQuestions, null, 2), 'utf-8');
console.log(`\n💾 Sauvegardé: ${OUTPUT_PATH}`);

console.log('\n📌 Prochaine étape:');
console.log('   Utiliser ce JSON pour générer les PNG avec LaTeX + Images combinés');

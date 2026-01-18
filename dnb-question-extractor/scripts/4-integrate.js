#!/usr/bin/env node

/**
 * Script 4 : Intégration dans l'application principale
 *
 * Copie les PNG et crée un fichier de mapping pour utiliser
 * le mode "Questions séparées" dans l'application
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Intégration dans l\'application principale...\n');

// Chemins
const PNG_SOURCE = path.join(__dirname, '../output/png');
const PNG_DEST = '/Users/macbelhaj/correcteur-universel/dnb/2025/tex/png/questions';
const QUESTIONS_SOURCE = path.join(__dirname, '../output/questions.json');
const MAPPING_DEST = '/Users/macbelhaj/correcteur-universel/dnb/2025/questions-mapping.json';

// 1. Créer le dossier de destination
if (!fs.existsSync(PNG_DEST)) {
    fs.mkdirSync(PNG_DEST, { recursive: true });
    console.log(`✅ Dossier créé : ${PNG_DEST}\n`);
}

// 2. Copier les PNG
console.log('📦 Copie des PNG...');
const pngFiles = fs.readdirSync(PNG_SOURCE).filter(f => f.endsWith('.png'));
let copiedCount = 0;

for (const file of pngFiles) {
    const src = path.join(PNG_SOURCE, file);
    const dest = path.join(PNG_DEST, file);
    fs.copyFileSync(src, dest);
    copiedCount++;
}

console.log(`✅ ${copiedCount} PNG copiés\n`);

// 3. Créer le fichier de mapping
console.log('📝 Création du mapping...');
const questionsData = JSON.parse(fs.readFileSync(QUESTIONS_SOURCE, 'utf-8'));

// Transformer en mapping utilisable par l'application
const mapping = {};

for (const [exerciceId, data] of Object.entries(questionsData)) {
    mapping[exerciceId] = {
        exerciceNum: data.exerciceNum,
        sujet: data.sujet,
        points: data.points,
        questions: data.questions.map(q => ({
            numero: q.numero,
            pngPath: `dnb/2025/tex/png/questions/${exerciceId}_q${q.numero}.png`,
            latex: q.latex,
            sousQuestions: q.sousQuestions.map(sq => ({
                lettre: sq.lettre,
                pngPath: `dnb/2025/tex/png/questions/${exerciceId}_q${q.numero}${sq.lettre}.png`,
                latex: sq.latex
            }))
        }))
    };
}

fs.writeFileSync(MAPPING_DEST, JSON.stringify(mapping, null, 2), 'utf-8');
console.log(`✅ Mapping créé : ${MAPPING_DEST}\n`);

console.log('🎉 Intégration terminée !\n');
console.log('📌 Prochaines étapes :');
console.log('   1. Ouvrir app.html');
console.log('   2. Dans le modal PDF, choisir "Mode : Questions séparées"');
console.log('   3. Générer le PDF pour voir la différence');

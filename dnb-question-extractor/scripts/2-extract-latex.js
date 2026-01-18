#!/usr/bin/env node

/**
 * Script 2 : Extraction du LaTeX des questions
 *
 * Croise la structure HTML avec les fichiers .tex :
 * - Lit structure.json (généré par script 1)
 * - Pour chaque exercice, trouve le fichier .tex correspondant
 * - Extrait le LaTeX de chaque question
 * - Sauvegarde dans questions.json
 *
 * Input  : output/structure.json + fichiers .tex
 * Output : output/questions.json
 */

const fs = require('fs');
const path = require('path');
const { extractQuestionsFromLatex, identifyTexFile } = require('./utils');

// Chemins
const STRUCTURE_PATH = path.join(__dirname, '../output/structure.json');
const OUTPUT_PATH = path.join(__dirname, '../output/questions.json');

console.log('📖 Lecture de la structure...');

// Lire la structure
const structure = JSON.parse(fs.readFileSync(STRUCTURE_PATH, 'utf-8'));

console.log(`✅ ${structure.length} sujet(s) trouvé(s)\n`);

// Résultat final
const questionsParExercice = {};
let totalExercices = 0;
let totalQuestions = 0;

// Pour chaque sujet
for (const sujet of structure) {
    console.log(`📚 Sujet : ${sujet.nom}`);

    // Pour chaque exercice
    for (const exercice of sujet.exercices) {
        console.log(`  📝 Exercice ${exercice.numero} (${exercice.nbQuestions} questions attendues)`);

        // Identifier le fichier .tex
        const texPath = identifyTexFile(exercice.numero, sujet.nom);

        if (!texPath) {
            console.log(`     ⚠️  Fichier .tex non identifié\n`);
            continue;
        }

        console.log(`     📄 Fichier : ${path.basename(texPath)}`);

        // Vérifier que le fichier existe
        if (!fs.existsSync(texPath)) {
            console.log(`     ❌ Fichier introuvable\n`);
            continue;
        }

        // Lire le fichier .tex
        const latexContent = fs.readFileSync(texPath, 'utf-8');

        // Extraire les questions
        const questions = extractQuestionsFromLatex(latexContent);

        console.log(`     ✅ ${questions.length} question(s) extraite(s)`);

        // Vérifier la cohérence
        if (questions.length !== exercice.nbQuestions) {
            console.log(`     ⚠️  Attention : ${exercice.nbQuestions} attendues, ${questions.length} trouvées`);
        }

        // Nettoyer le LaTeX
        questions.forEach(q => {
            q.latex = q.latex.trim();
        });

        // Créer la clé unique pour cet exercice
        const key = path.basename(texPath).replace('.tex', '');

        // Sauvegarder
        questionsParExercice[key] = {
            sujet: sujet.nom,
            exerciceNum: exercice.numero,
            points: exercice.points,
            nbQuestions: questions.length,
            questions: questions
        };

        totalExercices++;
        totalQuestions += questions.length;

        console.log('');
    }
}

console.log(`\n📊 Résumé :`);
console.log(`   ├─ ${totalExercices} exercices traités`);
console.log(`   └─ ${totalQuestions} questions extraites\n`);

// Sauvegarder en JSON
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(questionsParExercice, null, 2), 'utf-8');
console.log(`💾 Questions sauvegardées : ${OUTPUT_PATH}`);

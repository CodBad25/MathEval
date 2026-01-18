#!/usr/bin/env node

/**
 * Script 1 : Parse HTML OCR généré par UPDF
 *
 * Extrait la structure des sujets DNB 2025 :
 * - Identifie les différents sujets (Amérique du Nord, Asie, etc.)
 * - Détecte les exercices et leur numéro
 * - Compte le nombre de questions par exercice
 *
 * Input  : Annee_2025_Brevet_OCR.htm
 * Output : output/structure.json
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Chemins
const HTML_PATH = '/Users/macbelhaj/Library/Application Support/Client PRONOTE/Bottles/v2024_FRANCE/drive_c/users/badri/Documents/Annee_2025_Brevet_OCR.htm';
const OUTPUT_PATH = path.join(__dirname, '../output/structure.json');

console.log('📖 Lecture du fichier HTML OCR...');

// Lire le fichier HTML
const htmlContent = fs.readFileSync(HTML_PATH, 'utf-8');
const dom = new JSDOM(htmlContent);
const document = dom.window.document;

console.log('✅ HTML chargé, parsing en cours...\n');

// Structure des sujets
const sujets = [];
let sujetCourant = null;

// Parcourir tous les éléments
const allElements = document.querySelectorAll('*');

for (const element of allElements) {
    const text = element.textContent.trim();

    // Détecter un nouveau sujet DNB
    if (element.tagName === 'P' && text.includes('Diplôme national du brevet')) {
        // Extraire le nom du sujet (ex: "Amérique du Nord")
        const match = text.match(/Diplôme national du brevet\s+(.+)/);
        if (match) {
            sujetCourant = {
                nom: match[1].trim(),
                exercices: []
            };
            sujets.push(sujetCourant);
            console.log(`📚 Sujet détecté : ${sujetCourant.nom}`);
        }
    }

    // Détecter un exercice
    if (element.tagName === 'H1' && text.match(/Exercice\s+(\d+)/i)) {
        const match = text.match(/Exercice\s+(\d+)\s*:?\s*(\d+)?\s*points?/i);
        if (match && sujetCourant) {
            const exercice = {
                numero: parseInt(match[1]),
                points: match[2] ? parseInt(match[2]) : null,
                titre: text,
                nbQuestions: 0,
                questions: []
            };

            // Compter les questions (chercher la liste <ol> suivante)
            let nextElement = element.nextElementSibling;
            while (nextElement && nextElement.tagName !== 'H1') {
                if (nextElement.tagName === 'OL') {
                    const items = nextElement.querySelectorAll('li');
                    exercice.nbQuestions = items.length;

                    // Extraire les numéros de questions
                    items.forEach((li, idx) => {
                        const questionNum = li.getAttribute('data-list-text') || (idx + 1).toString();
                        exercice.questions.push({
                            numero: questionNum.replace('.', '').trim(),
                            textePreview: li.textContent.substring(0, 100).trim() + '...'
                        });
                    });
                    break;
                }
                nextElement = nextElement.nextElementSibling;
            }

            sujetCourant.exercices.push(exercice);
            console.log(`  ├─ Exercice ${exercice.numero} : ${exercice.nbQuestions} questions`);
        }
    }
}

console.log(`\n✅ Parsing terminé : ${sujets.length} sujets trouvés\n`);

// Afficher résumé
sujets.forEach(sujet => {
    console.log(`📚 ${sujet.nom}`);
    sujet.exercices.forEach(ex => {
        console.log(`   ├─ Ex${ex.numero} : ${ex.nbQuestions} questions`);
    });
    console.log('');
});

// Sauvegarder en JSON
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(sujets, null, 2), 'utf-8');
console.log(`💾 Structure sauvegardée : ${OUTPUT_PATH}`);

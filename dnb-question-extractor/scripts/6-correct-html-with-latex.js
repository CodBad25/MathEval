#!/usr/bin/env node

/**
 * Script 6 : Corriger le HTML de UPDF avec le LaTeX
 *
 * Garde la structure/mise en page de UPDF mais remplace le texte OCR
 * par le LaTeX propre (pas d'erreurs OCR)
 *
 * - Structure : UPDF (HTML)
 * - Images/graphiques : UPDF (positions conservées)
 * - Texte : LaTeX (sans erreurs)
 */

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Chemins
const HTML_PATH = '/Users/macbelhaj/Library/Application Support/Client PRONOTE/Bottles/v2024_FRANCE/drive_c/users/badri/Documents/Annee_2025_Brevet_OCR.htm';
const QUESTIONS_PATH = path.join(__dirname, '../output/questions.json');
const OUTPUT_HTML = path.join(__dirname, '../output/corrected.html');

console.log('📖 Chargement des données...\n');

// Lire le HTML OCR
const htmlContent = fs.readFileSync(HTML_PATH, 'utf-8');
const dom = new JSDOM(htmlContent);
const document = dom.window.document;

// Lire les questions LaTeX
const questionsData = JSON.parse(fs.readFileSync(QUESTIONS_PATH, 'utf-8'));

console.log('🔍 Analyse du HTML pour trouver les textes à corriger...\n');

// Parcourir le HTML et identifier les exercices/questions
let currentExercice = null;
let corrections = [];

// Trouver tous les éléments
const allH1 = document.querySelectorAll('h1');
const allLists = document.querySelectorAll('ol');

// Associer exercices aux listes
let exerciseCounter = 0;
allH1.forEach((h1, index) => {
    const text = h1.textContent.trim();
    const match = text.match(/Exercice\s+(\d+)/i);

    if (match) {
        const exNum = parseInt(match[1]);
        console.log(`📝 Exercice ${exNum} trouvé dans le HTML`);

        // Trouver la liste <ol> suivante
        let nextElement = h1.nextElementSibling;
        while (nextElement && nextElement.tagName !== 'OL' && nextElement.tagName !== 'H1') {
            nextElement = nextElement.nextElementSibling;
        }

        if (nextElement && nextElement.tagName === 'OL') {
            const items = nextElement.querySelectorAll(':scope > li');
            console.log(`   └─ ${items.length} questions trouvées`);

            // Chercher le LaTeX correspondant
            const exerciceKey = Object.keys(questionsData).find(key => {
                const data = questionsData[key];
                return data.exerciceNum === exNum;
            });

            if (exerciceKey && questionsData[exerciceKey]) {
                const latexQuestions = questionsData[exerciceKey].questions;

                items.forEach((li, qIndex) => {
                    if (latexQuestions[qIndex]) {
                        const oldText = li.textContent.substring(0, 50).trim();
                        const newText = latexQuestions[qIndex].latex;

                        corrections.push({
                            exercice: exNum,
                            question: qIndex + 1,
                            element: li,
                            oldText: oldText,
                            newLatex: newText
                        });

                        console.log(`      Q${qIndex + 1}: "${oldText}..." → LaTeX`);
                    }
                });
            }
        }
    }
});

console.log(`\n📊 ${corrections.length} corrections à effectuer\n`);

// Appliquer les corrections
console.log('🔧 Application des corrections...\n');

for (const corr of corrections) {
    // Remplacer le contenu texte par le LaTeX
    // Garder la structure HTML (numéro de question, etc.)
    const li = corr.element;

    // Créer le nouveau contenu avec LaTeX
    const latexHtml = convertLatexToSimpleHtml(corr.newLatex);

    // Remplacer le contenu
    // Trouver le premier élément texte et le remplacer
    const textNodes = Array.from(li.childNodes).filter(n => n.nodeType === 3 || n.tagName === 'P' || n.tagName === 'SPAN');

    if (textNodes.length > 0) {
        // Remplacer le premier bloc de texte
        const container = document.createElement('div');
        container.innerHTML = latexHtml;
        container.style.display = 'inline';

        // Insérer après le numéro de question
        li.innerHTML = `<span class="latex-corrected">${latexHtml}</span>`;
    }

    console.log(`✅ Ex${corr.exercice} Q${corr.question} corrigé`);
}

/**
 * Convertit le LaTeX basique en HTML
 */
function convertLatexToSimpleHtml(latex) {
    let html = latex;

    // Remplacer les formules inline $...$
    html = html.replace(/\$(.*?)\$/g, '<span class="math">$1</span>');

    // Commandes LaTeX simples
    html = html.replace(/\\og/g, '«');
    html = html.replace(/\\fg/g, '»');
    html = html.replace(/~/g, ' ');
    html = html.replace(/\\ldots/g, '...');
    html = html.replace(/\n/g, '<br>');

    return html;
}

// Sauvegarder le HTML corrigé
const correctedHtml = dom.serialize();
fs.writeFileSync(OUTPUT_HTML, correctedHtml, 'utf-8');

console.log(`\n💾 HTML corrigé sauvegardé: ${OUTPUT_HTML}`);
console.log('\n📌 Ce HTML garde la mise en page UPDF mais avec le texte LaTeX corrigé !');

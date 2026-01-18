#!/usr/bin/env node

/**
 * Script 3 : Génération des PNG par question
 *
 * Pour chaque question extraite :
 * - Convertit le LaTeX en HTML avec KaTeX
 * - Capture un screenshot PNG
 * - Sauvegarde dans output/png/
 *
 * Input  : output/questions.json
 * Output : output/png/*.png
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const katex = require('katex');

// Chemins
const QUESTIONS_PATH = path.join(__dirname, '../output/questions.json');
const PNG_OUTPUT_DIR = path.join(__dirname, '../output/png');

// Créer le dossier de sortie
if (!fs.existsSync(PNG_OUTPUT_DIR)) {
    fs.mkdirSync(PNG_OUTPUT_DIR, { recursive: true });
}

console.log('📖 Lecture des questions...\n');

// Lire les questions
const questionsData = JSON.parse(fs.readFileSync(QUESTIONS_PATH, 'utf-8'));

/**
 * Convertit le LaTeX en HTML avec KaTeX
 */
function latexToHtml(latex) {
    // Remplacer les formules LaTeX inline ($...$) et display ($$...$$)
    let html = latex;

    // D'abord les formules display
    html = html.replace(/\$\$(.*?)\$\$/g, (match, formula) => {
        try {
            return katex.renderToString(formula, { displayMode: true });
        } catch (e) {
            return `<span style="color: red;">Erreur LaTeX: ${formula}</span>`;
        }
    });

    // Puis les formules inline
    html = html.replace(/\$(.*?)\$/g, (match, formula) => {
        try {
            return katex.renderToString(formula, { displayMode: false });
        } catch (e) {
            return `<span style="color: red;">Erreur LaTeX: ${formula}</span>`;
        }
    });

    // Convertir quelques commandes LaTeX simples
    html = html.replace(/\\og/g, '«');
    html = html.replace(/\\fg/g, '»');
    html = html.replace(/~~/g, ' ');
    html = html.replace(/~/g, ' ');
    html = html.replace(/\\ldots/g, '...');

    return html;
}

/**
 * Génère une page HTML pour une question
 */
function generateHtmlPage(questionLatex, questionNum, exerciceId) {
    const htmlContent = latexToHtml(questionLatex);

    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css">
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            line-height: 1.6;
            padding: 20px;
            max-width: 800px;
            margin: 0;
            background: white;
        }
        .question-num {
            font-weight: bold;
            margin-bottom: 10px;
            font-size: 16px;
        }
        .question-content {
            margin-left: 10px;
        }
    </style>
</head>
<body>
    <div class="question-num">${questionNum}.</div>
    <div class="question-content">${htmlContent}</div>
</body>
</html>`;
}

/**
 * Capture un screenshot d'une question
 */
async function captureQuestionPng(browser, questionLatex, outputPath, questionNum, exerciceId) {
    const page = await browser.newPage();

    // Définir la taille de la page
    await page.setViewport({ width: 800, height: 600 });

    // Générer le HTML
    const html = generateHtmlPage(questionLatex, questionNum, exerciceId);

    // Charger le HTML
    await page.setContent(html, { waitUntil: 'networkidle0' });

    // Capturer le screenshot du body
    const bodyHandle = await page.$('body');
    await bodyHandle.screenshot({ path: outputPath });

    await page.close();
}

/**
 * Traite tous les exercices
 */
async function processAllQuestions() {
    console.log('🚀 Lancement de Puppeteer...\n');

    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    let totalPng = 0;

    for (const [exerciceId, data] of Object.entries(questionsData)) {
        console.log(`📝 ${exerciceId} (${data.nbQuestions} questions)`);

        for (let i = 0; i < data.questions.length; i++) {
            const question = data.questions[i];
            const questionNum = question.numero;

            // Nom du fichier PNG
            const pngFileName = `${exerciceId}_q${questionNum}.png`;
            const pngPath = path.join(PNG_OUTPUT_DIR, pngFileName);

            try {
                await captureQuestionPng(
                    browser,
                    question.latex,
                    pngPath,
                    questionNum,
                    exerciceId
                );

                console.log(`   ✅ Q${questionNum} → ${pngFileName}`);
                totalPng++;

                // Traiter les sous-questions
                for (let j = 0; j < question.sousQuestions.length; j++) {
                    const sousQuestion = question.sousQuestions[j];
                    const sousQuestionFileName = `${exerciceId}_q${questionNum}${sousQuestion.lettre}.png`;
                    const sousQuestionPath = path.join(PNG_OUTPUT_DIR, sousQuestionFileName);

                    await captureQuestionPng(
                        browser,
                        sousQuestion.latex,
                        sousQuestionPath,
                        `${questionNum}${sousQuestion.lettre}`,
                        exerciceId
                    );

                    console.log(`   ✅ Q${questionNum}${sousQuestion.lettre} → ${sousQuestionFileName}`);
                    totalPng++;
                }
            } catch (error) {
                console.log(`   ❌ Erreur Q${questionNum}: ${error.message}`);
            }
        }

        console.log('');
    }

    await browser.close();

    console.log(`\n📊 Résumé :`);
    console.log(`   └─ ${totalPng} PNG générés\n`);
    console.log(`💾 PNG sauvegardés dans : ${PNG_OUTPUT_DIR}`);
}

// Exécuter
processAllQuestions().catch(console.error);

#!/usr/bin/env node

/**
 * Script 7 : Enrichir les fichiers .tex avec les images UPDF
 *
 * 1. Copie les images UPDF dans le dossier tex
 * 2. Crée des fichiers .tex enrichis avec les images
 * 3. Résultat : .tex complets (texte + figures)
 */

const fs = require('fs');
const path = require('path');

// Chemins - TOUT RESTE DANS LE DOSSIER DE TRAVAIL (pas d'impact sur les fichiers originaux)
const COMBINED_PATH = path.join(__dirname, '../output/combined-questions.json');
const IMAGES_SRC = '/Users/macbelhaj/Library/Application Support/Client PRONOTE/Bottles/v2024_FRANCE/drive_c/users/badri/Documents/Annee_2025_Brevet_OCR_files';
const OUTPUT_DIR = path.join(__dirname, '../output/tex_enrichis');
const IMAGES_DEST = path.join(OUTPUT_DIR, 'images'); // Images copiées DANS le dossier de sortie

console.log('⚠️  IMPORTANT: Ce script NE TOUCHE PAS aux fichiers originaux !');
console.log('    Tout est généré dans:', OUTPUT_DIR);
console.log('');

// Créer les dossiers
if (!fs.existsSync(IMAGES_DEST)) {
    fs.mkdirSync(IMAGES_DEST, { recursive: true });
}
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('📖 Chargement des données...\n');

// Charger les données combinées (questions + images)
const combinedData = JSON.parse(fs.readFileSync(COMBINED_PATH, 'utf-8'));

let totalImagesCopied = 0;
let totalTexCreated = 0;

for (const [exerciceId, data] of Object.entries(combinedData)) {
    console.log(`\n📝 ${exerciceId} (${data.questions.length} questions, ${data.images.length} images)`);

    // 1. Copier les images de cet exercice
    const copiedImages = [];
    for (const img of data.images) {
        const srcPath = img.fullPath;
        const destName = `${exerciceId}_${img.name}`;
        const destPath = path.join(IMAGES_DEST, destName);

        if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, destPath);
            copiedImages.push({
                name: destName,
                relativePath: `images/${destName}`, // Chemin relatif dans le dossier de sortie
                width: img.width,
                height: img.height
            });
            totalImagesCopied++;
        }
    }
    console.log(`   ├─ ${copiedImages.length} images copiées`);

    // 2. Créer le fichier .tex enrichi
    const enrichedTexPath = path.join(OUTPUT_DIR, `${exerciceId}_enrichi.tex`);

    let texContent = `% Fichier LaTeX enrichi avec images UPDF
% Exercice ${data.exerciceNum} - ${data.sujet}
% ${data.points} points

\\documentclass[12pt]{article}
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage[french]{babel}
\\usepackage{graphicx}
\\usepackage{amsmath}
\\usepackage{amssymb}
\\usepackage{geometry}
\\geometry{a4paper, margin=2cm}

\\begin{document}

\\section*{Exercice ${data.exerciceNum} (${data.points} points)}

`;

    // Ajouter les images en haut de l'exercice (figure commune)
    if (copiedImages.length > 0) {
        texContent += `% Images de l'exercice\n`;
        texContent += `\\begin{center}\n`;

        // Filtrer les images de petite taille (probablement des icônes)
        const mainImages = copiedImages.filter(img => {
            const w = parseInt(img.width) || 0;
            const h = parseInt(img.height) || 0;
            return w > 100 && h > 100;
        });

        if (mainImages.length > 0) {
            for (const img of mainImages.slice(0, 3)) { // Max 3 images principales
                texContent += `\\includegraphics[width=0.8\\textwidth]{${img.relativePath}}\n`;
            }
        }
        texContent += `\\end{center}\n\n`;
    }

    // Ajouter les questions
    texContent += `\\begin{enumerate}\n`;

    for (const question of data.questions) {
        texContent += `\\item ${question.latex}\n`;

        // Sous-questions
        if (question.sousQuestions.length > 0) {
            texContent += `\\begin{enumerate}\n`;
            for (const sq of question.sousQuestions) {
                texContent += `\\item[${sq.lettre})] ${sq.latex}\n`;
            }
            texContent += `\\end{enumerate}\n`;
        }
        texContent += `\n`;
    }

    texContent += `\\end{enumerate}\n\n`;
    texContent += `\\end{document}\n`;

    // Sauvegarder
    fs.writeFileSync(enrichedTexPath, texContent, 'utf-8');
    totalTexCreated++;
    console.log(`   └─ ${exerciceId}_enrichi.tex créé`);
}

console.log(`\n\n📊 Résumé:`);
console.log(`   ├─ ${totalImagesCopied} images copiées dans ${IMAGES_DEST}`);
console.log(`   └─ ${totalTexCreated} fichiers .tex enrichis créés dans ${OUTPUT_DIR}`);

console.log(`\n💾 Images copiées: ${IMAGES_DEST}`);
console.log(`💾 Fichiers .tex: ${OUTPUT_DIR}`);

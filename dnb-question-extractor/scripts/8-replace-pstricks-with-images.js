#!/usr/bin/env node

/**
 * Script 8 : Remplacer les figures PSTricks par les images UPDF
 *
 * Garde TOUT le contenu original du .tex mais remplace :
 * \begin{pspicture}...\end{pspicture} → \includegraphics{image_UPDF}
 *
 * Résultat : .tex complet avec images réelles
 */

const fs = require('fs');
const path = require('path');

// Chemins
const COMBINED_PATH = path.join(__dirname, '../output/combined-questions.json');
const TEX_ORIGINALS = '/Users/macbelhaj/correcteur-universel/dnb/2025/tex';
const OUTPUT_DIR = path.join(__dirname, '../output/tex_avec_images');
const IMAGES_DIR = path.join(OUTPUT_DIR, 'images');

console.log('⚠️  IMPORTANT: Ce script NE TOUCHE PAS aux fichiers originaux !');
console.log('    Les fichiers enrichis sont générés dans:', OUTPUT_DIR);
console.log('');

// Créer les dossiers
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });

// Charger les données combinées
const combinedData = JSON.parse(fs.readFileSync(COMBINED_PATH, 'utf-8'));

console.log('📖 Remplacement des figures PSTricks par images UPDF...\n');

for (const [exerciceId, data] of Object.entries(combinedData)) {
    console.log(`\n📝 ${exerciceId}`);

    // Lire le fichier .tex original
    const originalTexPath = path.join(TEX_ORIGINALS, `${exerciceId}.tex`);

    if (!fs.existsSync(originalTexPath)) {
        console.log(`   ⚠️ Fichier original non trouvé`);
        continue;
    }

    let texContent = fs.readFileSync(originalTexPath, 'utf-8');
    console.log(`   ├─ Fichier original lu (${texContent.length} caractères)`);

    // Copier les images UPDF
    const copiedImages = [];
    const IMAGES_SRC = '/Users/macbelhaj/Library/Application Support/Client PRONOTE/Bottles/v2024_FRANCE/drive_c/users/badri/Documents/Annee_2025_Brevet_OCR_files';

    for (const img of data.images) {
        const srcPath = img.fullPath;
        const destName = `${exerciceId}_${img.name}`;
        const destPath = path.join(IMAGES_DIR, destName);

        if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, destPath);
            const w = parseInt(img.width) || 0;
            const h = parseInt(img.height) || 0;
            // Filtrer les petites images (icônes)
            if (w > 100 && h > 100) {
                copiedImages.push({
                    name: destName,
                    relativePath: `images/${destName}`
                });
            }
        }
    }

    console.log(`   ├─ ${copiedImages.length} images principales copiées`);

    // Supprimer les commandes PSTricks restantes
    texContent = texContent.replace(/\\psset\{[^}]+\}/g, '');

    // Remplacer les blocs PSTricks par les images
    // Pattern : \begin{pspicture}...\end{pspicture}
    const pspictureRegex = /\\begin\{pspicture\}[\s\S]*?\\end\{pspicture\}/g;
    const matches = texContent.match(pspictureRegex);

    if (matches && copiedImages.length > 0) {
        console.log(`   ├─ ${matches.length} figure(s) PSTricks trouvée(s)`);

        // Remplacer chaque figure PSTricks par une image UPDF
        let imageIndex = 0;
        texContent = texContent.replace(pspictureRegex, (match) => {
            if (imageIndex < copiedImages.length) {
                const img = copiedImages[imageIndex];
                imageIndex++;
                return `\\includegraphics[width=0.8\\linewidth]{${img.relativePath}}`;
            }
            return match; // Garder l'original si plus d'images
        });

        console.log(`   ├─ ${imageIndex} figure(s) remplacée(s)`);
    } else {
        console.log(`   ├─ Pas de figure PSTricks à remplacer`);
    }

    // Sauvegarder le fichier enrichi
    const outputPath = path.join(OUTPUT_DIR, `${exerciceId}.tex`);
    fs.writeFileSync(outputPath, texContent, 'utf-8');
    console.log(`   └─ ${exerciceId}.tex créé`);
}

console.log(`\n\n📊 Résumé:`);
console.log(`   Fichiers générés dans: ${OUTPUT_DIR}`);
console.log(`   Images dans: ${IMAGES_DIR}`);
console.log(`\n💡 Ces fichiers .tex gardent TOUT le contenu original mais avec les vraies images !`);

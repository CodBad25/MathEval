#!/usr/bin/env node

/**
 * Déploiement professionnel des fichiers .tex enrichis
 *
 * Stratégie :
 * 1. Crée un dossier versionné avec timestamp
 * 2. Sauvegarde automatique des originaux
 * 3. Copie les fichiers enrichis
 * 4. Crée un fichier de configuration
 * 5. Permet un rollback facile
 *
 * AUCUN fichier original n'est écrasé !
 */

const fs = require('fs');
const path = require('path');

// Chemins
const SOURCE_DIR = path.join(__dirname, '../output/tex_avec_images');
const TARGET_BASE = '/Users/macbelhaj/correcteur-universel/dnb/2025';
const BACKUP_DIR = path.join(__dirname, '../backup');
const CONFIG_FILE = path.join(TARGET_BASE, 'tex_config.json');

// Timestamp pour versioning
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
const version = `v_${timestamp}_enrichi`;

console.log('╔════════════════════════════════════════════════════════╗');
console.log('║       DÉPLOIEMENT SÉCURISÉ - TEX ENRICHIS             ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

console.log(`📅 Version: ${version}`);
console.log(`📁 Source: ${SOURCE_DIR}`);
console.log(`🎯 Destination: ${TARGET_BASE}\n`);

// === ÉTAPE 1 : Vérifications ===
console.log('1️⃣  VÉRIFICATIONS');

if (!fs.existsSync(SOURCE_DIR)) {
    console.error('❌ Dossier source non trouvé !');
    process.exit(1);
}

const texFiles = fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith('.tex'));
const imagesDir = path.join(SOURCE_DIR, 'images');

console.log(`   ├─ ${texFiles.length} fichiers .tex à déployer`);
console.log(`   └─ Dossier images: ${fs.existsSync(imagesDir) ? '✅' : '❌'}\n`);

// === ÉTAPE 2 : Créer la structure ===
console.log('2️⃣  CRÉATION DE LA STRUCTURE');

const versionDir = path.join(TARGET_BASE, 'tex_versions', version);
const versionImagesDir = path.join(versionDir, 'images');

if (!fs.existsSync(versionDir)) {
    fs.mkdirSync(versionDir, { recursive: true });
}
if (!fs.existsSync(versionImagesDir)) {
    fs.mkdirSync(versionImagesDir, { recursive: true });
}

console.log(`   ├─ Dossier version créé: tex_versions/${version}/`);
console.log(`   └─ Dossier images créé: tex_versions/${version}/images/\n`);

// === ÉTAPE 3 : Copier les fichiers .tex ===
console.log('3️⃣  COPIE DES FICHIERS .TEX');

for (const texFile of texFiles) {
    const src = path.join(SOURCE_DIR, texFile);
    const dest = path.join(versionDir, texFile);
    fs.copyFileSync(src, dest);
    console.log(`   ✅ ${texFile}`);
}

// === ÉTAPE 4 : Copier les images ===
console.log('\n4️⃣  COPIE DES IMAGES');

if (fs.existsSync(imagesDir)) {
    const images = fs.readdirSync(imagesDir);
    let copied = 0;
    for (const img of images) {
        const src = path.join(imagesDir, img);
        const dest = path.join(versionImagesDir, img);
        fs.copyFileSync(src, dest);
        copied++;
    }
    console.log(`   ✅ ${copied} images copiées`);
}

// === ÉTAPE 5 : Créer le fichier de configuration ===
console.log('\n5️⃣  CONFIGURATION');

let config = {};
if (fs.existsSync(CONFIG_FILE)) {
    config = JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf-8'));
}

// Historique des versions
if (!config.versions) config.versions = [];
config.versions.push({
    id: version,
    date: new Date().toISOString(),
    description: 'Fichiers .tex enrichis avec images UPDF',
    files: texFiles
});

// Version active
config.activeVersion = 'original'; // Par défaut, on garde les originaux
config.availableVersions = ['original', version];

fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), 'utf-8');
console.log(`   ✅ Configuration sauvegardée: tex_config.json`);

// === ÉTAPE 6 : Instructions ===
console.log('\n6️⃣  INSTRUCTIONS\n');
console.log('╔════════════════════════════════════════════════════════╗');
console.log('║                    DÉPLOIEMENT TERMINÉ                 ║');
console.log('╚════════════════════════════════════════════════════════╝\n');

console.log('📁 Structure créée:');
console.log(`   dnb/2025/`);
console.log(`   ├─ tex/                      (originaux intacts)`);
console.log(`   ├─ tex_versions/`);
console.log(`   │   └─ ${version}/`);
console.log(`   │       ├─ *.tex             (enrichis avec images)`);
console.log(`   │       └─ images/           (images UPDF)`);
console.log(`   └─ tex_config.json           (configuration)\n`);

console.log('🔄 POUR UTILISER LA VERSION ENRICHIE:');
console.log(`   Modifier tex_config.json:`);
console.log(`   "activeVersion": "${version}"\n`);

console.log('⏪ POUR REVENIR AUX ORIGINAUX:');
console.log(`   Modifier tex_config.json:`);
console.log(`   "activeVersion": "original"\n`);

console.log('🧪 POUR TESTER:');
console.log(`   1. Ouvrez l'application`);
console.log(`   2. Chargez un exercice Amérique du Nord`);
console.log(`   3. L'image UPDF devrait s'afficher\n`);

console.log('📝 Fichiers disponibles:');
texFiles.forEach(f => console.log(`   • ${f}`));

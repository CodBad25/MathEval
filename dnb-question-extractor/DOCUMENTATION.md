# Documentation DNB Question Extractor

## 📋 Objectif

Extraire automatiquement les questions des sujets DNB en combinant :
- **LaTeX** (fichiers .tex) : Texte exact sans erreurs OCR
- **UPDF** (HTML OCR) : Structure et images/graphiques extraits

## 🔒 Sécurité des données

**⚠️ IMPORTANT : Ce projet NE MODIFIE PAS les fichiers originaux !**

- Tous les fichiers générés sont dans `dnb-question-extractor/output/`
- Les fichiers `.tex` originaux dans `dnb/2025/tex/` restent intacts
- Les images UPDF sont COPIÉES, pas déplacées

## 📁 Structure du projet

```
dnb-question-extractor/
├── scripts/
│   ├── 1-parse-html.js           # Parse HTML OCR → structure
│   ├── 2-extract-latex.js        # Extrait questions des .tex
│   ├── 3-generate-png.js         # Génère PNG par question
│   ├── 4-integrate.js            # Intégration dans l'app
│   ├── 5-combine-latex-images.js # Associe LaTeX + images
│   ├── 6-correct-html-with-latex.js # Corrige HTML avec LaTeX
│   ├── 7-enrich-tex-with-images.js  # Enrichit .tex avec images
│   └── utils.js                  # Fonctions utilitaires
├── output/
│   ├── structure.json            # Structure des exercices
│   ├── questions.json            # Questions LaTeX extraites
│   ├── combined-questions.json   # Questions + références images
│   ├── corrected.html            # HTML UPDF corrigé
│   ├── png/                      # PNG par question (méthode 1)
│   └── tex_enrichis/             # .tex enrichis avec images
│       ├── images/               # Images UPDF copiées
│       └── *.tex                 # Fichiers .tex enrichis
├── temp/                         # Fichiers temporaires
├── package.json
├── README.md
├── DOCUMENTATION.md              # Ce fichier
└── INTEGRATION.md                # Guide d'intégration
```

## 🔄 Workflows disponibles

### Workflow 1 : PNG par question (LaTeX rendu)
```bash
npm run parse     # Parse HTML OCR
npm run extract   # Extrait LaTeX
npm run generate  # Génère PNG
```
**Résultat** : PNG individuels avec texte rendu par KaTeX

### Workflow 2 : HTML corrigé
```bash
node scripts/6-correct-html-with-latex.js
```
**Résultat** : HTML UPDF avec texte LaTeX (garde mise en page)

### Workflow 3 : LaTeX enrichi avec images (RECOMMANDÉ)
```bash
node scripts/5-combine-latex-images.js  # Associe images aux exercices
node scripts/7-enrich-tex-with-images.js # Crée .tex enrichis
```
**Résultat** : Fichiers .tex complets avec images UPDF intégrées

## 📊 Traçabilité des actions

### Fichiers sources
- **HTML OCR UPDF** : `~/Library/.../Annee_2025_Brevet_OCR.htm`
- **Images UPDF** : `~/Library/.../Annee_2025_Brevet_OCR_files/`
- **Fichiers .tex** : `/correcteur-universel/dnb/2025/tex/`

### Fichiers générés
- `structure.json` : 1 sujet, 12 exercices, 48 questions
- `questions.json` : LaTeX extrait de chaque question
- `combined-questions.json` : Mapping exercice → images UPDF
- `png/*.png` : 23 PNG individuels par question
- `tex_enrichis/*.tex` : Fichiers .tex avec \includegraphics

### Logs de chaque script
Chaque script affiche des logs détaillés :
- Nombre d'éléments traités
- Erreurs rencontrées
- Fichiers créés/modifiés

## 🔍 Comment vérifier les résultats

### 1. Vérifier les PNG générés
```bash
open output/png/
```

### 2. Vérifier le HTML corrigé
```bash
open output/corrected.html
```

### 3. Vérifier les .tex enrichis
```bash
ls -lh output/tex_enrichis/
cat output/tex_enrichis/dnb_2025_06_ameriquenord_2_enrichi.tex
```

### 4. Vérifier les images copiées
```bash
ls -lh output/tex_enrichis/images/
```

## ⚠️ Points d'attention

1. **OCR imparfait** : Le parsing HTML peut manquer certains exercices si la structure change
2. **Mapping des images** : Les images sont associées par exercice, pas par question individuelle
3. **Formules LaTeX complexes** : Tableaux, TikZ peuvent ne pas être rendus correctement
4. **Plusieurs sujets** : Le HTML contient plusieurs sujets DNB (Amérique Nord, Asie, etc.)

## 🚀 Prochaines améliorations possibles

1. Améliorer le parsing HTML pour détecter tous les sujets séparément
2. Associer les images à chaque question (pas juste l'exercice)
3. Compiler les .tex enrichis en PDF
4. Intégrer dans l'application MathEval

## 📅 Historique

- **2025-11-15** : Création du projet
  - Scripts 1-7 créés
  - 23 PNG générés
  - 38 corrections LaTeX appliquées
  - Structure préservée dans dossier isolé

## 👤 Contact

Projet développé pour MathEval (Correcteur Universel DNB)

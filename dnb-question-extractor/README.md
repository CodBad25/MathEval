# DNB Question Extractor

**Objectif** : Extraire automatiquement les questions individuelles des sujets DNB et générer des PNG par question.

## Stratégie

### 1. Sources de données
- **HTML OCR** (généré par UPDF) : Structure et organisation des exercices
- **Fichiers .tex** : Contenu LaTeX exact sans erreurs OCR

### 2. Workflow

```
HTML OCR                    Fichiers .tex               PNG Questions
──────────                  ─────────────               ─────────────
Parser structure      →     Extraire LaTeX       →     Générer PNG
- Sujets                    - Question 1                - q1.png
- Exercices                 - Question 2                - q2.png
- Questions                 - Question 3                - q3.png
```

### 3. Structure du dossier

```
dnb-question-extractor/
├── scripts/
│   ├── 1-parse-html.js        # Parse HTML OCR → JSON structure
│   ├── 2-extract-latex.js     # Extrait questions des .tex
│   ├── 3-generate-png.js      # LaTeX → HTML → PNG
│   └── utils.js               # Fonctions utilitaires
├── output/
│   ├── structure.json         # Structure extraite du HTML
│   ├── questions.json         # Questions LaTeX par exercice
│   └── png/                   # PNG générés par question
└── temp/                      # Fichiers temporaires
```

## Utilisation

### Étape 1 : Parser le HTML OCR
```bash
node scripts/1-parse-html.js
```
Input : `Annee_2025_Brevet_OCR.htm`
Output : `output/structure.json`

### Étape 2 : Extraire le LaTeX
```bash
node scripts/2-extract-latex.js
```
Input : `output/structure.json` + fichiers `.tex`
Output : `output/questions.json`

### Étape 3 : Générer les PNG
```bash
node scripts/3-generate-png.js
```
Input : `output/questions.json`
Output : `output/png/*.png`

## Format des données

### structure.json
```json
{
  "ameriquenord_2025": {
    "titre": "Amérique du Nord - 4 juin 2025",
    "exercices": [
      {
        "numero": 1,
        "titre": "Exercice 1 : 20 points",
        "nbQuestions": 5
      }
    ]
  }
}
```

### questions.json
```json
{
  "dnb_2025_06_ameriquenord_2": {
    "questions": [
      {
        "numero": 1,
        "latex": "Calculer la longueur AB.",
        "sousQuestions": []
      }
    ]
  }
}
```

## Notes

- Ce projet est **isolé** de l'application principale
- Les PNG générés seront ensuite copiés dans `dnb/2025/tex/png/questions/`
- Aucune modification du code existant

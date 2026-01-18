# Intégration dans l'application MathEval

## Avantages de la séparation par questions

✅ **Groupement intelligent dans le PDF** : Mettre 2-3 questions sur une même page
✅ **Affichage flexible** : Montrer question par question dans l'interface
✅ **Taille optimisée** : Chaque question = petit PNG (3-10 KB)
✅ **Pas de réduction** : Images en taille réelle, toujours lisibles

## Option 1 : Utiliser directement les PNG

### Copier les PNG dans votre application
```bash
cp output/png/*.png /Users/macbelhaj/correcteur-universel/dnb/2025/tex/png/questions/
```

### Modifier votre code PDF pour utiliser les PNG par question

Au lieu de :
```javascript
// Charger l'exercice complet
const pngPath = `dnb/2025/tex/png/dnb_2025_06_ameriquenord_2.png`;
```

Faire :
```javascript
// Charger les questions une par une
const questions = [
  `dnb/2025/tex/png/questions/dnb_2025_06_ameriquenord_2_q1.png`,
  `dnb/2025/tex/png/questions/dnb_2025_06_ameriquenord_2_q2.png`,
  `dnb/2025/tex/png/questions/dnb_2025_06_ameriquenord_2_q3.png`
];

// Grouper intelligemment
let currentPageHeight = 0;
let currentPageQuestions = [];

for (const questionPng of questions) {
  const img = await loadImage(questionPng);
  const height = calculateHeight(img);

  if (currentPageHeight + height <= maxPageHeight) {
    // Ajouter à la page courante
    currentPageQuestions.push(questionPng);
    currentPageHeight += height;
  } else {
    // Nouvelle page
    renderQuestionsOnPage(pdf, currentPageQuestions);
    currentPageQuestions = [questionPng];
    currentPageHeight = height;
  }
}
```

## Option 2 : Utiliser le JSON + LaTeX

### Avantage : Rendu dynamique avec KaTeX

```javascript
// Charger la structure
const questionsData = await fetch('dnb-question-extractor/output/questions.json');
const questions = questionsData['dnb_2025_06_ameriquenord_2'].questions;

// Rendre chaque question avec KaTeX
for (const q of questions) {
  const html = convertLatexToHtml(q.latex);
  const canvas = await html2canvas(html);
  addToPage(pdf, canvas);
}
```

## Option 3 : Hybride (recommandé)

1. **Pour les exercices avec images/graphiques** : Utiliser les PNG par question
2. **Pour les exercices texte simple** : Générer dynamiquement avec KaTeX

## Modifications nécessaires dans app.html

### 1. Ajouter métadonnées des questions

Dans votre structure `exercisesData`, ajouter :
```javascript
exercisesData['dnb_2025_06_ameriquenord_2'] = {
  dnbId: 'dnb_2025_06_ameriquenord_2',
  questions: [
    {
      numero: 1,
      pngPath: 'dnb/2025/tex/png/questions/dnb_2025_06_ameriquenord_2_q1.png',
      latex: 'Calculer la longueur AB.'
    },
    // ...
  ]
};
```

### 2. Modifier la génération PDF

Dans `pdfGenerator.js`, fonction `addGroupedExercises()` :
```javascript
// Au lieu de charger l'exercice complet
for (const question of exercise.questions) {
  const questionPng = question.pngPath;
  const img = await loadImage(questionPng);
  // Grouper intelligemment...
}
```

## Test rapide

Voulez-vous que je crée un script qui :
1. Copie les PNG dans votre application
2. Génère un fichier JSON de mapping exercice → questions
3. Modifie votre pdfGenerator.js pour utiliser les questions séparées ?

// Script pour injecter le barème de l'évaluation 5ème
// À exécuter dans la console du navigateur sur mathseval.netlify.app

const bareme = [
  {
    uuid: "9d15d",
    competencesExercice: ["Chercher", "Représenter", "Calculer", "Communiquer"],
    detailParQuestion: false,
    totalPoints: 3,
    questions: [
      { questionIndex: 0, points: 1, competences: [] },
      { questionIndex: 1, points: 1, competences: [] },
      { questionIndex: 2, points: 1, competences: [] }
    ]
  },
  {
    uuid: "4c10a",
    competencesExercice: ["Calculer"],
    detailParQuestion: false,
    totalPoints: 5,
    questions: [
      { questionIndex: 0, points: 1, competences: [] },
      { questionIndex: 1, points: 1, competences: [] },
      { questionIndex: 2, points: 1, competences: [] },
      { questionIndex: 3, points: 1, competences: [] },
      { questionIndex: 4, points: 1, competences: [] }
    ]
  },
  {
    uuid: "cd0d8",
    competencesExercice: ["Chercher", "Représenter", "Calculer", "Communiquer"],
    detailParQuestion: false,
    totalPoints: 2,
    questions: [
      { questionIndex: 0, points: 1, competences: [] },
      { questionIndex: 1, points: 1, competences: [] }
    ]
  },
  {
    uuid: "65bd7",
    competencesExercice: ["Chercher", "Modéliser", "Raisonner", "Calculer"],
    detailParQuestion: false,
    totalPoints: 4,
    questions: [
      { questionIndex: 0, points: 1, competences: [] },
      { questionIndex: 1, points: 1, competences: [] },
      { questionIndex: 2, points: 1, competences: [] },
      { questionIndex: 3, points: 1, competences: [] }
    ]
  },
  {
    uuid: "cd69a",
    competencesExercice: ["Raisonner", "Calculer"],
    detailParQuestion: false,
    totalPoints: 4,
    questions: [
      { questionIndex: 0, points: 4, competences: [] }
    ]
  },
  {
    uuid: "eb45a",
    competencesExercice: ["Calculer"],
    detailParQuestion: false,
    totalPoints: 3,
    questions: [
      { questionIndex: 0, points: 1, competences: [] },
      { questionIndex: 1, points: 1, competences: [] },
      { questionIndex: 2, points: 1, competences: [] }
    ]
  },
  {
    uuid: "f9a02",
    competencesExercice: ["Calculer"],
    detailParQuestion: false,
    totalPoints: 4,
    questions: [
      { questionIndex: 0, points: 2, competences: [] },
      { questionIndex: 1, points: 2, competences: [] }
    ]
  }
];

localStorage.setItem('mathalea_bareme_locked', JSON.stringify(bareme));
console.log('✅ Barème injecté avec succès (25 points, 7 exercices)');
console.log('📊 Rechargez la page pour voir le barème appliqué');

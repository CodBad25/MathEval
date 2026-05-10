// ═══════════════════════════════════════════════════════════════
//  DNB BLANC N°2 — Collège Gaston Chaissac, Pouzauges
//  Session du jeudi 9 avril 2026 — Barème sur 20 points
//  Option B — 6 exercices, 33 questions
//
//  USAGE : Ouvrir https://mathseval.netlify.app/extension/index.html?v=correction
//          Ouvrir la console (F12), coller ce script, Entrée, recharger la page.
// ═══════════════════════════════════════════════════════════════

const evaluationData = [
  {
    exerciceIndex: 0,
    titre: "Automatismes",
    uuid: "dnb01",
    competencesExercice: ["Chercher", "Représenter", "Calculer", "Modéliser", "Communiquer"],
    detailParQuestion: false,
    totalPoints: 6,
    questions: [
      { questionIndex: 0, competences: [], points: 1, enonce: "Q1 — Schéma carré ABCD + triangle équilatéral CDE + triangle isocèle BCF" },
      { questionIndex: 1, competences: [], points: 1, enonce: "Q2 — Périmètre d'un cercle de rayon 3 cm" },
      { questionIndex: 2, competences: [], points: 1, enonce: "Q3 — Calculer 77,6 ÷ 10" },
      { questionIndex: 3, competences: [], points: 1, enonce: "Q4 — Total des ventes (diagramme en barres)" },
      { questionIndex: 4, competences: [], points: 1, enonce: "Q5 — Densité de population (49 298 hab / 302 km²)" },
      { questionIndex: 5, competences: [], points: 1, enonce: "Q6 — Script Scratch polygone régulier 5 côtés" }
    ]
  },
  {
    exerciceIndex: 1,
    titre: "Circuits d'entraînement (PGCD/PPCM)",
    uuid: "dnb02",
    competencesExercice: ["Chercher", "Calculer", "Raisonner"],
    detailParQuestion: false,
    totalPoints: 2,
    questions: [
      { questionIndex: 0, competences: [], points: 0.5, enonce: "Q1 — Montrer circuit 1 = 280s et circuit 2 = 350s" },
      { questionIndex: 1, competences: [], points: 0.5, enonce: "Q2 — Décomposition en facteurs premiers de 280 et 350" },
      { questionIndex: 2, competences: [], points: 0.5, enonce: "Q3a — Camille au départ à 2800s + position Dominique" },
      { questionIndex: 3, competences: [], points: 0.5, enonce: "Q3b — PPCM : temps pour se retrouver (min et s)" }
    ]
  },
  {
    exerciceIndex: 2,
    titre: "Programme de calcul",
    uuid: "dnb03",
    competencesExercice: ["Calculer", "Raisonner", "Modéliser"],
    detailParQuestion: false,
    totalPoints: 3,
    questions: [
      { questionIndex: 0, competences: [], points: 0.5, enonce: "Q1 — Montrer résultat = 6 pour x = 5" },
      { questionIndex: 1, competences: [], points: 0.5, enonce: "Q2 — Exprimer le résultat en fonction de x" },
      { questionIndex: 2, competences: [], points: 0.5, enonce: "Q3 — Vérifier la forme (x+1)(x−4)" },
      { questionIndex: 3, competences: [], points: 0.5, enonce: "Q4 — Trouver les nombres pour résultat = 0" },
      { questionIndex: 4, competences: [], points: 1, enonce: "Q5 — Compléter lignes 4 et 6 du programme Scratch" }
    ]
  },
  {
    exerciceIndex: 3,
    titre: "Jardin botanique (géométrie)",
    uuid: "dnb04",
    competencesExercice: ["Chercher", "Raisonner", "Calculer", "Représenter"],
    detailParQuestion: false,
    totalPoints: 3,
    questions: [
      { questionIndex: 0, competences: [], points: 0.5, enonce: "Q1 — Longueur du segment [DB]" },
      { questionIndex: 1, competences: [], points: 0.5, enonce: "Q2 — Pythagore : montrer AD ≈ 866 m" },
      { questionIndex: 2, competences: [], points: 0.5, enonce: "Q3 — Sinus angle EAB + mesure en degrés" },
      { questionIndex: 3, competences: [], points: 0.5, enonce: "Q4a — Montrer (AB) // (DC)" },
      { questionIndex: 4, competences: [], points: 0.5, enonce: "Q4b — Montrer CD = 1 500 m" },
      { questionIndex: 5, competences: [], points: 0.5, enonce: "Q5 — Temps piéton < 1 heure ?" }
    ]
  },
  {
    exerciceIndex: 4,
    titre: "Lunettes de soleil (tableur/stats)",
    uuid: "dnb05",
    competencesExercice: ["Calculer", "Modéliser", "Communiquer"],
    detailParQuestion: false,
    totalPoints: 2,
    questions: [
      { questionIndex: 0, competences: [], points: 0.5, enonce: "Q1 — Étendue des prix = 85 €" },
      { questionIndex: 1, competences: [], points: 0.5, enonce: "Q2 — Formule G2 + nombre total de paires vendues" },
      { questionIndex: 2, competences: [], points: 0.5, enonce: "Q3a — Montant total des ventes en euros" },
      { questionIndex: 3, competences: [], points: 0.5, enonce: "Q3b — Prix moyen arrondi au centime" }
    ]
  },
  {
    exerciceIndex: 5,
    titre: "Fonctions",
    uuid: "dnb06",
    competencesExercice: ["Calculer", "Raisonner", "Modéliser", "Représenter"],
    detailParQuestion: false,
    totalPoints: 4,
    questions: [
      { questionIndex: 0, competences: [], points: 0.5, enonce: "Q1a — Vérifier résultat = 60 pour x = −8" },
      { questionIndex: 1, competences: [], points: 0.5, enonce: "Q1b — Résoudre (x+3)(x−4) = 0" },
      { questionIndex: 2, competences: [], points: 0.5, enonce: "Q2a — Montrer f(x) = x² − x − 12" },
      { questionIndex: 3, competences: [], points: 0.5, enonce: "Q2b — Calculer f(1/2)" },
      { questionIndex: 4, competences: [], points: 0.5, enonce: "Q2c — Antécédents de −6 graphiquement" },
      { questionIndex: 5, competences: [], points: 0.5, enonce: "Q3a — Formule cellule B2 pour g(x) = 3x − 7" },
      { questionIndex: 6, competences: [], points: 0.5, enonce: "Q3b — Tracer g dans le repère" },
      { questionIndex: 7, competences: [], points: 0.5, enonce: "Q3c — Intersection f et g graphiquement" }
    ]
  }
];

// Mapping compétences Pronote → questions spécifiques du DNB Blanc 2
// Validé par Mélodie le 2026-05-08
const pronoteCompetencesMapping = [
  { code: "1 : Chercher",    normKey: "chercher" },
  { code: "2 : Modéliser",   normKey: "modeliser" },
  { code: "3 : Représenter", normKey: "representer" },
  { code: "4 : Raisonner",   normKey: "raisonner" },
  { code: "5 : Calculer",    normKey: "calculer" },
  { code: "6 : Communiquer", normKey: "communiquer" },
  { code: "7.18 : 3e - Utiliser des diviseurs, multiples et des nombres premiers.",
    questions: [{ex: 1, q: 0}, {ex: 1, q: 2}, {ex: 1, q: 3}] },
  { code: "7.19 : 3e - Décomposer en produit de facteurs premiers et rendre une fraction irréductible.",
    questions: [{ex: 1, q: 1}] },
  { code: "8.9 : 3e - Produire et utiliser une expression littérale.",
    questions: [{ex: 2, q: 1}] },
  { code: "8.10 : 3e - Connaître et utiliser la double distributivité et les identités remarquables.",
    questions: [{ex: 2, q: 2}, {ex: 5, q: 2}] },
  { code: "8.16 : 3e - Déterminer une image ou un antécédent par une fonction.",
    questions: [{ex: 5, q: 3}, {ex: 5, q: 4}] },
  { code: "9.14 : 4e - Calculer une longueur avec le théorème de Pythagore.",
    questions: [{ex: 3, q: 1}] },
  { code: "9.22 : 3e - Calculer une longueur avec le théorème de Thalès.",
    questions: [{ex: 3, q: 4}] },
  { code: "9.24 : 3e - Connaître les formules trigonométriques.",
    questions: [{ex: 3, q: 2}] },
  { code: "9.26 : 3e - Déterminer un angle avec la trigonométrie.",
    questions: [{ex: 3, q: 2}] },
  { code: "11.13 : 4e - Étudier les caractéristiques d'une série de données.",
    questions: [{ex: 4, q: 0}, {ex: 4, q: 3}] },
  { code: "11.14 : 4e - Étudier des données à l'aide d'un tableur.",
    questions: [{ex: 4, q: 1}, {ex: 5, q: 5}] },
  { code: "11.18 : 3e - Manipuler des grandeurs produits et des grandeurs quotients.",
    questions: [{ex: 0, q: 4}, {ex: 3, q: 5}] },
  { code: "11.21 : 3e - Étudier des données statistiques regroupées par effectifs.",
    questions: [{ex: 4, q: 1}, {ex: 4, q: 2}] },
  { code: "12.1 : 5e - Utiliser des variables et des boucles.",
    questions: [{ex: 0, q: 5}, {ex: 2, q: 4}] },
];

// Injection dans localStorage
localStorage.setItem('evaluationData', JSON.stringify(evaluationData));
localStorage.setItem('pronoteCompetencesMapping', JSON.stringify(pronoteCompetencesMapping));
localStorage.setItem('evaluationConfig', JSON.stringify({
  modeEvaluation: 'mixte',
  seuilTBM: 90,
  seuilMS: 70,
  seuilMF: 30
}));
localStorage.setItem('competencesPersonnalisees', JSON.stringify(
  ["Chercher", "Modéliser", "Représenter", "Raisonner", "Calculer", "Communiquer"]
));
localStorage.setItem('competencesActivees', JSON.stringify({
  Chercher: true, Modéliser: true, Représenter: true,
  Raisonner: true, Calculer: true, Communiquer: true
}));

console.log('✅ Barème DNB Blanc n°2 injecté (20 points, 6 exercices, 33 questions)');
console.log('📊 Rechargez la page pour voir le barème appliqué');

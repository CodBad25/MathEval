# BRIEFING — Reprise de la section "Import PDF/DOCX" de MathEval

> Coller ce fichier comme premier message dans le terminal MathEval (`cd ~/Dev/MathEval && claude`).

---

## Résumé de ce qu'on a fait dans la session précédente

On a travaillé dans `~/Dev/skill-bilans-pdf/` pendant ~2h (14-16 avril 2026). Voici tout ce qui a été réalisé et décidé.

---

## 1. Skill Claude Code `bilans-pdf` — CRÉÉ ET FONCTIONNEL

On a créé un **skill Claude Code réutilisable** installé dans `~/.claude/skills/bilans-pdf/`. Son rôle : scaffolder dans n'importe quel projet le pattern "bilans PDF wow" (bilan individuel élève 1 page A4 + bilan classe 2 pages) à partir d'un JSON de scores.

### Structure complète du skill

```
~/.claude/skills/bilans-pdf/
├── SKILL.md                        # Frontmatter + workflow en 5 étapes
├── templates/
│   ├── bilans.html                  # Page HTML : drop zone JSON, 12 checkboxes config, boutons
│   ├── generate-pdf.js              # jsPDF vectoriel : buildIndividualBilanPDF() + buildClassBilanPDF() + ZIP
│   ├── generate-modal.js            # Modales HTML preview : classe (stats, tableau) + individuel (nav ←→, chips, recherche)
│   ├── main.js                      # Orchestration : import JSON/CSV, toasts, persistance localStorage
│   └── styles.css                   # Charte visuelle (palette bleu/vert/orange/rouge)
├── references/
│   ├── data-schema.md               # Schéma JSON canonique détaillé (voir §2 ci-dessous)
│   ├── note-calculation.md          # 3 règles : PROP (défaut), CAP (exceptionnel), RAW
│   ├── adapters.md                  # Comment mapper un JSON projet vers le schéma canonique
│   ├── anonymat.md                  # 30 noms mathématiciens + mapping stable
│   ├── emojis-canvas.md             # Technique emoji → dataURL pour jsPDF (avec cache)
│   └── qrcode-setup.md              # qrcode-generator CDN + URL configurable
├── exemples/                        # (vide, à remplir avec PDF exemples)
└── scripts/
    └── scaffold.sh                  # Copie templates dans un dossier cible
```

### Ce que le skill produit (bilan individuel)

PDF 1 page A4 avec (chaque section activable via checkbox) :
- Header coloré (titre éval + collège + date)
- Carte note colorée (note /20 + brut + niveau TBM/MS/MF/MI)
- Appréciation prof (texte libre)
- Barème (4 colonnes : exos, rédaction, brut, note)
- Exercices (emoji + nom + barre de progression + score/max)
- Compétences (6 barres : Calculer, Raisonner, Modéliser, Chercher, Représenter, Communiquer)
- Recommandations (3 colonnes : à refaire / à consolider / bien maîtrisé)
- QR code correction (optionnel, URL configurable)
- Signatures (élève + parents)
- Footer avec ❤️

### Ce que le skill produit (bilan classe)

PDF 2 pages :
- Page 1 : stats (moyenne, min, max, écart-type), répartition TBM/MS/MF/MI, histogramme distribution
- Page 2 : tableau élèves trié par note (colonnes : #, nom, note, niveau, scores par exo)

### Comment le skill se déclenche

Claude Code détecte automatiquement le skill quand l'utilisateur dit "crée des bilans PDF", "génère des bilans élèves", etc. Le skill pose alors les questions groupées (titre, règle note, sections, QR) puis scaffolde.

---

## 2. Schéma JSON canonique attendu par le skill

Le skill `bilans-pdf` attend un JSON avec cette structure précise (extrait de `references/data-schema.md`) :

```json
{
  "appState": {
    "candidates": [{"number": 1, "active": true}, ...],
    "scores": {
      "[candidateId]": {
        "[exerciseId]": {
          "[questionKey]": {
            "score": 0.5,
            "competences": {"Représenter": 0.5, "Communiquer": 0}
          }
        }
      }
    },
    "quickButtonStates": {
      "[candidateId]": {
        "[exerciseId]": {
          "[questionKey]": "tb" | "tb-" | "nr" | null
        }
      }
    },
    "candidateComments": {"[candidateId]": "Appréciation texte..."},
    "presentationScores": {"[candidateId]": 1},
    "baremeConfig": {
      "totalMax": 20,
      "exercises": {
        "[exerciseId]": {
          "totalPoints": 8,
          "selectedCompetences": ["Raisonner", "Communiquer"],
          "questionPoints": {"q0": 1, "q1": 1, ...},
          "questionCompetences": {"q0": ["Raisonner"], "q1": ["Communiquer"]}
        }
      }
    }
  },
  "exercisesData": {
    "[exerciseId]": {
      "title": "Cours",
      "totalPoints": 8,
      "questions": [{"id": "q0", "title": "Question 1", "points": 1, ...}]
    }
  }
}
```

**C'est CE format que la section "Import PDF" de MathEval doit produire en sortie de correction.**

---

## 3. Règle de note — CRITIQUE

Trois règles supportées, **toujours demander à l'utilisateur** :

- **`PROP`** (défaut) : `note = brut × 20 / max` — conversion proportionnelle classique. C'est le cas le plus courant.
- **`CAP`** (exceptionnel) : `note = min(brut, 20)` — plafonnement. Utilisé **uniquement** pour le DNB2 Chaissac parce que le sujet était trop long (barème 26, plafonné à 20). **NE JAMAIS appliquer par défaut.**
- **`RAW`** : la note est déjà /20 dans le JSON.

**Incident passé** : le 14/04/2026, un premier prototype avait utilisé CAP comme défaut → erreur sur les notes. M. Belhaj a corrigé : CAP est exceptionnel, PROP est le défaut.

---

## 4. L'éval test — 5ème Géométrie du triangle

On a aussi créé un sujet d'éval en LaTeX (`~/Downloads/eval-5a-geom.pdf`, 2 pages) pour la classe 5A :

**Ex1 — Cours (8 pts)** :
- Q1 : 3 inégalités triangulaires (3 pts)
- Q2 : égalité I,J,K alignés : IJ + JK = IK (1 pt)
- Q3a : définition médiatrice (2 pts)
- Q3b : définition bissectrice (2 pts)

**Ex2 — Construction (12 pts)** :
- Q1 : construire triangle MAT (MA=6cm, MT=9cm, M̂=100°) (3 pts)
- Q2 : 3 médiatrices en vert (3 pts)
- Q3 : 3 bissectrices en bleu (3 pts)
- Q4 : cercle circonscrit passant par M, A, T (3 pts)

**Total : /20, règle PROP, compétences : Chercher, Représenter, Raisonner, Communiquer**

Ce sera le premier cas test quand l'Import PDF sera fonctionnel.

---

## 5. Le workflow bout-en-bout visé

```
PDF éval (scan tableau ou LaTeX)
    ↓
MathEval — Section "Import PDF"
    ↓ upload + extraction questions + barème
Correction par élève (TB / partiel / faux / NR par question)
    ↓ appréciation par élève
Export JSON (format canonique §2)
    ↓
Skill bilans-pdf (scaffold + génération)
    ↓
Bilans PDF individuels (ZIP) + Bilan classe
```

---

## 6. La branche existante `claude/design-pdf-import-s3aKV`

Cette branche contient déjà une implémentation quasi-complète. Dernier commit : `d8d3f019` (12/04/2026).

### Modules créés
- `js/modules/uploadUI.js` — drag & drop + clé API Mistral + suivi coûts OCR
- `js/modules/pdfExtract.js` — canvas overlay pour zones par question
- `js/modules/questionParser.js` (~820 lignes) — extraction auto exercices/questions
- `js/modules/baremeConfig.js` (~342 lignes) — barème + chips compétences
- `js/modules/correctionManager.js` (~228 lignes) — 3 chemins : PDF corrigé, photos, JSON
- `api/ocr.py` — proxy Vercel pour OCR Mistral (Pixtral Large)

### 6 étapes UI dans app.html
1. Upload (drag & drop PDF/DOCX/ODT)
2. Détection questions (auto-parsing)
3. Zones visuelles (canvas overlay)
4. Configuration barème (points + compétences par question)
5. Choix mode correction (PDF corrigé / photos manuscrites / JSON)
6. Génération `exercisesData` → même moteur correction que DNB

### Statut
- Non fusionné sur main (carte "Prochainement" en prod)
- Données exemples dans `import-pdf/` (JSON triangles/relatifs)

---

## 7. Ce qu'il faut vérifier et faire

### Vérifications prioritaires
1. **Checkout la branche** et faire le point sur l'état réel (est-ce que ça tourne ?)
2. **Le JSON de sortie** après correction est-il compatible avec le schéma canonique §2 ? Probablement pas exactement → il faudra adapter/ajouter un export.
3. **La correction manuelle** (prof avec copies papier devant lui, pas OCR) fonctionne-t-elle ? C'est le cas d'usage principal pour M. Belhaj.
4. **L'import CSV élèves** (depuis Pronote) pour avoir les vrais noms.

### Ce qui manque potentiellement
- Un **bouton "Export JSON bilans-pdf"** qui produit le schéma canonique exact
- Un **mode correction par question** (toutes les copies sur Q1, puis Q2) en plus du mode par élève
- La **compatibilité tablette** pour corriger en classe
- Le **test avec l'éval 5A** (`~/Downloads/eval-5a-geom.pdf`)

### Actions
1. Checkout la branche, tester en local (`npm run dev`)
2. Uploader le PDF `eval-5a-geom.pdf` et parcourir les 6 étapes
3. Identifier les blocages / manques
4. Compléter ce qui manque
5. Ajouter l'export JSON compatible bilans-pdf
6. Tester le workflow bout-en-bout (import → correction → JSON → bilans)
7. Montrer le résultat à M. Belhaj avant merge/deploy

---

## 8. Contraintes M. Belhaj (CRITIQUES — à respecter dans tout le code)

- **ZÉRO hallucination** : ne jamais inventer de contenu pédagogique, valeurs, énoncés
- **Tester en local** avant déploiement — valider visuellement avec l'utilisateur
- **Pas de push git** sans autorisation explicite
- **Pas d'`alert()`** — toujours toast/bandeau esthétique
- **Français avec accents** partout (é, è, ê, à, ç, etc.)
- **Cases à cocher / chips** pour les choix multiples (JAMAIS de `<select>`)
- **Règle note** : toujours DEMANDER avant de choisir (PROP par défaut)
- **Ne changer que ce qui est demandé** — ne pas modifier des fonctionnalités non sollicitées
- **Confirmer compréhension et ATTENDRE le feu vert** avant de coder si l'utilisateur vérifie

---

## Fichiers à consulter pour le contexte complet

- `~/.claude/skills/bilans-pdf/SKILL.md` — le skill complet
- `~/.claude/skills/bilans-pdf/references/data-schema.md` — schéma JSON canonique
- `~/.claude/skills/bilans-pdf/references/note-calculation.md` — règles de note
- `~/Dev/skill-bilans-pdf/RAPPORT.md` — rapport de création du skill
- `~/Downloads/eval-5a-geom.pdf` — sujet éval 5ème test
- `~/Downloads/eval-5a-geom.tex` — source LaTeX du sujet

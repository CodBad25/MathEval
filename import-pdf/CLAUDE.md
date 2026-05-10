# Import PDF / DOCX — Section 3 de MathEval

## Vision du projet

Troisième section de MathEval (https://matheval.netlify.app). L'utilisateur uploade un PDF ou DOCX de **n'importe quel devoir de maths** (pas forcément DNB), l'app extrait automatiquement les questions, puis l'utilisateur configure manuellement le barème et les compétences par question. Ensuite, le **même moteur de correction** que les sections existantes prend le relais.

## Fonctionnalités à reproduire (depuis la section DNB)

Toutes les fonctionnalités de la section DNB de MathEval doivent être disponibles :

### Correction & Scoring
- Notes par question avec TB- (demi-points) via `tb-partial.js`
- Popover commentaires par question
- Compétences par exercice avec poids configurables (`competencyWeights`)
- Seuils compétences configurables : MI / MF / MS / TBM (slider visuel `threshold-slider.js`, fallback 90/70/30)

### Bilans
- **Bilan PDF individuel** : 2 élèves par page A4, ZIP individuels, QR code, histogrammes (via `bilan-pdf.js`, jsPDF, JSZip)
- **Bilan de classe** : HTML + export PDF 2 pages A4 — stats, histogramme, compétences, exercices, acquis, tableau élèves (via `bilan-classe.js`)

### Import / Export
- Import/export JSON des corrections
- Export notes/compétences vers **Pronote** (séparateur `;`, encodage Latin-1/Windows-1252 auto-détecté) via `export-pronote.js`
- Envoi bilans via **Google Classroom** (ZIP → Drive → Apps Script)

### Cloud & Auth
- Sync cross-device via **Supabase** (`supabase-sync.js`, 17 clés localStorage)
- Auth Supabase email/password (`auth-global.js`)

### Autres
- Anonymisation élèves avec pseudos mathématiciens (15F+15M, `anonymize.js`)
- Import liste élèves depuis CSV Pronote

## Ce qui est NOUVEAU (à développer)

### Upload & Extraction
- Upload de fichiers **PDF** et **DOCX**
- Extraction automatique des questions depuis le document
- Gestion des formules mathématiques (LaTeX, images)
- Gestion des figures/schémas

### Configuration manuelle
- L'utilisateur **valide/corrige** les questions extraites
- L'utilisateur **attribue le barème** (points par question)
- L'utilisateur **assigne les compétences** à chaque question
- Interface intuitive avec boutons/chips (PAS de select/dropdown)

## Stack technique

- **Svelte + Vite** (cohérent avec le reste de MathEval)
- **Scripts d'injection vanilla JS** : même pattern IIFE que les sections existantes
- **jsPDF + JSZip** : bilans PDF
- **Supabase** : auth + sync cloud (même instance que MathEval : `ehxdbjgvqzpttuafwufh`)
- **PDF parsing** : à définir (pdf.js, pdf-parse, ou autre)

## Architecture MathEval existante (référence)

Le projet parent MathEval est dans `../` avec :
- `../extension/` — Section DNB (le modèle à suivre)
- `../alea/` — Section MathALÉA
- `../extension/assets/` — Tous les scripts d'injection à réutiliser/factoriser :
  - `auth-global.js`, `tb-partial.js`, `bilan-pdf.js`, `bilan-classe.js`
  - `supabase-sync.js`, `export-pronote.js`, `anonymize.js`, `threshold-slider.js`

### Pattern commun des scripts existants
- IIFE (Immediately Invoked Function Expression)
- Vérifient `location.search.includes('correction')`
- Utilisent `window.__getExercises()` et `window.__getStudentList()`
- Chargés via `<script defer>` dans `index.html`

### localStorage keys essentielles
- `studentCorrections` : `{studentId: {ex: {q: {status, pointsObtenus}}}}`
- `evaluationExercices`, `evaluationConfig` (contient `seuilTBM`, `seuilMS`, `seuilMF`)
- `competencyWeights` : poids compétences par exercice
- `studentsList`, `bilanConfig`

## Règles impératives

- **ZÉRO hallucination** : ne jamais inventer de valeurs, réponses ou contenu pédagogique
- **UI** : boutons/chips cliquables, JAMAIS de menu déroulant (select)
- **Français** : toujours avec accents (é, è, ê, ç, à, ù, etc.)
- **Ne changer que ce qui est demandé** : ne pas modifier les sections existantes (extension/, alea/) sans autorisation
- **Tester en local** avant tout déploiement

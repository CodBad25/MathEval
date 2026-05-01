# MathEval — CLAUDE.md

## Déploiement & URL
- **Repo** : `/Users/macbelhaj/MathEval` (git, 130+ commits)
- **URL** : https://matheval.netlify.app
- **Page correction** : `https://matheval.netlify.app/alea/index.html?v=correction`
- **Déploiement** : Netlify auto-deploy depuis `main` (~55s)

## Stack
- **Frontend** : Svelte + Vite (bundle)
- **Scripts d'injection** : vanilla JS (IIFE pattern)
- **PDF** : jsPDF, JSZip, QR codes
- **Cloud** : Supabase (PostgreSQL)
- **Auth** : Supabase (email/password), Google Classroom API
- **Build** : deux versions → `alea/` (MathALÉA) et `extension/` (DNB)

## Architecture — Scripts d'injection
Vanilla JS déférés via `<script defer>` dans `index.html` :
- `auth-global.js` — Authentification Supabase globale
- `tb-partial.js` — Gestion TB- (demi-points), popover commentaires
- `bilan-pdf.js` — Bilans individuels PDF (2 élèves/page A4, ZIP, import JSON)
- `bilan-classe.js` — Bilan classe HTML + PDF (2 pages, stats, histogrammes, compétences, tableau élèves)
- `supabase-sync.js` — Sync cloud cross-device via Supabase, masque bouton Cloud (MutationObserver)
- `export-pronote.js` — Export notes/compétences vers Pronote (séparateur `;`)
- `anonymize.js` — Pseudos mathématiciens (15F+15M), shuffle/restore cartes, `\b` word boundaries, bouton 🎭
- `threshold-slider.js` — Seuils compétences visuels (barre MI/MF/MS/TBM, 3 curseurs, magnétisme ×10)
- **Pattern commun** : IIFE, vérifie `location.search.includes('correction')`, utilise `window.__getExercises()` + `window.__getStudentList()`

## Supabase Config
- **Project ID** : `ehxdbjgvqzpttuafwufh` ⚠️ **mutualisé** avec `calcul-mental-prix` v1 et v2 (math-express). MathEval n'utilise que la table `evaluations` ; les tables `calcul_*` et `packs_actifs` appartiennent à l'autre app.
- **URL** : `https://ehxdbjgvqzpttuafwufh.supabase.co`
- **Table MathEval** : `evaluations` (id, user_id, name, data jsonb, created_at, updated_at) — RLS activée avec policy `auth.uid() = user_id`
- **Sécurité globale (2026-05-01)** : migration `005_security_hardening.sql` (dans repo calcul-mental-prix-v2) a activé RLS sur toutes les tables et remplacé les policies « always true » par des conditions non-tautologiques. Advisor Supabase au vert. Refonte plus restrictive (Edge Functions pour écritures élèves anon) prévue été 2026.
- **Compte** : `mohamed.belhaj@ac-nantes.fr`
- **17 clés localStorage** synchronisées via supabase-sync.js
- **Trigger** : `on_auth_user_created` → ntfy.sh (notification push)

## localStorage Keys Essentielles
- `studentCorrections` : {studentId: {ex: {q: {status, pointsObtenus}}}}
- `evaluationExercices`, `evaluationConfig` (seuilTBM, seuilMS, seuilMF)
- `competencyWeights` — poids compétences par exercice
- `studentsList`, `bilanConfig`
- **Seuils lus par** : `getThresholds()` dans bilan-pdf.js + bilan-classe.js (fallback 90/70/30)

## Fichiers à garder synchronisés
- `alea/assets/*.js` ⟷ `extension/assets/*.js` (doivent être identiques)
- `alea/index.html` ⟷ `extension/index.html` (mêmes scripts)
- **Cache-buster** : `?v=XXXX` dans les `<script>` → incrémenter à chaque modif

## Envoi Bilans via Google Classroom
- **Script** : `/Users/macbelhaj/MathEval/google-apps-script/envoi-classroom.gs`
- **Workflow** : MathEval (ZIP) → Google Drive → Apps Script → Classroom
- **À adapter** : `CONFIG.DRIVE_FOLDER` + `CONFIG.COURSE_NAME` par classe

## Commandes dev
```bash
cd /Users/macbelhaj/MathEval
npm run dev        # Dev server Vite
npm run build      # Build alea/ + extension/
npm run preview    # Preview build
```

## Points clés
- **ZÉRO hallucination** : ne jamais inventer de valeurs numériques, réponses ou énoncés pédagogiques
- CSV Pronote : séparateur `;` auto-détecté, encodage Latin-1/Windows-1252
- Anonymisation : shuffle cartes AVANT remplacement texte, word boundaries `\b`
- Seuils compétences : mécanisme double (localStorage + slider visuel, update via `dispatchEvent`)

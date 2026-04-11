# DNB Blanc n°2 — Handover

> Ce fichier contient **tout ce qu'il faut savoir** pour reprendre le travail
> après corrections des copies par les collègues, sans avoir à relire l'historique
> de la session de développement.

---

## 🎯 Contexte

Projet dérivé de l'application **MathEval** (Correcteur Universel DNB) pour le
**DNB Blanc n°2** du collège Gaston Chaissac (Pouzauges), prévu le 9 avril 2026.

Sujet conçu à partir de 4 exercices MathALÉA + 1 exercice automatismes + 1 exercice
hardcodé, sur un barème de **24 points exercices + 2 points Rédaction/Justifications
= 26 points bruts**, avec une **note effective plafonnée à 20** pour le rattrapage.

---

## 🌐 Accès

| Ressource | URL |
|---|---|
| **App de correction en prod** | https://dnb2-chaissac.vercel.app |
| Alias secondaire | https://dnb-blanc-2-chaissac.vercel.app |
| Repo GitHub | https://github.com/CodBad25/MathEval |
| Branche git | `dnb2-avril-2026` |
| Vercel project | `correcteur-universel` (team `mohamed-belhajs-projects`) |

**⚠️ RÈGLE ABSOLUE : ne jamais merger `dnb2-avril-2026` vers `main`.**
Tout le travail du DNB Blanc 2 est isolé sur cette branche pour ne pas affecter
l'application MathEval principale.

---

## 📂 Fichiers clés

### Sur la branche `dnb2-avril-2026`

| Fichier | Rôle |
|---|---|
| `index.html` | Page d'accueil DNB Blanc 2 (gradient, chips exercices, boutons "Commencer" et "Découvrir") |
| `app.html` | Application de correction (Correcteur Universel) avec attributs `data-tour="..."` |
| `js/app.js` | Logique principale de l'app (modifié : note effective, curseur rédaction, garde-fou, etc.) |
| `js/tour.js` | Tour guidé vanilla JS (14 étapes, mode démo avec candidat 999) |
| `css/main.css` | Styles de l'app (modale validation 2 colonnes, tour, responsive mobile) |
| `dnb-blanc-2.json` | **Config auto-importée** : 6 exercices + 47 descriptions compétences + 34 guides de notation |
| `vercel.json` | Config Vercel (pas de rewrite `/`, sinon conflit avec `index.html`) |
| `deploy-dnb2.sh` | Script bash de redéploiement en 1 commande |
| `sujets/` | Sources LaTeX + PDF du sujet + barème Excel de Mélodie |
| `dnb-2/README.md` | **Ce fichier** |

### Fichiers sources (hors branche, utilisés pour inspiration)

| Fichier | Rôle |
|---|---|
| `~/Dev/DNB-Blanc-25-26/bilans.html` | Page bilans du DNB Blanc 1 (384 lignes) — à porter |
| `~/Dev/DNB-Blanc-25-26/js/modules/bilansManager.js` | Logique bilans (2 665 lignes) — à porter |
| `~/Dev/DNB-Blanc-25-26/css/bilans.css` | Styles bilans — à porter |

---

## 🔧 Commandes utiles

### Déployer une correction
```bash
cd /Users/macbelhaj/Dev/MathEval
./deploy-dnb2.sh "Fix: description du changement"
```
Le script : vérifie qu'on est sur la bonne branche → commit → push → attend le build Vercel → réassigne l'alias `dnb2-chaissac.vercel.app` vers le nouveau deploy.

### Vérifier les deploys Vercel
```bash
vercel ls | grep Preview | head -5
```

### Réassigner l'alias manuellement
```bash
vercel alias set correcteur-universel-<HASH>-mohamed-belhajs-projects.vercel.app dnb2-chaissac.vercel.app
vercel alias set correcteur-universel-<HASH>-mohamed-belhajs-projects.vercel.app dnb-blanc-2-chaissac.vercel.app
```

### Historique des commits de la branche
```bash
git log --oneline main..dnb2-avril-2026
```

### Dev local
```bash
cd /Users/macbelhaj/Dev/MathEval
python3 -m http.server 3333
# → http://localhost:3333/app.html?config=dnb-blanc-2.json
```

---

## 📊 Barème DNB Blanc 2

### Structure

| Exercice | Thème | Points | Questions |
|---|---|---|---|
| 1 | 🎯 Automatismes | 6 | 6 |
| 2 | 🏃 Circuits d'entraînement (PGCD/PPCM) | 3 | 4 |
| 3 | 💻 Programme de calcul | 3 | 5 |
| 4 | 🌿 Jardin botanique (géométrie) | 5 | 7 |
| 5 | 🕶️ Lunettes de soleil (tableur/stats) | 3 | 5 |
| 6 | 📈 Fonctions | 4 | 8 |
| **Total exercices** | | **24** | **35** |
| + | 📝 Rédaction / Justifications | **2** | curseur 0/0,5/1/1,5/2 |
| **Total brut** | | **26** | |
| **Note effective** | `min(20, scoreExos + scoreRedaction)` | **/20** | plafonnement = rattrapage |

### Seuils de maîtrise

Lus depuis `localStorage['evaluationConfig']` (compatible avec le reste de MathEval).
**Défauts** :
- 🟢 **TBM** ≥ 90 %
- 🔵 **MS** ≥ 70 %
- 🟠 **MF** ≥ 30 %
- 🔴 **MI** < 30 %

Le pourcentage est calculé sur la **note effective / 20** (pas sur le brut /26).

### Compétences utilisées

6 compétences DNB : **Chercher, Calculer, Raisonner, Représenter, Communiquer, Modéliser**.

**47 descriptions contextuelles** ont été rédigées (une par couple question × compétence).
Elles sont dans `dnb-blanc-2.json`, champ `description` de chaque compétence de chaque question.
Exemple : *"Décomposer 280 et 350 en produit de facteurs premiers (280 = 2³×5×7 ; 350 = 2×5²×7)"*

### Guides de notation

**34 remarques** extraites du fichier Excel du barème (collègue conceptrice du sujet),
injectées dans `dnb-blanc-2.json` au champ `notationGuide` de chaque question.
Affichage : bloc jaune "📋 Guide de notation" sous l'énoncé.

---

## 💾 Format JSON d'export (ce que les collègues vont envoyer)

Chaque correctrice clique sur **"📤 Exporter JSON"** dans la vue d'ensemble des
candidats, ce qui télécharge un fichier `dnb-correction-YYYY-MM-DD.json` avec
la structure suivante :

```json
{
  "appState": {
    "candidates": [
      { "number": 1, "active": true },
      { "number": 2, "active": true }
    ],
    "activeCandidates": [ ... ],
    "scores": {
      "1": {
        "1": { "q0": { "score": 1, "competences": { "Calculer": 1 } } },
        "2": { "q0": { "score": 0.5, "competences": { "Calculer": 0.25, "Raisonner": 0.25 } } }
      }
    },
    "quickButtonStates": {
      "1": {
        "1": { "q0": "tb" },
        "2": { "q0": "tf" }
      }
    },
    "presentationScores": {
      "1": 1.5,
      "2": 2
    },
    "candidateComments": {
      "1": "Élève sérieux, bonne présentation"
    },
    "validatedCandidates": { "1": { "validated": true, "date": "..." } },
    "baremeConfig": { "totalMax": 24, "exercises": { ... } }
  },
  "exercisesData": {
    "1": { "title": "Exercice 1 : Automatismes", "questions": [ ... ], "totalPoints": 6 },
    "2": { ... }, ...
  },
  "exportDate": "2026-04-15T14:30:00.000Z",
  "version": "1.0"
}
```

### Points critiques sur ce format

- **`presentationScores[n]`** peut être `undefined`/absent si la correctrice
  n'a pas touché au curseur Rédaction **alors qu'elle a quand même validé**.
  Dans la pratique, le garde-fou de l'app empêche normalement ce cas
  (boutons Valider grisés tant que le curseur n'est pas attribué).
- **`scores[n][ex][q].competences`** contient le score par compétence.
  Si une question a été notée via TB (bouton rapide), toutes les compétences
  ont leur max. Si TF, toutes à 0. Si correction par compétences, valeurs libres.
- **`quickButtonStates[n][ex][q]`** vaut `'tb'`, `'tf'`, `'nr'` ou est absent.
  `'nr'` = l'élève n'a pas rendu cette question → distinct de "pas encore corrigé".
- **Plusieurs correctrices corrigent des candidats différents** (partage des copies).
  Chaque JSON contient uniquement les candidats qu'elle a corrigés.

---

## 🛠 Ce qui est déjà fait (à la date du handover)

### Fonctionnalités en prod sur https://dnb2-chaissac.vercel.app

- ✅ Page d'accueil dédiée (gradient violet, 6 chips d'exercices, stats 6/24/35)
- ✅ App de correction avec auto-import via `?config=dnb-blanc-2.json`
- ✅ 6 exercices (au lieu des 5 hardcodés dans l'app d'origine)
- ✅ Modale de validation **2 colonnes** (score + grille NR + tableau compétences)
- ✅ Grille NR visuelle (vert = réussi, orange = partiel, rouge = raté, gris = NR)
- ✅ **Note effective** sur 20 (plafonnée) + **Note réelle** sur 26
- ✅ **Curseur Rédaction/Justifications** (0 à 2, paliers 0,5) avec couleur dynamique
- ✅ Garde-fou : boutons Valider grisés tant que le curseur n'est pas attribué
- ✅ Seuils de maîtrise dynamiques (lus depuis `evaluationConfig`)
- ✅ **47 descriptions contextuelles** des compétences (tooltip au survol)
- ✅ **34 guides de notation** (post-it jaunes par question)
- ✅ **Tour guidé 14 étapes** (7 interactives) avec candidat démo n°999
- ✅ **Bouton Focus** (F) : plein écran + masquage de la top-bar
- ✅ Persistance localStorage (clé `dnb2_correction_state`)
- ✅ Auto-save via `beforeunload` et `visibilitychange`
- ✅ Onglets d'exercices compacts avec tooltip au survol
- ✅ Max-width lifté sur page de correction (toute la largeur écran utilisée)
- ✅ Responsive mobile (iPhone SE 375px testé)

### Commits principaux (branche `dnb2-avril-2026`)

```
97731eca Tour étape 3 : puce de progression en haut à droite (pas à gauche)
c02a91f4 Tour démo : remplir toutes les questions pour éviter le confirm bloquant
dca041d2 Fix race condition mode démo : attendre _configImported
5aaf4270 Fix responsive : bouton Réinitialiser hors viewport sur iPhone
dad9b1ac Tour démo : candidat fictif + 14 étapes dont 7 interactives
75c96594 Tooltips compétences enrichis + garde-fou Rédaction/Justifications
f8fe38f4 Modale validation 2 colonnes, curseur rédaction, note effective/réelle, mode focus
963a9822 Fixes post-import : persistance, hardcode 5→6 exos, modale compactée
7ce5d3b4 DNB Blanc 2 avril 2026 : config auto-importable + fixes onglets
```

---

## 📋 Ce qu'il reste à faire : page Bilans & Résultats

### Objectif
Créer une page `bilans.html` qui permet de :
1. Importer les JSON de correction de toutes les correctrices
2. Consolider les données (chaque JSON contient une partie des candidats)
3. Afficher des stats globales (moyenne, médiane, répartition niveaux de maîtrise, taux de réussite par exercice et par compétence)
4. Générer des bilans PDF individuels pour chaque élève
5. Exporter les résultats en Excel pour Pronote

### Inspiration : DNB Blanc 1

Le projet `~/Dev/DNB-Blanc-25-26/` a une implémentation complète à copier/adapter :

- **`bilans.html`** (384 lignes) : 4 onglets (Import · Vue d'ensemble · Élèves · Génération) + 2 modales
- **`js/modules/bilansManager.js`** (2 665 lignes) : toute la logique
- **`css/bilans.css`** : styles dédiés

### Architecture des 4 onglets (à porter)

1. **📥 Import**
   - Drop/browse d'un ou plusieurs fichiers JSON
   - Import CSV/Excel pour désanonymisation (colonnes `numero,nom,prenom,classe`)
   - Validation du format et affichage d'un récap (nombre de candidats, noms de correctrices)

2. **📊 Vue d'ensemble**
   - Stats : moyenne, médiane, min, max, Q1, Q3, étendue, champion
   - Graphique **donut** : répartition niveaux de maîtrise (TBM/MS/MF/MI)
   - Graphique **barres** : taux de réussite moyen par exercice (1 à 6)
   - Graphique **ligne** : distribution des notes par tranches (0-5, 5-10, 10-15, 15-20)
   - Box plot manuel (sans dépendance)
   - **Recommandations pédagogiques** automatiques (Priorité absolue <50% / À améliorer 50-70% / Points forts ≥70%)

3. **👥 Élèves**
   - Tableau triable : N° · Nom · Prénom · Classe · Note /20 · Niveau
   - Recherche par nom/numéro
   - Clic sur ligne → modale avec bilan détaillé

4. **📄 Génération**
   - **Bilans individuels PDF** : un par élève, demi-page A4 (2/page)
     - Entête coloré (note en grand, nom, classe)
     - Scores par exercice en ligne
     - Barres de progression par compétence
     - Commentaire global (si présent)
     - **Grille NR** (carrés par question colorés par état)
   - **Bilans groupés** : paires automatiques, 2 par page A4
   - **Récapitulatif classe PDF** : stats + graphiques exportés en base64 + tableau par classe
   - **Export Excel** : N°, Nom, Prénom, Classe, Note /20, Niveau + section stats

### Adaptations nécessaires par rapport au DNB Blanc 1

| Point | DNB Blanc 1 | DNB Blanc 2 |
|---|---|---|
| Nombre d'exercices | 5 | **6** |
| Questions totales | 16 | **35** |
| Barème max | 20 | **24 + 2 = 26** (note plafonnée à 20) |
| Calcul note /20 | `somme scores` | `min(20, scoreExos + scoreRedaction)` |
| Seuils maîtrise | `localStorage['dnb_maitrise_seuils']` | **`localStorage['evaluationConfig']`** (clés `seuilTBM`, `seuilMS`, `seuilMF`) |
| Défauts seuils | TBM≥15, MS≥10, MF≥5 | **TBM≥90%, MS≥70%, MF≥30%** |
| Champ rédaction | absent | **`presentationScores[n]`** à inclure dans le score total |
| Identifiant config localStorage | `dnb_bb1_config` | à choisir (ex: `dnb_bb2_config`) |
| Compétences | mêmes 6 | mêmes 6 |
| Classes CSS spotlight | jaune | violet/bleu (identité MathEval) |

### Dépendances externes à charger (CDN)

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/html2pdf.js@0.10.1/dist/html2pdf.bundle.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/pdfmake@0.2.7/build/pdfmake.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/pdfmake@0.2.7/build/vfs_fonts.js"></script>
<script src="https://cdn.jsdelivr.net/npm/xlsx@0.20.1/dist/xlsx.full.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js"></script>
```

### Stratégie de port conseillée

**Option MVP** (rapide, ~30 min) :
1. Copier `bilans.html` minimal avec juste l'onglet Import + Tableau Élèves
2. Adapter le parsing JSON pour `presentationScores`
3. Ajouter l'export Excel minimal (juste N° + Note /20)
4. Tester avec **1-2 vrais JSON** des collègues
5. Incrémenter depuis là (graphiques, PDF, etc.) selon les besoins réels

**Option Full** (1h30-2h) :
1. Copier intégralement `bilans.html` + `bilansManager.js` + `bilans.css`
2. Adapter les 20-30 endroits qui concernent le barème et les calculs
3. Tester avec vrais JSON
4. Debugger les edge cases

**Recommandation** : Option MVP d'abord. Les vraies données révéleront les
vraies priorités.

---

## 🐛 Bugs connus / fixes appliqués pendant la session

| Bug | Fix |
|---|---|
| Hardcode 5 exercices dans toute l'app | Remplacé par `Object.keys(exercisesData).length` dans ~6 endroits (`js/app.js`) |
| `saveData/loadData` étaient des no-ops | Implémentés avec localStorage `dnb2_correction_state`, + beforeunload + visibilitychange |
| Array `exercisesInfo` hardcodé à 5 badges | Remplacé par génération dynamique depuis `exercisesData.title` |
| Popup natif "Candidat terminé" moche | Remplacé par ouverture directe de la modale stylée |
| Modale guidage étape 5 apparaissait en auto-import | Désactivée via `workflowState.disableGuidance + modalShown` |
| `startCorrectionFromOverview` n'appelait pas `renderExerciseTabs` | Ajouté |
| Max-width 1600px coupait l'espace sur grands écrans | `:has(#mainPage.active)` → `max-width: none` |
| Rewrite `/` Vercel ne passait pas les query strings | Supprimé + remis `index.html` |
| Tour guidé : listener DOMContentLoaded jamais appelé | Fix via `document.readyState === 'loading'` |
| Tour : overlay bloquait les clics | `pointer-events: none` sur overlay, `auto` sur tooltip |
| Mode démo : candidat démo effacé par auto-import | Fix via attente de `appState._configImported === true` |
| Mode démo : confirm "questions non traitées" | Remplissage 100% des questions du candidat 999 |
| Responsive mobile : bouton Réinitialiser hors viewport | `flex-wrap: wrap` sur `.exercise-header` |
| Tooltip étape 3 disait "en haut à gauche" | Corrigé en "en haut à droite" |

---

## 📞 Reprendre le travail après corrections

### Checklist à faire quand tes collègues ont fini

1. **Récupérer tous les JSON** envoyés par les correctrices
   - Les mettre dans un dossier temporaire, ex: `/tmp/dnb2-corrections/`
2. **Vérifier leur intégrité** :
   ```bash
   for f in /tmp/dnb2-corrections/*.json; do
     python3 -c "import json; d=json.load(open('$f')); print('$f:', len(d.get('appState',{}).get('candidates',[])), 'candidats')"
   done
   ```
3. **Préparer la liste nominative des élèves** (CSV/Excel avec colonnes `numero,nom,prenom,classe`)
4. **Ouvrir une nouvelle session Claude Code sur cette branche** et lui donner ce README :
   ```
   Lis /Users/macbelhaj/Dev/MathEval/dnb-2/README.md
   Puis on se lance sur la création de la page bilans.html.
   Les JSON des correctrices sont dans /tmp/dnb2-corrections/
   La liste nominative est à XXX
   ```
5. **Démarrer en mode Sonnet 4.6** plutôt qu'Opus pour économiser ($$$)
6. **`/clear` régulièrement** entre les phases (porter le code du DNB1 → adapter → tester)
7. **Limiter les appels MCP browser** : préférer `evaluate_script` ciblé à `take_snapshot` brut

### Préparation du dev local

```bash
cd /Users/macbelhaj/Dev/MathEval
git checkout dnb2-avril-2026
git pull origin dnb2-avril-2026
python3 -m http.server 3333
```

### Test de bout en bout

1. Ouvrir http://localhost:3333/bilans.html *(quand le fichier sera créé)*
2. Importer 1-2 JSON de test
3. Vérifier les calculs sur 1-2 candidats manuellement
4. Comparer avec la note affichée dans l'app de correction
5. Si OK : pousser vers Vercel via `./deploy-dnb2.sh`

---

## 💰 Coût et environnement de travail

### Leçons apprises sur l'économie de tokens

- **Opus 4.6 + contexte 1M** peut facilement atteindre 200-300 $/session longue
- Les outils **MCP browser** (snapshots, console messages, screenshots) consomment énormément
- **Préférer Sonnet 4.6** pour le code, garder Opus pour l'architecture
- **`/clear`** après chaque phase majeure pour repartir sur contexte frais
- Un **README comme celui-ci** évite de tout relire en contexte à chaque nouvelle session

### Estimation pour la suite

La page bilans complète sera probablement 2-4 h de développement. Avec **Sonnet 4.6**,
ça devrait coûter **~20-40 $** au lieu de 200+ en Opus.

---

## 📝 Notes diverses

- **Règle stricte observée toute la session** : jamais de mention de la
  conceptrice du sujet (collègue) dans le code ou l'interface visible.
- **`CLAUDE.md` racine projet** (`/Users/macbelhaj/Dev/MathEval/CLAUDE.md`)
  contient les règles générales MathEval.
- **`~/CLAUDE.md`** contient les préférences de communication globales.
- Les **descriptions contextuelles des compétences** ont été envoyées par mail
  aux correctrices pour référence hors outil (voir session de handover, copie
  en presse-papier générée).

---

*Document généré le 11 avril 2026 — fin de journée de développement intensif.*
*Dernière URL prod vérifiée : `https://dnb2-chaissac.vercel.app` (build `om24uqmsc`, ✅ Ready).*

# Changelog - Correcteur Universel DNB

## 2025-01-10 - Correction Déploiement Netlify

### Correction de bugs
- **Problème icônes Boxicons sur Netlify** : Les icônes Boxicons s'affichaient comme des carrés (□) après déploiement sur Netlify
  - **Cause** : Le fichier CSS Boxicons contenait des chemins avec préfixe `/MathEval/` qui fonctionnaient en sous-dossier mais pas à la racine
  - **Solution** : Ajout d'un fichier `_redirects` pour Netlify qui redirige `/MathEval/*` vers `/:splat` (200)
  - Les fonts Boxicons (.eot, .woff, .woff2, .ttf, .svg) se chargent maintenant correctement

### Fichiers modifiés
- `_redirects` : Nouveau fichier de redirection Netlify pour compatibilité des chemins assets

### Commits
- `20150a8` - Fix: Netlify redirects for Boxicons paths

---

## 2025-01-09 - Amélioration Parser LaTeX et Exercices Scratch

### Fonctionnalités ajoutées
- **Parser multi-blocs enumerate** : Support des exercices avec plusieurs sections `\begin{enumerate}` séparées
- **Support `enumerate[start=N]`** : Continue la numérotation depuis un nombre donné
- **Protection formules mathématiques** : Les formules LaTeX (`$...$`, `$$...$$`, `\(...\)`, `\[...\]`) sont protégées pendant les conversions de texte
- **Guillemets français** : Conversion de `\og` et `\fg` (avec ou sans accolades) en `«` et `»`

### Corrections de bugs
- **Nettoyage commentaires LaTeX** : Les commentaires `%` sont maintenant supprimés AVANT conversion de `\%` en `%`, évitant la suppression du texte après les pourcentages
- **Erreur mathématique** : Correction de `60/100` en `40/100` dans `dnb_2025_06_ameriquenord_5_cor.tex` ligne 203
- **Bug `\,` dans formules** : `\,` (espace fine) n'est plus converti en espace dans les formules mathématiques

### Améliorations UI
- **Blocs Scratch réduits** :
  - Largeur réduite à 50%
  - Hauteur limitée à 180px
  - Scale à 0.6 (60% de la taille)
- **Blocs Scratch masqués dans corrections** : Les graphiques Scratch ne s'affichent plus dans les réponses attendues (gain d'espace)
- **Scroll automatique corrections** : Max-height 400px avec overflow-y auto pour les divs de correction

### Exercices spéciaux traités
- **dnb_2025_06_ameriquenord_5** : Exercice Scratch avec 7 questions (dont 6.a et 6.b)
  - 2 blocs enumerate séparés (questions 1-2, puis 3-6)
  - Enumerate imbriqué pour sous-questions 6.a et 6.b
  - Continuation numérotation avec `[start=3]`

### Fichiers modifiés
- `js/app.js` : Fonctions `extractAllEnumerateBlocks()`, `extractTopLevelItems()`, `extractNestedEnumerate()`, `latexToHtml()` avec protection formules
- `css/main.css` : Styles `.scratchblocks` et masquage dans corrections
- `dnb/2025/tex/dnb_2025_06_ameriquenord_5_cor.tex` : Correction erreur mathématique

### Commits
- `3e3e6a9` - Fix: Amélioration parser LaTeX et exercices multi-blocs
- `f265c84` - Fix: Réduction importante des blocs Scratch pour correction
- `9b9bea4` - Fix: Masquer blocs Scratch dans les corrections

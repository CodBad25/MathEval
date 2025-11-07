# Correcteur Universel

Application professionnelle de correction pour les évaluations de mathématiques.

## 🎯 Fonctionnalités

- **Sélection d'exercices DNB** : 764 exercices depuis 2013
- **Automatismes** : Sélection des questions d'automatismes (Exercice 1)
- **Configuration du barème** : Attribution des points et compétences
- **Correction par compétences** : Système de compétences mathématiques
- **Export/Import JSON** : Sauvegarde et reprise de corrections
- **Statistiques** : Analyse des résultats

## 🚀 Démarrage rapide

### 1. Lancer le serveur

```bash
cd /Users/macbelhaj/correcteur-universel
python3 server.py
```

### 2. Ouvrir l'application

Ouvrir dans votre navigateur : **http://localhost:8000/**

⚠️ **IMPORTANT** : Ne PAS ouvrir directement les fichiers HTML (file://), toujours passer par le serveur HTTP.

## 📁 Structure du projet

```
correcteur-universel/
├── index.html              # Page d'accueil moderne
├── app.html                # Application principale
├── server.py               # Serveur HTTP Python
├── css/
│   └── main.css           # Styles de l'application
├── js/
│   ├── app.js             # Logique principale
│   ├── workflow.js        # Gestion du workflow
│   ├── state/
│   │   └── appState.js    # État de l'application
│   ├── data/
│   │   ├── dictionnaireDNB.js
│   │   └── dictionnaireAutomatismes.js
│   └── modules/
│       ├── mathaleaUtils.js
│       ├── generateursAutomatismes.js
│       └── importJSON.js
├── images/                 # Logos et images
└── dnb/ → symlink vers mathalea/mathalea/public/static/dnb/
```

## 🔧 Configuration

### Port du serveur

Le serveur écoute par défaut sur le port **8000**. Pour changer le port, modifiez la ligne suivante dans `server.py` :

```python
PORT = 8000  # Changer cette valeur
```

### Cache

Tous les fichiers JS et CSS utilisent le cache-busting avec `?v=20251105001`. Pour forcer le rechargement après modifications, changez ce numéro de version.

## 📝 Sources d'exercices

### ✅ DNB (Disponible)
- 764 exercices DNB depuis 2013
- Automatismes inclus
- Filtrage par année, lieu, thème
- Prévisualisation des exercices

### 🚧 MathALÉA (En développement)
- Import par URL MathALÉA
- Import par UUID d'exercice
- Génération automatique du barème

### 📅 Import PDF/DOCX (Prochainement)
- Upload de fichiers PDF et DOCX
- Extraction automatique des questions
- Configuration manuelle du barème

## 🛠️ Développement

### Fichiers principaux à modifier

- **`js/app.js`** : Logique de l'application (291 KB)
- **`js/workflow.js`** : Gestion du workflow multi-étapes
- **`css/main.css`** : Styles de l'interface

### Ajouter le cache-busting

Après chaque modification, changez le numéro de version dans `app.html` :

```html
<script src="js/app.js?v=NOUVEAU_NUMERO"></script>
```

## ⚠️ Dépannage

### Les exercices ne se chargent pas

1. Vérifiez que le serveur Python tourne (`python3 server.py`)
2. Vérifiez que vous accédez via `http://localhost:8000/` et pas `file://`
3. Videz le cache du navigateur (Cmd+Shift+R)

### Les points sont à 0

1. Ouvrez la console du navigateur (F12)
2. Recherchez les logs `📊 Initialisation ExX: Y questions trouvées`
3. Si Y = 0, le parsing des exercices a échoué (vérifier les erreurs de chargement des fichiers .tex)

### Erreurs CORS

Si vous voyez des erreurs CORS, c'est que vous n'accédez pas via le serveur HTTP. Utilisez toujours `http://localhost:8000/`.

## 📜 Version

**Version** : 1.0.0
**Date** : 5 novembre 2025
**Basé sur** : DNB-correction-pro V2

## 📄 Licence

Application développée pour l'APMEP et MathALÉA - Coopmaths.

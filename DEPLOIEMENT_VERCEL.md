# 🚀 Guide de déploiement sur Vercel

Ce guide explique comment déployer l'application **Correcteur Universel** sur Vercel avec un repo GitHub privé.

## ✅ Ce qui a été préparé

1. **`vercel.json`** : Configuration Vercel (headers CORS, rewrites)
2. **`api/mathalea.py`** : Serverless function Python pour le proxy MathALÉA
3. **Fichiers statiques** : HTML/CSS/JS déjà prêts

## 📋 Étapes de déploiement

### 1️⃣ Rendre le repo GitHub privé (RECOMMANDÉ)

**Sur GitHub :**
1. Allez sur https://github.com/CodBad25/MathEval
2. Cliquez sur **Settings** (en haut à droite)
3. Descendez jusqu'à **Danger Zone**
4. Cliquez sur **Change visibility** → **Make private**
5. Confirmez

⚠️ **Important** : Même avec un repo privé, l'application déployée sera publique sur Vercel !

### 2️⃣ Créer un compte Vercel

1. Allez sur https://vercel.com
2. Cliquez sur **Sign Up**
3. Choisissez **Continue with GitHub**
4. Autorisez Vercel à accéder à votre compte GitHub

### 3️⃣ Déployer le projet

**Sur Vercel :**
1. Cliquez sur **Add New...** → **Project**
2. Trouvez votre repo **CodBad25/MathEval** dans la liste
3. Cliquez sur **Import**
4. **Configuration** :
   - **Framework Preset** : Other
   - **Build Command** : (laisser vide)
   - **Output Directory** : (laisser vide)
   - **Install Command** : (laisser vide)
5. Cliquez sur **Deploy**

### 4️⃣ Attendre le déploiement

Vercel va :
- Installer les dépendances
- Configurer les serverless functions Python
- Déployer les fichiers statiques
- Générer une URL publique

⏱️ Cela prend environ 1-2 minutes.

### 5️⃣ Récupérer l'URL de l'application

Une fois le déploiement terminé :
- Vercel affiche l'URL : **https://votre-app.vercel.app**
- Cliquez sur **Visit** pour tester l'application

## 🎯 Résultat final

✅ **Code source** : Privé sur GitHub (CodBad25/MathEval)
✅ **Application** : Publique sur Vercel (https://votre-app.vercel.app)
✅ **Proxy MathALÉA** : Fonctionne via `/api/mathalea/:uuid`

## 🔄 Mises à jour automatiques

Chaque fois que vous **pushez** sur GitHub :
- Vercel détecte automatiquement les changements
- Lance un nouveau déploiement
- Met à jour l'application en ligne

## 🛠️ Configuration avancée

### Variables d'environnement (optionnel)

Si vous avez besoin de clés API ou secrets :
1. Sur Vercel : **Settings** → **Environment Variables**
2. Ajoutez vos variables (ex: `API_KEY=xxxxx`)
3. Redéployez le projet

### Domaine personnalisé (optionnel)

Pour utiliser votre propre nom de domaine :
1. Sur Vercel : **Settings** → **Domains**
2. Ajoutez votre domaine (ex: `correcteur.monsite.com`)
3. Suivez les instructions DNS

## 📊 Limites gratuites Vercel

- **100 GB** de bande passante / mois
- **100** déploiements / jour
- **Serverless Functions** : 100h d'exécution / mois
- **Projets illimités**

Largement suffisant pour une application personnelle ou éducative !

## ❓ Dépannage

### Le proxy MathALÉA ne fonctionne pas
- Vérifiez que l'URL est bien `/api/mathalea/:uuid`
- Regardez les logs Vercel : **Deployments** → Cliquez sur le dernier → **Functions**

### L'application affiche une erreur 404
- Vérifiez que `index.html` est bien à la racine du projet
- Vérifiez le `vercel.json`

### Les changements ne sont pas visibles
- Attendez 1-2 minutes après le push
- Videz le cache du navigateur (Ctrl+Shift+R)

## 🎉 Vous êtes prêt !

Votre application est maintenant :
- 🔒 **Code protégé** (repo privé)
- 🌍 **Accessible publiquement** (via l'URL Vercel)
- 🔄 **Auto-déployée** (à chaque push)

Partagez simplement l'URL Vercel avec vos utilisateurs !

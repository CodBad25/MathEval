# Analyse RGPD - MathEval

**Date:** 2025-01-10

## ✅ RÉSULTAT: Application conforme RGPD

### Données collectées

**AUCUNE donnée personnelle d'élèves collectée:**
- ✅ Seuls des **numéros anonymes** de candidats (150, 151, 152...)
- ✅ Aucun nom, prénom, email, ou autre identifiant personnel
- ✅ Import CSV limité à la colonne `numero` uniquement

### Stockage des données

**Stockage LOCAL uniquement (localStorage du navigateur):**
- Numéros anonymes de candidats
- Préférences de barème (mode A/B/C)
- Cache d'exercices
- État de correction en cours

**Aucune base de données externe ou serveur de stockage**

### Transferts de données

**Aucun envoi de données utilisateur vers des serveurs externes:**
- ❌ Pas de Google Analytics
- ❌ Pas de cookies tiers
- ❌ Pas d'envoi de données de correction
- ✅ Uniquement téléchargement d'exercices publics depuis coopmaths.fr
- ✅ API locale MathALÉA (localhost) pour développement uniquement

## 📊 Impact RGPD

| Critère | État | Détails |
|---------|------|---------|
| Données personnelles | ✅ NON | Numéros anonymes uniquement |
| Stockage externe | ✅ NON | localStorage (navigateur) |
| Cookies | ✅ NON | Pas de bandeau cookies nécessaire |
| Tracking | ✅ NON | Aucun outil d'analytics |
| Politique confidentialité | ⚠️ OPTIONNEL | Recommandé mais pas obligatoire |
| Déclaration CNIL | ✅ NON | Pas nécessaire |

## 🌍 Hébergement

### Actuel: Netlify (USA)
- Entreprise américaine (San Francisco)
- Serveurs principalement aux USA
- Mais: Netlify est certifié RGPD-compliant
  - Privacy Shield / Data Privacy Framework
  - Clauses contractuelles types (SCC)
  - DPA (Data Processing Agreement) disponible

### Impact pour MathEval
✅ **Aucun problème RGPD** car:
- Aucune donnée personnelle transférée vers Netlify
- Application purement côté client (tout dans le navigateur)
- Netlify sert uniquement des fichiers statiques (HTML/CSS/JS)

### Alternatives européennes (pour le futur)

**1. Cloudflare Pages** ⭐ (Recommandé)
- Serveurs en Europe disponibles
- Gratuit et illimité
- Déploiement GitHub automatique

**2. Vercel (région EU)**
- Peut forcer déploiement en Europe
- Gratuit pour projets personnels

**3. Scaleway (France)**
- 100% français, serveurs à Paris
- Gratuit jusqu'à 75GB/mois
- Conforme RGPD par défaut

**4. OVH (France)**
- Serveurs à Roubaix/Strasbourg
- Quelques euros/mois

**5. Infomaniak (Suisse)**
- Serveurs en Suisse
- Très respectueux de la vie privée

## 📝 Recommandations

### Obligatoire
- ✅ Rien! L'application est conforme en l'état

### Optionnel (bonnes pratiques)
- 📄 Ajouter une mention simple sur la page d'accueil:
  > "Cette application ne collecte aucune donnée personnelle. Toutes les corrections sont effectuées localement dans votre navigateur."

### Si évolution future (stockage élèves)
Si vous décidez plus tard de stocker des noms/prénoms d'élèves:
- ⚠️ Ajouter une politique de confidentialité
- ⚠️ Informer sur la finalité (correction de devoirs)
- ⚠️ Documenter la durée de conservation
- ⚠️ Mentionner l'hébergement et les transferts

## 🔒 Sécurité

**Bonnes pratiques actuelles:**
- ✅ HTTPS obligatoire (Netlify)
- ✅ Pas de stockage serveur
- ✅ Données volatiles (localStorage)
- ✅ Pas d'authentification = pas de risque de fuite credentials

---

**Conclusion:** MathEval est une application respectueuse de la vie privée, conforme RGPD sans nécessiter de démarches administratives particulières.

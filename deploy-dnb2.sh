#!/bin/bash
# ============================================================================
#  Script de redéploiement du DNB Blanc 2 sur Vercel
# ============================================================================
#
#  Usage :
#    ./deploy-dnb2.sh           → commit ce qui est staged/modifié + push + alias
#    ./deploy-dnb2.sh "message" → idem avec un message de commit custom
#
#  URL stable partagée avec les collègues :
#    https://dnb-blanc-2-chaissac.vercel.app/app.html?config=dnb-blanc-2.json
#
#  Ce que fait ce script :
#    1. Vérifie qu'on est bien sur la branche dnb2-avril-2026
#    2. Commit les changements locaux (si tu en as)
#    3. Push sur GitHub → Vercel déclenche un build automatique
#    4. Attend que le build soit prêt
#    5. Fait pointer l'alias dnb-blanc-2-chaissac vers le nouveau deploy
#
# ============================================================================

set -e

BRANCH="dnb2-avril-2026"
ALIAS="dnb-blanc-2-chaissac.vercel.app"
SHARED_URL="https://${ALIAS}/app.html?config=dnb-blanc-2.json"

# Couleurs pour lisibilité
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}🚀 Déploiement DNB Blanc 2 → ${ALIAS}${NC}\n"

# 1. Vérifier la branche
current_branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$current_branch" != "$BRANCH" ]; then
    echo -e "${RED}❌ Tu n'es pas sur la branche ${BRANCH} (actuellement : ${current_branch})${NC}"
    echo -e "   ${YELLOW}Lance :${NC} git checkout ${BRANCH}"
    exit 1
fi
echo -e "${GREEN}✓${NC} Branche : ${BRANCH}"

# 2. Commit si nécessaire
if ! git diff --quiet || ! git diff --cached --quiet; then
    MSG="${1:-Mise à jour DNB Blanc 2}"
    echo -e "${YELLOW}📝 Modifications détectées, commit en cours...${NC}"
    git add -A
    git commit -m "$MSG"
    echo -e "${GREEN}✓${NC} Commit créé : ${MSG}"
else
    echo -e "${GREEN}✓${NC} Rien à commit (tree propre)"
fi

# 3. Push
echo -e "\n${YELLOW}📤 Push vers GitHub...${NC}"
git push origin "$BRANCH"
echo -e "${GREEN}✓${NC} Push effectué"

# 4. Attendre le build Vercel (max 2 min)
echo -e "\n${YELLOW}⏳ Attente du nouveau build Vercel (max 2 min)...${NC}"
NEW_DEPLOY=""
for i in $(seq 1 24); do
    sleep 5
    LATEST=$(vercel ls 2>/dev/null | grep -m 1 "Preview" | awk '{print $4}' | sed 's/https:\/\///')
    if [ -n "$LATEST" ]; then
        STATUS=$(vercel ls 2>/dev/null | grep -m 1 "$LATEST" | grep -o "● Ready\|● Error\|● Building\|● Queued")
        if [ "$STATUS" = "● Ready" ]; then
            NEW_DEPLOY="$LATEST"
            echo -e "${GREEN}✓${NC} Build prêt : ${NEW_DEPLOY}"
            break
        else
            echo -e "   ${STATUS}..."
        fi
    fi
done

if [ -z "$NEW_DEPLOY" ]; then
    echo -e "${RED}⚠️  Build pas encore prêt après 2 min. Vérifier avec : vercel ls${NC}"
    exit 1
fi

# 5. Mettre à jour l'alias
echo -e "\n${YELLOW}🔗 Mise à jour de l'alias ${ALIAS}...${NC}"
vercel alias set "$NEW_DEPLOY" "$ALIAS" > /dev/null
echo -e "${GREEN}✓${NC} Alias mis à jour"

# 6. Vérification finale
echo -e "\n${YELLOW}🔍 Vérification de l'URL publique...${NC}"
CODE=$(curl -s -o /dev/null -w "%{http_code}" "$SHARED_URL")
if [ "$CODE" = "200" ]; then
    echo -e "${GREEN}✓${NC} URL répond (HTTP ${CODE})"
    echo -e "\n${GREEN}════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}✅ Déploiement terminé !${NC}"
    echo -e "${GREEN}════════════════════════════════════════════════════${NC}"
    echo -e "\n📎 Lien à partager avec les collègues :"
    echo -e "${BLUE}${SHARED_URL}${NC}\n"
else
    echo -e "${RED}⚠️  L'URL répond HTTP ${CODE}, vérifier manuellement : ${SHARED_URL}${NC}"
fi

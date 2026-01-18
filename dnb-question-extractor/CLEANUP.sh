#!/bin/bash
# Script de nettoyage - SUPPRIME tout le travail de parsing DNB
# Exécutez uniquement si vous voulez tout annuler

echo "⚠️  ATTENTION: Ce script va supprimer TOUT le travail de parsing DNB"
echo ""
echo "Cela va supprimer:"
echo "  - dnb-question-extractor/ (77 MB)"
echo "  - dnb/2025/tex_versions/ (1.5 MB)"
echo "  - dnb/2025/tex_config.json"
echo ""
echo "Vos fichiers originaux seront PRÉSERVÉS:"
echo "  - dnb/2025/tex/*.tex (intacts)"
echo "  - app.html (intact)"
echo "  - pdfGenerator.js (intact)"
echo ""
read -p "Êtes-vous sûr de vouloir continuer ? (oui/non) " confirm

if [ "$confirm" = "oui" ]; then
    echo ""
    echo "🗑️  Suppression en cours..."

    # Supprimer le dossier de travail
    rm -rf /Users/macbelhaj/correcteur-universel/dnb-question-extractor/
    echo "✅ dnb-question-extractor/ supprimé"

    # Supprimer les versions
    rm -rf /Users/macbelhaj/correcteur-universel/dnb/2025/tex_versions/
    echo "✅ tex_versions/ supprimé"

    # Supprimer la config
    rm -f /Users/macbelhaj/correcteur-universel/dnb/2025/tex_config.json
    echo "✅ tex_config.json supprimé"

    echo ""
    echo "🎉 Nettoyage terminé ! Tout est revenu à l'état initial."
else
    echo ""
    echo "❌ Nettoyage annulé."
fi

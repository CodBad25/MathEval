#!/bin/bash
# Script pour compiler les fichiers .tex enrichis en PNG

TEX_DIR="/Users/macbelhaj/correcteur-universel/dnb-question-extractor/output/tex_avec_images"
OUTPUT_DIR="/Users/macbelhaj/correcteur-universel/dnb-question-extractor/output/png_compiled"

echo "╔════════════════════════════════════════════════════════╗"
echo "║       COMPILATION TEX ENRICHIS → PNG                  ║"
echo "╚════════════════════════════════════════════════════════╝"
echo ""

# Vérifier LaTeX
if ! command -v pdflatex &> /dev/null; then
    echo "❌ pdflatex non trouvé. Installez LaTeX d'abord."
    exit 1
fi

# Créer le dossier de sortie
mkdir -p "$OUTPUT_DIR"

# Compiler chaque fichier .tex
for tex_file in "$TEX_DIR"/*.tex; do
    filename=$(basename "$tex_file" .tex)
    echo "📝 Compilation de $filename..."

    # Aller dans le répertoire du .tex (pour que les chemins relatifs fonctionnent)
    cd "$TEX_DIR"

    # Compiler en PDF
    pdflatex -interaction=nonstopmode "$tex_file" > /dev/null 2>&1

    if [ -f "$filename.pdf" ]; then
        echo "   ✅ PDF généré"

        # Convertir PDF en PNG (si ImageMagick est installé)
        if command -v convert &> /dev/null; then
            convert -density 150 "$filename.pdf" -quality 90 "$OUTPUT_DIR/${filename}.png"
            echo "   ✅ PNG généré"
        else
            # Alternative : utiliser sips (Mac natif)
            echo "   ⚠️ ImageMagick non trouvé, utilisez 'convert' ou copiez le PDF"
            cp "$filename.pdf" "$OUTPUT_DIR/"
        fi

        # Nettoyage
        rm -f "$filename.aux" "$filename.log" "$filename.pdf"
    else
        echo "   ❌ Erreur de compilation"
    fi
done

echo ""
echo "✅ Compilation terminée !"
echo "📁 Fichiers générés dans: $OUTPUT_DIR"

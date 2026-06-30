#!/usr/bin/env python3
"""
Serveur HTTP simple pour l'application Correcteur DNB Pro
Lance avec: python3 server.py
"""

import http.server
import socketserver
import os
import urllib.request
import urllib.parse
import json
import re

PORT = int(os.environ.get("PORT", 8000))
MATHALEA_LOCAL = "http://localhost:5173"
MATHALEA_DISTANT = "https://coopmaths.fr"

os.chdir(os.path.dirname(os.path.abspath(__file__)))

class ProxyHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Désactiver le cache pour forcer le rechargement des fichiers
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Expires', '0')
        super().end_headers()

    def do_GET(self):
        # Proxy pour les exercices MathALÉA
        if self.path.startswith('/api/mathalea/'):
            self.handle_mathalea_proxy()
            return
        # Servir les fichiers statiques normalement
        super().do_GET()
    
    def handle_mathalea_proxy(self):
        """Proxy vers MathALÉA pour récupérer les exercices"""
        try:
            # Extraire l'UUID depuis le path
            # Ex: /api/mathalea/4dadb
            uuid = self.path.replace('/api/mathalea/', '').split('?')[0]
            
            if not uuid:
                self.send_error(400, "UUID manquant")
                return
            
            print(f"🔍 Proxy: Récupération exercice UUID={uuid}")
            
            # Essayer MathALÉA local d'abord
            exercice_data = None
            
            # Essai 1: MathALÉA local
            try:
                local_url = f"{MATHALEA_LOCAL}/alea/?uuid={uuid}"
                print(f"  📡 Tentative locale: {local_url}")
                
                with urllib.request.urlopen(local_url, timeout=10) as response:
                    html = response.read().decode('utf-8')
                    
                    # Chercher exerciceData dans plusieurs formats possibles
                    patterns = [
                        r'exerciceData\s*[:=]\s*({[\s\S]*?});',
                        r'exerciceData\s*=\s*({[\s\S]*?});',
                        r'const\s+exerciceData\s*=\s*({[\s\S]*?});',
                        r'let\s+exerciceData\s*=\s*({[\s\S]*?});',
                        r'var\s+exerciceData\s*=\s*({[\s\S]*?});',
                    ]
                    
                    for pattern in patterns:
                        match = re.search(pattern, html)
                        if match:
                            try:
                                exercice_data = json.loads(match.group(1))
                                print(f"  ✅ Données trouvées dans MathALÉA local (pattern: {pattern[:30]})")
                                break
                            except json.JSONDecodeError:
                                continue
                    
                    # Si pas trouvé, essayer de chercher dans les balises <script>
                    if not exercice_data:
                        script_matches = re.findall(r'<script[^>]*>([\s\S]*?)</script>', html)
                        for script_content in script_matches:
                            for pattern in patterns:
                                match = re.search(pattern, script_content)
                                if match:
                                    try:
                                        exercice_data = json.loads(match.group(1))
                                        print(f"  ✅ Données trouvées dans un script")
                                        break
                                    except json.JSONDecodeError:
                                        continue
                            if exercice_data:
                                break
                                
            except Exception as e:
                print(f"  ⚠️ MathALÉA local indisponible: {e}")
            
            # Essai 2: MathALÉA distant
            if not exercice_data:
                try:
                    distant_url = f"{MATHALEA_DISTANT}/alea/?uuid={uuid}"
                    print(f"  📡 Tentative distante: {distant_url}")
                    
                    with urllib.request.urlopen(distant_url, timeout=10) as response:
                        html = response.read().decode('utf-8')
                        
                        match = re.search(r'exerciceData\s*[:=]\s*({[\s\S]*?});', html)
                        if match:
                            exercice_data = json.loads(match.group(1))
                            print(f"  ✅ Données trouvées dans MathALÉA distant")
                except Exception as e:
                    print(f"  ⚠️ MathALÉA distant indisponible: {e}")
            
            if exercice_data:
                # Envoyer les données en JSON
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Access-Control-Allow-Methods', 'GET')
                self.end_headers()
                self.wfile.write(json.dumps(exercice_data, ensure_ascii=False).encode('utf-8'))
            else:
                self.send_error(404, "Exercice non trouvé")
                
        except Exception as e:
            print(f"  ❌ Erreur proxy: {e}")
            self.send_error(500, f"Erreur serveur: {str(e)}")
    
    def end_headers(self):
        # Ajouter CORS headers pour toutes les réponses
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_OPTIONS(self):
        # Gérer les requêtes OPTIONS pour CORS
        self.send_response(200)
        self.end_headers()

Handler = ProxyHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"🚀 Serveur démarré sur http://localhost:{PORT}")
    print(f"📂 Dossier: {os.getcwd()}")
    print(f"🌐 Ouvrir: http://localhost:{PORT}/index.html")
    print(f"🔗 Proxy MathALÉA: http://localhost:{PORT}/api/mathalea/<UUID>")
    print("\n💡 Appuyez sur Ctrl+C pour arrêter\n")
    httpd.serve_forever()




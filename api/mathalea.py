"""
Serverless function Vercel pour proxy MathALÉA
"""
from http.server import BaseHTTPRequestHandler
import urllib.request
import urllib.parse
import json
import re

MATHALEA_LOCAL = "http://localhost:5173"
MATHALEA_DISTANT = "https://coopmaths.fr"


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        """Proxy vers MathALÉA pour récupérer les exercices"""
        try:
            # Extraire l'UUID depuis le path
            # Ex: /api/mathalea/4dadb
            path_parts = self.path.split('/')
            uuid = None

            # Chercher l'UUID dans le path
            for i, part in enumerate(path_parts):
                if part == 'mathalea' and i + 1 < len(path_parts):
                    uuid = path_parts[i + 1].split('?')[0]
                    break

            if not uuid:
                self.send_error(400, "UUID manquant")
                return

            print(f"🔍 Proxy: Récupération exercice UUID={uuid}")

            exercice_data = None

            # Essayer MathALÉA distant directement
            try:
                distant_url = f"{MATHALEA_DISTANT}/alea/?uuid={uuid}"
                print(f"📡 Tentative distante: {distant_url}")

                with urllib.request.urlopen(distant_url, timeout=10) as response:
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
                                print(f"✅ Données trouvées (pattern: {pattern[:30]})")
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
                                        print(f"✅ Données trouvées dans un script")
                                        break
                                    except json.JSONDecodeError:
                                        continue
                            if exercice_data:
                                break

            except Exception as e:
                print(f"⚠️ MathALÉA distant indisponible: {e}")

            if exercice_data:
                # Envoyer les données en JSON
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Access-Control-Allow-Methods', 'GET')
                self.end_headers()
                self.wfile.write(json.dumps(exercice_data, ensure_ascii=False).encode('utf-8'))
            else:
                self.send_response(404)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Exercice non trouvé"}).encode('utf-8'))

        except Exception as e:
            print(f"❌ Erreur proxy: {e}")
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"error": f"Erreur serveur: {str(e)}"}).encode('utf-8'))

    def do_OPTIONS(self):
        """Gérer les requêtes OPTIONS pour CORS"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

"""
Serverless function Vercel pour proxy Mistral OCR
Extrait le contenu mathématique depuis des images de devoirs
"""
from http.server import BaseHTTPRequestHandler
import urllib.request
import json
import os

MISTRAL_API_KEY = os.environ.get('MISTRAL_API_KEY')
MISTRAL_API_URL = "https://api.mistral.ai/v1/chat/completions"

SYSTEM_PROMPT = """Tu es un assistant spécialisé dans l'extraction de contenu mathématique depuis des images de devoirs. Extrais le texte visible dans l'image en préservant la structure (exercices, questions). Utilise la notation LaTeX pour les formules mathématiques (ex: $\\frac{3}{4}$, $\\angle BEC$). Numérote les questions si elles sont numérotées dans l'image."""


class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        """Proxy vers Mistral OCR pour extraire le contenu mathématique"""
        try:
            # Lire le body de la requête
            content_length = int(self.headers.get('Content-Length', 0))
            body = self.rfile.read(content_length).decode('utf-8')

            if not body:
                self.send_error(400, "Body manquant")
                return

            try:
                data = json.loads(body)
            except json.JSONDecodeError:
                self.send_error(400, "JSON invalide")
                return

            image_base64 = data.get('image')
            mime_type = data.get('mime_type', 'image/png')

            if not image_base64:
                self.send_error(400, "Paramètre 'image' manquant")
                return

            if not MISTRAL_API_KEY:
                print("❌ Erreur: MISTRAL_API_KEY non configurée")
                self.send_error(500, "API key manquante")
                return

            print(f"🔍 OCR: Extraction de contenu mathématique, taille={len(image_base64)}")

            # Préparer la requête Mistral
            mistral_payload = {
                "model": "pixtral-large-latest",
                "messages": [
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": SYSTEM_PROMPT
                            },
                            {
                                "type": "image_url",
                                "image_url": {
                                    "url": f"data:{mime_type};base64,{image_base64}"
                                }
                            }
                        ]
                    }
                ],
                "max_tokens": 4096
            }

            # Appeler Mistral API
            headers = {
                'Authorization': f'Bearer {MISTRAL_API_KEY}',
                'Content-Type': 'application/json'
            }

            print(f"📡 Appel Mistral API...")
            req = urllib.request.Request(
                MISTRAL_API_URL,
                data=json.dumps(mistral_payload, ensure_ascii=False).encode('utf-8'),
                headers=headers,
                method='POST'
            )

            with urllib.request.urlopen(req, timeout=30) as response:
                response_data = json.loads(response.read().decode('utf-8'))

            # Extraire le contenu
            if 'choices' in response_data and len(response_data['choices']) > 0:
                extracted_text = response_data['choices'][0]['message']['content']
                print(f"✅ Extraction réussie")

                # Envoyer la réponse
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "text": extracted_text,
                    "success": True
                }, ensure_ascii=False).encode('utf-8'))
            else:
                print(f"⚠️ Réponse Mistral invalide: {response_data}")
                self.send_error(500, "Erreur lors de l'extraction")

        except urllib.error.HTTPError as e:
            print(f"❌ Erreur HTTP Mistral {e.code}: {e.read().decode('utf-8')}")
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "error": f"Erreur Mistral: {e.code}",
                "success": False
            }).encode('utf-8'))

        except Exception as e:
            print(f"❌ Erreur OCR: {e}")
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "error": f"Erreur serveur: {str(e)}",
                "success": False
            }).encode('utf-8'))

    def do_OPTIONS(self):
        """Gérer les requêtes OPTIONS pour CORS"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

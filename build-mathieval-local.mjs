#!/usr/bin/env node
/**
 * build-mathieval-local.mjs
 * -----------------------------------------------------------------------------
 * Empaquette l'application MathEval (app.html) en UN SEUL fichier autonome et
 * 100 % hors-ligne : `dnb-2026-local.html`, qui démarre directement en mode
 * « Correction DNB 2026 — clé en main » (double-clic, protocole file://).
 *
 * PRINCIPE : on RÉUTILISE le code métier de MathEval TEL QUEL. On se contente
 * d'inliner / d'emballer :
 *   - tous les scripts LOCAUX (js/**) et le CSS local (css/main.css)
 *   - les libs CDN NÉCESSAIRES en hors-ligne : KaTeX (css+js+auto-render+polices
 *     woff2 en base64), jsPDF, html2canvas, JSZip (récupérées via `npm pack`)
 *   - le sujet DNB 2026 (JSON) injecté dans window.__dnb2026Json
 *   - les 2 figures PNG en data-URI base64
 *
 * On RETIRE les libs inutiles en clé en main (pdf.js, mammoth, scratchblocks)
 * et on NEUTRALISE tout accès réseau (rpc-wrapper module, API Mistral, worker
 * pdf.js) pour que le fichier final n'émette AUCUNE requête externe.
 *
 * Aucun fichier source de MathEval n'est modifié : on ne fait que LIRE app.html,
 * js/**, css/main.css puis ÉCRIRE dnb-2026-local.html.
 *
 * Ré-exécutable :  node build-mathieval-local.mjs
 * -----------------------------------------------------------------------------
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const APP_HTML = path.join(ROOT, "app.html");
const JSON_SRC = path.join(ROOT, "import-pdf", "correction-dnb-2026-metropole.json");
const OUT = path.join(ROOT, "dnb-2026-local.html");

function log(...a) { console.log("[build]", ...a); }

// Échappe une chaîne pour l'utiliser dans une RegExp.
function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

// Remplace un token par une valeur SANS interpréter les $ (split/join).
function replaceAll(str, token, value) { return str.split(token).join(value); }

// -----------------------------------------------------------------------------
// Ordre exact des scripts LOCAUX (cf. app.html). rpc-wrapper et dnb2026/app.js
// sont traités à part.
// -----------------------------------------------------------------------------
const LOCAL_SCRIPTS = [
  "js/data/dictionnaireDNB.js",
  "js/data/dictionnaireAutomatismes.js",
  "js/modules/mathaleaUtils.js",
  "js/modules/generateursAutomatismes.js",
  // js/rpc-wrapper.js  -> remplacé par un stub (module réseau inutile)
  "js/state/appState.js",
  "js/workflow.js",
  "js/modules/importJSON.js",
  "js/modules/pdfGenerator.js",
  "js/modules/uploadUI.js",
  "js/modules/pdfExtract.js",
  "js/modules/questionParser.js",
  "js/modules/baremeConfig.js",
  "js/modules/correctionManager.js",
  "js/modules/dnb2026.js",
  "js/modules/pdfSessionPersist.js",
  "js/modules/exportPronote.js",
  "js/app.js",
];

// Figures à inliner (chemin d'origine -> fichier disque).
const IMAGES = {
  "dnb/2026/tex/png/dnb_2026_06_metropole_q7_diagramme.png":
    path.join(ROOT, "dnb", "2026", "tex", "png", "dnb_2026_06_metropole_q7_diagramme.png"),
  "dnb/2026/tex/png/dnb_2026_06_metropole_ex3_graphique.png":
    path.join(ROOT, "dnb", "2026", "tex", "png", "dnb_2026_06_metropole_ex3_graphique.png"),
};

// -----------------------------------------------------------------------------
// npm pack d'une lib -> dossier temporaire extrait sous <tmp>/package/
// -----------------------------------------------------------------------------
function pack(spec) {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "pack-"));
  log(`npm pack ${spec} ...`);
  const out = execSync(`npm pack ${spec} --silent`, { cwd: tmp, encoding: "utf8" }).trim();
  const tgz = out.split("\n").pop().trim();
  execSync(`tar -xzf ${JSON.stringify(tgz)}`, { cwd: tmp });
  return { dir: path.join(tmp, "package"), tmp };
}

// -----------------------------------------------------------------------------
// KaTeX : css + js + auto-render + polices woff2 inlinées (base64)
// -----------------------------------------------------------------------------
function fetchKatex() {
  const { dir, tmp } = pack("katex@0.16.22");
  const dist = path.join(dir, "dist");
  const js = fs.readFileSync(path.join(dist, "katex.min.js"), "utf8");
  const autoRender = fs.readFileSync(path.join(dist, "contrib", "auto-render.min.js"), "utf8");
  let css = fs.readFileSync(path.join(dist, "katex.min.css"), "utf8");
  const fontsDir = path.join(dist, "fonts");
  // Retirer woff et ttf (on ne garde que woff2)
  css = css
    .replace(/,\s*url\(fonts\/[^)]+\.woff\)\s*format\("woff"\)/g, "")
    .replace(/,\s*url\(fonts\/[^)]+\.ttf\)\s*format\("truetype"\)/g, "");
  let count = 0;
  css = css.replace(/url\(fonts\/([A-Za-z0-9_\-]+\.woff2)\)/g, (m, file) => {
    const b64 = fs.readFileSync(path.join(fontsDir, file)).toString("base64");
    count++;
    return `url(data:font/woff2;base64,${b64})`;
  });
  log(`KaTeX : polices woff2 inlinées = ${count}`);
  fs.rmSync(tmp, { recursive: true, force: true });
  return { js, autoRender, css };
}

function fetchLib(spec, relPath, globalName) {
  const { dir, tmp } = pack(spec);
  const js = fs.readFileSync(path.join(dir, relPath), "utf8");
  fs.rmSync(tmp, { recursive: true, force: true });
  log(`${globalName} : ${(js.length / 1024).toFixed(0)} Ko`);
  return js;
}

// -----------------------------------------------------------------------------
// Remplacement d'un tag <script src="...URL..."> ... </script>
// -----------------------------------------------------------------------------
function replaceScriptTag(html, urlPart, replacementFn) {
  const re = new RegExp(`<script[^>]*src="[^"]*${esc(urlPart)}[^"]*"[^>]*>\\s*</script>`);
  if (!re.test(html)) throw new Error("Tag <script> introuvable : " + urlPart);
  return html.replace(re, replacementFn);
}
function replaceLinkTag(html, urlPart, replacementFn) {
  const re = new RegExp(`<link[^>]*href="[^"]*${esc(urlPart)}[^"]*"[^>]*>`);
  if (!re.test(html)) throw new Error("Tag <link> introuvable : " + urlPart);
  return html.replace(re, replacementFn);
}
function removeScriptTag(html, urlPart) {
  return replaceScriptTag(html, urlPart, () => `<!-- retiré (inutile en clé en main) : ${urlPart} -->`);
}
function removeLinkTag(html, urlPart) {
  return replaceLinkTag(html, urlPart, () => `<!-- retiré (inutile en clé en main) : ${urlPart} -->`);
}

// Emballe du JS dans un <script> inline. Le contenu peut contenir "</script>"
// (peu probable ici) : on neutralise par sécurité.
function inlineScript(content, comment) {
  const safe = content.replace(/<\/script>/gi, "<\\/script>");
  return `<script>\n/* === ${comment} === */\n${safe}\n</script>`;
}

// -----------------------------------------------------------------------------
// Transformations spécifiques (version inlinée UNIQUEMENT)
// -----------------------------------------------------------------------------
function transformDnb2026(src) {
  let out = src;
  // 1) Ne pas écraser le JSON injecté en amont.
  const l12 = "window.__dnb2026Json = null;";
  if (!out.includes(l12)) throw new Error("dnb2026.js : ligne d'init introuvable");
  out = replaceAll(out, l12, "window.__dnb2026Json = window.__dnb2026Json || null;");

  // 2) Utiliser le JSON inliné s'il est présent, sinon fetch (fallback file://).
  const fetchBlock =
`    // Charger le sujet pré-configuré.
    fetch('import-pdf/correction-dnb-2026-metropole.json')
        .then(function (r) { return r.json(); })
        .then(function (data) {
            window.__dnb2026Json = data;
            console.log('✅ Sujet DNB 2026 chargé :', data.title);
            updateDnb2026Preview();
        })
        .catch(function (err) {
            console.error('❌ Échec du chargement du sujet DNB 2026 :', err);
            var preview = document.getElementById('dnb2026Preview');
            if (preview) {
                preview.textContent = 'Erreur de chargement du sujet. Rechargez la page.';
            }
        });`;
  if (!out.includes(fetchBlock)) throw new Error("dnb2026.js : bloc fetch introuvable");
  const localBlock =
`    // [BUILD LOCAL] Privilégier le JSON inliné (window.__dnb2026Json). Le fetch
    // ne fonctionnerait pas en file://, il reste en repli si l'inline manque.
    if (window.__dnb2026Json) {
        console.log('✅ Sujet DNB 2026 (inliné) :', window.__dnb2026Json.title);
        updateDnb2026Preview();
    } else {
        fetch('import-pdf/correction-dnb-2026-metropole.json')
            .then(function (r) { return r.json(); })
            .then(function (data) {
                window.__dnb2026Json = data;
                console.log('✅ Sujet DNB 2026 chargé :', data.title);
                updateDnb2026Preview();
            })
            .catch(function (err) {
                console.error('❌ Échec du chargement du sujet DNB 2026 :', err);
                var preview = document.getElementById('dnb2026Preview');
                if (preview) {
                    preview.textContent = 'Erreur de chargement du sujet. Rechargez la page.';
                }
            });
    }`;
  out = replaceAll(out, fetchBlock, localBlock);
  return out;
}

function transformAppJs(src) {
  const cond = "if (urlParams.get('subject') === 'dnb-2026') {";
  if (!src.includes(cond)) throw new Error("app.js : condition de détection DNB 2026 introuvable");
  return replaceAll(
    src,
    cond,
    "if (urlParams.get('subject') === 'dnb-2026' || window.__FORCE_DNB2026) {"
  );
}

// -----------------------------------------------------------------------------
// Build
// -----------------------------------------------------------------------------
function main() {
  // 0) Sujet + figures
  const subject = JSON.parse(fs.readFileSync(JSON_SRC, "utf8"));
  const nbEx = subject.exercises.length;
  const nbQ = subject.exercises.reduce((s, e) => s + e.questions.length, 0);
  log(`Sujet : ${nbEx} exercices / ${nbQ} questions`);

  const imagesMap = {};
  for (const [key, file] of Object.entries(IMAGES)) {
    const b64 = fs.readFileSync(file).toString("base64");
    imagesMap[key] = `data:image/png;base64,${b64}`;
    log(`Figure inlinée : ${key} (${(b64.length / 1024).toFixed(1)} Ko b64)`);
  }

  // 1) Libs CDN à embarquer (hors-ligne)
  const katex = fetchKatex();
  const jspdfJS = fetchLib("jspdf@2.5.1", path.join("dist", "jspdf.umd.min.js"), "jsPDF");
  const html2canvasJS = fetchLib("html2canvas@1.4.1", path.join("dist", "html2canvas.min.js"), "html2canvas");
  const jszipJS = fetchLib("jszip@3.10.1", path.join("dist", "jszip.min.js"), "JSZip");

  // 2) app.html de base
  let html = fs.readFileSync(APP_HTML, "utf8");

  // 3) Remplacer les tags CDN du <head>
  html = replaceLinkTag(html, "katex@0.16.22/dist/katex.min.css",
    () => inlineStyle(katex.css, "KaTeX CSS (polices woff2 base64)"));
  html = replaceScriptTag(html, "katex@0.16.22/dist/katex.min.js",
    () => inlineScript(katex.js, "KaTeX JS"));
  html = replaceScriptTag(html, "auto-render.min.js",
    () => inlineScript(katex.autoRender, "KaTeX auto-render"));
  html = removeLinkTag(html, "scratchblocks@3.6.4/build/scratchblocks.min.css");
  html = removeScriptTag(html, "scratchblocks@3.6.4/build/scratchblocks.min.js");
  html = replaceScriptTag(html, "jspdf/2.5.1/jspdf.umd.min.js",
    () => inlineScript(jspdfJS, "jsPDF (export PDF)"));
  html = replaceScriptTag(html, "html2canvas/1.4.1/html2canvas.min.js",
    () => inlineScript(html2canvasJS, "html2canvas (export PDF)"));
  html = removeScriptTag(html, "pdf.js/3.11.174/pdf.min.js");
  html = removeScriptTag(html, "mammoth/1.6.0/mammoth.browser.min.js");
  html = replaceScriptTag(html, "jszip/3.10.1/jszip.min.js",
    () => inlineScript(jszipJS, "JSZip"));

  // 4) rpc-wrapper (type=module, réseau) -> stub inerte
  html = replaceScriptTag(html, "js/rpc-wrapper.js", () => inlineScript(
`// [BUILD LOCAL] rpc-wrapper.js neutralisé : l'intégration MathALÉA (iframe +
// postMessage RPC) n'est pas utilisée en mode « clé en main ». Stub inerte pour
// éviter toute erreur si du code référence window.RPC.
window.RPC = window.RPC || function RPC() {
    this.expose = function () {};
    this.call = function () { return Promise.resolve(null); };
    this.close = function () {};
};`, "rpc-wrapper (stub)"));

  // 5) CSS local main.css -> <style>
  html = replaceLinkTag(html, "css/main.css",
    () => inlineStyle(fs.readFileSync(path.join(ROOT, "css", "main.css"), "utf8"), "css/main.css"));

  // 6) Scripts locaux -> inline (dans l'ordre)
  for (const rel of LOCAL_SCRIPTS) {
    let content = fs.readFileSync(path.join(ROOT, rel), "utf8");
    if (rel.endsWith("dnb2026.js")) content = transformDnb2026(content);
    if (rel.endsWith("app.js")) content = transformAppJs(content);
    html = replaceScriptTag(html, rel, () => inlineScript(content, rel));
  }

  // 6bis) Retirer les boutons inutiles pour un correcteur lambda du DNB
  //        (copies anonymes) : bilans PDF par élève + export Pronote.
  //        Suppression RÉELLE du markup — UNIQUEMENT dans la version locale ;
  //        MathEval conserve ces boutons pour la correction des classes.
  const BOUTONS_A_RETIRER = [
    { onclick: "exportBilansPdfJson()", label: "Export bilans PDF" },
    { onclick: "showPronoteExportModal()", label: "Export Pronote" },
  ];
  for (const b of BOUTONS_A_RETIRER) {
    const re = new RegExp(`<button[^>]*onclick="${esc(b.onclick)}"[\\s\\S]*?</button>`);
    if (!re.test(html)) { log(`⚠️ bouton introuvable (ignoré) : ${b.label}`); continue; }
    html = html.replace(re, `<!-- retiré (inutile pour un correcteur DNB) : ${b.label} -->`);
    log(`Bouton retiré : ${b.label}`);
  }

  // 7) Injecter la config + les stubs des libs retirées, très tôt (après charset)
  const bootScript =
`<script>
/* [BUILD LOCAL] Démarrage forcé « Correction DNB 2026 — clé en main » + stubs. */
window.__FORCE_DNB2026 = true;
// Libs retirées (upload PDF/DOCX + Scratch, non utilisées ici) : stubs inertes.
window.pdfjsLib = window.pdfjsLib || {};
window.mammoth = window.mammoth || {};
window.scratchblocks = window.scratchblocks || {};
</script>`;
  const charsetTag = '<meta charset="UTF-8">';
  html = replaceAll(html, charsetTag, charsetTag + "\n    " + bootScript);

  // 8) Injecter le sujet DNB 2026 JUSTE AVANT le script dnb2026.js inliné
  const dnbMarker = "/* === js/modules/dnb2026.js === */";
  const jsonScript =
`<script>
/* [BUILD LOCAL] Sujet DNB 2026 inliné (${nbEx} exercices / ${nbQ} questions). */
window.__dnb2026Json = ${JSON.stringify(subject)};
</script>
`;
  html = replaceAll(html, "<script>\n" + dnbMarker, jsonScript + "<script>\n" + dnbMarker);

  // 9) Figures : remplacer les chemins par les data-URI partout (JSON inclus)
  for (const [key, dataUri] of Object.entries(imagesMap)) {
    html = replaceAll(html, key, dataUri);
  }

  // 10) Neutraliser les URL externes résiduelles (réseau) présentes dans le code
  //     métier — jamais atteintes en clé en main, mais on garantit « zéro réseau ».
  html = replaceAll(html, "https://api.mistral.ai", "/__reseau_desactive_mistral__");
  html = replaceAll(html, "https://console.mistral.ai/api-keys", "#");
  html = replaceAll(html, "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js", "");

  // 11) Écrire
  fs.writeFileSync(OUT, html, "utf8");
  const kb = (fs.statSync(OUT).size / 1024).toFixed(0);
  log(`Écrit : ${OUT} (${kb} Ko)`);
  log("Terminé.");
}

function inlineStyle(css, comment) {
  return `<style>\n/* === ${comment} === */\n${css}\n</style>`;
}

main();

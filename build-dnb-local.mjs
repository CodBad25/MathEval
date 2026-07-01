#!/usr/bin/env node
/**
 * build-dnb-local.mjs
 * -------------------------------------------------------------
 * Assemble une page de correction DNB 2026 100 % locale et hors-ligne :
 *   - KaTeX (JS + CSS) récupéré via `npm pack katex` puis extrait localement
 *   - polices woff2 de KaTeX inlinées en data-URI base64 dans le CSS
 *   - sujet JSON inliné
 *   - figures PNG inlinées en base64
 * Sortie : dnb-2026-local.html (autosuffisant, fonctionne en file://).
 *
 * Ré-exécutable :  node build-dnb-local.mjs
 * -------------------------------------------------------------
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.dirname(fileURLToPath(import.meta.url));
const TEMPLATE = path.join(ROOT, "dnb-2026-local.template.html");
const JSON_SRC = path.join(ROOT, "import-pdf", "correction-dnb-2026-metropole.json");
const OUT = path.join(ROOT, "dnb-2026-local.html");
const IMAGES = {
  "dnb/2026/tex/png/dnb_2026_06_metropole_q7_diagramme.png":
    path.join(ROOT, "dnb", "2026", "tex", "png", "dnb_2026_06_metropole_q7_diagramme.png"),
  "dnb/2026/tex/png/dnb_2026_06_metropole_ex3_graphique.png":
    path.join(ROOT, "dnb", "2026", "tex", "png", "dnb_2026_06_metropole_ex3_graphique.png"),
};

function log(...a){ console.log("[build]", ...a); }

// ---------------------------------------------------------------
// 1) Récupérer KaTeX localement via npm pack
// ---------------------------------------------------------------
function fetchKatex(){
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "katex-"));
  log("Téléchargement de KaTeX via npm pack dans", tmp);
  // npm pack télécharge katex-x.y.z.tgz dans tmp (aucun serveur local, juste le registre npm au build)
  const out = execSync("npm pack katex --silent", { cwd: tmp, encoding: "utf8" }).trim();
  const tgz = out.split("\n").pop().trim();
  log("Archive :", tgz);
  execSync(`tar -xzf ${JSON.stringify(tgz)}`, { cwd: tmp });
  const dist = path.join(tmp, "package", "dist");
  const js = fs.readFileSync(path.join(dist, "katex.min.js"), "utf8");
  const css = fs.readFileSync(path.join(dist, "katex.min.css"), "utf8");
  const fontsDir = path.join(dist, "fonts");
  return { js, css, fontsDir, tmp };
}

// ---------------------------------------------------------------
// 2) Inliner les polices woff2 dans le CSS, retirer woff/ttf
// ---------------------------------------------------------------
function inlineFonts(css, fontsDir){
  // Retirer les sources .woff et .ttf (on ne garde que le .woff2)
  let out = css
    .replace(/,\s*url\(fonts\/[^)]+\.woff\)\s*format\("woff"\)/g, "")
    .replace(/,\s*url\(fonts\/[^)]+\.ttf\)\s*format\("truetype"\)/g, "");
  // Remplacer chaque url(fonts/X.woff2) par une data-URI base64
  let count = 0;
  out = out.replace(/url\(fonts\/([A-Za-z0-9_\-]+\.woff2)\)/g, (m, file) => {
    const p = path.join(fontsDir, file);
    const b64 = fs.readFileSync(p).toString("base64");
    count++;
    return `url(data:font/woff2;base64,${b64})`;
  });
  log(`Polices woff2 inlinées : ${count}`);
  return out;
}

// ---------------------------------------------------------------
// 3) Images PNG -> data-URI base64
// ---------------------------------------------------------------
function encodeImages(){
  const map = {};
  for (const [key, file] of Object.entries(IMAGES)){
    const b64 = fs.readFileSync(file).toString("base64");
    map[key] = `data:image/png;base64,${b64}`;
    log(`Image inlinée : ${key} (${(b64.length/1024).toFixed(1)} Ko base64)`);
  }
  return map;
}

// ---------------------------------------------------------------
// Injection (split/join : ne pas interpréter les $ des remplacements)
// ---------------------------------------------------------------
function inject(str, token, value){
  if (!str.includes(token)) throw new Error("Token introuvable dans le template : " + token);
  return str.split(token).join(value);
}

// ---------------------------------------------------------------
// Build
// ---------------------------------------------------------------
function main(){
  const { js: katexJS, css: katexCSSraw, fontsDir, tmp } = fetchKatex();
  const katexCSS = inlineFonts(katexCSSraw, fontsDir);
  const imagesMap = encodeImages();

  const subjectRaw = fs.readFileSync(JSON_SRC, "utf8");
  const subject = JSON.parse(subjectRaw); // validation
  const nbQ = subject.exercises.reduce((s,e)=>s+e.questions.length,0);
  log(`Sujet : ${subject.exercises.length} exercices / ${nbQ} questions`);

  let html = fs.readFileSync(TEMPLATE, "utf8");
  html = inject(html, "__KATEX_CSS__", katexCSS);
  html = inject(html, "__KATEX_JS__", katexJS);
  html = inject(html, "__SUBJECT_JSON__", JSON.stringify(subject));
  html = inject(html, "__IMAGES_JSON__", JSON.stringify(imagesMap));

  fs.writeFileSync(OUT, html, "utf8");
  const kb = (fs.statSync(OUT).size/1024).toFixed(0);
  log(`Écrit : ${OUT} (${kb} Ko)`);

  // Nettoyage du dossier temporaire
  try { fs.rmSync(tmp, { recursive: true, force: true }); } catch(e){}
  log("Terminé.");
}

main();

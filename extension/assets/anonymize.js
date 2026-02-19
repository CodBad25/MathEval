/* ──────────────────────────────────────────────────────────────────────────
   anonymize.js – Remplace les noms d'élèves par des mathématicien(ne)s célèbres
   Bouton 🎭 en bas à droite, toggle on/off. Purement visuel, pas de modif de données.
   ────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  /* ── Listes de mathématicien(ne)s célèbres (tous avec Prénom Nom) ── */
  const FEMMES = [
    'Sophie Germain', 'Emmy Noether', 'Ada Lovelace', 'Maryam Mirzakhani',
    'Marie Curie', 'Sophie Kowalevski', 'Karen Uhlenbeck', 'Claire Voisin',
    'Katherine Johnson', 'Ingrid Daubechies', 'Maria Agnesi', 'Grace Hopper',
    'Dorothy Vaughan', 'Julia Robinson', 'Maryna Viazovska'
  ];

  const HOMMES = [
    'Leonhard Euler', 'Carl Gauss', 'Blaise Pascal', 'Alan Turing',
    'Henri Poincaré', 'Pierre Fermat', 'Évariste Galois', 'Isaac Newton',
    'René Descartes', 'Srinivasa Ramanujan', 'David Hilbert', 'Georg Cantor',
    'Andrew Wiles', 'Augustin Cauchy', 'François Viète'
  ];

  /* ── Prénoms féminins courants (normalisés sans accents, minuscules) ── */
  const PRENOMS_F = new Set([
    'ada', 'adele', 'agathe', 'alice', 'ambre', 'amelie', 'anna', 'anais',
    'camille', 'capucine', 'charlotte', 'chloe', 'clara', 'clementine',
    'constance', 'elena', 'elise', 'emma', 'erica', 'eva', 'fanny', 'flavie',
    'gabrielle', 'helene', 'ines', 'isabelle', 'jade', 'jeanne', 'julia',
    'juliette', 'lea', 'lena', 'leonie', 'lina', 'lisa', 'lola', 'louise',
    'lucie', 'luna', 'maelys', 'manon', 'margot', 'marie', 'mathilde',
    'megane', 'mila', 'nour', 'nina', 'oceane', 'pauline', 'romane', 'rose',
    'sarah', 'soleia', 'sophie', 'thao', 'victoire', 'yasmine', 'zoe',
    'ilyetta', 'leopauldine', 'aurelie', 'caroline', 'catherine', 'celia',
    'diane', 'emilie', 'laure', 'lana', 'mia', 'nathalie', 'sylvie', 'virginie'
  ]);

  function norm(s) {
    return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  }

  function estFeminin(prenom) {
    return PRENOMS_F.has(norm(prenom));
  }

  /* ── État ──────────────────────────────────────────────── */
  let actif = false;
  let mapNoms = null;     // realName → fakeName
  let mapInverse = null;  // fakeName → realName
  let observer = null;

  /* ── Construction du mapping ──────────────────────────── */
  function buildMap() {
    let students = window.__getStudentList ? window.__getStudentList() : [];
    // Fallback : lire directement le localStorage si la fonction globale n'est pas dispo
    if (!students || !students.length) {
      try {
        const raw = localStorage.getItem('studentsList');
        if (raw) students = JSON.parse(raw);
      } catch (_) {}
    }
    if (!students || !students.length) return false;

    mapNoms = {};
    mapInverse = {};
    let fi = 0, mi = 0;

    students.forEach(s => {
      if (!s.nom && !s.prenom) return;
      const prenom = (s.prenom || '').trim();
      const nom = (s.nom || '').trim();

      // Choix du pseudonyme selon le genre
      let pseudo;
      if (estFeminin(prenom)) {
        pseudo = FEMMES[fi % FEMMES.length];
        fi++;
      } else {
        pseudo = HOMMES[mi % HOMMES.length];
        mi++;
      }

      const pseudoParts = pseudo.split(' ');
      const pseudoNom = pseudoParts.length > 1 ? pseudoParts.pop() : pseudo;
      const pseudoPrenom = pseudoParts.length > 0 ? pseudoParts.join(' ') : '';

      // Mapper les noms complets (NOM Prénom / Prénom NOM)
      const fullNP = (nom + ' ' + prenom).trim();
      const fullPN = (prenom + ' ' + nom).trim();

      if (fullNP) { mapNoms[fullNP] = pseudo; mapInverse[pseudo] = fullNP; }
      if (fullPN && fullPN !== fullNP) { mapNoms[fullPN] = pseudo; }

      // Nom seul → pseudo nom seul (seulement si >= 3 caractères)
      if (nom && nom.length >= 3 && !mapNoms[nom]) { mapNoms[nom] = pseudoNom; mapInverse[pseudoNom] = nom; }
      // Prénom seul → pseudo prénom seul (seulement si >= 3 caractères ET pseudoPrenom non vide)
      if (prenom && prenom.length >= 3 && pseudoPrenom && !mapNoms[prenom]) { mapNoms[prenom] = pseudoPrenom; mapInverse[pseudoPrenom] = prenom; }
    });

    return true;
  }

  /* ── Remplacement sans cascade (single-pass) ─────────── */
  let isReplacing = false;

  /**
   * Remplace en une seule passe : le texte de remplacement n'est JAMAIS
   * re-scanné, ce qui évite les cascades (ex: nom "in" → "Euler" puis
   * "Euler" contient un autre nom d'élève qui serait à nouveau remplacé).
   */
  function safeReplace(text, entries) {
    // Filtrer les entrées vides ou trop courtes
    const valid = entries.filter(([from, to]) => from && from.length >= 2 && to !== undefined);
    if (!valid.length) return null;

    // Construire une regex avec word boundaries pour ne pas matcher au milieu d'un mot
    const escaped = valid.map(([from]) =>
      from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    );
    const regex = new RegExp('\\b(?:' + escaped.join('|') + ')\\b', 'g');
    const map = Object.fromEntries(valid);
    const result = text.replace(regex, match => map[match] ?? match);
    return result !== text ? result : null;
  }

  function replaceInTextNodes(root, map) {
    const entries = Object.entries(map).sort((a, b) => b[0].length - a[0].length);
    if (!entries.length) return;

    const wasReplacing = isReplacing;
    isReplacing = true;

    try {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: n => {
          const tag = n.parentElement?.tagName;
          if (tag === 'SCRIPT' || tag === 'STYLE') return NodeFilter.FILTER_REJECT;
          return NodeFilter.FILTER_ACCEPT;
        }
      });

      const nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);

      nodes.forEach(node => {
        const replaced = safeReplace(node.textContent, entries);
        if (replaced !== null) node.textContent = replaced;
      });

      root.querySelectorAll('option, [data-student-name]').forEach(el => {
        const replaced = safeReplace(el.textContent, entries);
        if (replaced !== null) el.textContent = replaced;
      });
    } finally {
      isReplacing = wasReplacing;
    }
  }

  /* ── MutationObserver pour les mises à jour dynamiques ── */

  function startObserver() {
    if (observer) observer.disconnect();
    observer = new MutationObserver(mutations => {
      if (!actif || !mapNoms || isReplacing) return;
      isReplacing = true;
      try {
        mutations.forEach(m => {
          m.addedNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
              replaceTextNode(node, mapNoms);
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              replaceInTextNodes(node, mapNoms);
            }
          });
        });
      } finally {
        isReplacing = false;
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  function replaceTextNode(node, map) {
    const tag = node.parentElement?.tagName;
    if (tag === 'SCRIPT' || tag === 'STYLE') return;
    const entries = Object.entries(map).sort((a, b) => b[0].length - a[0].length);
    const replaced = safeReplace(node.textContent, entries);
    if (replaced !== null) node.textContent = replaced;
  }

  /* ── Mélange / restauration de l'ordre des cartes élèves ── */
  let shuffledGrid = null; // référence au conteneur mélangé

  function findStudentGrid() {
    // 1) ID explicite (panneau aperçu bilans)
    const byId = document.getElementById('bpdf-student-grid');
    if (byId) return byId;
    // 2) Chercher la grille Svelte qui contient des cartes élèves (la plus peuplée)
    const grids = document.querySelectorAll('[class*="grid"]');
    let best = null, bestCount = 0;
    grids.forEach(g => {
      if (g.children.length > bestCount) { best = g; bestCount = g.children.length; }
    });
    return bestCount >= 2 ? best : null;
  }

  function shuffleStudentCards() {
    const grid = findStudentGrid();
    if (!grid || grid.children.length < 2) return;

    // Tagger chaque enfant avec son index original (survit aux re-renders)
    Array.from(grid.children).forEach((child, i) => {
      child.dataset.origOrder = String(i);
    });
    shuffledGrid = grid;

    // Mélanger (Fisher-Yates)
    const shuffled = Array.from(grid.children);
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Réordonner le DOM
    shuffled.forEach(child => grid.appendChild(child));
  }

  function restoreStudentCards() {
    // Retrouver la grille (même si Svelte a re-rendu)
    const grid = shuffledGrid || findStudentGrid();
    if (!grid) return;

    const children = Array.from(grid.children);
    // Trier par data-orig-order
    const hasOrder = children.some(c => c.dataset.origOrder !== undefined);
    if (!hasOrder) return;

    children
      .sort((a, b) => (parseInt(a.dataset.origOrder) || 0) - (parseInt(b.dataset.origOrder) || 0))
      .forEach(child => {
        grid.appendChild(child);
        delete child.dataset.origOrder;
      });

    shuffledGrid = null;
  }

  /* ── Toggle ───────────────────────────────────────────── */
  function toggle() {
    if (!mapNoms && !buildMap()) {
      toast('Aucun élève chargé.', 'warning');
      return;
    }

    actif = !actif;

    if (actif) {
      replaceInTextNodes(document.body, mapNoms);
      shuffleStudentCards();
      startObserver();
      // Exposer le mapping pour que bilan-pdf.js puisse générer des PDF anonymes
      window.__anonymize = { active: true, map: mapNoms, inverse: mapInverse };
      toast('🎭 Noms anonymisés (ordre mélangé)', 'info');
    } else {
      if (observer) { observer.disconnect(); observer = null; }
      // Restaurer l'ordre AVANT le remplacement de texte (sinon Svelte re-rend et perd data-orig-order)
      restoreStudentCards();
      replaceInTextNodes(document.body, mapInverse);
      window.__anonymize = { active: false, map: null, inverse: null };
      toast('Noms restaurés (ordre original)', 'info');
    }

    updateBtn();
  }

  /* ── Toast (réutilise celui de supabase-sync si dispo) ── */
  function toast(msg, type) {
    if (window.__supabaseAuth?.toast) return window.__supabaseAuth.toast(msg, type);
    const colors = { info: '#6c5ce7', success: '#4caf50', error: '#f44336', warning: '#ff9800' };
    const t = document.createElement('div');
    Object.assign(t.style, {
      position: 'fixed', bottom: '80px', right: '20px', zIndex: '100001',
      padding: '10px 16px', borderRadius: '8px', color: '#fff', fontSize: '13px',
      background: colors[type] || colors.info, boxShadow: '0 4px 12px rgba(0,0,0,.3)',
      opacity: '0', transform: 'translateY(10px)', transition: 'all .3s ease',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    });
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateY(0)'; });
    setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 400); }, 2500);
  }

  /* ── Bouton ───────────────────────────────────────────── */
  let btn;

  function createBtn() {
    btn = document.createElement('button');
    btn.id = 'anonymize-btn';
    btn.title = 'Anonymiser / désanonymiser les noms des élèves';
    Object.assign(btn.style, {
      position: 'fixed', bottom: '20px', right: '20px', zIndex: '99999',
      height: '42px', borderRadius: '21px', padding: '0 16px',
      background: '#6c5ce7', color: '#fff', border: 'none',
      fontSize: '14px', cursor: 'pointer', display: 'flex',
      alignItems: 'center', gap: '6px',
      boxShadow: '0 3px 12px rgba(108,92,231,.4)', transition: 'all .15s',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    });
    btn.onmouseenter = () => { btn.style.transform = 'scale(1.08)'; };
    btn.onmouseleave = () => { btn.style.transform = 'scale(1)'; };
    btn.onclick = toggle;
    updateBtn();
    document.body.appendChild(btn);
  }

  function updateBtn() {
    if (!btn) return;
    if (actif) {
      btn.innerHTML = '🎭 <span style="font-size:12px;font-weight:600">Désanonymiser</span>';
      btn.style.background = '#e17055';
      btn.style.boxShadow = '0 3px 12px rgba(225,112,85,.4)';
    } else {
      btn.innerHTML = '🎭 <span style="font-size:12px;font-weight:600">Anonymiser</span>';
      btn.style.background = '#6c5ce7';
      btn.style.boxShadow = '0 3px 12px rgba(108,92,231,.4)';
    }
  }

  /* ── Masquer la toolbar flottante inutile (bottom-right du bundle) ── */
  function hideFloatingToolbar() {
    // Cible la toolbar avec les icônes (rounded-b-full rounded-t-full, fixed bottom-right)
    const selectors = [
      '.fixed.rounded-b-full.rounded-t-full',
      'button.\\!fixed.bottom-5.right-5'
    ];
    function tryHide() {
      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (el) el.style.display = 'none';
      }
    }
    tryHide();
    // Si pas encore rendu, observer le DOM
    const obs = new MutationObserver(() => {
      tryHide();
      // Vérifier si tous trouvés
      const allFound = selectors.every(sel => {
        const el = document.querySelector(sel);
        return !el || el.style.display === 'none';
      });
      if (allFound) obs.disconnect();
    });
    obs.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => obs.disconnect(), 15000);
  }

  /* ── Init (uniquement en mode correction) ─────────────── */
  if (!location.search.includes('correction')) return;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { createBtn(); hideFloatingToolbar(); });
  } else {
    createBtn();
    hideFloatingToolbar();
  }
})();

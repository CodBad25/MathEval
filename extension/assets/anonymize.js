/* ──────────────────────────────────────────────────────────────────────────
   anonymize.js – Remplace les noms d'élèves par des mathématicien(ne)s célèbres
   Bouton 🎭 en bas à droite, toggle on/off. Purement visuel, pas de modif de données.
   ────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  /* ── Listes de mathématicien(ne)s ─────────────────────── */
  const FEMMES = [
    'Sophie Germain', 'Emmy Noether', 'Ada Lovelace', 'Maryam Mirzakhani',
    'Hypatia', 'Sophie Kowalevski', 'Karen Uhlenbeck', 'Claire Voisin',
    'Julia Robinson', 'Ingrid Daubechies', 'Mary Cartwright', 'Nalini Joshi',
    'Maria Agnesi', 'Florence Nightingale', 'Cathleen Morawetz'
  ];

  const HOMMES = [
    'Leonhard Euler', 'Carl Gauss', 'Blaise Pascal', 'Alan Turing',
    'Henri Poincaré', 'Pierre Fermat', 'Évariste Galois', 'Bernhard Riemann',
    'Archimède', 'Pythagore', 'Isaac Newton', 'René Descartes',
    'Joseph Fourier', 'Gottfried Leibniz', 'Srinivasa Ramanujan'
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

      const pseudoNom = pseudo.split(' ').pop();
      const pseudoPrenom = pseudo.split(' ').slice(0, -1).join(' ');

      // Mapper toutes les variantes possibles du nom réel
      // "NOM Prénom", "Prénom NOM", "NOM", "Prénom"
      const fullNP = (nom + ' ' + prenom).trim();
      const fullPN = (prenom + ' ' + nom).trim();

      if (fullNP) { mapNoms[fullNP] = pseudo; mapInverse[pseudo] = fullNP; }
      if (fullPN && fullPN !== fullNP) { mapNoms[fullPN] = pseudo; }

      // Nom seul → pseudo nom seul
      if (nom && !mapNoms[nom]) { mapNoms[nom] = pseudoNom; mapInverse[pseudoNom] = nom; }
      // Prénom seul → pseudo prénom seul
      if (prenom && !mapNoms[prenom]) { mapNoms[prenom] = pseudoPrenom; mapInverse[pseudoPrenom] = prenom; }
    });

    return true;
  }

  /* ── Remplacement dans le DOM ─────────────────────────── */
  function replaceInTextNodes(root, map) {
    // Trier par longueur décroissante pour éviter les remplacements partiels
    const entries = Object.entries(map).sort((a, b) => b[0].length - a[0].length);
    if (!entries.length) return;

    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: n => {
        // Ignorer les scripts et styles
        const tag = n.parentElement?.tagName;
        if (tag === 'SCRIPT' || tag === 'STYLE') return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach(node => {
      let text = node.textContent;
      let changed = false;
      for (const [from, to] of entries) {
        if (text.includes(from)) {
          text = text.split(from).join(to);
          changed = true;
        }
      }
      if (changed) node.textContent = text;
    });

    // Aussi remplacer dans les attributs value des inputs/selects (dropdowns élèves)
    root.querySelectorAll('option, [data-student-name]').forEach(el => {
      let text = el.textContent;
      let changed = false;
      for (const [from, to] of entries) {
        if (text.includes(from)) {
          text = text.split(from).join(to);
          changed = true;
        }
      }
      if (changed) el.textContent = text;
    });
  }

  /* ── MutationObserver pour les mises à jour dynamiques ── */
  function startObserver() {
    if (observer) observer.disconnect();
    observer = new MutationObserver(mutations => {
      if (!actif || !mapNoms) return;
      mutations.forEach(m => {
        m.addedNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            let text = node.textContent;
            let changed = false;
            const entries = Object.entries(mapNoms).sort((a, b) => b[0].length - a[0].length);
            for (const [from, to] of entries) {
              if (text.includes(from)) {
                text = text.split(from).join(to);
                changed = true;
              }
            }
            if (changed) node.textContent = text;
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            replaceInTextNodes(node, mapNoms);
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
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
      startObserver();
      toast('🎭 Noms anonymisés', 'info');
    } else {
      if (observer) { observer.disconnect(); observer = null; }
      replaceInTextNodes(document.body, mapInverse);
      toast('Noms restaurés', 'info');
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

  /* ── Init ──────────────────────────────────────────────── */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createBtn);
  } else {
    createBtn();
  }
})();

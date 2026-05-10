// ═══════════════════════════════════════════════════════════════
//  PATCH DNB Blanc n°2 — Barème sur 23 points
//  Collège Gaston Chaissac — Avril 2026
//
//  USAGE : Sur la page barème du Correcteur Universel DNB
//  (mathseval.netlify.app/app.html), ouvrir la console (F12)
//  et coller ce script. Il déverrouille le plafond de 20 à 23
//  et désactive la validation obligatoire des compétences.
//
//  ⚠️ Ce patch est temporaire (en mémoire uniquement).
//  Il ne modifie pas le site. Il disparaît au rechargement.
// ═══════════════════════════════════════════════════════════════

(function() {
  const TOTAL_MAX = 23;

  // 1. Changer le plafond dans appState
  if (window.appState && window.appState.baremeConfig) {
    window.appState.baremeConfig.totalMax = TOTAL_MAX;
  }

  // 2. Patcher la fonction de mise à jour du barème
  const origUpdateBareme = window.updateBaremeSummary;
  if (origUpdateBareme) {
    window.updateBaremeSummary = function() {
      // Appeler l'original
      origUpdateBareme.apply(this, arguments);

      // Corriger l'affichage et la validation après l'appel original
      const total = Object.values(appState.baremeConfig.exercises || {})
        .reduce((sum, ex) => sum + (ex.totalPoints || 0), 0);

      // Corriger le texte "/ 20 pts" → "/ 23 pts"
      document.querySelectorAll('*').forEach(el => {
        if (el.children.length === 0 && el.textContent.includes('/ 20 pts')) {
          el.innerHTML = el.innerHTML.replace('/ 20 pts', `/ ${TOTAL_MAX} pts`);
        }
        if (el.children.length === 0 && el.textContent.includes('dépasse 20')) {
          el.innerHTML = el.innerHTML.replace('dépasse 20', `dépasse ${TOTAL_MAX}`);
        }
        if (el.children.length === 0 && el.textContent.match(/Reste .* points/)) {
          const reste = (TOTAL_MAX - total).toFixed(1);
          if (total < TOTAL_MAX) {
            el.innerHTML = `ℹ️ Reste ${reste} points à attribuer`;
          }
        }
      });

      // Couleur du total
      const totalSpan = document.getElementById('baremeTotal');
      if (totalSpan) {
        if (total === TOTAL_MAX) totalSpan.style.color = '#28a745';
        else if (total > TOTAL_MAX) totalSpan.style.color = '#dc3545';
        else totalSpan.style.color = '#2196f3';
      }

      // Activer le bouton Continuer si total <= TOTAL_MAX
      const btns = document.querySelectorAll('button');
      btns.forEach(btn => {
        if (btn.textContent.includes('Continuer vers les candidats')) {
          btn.disabled = (total > TOTAL_MAX || total === 0);
        }
      });
    };
  }

  // 3. Patcher la validation finale (continueToCandidates)
  const origContinue = window.continueToCandidates;
  if (origContinue) {
    window.continueToCandidates = function() {
      // Remplacer temporairement alert pour intercepter le message "dépasse 20"
      const origAlert = window.alert;
      window.alert = function(msg) {
        if (msg.includes('dépasse 20') || msg.includes('compétence')) {
          console.log('⏩ Validation bypassed:', msg);
          return; // ignorer
        }
        origAlert.call(window, msg);
      };

      // Forcer le totalMax
      appState.baremeConfig.totalMax = TOTAL_MAX;

      // Appeler l'original
      const result = origContinue.apply(this, arguments);

      // Restaurer alert
      window.alert = origAlert;

      return result;
    };
  }

  // 4. Appliquer immédiatement
  if (window.updateBaremeSummary) {
    window.updateBaremeSummary();
  }

  console.log('✅ Patch appliqué : barème déplafonné à ' + TOTAL_MAX + ' points');
  console.log('📋 Les validations de compétences sont assouplies');
  console.log('💾 Pensez à exporter le JSON quand le barème est configuré');
})();

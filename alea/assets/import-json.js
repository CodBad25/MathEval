// import-json.js — Bouton d'import JSON pour restaurer une évaluation exportée
(function () {
  if (!location.search.includes('correction')) return;

  function waitForApp(cb, tries) {
    if (tries <= 0) return;
    // On attend qu'un bouton ou la zone de correction soit visible
    const section = document.querySelector('section');
    if (section) { cb(); return; }
    setTimeout(() => waitForApp(cb, tries - 1), 500);
  }

  waitForApp(function () {
    // Chercher le bouton d'export JSON existant (il contient "JSON" ou un blob download)
    // On va placer notre bouton dans un bandeau fixe en bas à droite
    const container = document.createElement('div');
    container.id = 'import-json-container';
    container.style.cssText = 'position:fixed;bottom:20px;left:20px;z-index:9999;display:flex;gap:8px;align-items:center;';

    const btn = document.createElement('button');
    btn.innerHTML = '📂 Importer JSON';
    btn.style.cssText = 'padding:8px 16px;background:#2980b9;color:white;border:none;border-radius:8px;cursor:pointer;font-size:13px;font-weight:600;box-shadow:0 2px 8px rgba(0,0,0,.3);transition:background .2s;';
    btn.onmouseenter = () => btn.style.background = '#1a6fa0';
    btn.onmouseleave = () => btn.style.background = '#2980b9';

    const status = document.createElement('span');
    status.style.cssText = 'font-size:12px;color:#fff;background:rgba(0,0,0,.6);padding:4px 10px;border-radius:6px;display:none;';

    btn.addEventListener('click', () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.json';
      input.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
          try {
            const data = JSON.parse(ev.target.result);

            // Validation basique
            if (!data.corrections || !data.students || !data.evaluationData) {
              status.textContent = '❌ Fichier JSON invalide (corrections, students ou evaluationData manquant)';
              status.style.display = 'inline';
              setTimeout(() => status.style.display = 'none', 5000);
              return;
            }

            // Compteurs
            const nbStudents = data.students.filter(s => s.nom).length;
            const nbCorrected = Object.keys(data.corrections).length;

            // Confirmation
            if (!confirm(
              `Importer les données de ce fichier ?\n\n` +
              `• ${nbStudents} élève(s)\n` +
              `• ${nbCorrected} correction(s)\n` +
              `• ${data.evaluationData.length} exercice(s)\n\n` +
              `⚠️ Cela va remplacer les données actuelles.`
            )) return;

            // Import dans localStorage
            localStorage.setItem('studentCorrections', JSON.stringify(data.corrections));
            localStorage.setItem('studentsList', JSON.stringify(data.students));
            localStorage.setItem('evaluationData', JSON.stringify(data.evaluationData));

            if (data.competencesPersonnalisees) {
              localStorage.setItem('competencesPersonnalisees', JSON.stringify(data.competencesPersonnalisees));
            }
            if (data.competencesActivees) {
              localStorage.setItem('competencesActivees', JSON.stringify(data.competencesActivees));
            }
            if (data.modeEvaluation) {
              try {
                const config = JSON.parse(localStorage.getItem('evaluationConfig') || '{}');
                config.modeEvaluation = data.modeEvaluation;
                localStorage.setItem('evaluationConfig', JSON.stringify(config));
              } catch (_) {}
            }

            status.textContent = `✅ ${nbCorrected} corrections importées !`;
            status.style.display = 'inline';

            // Recharger après 1s
            setTimeout(() => location.reload(), 1000);

          } catch (err) {
            status.textContent = '❌ Erreur: ' + err.message;
            status.style.display = 'inline';
            setTimeout(() => status.style.display = 'none', 5000);
          }
        };
        reader.readAsText(file);
      });
      input.click();
    });

    container.appendChild(btn);
    container.appendChild(status);
    document.body.appendChild(container);
  }, 20);
})();

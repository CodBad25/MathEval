// import-json.js — Bouton d'import JSON pour restaurer une évaluation exportée
(function () {
  // Afficher dès que le DOM est prêt, sans condition de page
  function init() {
    if (document.getElementById('import-json-container')) return;

    const container = document.createElement('div');
    container.id = 'import-json-container';
    container.style.cssText = 'position:fixed;bottom:20px;left:20px;z-index:9999;display:flex;gap:8px;align-items:center;';

    const btn = document.createElement('button');
    btn.innerHTML = '📂 Importer JSON';
    btn.style.cssText = 'padding:10px 20px;background:#2980b9;color:white;border:none;border-radius:8px;cursor:pointer;font-size:14px;font-weight:700;box-shadow:0 2px 10px rgba(0,0,0,.35);transition:background .2s;';
    btn.onmouseenter = () => btn.style.background = '#1a6fa0';
    btn.onmouseleave = () => btn.style.background = '#2980b9';

    const status = document.createElement('span');
    status.style.cssText = 'font-size:12px;color:#fff;background:rgba(0,0,0,.7);padding:6px 12px;border-radius:6px;display:none;max-width:300px;';

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

            if (!data.corrections || !data.students || !data.evaluationData) {
              status.textContent = '❌ Fichier invalide (corrections, students ou evaluationData manquant)';
              status.style.display = 'inline';
              setTimeout(() => status.style.display = 'none', 5000);
              return;
            }

            const nbStudents = data.students.filter(s => s.nom).length;
            const nbCorrected = Object.keys(data.corrections).length;

            if (!confirm(
              'Importer les données de ce fichier ?\n\n' +
              '• ' + nbStudents + ' élève(s)\n' +
              '• ' + nbCorrected + ' correction(s)\n' +
              '• ' + data.evaluationData.length + ' exercice(s)\n\n' +
              '⚠️ Cela va remplacer les données actuelles.'
            )) return;

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

            status.textContent = '✅ ' + nbCorrected + ' corrections importées ! Rechargement...';
            status.style.display = 'inline';
            setTimeout(() => location.reload(), 1200);

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
  }

  // Lancer dès que le body existe
  if (document.body) {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }
})();

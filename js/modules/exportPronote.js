// ============================================================================
// MODULE EXPORT PRONOTE — flux Import PDF
// Porté de eval-5a-angles-fractions/export-pronote.js (bilan 5e), branché sur
// les données du flux Import PDF : appState.candidates, exercisesData, scores.
// - Copie TSV sans en-têtes ni noms (format exigé par le collage Pronote)
// - Panneau « Aligner sur la liste Pronote » : matching tolérant des noms,
//   × pour les élèves absents de l'app (listes divergentes)
// Expose window.showPronoteExportModal (bouton dans la vue d'ensemble).
// ============================================================================
(function () {
    'use strict';

    // Seuils de maîtrise — mêmes que le bilan papier 5e (LEVEL_THRESHOLDS
    // TBM 16/20, MS 12/20, MF 8/20) → A ≥80 %, B ≥60 %, C ≥40 %, D <40 %.
    var SEUIL_A = 80, SEUIL_B = 60, SEUIL_C = 40;

    // Ordre des colonnes = ordre du référentiel Pronote (éléments signifiants),
    // vérifié lors du bilan 5e pour que le collage tombe pile sur les colonnes.
    var PRONOTE_ORDER = ['Chercher', 'Modéliser', 'Représenter', 'Raisonner', 'Calculer', 'Communiquer'];

    function pctToLetter(pct) {
        if (pct >= SEUIL_A) return 'A';
        if (pct >= SEUIL_B) return 'B';
        if (pct >= SEUIL_C) return 'C';
        return 'D';
    }

    function letterToColor(letter) {
        return { A: '#28a745', B: '#17a2b8', C: '#ffc107', D: '#dc3545' }[letter] || '#6c757d';
    }

    // Note /20 au format français (virgule décimale)
    function formatNote20(note) {
        var n = Math.round(note * 10) / 10;
        return n.toString().replace('.', ',');
    }

    function esc(x) {
        return String(x).replace(/[&<>]/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c];
        });
    }

    // --- Adaptateur de données : flux Import PDF ---------------------------

    function candidateLabel(candidate) {
        return candidate.name
            || (window.candidateNamesMap || {})[candidate.number]
            || ('Candidat n°' + candidate.number);
    }

    // Un élève est « corrigé » si au moins une question a été notée
    function isCorrected(candidateNumber) {
        var s = appState.scores && appState.scores[candidateNumber];
        if (!s) return false;
        return Object.keys(s).some(function (ex) {
            return s[ex] && Object.keys(s[ex]).length > 0;
        });
    }

    // Agrège les compétences d'un élève sur toute l'éval :
    // { 'Calculer': { earned, total, pct }, ... }
    function competenceScores(candidateNumber) {
        var result = {};
        Object.keys(window.exercisesData || {}).forEach(function (ex) {
            var exercise = exercisesData[ex];
            if (!exercise || !exercise.questions) return;
            exercise.questions.forEach(function (q) {
                (q.competences || []).forEach(function (comp) {
                    if (!comp || !comp.name || !comp.points) return;
                    if (!result[comp.name]) result[comp.name] = { earned: 0, total: 0 };
                    result[comp.name].total += comp.points;
                    var sc = appState.scores
                        && appState.scores[candidateNumber]
                        && appState.scores[candidateNumber][ex]
                        && appState.scores[candidateNumber][ex][q.id];
                    result[comp.name].earned += (sc && sc.competences && sc.competences[comp.name]) || 0;
                });
            });
        });
        Object.keys(result).forEach(function (name) {
            var r = result[name];
            r.pct = r.total > 0 ? (r.earned / r.total) * 100 : 0;
        });
        return result;
    }

    // ===== Alignement sur une liste Pronote — porté de eval-5a / BelEval =====
    function nameTokens(s) {
        return (s || '')
            .toLowerCase()
            .normalize('NFD').replace(/[̀-ͯ]/g, '')
            .replace(/[^a-z\s]/g, ' ')
            .split(/\s+/)
            .filter(function (w) { return w.length >= 2; });
    }

    function nameMatchScore(a, b) {
        var setA = nameTokens(a), setB = nameTokens(b);
        var score = 0;
        setA.forEach(function (w) { if (setB.indexOf(w) !== -1) score++; });
        return score;
    }

    var HEADER_KEYWORDS = [
        'eleves', 'notes', 'note', 'moyenne', 'trimestre', 'devoir', 'competence', 'competences',
        'mobiliser', 'utiliser', 'resoudre', 'comprendre', 'analyser', 'maitriser',
        'outils', 'numerique', 'numeriques', 'nombres', 'decimaux', 'entiers', 'fractions',
        'apprendre', 'echanger', 'exprimer', 'communiquer', 'calculer', 'raisonner',
        'modeliser', 'representer', 'chercher', 'observer', 'restituer'
    ];

    function isLikelyHeader(line) {
        if (line.length > 50) return true;
        var normalized = line.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
        if (HEADER_KEYWORDS.some(function (kw) { return new RegExp('\\b' + kw + '\\b').test(normalized); })) return true;
        if (nameTokens(line).length === 0) return true;
        return false;
    }

    // Aligne une liste de noms Pronote avec les élèves de l'app (match ≥ 2, ou = 1 unique)
    function alignPronoteList(pronoteText, appStudents) {
        var rawLines = pronoteText.split(/\r?\n/).map(function (l) { return l.trim(); }).filter(function (l) { return l.length > 0; });
        var nameLines = [], filteredHeaders = [];
        rawLines.forEach(function (line) {
            if (isLikelyHeader(line)) filteredHeaders.push(line);
            else nameLines.push(line);
        });
        var usedAppNames = {};
        var pronoteLines = nameLines.map(function (raw) {
            var candidates = appStudents
                .filter(function (s) { return !usedAppNames[s.name]; })
                .map(function (s) { return { name: s.name, score: nameMatchScore(raw, s.name) }; })
                .filter(function (c) { return c.score >= 1; })
                .sort(function (a, b) { return b.score - a.score; });
            if (candidates.length === 0) return { raw: raw, matched: null };
            if (candidates[0].score >= 2) { usedAppNames[candidates[0].name] = true; return { raw: raw, matched: candidates[0].name }; }
            var sameScore = candidates.filter(function (c) { return c.score === 1; });
            if (sameScore.length === 1) { usedAppNames[sameScore[0].name] = true; return { raw: raw, matched: sameScore[0].name }; }
            return { raw: raw, matched: null };
        });
        var unmatchedAppNames = appStudents
            .map(function (s) { return s.name; })
            .filter(function (n) { return !usedAppNames[n]; });
        return { pronoteLines: pronoteLines, filteredHeaders: filteredHeaders, unmatchedAppNames: unmatchedAppNames };
    }

    // --- Modale -------------------------------------------------------------

    function showPronoteExportModal() {
        if (!window.appState || !appState.candidates || !appState.candidates.length) {
            alert('Aucun élève chargé.');
            return;
        }
        if (!window.exercisesData || !Object.keys(exercisesData).length) {
            alert('Aucun barème chargé. Finalisez d\'abord l\'import du sujet.');
            return;
        }

        // Compétences réellement évaluées (total > 0 pour au moins un élève corrigé)
        var evaluated = {};
        appState.candidates.forEach(function (c) {
            if (!isCorrected(c.number)) return;
            var cs = competenceScores(c.number);
            Object.keys(cs).forEach(function (name) {
                if (cs[name].total > 0) evaluated[name] = true;
            });
        });
        if (!Object.keys(evaluated).length) {
            alert('Aucune correction trouvée. Corrigez au moins une copie.');
            return;
        }

        var comps = PRONOTE_ORDER.filter(function (c) { return evaluated[c]; });
        // Compétences hors référentiel (personnalisées) ajoutées en fin
        Object.keys(evaluated).forEach(function (c) {
            if (comps.indexOf(c) === -1) comps.push(c);
        });

        // Lignes : tous les élèves, triés par nom (ordre alphabétique Pronote)
        var rows = appState.candidates.map(function (c) {
            return { number: c.number, nom: candidateLabel(c) };
        }).sort(function (a, b) {
            return a.nom.toUpperCase().localeCompare(b.nom.toUpperCase(), 'fr');
        });

        // Colonnes [note, ...lettres] pour un élève ('ABS' si non corrigé)
        function rowValues(number) {
            if (!isCorrected(number)) {
                return ['ABS'].concat(comps.map(function () { return 'ABS'; }));
            }
            var details = calculateCandidateDetails(number);
            var cs = competenceScores(number);
            var levels = comps.map(function (c) {
                return (cs[c] && cs[c].total > 0) ? pctToLetter(cs[c].pct) : '';
            });
            return [formatNote20(details.noteOn20)].concat(levels);
        }

        // --- Tableau HTML ---
        var tableHTML = '<table style="border-collapse:collapse;width:100%;font-size:14px;font-family:Arial,sans-serif">';
        tableHTML += '<thead><tr style="background:#2c3e50;color:white">';
        tableHTML += '<th style="padding:8px 12px;text-align:left;border:1px solid #34495e">Nom</th>';
        tableHTML += '<th style="padding:8px 12px;text-align:center;border:1px solid #34495e">Note /20</th>';
        comps.forEach(function (h) {
            tableHTML += '<th style="padding:8px 12px;text-align:center;border:1px solid #34495e">' + esc(h) + '</th>';
        });
        tableHTML += '</tr></thead><tbody>';

        rows.forEach(function (row, i) {
            var bg = i % 2 === 0 ? '#fff' : '#f8f9fa';
            var corrected = isCorrected(row.number);
            tableHTML += '<tr style="background:' + bg + '">';
            tableHTML += '<td style="padding:6px 10px;border:1px solid #dee2e6;font-weight:500">' + esc(row.nom) + '</td>';
            if (!corrected) {
                tableHTML += '<td style="padding:6px 10px;border:1px solid #dee2e6;text-align:center;color:#999">ABS</td>';
                comps.forEach(function () {
                    tableHTML += '<td style="padding:6px 10px;border:1px solid #dee2e6;text-align:center;color:#999">ABS</td>';
                });
            } else {
                var values = rowValues(row.number);
                tableHTML += '<td style="padding:6px 10px;border:1px solid #dee2e6;text-align:center;font-weight:600">' + values[0] + '</td>';
                values.slice(1).forEach(function (letter) {
                    if (letter) {
                        tableHTML += '<td style="padding:6px 10px;border:1px solid #dee2e6;text-align:center;font-weight:bold;color:' + letterToColor(letter) + '">' + letter + '</td>';
                    } else {
                        tableHTML += '<td style="padding:6px 10px;border:1px solid #dee2e6;text-align:center"></td>';
                    }
                });
            }
            tableHTML += '</tr>';
        });
        tableHTML += '</tbody></table>';

        var legend = '<div style="margin-top:12px;font-size:12px;color:#666;display:flex;gap:16px;flex-wrap:wrap">'
            + '<span><b style="color:#28a745">A</b> = Très bonne maîtrise (≥' + SEUIL_A + '%)</span>'
            + '<span><b style="color:#17a2b8">B</b> = Maîtrise satisfaisante (≥' + SEUIL_B + '%)</span>'
            + '<span><b style="color:#ffc107">C</b> = Maîtrise fragile (≥' + SEUIL_C + '%)</span>'
            + '<span><b style="color:#dc3545">D</b> = Maîtrise insuffisante (<' + SEUIL_C + '%)</span>'
            + '</div>';

        // --- Overlay + modale ---
        var overlay = document.createElement('div');
        overlay.id = 'pronote-overlay';
        overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:10000;display:flex;align-items:center;justify-content:center';
        overlay.addEventListener('click', function (e) { if (e.target === overlay) overlay.remove(); });

        var modal = document.createElement('div');
        modal.style.cssText = 'background:white;border-radius:12px;padding:24px;max-width:90vw;max-height:85vh;overflow:auto;box-shadow:0 20px 60px rgba(0,0,0,0.3)';

        modal.innerHTML =
            '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">'
            + '<h2 style="margin:0;font-size:20px;color:#2c3e50">📊 Export Pronote — Notes &amp; compétences</h2>'
            + '<button id="pronote-close" style="background:none;border:none;font-size:24px;cursor:pointer;color:#999;padding:4px 8px">&times;</button>'
            + '</div>'
            + '<p style="margin:0 0 12px;color:#666;font-size:13px">'
            + 'Le bouton <b>Copier notes + compétences</b> copie un tableau sans en-têtes ni noms, '
            + 'à coller directement dans la grille Pronote (élèves triés par ordre alphabétique).'
            + '</p>'
            + '<div style="display:flex;gap:8px;margin-bottom:16px;flex-wrap:wrap">'
            + '<button id="pronote-copy-comps" style="padding:8px 16px;background:#2980b9;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:13px">📋 Copier notes + compétences</button>'
            + '<button id="pronote-copy-all" style="padding:8px 16px;background:#27ae60;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:13px">📋 Copier tout le tableau</button>'
            + '<button id="pronote-download" style="padding:8px 16px;background:#8e44ad;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:13px">💾 Télécharger CSV</button>'
            + '</div>'
            + '<details style="margin:0 0 16px;border:1px solid #e0e0e0;border-radius:8px;padding:12px;background:#fafbfc">'
            + '<summary style="cursor:pointer;font-weight:600;color:#2c3e50;font-size:14px">🎯 Aligner sur la liste Pronote (si des élèves sont absents / listes différentes)</summary>'
            + '<p style="margin:8px 0;color:#666;font-size:12px">Copie la colonne <b>Nom</b> depuis Pronote et colle-la ci-dessous. '
            + 'J\'aligne tes résultats sur cette liste : les élèves <b>absents</b> reçoivent <b>×</b>, l\'ordre suit exactement Pronote.</p>'
            + '<textarea id="pronote-align-input" placeholder="Colle ici les noms des élèves depuis Pronote (un par ligne)…" style="width:100%;min-height:90px;border:1px solid #ccc;border-radius:6px;padding:8px;font-family:monospace;font-size:12px;box-sizing:border-box"></textarea>'
            + '<div style="display:flex;gap:8px;margin-top:8px;align-items:center;flex-wrap:wrap">'
            + '<button id="pronote-align-btn" style="padding:8px 16px;background:#e67e22;color:white;border:none;border-radius:6px;cursor:pointer;font-weight:600;font-size:13px">🔗 Aligner &amp; copier</button>'
            + '<span id="pronote-align-summary" style="font-size:12px;color:#444"></span>'
            + '</div>'
            + '<div id="pronote-align-preview" style="margin-top:10px;max-height:300px;overflow:auto"></div>'
            + '</details>'
            + tableHTML
            + legend;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        document.getElementById('pronote-close').addEventListener('click', function () { overlay.remove(); });

        // Copier notes + compétences — TSV SANS en-tête ni nom (coller direct dans Pronote)
        document.getElementById('pronote-copy-comps').addEventListener('click', function () {
            var lines = rows.map(function (row) { return rowValues(row.number).join('\t'); });
            navigator.clipboard.writeText(lines.join('\n')).then(function () {
                showCopyFeedback('pronote-copy-comps', 'Notes + compétences copiées !');
            });
        });

        // Copier tout le tableau — avec en-têtes + Nom
        document.getElementById('pronote-copy-all').addEventListener('click', function () {
            var lines = [['Nom', 'Note'].concat(comps).join('\t')];
            rows.forEach(function (row) {
                lines.push([row.nom].concat(rowValues(row.number)).join('\t'));
            });
            navigator.clipboard.writeText(lines.join('\n')).then(function () {
                showCopyFeedback('pronote-copy-all', 'Tableau copié !');
            });
        });

        // Télécharger CSV — séparateur « ; » + BOM UTF-8 (Excel/LibreOffice)
        document.getElementById('pronote-download').addEventListener('click', function () {
            var sep = ';';
            var lines = [['Nom', 'Note'].concat(comps).join(sep)];
            rows.forEach(function (row) {
                lines.push([row.nom].concat(rowValues(row.number)).join(sep));
            });
            var blob = new Blob(['\uFEFF' + lines.join('\n')], { type: 'text/csv;charset=utf-8' });
            var url = URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = 'export_pronote_notes_competences.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        });

        // Aligner sur Pronote : colle les noms Pronote → TSV aligné (ordre Pronote, absents = ×)
        document.getElementById('pronote-align-btn').addEventListener('click', function () {
            var text = document.getElementById('pronote-align-input').value || '';
            var summaryEl = document.getElementById('pronote-align-summary');
            var previewEl = document.getElementById('pronote-align-preview');
            if (!text.trim()) {
                summaryEl.textContent = 'Colle d\'abord la liste Pronote ci-dessus.';
                previewEl.innerHTML = '';
                return;
            }

            var appStudents = rows.map(function (r) { return { name: r.nom, number: r.number }; });
            var aligned = alignPronoteList(text, appStudents);
            var byName = {};
            rows.forEach(function (r) { byName[r.nom] = r; });

            var tsvLines = aligned.pronoteLines.map(function (pl) {
                return pl.matched
                    ? rowValues(byName[pl.matched].number).join('\t')
                    : ['×'].concat(comps.map(function () { return '×'; })).join('\t');
            });
            navigator.clipboard.writeText(tsvLines.join('\n'));

            var matched = aligned.pronoteLines.filter(function (p) { return p.matched; }).length;
            var absent = aligned.pronoteLines.length - matched;
            summaryEl.innerHTML = '✅ Copié ! ✓ <b>' + matched + '</b> alignés · ✗ <b>' + absent + '</b> absent(s) (×) · 🧹 '
                + aligned.filteredHeaders.length + ' en-tête(s) ignoré(s)';

            var html = '<table style="width:100%;border-collapse:collapse;font-size:12px"><thead><tr style="background:#34495e;color:#fff">'
                + '<th style="padding:4px 8px;text-align:left">#</th><th style="padding:4px 8px;text-align:left">Ligne Pronote</th>'
                + '<th style="padding:4px 8px;text-align:left">→ Élève app</th><th style="padding:4px 8px">Note</th></tr></thead><tbody>';
            aligned.pronoteLines.forEach(function (pl, i) {
                if (pl.matched) {
                    var r = byName[pl.matched];
                    var note = isCorrected(r.number) ? formatNote20(calculateCandidateDetails(r.number).noteOn20) : 'ABS';
                    html += '<tr><td style="padding:3px 8px;border-bottom:1px solid #eee;color:#999">' + (i + 1) + '</td>'
                        + '<td style="padding:3px 8px;border-bottom:1px solid #eee">' + esc(pl.raw) + '</td>'
                        + '<td style="padding:3px 8px;border-bottom:1px solid #eee;color:#27ae60">' + esc(r.nom) + '</td>'
                        + '<td style="padding:3px 8px;border-bottom:1px solid #eee;text-align:center;font-weight:600">' + note + '</td></tr>';
                } else {
                    html += '<tr style="background:#fff5f5"><td style="padding:3px 8px;border-bottom:1px solid #eee;color:#999">' + (i + 1) + '</td>'
                        + '<td style="padding:3px 8px;border-bottom:1px solid #eee">' + esc(pl.raw) + '</td>'
                        + '<td style="padding:3px 8px;border-bottom:1px solid #eee;color:#e74c3c">× absent / non trouvé</td>'
                        + '<td style="padding:3px 8px;border-bottom:1px solid #eee;text-align:center;color:#e74c3c">×</td></tr>';
                }
            });
            html += '</tbody></table>';
            if (aligned.unmatchedAppNames.length) {
                html += '<div style="margin-top:8px;padding:8px;background:#fdecea;border-radius:6px;color:#c0392b;font-size:12px">'
                    + '<b>⚠️ ' + aligned.unmatchedAppNames.length + ' élève(s) de l\'app absent(s) de ta liste Pronote</b>'
                    + ' — leur note ne sera PAS exportée. Vérifie : ' + esc(aligned.unmatchedAppNames.join(', ')) + '</div>';
            }
            previewEl.innerHTML = html;
        });
    }

    function showCopyFeedback(btnId, msg) {
        var btn = document.getElementById(btnId);
        if (!btn) return;
        var original = btn.innerHTML;
        btn.innerHTML = '✅ ' + msg;
        btn.style.background = '#27ae60';
        setTimeout(function () { btn.innerHTML = original; btn.style.background = ''; }, 2000);
    }

    window.showPronoteExportModal = showPronoteExportModal;
})();

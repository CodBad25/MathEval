// ============================================================================
// MODULE BAREME CONFIG - Points + compétences chips (hiérarchie exercice/question)
// ============================================================================

function renderPdfBaremeConfig() {
    var container = document.getElementById('pdfBaremeContent');
    var exercises = appState.pdfImport.exercises || [];

    if (exercises.length === 0) {
        container.innerHTML = '<p style="text-align:center;color:#999;">Aucun exercice détecté.</p>';
        return;
    }

    // Bouton suggestion auto global
    var autoBtn = '<div style="margin-bottom:12px;text-align:right;">' +
        '<button onclick="autoSuggestAllCompetences()" style="padding:8px 16px;background:#8b5cf6;color:white;border:none;border-radius:8px;cursor:pointer;font-weight:600;font-size:0.9em;">Suggestion auto des compétences</button>' +
        '</div>';

    var exColors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

    container.innerHTML = exercises.map(function (ex, ei) {
        var color = exColors[ei % exColors.length];

        var questionsHtml = ex.questions.map(function (q, qi) {
            return '<div style="margin-left:16px;padding:15px;margin-bottom:8px;border-radius:8px;background:#f8fafc;border-left:3px solid ' + color + ';">' +
                '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">' +
                '<strong style="color:#2c3e50;">Q' + q.num + '</strong>' +
                '<div style="display:flex;align-items:center;gap:8px;">' +
                '<label style="font-weight:600;color:#555;font-size:0.85em;">Points :</label>' +
                '<input type="number" min="0.5" max="20" step="0.5" value="' + q.points + '" ' +
                'onchange="setPdfQuestionPoints(' + ei + ',' + qi + ', this.value)" ' +
                'style="width:65px;padding:5px;border:2px solid #d1d5db;border-radius:6px;text-align:center;font-weight:bold;">' +
                '</div></div>' +
                (q.text ? '<div style="font-size:0.85em;color:#666;margin-bottom:8px;font-style:italic;">' + escapeHtml(cleanLatexForDisplay(q.text)) + '</div>' : '') +
                '<div style="margin-bottom:6px;font-weight:600;color:#555;font-size:0.8em;">Compétences :</div>' +
                '<div id="pdfQComp_' + ei + '_' + qi + '" style="display:flex;flex-wrap:wrap;gap:5px;"></div>' +
                '</div>';
        }).join('');

        var exTotal = ex.questions.reduce(function (s, q) { return s + (q.points || 0); }, 0);

        return '<div style="background:white;padding:16px;border-radius:12px;box-shadow:0 2px 8px rgba(0,0,0,0.08);margin-bottom:12px;">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;padding-bottom:8px;border-bottom:2px solid ' + color + '30;">' +
            '<h3 style="color:' + color + ';margin:0;">' + ex.title + '</h3>' +
            '<span style="color:#666;font-size:0.9em;">' + exTotal + ' pts — ' + ex.questions.length + ' question(s)</span>' +
            '</div>' +
            '<div style="margin-bottom:10px;padding:8px 12px;background:' + color + '08;border-radius:8px;">' +
            '<div style="font-size:0.8em;font-weight:600;color:#555;margin-bottom:6px;">Compétences pour tout l\'exercice :</div>' +
            '<div id="pdfExComp_' + ei + '" style="display:flex;flex-wrap:wrap;gap:5px;"></div>' +
            '</div>' +
            questionsHtml +
            '</div>';
    }).join('');

    // Ajouter le bouton suggestion auto en haut
    container.innerHTML = autoBtn + container.innerHTML;

    // Rendre les chips au niveau exercice + chaque question
    exercises.forEach(function (ex, ei) {
        renderExerciseCompetenceChips(ei);
        ex.questions.forEach(function (q, qi) {
            renderPdfCompetenceChips(ei, qi);
        });
    });
    updatePdfTotalPoints();
}

function renderPdfCompetenceChips(exIndex, qIndex) {
    var container = document.getElementById('pdfQComp_' + exIndex + '_' + qIndex);
    if (!container) return;
    var q = appState.pdfImport.exercises[exIndex].questions[qIndex];
    var allComps = defaultCompetences.concat(appState.pdfImport.customCompetences);

    container.innerHTML = allComps.map(function (comp, ci) {
        var sel = q.competences.indexOf(comp.name) >= 0;
        var bg = sel ? comp.color : 'white';
        var fg = sel ? 'white' : comp.color;
        return '<button type="button" onclick="togglePdfCompetenceByIndex(' + exIndex + ',' + qIndex + ',' + ci + ')" ' +
            'style="padding:5px 10px;border:2px solid ' + comp.color + ';border-radius:18px;cursor:pointer;' +
            'font-weight:600;background:' + bg + ';color:' + fg + ';font-size:0.8em;transition:all 0.2s;">' +
            comp.icon + ' ' + comp.name + '</button>';
    }).join('') +
    '<button type="button" onclick="promptAddCustomCompetence()" ' +
    'style="padding:5px 10px;border:2px dashed #9ca3af;border-radius:18px;cursor:pointer;' +
    'background:white;color:#6b7280;font-size:0.8em;">+ Ajouter</button>';
}

function renderExerciseCompetenceChips(exIndex) {
    var container = document.getElementById('pdfExComp_' + exIndex);
    if (!container) return;
    var ex = appState.pdfImport.exercises[exIndex];
    var allComps = defaultCompetences.concat(appState.pdfImport.customCompetences);

    // Déterminer quelles compétences sont communes à TOUTES les questions
    var commonComps = [];
    if (ex.questions.length > 0) {
        allComps.forEach(function (comp) {
            var allHave = ex.questions.every(function (q) {
                return q.competences.indexOf(comp.name) >= 0;
            });
            if (allHave) commonComps.push(comp.name);
        });
    }

    container.innerHTML = allComps.map(function (comp, ci) {
        var sel = commonComps.indexOf(comp.name) >= 0;
        var bg = sel ? comp.color : 'white';
        var fg = sel ? 'white' : comp.color;
        return '<button type="button" onclick="toggleExerciseCompetenceByIndex(' + exIndex + ',' + ci + ')" ' +
            'style="padding:5px 10px;border:2px solid ' + comp.color + ';border-radius:18px;cursor:pointer;' +
            'font-weight:600;background:' + bg + ';color:' + fg + ';font-size:0.8em;transition:all 0.2s;">' +
            comp.icon + ' ' + comp.name + '</button>';
    }).join('');
}

function toggleExerciseCompetenceByIndex(exIndex, compIndex) {
    var allComps = defaultCompetences.concat(appState.pdfImport.customCompetences);
    var compName = allComps[compIndex].name;
    toggleExerciseCompetence(exIndex, compName);
}

function toggleExerciseCompetence(exIndex, compName) {
    var ex = appState.pdfImport.exercises[exIndex];
    // Vérifier si toutes les questions ont cette compétence
    var allHave = ex.questions.every(function (q) {
        return q.competences.indexOf(compName) >= 0;
    });

    // Toggle : si toutes l'ont → retirer de toutes, sinon → ajouter à toutes
    ex.questions.forEach(function (q) {
        var idx = q.competences.indexOf(compName);
        if (allHave) {
            if (idx >= 0) q.competences.splice(idx, 1);
        } else {
            if (idx < 0) q.competences.push(compName);
        }
    });

    // Rafraîchir les chips exercice + toutes les questions
    renderExerciseCompetenceChips(exIndex);
    ex.questions.forEach(function (q, qi) {
        renderPdfCompetenceChips(exIndex, qi);
    });
}

function togglePdfCompetenceByIndex(exIndex, qIndex, compIndex) {
    var allComps = defaultCompetences.concat(appState.pdfImport.customCompetences);
    togglePdfCompetence(exIndex, qIndex, allComps[compIndex].name);
}

function togglePdfCompetence(exIndex, qIndex, compName) {
    var comps = appState.pdfImport.exercises[exIndex].questions[qIndex].competences;
    var idx = comps.indexOf(compName);
    if (idx >= 0) comps.splice(idx, 1); else comps.push(compName);
    renderPdfCompetenceChips(exIndex, qIndex);
    renderExerciseCompetenceChips(exIndex);
}

function setPdfQuestionPoints(exIndex, qIndex, value) {
    appState.pdfImport.exercises[exIndex].questions[qIndex].points = parseFloat(value) || 1;
    updatePdfTotalPoints();
}

function updatePdfTotalPoints() {
    var total = 0;
    (appState.pdfImport.exercises || []).forEach(function (ex) {
        ex.questions.forEach(function (q) {
            total += (q.points || 0);
        });
    });
    var el = document.getElementById('pdfCurrentTotal');
    if (el) el.textContent = total;
}

// ============================================================================
// SUGGESTION AUTO DES COMPÉTENCES (par mots-clés, gratuit, hors-ligne)
// ============================================================================

// Heuristiques basées sur le BO 2026 (nouveaux programmes Cycle 4 + 6e)
// Source : analyse-programmes-cycle4, section "Les 6 compétences mathématiques"
var COMPETENCE_KEYWORDS = {
    'Chercher': [
        // "S'engager dans une démarche, explorer"
        'chercher', 'trouver', 'identifier', 'repérer',
        'extraire', 'explorer', 'tester', 'essayer',
        'quelles sont', 'quel est', 'quelle est',
        'combien de droites', 'combien de',
        'comparer', 'ranger', 'classer', 'ordonner',
        'compléter par <', 'compléter par >',
        'hypothèse', 'décomposer',
        'quel score', 'quel résultat'
    ],
    'Modéliser': [
        // "Traduire en langage mathématique"
        'modéliser', 'traduire', 'mettre en équation', 'équation',
        'programme de calcul', 'tableur', 'algorithme', 'scratch',
        'proportionnel', 'probabilit', 'arbre',
        'situation', 'problème ouvert',
        'passer du problème', 'mise en équation'
    ],
    'Représenter': [
        // "Utiliser des schémas, graphiques, expressions"
        'construire', 'tracer', 'placer', 'dessiner', 'représenter',
        'figure', 'schéma', 'graphique', 'diagramme',
        'repère', 'droite graduée', 'axe gradué',
        'symétrique', 'symétrie', 'par rapport', 'centre de symétrie', 'axe de symétrie',
        'médiatrice', 'hauteur', 'bissectrice',
        'perpendiculaire', 'parallèle',
        'compléter le tableau', 'compléter les', 'remplir',
        'compléter les thermomètres',
        'patron', 'solide', 'perspective',
        'boîte à moustaches', 'histogramme',
        'courbe', 'fonction',
        'laisser les traits', 'laisser apparents', 'traits de construction'
    ],
    'Calculer': [
        // "Effectuer des calculs, contrôler les résultats"
        'calculer', 'effectuer', 'développer', 'factoriser', 'réduire', 'simplifier',
        'résoudre', 'déterminer la valeur', 'donner la valeur',
        'somme', 'différence', 'produit', 'quotient',
        'pourcentage', 'fraction', 'proportion',
        'distance', 'périmètre', 'aire', 'volume', 'mesure de',
        'coordonnées', 'abscisse', 'ordonnée', 'milieu',
        'moyenne', 'médiane', 'étendue', 'fréquence', 'effectif',
        'puissance', 'racine', 'carré',
        'mesure de l\'angle', 'l\'angle', 'les angles', 'un angle', 'des angles',
        'calcul mental', 'ordre de grandeur',
        'enchaîner', 'algébrique'
    ],
    'Raisonner': [
        // "Justifier, démontrer, analyser ses erreurs"
        'montrer que', 'démontrer', 'prouver', 'justifier',
        'en déduire', 'conclure', 'en justifiant',
        'vrai ou faux', 'est-il possible', 'est-ce que',
        'propriété', 'théorème', 'réciproque', 'contraposée',
        'conjecturer', 'contre-exemple',
        'définition', 'caractéristique',
        'que peut-on dire', 'que peut-on en déduire',
        'pourquoi', 'car', 'donc',
        'raisonnement', 'logique'
    ],
    'Communiquer': [
        // "Expliquer, argumenter, confronter"
        'que remarque', 'que constate', 'expliquer', 'décrire',
        'rédiger', 'écrire', 'formuler', 'argumenter',
        'présenter', 'exposer', 'justifier sa réponse',
        'laisser les traits', 'laisser apparents', 'traits de construction',
        'même question', 'de même',
        'donner les coordonnées', 'donner le nom',
        'nommer', 'citer', 'lire'
    ]
};

function autoSuggestAllCompetences() {
    var exercises = appState.pdfImport.exercises || [];
    var total = 0;

    exercises.forEach(function (ex, ei) {
        // Collecter le texte de toutes les questions pour le contexte de l'exercice
        var exContext = ex.title + ' ' + ex.questions.map(function(q) { return q.text || ''; }).join(' ');

        ex.questions.forEach(function (q) {
            var suggested = suggestCompetencesForText(q.text, ex.title);
            // Si rien trouvé pour la question, utiliser le contexte global de l'exercice
            if (suggested.length === 0) {
                suggested = suggestCompetencesForText(exContext, '');
            }
            if (suggested.length > 0) {
                q.competences = suggested;
                total++;
            }
        });
    });

    console.log('✅ Compétences suggérées pour ' + total + ' questions');
    renderPdfBaremeConfig();
}

function suggestCompetencesForText(text, exerciseTitle) {
    if (!text && !exerciseTitle) return [];

    // Nettoyer le LaTeX pour la recherche
    var clean = (text || '').replace(/\$[^$]*\$/g, ' formule ')
        .replace(/\\[a-zA-Z]+/g, ' ')
        .replace(/[{}^_]/g, ' ')
        .toLowerCase();

    // Ajouter le titre de l'exercice au contexte de recherche
    if (exerciseTitle) clean = exerciseTitle.toLowerCase() + ' ' + clean;

    var found = [];

    Object.keys(COMPETENCE_KEYWORDS).forEach(function (compName) {
        var keywords = COMPETENCE_KEYWORDS[compName];
        for (var i = 0; i < keywords.length; i++) {
            if (clean.indexOf(keywords[i]) >= 0) {
                found.push(compName);
                break;
            }
        }
    });

    return found;
}

/**
 * Nettoie le LaTeX brut pour un affichage lisible
 */
function cleanLatexForDisplay(text) {
    if (!text) return '';
    return text
        .replace(/\$\\qquad\s*/g, ' ')
        .replace(/\\qquad/g, ' ')
        .replace(/\\[Ll]eftrightarrow/g, '↔')
        .replace(/\\[Rr]ightarrow/g, '→')
        .replace(/\\[Ll]eftarrow/g, '←')
        .replace(/\\circ/g, '°')
        .replace(/\\textC/g, '°C')
        .replace(/\\textF/g, '°F')
        .replace(/\\text\{([^}]*)\}/g, '$1')
        .replace(/\\frac\{([^}]*)\}\{([^}]*)\}/g, '$1/$2')
        .replace(/\\times/g, '×')
        .replace(/\\div/g, '÷')
        .replace(/\\leq/g, '≤')
        .replace(/\\geq/g, '≥')
        .replace(/\\neq/g, '≠')
        .replace(/\\pm/g, '±')
        .replace(/\\sqrt\{([^}]*)\}/g, '√($1)')
        .replace(/\\[a-zA-Z]+/g, ' ')
        .replace(/\^\{([^}]*)\}/g, '$1')
        .replace(/\^(\w)/g, '$1')
        .replace(/\$\$/g, '')
        .replace(/\$/g, '')
        .replace(/[{}]/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function promptAddCustomCompetence() {
    var name = prompt('Nom de la compétence :');
    if (!name || !name.trim()) return;
    var colors = ['#e11d48', '#0891b2', '#7c3aed', '#ca8a04', '#16a34a', '#dc2626'];
    var color = colors[appState.pdfImport.customCompetences.length % colors.length];
    appState.pdfImport.customCompetences.push({ name: name.trim(), icon: '📋', color: color });
    // Re-rendre tous les chips
    (appState.pdfImport.exercises || []).forEach(function (ex, ei) {
        ex.questions.forEach(function (q, qi) { renderPdfCompetenceChips(ei, qi); });
    });
}

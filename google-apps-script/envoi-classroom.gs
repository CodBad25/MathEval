/**
 * =====================================================
 * Envoi de bilans individuels via Google Classroom
 * =====================================================
 *
 * INSTALLATION :
 * 1. Aller sur https://script.google.com → Nouveau projet
 * 2. Copier-coller ce script
 * 3. Renommer le projet (ex: "Envoi Bilans Classroom")
 * 4. Menu Services (+) → Ajouter "Google Classroom API"
 * 5. Exécuter setupConfig() une première fois pour autoriser les accès
 * 6. Configurer les variables dans CONFIG ci-dessous
 * 7. Exécuter envoyerBilans()
 *
 * WORKFLOW :
 * 1. Depuis MathEval, cliquer "Bilans PDF" → "📦 ZIP individuels"
 * 2. Dézipper et mettre les PDFs dans un dossier Google Drive
 *    (les fichiers doivent être nommés : Bilan_NOM_Prenom.pdf)
 * 3. Renseigner le nom du dossier dans CONFIG.DRIVE_FOLDER
 * 4. Exécuter envoyerBilans()
 */

// ==================== CONFIGURATION ====================
const CONFIG = {
  // Nom exact du dossier Google Drive contenant les PDFs
  DRIVE_FOLDER: 'Bilans MathEval',

  // Nom (ou partie du nom) du cours Google Classroom
  COURSE_NAME: '5BD3',

  // Titre du document dans Classroom
  MATERIAL_TITLE: "Bilan d'évaluation — Mathématiques",

  // Description visible par l'élève
  MATERIAL_DESCRIPTION: "Voici ton bilan individuel pour cette évaluation. Tu y trouveras ta note, tes compétences et les statistiques de la classe.",

  // Topic/Thème dans Classroom (optionnel, laisser vide pour aucun)
  TOPIC_NAME: '',
};

// ==================== FONCTIONS PRINCIPALES ====================

/**
 * Fonction principale : envoie chaque PDF au bon élève
 */
function envoyerBilans() {
  // 1. Trouver le dossier Drive
  const folder = trouverDossier(CONFIG.DRIVE_FOLDER);
  if (!folder) {
    Logger.log('❌ Dossier non trouvé : ' + CONFIG.DRIVE_FOLDER);
    SpreadsheetApp.getUi?.().alert('Dossier non trouvé : ' + CONFIG.DRIVE_FOLDER);
    return;
  }

  // 2. Lire les PDFs du dossier
  const pdfs = lirePDFs(folder);
  Logger.log('📂 ' + Object.keys(pdfs).length + ' PDF(s) trouvé(s) dans le dossier');

  // 3. Trouver le cours Classroom
  const course = trouverCours(CONFIG.COURSE_NAME);
  if (!course) {
    Logger.log('❌ Cours non trouvé : ' + CONFIG.COURSE_NAME);
    return;
  }
  Logger.log('📚 Cours trouvé : ' + course.name + ' (ID: ' + course.id + ')');

  // 4. Récupérer les élèves du cours
  const students = listerEleves(course.id);
  Logger.log('👥 ' + students.length + ' élève(s) dans le cours');

  // 5. Trouver le topic (optionnel)
  let topicId = null;
  if (CONFIG.TOPIC_NAME) {
    topicId = trouverOuCreerTopic(course.id, CONFIG.TOPIC_NAME);
  }

  // 6. Matcher et envoyer
  let envoyés = 0, nonTrouvés = [];

  for (const student of students) {
    const nom = student.profile.name.familyName || '';
    const prenom = student.profile.name.givenName || '';
    const fullName = nom + ' ' + prenom;

    // Chercher le PDF correspondant
    const pdf = matcherPDF(pdfs, nom, prenom);

    if (!pdf) {
      nonTrouvés.push(fullName);
      Logger.log('⚠️ Pas de PDF pour : ' + fullName);
      continue;
    }

    // Partager le fichier avec l'élève (lecture seule)
    try {
      pdf.file.addViewer(student.profile.emailAddress);
    } catch(e) {
      Logger.log('⚠️ Impossible de partager avec ' + student.profile.emailAddress + ': ' + e.message);
    }

    // Créer le document individuel dans Classroom
    try {
      const material = {
        title: CONFIG.MATERIAL_TITLE,
        description: CONFIG.MATERIAL_DESCRIPTION,
        materials: [{
          driveFile: {
            driveFile: { id: pdf.file.getId() },
            shareMode: 'VIEW'
          }
        }],
        assigneeMode: 'INDIVIDUAL_STUDENTS',
        individualStudentsOptions: {
          studentIds: [student.userId]
        },
        state: 'PUBLISHED'
      };

      if (topicId) material.topicId = topicId;

      Classroom.Courses.CourseWorkMaterials.create(material, course.id);
      envoyés++;
      Logger.log('✅ Envoyé à ' + fullName + ' → ' + pdf.file.getName());
    } catch(e) {
      Logger.log('❌ Erreur pour ' + fullName + ': ' + e.message);
    }
  }

  // 7. Résumé
  const résumé = '📊 Résultat :\n' +
    '✅ ' + envoyés + ' bilan(s) envoyé(s)\n' +
    (nonTrouvés.length ? '⚠️ ' + nonTrouvés.length + ' élève(s) sans PDF : ' + nonTrouvés.join(', ') : '🎉 Tous les élèves ont reçu leur bilan !');
  Logger.log(résumé);
}

// ==================== FONCTIONS UTILITAIRES ====================

function trouverDossier(name) {
  const folders = DriveApp.getFoldersByName(name);
  return folders.hasNext() ? folders.next() : null;
}

function lirePDFs(folder) {
  const pdfs = {};
  const files = folder.getFilesByType('application/pdf');
  while (files.hasNext()) {
    const f = files.next();
    const name = f.getName();
    // Extraire NOM et Prénom du filename : Bilan_NOM_Prenom.pdf
    const match = name.match(/^Bilan_([^_]+)(?:_(.+))?\.pdf$/i);
    if (match) {
      const key = normaliser(match[1]);
      pdfs[key] = {
        file: f,
        nom: match[1],
        prenom: match[2] || '',
        fileName: name
      };
    } else {
      Logger.log('⚠️ Fichier ignoré (format inattendu) : ' + name);
    }
  }
  return pdfs;
}

function normaliser(str) {
  return (str || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase().trim().replace(/[_\s]+/g, ' ');
}

function matcherPDF(pdfs, nom, prenom) {
  const nomNorm = normaliser(nom);
  const prenomNorm = normaliser(prenom);

  // Match exact par nom de famille
  if (pdfs[nomNorm]) return pdfs[nomNorm];

  // Match partiel (le nom du PDF contient le nom de famille)
  for (const key of Object.keys(pdfs)) {
    if (key.includes(nomNorm) || nomNorm.includes(key)) return pdfs[key];
  }

  // Match par nom + prénom combiné
  const full = nomNorm + ' ' + prenomNorm;
  for (const key of Object.keys(pdfs)) {
    const pdfFull = normaliser(pdfs[key].nom + ' ' + pdfs[key].prenom);
    if (pdfFull === full || pdfFull.includes(nomNorm)) return pdfs[key];
  }

  return null;
}

function trouverCours(nameFilter) {
  const response = Classroom.Courses.list({ courseStates: ['ACTIVE'] });
  if (!response.courses) return null;

  const filter = normaliser(nameFilter);
  for (const c of response.courses) {
    if (normaliser(c.name).includes(filter) || normaliser(c.section || '').includes(filter)) {
      return c;
    }
  }
  return null;
}

function listerEleves(courseId) {
  const all = [];
  let pageToken = null;
  do {
    const response = Classroom.Courses.Students.list(courseId, { pageToken: pageToken, pageSize: 100 });
    if (response.students) all.push(...response.students);
    pageToken = response.nextPageToken;
  } while (pageToken);
  return all;
}

function trouverOuCreerTopic(courseId, topicName) {
  try {
    const response = Classroom.Courses.Topics.list(courseId);
    if (response.topic) {
      const existing = response.topic.find(t => t.name === topicName);
      if (existing) return existing.topicId;
    }
    const created = Classroom.Courses.Topics.create({ name: topicName }, courseId);
    return created.topicId;
  } catch(e) {
    Logger.log('⚠️ Impossible de créer le topic : ' + e.message);
    return null;
  }
}

// ==================== SETUP & TEST ====================

/**
 * Exécuter cette fonction en premier pour autoriser les accès Google
 */
function setupConfig() {
  Logger.log('🔑 Autorisations accordées !');
  Logger.log('📂 Dossier Drive : ' + CONFIG.DRIVE_FOLDER);
  Logger.log('📚 Cours Classroom : ' + CONFIG.COURSE_NAME);

  // Test accès Drive
  const folder = trouverDossier(CONFIG.DRIVE_FOLDER);
  Logger.log(folder ? '✅ Dossier trouvé' : '❌ Dossier non trouvé — créez-le dans Google Drive');

  // Test accès Classroom
  const course = trouverCours(CONFIG.COURSE_NAME);
  Logger.log(course ? '✅ Cours trouvé : ' + course.name : '❌ Cours non trouvé');

  if (course) {
    const students = listerEleves(course.id);
    Logger.log('👥 ' + students.length + ' élève(s) dans le cours');
    students.forEach(s => Logger.log('   - ' + s.profile.name.fullName + ' (' + s.profile.emailAddress + ')'));
  }
}

/**
 * Prévisualisation : vérifie le matching sans rien envoyer
 */
function previsualiser() {
  const folder = trouverDossier(CONFIG.DRIVE_FOLDER);
  if (!folder) { Logger.log('❌ Dossier non trouvé'); return; }

  const pdfs = lirePDFs(folder);
  Logger.log('📂 ' + Object.keys(pdfs).length + ' PDF(s)');
  Object.keys(pdfs).forEach(k => Logger.log('   📄 ' + pdfs[k].fileName));

  const course = trouverCours(CONFIG.COURSE_NAME);
  if (!course) { Logger.log('❌ Cours non trouvé'); return; }

  const students = listerEleves(course.id);
  Logger.log('\n📋 Matching prévu :');

  let ok = 0, ko = 0;
  students.forEach(s => {
    const nom = s.profile.name.familyName || '';
    const prenom = s.profile.name.givenName || '';
    const pdf = matcherPDF(pdfs, nom, prenom);
    if (pdf) {
      Logger.log('   ✅ ' + nom + ' ' + prenom + ' → ' + pdf.fileName);
      ok++;
    } else {
      Logger.log('   ❌ ' + nom + ' ' + prenom + ' → PAS DE PDF');
      ko++;
    }
  });

  Logger.log('\n📊 ' + ok + ' matchés, ' + ko + ' sans PDF');
}

// ============================================================================
// MODULE PDF EXTRACT - Dessin de zones sur le canvas PDF
// ============================================================================

var zoneDrawing = { active: false, startX: 0, startY: 0 };

function setupZoneOverlay(width, height) {
    var overlay = document.getElementById('zoneOverlay');
    overlay.width = width;
    overlay.height = height;
    overlay.style.width = width + 'px';
    overlay.style.height = height + 'px';
    overlay.style.display = 'block';

    // Retirer les anciens listeners en clonant
    var fresh = overlay.cloneNode(true);
    overlay.parentNode.replaceChild(fresh, overlay);

    fresh.addEventListener('mousedown', onZoneMouseDown);
    fresh.addEventListener('mousemove', onZoneMouseMove);
    fresh.addEventListener('mouseup', onZoneMouseUp);
}

function onZoneMouseDown(e) {
    var rect = e.target.getBoundingClientRect();
    zoneDrawing.active = true;
    zoneDrawing.startX = e.clientX - rect.left;
    zoneDrawing.startY = e.clientY - rect.top;
}

function onZoneMouseMove(e) {
    if (!zoneDrawing.active) return;
    var rect = e.target.getBoundingClientRect();
    var curX = e.clientX - rect.left;
    var curY = e.clientY - rect.top;
    redrawAllZones();
    // Dessiner le rectangle en cours
    var ctx = e.target.getContext('2d');
    ctx.strokeStyle = '#4F46E5';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 3]);
    ctx.strokeRect(zoneDrawing.startX, zoneDrawing.startY,
        curX - zoneDrawing.startX, curY - zoneDrawing.startY);
    ctx.setLineDash([]);
}

function onZoneMouseUp(e) {
    if (!zoneDrawing.active) return;
    zoneDrawing.active = false;
    var rect = e.target.getBoundingClientRect();
    var endX = e.clientX - rect.left;
    var endY = e.clientY - rect.top;

    var x = Math.min(zoneDrawing.startX, endX);
    var y = Math.min(zoneDrawing.startY, endY);
    var w = Math.abs(endX - zoneDrawing.startX);
    var h = Math.abs(endY - zoneDrawing.startY);

    // Ignorer les rectangles trop petits (clics accidentels)
    if (w < 20 || h < 15) { redrawAllZones(); return; }

    // Ajouter la zone au dernier exercice (ou en créer un)
    var exercises = appState.pdfImport.exercises || [];
    if (exercises.length === 0) {
        exercises.push({ id: 'ex1', num: 1, title: 'Exercice 1', page: appState.pdfImport.currentPage, y: y, questions: [] });
        appState.pdfImport.exercises = exercises;
    }
    var lastEx = exercises[exercises.length - 1];
    var qNum = lastEx.questions.length + 1;

    lastEx.questions.push({
        id: lastEx.id + '_q' + qNum, num: qNum,
        label: 'Question ' + qNum, text: '',
        page: appState.pdfImport.currentPage, y: y,
        points: 1, competences: [], answer: ''
    });

    appState.pdfImport.zones.push({
        page: appState.pdfImport.currentPage,
        x: x, y: y, w: w, h: h,
        exerciseId: lastEx.id, exerciseNum: lastEx.num,
        questionId: lastEx.id + '_q' + qNum, questionNum: qNum,
        label: 'Ex' + lastEx.num + ' Q' + qNum
    });

    redrawAllZones();
    renderExercisePanel();
    updateZonesButtons();
}

function redrawAllZones() {
    var overlay = document.getElementById('zoneOverlay');
    if (!overlay) return;
    var ctx = overlay.getContext('2d');
    ctx.clearRect(0, 0, overlay.width, overlay.height);

    var currentPage = appState.pdfImport.currentPage;
    var exColors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

    appState.pdfImport.zones.forEach(function (z) {
        if (z.page !== currentPage) return;
        // Couleur basée sur l'exercice
        var color = exColors[((z.exerciseNum || 1) - 1) % exColors.length];
        ctx.fillStyle = color + '20';
        ctx.fillRect(z.x, z.y, z.w, z.h);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.strokeRect(z.x, z.y, z.w, z.h);
        // Label : Ex1 Q2
        ctx.fillStyle = color;
        ctx.font = 'bold 13px sans-serif';
        ctx.fillText(z.label || ('Q' + (z.questionNum || '')), z.x + 6, z.y + 16);
    });
}

function deleteZone(index) {
    var zone = appState.pdfImport.zones[index];
    if (!zone) return;
    appState.pdfImport.zones.splice(index, 1);
    redrawAllZones();
    renderExercisePanel();
    updateZonesButtons();
}

function updateZonesButtons() {
    var btn = document.getElementById('btnGoToBareme');
    if (btn) btn.disabled = appState.pdfImport.zones.length === 0;
}

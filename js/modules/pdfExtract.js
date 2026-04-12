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

    var qNum = appState.pdfImport.zones.length + 1;
    appState.pdfImport.zones.push({
        page: appState.pdfImport.currentPage,
        x: x, y: y, w: w, h: h,
        questionNum: qNum, label: 'Question ' + qNum
    });

    // Synchroniser la liste de questions
    syncQuestionsFromZones();
    redrawAllZones();
    renderZonesList();
    updateZonesButtons();
}

function redrawAllZones() {
    var overlay = document.getElementById('zoneOverlay');
    if (!overlay) return;
    var ctx = overlay.getContext('2d');
    ctx.clearRect(0, 0, overlay.width, overlay.height);

    var currentPage = appState.pdfImport.currentPage;
    var colors = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

    appState.pdfImport.zones.forEach(function (z, i) {
        if (z.page !== currentPage) return;
        var color = colors[i % colors.length];
        ctx.fillStyle = color + '20';
        ctx.fillRect(z.x, z.y, z.w, z.h);
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.strokeRect(z.x, z.y, z.w, z.h);
        // Label
        ctx.fillStyle = color;
        ctx.font = 'bold 14px sans-serif';
        ctx.fillText('Q' + z.questionNum, z.x + 6, z.y + 18);
    });
}

function deleteZone(index) {
    appState.pdfImport.zones.splice(index, 1);
    // Renuméroter
    appState.pdfImport.zones.forEach(function (z, i) {
        z.questionNum = i + 1;
        z.label = 'Question ' + (i + 1);
    });
    syncQuestionsFromZones();
    redrawAllZones();
    renderZonesList();
    updateZonesButtons();
}

function updateZonesButtons() {
    var btn = document.getElementById('btnGoToBareme');
    if (btn) btn.disabled = appState.pdfImport.zones.length === 0;
}

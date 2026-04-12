// ============================================================================
// MODULE UPLOAD UI - Drag & drop + preview PDF/DOCX
// ============================================================================

var pdfImportScale = 1.5; // Échelle de rendu du canvas PDF

function initPdfImportPage() {
    console.log('📄 Initialisation Import PDF/DOCX');
    // Configurer le worker pdf.js
    if (typeof pdfjsLib !== 'undefined') {
        pdfjsLib.GlobalWorkerOptions.workerSrc =
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    }
}

function handlePdfFileDrop(event) {
    var file = event.dataTransfer.files[0];
    if (file) processUploadedFile(file);
}

function handlePdfFileSelect(event) {
    var file = event.target.files[0];
    if (file) processUploadedFile(file);
}

function processUploadedFile(file) {
    var ext = file.name.split('.').pop().toLowerCase();
    if (ext !== 'pdf' && ext !== 'docx') {
        alert('Format non supporté. Utilisez un fichier PDF ou DOCX.');
        return;
    }
    appState.pdfImport.file = file;
    appState.pdfImport.fileType = ext;
    console.log('📁 Fichier chargé:', file.name, '(' + ext + ')');

    if (ext === 'pdf') {
        loadPdfFile(file);
    } else {
        loadDocxFile(file);
    }
}

function loadPdfFile(file) {
    var reader = new FileReader();
    reader.onload = function (e) {
        var typedArray = new Uint8Array(e.target.result);
        pdfjsLib.getDocument(typedArray).promise.then(function (pdf) {
            appState.pdfImport.pdfDoc = pdf;
            appState.pdfImport.totalPages = pdf.numPages;
            appState.pdfImport.currentPage = 1;
            console.log('📄 PDF chargé:', pdf.numPages, 'pages');
            renderPdfPage(1);
            pdfImportGoToStep(2);
        });
    };
    reader.readAsArrayBuffer(file);
}

function loadDocxFile(file) {
    var reader = new FileReader();
    reader.onload = function (e) {
        mammoth.convertToHtml({ arrayBuffer: e.target.result }).then(function (result) {
            // Afficher le HTML dans le canvas container
            var container = document.getElementById('pdfCanvasContainer');
            document.getElementById('pdfCanvas').style.display = 'none';
            document.getElementById('zoneOverlay').style.display = 'none';
            var div = document.getElementById('docxContent') || document.createElement('div');
            div.id = 'docxContent';
            div.style.cssText = 'padding:30px; background:white; max-width:800px; margin:0 auto;';
            div.innerHTML = result.value;
            container.appendChild(div);
            appState.pdfImport.totalPages = 1;
            pdfImportGoToStep(2);
        });
    };
    reader.readAsArrayBuffer(file);
}

function renderPdfPage(pageNum) {
    var pdf = appState.pdfImport.pdfDoc;
    if (!pdf) return;
    pdf.getPage(pageNum).then(function (page) {
        var viewport = page.getViewport({ scale: pdfImportScale });
        var canvas = document.getElementById('pdfCanvas');
        var ctx = canvas.getContext('2d');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.display = 'block';
        page.render({ canvasContext: ctx, viewport: viewport }).promise.then(function () {
            setupZoneOverlay(canvas.width, canvas.height);
            redrawAllZones();
        });
        document.getElementById('pdfPageInfo').textContent =
            'Page ' + pageNum + ' / ' + appState.pdfImport.totalPages;
    });
}

function navigatePdfPage(direction) {
    var p = appState.pdfImport;
    var next = p.currentPage + direction;
    if (next < 1 || next > p.totalPages) return;
    p.currentPage = next;
    renderPdfPage(next);
}

function pdfImportGoToStep(step) {
    ['pdfUploadStep', 'pdfZonesStep', 'pdfBaremeStep', 'pdfCorrectionStep'].forEach(function (id) {
        document.getElementById(id).style.display = 'none';
    });
    var targets = { 1: 'pdfUploadStep', 2: 'pdfZonesStep', 3: 'pdfBaremeStep', 4: 'pdfCorrectionStep' };
    document.getElementById(targets[step]).style.display = 'block';
    if (step === 3) renderPdfBaremeConfig();
}

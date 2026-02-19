/**
 * threshold-slider.js — Slider visuel pour les seuils de compétences
 * Remplace les inputs texte du bundle Svelte par une barre colorée
 * avec 3 curseurs glissants (style BelEval).
 * Sync bidirectionnelle avec les inputs Svelte cachés.
 */
(function () {
  'use strict';

  const MIN_GAP = 5;
  const SNAP_RADIUS = 3; // magnétisme vers multiples de 10
  const COLORS = {
    mi:  { bg: '#f87171', label: '#dc2626' },  // red
    mf:  { bg: '#fb923c', label: '#ea580c' },  // orange
    ms:  { bg: '#60a5fa', label: '#2563eb' },  // blue
    tbm: { bg: '#34d399', label: '#059669' },  // green
  };

  let mfVal, msVal, tbmVal;
  let svelteInputs = { tbm: null, ms: null, mf: null };
  let sliderContainer = null;

  // --- Helpers ---
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  function enforceGaps() {
    if (msVal - mfVal < MIN_GAP) msVal = mfVal + MIN_GAP;
    if (tbmVal - msVal < MIN_GAP) tbmVal = msVal + MIN_GAP;
    if (tbmVal > 100) tbmVal = 100;
    if (msVal > tbmVal - MIN_GAP) msVal = tbmVal - MIN_GAP;
    if (mfVal > msVal - MIN_GAP) mfVal = msVal - MIN_GAP;
    if (mfVal < 0) mfVal = 0;
  }

  function syncToSvelte() {
    Object.entries({ tbm: tbmVal, ms: msVal, mf: mfVal }).forEach(([k, v]) => {
      const inp = svelteInputs[k];
      if (inp) {
        const nativeSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
        nativeSetter.call(inp, v);
        inp.dispatchEvent(new Event('input', { bubbles: true }));
      }
    });
  }

  // --- Build slider DOM ---
  function buildSlider() {
    const wrap = document.createElement('div');
    wrap.id = 'matheval-threshold-slider';
    wrap.style.cssText = 'margin-top:16px;user-select:none;';

    // Title
    const title = document.createElement('h3');
    title.textContent = `Seuils de maîtrise (${mfVal}% / ${msVal}% / ${tbmVal}%)`;
    title.style.cssText = 'font-size:15px;font-weight:600;margin:0 0 16px;color:#1e293b;';
    title.id = 'threshold-title';
    wrap.appendChild(title);

    // Percentage labels
    const labels = document.createElement('div');
    labels.id = 'threshold-labels';
    labels.style.cssText = 'position:relative;height:22px;margin-bottom:4px;';
    wrap.appendChild(labels);

    // Color bar
    const bar = document.createElement('div');
    bar.id = 'threshold-bar';
    bar.style.cssText = 'display:flex;height:14px;border-radius:9999px;overflow:hidden;position:relative;';
    wrap.appendChild(bar);

    // Thumb track (overlays bar)
    const thumbTrack = document.createElement('div');
    thumbTrack.id = 'threshold-thumbs';
    thumbTrack.style.cssText = 'position:relative;height:0;margin-top:-20px;';
    wrap.appendChild(thumbTrack);

    // Zone labels below
    const zones = document.createElement('div');
    zones.id = 'threshold-zones';
    zones.style.cssText = 'display:flex;margin-top:14px;';
    wrap.appendChild(zones);

    sliderContainer = wrap;
    render();
    return wrap;
  }

  function render() {
    if (!sliderContainer) return;

    // Title
    const title = sliderContainer.querySelector('#threshold-title');
    if (title) title.textContent = `Seuils de maîtrise (${mfVal}% / ${msVal}% / ${tbmVal}%)`;

    // Labels above
    const labels = sliderContainer.querySelector('#threshold-labels');
    if (labels) {
      labels.innerHTML = '';
      [
        { val: mfVal, color: COLORS.mf.label },
        { val: msVal, color: COLORS.ms.label },
        { val: tbmVal, color: COLORS.tbm.label },
      ].forEach(({ val, color }) => {
        const span = document.createElement('span');
        span.textContent = val + '%';
        span.style.cssText = `position:absolute;left:${val}%;transform:translateX(-50%);font-size:13px;font-weight:700;color:${color};`;
        labels.appendChild(span);
      });
    }

    // Color bar
    const bar = sliderContainer.querySelector('#threshold-bar');
    if (bar) {
      bar.innerHTML = '';
      const segments = [
        { pct: mfVal, color: COLORS.mi.bg },
        { pct: msVal - mfVal, color: COLORS.mf.bg },
        { pct: tbmVal - msVal, color: COLORS.ms.bg },
        { pct: 100 - tbmVal, color: COLORS.tbm.bg },
      ];
      segments.forEach(({ pct, color }) => {
        const seg = document.createElement('div');
        seg.style.cssText = `width:${pct}%;background:${color};transition:width 0.15s;`;
        bar.appendChild(seg);
      });
    }

    // Thumbs
    const thumbTrack = sliderContainer.querySelector('#threshold-thumbs');
    if (thumbTrack) {
      thumbTrack.innerHTML = '';
      [
        { val: mfVal, key: 'mf' },
        { val: msVal, key: 'ms' },
        { val: tbmVal, key: 'tbm' },
      ].forEach(({ val, key }) => {
        const thumb = document.createElement('div');
        thumb.dataset.key = key;
        thumb.style.cssText = `
          position:absolute;left:${val}%;top:-4px;transform:translateX(-50%);
          width:22px;height:22px;border-radius:50%;background:#fff;
          border:2px solid #475569;cursor:grab;box-shadow:0 2px 6px rgba(0,0,0,0.2);
          transition:box-shadow 0.15s;z-index:10;
        `;
        thumb.addEventListener('mousedown', startDrag);
        thumb.addEventListener('touchstart', startDrag, { passive: false });
        thumbTrack.appendChild(thumb);
      });
    }

    // Zone labels
    const zones = sliderContainer.querySelector('#threshold-zones');
    if (zones) {
      zones.innerHTML = '';
      [
        { pct: mfVal, label: 'MI', color: COLORS.mi.bg },
        { pct: msVal - mfVal, label: 'MF', color: COLORS.mf.bg },
        { pct: tbmVal - msVal, label: 'MS', color: COLORS.ms.bg },
        { pct: 100 - tbmVal, label: 'TBM', color: COLORS.tbm.bg },
      ].forEach(({ pct, label, color }) => {
        const div = document.createElement('div');
        div.style.cssText = `width:${pct}%;text-align:center;transition:width 0.15s;`;
        const badge = document.createElement('span');
        badge.textContent = label;
        badge.style.cssText = `
          display:inline-block;padding:2px 8px;border-radius:4px;
          font-size:11px;font-weight:700;color:#fff;background:${color};
        `;
        div.appendChild(badge);
        zones.appendChild(div);
      });
    }
  }

  // --- Drag logic ---
  function startDrag(e) {
    e.preventDefault();
    const thumb = e.currentTarget;
    const key = thumb.dataset.key;
    thumb.style.cursor = 'grabbing';
    thumb.style.boxShadow = '0 3px 10px rgba(0,0,0,0.35)';

    const bar = sliderContainer.querySelector('#threshold-bar');
    const barRect = bar.getBoundingClientRect();

    function onMove(ev) {
      const clientX = ev.touches ? ev.touches[0].clientX : ev.clientX;
      let pct = Math.round((clientX - barRect.left) / barRect.width * 100);
      // Snap to nearest multiple of 10 if within SNAP_RADIUS
      const nearest10 = Math.round(pct / 10) * 10;
      if (Math.abs(pct - nearest10) <= SNAP_RADIUS) pct = nearest10;
      pct = clamp(pct, 0, 100);

      if (key === 'mf') mfVal = clamp(pct, 0, msVal - MIN_GAP);
      else if (key === 'ms') msVal = clamp(pct, mfVal + MIN_GAP, tbmVal - MIN_GAP);
      else if (key === 'tbm') tbmVal = clamp(pct, msVal + MIN_GAP, 100);

      enforceGaps();
      render();
      syncToSvelte();
    }

    function onUp() {
      thumb.style.cursor = 'grab';
      thumb.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('touchmove', onMove);
      document.removeEventListener('touchend', onUp);
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onUp);
  }

  // --- Find and replace Svelte inputs ---
  function tryInject() {
    // Find the h3 with "Seuils de maîtrise"
    const headings = document.querySelectorAll('h3');
    let targetH3 = null;
    for (const h of headings) {
      if (h.textContent && h.textContent.includes('Seuils de maîtrise')) {
        targetH3 = h;
        break;
      }
    }
    if (!targetH3) return false;

    const container = targetH3.closest('div[class*="mt-6"]') || targetH3.parentElement;
    if (!container) return false;

    // Find the 3 number inputs inside
    const inputs = container.querySelectorAll('input[type="number"]');
    if (inputs.length < 3) return false;

    // Map inputs: TBM first, then MS, then MF (order in the DOM)
    svelteInputs.tbm = inputs[0];
    svelteInputs.ms = inputs[1];
    svelteInputs.mf = inputs[2];

    // Read current values
    tbmVal = parseInt(svelteInputs.tbm.value, 10) || 90;
    msVal = parseInt(svelteInputs.ms.value, 10) || 70;
    mfVal = parseInt(svelteInputs.mf.value, 10) || 30;

    // Hide original section
    container.style.display = 'none';

    // Insert slider after hidden section
    const slider = buildSlider();
    container.parentElement.insertBefore(slider, container.nextSibling);

    return true;
  }

  // --- Init with MutationObserver ---
  function init() {
    if (tryInject()) return;

    const obs = new MutationObserver(() => {
      if (tryInject()) obs.disconnect();
    });
    obs.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => obs.disconnect(), 30000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

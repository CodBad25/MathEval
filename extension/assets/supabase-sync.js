/* ──────────────────────────────────────────────────────────────────────────
   supabase-sync.js – Synchronisation cloud pour MathEval

   Prérequis : Exécuter ce SQL dans l'éditeur SQL de Supabase :

   CREATE TABLE evaluations (
     id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
     user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
     name text NOT NULL,
     data jsonb NOT NULL DEFAULT '{}'::jsonb,
     created_at timestamptz DEFAULT now() NOT NULL,
     updated_at timestamptz DEFAULT now() NOT NULL
   );
   ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
   CREATE POLICY "own_evaluations" ON evaluations FOR ALL
     USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
   CREATE INDEX idx_evaluations_user ON evaluations(user_id);

   Puis dans Authentication > Providers > Email : décocher "Confirm email"
   ────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  const IS_CORRECTION = location.search.includes('correction');

  const SUPABASE_URL = 'https://ehxdbjgvqzpttuafwufh.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoeGRiamd2cXpwdHR1YWZ3dWZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3NDA5NDEsImV4cCI6MjA4NjMxNjk0MX0.6QETEpU6VR_KvI4gDRbyxeqLmYZn3vb0EwqkHrh7DK4';
  const ACT_KEY = 'supabaseSyncActiveEval';
  const SYNC_KEYS = [
    'evaluationData', 'studentCorrections', 'evaluationExercices',
    'evaluationConfig', 'competencyWeights', 'studentsList',
    'mathalea_bareme_locked', 'mathalea_exercices_seeds',
    'mathalea_exercices_locked', 'bilanConfig',
    'tbMinusComments', 'tbMinusRecentComments', 'tbMinusPresetComments',
    'competencesPersonnalisees', 'competencesActivees',
    'showCorrections', 'preferenceCorrections'
  ];

  /* ── Réutilise auth-global.js si disponible ────────── */
  const auth = window.__supabaseAuth;
  let sb = auth?.client || null;
  let user = auth?.user || null;

  /* ── Helpers ──────────────────────────────────────── */
  const getActId = () => localStorage.getItem(ACT_KEY);
  const setActId = id => id ? localStorage.setItem(ACT_KEY, id) : localStorage.removeItem(ACT_KEY);
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const esc = s => s.replace(/"/g, '&quot;').replace(/</g, '&lt;');

  /**
   * Construit l'URL avec les paramètres des exercices pour que le bundle Svelte
   * puisse régénérer les exercices au chargement (uuid, alea, n, sup, sup2…).
   * Sans ces paramètres dans l'URL, le bundle ne génère rien → page vide.
   */
  function buildExerciseUrl() {
    const raw = localStorage.getItem('evaluationExercices');
    if (!raw) return null;
    try {
      const ex = JSON.parse(raw);
      if (!ex.uuids || ex.uuids.length === 0) return null;
      const url = new URL(window.location.pathname, window.location.origin);
      url.searchParams.set('v', 'correction');
      ex.uuids.forEach((uuid, i) => {
        url.searchParams.append('uuid', uuid);
        if (ex.seeds && ex.seeds[i]) url.searchParams.append('alea', ex.seeds[i]);
        const p = ex.params && ex.params[i];
        if (p) {
          if (p.nbQuestions != null) url.searchParams.append('n', String(p.nbQuestions));
          if (p.sup != null) url.searchParams.append('s', String(p.sup));
          if (p.sup2 != null) url.searchParams.append('s2', String(p.sup2));
          if (p.sup3 != null) url.searchParams.append('s3', String(p.sup3));
          if (p.sup4 != null) url.searchParams.append('s4', String(p.sup4));
          if (p.sup5 != null) url.searchParams.append('s5', String(p.sup5));
        }
      });
      return url.toString();
    } catch (e) {
      console.warn('[Supabase Sync] buildExerciseUrl error:', e);
      return null;
    }
  }

  /* ── SDK (fallback si auth-global.js absent) ───────── */
  function loadSDK() {
    return new Promise((ok, ko) => {
      if (window.supabase) return ok();
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js';
      s.onload = ok;
      s.onerror = () => ko(new Error('SDK Supabase indisponible'));
      document.head.appendChild(s);
    });
  }

  function initClient() {
    if (auth?.client) { sb = auth.client; return true; }
    sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true }
    });
    return true;
  }

  /* ── Auth ─────────────────────────────────────────── */
  async function doSignIn(email, pwd) {
    if (auth) { const d = await auth.doSignIn(email, pwd); user = auth.user; return d; }
    const { data, error } = await sb.auth.signInWithPassword({ email, password: pwd });
    if (error) throw error;
    user = data.user;
    return data;
  }

  async function doSignUp(email, pwd) {
    if (auth) return auth.doSignUp(email, pwd);
    const { data, error } = await sb.auth.signUp({ email, password: pwd });
    if (error) throw error;
    return data;
  }

  async function doSignOut() {
    if (auth) { await auth.doSignOut(); user = null; setActId(null); return; }
    await sb.auth.signOut();
    user = null;
    setActId(null);
  }

  async function getUser() {
    if (auth) { user = await auth.getUser(); return user; }
    if (!sb) return null;
    try {
      const { data: { user: u } } = await sb.auth.getUser();
      user = u;
      return u;
    } catch { user = null; return null; }
  }

  /* ── Data ─────────────────────────────────────────── */
  function gather() {
    const d = {};
    for (const k of SYNC_KEYS) {
      const v = localStorage.getItem(k);
      if (v !== null) d[k] = v;
    }
    return d;
  }

  function restore(data) {
    for (const k of SYNC_KEYS) localStorage.removeItem(k);
    for (const [k, v] of Object.entries(data)) {
      if (SYNC_KEYS.includes(k)) {
        localStorage.setItem(k, typeof v === 'string' ? v : JSON.stringify(v));
      }
    }
  }

  async function listEvals() {
    const { data, error } = await sb.from('evaluations')
      .select('id, name, updated_at').order('updated_at', { ascending: false });
    if (error) throw error;
    return data || [];
  }

  async function saveEval(name, id) {
    const d = gather();
    if (id) {
      const { error } = await sb.from('evaluations')
        .update({ name, data: d, updated_at: new Date().toISOString() }).eq('id', id);
      if (error) throw error;
      return id;
    }
    const { data, error } = await sb.from('evaluations')
      .insert({ user_id: user.id, name, data: d }).select('id').single();
    if (error) throw error;
    return data.id;
  }

  async function loadEval(id) {
    const { data, error } = await sb.from('evaluations')
      .select('data, name').eq('id', id).single();
    if (error) throw error;
    return data;
  }

  async function delEval(id) {
    const { error } = await sb.from('evaluations').delete().eq('id', id);
    if (error) throw error;
  }

  /* ── Toast (réutilise auth-global si disponible) ──── */
  function toast(msg, type = 'info') {
    if (auth?.toast) return auth.toast(msg, type);
    const colors = { info: '#2196f3', success: '#4caf50', error: '#f44336', warning: '#ff9800' };
    const t = document.createElement('div');
    Object.assign(t.style, {
      position: 'fixed', bottom: '20px', right: '20px', zIndex: '100001',
      padding: '12px 20px', borderRadius: '8px', color: '#fff', fontSize: '13px',
      background: colors[type] || colors.info, boxShadow: '0 4px 12px rgba(0,0,0,.3)',
      maxWidth: '320px', opacity: '0', transform: 'translateX(30px)', transition: 'all .3s ease',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    });
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateX(0)'; });
    setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 400); }, 3500);
  }

  /* ── Modal ────────────────────────────────────────── */
  let modal = null;
  const FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  function openModal() {
    if (modal) modal.remove();
    modal = document.createElement('div');
    Object.assign(modal.style, {
      position: 'fixed', inset: '0', zIndex: '100000',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,.45)', backdropFilter: 'blur(2px)'
    });
    const box = document.createElement('div');
    box.id = 'sync-box';
    Object.assign(box.style, {
      background: '#fff', borderRadius: '12px', padding: '24px', maxWidth: '460px',
      width: '90%', maxHeight: '80vh', overflowY: 'auto',
      boxShadow: '0 8px 32px rgba(0,0,0,.3)', fontFamily: FONT
    });
    modal.appendChild(box);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.body.appendChild(modal);
    return box;
  }

  function closeModal() { if (modal) { modal.remove(); modal = null; } }

  /* ── Styles communs ─────────────────────────────────── */
  const S = {
    input: 'width:100%;padding:9px;border:1px solid #ddd;border-radius:6px;font-size:13px;box-sizing:border-box',
    label: 'font-size:12px;font-weight:600;display:block;margin-bottom:3px;color:#555',
    btnPrimary: 'padding:8px 14px;border:none;border-radius:6px;background:#2196f3;color:#fff;cursor:pointer;font-size:13px;font-weight:600',
    btnOutline: 'padding:8px 14px;border:1px solid #ddd;border-radius:6px;background:#fff;cursor:pointer;font-size:13px',
    btnSuccess: 'padding:8px 13px;border:none;border-radius:6px;background:#4caf50;color:#fff;cursor:pointer;font-size:12px;font-weight:600;white-space:nowrap',
    btnSmall: 'padding:5px 10px;border:1px solid #ddd;border-radius:6px;background:#fff;cursor:pointer;font-size:11px',
    h3: 'margin:0 0 14px;font-size:17px;color:#2c3e50',
    error: 'display:none;padding:8px 12px;border-radius:6px;background:#fff3f3;color:#f44336;font-size:12px;margin-bottom:10px'
  };

  /* ── View: Login ──────────────────────────────────── */
  function viewLogin() {
    const b = openModal();
    b.innerHTML = `
      <h3 style="${S.h3}">Connexion</h3>
      <div style="margin-bottom:10px">
        <label style="${S.label}">Email</label>
        <input id="s-email" type="email" placeholder="votre@email.com" style="${S.input}">
      </div>
      <div style="margin-bottom:14px">
        <label style="${S.label}">Mot de passe</label>
        <input id="s-pwd" type="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" style="${S.input}">
      </div>
      <div id="s-err" style="${S.error}"></div>
      <div style="display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap">
        <button id="s-cancel" style="${S.btnOutline}">Annuler</button>
        <button id="s-signup" style="padding:8px 14px;border:1px solid #2196f3;border-radius:6px;background:#fff;color:#2196f3;cursor:pointer;font-size:13px">
          Cr\u00e9er un compte
        </button>
        <button id="s-login" style="${S.btnPrimary}">Se connecter</button>
      </div>`;

    const err = msg => { const e = $('#s-err', b); e.textContent = msg; e.style.display = 'block'; };
    $('#s-cancel', b).onclick = closeModal;

    $('#s-login', b).onclick = async () => {
      const email = $('#s-email', b).value.trim(), pwd = $('#s-pwd', b).value;
      if (!email || !pwd) return err('Email et mot de passe requis');
      try {
        await doSignIn(email, pwd);
        closeModal();
        toast('Connect\u00e9 !', 'success');
        viewEvals();
      } catch (e) {
        err(e.message.includes('Invalid') ? 'Email ou mot de passe incorrect' : e.message);
      }
    };

    $('#s-signup', b).onclick = async () => {
      const email = $('#s-email', b).value.trim(), pwd = $('#s-pwd', b).value;
      if (!email || !pwd) return err('Email et mot de passe requis');
      if (pwd.length < 6) return err('Mot de passe : 6 caract\u00e8res minimum');
      try {
        const d = await doSignUp(email, pwd);
        if (d.session) {
          user = d.user;
          closeModal();
          toast('Compte cr\u00e9\u00e9 !', 'success');
          viewEvals();
        } else {
          toast('V\u00e9rifiez votre email pour confirmer le compte', 'info');
        }
      } catch (e) { err(e.message); }
    };

    b.addEventListener('keydown', e => { if (e.key === 'Enter') $('#s-login', b).click(); });
  }

  /* ── View: Evaluations ────────────────────────────── */
  async function viewEvals() {
    const b = openModal();
    b.innerHTML = '<div style="text-align:center;padding:30px;color:#999;font-size:13px">Chargement\u2026</div>';

    try {
      const evals = await listEvals();
      const aid = getActId();

      const listH = evals.length === 0
        ? '<p style="color:#999;font-size:13px;text-align:center;padding:16px 0">Aucune \u00e9valuation sauvegard\u00e9e</p>'
        : evals.map(ev => {
          const dt = new Date(ev.updated_at).toLocaleDateString('fr-FR', {
            day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'
          });
          const on = ev.id === aid;
          return `<div style="display:flex;align-items:center;gap:8px;padding:9px 11px;
            border:1px solid ${on ? '#2196f3' : '#eee'};border-radius:8px;margin-bottom:5px;
            background:${on ? '#e3f2fd' : '#fafafa'}">
            <div style="flex:1;min-width:0">
              <div style="font-size:13px;font-weight:${on ? '600' : '500'};color:#2c3e50;
                overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${esc(ev.name)}</div>
              <div style="font-size:11px;color:#999;margin-top:1px">${dt}</div>
            </div>
            ${on ? '<span style="font-size:10px;color:#2196f3;font-weight:600">Active</span>' : ''}
            <button class="sl" data-id="${ev.id}" data-n="${esc(ev.name)}"
              style="padding:4px 9px;border:1px solid #2196f3;border-radius:4px;background:#fff;
              color:#2196f3;cursor:pointer;font-size:11px;white-space:nowrap">Charger</button>
            <button class="sd" data-id="${ev.id}" data-n="${esc(ev.name)}"
              style="padding:4px 7px;border:1px solid #e57373;border-radius:4px;background:#fff;
              color:#e57373;cursor:pointer;font-size:11px">\u2715</button>
          </div>`;
        }).join('');

      const activeName = aid && evals.find(e => e.id === aid)
        ? evals.find(e => e.id === aid).name : '';

      b.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
          <h3 style="margin:0;font-size:17px;color:#2c3e50">Synchronisation</h3>
          <span style="font-size:11px;color:#999">${esc(user?.email || '')}</span>
        </div>
        <div style="margin-bottom:14px;max-height:280px;overflow-y:auto">${listH}</div>
        <div style="border-top:1px solid #eee;padding-top:12px;margin-bottom:10px">
          <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px">
            <input id="s-name" type="text" value="${esc(activeName)}"
              placeholder="Nom (ex: Bilan 5A - G\u00e9om\u00e9trie)"
              style="flex:1;padding:8px 10px;border:1px solid #ddd;border-radius:6px;font-size:12px;box-sizing:border-box">
            <button id="s-sv" style="${S.btnSuccess}">
              ${aid ? 'Mettre \u00e0 jour' : 'Sauvegarder'}
            </button>
          </div>
          ${aid ? `<button id="s-svn" style="padding:5px 10px;border:1px solid #4caf50;border-radius:6px;
            background:#fff;color:#4caf50;cursor:pointer;font-size:11px;width:100%">
            Sauvegarder comme nouvelle \u00e9valuation</button>` : ''}
        </div>
        <div style="border-top:1px solid #eee;padding-top:10px;margin-bottom:10px">
          <button id="s-import-json" style="padding:7px 14px;border:1px solid #2980b9;border-radius:6px;
            background:#fff;color:#2980b9;cursor:pointer;font-size:12px;font-weight:600;width:100%">
            \uD83D\uDCC2 Importer un fichier JSON</button>
        </div>
        <div style="display:flex;gap:8px;justify-content:space-between;align-items:center">
          <button id="s-out" style="padding:5px 11px;border:1px solid #aaa;border-radius:6px;
            background:#fff;color:#888;cursor:pointer;font-size:11px">D\u00e9connexion</button>
          <button id="s-x" style="${S.btnSmall}">Fermer</button>
        </div>`;

      /* ── Wire events ── */

      // Charger
      $$('.sl', b).forEach(btn => btn.onclick = async e => {
        e.stopPropagation();
        const id = btn.dataset.id, n = btn.dataset.n;
        if (!confirm('Charger \u00ab ' + n + ' \u00bb ?\n\nLes donn\u00e9es locales seront remplac\u00e9es.')) return;
        btn.textContent = '\u2026';
        try {
          const r = await loadEval(id);
          restore(r.data);
          setActId(id);
          toast('Charg\u00e9 ! Rechargement\u2026', 'success');
          setTimeout(() => {
            const url = buildExerciseUrl();
            window.location.href = url || (window.location.pathname + '?v=correction');
          }, 800);
        } catch (err) { toast('Erreur: ' + err.message, 'error'); btn.textContent = 'Charger'; }
      });

      // Supprimer
      $$('.sd', b).forEach(btn => btn.onclick = async e => {
        e.stopPropagation();
        if (!confirm('Supprimer \u00ab ' + btn.dataset.n + ' \u00bb ?')) return;
        try {
          await delEval(btn.dataset.id);
          if (getActId() === btn.dataset.id) setActId(null);
          toast('Supprim\u00e9', 'success');
          viewEvals();
        } catch (err) { toast('Erreur: ' + err.message, 'error'); }
      });

      // Sauvegarder / Mettre à jour (avec protection anti-écrasement)
      const svBtn = $('#s-sv', b);
      if (svBtn) svBtn.onclick = async () => {
        const n = $('#s-name', b).value.trim();
        if (!n) return toast('Nom requis', 'warning');
        const aid = getActId();

        // Si mise à jour d'une évaluation existante → vérifier avant d'écraser
        if (aid) {
          try {
            const cloud = await loadEval(aid);
            const cloudStudents = cloud.data?.studentsList
              ? (typeof cloud.data.studentsList === 'string' ? JSON.parse(cloud.data.studentsList) : cloud.data.studentsList)
              : [];
            const localStudentsRaw = localStorage.getItem('studentsList');
            const localStudents = localStudentsRaw ? JSON.parse(localStudentsRaw) : [];
            const cloudNames = cloudStudents.filter(s => s.nom).map(s => (s.nom + ' ' + (s.prenom || '')).trim()).sort();
            const localNames = localStudents.filter(s => s.nom).map(s => (s.nom + ' ' + (s.prenom || '')).trim()).sort();
            const cloudCorr = cloud.data?.studentCorrections
              ? (typeof cloud.data.studentCorrections === 'string' ? JSON.parse(cloud.data.studentCorrections) : cloud.data.studentCorrections)
              : {};
            const localCorrRaw = localStorage.getItem('studentCorrections');
            const localCorr = localCorrRaw ? JSON.parse(localCorrRaw) : {};
            const nbCloudCorr = Object.keys(cloudCorr).length;
            const nbLocalCorr = Object.keys(localCorr).length;

            // Détection de conflit : listes d'élèves différentes
            const sameStudents = cloudNames.length === localNames.length &&
              cloudNames.every((n, i) => n === localNames[i]);

            let msg = 'Mettre à jour « ' + cloud.name + ' » sur le cloud ?\n\n';
            if (!sameStudents && cloudNames.length > 0) {
              msg += '⚠️ ATTENTION : La liste d\'élèves est DIFFÉRENTE !\n';
              msg += '   Cloud : ' + cloudNames.length + ' élève(s) — ' + (cloudNames.slice(0, 3).join(', ')) + (cloudNames.length > 3 ? '…' : '') + '\n';
              msg += '   Local : ' + localNames.length + ' élève(s) — ' + (localNames.slice(0, 3).join(', ')) + (localNames.length > 3 ? '…' : '') + '\n\n';
              msg += '❌ Vous allez peut-être ÉCRASER les données d\'une autre classe !\n\n';
            }
            msg += '📊 Cloud : ' + nbCloudCorr + ' correction(s) sauvegardée(s)\n';
            msg += '💻 Local : ' + nbLocalCorr + ' correction(s) à envoyer\n\n';
            msg += 'Confirmer la mise à jour ?';

            if (!confirm(msg)) {
              return;
            }
          } catch (e) {
            // Si erreur de chargement cloud, on continue avec une confirmation simple
            if (!confirm('Mettre à jour « ' + n + ' » sur le cloud ?\n\nLes données cloud seront remplacées par les données locales.')) return;
          }
        }

        const origText = svBtn.textContent;
        svBtn.textContent = '\u2026'; svBtn.disabled = true;
        try {
          const id = await saveEval(n, aid);
          setActId(id);
          toast('Sauvegard\u00e9 !', 'success');
          viewEvals();
        } catch (err) {
          toast('Erreur: ' + err.message, 'error');
          svBtn.textContent = origText; svBtn.disabled = false;
        }
      };

      // Sauvegarder comme nouvelle
      const svnBtn = $('#s-svn', b);
      if (svnBtn) svnBtn.onclick = async () => {
        const n = $('#s-name', b).value.trim();
        if (!n) return toast('Nom requis', 'warning');
        svnBtn.textContent = '\u2026';
        try {
          const id = await saveEval(n, null);
          setActId(id);
          toast('Nouvelle \u00e9valuation cr\u00e9\u00e9e !', 'success');
          viewEvals();
        } catch (err) { toast('Erreur: ' + err.message, 'error'); }
      };

      // Import JSON
      const impBtn = $('#s-import-json', b);
      if (impBtn) impBtn.onclick = () => {
        const input = document.createElement('input');
        input.type = 'file'; input.accept = '.json';
        input.onchange = (e) => {
          const file = e.target.files[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = (ev) => {
            try {
              const data = JSON.parse(ev.target.result);
              if (!data.corrections || !data.students || !data.evaluationData) {
                toast('Fichier invalide (corrections, students ou evaluationData manquant)', 'error');
                return;
              }
              const nbStudents = data.students.filter(s => s.nom).length;
              const nbCorrected = Object.keys(data.corrections).length;
              if (!confirm('Importer les donn\u00e9es ?\n\n\u2022 ' + nbStudents + ' \u00e9l\u00e8ve(s)\n\u2022 ' + nbCorrected + ' correction(s)\n\u2022 ' + data.evaluationData.length + ' exercice(s)\n\n\u26a0\ufe0f Les donn\u00e9es locales seront remplac\u00e9es.')) return;
              localStorage.setItem('studentCorrections', JSON.stringify(data.corrections));
              localStorage.setItem('studentsList', JSON.stringify(data.students));
              localStorage.setItem('evaluationData', JSON.stringify(data.evaluationData));
              if (data.competencesPersonnalisees) localStorage.setItem('competencesPersonnalisees', JSON.stringify(data.competencesPersonnalisees));
              if (data.competencesActivees) localStorage.setItem('competencesActivees', JSON.stringify(data.competencesActivees));
              if (data.modeEvaluation) {
                try { const cfg = JSON.parse(localStorage.getItem('evaluationConfig') || '{}'); cfg.modeEvaluation = data.modeEvaluation; localStorage.setItem('evaluationConfig', JSON.stringify(cfg)); } catch(_){}
              }
              closeModal();
              toast(nbCorrected + ' corrections import\u00e9es ! Rechargement\u2026', 'success');
              setTimeout(() => {
                const url = buildExerciseUrl();
                window.location.href = url || (window.location.pathname + '?v=correction');
              }, 1000);
            } catch (err) { toast('Erreur: ' + err.message, 'error'); }
          };
          reader.readAsText(file);
        };
        input.click();
      };

      $('#s-out', b).onclick = async () => {
        await doSignOut();
        closeModal();
        toast('D\u00e9connect\u00e9', 'info');
        updateBtn();
      };
      $('#s-x', b).onclick = closeModal;

    } catch (e) {
      b.innerHTML = `
        <h3 style="${S.h3}">Erreur</h3>
        <p style="color:#f44336;font-size:13px">${esc(e.message)}</p>
        <p style="color:#999;font-size:12px;margin-top:8px">V\u00e9rifiez votre connexion internet.</p>
        <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:14px">
          <button id="s-x" style="${S.btnOutline}">Fermer</button>
        </div>`;
      $('#s-x', b).onclick = closeModal;
    }
  }

  /* ── Sync Button ──────────────────────────────────── */
  function createBtn() {
    // Masquer le bouton "Cloud" de auth-global.js (doublon)
    const authBtn = document.getElementById('matheval-auth-indicator');
    if (authBtn) authBtn.style.display = 'none';

    const btn = document.createElement('button');
    btn.id = 'sb-sync-btn';
    btn.innerHTML = '\u2601\uFE0F <span style="font-size:13px;font-weight:600;margin-left:4px">Sync</span>';
    btn.title = 'Synchronisation cloud';
    Object.assign(btn.style, {
      position: 'fixed', top: '10px', left: '35%', zIndex: '99999',
      height: '36px', borderRadius: '18px', padding: '0 14px 0 10px',
      background: '#2196f3', color: '#fff', border: 'none',
      fontSize: '16px', cursor: 'pointer', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(33,150,243,.4)', transition: 'transform .15s',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    });
    btn.onmouseenter = () => btn.style.transform = 'scale(1.1)';
    btn.onmouseleave = () => btn.style.transform = 'scale(1)';
    btn.onclick = handleClick;
    document.body.appendChild(btn);
    updateBtn();
  }

  function updateBtn() {
    const btn = document.getElementById('sb-sync-btn');
    if (!btn) return;
    btn.style.background = user ? '#4caf50' : '#2196f3';
    btn.title = user
      ? 'Synchronisation cloud (' + user.email + ')'
      : 'Synchronisation cloud';
  }

  async function handleClick() {
    if (!sb) initClient();
    try {
      const u = await getUser();
      updateBtn();
      u ? viewEvals() : viewLogin();
    } catch {
      viewLogin();
    }
  }

  /* ── Init ─────────────────────────────────────────── */
  async function init() {
    try {
      // Réutilise le client de auth-global.js s'il existe
      if (auth?.client) {
        sb = auth.client;
        user = auth.user;
      } else {
        await loadSDK();
        initClient();
        await getUser();
      }
    } catch (e) {
      console.warn('[Supabase Sync]', e);
    }
    createBtn();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();

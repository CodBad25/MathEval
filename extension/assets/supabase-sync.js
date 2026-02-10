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
  if (!location.search.includes('correction')) return;

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

  let sb = null, user = null;

  /* ── Helpers ──────────────────────────────────────── */
  const getActId = () => localStorage.getItem(ACT_KEY);
  const setActId = id => id ? localStorage.setItem(ACT_KEY, id) : localStorage.removeItem(ACT_KEY);
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const esc = s => s.replace(/"/g, '&quot;').replace(/</g, '&lt;');

  /* ── SDK ──────────────────────────────────────────── */
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
    sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: true, autoRefreshToken: true }
    });
    return true;
  }

  /* ── Auth ─────────────────────────────────────────── */
  async function doSignIn(email, pwd) {
    const { data, error } = await sb.auth.signInWithPassword({ email, password: pwd });
    if (error) throw error;
    user = data.user;
    return data;
  }

  async function doSignUp(email, pwd) {
    const { data, error } = await sb.auth.signUp({ email, password: pwd });
    if (error) throw error;
    return data;
  }

  async function doSignOut() {
    await sb.auth.signOut();
    user = null;
    setActId(null);
  }

  async function getUser() {
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

  /* ── Toast ────────────────────────────────────────── */
  function toast(msg, type = 'info') {
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
          setTimeout(() => location.reload(), 800);
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

      // Sauvegarder / Mettre à jour
      const svBtn = $('#s-sv', b);
      if (svBtn) svBtn.onclick = async () => {
        const n = $('#s-name', b).value.trim();
        if (!n) return toast('Nom requis', 'warning');
        const origText = svBtn.textContent;
        svBtn.textContent = '\u2026'; svBtn.disabled = true;
        try {
          const id = await saveEval(n, getActId());
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
    const btn = document.createElement('button');
    btn.id = 'sb-sync-btn';
    btn.innerHTML = '\u2601\uFE0F <span style="font-size:13px;font-weight:600;margin-left:4px">Sync</span>';
    btn.title = 'Synchronisation cloud';
    Object.assign(btn.style, {
      position: 'fixed', bottom: '20px', left: '20px', zIndex: '99999',
      height: '46px', borderRadius: '23px', padding: '0 18px 0 14px',
      background: '#2196f3', color: '#fff', border: 'none',
      fontSize: '20px', cursor: 'pointer', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 3px 12px rgba(33,150,243,.5)', transition: 'transform .15s',
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
      await loadSDK();
      initClient();
      await getUser();
    } catch (e) {
      console.warn('[Supabase Sync]', e);
    }
    createBtn();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();

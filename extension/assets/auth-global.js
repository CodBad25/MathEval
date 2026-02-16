/* ──────────────────────────────────────────────────────────────────────────
   auth-global.js – Authentification globale pour MathEval

   Chargé sur TOUTES les pages (pas seulement correction).
   Gère : SDK Supabase, session, modal premier-visit, indicateur header.
   Expose window.__supabaseAuth pour supabase-sync.js
   ────────────────────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  const SUPABASE_URL = 'https://ehxdbjgvqzpttuafwufh.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoeGRiamd2cXpwdHR1YWZ3dWZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA3NDA5NDEsImV4cCI6MjA4NjMxNjk0MX0.6QETEpU6VR_KvI4gDRbyxeqLmYZn3vb0EwqkHrh7DK4';
  const CHOICE_KEY = 'matheval_auth_choice';
  const FONT = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

  let sb = null, user = null;

  const isCorrection = location.search.includes('correction');
  const $ = (s, c = document) => c.querySelector(s);
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
    return sb;
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
    if (data.session) user = data.user;
    return data;
  }

  async function doSignOut() {
    await sb.auth.signOut();
    user = null;
    localStorage.removeItem(CHOICE_KEY);
  }

  async function getUser() {
    if (!sb) return null;
    try {
      const { data: { user: u } } = await sb.auth.getUser();
      user = u;
      return u;
    } catch { user = null; return null; }
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
      fontFamily: FONT
    });
    t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(() => { t.style.opacity = '1'; t.style.transform = 'translateX(0)'; });
    setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 400); }, 3500);
  }

  /* ── Expose global ─────────────────────────────────── */
  window.__supabaseAuth = {
    get client() { return sb; },
    get user() { return user; },
    set user(u) { user = u; },
    doSignIn, doSignUp, doSignOut, getUser, toast, loadSDK, initClient
  };

  /* ── Styles communs ─────────────────────────────────── */
  const S = {
    input: 'width:100%;padding:9px;border:1px solid #ddd;border-radius:6px;font-size:13px;box-sizing:border-box',
    label: 'font-size:12px;font-weight:600;display:block;margin-bottom:3px;color:#555',
    btnPrimary: 'padding:8px 14px;border:none;border-radius:6px;background:#2196f3;color:#fff;cursor:pointer;font-size:13px;font-weight:600',
    btnOutline: 'padding:8px 14px;border:1px solid #ddd;border-radius:6px;background:#fff;cursor:pointer;font-size:13px',
    h3: 'margin:0 0 14px;font-size:17px;color:#2c3e50',
    error: 'display:none;padding:8px 12px;border-radius:6px;background:#fff3f3;color:#f44336;font-size:12px;margin-bottom:10px'
  };

  /* ── Modal helpers ─────────────────────────────────── */
  let modal = null;

  function openModal() {
    if (modal) modal.remove();
    modal = document.createElement('div');
    Object.assign(modal.style, {
      position: 'fixed', inset: '0', zIndex: '100000',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'rgba(0,0,0,.45)', backdropFilter: 'blur(2px)'
    });
    const box = document.createElement('div');
    Object.assign(box.style, {
      background: '#fff', borderRadius: '12px', padding: '24px', maxWidth: '420px',
      width: '90%', maxHeight: '80vh', overflowY: 'auto',
      boxShadow: '0 8px 32px rgba(0,0,0,.3)', fontFamily: FONT
    });
    modal.appendChild(box);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
    document.body.appendChild(modal);
    return box;
  }

  function closeModal() { if (modal) { modal.remove(); modal = null; } }

  /* ── Modal premier-visit (choix cloud / local) ────── */
  function showChoiceModal() {
    const b = openModal();
    b.innerHTML = `
      <h3 style="${S.h3}">Bienvenue sur MathEval</h3>
      <p style="font-size:13px;color:#555;margin:0 0 18px;line-height:1.5">
        Souhaitez-vous synchroniser vos données entre vos appareils ?
      </p>
      <div style="display:flex;gap:10px;flex-wrap:wrap">
        <button id="ag-cloud" style="flex:1;min-width:140px;padding:14px 12px;border:2px solid #2196f3;
          border-radius:10px;background:#e3f2fd;cursor:pointer;text-align:center;font-family:${FONT}">
          <div style="font-size:24px;margin-bottom:6px">\u2601\uFE0F</div>
          <div style="font-size:13px;font-weight:600;color:#1976d2">Me connecter</div>
          <div style="font-size:11px;color:#666;margin-top:4px">Sync cross-device</div>
        </button>
        <button id="ag-local" style="flex:1;min-width:140px;padding:14px 12px;border:2px solid #ddd;
          border-radius:10px;background:#fafafa;cursor:pointer;text-align:center;font-family:${FONT}">
          <div style="font-size:24px;margin-bottom:6px">\uD83D\uDCBE</div>
          <div style="font-size:13px;font-weight:600;color:#555">Travailler en local</div>
          <div style="font-size:11px;color:#666;margin-top:4px">Données sur cet appareil</div>
        </button>
      </div>`;

    $('#ag-cloud', b).onclick = () => {
      closeModal();
      showLoginModal();
    };
    $('#ag-local', b).onclick = () => {
      localStorage.setItem(CHOICE_KEY, 'local');
      closeModal();
      updateIndicator();
    };
  }

  /* ── Modal de connexion ────────────────────────────── */
  function showLoginModal() {
    const b = openModal();
    b.innerHTML = `
      <h3 style="${S.h3}">Connexion</h3>
      <div style="margin-bottom:10px">
        <label style="${S.label}">Email</label>
        <input id="ag-email" type="email" placeholder="votre@email.com" style="${S.input}">
      </div>
      <div style="margin-bottom:14px">
        <label style="${S.label}">Mot de passe</label>
        <input id="ag-pwd" type="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" style="${S.input}">
      </div>
      <div id="ag-err" style="${S.error}"></div>
      <div style="display:flex;gap:8px;justify-content:flex-end;flex-wrap:wrap">
        <button id="ag-cancel" style="${S.btnOutline}">Annuler</button>
        <button id="ag-signup" style="padding:8px 14px;border:1px solid #2196f3;border-radius:6px;background:#fff;color:#2196f3;cursor:pointer;font-size:13px">
          Cr\u00e9er un compte
        </button>
        <button id="ag-login" style="${S.btnPrimary}">Se connecter</button>
      </div>`;

    const err = msg => { const e = $('#ag-err', b); e.textContent = msg; e.style.display = 'block'; };
    $('#ag-cancel', b).onclick = closeModal;

    $('#ag-login', b).onclick = async () => {
      const email = $('#ag-email', b).value.trim(), pwd = $('#ag-pwd', b).value;
      if (!email || !pwd) return err('Email et mot de passe requis');
      try {
        await doSignIn(email, pwd);
        localStorage.setItem(CHOICE_KEY, 'cloud');
        closeModal();
        toast('Connect\u00e9 !', 'success');
        updateIndicator();
      } catch (e) {
        err(e.message.includes('Invalid') ? 'Email ou mot de passe incorrect' : e.message);
      }
    };

    $('#ag-signup', b).onclick = async () => {
      const email = $('#ag-email', b).value.trim(), pwd = $('#ag-pwd', b).value;
      if (!email || !pwd) return err('Email et mot de passe requis');
      if (pwd.length < 6) return err('Mot de passe : 6 caract\u00e8res minimum');
      try {
        const d = await doSignUp(email, pwd);
        if (d.session) {
          localStorage.setItem(CHOICE_KEY, 'cloud');
          closeModal();
          toast('Compte cr\u00e9\u00e9 et connect\u00e9 !', 'success');
          updateIndicator();
        } else {
          toast('V\u00e9rifiez votre email pour confirmer le compte', 'info');
        }
      } catch (e) { err(e.message); }
    };

    b.addEventListener('keydown', e => { if (e.key === 'Enter') $('#ag-login', b).click(); });
  }

  /* ── Indicateur header ─────────────────────────────── */
  function createIndicator() {
    const btn = document.createElement('button');
    btn.id = 'matheval-auth-indicator';
    Object.assign(btn.style, {
      background: 'transparent', border: 'none', cursor: 'pointer',
      fontSize: '18px', padding: '4px 8px', borderRadius: '6px',
      display: 'flex', alignItems: 'center', gap: '4px',
      transition: 'background .2s', fontFamily: FONT
    });
    btn.onmouseenter = () => btn.style.background = 'rgba(0,0,0,.08)';
    btn.onmouseleave = () => btn.style.background = 'transparent';
    return btn;
  }

  function updateIndicator() {
    const btn = document.getElementById('matheval-auth-indicator');
    if (!btn) return;
    if (user) {
      btn.innerHTML = '<span style="font-size:16px">\u2601\uFE0F</span><span style="font-size:11px;color:#4caf50;font-weight:600">Cloud</span>';
      btn.title = 'Connect\u00e9 : ' + (user.email || '');
      btn.onclick = showUserMenu;
    } else {
      btn.innerHTML = '<span style="font-size:16px">\uD83D\uDCBE</span><span style="font-size:11px;color:#999;font-weight:500">Local</span>';
      btn.title = 'Mode local \u2013 cliquer pour se connecter';
      btn.onclick = showLoginModal;
    }
  }

  /* ── Mini-menu utilisateur ─────────────────────────── */
  function showUserMenu() {
    // Remove existing menu
    const old = document.getElementById('ag-user-menu');
    if (old) { old.remove(); return; }

    const btn = document.getElementById('matheval-auth-indicator');
    if (!btn) return;
    const rect = btn.getBoundingClientRect();

    const menu = document.createElement('div');
    menu.id = 'ag-user-menu';
    Object.assign(menu.style, {
      position: 'fixed', top: (rect.bottom + 6) + 'px', right: (window.innerWidth - rect.right) + 'px',
      zIndex: '100001', background: '#fff', borderRadius: '8px', padding: '10px 0',
      boxShadow: '0 4px 20px rgba(0,0,0,.2)', fontFamily: FONT, minWidth: '180px'
    });
    menu.innerHTML = `
      <div style="padding:6px 16px;font-size:12px;color:#666;border-bottom:1px solid #eee;margin-bottom:4px">
        ${esc(user?.email || '')}
      </div>
      <button id="ag-menu-logout" style="display:block;width:100%;padding:8px 16px;border:none;
        background:none;text-align:left;cursor:pointer;font-size:13px;color:#e53935;font-family:${FONT}">
        D\u00e9connexion
      </button>`;

    document.body.appendChild(menu);

    $('#ag-menu-logout', menu).onclick = async () => {
      await doSignOut();
      menu.remove();
      toast('D\u00e9connect\u00e9', 'info');
      updateIndicator();
    };

    // Close on click outside
    const close = e => {
      if (!menu.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
        menu.remove();
        document.removeEventListener('click', close);
      }
    };
    setTimeout(() => document.addEventListener('click', close), 10);
  }

  /* ── Inject indicator into header ──────────────────── */
  function injectIndicator() {
    if (document.getElementById('matheval-auth-indicator')) return;

    const btn = createIndicator();
    updateIndicator();

    // Try to find a suitable header container
    const tryInject = () => {
      const header = document.querySelector('#appMathalea header')
        || document.querySelector('#appMathalea nav')
        || document.querySelector('#app header')
        || document.querySelector('#app nav');
      if (header) {
        // Insert at the end of the header, before the last child or append
        const container = header.querySelector('.flex') || header;
        container.appendChild(btn);
        updateIndicator();
        return true;
      }
      return false;
    };

    if (tryInject()) return;

    // Use MutationObserver to wait for Svelte to render
    const observer = new MutationObserver(() => {
      if (tryInject()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    // Fallback after 5s: fixed position
    setTimeout(() => {
      observer.disconnect();
      if (!document.getElementById('matheval-auth-indicator')?.parentElement
        || document.getElementById('matheval-auth-indicator')?.parentElement === document.body) {
        // Not injected yet, use fixed position
        if (!document.getElementById('matheval-auth-indicator')) {
          document.body.appendChild(btn);
        }
        Object.assign(btn.style, {
          position: 'fixed', top: '8px', right: '8px', zIndex: '99998',
          background: 'rgba(255,255,255,.9)', boxShadow: '0 2px 8px rgba(0,0,0,.15)',
          padding: '6px 10px', borderRadius: '8px'
        });
        updateIndicator();
      }
    }, 5000);
  }

  /* ── Init ─────────────────────────────────────────── */
  async function init() {
    try {
      await loadSDK();
      initClient();
      await getUser();
    } catch (e) {
      console.warn('[Auth Global]', e);
    }

    // Inject indicator on all pages
    injectIndicator();

    // Show choice modal on first visit (not on correction page)
    if (!isCorrection && !localStorage.getItem(CHOICE_KEY) && !user) {
      showChoiceModal();
    }
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();
})();

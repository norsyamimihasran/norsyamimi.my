(() => {
  const D = window.PORTFOLIO;
  const W = 4000, H = 2600;            // canvas size in px
  const HOME = { x: 2000, y: 1250 };   // hero position
  const UNIT = 40;                     // 1 ruler unit = 40px
  const ANCHORS = { home: HOME, work: { x: 760, y: 1300 }, about: { x: 1650, y: 560 }, earlier: { x: 3200, y: 1330 }, uni: { x: 2050, y: 2150 } };
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  const $ = (s, r = document) => r.querySelector(s);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const vp = $('#viewport'), world = $('#world');
  world.style.width = W + 'px';
  world.style.height = H + 'px';

  /* ---------------- Thumbnails (mini mock UIs) ---------------- */
  const s = (cls, style, txt = '') => `<span class="${cls}" style="${style}">${txt}</span>`;
  const T = {
    pay: () => `<span class="win">
      ${s('txt', 'left:14px;top:22px;font-size:11px;color:#6b7390', 'Payment')}
      ${s('big', 'left:14px;top:38px', 'RM 120.00')}
      ${s('bar soft', 'left:14px;right:14px;top:82px;height:28px;border-radius:6px')}
      ${s('bar', 'left:24px;width:46%;top:93px')}
      ${s('bar acc', 'left:14px;right:14px;top:120px;height:26px;border-radius:6px')}
      ${s('txt', 'left:0;right:0;top:126px;text-align:center;color:#fff;font-size:11px', 'Pay now')}</span>`,
    gold: () => `<span class="win">
      ${s('txt', 'left:14px;top:22px;font-size:11px;color:#6b7390', 'XAU / MYR')}
      ${s('big', 'left:14px;top:36px', '+2.4%')}
      <svg style="left:10px;right:10px;top:78px;width:calc(100% - 20px);height:70px" viewBox="0 0 200 70" preserveAspectRatio="none">
        <polygon points="0,70 0,55 25,50 45,58 70,38 95,44 120,26 145,32 170,14 200,8 200,70" fill="hsl(42 90% 55% / .25)"/>
        <polyline points="0,55 25,50 45,58 70,38 95,44 120,26 145,32 170,14 200,8" fill="none" stroke="hsl(36 85% 42%)" stroke-width="3"/>
      </svg></span>`,
    dash: () => `<span class="win">
      ${s('acc', 'left:0;top:20px;bottom:0;width:44px')}
      ${s('bar', 'left:58px;width:40%;top:28px')}
      ${[38, 62, 48, 80, 56, 92].map((h, i) => s(i === 5 ? 'acc' : 'soft', `left:${58 + i * 26}px;bottom:16px;width:16px;height:${h}px;border-radius:3px 3px 0 0`)).join('')}</span>`,
    support: () => `<span class="win">
      ${s('soft', 'left:14px;top:26px;width:62%;height:30px;border-radius:12px 12px 12px 2px')}
      ${s('acc', 'right:14px;top:66px;width:55%;height:30px;border-radius:12px 12px 2px 12px')}
      ${s('soft', 'left:14px;top:106px;width:48%;height:30px;border-radius:12px 12px 12px 2px')}
      ${s('txt', 'right:24px;top:73px;color:#fff;font-size:11px', 'Refund done ✓')}</span>`,
    doc: () => `<span class="win" style="left:50px;right:50px">
      ${s('txt', 'left:14px;top:22px;font-size:11px', 'UAT CHECKLIST')}
      ${[0, 1, 2, 3].map(i => s('acc', `left:14px;top:${44 + i * 24}px;width:12px;height:12px;border-radius:3px`) + s('bar', `left:34px;right:${20 + (i % 2) * 30}px;top:${47 + i * 24}px`)).join('')}</span>`,
    mobile: () => `<span style="left:50%;margin-left:-58px;top:18px;width:116px;bottom:-30px;background:#fff;border:6px solid #0a1430;border-radius:20px">
      ${s('txt', 'left:10px;top:12px;font-size:11px', 'My Tasks')}
      ${[0, 1, 2, 3].map(i => s(i < 2 ? 'acc' : 'soft', `left:10px;top:${36 + i * 26}px;width:12px;height:12px;border-radius:50%`) + s('bar', `left:28px;right:10px;top:${39 + i * 26}px`)).join('')}</span>`,
    ai: () => `<span style="inset:0;background:radial-gradient(circle at 50% 60%, hsl(285 40% 30%), #0a1430)"></span>
      <span style="left:50%;top:58px;width:64px;height:84px;margin-left:-32px;background:hsl(30 50% 72%);border-radius:30px 30px 20px 20px"></span>
      <span style="left:50%;top:44px;width:104px;height:110px;margin-left:-52px;border:3px solid #7CFF6B;border-radius:4px"></span>
      ${s('txt', 'left:calc(50% - 52px);top:24px;background:#7CFF6B;padding:2px 6px;font:500 11px JetBrains Mono,monospace', 'WHERE 0.94')}`,
    camp: () => `<span style="inset:0;background:linear-gradient(#bfe3ff, #e9f6ff)"></span>
      <span style="right:34px;top:22px;width:34px;height:34px;border-radius:50%;background:#ffd23f"></span>
      <span style="left:0;right:0;bottom:0;height:52px;background:hsl(130 45% 40%)"></span>
      <span style="left:50%;bottom:40px;width:140px;height:96px;margin-left:-70px;background:hsl(14 80% 55%);clip-path:polygon(50% 0,100% 100%,0 100%)"></span>
      <span style="left:50%;bottom:40px;width:40px;height:50px;margin-left:-20px;background:#0a1430;clip-path:polygon(50% 0,100% 100%,0 100%)"></span>`,
    media: () => `<span style="left:40px;top:26px;width:110px;height:150px;background:#fff;transform:rotate(-8deg);box-shadow:0 6px 16px rgba(0,0,0,.3)">
        ${s('acc', 'left:10px;right:10px;top:10px;height:70px')}${s('bar', 'left:10px;right:30px;top:92px')}${s('bar', 'left:10px;right:50px;top:106px')}</span>
      <span style="right:40px;top:34px;width:110px;height:150px;background:var(--soft);transform:rotate(6deg);box-shadow:0 6px 16px rgba(0,0,0,.3)">
        ${s('big', 'left:12px;top:14px;font-size:30px;line-height:1', 'POST<br>ER')}</span>`,
    expense: () => `<span class="win" style="left:60px;right:60px">
      ${s('txt', 'left:14px;top:22px;font-size:11px', 'CLAIM #0231')}
      ${[0, 1, 2].map(i => s('bar', `left:14px;right:60px;top:${46 + i * 18}px`) + s('bar soft', `right:14px;width:36px;top:${46 + i * 18}px`)).join('')}
      ${s('big', 'left:14px;top:104px;font-size:20px', 'RM 1,284')}
      ${s('txt', 'right:8px;top:18px;transform:rotate(-12deg);border:2px solid #1f9d55;color:#1f9d55;padding:1px 6px;font-size:11px', 'APPROVED')}</span>`,
  };
  const thumbHTML = p => `<span class="thumb" style="--hue:${p.hue}">${(T[p.kind] || T.dash)()}</span>`;

  /* ---------------- Render content ---------------- */
  $('#heroName').textContent = D.shortName;
  $('#heroTag').textContent = D.tag;
  $('#heroIntro').textContent = D.intro;
  $('#aboutText').innerHTML = D.about.map(p => `<p>${esc(p)}</p>`).join('');
  $('#loc').textContent = D.location;

  const ICONS = {
    mail: '<path d="M4 6h16v12H4z"/><path d="m4 7 8 6 8-6"/>',
    github: '<path d="M9 19c-4 1.3-4-2-6-2.5M15 21v-3.5a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1-.3-3.3 1.3a11.4 11.4 0 0 0-6 0C6.7 2.5 5.7 2.8 5.7 2.8a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4.3 9.2c0 4.6 2.8 5.7 5.5 6a3 3 0 0 0-.8 2.3V21"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/>',
  };
  $('#socials').innerHTML = D.links.map(l => `
    <li><a href="${esc(l.href)}" ${l.href.startsWith('http') ? 'target="_blank" rel="noopener"' : ''}>
      <span class="ic" style="background:${l.color}"><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[l.icon] || ''}</svg></span>
      <span class="lbl">${esc(l.label)}</span></a></li>`).join('');

  $('#skills').innerHTML = Object.entries(D.skills).map(([k, v]) =>
    `<div class="skillgroup"><h3>${esc(k)}</h3><ul class="chips">${v.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>`).join('');

  $('#timeline').innerHTML = D.experience.slice(0, 4).map(e =>
    `<li><time>${esc(e.period)}</time><b>${esc(e.role)}</b><span>${esc(e.org)}</span></li>`).join('');

  $('#education').innerHTML = D.education.map(e =>
    `<li><time>${esc(e.period)}</time><b>${esc(e.title)}</b><span>${esc(e.org)}</span></li>`).join('');

  $('#medalYear').textContent = D.achievement.year;
  $('#medalTitle').textContent = D.achievement.title.split(' ')[0].toUpperCase();
  $('#medalCap').textContent = `${D.achievement.title}, ${D.achievement.detail}`;

  $('#leadTitle').textContent = D.leadership.title;
  $('#leadOrg').textContent = D.leadership.org;
  $('#leadRoles').innerHTML = D.leadership.roles.map(r => `<li>${esc(r)}</li>`).join('');

  const hero = $('#hero');
  hero.style.left = HOME.x + 'px';
  hero.style.top = HOME.y + 'px';

  const items = $('#items');
  items.innerHTML =
    D.groups.map(g => `<h2 class="label" style="left:${g.x}px;top:${g.y}px"><small>// section</small>${esc(g.label)}</h2>`).join('') +
    D.projects.map((p, i) => `
      <button class="card" data-project="${i}" style="left:${p.x}px;top:${p.y}px;--r:${p.r || 0}deg">
        ${thumbHTML(p)}
        <span class="cap"><strong>${esc(p.title)}</strong><span>${esc(p.caption)}</span></span>
      </button>`).join('');

  /* ---------------- Pixel camo background ---------------- */
  (function paintBackground() {
    const cv = $('#bg'), cell = 20, cw = W / cell, ch = H / cell;
    cv.width = cw; cv.height = ch;
    const ctx = cv.getContext('2d');
    let seed = 7;
    const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const lattice = (step) => {
      const gw = Math.ceil(cw / step) + 2, gh = Math.ceil(ch / step) + 2;
      const g = Array.from({ length: gh }, () => Array.from({ length: gw }, rnd));
      return (x, y) => {
        const gx = x / step, gy = y / step, x0 = Math.floor(gx), y0 = Math.floor(gy);
        const fx = gx - x0, fy = gy - y0, sx = fx * fx * (3 - 2 * fx), sy = fy * fy * (3 - 2 * fy);
        const a = g[y0][x0] + (g[y0][x0 + 1] - g[y0][x0]) * sx;
        const b = g[y0 + 1][x0] + (g[y0 + 1][x0 + 1] - g[y0 + 1][x0]) * sx;
        return a + (b - a) * sy;
      };
    };
    const n1 = lattice(18), n2 = lattice(6);
    const shades = ['#0b1730', '#0e1d3d', '#12244b', '#162b58', '#1b3466'];
    for (let y = 0; y < ch; y++) for (let x = 0; x < cw; x++) {
      const v = n1(x, y) * 0.75 + n2(x, y) * 0.25;
      ctx.fillStyle = shades[Math.min(shades.length - 1, Math.floor(v * shades.length))];
      ctx.fillRect(x, y, 1, 1);
    }
  })();

  /* ---------------- Camera ---------------- */
  const cam = { x: 0, y: 0, s: 1 };
  const MIN_S = 0.35, MAX_S = 1.6;
  const view = () => ({ w: vp.clientWidth, h: vp.clientHeight });

  function clamp() {
    const { w, h } = view(), m = 240 * cam.s;
    const fit = (pos, size, world) => {
      const min = size - world * cam.s - m, max = m;
      return min > max ? (size - world * cam.s) / 2 : Math.min(max, Math.max(min, pos));
    };
    cam.x = fit(cam.x, w, W);
    cam.y = fit(cam.y, h, H);
  }

  let frame = 0;
  function render() {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      world.style.transform = `translate3d(${cam.x}px, ${cam.y}px, 0) scale(${cam.s})`;
      drawRulers();
      markActive();
    });
  }

  function centerOn(x, y, s = cam.s) {
    const { w, h } = view();
    return { x: w / 2 - x * s, y: h / 2 - y * s, s };
  }

  let anim = 0;
  function flyTo(x, y, s = cam.s) {
    cancelAnimationFrame(anim); momentum.stop();
    const from = { ...cam }, to = centerOn(x, y, s);
    const saved = { ...cam }; Object.assign(cam, to); clamp(); Object.assign(to, cam); Object.assign(cam, saved);
    if (reduceMotion) { Object.assign(cam, to); return render(); }
    const t0 = performance.now(), dur = 750;
    const ease = t => 1 - Math.pow(1 - t, 4);
    const step = now => {
      const t = Math.min(1, (now - t0) / dur), k = ease(t);
      cam.x = from.x + (to.x - from.x) * k;
      cam.y = from.y + (to.y - from.y) * k;
      cam.s = from.s + (to.s - from.s) * k;
      render();
      if (t < 1) anim = requestAnimationFrame(step);
    };
    anim = requestAnimationFrame(step);
  }

  function zoomAt(factor, sx, sy) {
    const ns = Math.min(MAX_S, Math.max(MIN_S, cam.s * factor));
    cam.x = sx - (sx - cam.x) * (ns / cam.s);
    cam.y = sy - (sy - cam.y) * (ns / cam.s);
    cam.s = ns; clamp(); render();
  }

  const defaultScale = () => {
    const w = innerWidth;
    return w < 480 ? 0.5 : w < 800 ? 0.65 : w < 1200 ? 0.85 : 1;
  };

  /* ---------------- Drag / momentum ---------------- */
  const momentum = {
    vx: 0, vy: 0, id: 0,
    start() {
      const tick = () => {
        this.vx *= 0.92; this.vy *= 0.92;
        if (Math.hypot(this.vx, this.vy) < 0.3) return;
        cam.x += this.vx; cam.y += this.vy; clamp(); render();
        this.id = requestAnimationFrame(tick);
      };
      if (!reduceMotion) this.id = requestAnimationFrame(tick);
    },
    stop() { cancelAnimationFrame(this.id); this.vx = this.vy = 0; },
  };

  let drag = null, moved = false;
  vp.addEventListener('pointerdown', e => {
    if (e.button !== 0 || e.target.closest('.note, .panel, .modal')) return;
    cancelAnimationFrame(anim); momentum.stop();
    drag = { id: e.pointerId, sx: e.clientX, sy: e.clientY, lx: e.clientX, ly: e.clientY, lt: performance.now() };
    moved = false;
  });
  addEventListener('pointermove', e => {
    showCoord(e);
    if (!drag || e.pointerId !== drag.id) return;
    if (!moved && Math.hypot(e.clientX - drag.sx, e.clientY - drag.sy) > 5) { moved = true; vp.classList.add('is-grabbing'); }
    if (!moved) return;
    const dx = e.clientX - drag.lx, dy = e.clientY - drag.ly, now = performance.now(), dt = Math.max(1, now - drag.lt);
    cam.x += dx; cam.y += dy; clamp(); render();
    momentum.vx = 0.8 * (dx / dt) * 16 + 0.2 * momentum.vx;
    momentum.vy = 0.8 * (dy / dt) * 16 + 0.2 * momentum.vy;
    Object.assign(drag, { lx: e.clientX, ly: e.clientY, lt: now });
  });
  const endDrag = e => {
    if (!drag || e.pointerId !== drag.id) return;
    vp.classList.remove('is-grabbing');
    if (moved && performance.now() - drag.lt < 80) momentum.start(); else momentum.stop();
    drag = null;
  };
  addEventListener('pointerup', endDrag);
  addEventListener('pointercancel', endDrag);
  // A drag should not count as a click on the card underneath
  vp.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);

  vp.addEventListener('wheel', e => {
    e.preventDefault(); momentum.stop(); cancelAnimationFrame(anim);
    const r = vp.getBoundingClientRect();
    if (e.ctrlKey || e.metaKey) zoomAt(Math.exp(-e.deltaY * 0.01), e.clientX - r.left, e.clientY - r.top);
    else { cam.x -= e.shiftKey ? e.deltaY : e.deltaX; cam.y -= e.shiftKey ? 0 : e.deltaY; clamp(); render(); }
  }, { passive: false });

  addEventListener('keydown', e => {
    if (document.querySelector('dialog[open]') || /INPUT|TEXTAREA/.test(document.activeElement.tagName)) return;
    const k = { ArrowLeft: [80, 0], ArrowRight: [-80, 0], ArrowUp: [0, 80], ArrowDown: [0, -80] }[e.key];
    if (k) { e.preventDefault(); cam.x += k[0]; cam.y += k[1]; clamp(); render(); }
    if (e.key === '+' || e.key === '=') zoomAt(1.2, view().w / 2, view().h / 2);
    if (e.key === '-') zoomAt(1 / 1.2, view().w / 2, view().h / 2);
    if (e.key === '0' || e.key === 'Home') flyTo(HOME.x, HOME.y, defaultScale());
  });

  // Keep keyboard-focused cards in view
  world.addEventListener('focusin', e => {
    const el = e.target.closest('.card, .paper, .pill, a, button'); if (!el || drag) return;
    const r = el.getBoundingClientRect(), v = vp.getBoundingClientRect();
    if (r.left < v.left || r.right > v.right || r.top < v.top || r.bottom > v.bottom) {
      const wx = (r.left + r.width / 2 - v.left - cam.x) / cam.s, wy = (r.top + r.height / 2 - v.top - cam.y) / cam.s;
      flyTo(wx, wy);
    }
  });
  // Stop the browser from scrolling the viewport itself on focus
  vp.addEventListener('scroll', () => { vp.scrollLeft = 0; vp.scrollTop = 0; });

  $('#recenter').onclick = () => flyTo(HOME.x, HOME.y, defaultScale());
  $('#zoomIn').onclick = () => zoomAt(1.25, view().w / 2, view().h / 2);
  $('#zoomOut').onclick = () => zoomAt(0.8, view().w / 2, view().h / 2);
  document.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => {
    const go = b.dataset.go, a = ANCHORS[go];
    flyTo(a.x, a.y, go === 'home' ? defaultScale() : Math.min(cam.s, defaultScale()));
  }));

  // Highlight the sticky-nav item for whichever area is in the middle of the screen
  const navBtns = [...document.querySelectorAll('.topnav [data-go]')];
  function markActive() {
    const { w, h } = view();
    const cx = (w / 2 - cam.x) / cam.s, cy = (h / 2 - cam.y) / cam.s;
    let best = null, bestD = 900;
    for (const [k, a] of Object.entries(ANCHORS)) {
      const d = Math.hypot(a.x - cx, a.y - cy);
      if (d < bestD) { bestD = d; best = k; }
    }
    navBtns.forEach(b => b.classList.toggle('is-active', b.dataset.go === best));
  }

  /* ---------------- Rulers + coordinate tag ---------------- */
  const rx = $('#rulerX'), ry = $('#rulerY'), coord = $('#coord');
  function sizeRulers() {
    const dpr = devicePixelRatio || 1;
    for (const c of [rx, ry]) {
      const r = c.getBoundingClientRect();
      c.width = Math.round(r.width * dpr); c.height = Math.round(r.height * dpr);
      c.getContext('2d').setTransform(dpr, 0, 0, dpr, 0, 0);
    }
  }
  function drawAxis(c, len, thick, offset, horizontal) {
    const ctx = c.getContext('2d');
    ctx.clearRect(0, 0, horizontal ? len : thick, horizontal ? thick : len);
    ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--ruler-text');
    ctx.strokeStyle = '#2a3c6b';
    ctx.font = '500 9px "JetBrains Mono", monospace';
    const px = UNIT * cam.s;
    const every = cam.s < 0.5 ? 10 : 5;
    const first = Math.floor(-offset / px), last = Math.ceil((len - offset) / px);
    ctx.beginPath();
    for (let u = first; u <= last; u++) {
      const p = Math.round(offset + u * px) + 0.5;
      const major = u % every === 0;
      const t = major ? thick * 0.55 : thick * 0.25;
      if (horizontal) { ctx.moveTo(p, thick); ctx.lineTo(p, thick - t); }
      else { ctx.moveTo(thick, p); ctx.lineTo(thick - t, p); }
      if (major) {
        if (horizontal) ctx.fillText(u, p + 3, 10);
        else { ctx.save(); ctx.translate(9, p + 3); ctx.rotate(-Math.PI / 2); ctx.textAlign = 'right'; ctx.fillText(u, 0, 0); ctx.restore(); }
      }
    }
    ctx.stroke();
  }
  function drawRulers() {
    const size = rx.getBoundingClientRect().height;
    drawAxis(rx, rx.getBoundingClientRect().width, size, cam.x, true);
    drawAxis(ry, ry.getBoundingClientRect().height, size, cam.y, false);
  }
  function showCoord(e) {
    if (e.pointerType !== 'mouse') return;
    const r = vp.getBoundingClientRect();
    const inside = e.clientX >= r.left && e.clientY >= r.top && !e.target.closest('.hud, dialog');
    coord.classList.toggle('is-on', inside);
    if (!inside) return;
    const wx = (e.clientX - r.left - cam.x) / cam.s / UNIT, wy = (e.clientY - r.top - cam.y) / cam.s / UNIT;
    coord.textContent = `${wx.toFixed(1)} , ${wy.toFixed(1)}`;
    coord.style.transform = `translate(${e.clientX + 14}px, ${e.clientY + 16}px)`;
  }
  document.addEventListener('pointerleave', () => coord.classList.remove('is-on'));

  /* ---------------- Dialogs ---------------- */
  const pm = $('#projectModal'), rm = $('#resumeModal');
  world.addEventListener('click', e => {
    const card = e.target.closest('[data-project]');
    if (!card) return;
    const p = D.projects[+card.dataset.project];
    $('#pmThumb').innerHTML = thumbHTML(p);
    $('#pmMeta').textContent = p.meta;
    $('#pmTitle').textContent = p.title;
    $('#pmTech').innerHTML = p.tech.map(t => `<li>${esc(t)}</li>`).join('');
    $('#pmPoints').innerHTML = p.points.map(t => `<li>${esc(t)}</li>`).join('');
    pm.showModal();
  });

  function buildResume() {
    const job = e => `<div class="job"><div class="job__head"><b>${esc(e.role)}</b><time>${esc(e.period)}</time></div>
      <div class="job__org">${esc(e.org)}</div><ul>${e.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul></div>`;
    const uni = D.projects.filter(p => /UiTM/.test(p.meta));
    $('#resume').innerHTML = `
      <header><img src="assets/img/profile.jpg" alt="">
        <div><h2 id="rsName">${esc(D.name)}</h2><p>${esc(D.role)} · ${esc(D.location)}</p>
        <p><a href="mailto:${esc(D.email)}">${esc(D.email)}</a></p></div></header>
      <h3>Experience</h3>${D.experience.map(job).join('')}
      <h3>University projects</h3>${uni.map(p => job({ role: p.title, org: p.tech.join(', '), period: '', points: p.points })).join('')}
      <div class="cols">
        <div><h3>Education</h3>${D.education.map(e => `<div class="job"><div class="job__head"><b>${esc(e.title)}</b><time>${esc(e.period)}</time></div><div class="job__org">${esc(e.org)}</div></div>`).join('')}</div>
        <div><h3>Achievement</h3><div class="job"><div class="job__head"><b>${esc(D.achievement.title)}</b><time>${esc(D.achievement.year)}</time></div><div class="job__org">${esc(D.achievement.detail)}</div></div>
          <h3>Leadership</h3><div class="job"><b>${esc(D.leadership.title)}</b><div class="job__org">${esc(D.leadership.org)}</div><ul>${D.leadership.roles.map(r => `<li>${esc(r)}</li>`).join('')}</ul></div></div>
      </div>
      <h3>Skills</h3>${Object.entries(D.skills).map(([k, v]) => `<p style="font-size:14px;margin-bottom:6px"><b>${esc(k)}:</b> ${v.map(esc).join(', ')}</p>`).join('')}`;
  }
  buildResume();
  document.addEventListener('click', e => {
    if (e.target.closest('[data-open="resume"]') && !moved) rm.showModal();
    if (e.target.closest('[data-close]')) e.target.closest('dialog').close();
  });
  for (const d of [pm, rm]) d.addEventListener('click', e => { if (e.target === d) d.close(); }); // click backdrop
  $('#printResume').onclick = () => print();

  /* ---------------- Init ---------------- */
  function init() {
    sizeRulers();
    Object.assign(cam, centerOn(HOME.x, HOME.y, defaultScale()));
    clamp(); render();
  }
  addEventListener('resize', () => { sizeRulers(); clamp(); render(); });
  if (document.fonts?.ready) document.fonts.ready.then(drawRulers);
  init();
})();

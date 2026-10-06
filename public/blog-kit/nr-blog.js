/* Nina Ross Atlanta /blog v2: menu, category tabs, short-video player, sticky bar, booking lightbox, article progress + TOC. All content is in the HTML. */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };

  var mb = $('[data-menu]'), mn = $('.mnav');
  if (mb && mn) mb.addEventListener('click', function () { mb.setAttribute('aria-expanded', mn.classList.toggle('is-open')); });

  /* Category tabs: real links; filtered in place on the index */
  var grids = $$('[data-grid]'), empty = $('[data-empty]'), watch = $('[data-watch]');
  if (grids.length) $$('.tabs a').forEach(function (t) {
    t.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey) return;
      e.preventDefault();
      var c = t.getAttribute('data-tab'), shown = 0;
      $$('.tabs a').forEach(function (x) { x.removeAttribute('aria-current'); });
      t.setAttribute('aria-current', 'page');
      grids.forEach(function (g) { $$('.card', g).forEach(function (card) { var on = c === 'all' || card.getAttribute('data-cat') === c; card.hidden = !on; if (on) shown++; }); });
      if (watch) watch.hidden = c !== 'all';
      if (empty) { empty.hidden = shown > 0; if (!shown) $('[data-empty-title]', empty).textContent = t.firstChild.textContent.trim() + ' guides are on the way.'; }
      history.replaceState(null, '', c === 'all' ? '/blog' : t.getAttribute('href'));
    });
  });

  /* Short-video player. Per card: data-yt="SHORTS_ID" or data-file="/video/clip.mp4". Nothing autoplays on the page. */
  var vp = $('[data-vp]'), frame = $('[data-vp-frame]'), lastFocus = null;
  var closeVp = function () { if (!vp || vp.hidden) return; frame.innerHTML = ''; vp.hidden = true; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); };
  $$('[data-video]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      if (!vp || e.metaKey || e.ctrlKey) return;
      e.preventDefault(); lastFocus = a;
      var yt = a.getAttribute('data-yt'), file = a.getAttribute('data-file');
      if (yt) frame.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + encodeURIComponent(yt) + '?autoplay=1&playsinline=1&rel=0" title="' + a.getAttribute('data-title') + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
      else if (file) frame.innerHTML = '<video src="' + file + '" controls autoplay playsinline></video>';
      else frame.innerHTML = '<span class="ph ph--dark" data-slot="VIDEO SLOT · add data-yt or data-file"></span>';
      $('[data-vp-title]').textContent = a.getAttribute('data-title');
      $('[data-vp-link]').href = a.getAttribute('data-article');
      vp.hidden = false; document.body.style.overflow = 'hidden'; $('[data-vp-close]').focus();
    });
  });
  if (vp) {
    $('[data-vp-close]').addEventListener('click', closeVp);
    vp.addEventListener('click', function (e) { if (e.target === vp) closeVp(); });
  }

  /* Sticky mobile bar: after scroll; hides when a real CTA is at least 35% visible */
  var bar = $('[data-sticky]');
  if (bar && 'IntersectionObserver' in window) {
    var vis = new Set(), scrolled = false;
    var upd = function () { bar.setAttribute('data-hidden', (!scrolled || vis.size) ? 'true' : 'false'); };
    var io = new IntersectionObserver(function (en) { en.forEach(function (e) { e.intersectionRatio >= .35 ? vis.add(e.target) : vis.delete(e.target); }); upd(); }, { threshold: [0, .35, 1] });
    $$('[data-book]').forEach(function (a) { if (!bar.contains(a) && !a.closest('.hd')) io.observe(a); });
    addEventListener('scroll', function () { if (!scrolled && scrollY > 240) { scrolled = true; upd(); } }, { passive: true });
  }

  /* Global booking lightbox */
  var BOOK = 'https://ninaross.as.me/hairlossevaluations', lb = null;
  var closeLb = function () { if (lb) { lb.remove(); lb = null; document.body.style.overflow = ''; } };
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-book]');
    if (!a || e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    lb = document.createElement('div'); lb.className = 'booklb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Book your Hair & Body Discovery');
    lb.innerHTML = '<div class="booklb__p"><div class="booklb__h"><span>Book Your Hair &amp; Body Discovery</span><button type="button" aria-label="Close">×</button></div><iframe title="Booking calendar" src="' + BOOK + '"></iframe></div>';
    document.body.appendChild(lb); document.body.style.overflow = 'hidden';
    $('button', lb).addEventListener('click', closeLb); $('button', lb).focus();
    lb.addEventListener('click', function (ev) { if (ev.target === lb) closeLb(); });
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeLb(); closeVp(); } });

  /* Share */
  var sb = $('[data-share]'), sm = $('[data-share-menu]');
  if (sb && sm) {
    sb.addEventListener('click', function () {
      if (navigator.share && matchMedia('(pointer:coarse)').matches) { navigator.share({ title: document.title, url: location.href }).catch(function () {}); return; }
      sm.hidden = !sm.hidden; sb.setAttribute('aria-expanded', !sm.hidden);
    });
    $('[data-copy]', sm).addEventListener('click', function () { var b = this; (navigator.clipboard ? navigator.clipboard.writeText(location.href) : Promise.reject()).then(function () { b.textContent = 'Link copied'; }).catch(function () { b.textContent = location.href; }); });
    document.addEventListener('click', function (e) { if (!e.target.closest('.a3-share')) { sm.hidden = true; sb.setAttribute('aria-expanded', 'false'); } });
  }
  /* Mobile: collapse TOC by default */
  var t0 = $('.a3-side .toc'); if (t0 && innerWidth < 1000) t0.removeAttribute('open');

  /* Article: reading progress + TOC highlight */
  var prog = $('[data-prog]');
  if (prog) addEventListener('scroll', function () { var h = document.documentElement.scrollHeight - innerHeight; prog.style.width = (h > 0 ? scrollY / h * 100 : 0) + '%'; var hero = $('.a3-hero'); prog.style.opacity = !hero || hero.getBoundingClientRect().bottom < 0 ? 1 : 0; }, { passive: true });
  var toc = $$('.toc a');
  if (toc.length && 'IntersectionObserver' in window) {
    var io2 = new IntersectionObserver(function (en) { en.forEach(function (e) { if (e.isIntersecting) toc.forEach(function (l) { l.classList.toggle('is-on', l.getAttribute('href') === '#' + e.target.id); }); }); }, { rootMargin: '-20% 0px -70% 0px' });
    toc.forEach(function (l) { var t = $(l.getAttribute('href')); if (t) io2.observe(t); });
  }

  /* Symptom cards on condition pages: open details as a popup (content stays in HTML for no-JS + SEO) */
  var syms = $$('.dt-sym__d');
  if (syms.length) {
    var pop = null, lastFocus = null;
    var closePop = function () { if (!pop) return; pop.remove(); pop = null; document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); };
    var openPop = function (d) {
      var s = $('summary', d), b = $('.dt-sym__b', d); if (!b) return;
      lastFocus = s;
      var i = syms.indexOf(d);
      pop = document.createElement('div');
      pop.className = 'dt-pop'; pop.setAttribute('role', 'dialog'); pop.setAttribute('aria-modal', 'true'); pop.setAttribute('aria-labelledby', 'dt-pop-t');
      pop.innerHTML = '<div class="dt-pop__p"><button type="button" class="dt-pop__x" aria-label="Close">×</button>'
        + '<p class="dt-pop__n">' + $('i', s).textContent + ' of ' + (syms.length < 10 ? '0' : '') + syms.length + ' · ' + $('span', s).textContent + '</p>'
        + '<h2 id="dt-pop-t">' + $('q', s).outerHTML + '</h2>'
        + '<div class="dt-pop__b">' + b.innerHTML + '</div>'
        + '<div class="dt-pop__f"><a class="nr-btn nr-btn--gold" href="' + BOOK + '" target="_blank" rel="noopener" data-book><span>Find Out What\'s Actually Happening</span><span aria-hidden="true">→</span></a>'
        + '<div class="dt-pop__nav"><button type="button" data-step="-1" aria-label="Previous symptom"' + (i === 0 ? ' disabled' : '') + '>←</button><button type="button" data-step="1" aria-label="Next symptom"' + (i === syms.length - 1 ? ' disabled' : '') + '>→</button></div></div></div>';
      document.body.appendChild(pop); document.body.style.overflow = 'hidden';
      $('.dt-pop__x', pop).addEventListener('click', closePop);
      pop.addEventListener('click', function (e) { if (e.target === pop) closePop(); });
      $$('[data-step]', pop).forEach(function (btn) { btn.addEventListener('click', function () { var n = syms[i + +btn.getAttribute('data-step')]; if (n) { pop.remove(); pop = null; openPop(n); } }); });
      $('.dt-pop__x', pop).focus();
    };
    syms.forEach(function (d) {
      d.classList.add('is-pop');
      $('summary', d).addEventListener('click', function (e) { e.preventDefault(); openPop(d); });
    });
    document.addEventListener('keydown', function (e) {
      if (!pop) return;
      if (e.key === 'Escape') closePop();
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { var b2 = $('[data-step="' + (e.key === 'ArrowRight' ? 1 : -1) + '"]', pop); if (b2 && !b2.disabled) b2.click(); }
    });
  }
})();

(function () {
  if (window.__gcChrome) return;
  window.__gcChrome = true;
  function mark() {
    var path = location.pathname.replace(/\/$/, '') || '/';
    document.querySelectorAll('.gc-hd__nav a, .gc-mnav a').forEach(function (a) {
      var h = a.getAttribute('href');
      if (h !== '/' && (path === h || path.indexOf(h + '/') === 0)) a.setAttribute('aria-current', 'page');
      else a.removeAttribute('aria-current');
    });
  }
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('[data-gc-menu]');
    if (btn) {
      var hd = btn.closest('[data-gc-hd]');
      var open = !hd.classList.contains('is-open');
      hd.classList.toggle('is-open', open);
      btn.setAttribute('aria-expanded', open);
      btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      return;
    }
    if (e.target.closest && e.target.closest('.gc-mnav a, .gc-hd__cta')) {
      document.querySelectorAll('[data-gc-hd].is-open').forEach(function (h) { h.classList.remove('is-open'); });
    }
  });
  function onScroll() {
    document.querySelectorAll('[data-gc-hd]').forEach(function (h) { h.classList.toggle('is-scrolled', window.scrollY > 4); });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.__gcMark = function () { mark(); onScroll(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', window.__gcMark);
  else window.__gcMark();
})();

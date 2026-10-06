/* Shared booking lightbox for static pages.
   Intercepts any booking CTA (Acuity link, #book, /book) and opens the
   calendar in a tall scrollable in-page modal. */
(function () {
  if (window.__nrBookingLightbox) return;
  window.__nrBookingLightbox = true;

  var BOOKING_URL = 'https://ninaross.as.me/hairlossevaluations';
  var overlay = null;

  var close = function () {
    if (!overlay) return;
    overlay.remove();
    overlay = null;
    document.body.style.overflow = '';
  };

  var open = function () {
    if (overlay) return;
    overlay = document.createElement('div');
    overlay.className = 'nr-booklb';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Book your discovery');
    overlay.innerHTML =
      '<div class="nr-booklb__panel">' +
        '<div class="nr-booklb__head">' +
          '<span>Book Your $99 Hair &amp; Body Discovery</span>' +
          '<button type="button" class="nr-booklb__close" aria-label="Close booking">\u00d7</button>' +
        '</div>' +
        '<div class="nr-booklb__body">' +
          '<iframe title="Book your discovery" src="' + BOOKING_URL + '" loading="eager"></iframe>' +
        '</div>' +
        '<div class="nr-booklb__foot">' +
          '<a data-booking-fallback href="' + BOOKING_URL + '" target="_blank" rel="noopener noreferrer">Trouble loading? Open the calendar in a new tab</a>' +
        '</div>' +
      '</div>';
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    overlay.querySelector('.nr-booklb__close').addEventListener('click', close);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });
  };

  window.__nrOpenBooking = open;

  var isBookingHref = function (href) {
    if (!href) return false;
    return href.indexOf('ninaross.as.me') !== -1 || href === '#book' || href === '/book';
  };

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
    var a = e.target && e.target.closest ? e.target.closest('a,button') : null;
    if (!a) return;
    if (a.hasAttribute('data-booking-fallback')) return;
    var href = a.getAttribute('href') || a.getAttribute('data-href') || '';
    if (!isBookingHref(href)) {
      var wrap = a.closest ? a.closest('a') : null;
      if (wrap && wrap !== a && isBookingHref(wrap.getAttribute('href'))) {
        e.preventDefault();
        open();
      }
      return;
    }
    e.preventDefault();
    open();
  }, true);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();

/* ============================================================================
   NRHT Conversion Landing Page — behaviour
   Ports the four interactions from the Claude Design prototype:
     1. Sticky CTA bar that hides whenever a real CTA is on screen
     2. Symptom slider pagination dots
     3. Sample-report modal
     4. FAQ accordion
   ========================================================================== */
(function () {
  'use strict';

  /* --- 1 · Sticky CTA ------------------------------------------------------
     Prototype rule: hide the bar while any #book link or the booking card is
     at least 35% visible. IntersectionObserver.intersectionRatio is the same
     visible/total measure the prototype computed by hand, and these elements
     are full-width inside the 520px column, so the ratios match. */
  var bar = document.getElementById('sticky-cta');
  if (bar && 'IntersectionObserver' in window) {
    var targets = [].slice.call(
      document.querySelectorAll('a.nr-cta, #bookcard')
    ).filter(function (el) { return !el.closest('#sticky-cta'); });

    /* The bar stays down until the visitor actually starts scrolling — the
       whole hero, including its own CTA, is on screen at rest, so showing it
       there would just cover the page with a second copy of the same button. */
    var SCROLL_TRIGGER = 8;
    var hasScrolled = window.scrollY > SCROLL_TRIGGER;
    var visible = new Set();

    var update = function () {
      bar.dataset.hidden = (!hasScrolled || visible.size > 0) ? 'true' : 'false';
    };

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.intersectionRatio >= 0.35) visible.add(e.target);
        else visible.delete(e.target);
      });
      update();
    }, { threshold: [0, 0.35, 0.7, 1] });

    targets.forEach(function (el) { io.observe(el); });

    if (!hasScrolled) {
      window.addEventListener('scroll', function onFirstScroll() {
        if (window.scrollY <= SCROLL_TRIGGER) return;
        hasScrolled = true;
        window.removeEventListener('scroll', onFirstScroll);
        update();
      }, { passive: true });
    }
  } else if (bar) {
    bar.dataset.hidden = 'false';
  }

  /* --- 2 · Symptom slider dots -------------------------------------------- */
  var slider = document.getElementById('symptom-slider');
  var dotWrap = document.getElementById('symptom-dots');
  if (slider && dotWrap) {
    var dots = [].slice.call(dotWrap.children);
    var raf = null;
    var current = 0;

    var sync = function () {
      raf = null;
      var slide = slider.firstElementChild;
      if (!slide) return;
      var step = slide.offsetWidth + 12; /* card width + flex gap */
      var idx = Math.max(0, Math.min(dots.length - 1, Math.round(slider.scrollLeft / step)));
      if (idx === current) return;
      dots[current].classList.remove('is-active');
      dots[idx].classList.add('is-active');
      dots[current].removeAttribute('aria-current');
      dots[idx].setAttribute('aria-current', 'true');
      current = idx;
    };

    slider.addEventListener('scroll', function () {
      if (raf) return;
      raf = requestAnimationFrame(sync);
    }, { passive: true });
  }

  /* --- 3 · Sample-report modal -------------------------------------------- */
  var modal = document.getElementById('report-modal');
  if (modal) {
    var opener = document.getElementById('report-open');
    var panel = modal.querySelector('.nr-modal__panel');
    var lastFocus = null;

    var openModal = function () {
      lastFocus = document.activeElement;
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
      var close = modal.querySelector('.nr-modal__close');
      if (close) close.focus();
    };

    var closeModal = function () {
      modal.hidden = true;
      document.body.style.overflow = '';
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    };

    if (opener) {
      opener.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
      });
    }

    /* Backdrop click closes; clicks inside the panel do not. */
    modal.addEventListener('click', function (e) {
      if (!panel.contains(e.target)) closeModal();
    });

    modal.querySelectorAll('[data-close-modal]').forEach(function (el) {
      el.addEventListener('click', function () { closeModal(); });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) closeModal();
    });

    /* Keep Tab inside the panel while the modal is open. */
    modal.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var focusable = panel.querySelectorAll(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    });
  }

  /* --- 4 · FAQ accordion ---------------------------------------------------
     Matches the design system's Accordion: one panel open at a time, clicking
     the open panel closes it, first item open on load. */
  var faq = document.getElementById('faq-accordion');
  if (faq) {
    var items = [].slice.call(faq.querySelectorAll('.nr-faq-item'));
    items.forEach(function (item) {
      var btn = item.querySelector('button');
      var answer = item.querySelector('.nr-faq-answer');
      btn.addEventListener('click', function () {
        var willOpen = !item.classList.contains('is-open');
        items.forEach(function (other) {
          other.classList.remove('is-open');
          other.querySelector('button').setAttribute('aria-expanded', 'false');
          other.querySelector('.nr-faq-answer').setAttribute('aria-hidden', 'true');
        });
        if (willOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
          answer.setAttribute('aria-hidden', 'false');
        }
      });
    });
  }

  /* --- Desktop review expansion ------------------------------------------- */
  document.querySelectorAll('.nr-rv__more').forEach(function (button) {
    button.addEventListener('click', function () {
      var card = button.closest('.nr-rv');
      var open = card.classList.toggle('is-open');
      button.setAttribute('aria-expanded', open ? 'true' : 'false');
      button.textContent = open ? 'Show less' : 'Read full review';
    });
  });

  /* --- 5 · Booking lightbox ------------------------------------------------
     Any CTA pointing at the Acuity booking link opens an in-page modal with a
     tall, scrollable iframe instead of navigating away. */
  (function () {
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
      overlay.setAttribute('aria-label', 'Book your evaluation');
      overlay.innerHTML =
        '<div class="nr-booklb__panel">' +
          '<div class="nr-booklb__head">' +
            '<span>Book Your Evaluation</span>' +
            '<button type="button" class="nr-booklb__close" aria-label="Close booking">\u00d7</button>' +
          '</div>' +
          '<div class="nr-booklb__body">' +
            '<iframe title="Book your evaluation" src="' + BOOKING_URL + '" loading="eager"></iframe>' +
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

    document.addEventListener('click', function (e) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      var a = e.target && e.target.closest ? e.target.closest('a') : null;
      if (!a) return;
      var href = a.getAttribute('href') || '';
      if (href.indexOf('ninaross.as.me') === -1) return;
      if (a.hasAttribute('data-booking-fallback')) return;
      e.preventDefault();
      open();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  })();
})();

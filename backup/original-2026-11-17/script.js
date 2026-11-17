// Sai Krupa Dental Care: interactions and reveal animations
(function () {
  var root = document.documentElement;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.classList.add('js');

  /* ---------- Reveal on scroll ---------- */
  var targets = document.querySelectorAll('.reveal, .fade, .wipe, .rule-in, .wordmark');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });
    // Hero plays straight away
    requestAnimationFrame(function () {
      document.querySelectorAll('.hero .reveal, .hero .fade, .hero .wipe').forEach(function (el) { el.classList.add('in'); });
    });
  } else {
    targets.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- Statement: words light up as you scroll ---------- */
  var st = document.getElementById('statement');
  if (st) {
    var words = st.textContent.trim().split(/\s+/);
    st.setAttribute('aria-label', st.textContent.trim());
    st.innerHTML = words.map(function (w) { return '<span class="w" aria-hidden="true">' + w + '</span>'; }).join(' ');
    var spans = st.querySelectorAll('.w');
    var lit = function () {
      var r = st.getBoundingClientRect();
      var vh = window.innerHeight;
      var p = (vh * 0.85 - r.top) / (r.height + vh * 0.35);
      p = Math.max(0, Math.min(1, p));
      var n = Math.round(p * spans.length);
      for (var i = 0; i < spans.length; i++) spans[i].classList.toggle('on', i < n);
    };
    if (reduce) spans.forEach(function (s) { s.classList.add('on'); });
    else { window.addEventListener('scroll', lit, { passive: true }); window.addEventListener('resize', lit); lit(); }
  }

  /* ---------- Smooth, eased scroll for in-page links ---------- */
  var scrolling = null;
  var easeInOut = function (x) { return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; };
  var glideTo = function (target) {
    var offset = window.innerWidth < 960 ? 72 : 84;
    var start = window.scrollY;
    var end = target === 'top' ? 0 : target.getBoundingClientRect().top + start - offset;
    end = Math.max(0, Math.min(end, document.documentElement.scrollHeight - window.innerHeight));
    var dist = end - start;
    if (reduce || Math.abs(dist) < 2) { window.scrollTo(0, end); return; }
    var dur = Math.min(1100, Math.max(550, Math.abs(dist) * 0.35));
    var t0 = null;
    if (scrolling) cancelAnimationFrame(scrolling);
    var step = function (now) {
      if (t0 === null) t0 = now;
      var k = Math.min(1, (now - t0) / dur);
      window.scrollTo(0, start + dist * easeInOut(k));
      scrolling = k < 1 ? requestAnimationFrame(step) : null;
    };
    scrolling = requestAnimationFrame(step);
  };
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    if (id === 'main' && a.classList.contains('skip')) return;
    var target = id === 'top' || id === '' ? 'top' : document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    if (document.body.classList.contains('menu-open')) setMenu(false);
    glideTo(target);
    if (target !== 'top' && history.replaceState) history.replaceState(null, '', '#' + id);
  });
  // Stop the glide if the visitor scrolls themselves
  ['wheel', 'touchstart', 'keydown'].forEach(function (ev) {
    window.addEventListener(ev, function () { if (scrolling) { cancelAnimationFrame(scrolling); scrolling = null; } }, { passive: true });
  });

  /* ---------- Header: solid after scroll, hides on scroll down ---------- */
  var header = document.getElementById('header');
  var bar = document.getElementById('actionBar');
  var lastY = window.scrollY;
  window.addEventListener('scroll', function () {
    var y = window.scrollY;
    header.classList.toggle('scrolled', y > 20);
    if (bar) bar.classList.toggle('show', y > 520);
    if (!document.body.classList.contains('menu-open')) header.classList.toggle('hide', y > lastY && y > 400);
    lastY = y;
  }, { passive: true });

  /* ---------- Mobile menu ---------- */
  var menuBtn = document.getElementById('menuBtn');
  var menu = document.getElementById('mobileMenu');
  var setMenu = function (open) {
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.setAttribute('aria-hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  menuBtn.addEventListener('click', function () { setMenu(!document.body.classList.contains('menu-open')); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Treatments: image follows the cursor ---------- */
  var list = document.getElementById('tList');
  var prev = document.getElementById('tPreview');
  if (list && prev && window.matchMedia('(hover: hover) and (min-width: 960px)').matches && !reduce) {
    var imgs = prev.querySelectorAll('img');
    var tx = 0, ty = 0, cx = 0, cy = 0, running = false;
    var loop = function () {
      cx += (tx - cx) * 0.14; cy += (ty - cy) * 0.14;
      prev.style.transform = 'translate3d(' + (cx - 170) + 'px,' + (cy - 102) + 'px,0) rotate(' + Math.max(-6, Math.min(6, (tx - cx) * 0.05)) + 'deg)';
      if (running) requestAnimationFrame(loop);
    };
    list.addEventListener('pointermove', function (e) { tx = e.clientX + 40; ty = e.clientY; });
    list.querySelectorAll('.t-row').forEach(function (row) {
      row.addEventListener('pointerenter', function (e) {
        var i = +row.dataset.img;
        imgs.forEach(function (im, k) { im.classList.toggle('active', k === i); });
        if (!running) { cx = tx = e.clientX + 40; cy = ty = e.clientY; running = true; loop(); }
        prev.classList.add('show');
      });
    });
    list.addEventListener('pointerleave', function () { prev.classList.remove('show'); running = false; });
  }

  /* ---------- Before / after slider ---------- */
  var cmp = document.getElementById('compare');
  if (cmp) {
    var range = cmp.querySelector('input');
    var set = function (v) { cmp.style.setProperty('--pos', v + '%'); };
    range.addEventListener('input', function () { set(range.value); });
    set(range.value);
  }

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.q button').forEach(function (b) {
    b.addEventListener('click', function () {
      var q = b.parentElement;
      var open = !q.classList.contains('open');
      q.classList.toggle('open', open);
      b.setAttribute('aria-expanded', open);
    });
  });

  /* ---------- Booking form ---------- */
  var form = document.getElementById('bookForm');
  if (form) {
    var msg = document.getElementById('formMsg');
    var date = document.getElementById('b-date');
    var t = new Date();
    date.min = new Date(t.getTime() - t.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.name.value.trim();
      var phone = form.elements.phone.value.replace(/[^\d+]/g, '');
      var err = '';
      if (!name) err = 'Add your name so we know who to ask for.';
      else if (phone.replace(/\D/g, '').length < 10) err = 'Add a 10 digit phone number so we can confirm your time.';
      else if (!date.value) err = 'Pick a preferred date.';
      if (err) { msg.textContent = err; msg.classList.add('err'); return; }
      var when = new Date(date.value + 'T00:00:00').toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });
      document.getElementById('doneText').textContent = 'Thank you, ' + name.split(' ')[0] + '. We have your request for ' +
        form.elements.need.value.toLowerCase() + ' on ' + when + ' (' + form.elements.time.value.toLowerCase() + '). We will call ' + phone + ' shortly to confirm.';
      // Connect to your backend, email service or WhatsApp API here.
      form.style.display = 'none';
      document.getElementById('done').classList.add('show');
    });
  }
})();

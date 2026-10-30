/* TokVS mobile reading: on narrow screens only, turn long article cards
   into an accordion of section headings. Content is NOT removed from the
   DOM (so mobile-first indexing still sees the same text); bodies are
   simply hidden until the reader taps the heading. Desktop is untouched:
   when the viewport grows past 640px the original layout is restored. */
(function () {
  if (!window.matchMedia) return;
  var mq = window.matchMedia('(max-width: 640px)');
  var OPEN_ALWAYS = /keep reading|继续阅读|contents|目录/i;

  function isHeading(el) {
    return el && (el.tagName === 'H2' || el.tagName === 'H3');
  }

  function apply() {
    document.querySelectorAll('.card.article.prose').forEach(function (article) {
      if (article.dataset.mApplied === '1') return;
      article.dataset.mApplied = '1';
      var groups = [];
      var cur = null;
      Array.prototype.slice.call(article.children).forEach(function (child) {
        if (isHeading(child)) {
          cur = { head: child, nodes: [] };
          groups.push(cur);
        } else if (cur) {
          cur.nodes.push(child);
        }
        // Nodes before the first heading stay visible as the intro.
      });
      var firstH2Seen = false;
      groups.forEach(function (g) {
        var body = document.createElement('div');
        body.className = 'm-body';
        g.head.parentNode.insertBefore(body, g.head.nextSibling);
        g.nodes.forEach(function (n) { body.appendChild(n); });
        var isH2 = g.head.tagName === 'H2';
        var open = false;
        if (isH2 && !firstH2Seen) { open = true; firstH2Seen = true; }
        if (OPEN_ALWAYS.test(g.head.textContent)) open = true;
        if (window.location.hash && g.head.id &&
            window.location.hash.slice(1) === g.head.id) open = true;
        g.head.classList.add('m-head');
        if (!open) g.head.classList.add('m-closed');
        g.head.setAttribute('role', 'button');
        g.head.setAttribute('tabindex', '0');
        g.head.setAttribute('aria-expanded', open ? 'true' : 'false');
        var chev = document.createElement('span');
        chev.className = 'm-chev';
        chev.setAttribute('aria-hidden', 'true');
        chev.textContent = '▾';
        g.head.appendChild(chev);
        body.style.display = open ? '' : 'none';
        g.head._mBody = body;
        function toggle() {
          if (article.dataset.mApplied !== '1') return;
          var closed = body.style.display === 'none';
          body.style.display = closed ? '' : 'none';
          g.head.classList.toggle('m-closed', !closed);
          g.head.setAttribute('aria-expanded', closed ? 'true' : 'false');
          if (closed && body.scrollIntoView) body.scrollIntoView({ block: 'start' });
        }
        g.head.addEventListener('click', toggle);
        g.head.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
        });
      });
      // Hint line above the first article, so readers know headings tap open.
      if (groups.length > 1 && !document.querySelector('.m-hint')) {
        var hint = document.createElement('p');
        hint.className = 'm-hint';
        hint.textContent = document.documentElement.lang === 'zh'
          ? '点小节标题可展开正文，第一节默认展开'
          : 'Tap a section heading to expand it — the first section is open.';
        article.parentNode.insertBefore(hint, article);
      }
    });
  }

  function restore() {
    document.querySelectorAll('.card.article.prose[data-m-applied="1"]').forEach(function (article) {
      article.dataset.mApplied = '0';
      article.querySelectorAll('.m-body').forEach(function (body) {
        while (body.firstChild) body.parentNode.insertBefore(body.firstChild, body);
        body.remove();
      });
      article.querySelectorAll('.m-head').forEach(function (h) {
        h.classList.remove('m-head', 'm-closed');
        h.removeAttribute('role'); h.removeAttribute('tabindex'); h.removeAttribute('aria-expanded');
        var c = h.querySelector('.m-chev'); if (c) c.remove();
      });
    });
    document.querySelectorAll('.m-hint').forEach(function (h) { h.remove(); });
  }

  // Anchor links to a collapsed section (e.g. #rebates, #faq) open it first.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href').length < 2) return;
    var target = document.getElementById(a.getAttribute('href').slice(1));
    if (!target) return;
    var head = null;
    if (target.classList && target.classList.contains('m-head')) {
      head = target;
    } else if (target.closest) {
      // Target inside a collapsed body: its heading is the body div's
      // previous sibling (headings sit directly above their body div).
      var body = target.closest('.m-body');
      if (body && body.previousElementSibling &&
          body.previousElementSibling.classList.contains('m-head')) {
        head = body.previousElementSibling;
      }
    }
    if (head && head._mBody && head._mBody.style.display === 'none') head.click();
  });

  mq.addEventListener('change', function (e) { e.matches ? apply() : restore(); });
  if (mq.matches) apply();
})();

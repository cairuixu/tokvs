/* TokVS mobile slimming (narrow screens only, v2).
   Nothing is removed from the DOM, so mobile-first indexing still sees the
   same content; it is just folded on small screens and expands on tap.
   Desktop (>640px) is untouched: every wrapper is unwrapped on resize up.
   Three mechanisms:
   1. Article accordion: .card.article.prose headings (H2/H3) fold their
      following content. ALL sections start closed on mobile (v1 left the
      first one open, which still left a long first screen).
   2. Section accordion: any <section> whose direct child is .sec-head, and
      any .tk-card whose direct child is .tk-card-head, folds the rest of
      that block. First such block on the page starts open, the rest closed.
      Sections inside an article card are skipped (already covered by 1).
   3. Long-list truncation is CSS-driven (see styles.css); the buttons here
      only lift the cap. CSS applies even to rows injected later by home.js
      or tools.js, and a MutationObserver keeps each button's visibility
      honest as rows arrive. */
(function () {
  if (!window.matchMedia) return;
  var mq = window.matchMedia('(max-width: 640px)');
  var ZH = document.documentElement.lang === 'zh';

  function chev() {
    var s = document.createElement('span');
    s.className = 'm-chev';
    s.setAttribute('aria-hidden', 'true');
    s.textContent = '▾';
    return s;
  }

  function setOpen(head, body, open) {
    body.style.display = open ? '' : 'none';
    head.classList.toggle('m-closed', !open);
    head.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function makeToggle(head, body, open) {
    head.classList.add('m-head');
    head.setAttribute('role', 'button');
    head.setAttribute('tabindex', '0');
    head.appendChild(chev());
    setOpen(head, body, open);
    head._mBody = body;
    function toggle(ev) {
      if (ev && ev.target && ev.target.closest && ev.target.closest('a')) return;
      setOpen(head, body, body.style.display === 'none');
    }
    head.addEventListener('click', toggle);
    head.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  }

  function wrapAfter(head, nodes, cls) {
    var body = document.createElement('div');
    body.className = cls;
    head.parentNode.insertBefore(body, head.nextSibling);
    nodes.forEach(function (n) { body.appendChild(n); });
    return body;
  }

  function apply() {
    // ---- 2. Section accordion (run first; skips article-internal sections) ----
    var secHeads = [];
    document.querySelectorAll('section, .tk-card').forEach(function (block) {
      if (block.closest('.card.article.prose')) return;
      var head = null;
      Array.prototype.slice.call(block.children).forEach(function (c) {
        if (!head && (c.classList.contains('sec-head') || c.classList.contains('tk-card-head'))) head = c;
      });
      if (!head || head.dataset.mApplied === '1') return;
      head.dataset.mApplied = '1';
      var nodes = Array.prototype.slice.call(block.children).filter(function (c) { return c !== head; });
      if (!nodes.length) return;
      var body = wrapAfter(head, nodes, 'm-sec-body');
      makeToggle(head, body, secHeads.length === 0);
      secHeads.push(head);
    });

    // ---- 1. Article accordion: everything closed on mobile ----
    document.querySelectorAll('.card.article.prose').forEach(function (article) {
      if (article.dataset.mApplied === '1') return;
      article.dataset.mApplied = '1';
      var groups = [];
      var cur = null;
      Array.prototype.slice.call(article.children).forEach(function (child) {
        if (child.tagName === 'H2' || child.tagName === 'H3') {
          cur = { head: child, nodes: [] };
          groups.push(cur);
        } else if (cur) {
          cur.nodes.push(child);
        }
      });
      // No hint bar: the user explicitly rejected the "Tap a heading /
      // Expand all" bar. Headings carry a ▾ chevron instead, and the first
      // section starts open so real text is visible immediately on load.
      groups.forEach(function (g, i) {
        var body = wrapAfter(g.head, g.nodes, 'm-body');
        makeToggle(g.head, body, i === 0);
      });
    });

    // ---- 3. Long-list "show more" buttons (CSS does the truncating) ----
    var lists = [
      { sel: '#news-rows', count: '.nrow', limit: 6 },
      { sel: '#meme-chips', count: 'a.mm-row', limit: 6 },
      { sel: '#top100-body', count: 'tr', limit: 20 },
      { sel: '#cal-list', count: '.tk-cal-item', limit: 10 },
      { sel: '.air-grid', count: '*', limit: 6 }
    ];
    lists.forEach(function (cfg) {
      document.querySelectorAll(cfg.sel).forEach(function (container) {
        if (container.dataset.mMore === '1') return;
        container.dataset.mMore = '1';
        var btn = document.createElement('button');
        btn.className = 'm-more';
        btn.type = 'button';
        btn.style.display = 'none';
        btn.addEventListener('click', function () {
          container.classList.add('m-all');
          btn.style.display = 'none';
        });
        var anchor = container.closest('.tk-tblwrap') || container;
        anchor.parentNode.insertBefore(btn, anchor.nextSibling);
        function update() {
          var n = container.querySelectorAll(cfg.count).length;
          if (container.classList.contains('m-all') || n <= cfg.limit) {
            btn.style.display = 'none';
          } else {
            btn.style.display = '';
            btn.textContent = ZH
              ? '展开更多（共 ' + n + ' 条）'
              : 'Show more (' + n + ' total)';
          }
        }
        update();
        if (window.MutationObserver) {
          new MutationObserver(update).observe(container, { childList: true });
        } else {
          setTimeout(update, 2000);
        }
      });
    });
  }

  function restore() {
    document.querySelectorAll('.m-body, .m-sec-body').forEach(function (body) {
      while (body.firstChild) body.parentNode.insertBefore(body.firstChild, body);
      body.remove();
    });
    document.querySelectorAll('.m-head').forEach(function (h) {
      h.classList.remove('m-head', 'm-closed');
      h.removeAttribute('role'); h.removeAttribute('tabindex'); h.removeAttribute('aria-expanded');
      var c = h.querySelector('.m-chev'); if (c) c.remove();
      delete h.dataset.mApplied;
    });
    document.querySelectorAll('.card.article.prose[data-m-applied="1"]').forEach(function (a) {
      a.dataset.mApplied = '0';
    });
    document.querySelectorAll('.m-hint, .m-more').forEach(function (el) { el.remove(); });
    document.querySelectorAll('[data-m-more="1"]').forEach(function (el) { el.dataset.mMore = '0'; });
  }

  // Anchor links to a folded section open it first (article + section heads).
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href').length < 2) return;
    var target = document.getElementById(a.getAttribute('href').slice(1));
    if (!target) return;
    var head = null;
    if (target.classList && target.classList.contains('m-head')) {
      head = target;
    } else if (target.closest && target.closest('.m-head')) {
      // Anchor to an H2 inside a collapsible section head (e.g. #availability).
      head = target.closest('.m-head');
    } else if (target.closest) {
      var body = target.closest('.m-body, .m-sec-body');
      if (body && body.previousElementSibling &&
          body.previousElementSibling.classList.contains('m-head')) {
        head = body.previousElementSibling;
      }
    }
    if (head && head._mBody && head._mBody.style.display === 'none') {
      head.click();
    }
  });

  mq.addEventListener('change', function (e) { e.matches ? apply() : restore(); });
  if (mq.matches) apply();
})();

/* 币VS 首页币种搜索 + 数据统计条 + markets 锚点滚动
   新增文件，不改动 portal.js / watchlist.js / farming.js 既有逻辑 */
(function () {
  'use strict';
  var isEn = document.documentElement.lang === 'en';
  function T(zh, en) { return isEn ? en : zh; }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  /* 用 canonical 推导站点根，保证 / 与 /en/ 下 data 路径都正确 */
  function siteRoot() {
    try {
      var c = document.querySelector('link[rel="canonical"]');
      if (c && c.href) return new URL(c.href).origin + '/';
    } catch (e) {}
    return '/';
  }
  function dataUrl(rel) { return new URL(rel, siteRoot()).href; }

  var coinsCache = null;
  function getCoins() {
    if (coinsCache) return Promise.resolve(coinsCache);
    return fetch('https://api.coingecko.com/api/v3/coins/markets' +
      '?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
      .then(function (d) { coinsCache = d || []; return coinsCache; });
  }
  function fmtPrice(p) {
    if (p === null || p === undefined || isNaN(p)) return '--';
    return '$' + Number(p).toLocaleString('en-US', {
      minimumFractionDigits: 2, maximumFractionDigits: p < 1 ? 4 : 2
    });
  }
  function matchCoins(coins, q) {
    q = q.trim().toLowerCase();
    if (!q) return [];
    return coins.filter(function (c) {
      var sym = (c.symbol || '').toLowerCase();
      var name = (c.name || '').toLowerCase();
      var id = (c.id || '').toLowerCase();
      return sym.indexOf(q) === 0 || name.indexOf(q) !== -1 || id.indexOf(q) !== -1;
    }).slice(0, 8);
  }
  function goCoin(sym) {
    /* 相对路径：/ 下跳 markets.html，/en/ 下跳 en/markets.html */
    window.location.href = 'markets.html#coin-' + String(sym).toLowerCase();
  }

  function initSearch() {
    var input = document.getElementById('coin-search');
    var btn = document.getElementById('coin-search-btn');
    var drop = document.getElementById('search-drop');
    if (!input || !drop) return;

    function render(q) {
      getCoins().then(function (coins) {
        var hits = matchCoins(coins, q);
        if (!hits.length) {
          drop.innerHTML = '<li class="sd-empty">' + esc(T('未找到相关币种', 'No matching coin')) + '</li>';
        } else {
          drop.innerHTML = hits.map(function (c) {
            var sym = (c.symbol || '').toLowerCase();
            return '<li><a href="markets.html#coin-' + esc(sym) + '" data-sym="' + esc(sym) + '">' +
              '<span class="sd-sym">' + esc((c.symbol || '').toUpperCase()) + '</span>' +
              '<span class="sd-name">' + esc(c.name || '') + '</span>' +
              '<span class="sd-price">' + esc(fmtPrice(c.current_price)) + '</span></a></li>';
          }).join('');
        }
        drop.hidden = false;
      }).catch(function () {
        drop.innerHTML = '<li class="sd-empty">' + esc(T('搜索服务暂不可用', 'Search unavailable')) + '</li>';
        drop.hidden = false;
      });
    }

    var deb = null;
    input.addEventListener('input', function () {
      clearTimeout(deb);
      var q = input.value;
      if (!q.trim()) { drop.hidden = true; drop.innerHTML = ''; return; }
      deb = setTimeout(function () { render(q); }, 180);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        var first = drop.querySelector('a[data-sym]');
        if (first && !drop.hidden) { e.preventDefault(); goCoin(first.getAttribute('data-sym')); }
      } else if (e.key === 'Escape') {
        drop.hidden = true; input.blur();
      }
    });
    drop.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[data-sym]') : null;
      if (a) { e.preventDefault(); goCoin(a.getAttribute('data-sym')); }
    });
    document.addEventListener('click', function (e) {
      if (!e.target.closest || !e.target.closest('.hero-search')) drop.hidden = true;
    });
    if (btn) btn.addEventListener('click', function () {
      var first = drop.querySelector('a[data-sym]');
      if (first && !drop.hidden) goCoin(first.getAttribute('data-sym'));
      else if (input.value.trim()) render(input.value);
    });
  }

  /* 统计条：空投数读 latest.json，日历事件数读 calendar.json（仅未来事件） */
  function initStats() {
    var elA = document.getElementById('stat-airdrops');
    var elE = document.getElementById('stat-events');
    if (!elA && !elE) return;
    if (elA) {
      fetch(dataUrl('data/latest.json'))
        .then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
        .then(function (d) {
          if (d && d.airdrops && d.airdrops.length) elA.textContent = d.airdrops.length;
        })
        .catch(function () {});
    }
    if (elE) {
      fetch(dataUrl('data/calendar.json'))
        .then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
        .then(function (d) {
          if (Array.isArray(d)) {
            var today = new Date(); today.setHours(0, 0, 0, 0);
            var n = d.filter(function (it) {
              return it && it.date && new Date(it.date + 'T00:00:00') >= today;
            }).length;
            elE.textContent = n;
          }
        })
        .catch(function () {});
    }
  }

  /* markets 页：hash 锚点滚动重试（表格为 JS 异步渲染，首屏时行尚不存在） */
  function initHashScroll() {
    var m = (window.location.hash || '').match(/^#coin-([a-z0-9-]+)$/i);
    if (!m) return;
    var id = 'coin-' + m[1].toLowerCase();
    var tries = 0;
    var timer = setInterval(function () {
      tries++;
      var row = document.getElementById(id);
      if (row) {
        clearInterval(timer);
        try { row.scrollIntoView({ block: 'center' }); } catch (e) {}
      } else if (tries > 40) {
        clearInterval(timer);
      }
    }, 250);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initSearch();
    initStats();
    initHashScroll();
  });

  /* 暴露给 node 自测 */
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { matchCoins: matchCoins, fmtPrice: fmtPrice };
  }
})();

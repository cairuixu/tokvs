/* 币VS Meme 每日热点页：Meme 涨幅榜（CoinGecko）+ 链上热度榜（DexScreener）
   独立文件；任一接口失败静默隐藏该板块，不打断页面 */
(function () {
  'use strict';
  var isEn = document.documentElement.lang === 'en';
  function T(zh, en) { return isEn ? en : zh; }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function chgClass(v) { return v > 0 ? 'up' : (v < 0 ? 'down' : ''); }
  function fmtUSD(p) {
    if (p === null || p === undefined || isNaN(p)) return '--';
    return '$' + Number(p).toLocaleString('en-US', {
      minimumFractionDigits: 2, maximumFractionDigits: p < 1 ? 4 : 2
    });
  }
  function fmtPct(p) {
    if (p === null || p === undefined || isNaN(p)) return '--';
    return (p > 0 ? '+' : '') + Number(p).toFixed(2) + '%';
  }
  function fmtMcap(v) {
    if (v === null || v === undefined || isNaN(v)) return '--';
    if (v >= 1e9) return '$' + (v / 1e9).toFixed(2) + 'B';
    if (v >= 1e6) return '$' + (v / 1e6).toFixed(1) + 'M';
    return '$' + Math.round(v).toLocaleString('en-US');
  }
  function shortAddr(a) {
    a = String(a || '');
    return a.length > 10 ? a.slice(0, 4) + '...' + a.slice(-4) : a;
  }

  /* ---- Meme 涨幅榜 ---- */
  function loadGainers() {
    var sec = document.getElementById('meme-gainers-sec');
    var el = document.getElementById('meme-gainers');
    if (!el) return;
    var url = 'https://api.coingecko.com/api/v3/coins/markets' +
      '?vs_currency=usd&category=meme-token&order=market_cap_desc&per_page=30&page=1&sparkline=false&price_change_percentage=24h';
    fetch(url).then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
      .then(function (d) {
        var valid = (d || []).filter(function (c) {
          return c && c.price_change_percentage_24h !== null &&
            c.price_change_percentage_24h !== undefined && !isNaN(c.price_change_percentage_24h);
        });
        if (!valid.length) throw new Error('empty');
        var top = valid.slice().sort(function (a, b) {
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        }).slice(0, 10);
        var h = '';
        top.forEach(function (c, i) {
          var digits = c.current_price < 1 ? 4 : 2;
          h += '<div class="mover-row"><span class="mover-rank">' + (i + 1) + '</span>' +
            '<span class="mover-name">' + esc((c.symbol || '').toUpperCase()) +
            ' <span style="color:#9ca3af">' + esc(c.name || '') + '</span></span>' +
            '<span class="mover-price">' + esc(fmtUSD(c.current_price, digits)) + '</span>' +
            '<span class="mover-mcap">' + esc(fmtMcap(c.market_cap)) + '</span>' +
            '<span class="mover-chg ' + chgClass(c.price_change_percentage_24h) + '">' +
            esc(fmtPct(c.price_change_percentage_24h)) + '</span></div>';
        });
        el.innerHTML = h;
      })
      .catch(function () { if (sec) sec.style.display = 'none'; });
  }

  /* ---- 链上热度榜（DexScreener 付费推广榜） ---- */
  function loadBoosts() {
    var sec = document.getElementById('meme-boosts-sec');
    var el = document.getElementById('meme-boosts');
    if (!el) return;
    fetch('https://api.dexscreener.com/token-boosts/top/v1')
      .then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
      .then(function (d) {
        if (!Array.isArray(d) || !d.length) throw new Error('empty');
        var top = d.slice(0, 10);
        var h = '';
        top.forEach(function (t, i) {
          var link = t.url || ('https://dexscreener.com/' + t.chainId + '/' + t.tokenAddress);
          h += '<div class="mover-row"><span class="mover-rank">' + (i + 1) + '</span>' +
            '<span class="mover-name"><a href="' + esc(link) + '" target="_blank" rel="noopener">' +
            esc(shortAddr(t.tokenAddress)) + '</a> ' +
            '<span class="chain-tag">' + esc(t.chainId || '') + '</span><br>' +
            '<span style="color:#9ca3af;font-size:12.5px">' + esc((t.description || '').slice(0, 80)) + '</span></span>' +
            '<span class="mover-price">' + esc(T('热度', 'Boost')) + ' ' +
            esc(t.totalAmount !== undefined ? String(t.totalAmount) : '--') + '</span></div>';
        });
        el.innerHTML = h;
      })
      .catch(function () { if (sec) sec.style.display = 'none'; });
  }

  document.addEventListener('DOMContentLoaded', function () {
    try { loadGainers(); } catch (e) {}
    try { loadBoosts(); } catch (e) {}
  });
})();

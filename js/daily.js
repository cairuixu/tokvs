/* 币VS 每日栏目：ETF 资金流向 / 稳定币观察 / Meme 热点小栏目
   独立文件，不改动 portal.js / search.js / watchlist.js / farming.js */
(function () {
  'use strict';
  var isEn = document.documentElement.lang === 'en';
  function T(zh, en) { return isEn ? en : zh; }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function siteRoot() {
    try {
      var c = document.querySelector('link[rel="canonical"]');
      if (c && c.href) return new URL(c.href).origin + '/';
    } catch (e) {}
    try { return window.location.origin + '/'; } catch (e2) {}
    return '/';
  }
  function dataUrl(rel) {
    try { return new URL(rel, siteRoot()).href; }
    catch (e) { return rel; }
  }
  function fmtFlow(v) {
    if (v === null || v === undefined || isNaN(v)) return '--';
    var s = (v > 0 ? '+' : '') + Number(v).toFixed(1);
    return s;
  }
  function chgClass(v) { return v > 0 ? 'up' : (v < 0 ? 'down' : ''); }
  function fmtDate(d) { return String(d || '').slice(5).replace('-', '/'); }
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

  /* ---- ETF 资金流向 ---- */
  function loadETF() {
    var el = document.getElementById('etf-box');
    if (!el) return;
    fetch(dataUrl('data/etf.json'))
      .then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
      .then(function (d) {
        var btc = (d && d.btc) || [], eth = (d && d.eth) || [];
        if (!btc.length || !eth.length) throw new Error('empty');
        var n = Math.min(btc.length, eth.length, 7);
        var lastB = btc[btc.length - 1], lastE = eth[eth.length - 1];
        var h = '<div class="etf-head"><div class="etf-big"><span class="ms-label">' +
          esc(T('BTC 最新单日净流入（百万美元）', 'BTC latest daily net flow ($M)')) + '</span>' +
          '<span class="ms-val ' + chgClass(lastB.flow_m) + '">' + esc(fmtFlow(lastB.flow_m)) + '</span></div>' +
          '<div class="etf-big"><span class="ms-label">' +
          esc(T('ETH 最新单日净流入（百万美元）', 'ETH latest daily net flow ($M)')) + '</span>' +
          '<span class="ms-val ' + chgClass(lastE.flow_m) + '">' + esc(fmtFlow(lastE.flow_m)) + '</span></div></div>';
        h += '<div class="table-wrap"><table class="etf-table"><thead><tr><th>' +
          esc(T('日期', 'Date')) + '</th><th class="num">BTC</th><th class="num">ETH</th></tr></thead><tbody>';
        for (var i = btc.length - n; i < btc.length; i++) {
          var b = btc[i], e = eth[i] || {};
          h += '<tr><td>' + esc(fmtDate(b.date)) + '</td>' +
            '<td class="num ' + chgClass(b.flow_m) + '">' + esc(fmtFlow(b.flow_m)) + '</td>' +
            '<td class="num ' + chgClass(e.flow_m) + '">' + esc(fmtFlow(e.flow_m)) + '</td></tr>';
        }
        h += '</tbody></table></div>';
        h += '<p class="note">' + esc(T('数据来源 Farside Investors，单位百万美元，负数为净流出。更新于 ', 'Source: Farside Investors, $M, negative = outflow. Updated ')) +
          esc(d.updated || '') + '。</p>';
        el.innerHTML = h;
      })
      .catch(function () {
        el.innerHTML = '<div class="load-fail">' + esc(T('ETF 数据加载失败', 'ETF data unavailable')) + '</div>';
      });
  }

  /* ---- 稳定币观察 ---- */
  function loadStable() {
    var el = document.getElementById('stable-box');
    if (!el) return;
    fetch(dataUrl('data/stable.json'))
      .then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
      .then(function (d) {
        var top = (d && d.top) || [], rwa = (d && d.rwa) || [];
        if (!top.length) throw new Error('empty');
        var h = '<div class="stable-head"><span class="ms-label">' +
          esc(T('稳定币总市值（十亿美元）', 'Total stablecoin market cap ($B)')) + '</span>' +
          '<span class="stable-total">' + esc(String(d.total_mcap_b)) + '</span>' +
          '<span class="note">' + esc(isEn ? d.total_note_en : d.total_note_zh) + '</span></div>';
        h += '<div class="table-wrap"><table class="etf-table"><thead><tr><th>' +
          esc(T('稳定币', 'Stablecoin')) + '</th><th class="num">' +
          esc(T('市值（十亿美元）', 'Mkt cap ($B)')) + '</th><th class="num">' +
          esc(T('份额', 'Share')) + '</th></tr></thead><tbody>';
        top.forEach(function (t) {
          h += '<tr><td><strong>' + esc(t.symbol) + '</strong> <span style="color:#9ca3af">' +
            esc(isEn ? t.name_en : t.name_zh) + '</span></td>' +
            '<td class="num">' + esc(String(t.mcap_b)) + '</td>' +
            '<td class="num">' + esc(String(t.share_pct)) + '%</td></tr>';
        });
        h += '</tbody></table></div>';
        if (rwa.length) {
          h += '<h3 class="sub-h3">' + esc(T('RWA 快讯', 'RWA briefs')) + '</h3><ul class="news-list">';
          rwa.forEach(function (r) {
            h += '<li><a class="ntitle" href="' + esc(r.link) + '" target="_blank" rel="noopener">' +
              esc(isEn ? r.title_en : r.title_zh) + '</a></li>';
          });
          h += '</ul>';
        }
        el.innerHTML = h;
      })
      .catch(function () {
        el.innerHTML = '<div class="load-fail">' + esc(T('稳定币数据加载失败', 'Stablecoin data unavailable')) + '</div>';
      });
  }

  /* ---- Meme 热点小栏目（首页 Top5） ---- */
  function loadMemeMini() {
    var el = document.getElementById('meme-mini');
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
        }).slice(0, 5);
        var h = '';
        top.forEach(function (c, i) {
          var digits = c.current_price < 1 ? 4 : 2;
          h += '<div class="mover-row"><span class="mover-rank">' + (i + 1) + '</span>' +
            '<span class="mover-name">' + esc((c.symbol || '').toUpperCase()) +
            ' <span style="color:#9ca3af">' + esc(c.name || '') + '</span></span>' +
            '<span class="mover-price">' + esc(fmtUSD(c.current_price, digits)) + '</span>' +
            '<span class="mover-chg ' + chgClass(c.price_change_percentage_24h) + '">' +
            esc(fmtPct(c.price_change_percentage_24h)) + '</span></div>';
        });
        el.innerHTML = h;
      })
      .catch(function () {
        el.innerHTML = '<div class="load-fail">' + esc(T('Meme 数据加载失败', 'Meme data unavailable')) + '</div>';
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    try { loadETF(); } catch (e) {}
    try { loadStable(); } catch (e) {}
    try { loadMemeMini(); } catch (e) {}
  });
})();

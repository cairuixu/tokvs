/* tokvs 自选清单 + 价格提醒：纯前端，localStorage 持久化，无需登录
   tokvs_watchlist: [{id, symbol}]            自选币种
   tokvs_alerts:   [{id, symbol, target, dir}] 价格提醒，dir: above|below */
(function () {
  'use strict';
  var isEn = document.documentElement.lang === 'en';
  function T(zh, en) { return isEn ? en : zh; }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  function fmtUSD(n, digits) {
    if (n === null || n === undefined || isNaN(n)) return '--';
    return '$' + Number(n).toLocaleString('en-US', {
      minimumFractionDigits: digits === undefined ? 2 : digits,
      maximumFractionDigits: digits === undefined ? 2 : digits
    });
  }
  function chgClass(v) { return v >= 0 ? 'up' : 'down'; }
  function chgText(v) {
    if (v === null || v === undefined || isNaN(v)) return '--';
    return (v >= 0 ? '+' : '') + Number(v).toFixed(2) + '%';
  }

  var LS_WL = 'tokvs_watchlist';
  var LS_AL = 'tokvs_alerts';
  function readLS(key) {
    try { var v = JSON.parse(localStorage.getItem(key)); return Array.isArray(v) ? v : []; }
    catch (e) { return []; }
  }
  function writeLS(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* ignore */ }
  }

  var CG = 'https://api.coingecko.com/api/v3/coins/markets';
  function fetchMarkets(params) {
    return fetch(CG + params).then(function (r) {
      if (!r.ok) throw new Error('http ' + r.status);
      return r.json();
    });
  }

  /* ---------- Top100 表格 ---------- */
  function renderTop100(list) {
    var tb = document.getElementById('top100-body');
    if (!tb) return;
    var wl = readLS(LS_WL);
    var inWL = {};
    wl.forEach(function (w) { inWL[w.id] = true; });
    var html = '';
    list.forEach(function (c, i) {
      var digits = c.current_price < 1 ? 4 : 2;
      var added = !!inWL[c.id];
      html += '<tr><td class="num">' + (i + 1) + '</td>' +
        '<td><strong>' + esc((c.symbol || '').toUpperCase()) + '</strong> <span class="coin-name">' +
        esc(c.name || '') + '</span></td>' +
        '<td class="num">' + fmtUSD(c.current_price, digits) + '</td>' +
        '<td class="num ' + chgClass(c.price_change_percentage_24h) + '">' +
        chgText(c.price_change_percentage_24h) + '</td>' +
        '<td class="num">' +
        (added
          ? '<span class="added-tag">' + T('已自选', 'Watching') + '</span>'
          : '<button class="btn-add" data-add="' + esc(c.id) + '" data-sym="' +
            esc((c.symbol || '').toUpperCase()) + '">＋' + T('自选', 'Watch') + '</button>') +
        '</td></tr>';
    });
    tb.innerHTML = html;
    tb.querySelectorAll('[data-add]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        addToWatchlist(btn.getAttribute('data-add'), btn.getAttribute('data-sym'));
      });
    });
  }

  function addToWatchlist(id, symbol) {
    var wl = readLS(LS_WL);
    if (wl.some(function (w) { return w.id === id; })) return;
    wl.push({ id: id, symbol: symbol });
    writeLS(LS_WL, wl);
    refreshWatchlist();
    renderTop100(window.__tokvsTop100 || []);
  }

  function removeFromWatchlist(id) {
    writeLS(LS_WL, readLS(LS_WL).filter(function (w) { return w.id !== id; }));
    // 同时删掉该币的提醒
    writeLS(LS_AL, readLS(LS_AL).filter(function (a) { return a.id !== id; }));
    refreshWatchlist();
    renderTop100(window.__tokvsTop100 || []);
  }

  /* ---------- 我的自选 ---------- */
  function renderWatchlist(prices) {
    var wrap = document.getElementById('my-watchlist');
    if (!wrap) return;
    var wl = readLS(LS_WL);
    var alerts = readLS(LS_AL);
    if (!wl.length) {
      wrap.innerHTML = '<div class="wl-empty">' +
        '<div class="wl-empty-title">' + T('还没有自选币种', 'No coins in your watchlist yet') + '</div>' +
        '<p>' + T('在下方 Top100 表格中点击「＋自选」，把关心的币种加进来。价格提醒保存在本机浏览器，无需注册。',
          'Click "+ Watch" in the Top100 table below to add coins you care about. Alerts are stored in this browser — no sign-up needed.') + '</p></div>';
      return;
    }
    var html = '';
    wl.forEach(function (w) {
      var p = prices[w.id] || {};
      var digits = (p.current_price !== undefined && p.current_price < 1) ? 4 : 2;
      var coinAlerts = alerts.filter(function (a) { return a.id === w.id; });
      var alertHtml = coinAlerts.map(function (a, idx) {
        var dirTxt = a.dir === 'above'
          ? T('高于', 'above')
          : T('低于', 'below');
        return '<div class="alert-item"><span>' + T('价格', 'Price') + dirTxt +
          ' ' + fmtUSD(a.target) + T('时提醒', ' alert') + '</span>' +
          '<button class="link-del" data-del-alert="' + idx + '" data-id="' + esc(w.id) + '">' +
          T('删除', 'Remove') + '</button></div>';
      }).join('');
      html += '<div class="wl-card">' +
        '<div class="wl-head"><div><strong>' + esc(w.symbol) + '</strong>' +
        '<span class="coin-name">' + esc(p.name || '') + '</span></div>' +
        '<button class="link-del" data-del="' + esc(w.id) + '">' + T('移除', 'Remove') + '</button></div>' +
        '<div class="wl-price">' + fmtUSD(p.current_price, digits) +
        ' <span class="' + chgClass(p.price_change_percentage_24h) + '">' +
        chgText(p.price_change_percentage_24h) + '</span></div>' +
        '<div class="wl-alert-form">' +
        '<input type="number" min="0" step="any" placeholder="' + T('提醒价，如 85000', 'Alert price, e.g. 85000') +
        '" data-target="' + esc(w.id) + '">' +
        '<select data-dir="' + esc(w.id) + '">' +
        '<option value="above">' + T('高于', 'Above') + '</option>' +
        '<option value="below">' + T('低于', 'Below') + '</option></select>' +
        '<button class="btn-add" data-set-alert="' + esc(w.id) + '" data-sym="' + esc(w.symbol) + '">' +
        T('设提醒', 'Set alert') + '</button></div>' +
        (alertHtml ? '<div class="alert-list">' + alertHtml + '</div>' : '') +
        '</div>';
    });
    wrap.innerHTML = html;

    wrap.querySelectorAll('[data-del]').forEach(function (btn) {
      btn.addEventListener('click', function () { removeFromWatchlist(btn.getAttribute('data-del')); });
    });
    wrap.querySelectorAll('[data-set-alert]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-set-alert');
        var sym = btn.getAttribute('data-sym');
        var input = wrap.querySelector('[data-target="' + id + '"]');
        var sel = wrap.querySelector('[data-dir="' + id + '"]');
        var target = parseFloat(input.value);
        if (!target || target <= 0 || !isFinite(target)) {
          input.focus();
          return;
        }
        var al = readLS(LS_AL);
        al.push({ id: id, symbol: sym, target: target, dir: sel.value });
        writeLS(LS_AL, al);
        refreshWatchlist();
      });
    });
    wrap.querySelectorAll('[data-del-alert]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var id = btn.getAttribute('data-id');
        var idx = parseInt(btn.getAttribute('data-del-alert'), 10);
        var al = readLS(LS_AL).filter(function (a) { return a.id === id; });
        al.splice(idx, 1);
        var rest = readLS(LS_AL).filter(function (a) { return a.id !== id; });
        writeLS(LS_AL, rest.concat(al));
        refreshWatchlist();
      });
    });
  }

  /* ---------- 提醒检查 ---------- */
  function checkAlerts(prices) {
    var banner = document.getElementById('alert-banner');
    if (!banner) return;
    var alerts = readLS(LS_AL);
    var hits = [];
    alerts.forEach(function (a) {
      var p = prices[a.id];
      if (!p || p.current_price === undefined || p.current_price === null) return;
      var cur = Number(p.current_price);
      if (a.dir === 'above' && cur >= a.target) hits.push({ a: a, cur: cur });
      if (a.dir === 'below' && cur <= a.target) hits.push({ a: a, cur: cur });
    });
    if (!hits.length) { banner.innerHTML = ''; banner.style.display = 'none'; return; }
    var html = '<div class="alert-banner-inner"><strong>🔔 ' + T('价格提醒触发', 'Price alerts triggered') + '</strong><ul>';
    hits.forEach(function (h) {
      var dirTxt = h.a.dir === 'above' ? T('已高于', 'is above') : T('已低于', 'is below');
      html += '<li><strong>' + esc(h.a.symbol) + '</strong> ' + dirTxt + T('你的提醒价', ' your alert price') +
        ' ' + fmtUSD(h.a.target) + '（' + T('现价', 'now') + ' ' + fmtUSD(h.cur) + '）</li>';
    });
    html += '</ul><button id="clear-alerts" class="btn btn-ref">' +
      T('清除已触发提醒', 'Dismiss triggered alerts') + '</button></div>';
    banner.innerHTML = html;
    banner.style.display = 'block';
    document.getElementById('clear-alerts').addEventListener('click', function () {
      var hitIds = {};
      hits.forEach(function (h) { hitIds[h.a.id + '|' + h.a.target + '|' + h.a.dir] = true; });
      writeLS(LS_AL, readLS(LS_AL).filter(function (a) {
        return !hitIds[a.id + '|' + a.target + '|' + a.dir];
      }));
      banner.innerHTML = '';
      banner.style.display = 'none';
      refreshWatchlist();
    });
  }

  function refreshWatchlist() {
    var wl = readLS(LS_WL);
    var box = document.getElementById('my-watchlist');
    if (!box) return;
    if (!wl.length) { renderWatchlist({}); checkAlerts({}); return; }
    var ids = wl.map(function (w) { return w.id; }).join(',');
    fetchMarkets('?vs_currency=usd&ids=' + encodeURIComponent(ids) +
      '&price_change_percentage=24h&sparkline=false')
      .then(function (d) {
        var prices = {};
        d.forEach(function (c) { prices[c.id] = c; });
        renderWatchlist(prices);
        checkAlerts(prices);
      })
      .catch(function () {
        renderWatchlist({});
        checkAlerts({});
      });
  }

  function init() {
    if (!document.getElementById('top100-body')) return;
    fetchMarkets('?vs_currency=usd&order=market_cap_desc&per_page=100&page=1' +
      '&sparkline=false&price_change_percentage=24h')
      .then(function (d) {
        window.__tokvsTop100 = d;
        renderTop100(d);
      })
      .catch(function () {
        var tb = document.getElementById('top100-body');
        if (tb) tb.innerHTML = '<tr><td colspan="5"><div class="load-fail">' +
          T('行情加载失败，请稍后刷新重试', 'Market data unavailable, please refresh and retry later') +
          '</div></td></tr>';
      });
    refreshWatchlist();
  }

  document.addEventListener('DOMContentLoaded', init);
})();

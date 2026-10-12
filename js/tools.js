/* 币VS · TokVS v2 工具页：自选清单 + 价格提醒 + 事件日历（纯前端，无需登录）
   tokvs_watchlist: [{id, symbol}]             自选币种（localStorage，与旧站兼容，格式严禁变）
   tokvs_alerts:   [{id, symbol, target, dir}] 价格提醒，dir: above|below
   日历数据：fetch(TOKVS_DATA_BASE + 'calendar.json')，基路径由页面内联脚本指定。
   渲染结构与 tools.html 页内 .tk- 样式配套；所有 fetch 均带 catch 兜底，失败只显示提示文案。 */
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

  /* 币种字母头像配色（按符号哈希取色，与首页口径一致的一组柔和色） */
  var AVA_COLORS = ['#6D4BD8', '#0E9F6E', '#D97008', '#2563EB', '#C2185B', '#0E7490', '#7C3AED', '#B45309'];
  function avaColor(symbol) {
    var s = String(symbol || '?'), h = 0;
    for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return AVA_COLORS[h % AVA_COLORS.length];
  }
  function avaHTML(symbol, small) {
    var sym = String(symbol || '?').toUpperCase();
    return '<span class="tk-ava' + (small ? ' sm' : '') + '" style="background:' +
      avaColor(sym) + ';">' + esc(sym.charAt(0) || '?') + '</span>';
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

  /* 页头小统计：自选数 / 提醒数（事件数由日历加载后写入） */
  function updateStats() {
    var w = document.getElementById('tk-stat-watch');
    var a = document.getElementById('tk-stat-alerts');
    if (w) w.textContent = readLS(LS_WL).length;
    if (a) a.textContent = readLS(LS_AL).length;
  }

  var CG = 'https://api.coingecko.com/api/v3/coins/markets';
  function fetchMarketsOnce(params) {
    return fetch(CG + params).then(function (r) {
      if (!r.ok) throw new Error('http ' + r.status);
      return r.json();
    });
  }
  function fetchMarkets(params) {
    /* CoinGecko 免费层容易限流：失败后等 4 秒自动重试一次 */
    return fetchMarketsOnce(params).catch(function () {
      return new Promise(function (res) { setTimeout(res, 4000); }).then(function () {
        return fetchMarketsOnce(params);
      });
    });
  }

  /* ---------- Top100 表格（带搜索过滤） ---------- */
  function renderTop100(list) {
    var tb = document.getElementById('top100-body');
    if (!tb) return;
    var wl = readLS(LS_WL);
    var inWL = {};
    wl.forEach(function (w) { inWL[w.id] = true; });
    if (!list.length) {
      tb.innerHTML = '<tr><td colspan="5"><div class="load-fail">' +
        esc(T('没有匹配的币种，换个关键词试试', 'No coins match your search')) + '</div></td></tr>';
      return;
    }
    var html = '';
    list.forEach(function (c) {
      var digits = c.current_price < 1 ? 4 : 2;
      var sym = (c.symbol || '').toUpperCase();
      var added = !!inWL[c.id];
      html += '<tr><td class="tk-rank">' + (c.market_cap_rank || '') + '</td>' +
        '<td><div class="tk-coin">' + avaHTML(sym, true) +
        '<span class="nm">' + esc(c.name || '') + '</span>' +
        '<span class="sy">' + esc(sym) + '</span></div></td>' +
        '<td class="r tk-price">' + fmtUSD(c.current_price, digits) + '</td>' +
        '<td class="r tk-chg ' + chgClass(c.price_change_percentage_24h) + '">' +
        chgText(c.price_change_percentage_24h) + '</td>' +
        '<td class="r">' +
        (added
          ? '<span class="tk-tag">' + esc(T('已自选', 'Watching')) + '</span>'
          : '<button type="button" class="tk-btn" data-add="' + esc(c.id) + '" data-sym="' +
            esc(sym) + '">＋' + esc(T('自选', 'Watch')) + '</button>') +
        '</td></tr>';
    });
    tb.innerHTML = html;
    tb.querySelectorAll('[data-add]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        addToWatchlist(btn.getAttribute('data-add'), btn.getAttribute('data-sym'));
      });
    });
  }

  function applySearch() {
    var input = document.getElementById('top100-search');
    var all = window.__tokvsTop100 || [];
    var q = input ? input.value.trim().toLowerCase() : '';
    if (!q) { renderTop100(all); return; }
    renderTop100(all.filter(function (c) {
      return (c.symbol || '').toLowerCase().indexOf(q) !== -1 ||
             (c.name || '').toLowerCase().indexOf(q) !== -1;
    }));
  }

  function addToWatchlist(id, symbol) {
    var wl = readLS(LS_WL);
    if (wl.some(function (w) { return w.id === id; })) return;
    wl.push({ id: id, symbol: symbol });
    writeLS(LS_WL, wl);
    refreshWatchlist();
    applySearch();
  }

  function removeFromWatchlist(id) {
    writeLS(LS_WL, readLS(LS_WL).filter(function (w) { return w.id !== id; }));
    // 同时删掉该币的提醒
    writeLS(LS_AL, readLS(LS_AL).filter(function (a) { return a.id !== id; }));
    refreshWatchlist();
    applySearch();
  }

  /* ---------- 我的自选 ---------- */
  function renderWatchlist(prices) {
    var wrap = document.getElementById('my-watchlist');
    if (!wrap) return;
    var wl = readLS(LS_WL);
    var alerts = readLS(LS_AL);
    if (!wl.length) {
      wrap.innerHTML = '<div class="tk-empty">' +
        '<div class="tk-empty-title">' + esc(T('还没有自选币种', 'No coins in your watchlist yet')) + '</div>' +
        '<p>' + esc(T('在下方 Top100 表格中搜索并点击「＋自选」，把关心的币种加进来。价格提醒保存在本机浏览器，无需注册。',
          'Search the Top 100 table below and click "+ Watch" to add coins you care about. Alerts are stored in this browser — no sign-up needed.')) + '</p>' +
        '<a class="tk-btn green" href="#top100-card">' + esc(T('去下方表格添加 ↓', 'Add from the table below ↓')) + '</a></div>';
      updateStats();
      return;
    }
    var html = '';
    wl.forEach(function (w) {
      var p = prices[w.id] || {};
      var digits = (p.current_price !== undefined && p.current_price < 1) ? 4 : 2;
      var coinAlerts = alerts.filter(function (a) { return a.id === w.id; });
      var alertHtml = coinAlerts.map(function (a, idx) {
        var dirTxt = a.dir === 'above' ? T('高于', 'above') : T('低于', 'below');
        return '<div class="tk-alert-item"><span>' + esc(T('价格', 'Price') + dirTxt +
          ' ' + fmtUSD(a.target) + T('时提醒', ' alert')) + '</span>' +
          '<button type="button" class="tk-del" data-del-alert="' + idx + '" data-id="' + esc(w.id) + '">' +
          esc(T('删除', 'Remove')) + '</button></div>';
      }).join('');
      html += '<div class="tk-wl-item">' +
        '<div class="tk-wl-top"><div class="tk-wl-id">' + avaHTML(w.symbol, false) +
        '<div><strong>' + esc(w.symbol) + '</strong>' +
        '<span class="tk-coin-name">' + esc(p.name || '') + '</span></div></div>' +
        '<button type="button" class="tk-del" data-del="' + esc(w.id) + '">' + esc(T('移除', 'Remove')) + '</button></div>' +
        '<div class="tk-wl-price">' + fmtUSD(p.current_price, digits) +
        ' <span class="chg ' + chgClass(p.price_change_percentage_24h) + '">' +
        chgText(p.price_change_percentage_24h) + '</span></div>' +
        '<div class="tk-wl-form">' +
        '<input class="tk-in" type="number" min="0" step="any" placeholder="' + esc(T('提醒价，如 85000', 'Alert price, e.g. 85000')) +
        '" data-target="' + esc(w.id) + '">' +
        '<select class="tk-sel" data-dir="' + esc(w.id) + '">' +
        '<option value="above">' + esc(T('高于', 'Above')) + '</option>' +
        '<option value="below">' + esc(T('低于', 'Below')) + '</option></select>' +
        '<button type="button" class="tk-btn" data-set-alert="' + esc(w.id) + '" data-sym="' + esc(w.symbol) + '">' +
        esc(T('设提醒', 'Set alert')) + '</button></div>' +
        (alertHtml ? '<div class="tk-alert-list">' + alertHtml + '</div>' : '') +
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
        var mine = readLS(LS_AL).filter(function (a) { return a.id === id; });
        mine.splice(idx, 1);
        var rest = readLS(LS_AL).filter(function (a) { return a.id !== id; });
        writeLS(LS_AL, rest.concat(mine));
        refreshWatchlist();
      });
    });
    updateStats();
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
    var html = '<div class="alert-banner-inner"><strong>' + esc(T('价格提醒触发', 'Price alerts triggered')) + '</strong><ul>';
    hits.forEach(function (h) {
      var dirTxt = h.a.dir === 'above' ? T('已高于', 'is above') : T('已低于', 'is below');
      html += '<li><strong>' + esc(h.a.symbol) + '</strong> ' + esc(dirTxt + T('你的提醒价', ' your alert price') +
        ' ' + fmtUSD(h.a.target) + '（' + T('现价', 'now') + ' ' + fmtUSD(h.cur) + '）') + '</li>';
    });
    html += '</ul><button type="button" id="clear-alerts" class="btn-ref">' +
      esc(T('清除已触发提醒', 'Dismiss triggered alerts')) + '</button></div>';
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

  function initWatchlist() {
    if (!document.getElementById('top100-body')) return;
    var search = document.getElementById('top100-search');
    if (search) search.addEventListener('input', applySearch);
    updateStats();
    fetchMarkets('?vs_currency=usd&order=market_cap_desc&per_page=100&page=1' +
      '&sparkline=false&price_change_percentage=24h')
      .then(function (d) {
        window.__tokvsTop100 = d;
        applySearch();
      })
      .catch(function () {
        var tb = document.getElementById('top100-body');
        if (tb) tb.innerHTML = '<tr><td colspan="5"><div class="load-fail">' +
          esc(T('行情加载失败，请稍后刷新重试', 'Market data unavailable, please refresh and retry later')) +
          '</div></td></tr>';
      });
    refreshWatchlist();
  }

  /* ---------- 事件日历 ---------- */
  var TYPE_LABEL = {
    unlock: { zh: '代币解锁', en: 'Unlock' },
    airdrop: { zh: '空投', en: 'Airdrop' },
    tge: { zh: 'TGE / 上线', en: 'TGE / Listing' },
    event: { zh: '行业事件', en: 'Event' },
    macro: { zh: '宏观', en: 'Macro' }
  };
  function typeLabel(t) {
    var m = TYPE_LABEL[t] || TYPE_LABEL.event;
    return isEn ? m.en : m.zh;
  }
  var MONTH_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  function pad2(n) { return (n < 10 ? '0' : '') + n; }
  function isoOf(d) { return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()); }

  function initCalendar() {
    var el = document.getElementById('cal-list');
    if (!el) return;
    var base = window.TOKVS_DATA_BASE || 'data/';
    var url;
    try { url = new URL(base + 'calendar.json', document.baseURI).href; }
    catch (e) { url = base + 'calendar.json'; }
    fetch(url)
      .then(function (r) { if (!r.ok) throw new Error('http ' + r.status); return r.json(); })
      .then(function (d) {
        if (!Array.isArray(d) || !d.length) throw new Error('empty');
        var now = new Date();
        var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        var todayStr = isoOf(today);
        var cutoff = new Date(today.getTime() - 7 * 864e5);
        var weekStr = isoOf(new Date(today.getTime() + 7 * 864e5));
        var items = d
          .filter(function (e) { return e && e.date && new Date(e.date + 'T00:00:00') >= cutoff; })
          .sort(function (a, b) { return a.date < b.date ? -1 : 1; });
        if (!items.length) throw new Error('empty');
        var upcoming = 0;
        items.forEach(function (e) { if (e.date >= todayStr && e.date <= weekStr) upcoming++; });
        var stat = document.getElementById('tk-stat-events');
        if (stat) stat.textContent = upcoming;
        var html = '<div class="tk-cal-list">';
        items.forEach(function (e) {
          var past = e.date < todayStr;
          var isToday = e.date === todayStr;
          var parts = String(e.date).split('-');
          var dayNum = parts.length === 3 ? String(parseInt(parts[2], 10)) : '';
          var monNum = parts.length === 3 ? parseInt(parts[1], 10) : 0;
          var monTxt = isEn ? (MONTH_EN[monNum - 1] || '') : (monNum ? monNum + '月' : '');
          html += '<div class="tk-cal-item' + (past ? ' past' : '') + (isToday ? ' today' : '') + '">' +
            '<div class="tk-cal-date"><span class="d">' + esc(dayNum) + '</span>' +
            '<span class="m">' + esc(monTxt) + '</span></div>' +
            '<div class="tk-cal-body">' +
            '<div class="tk-cal-meta"><span class="tk-badge type-' + esc(e.type || 'event') + '">' +
            esc(typeLabel(e.type)) + '</span>' +
            '<span class="tk-cal-when">' + esc(e.date) + '</span></div>' +
            '<h3>' + esc(isEn ? e.title_en : e.title_zh) + '</h3>' +
            '<p>' + esc(isEn ? e.desc_en : e.desc_zh) + '</p>' +
            (e.link ? '<a class="tk-cal-more" href="' + esc(e.link) + '" target="_blank" rel="noopener">' +
              esc(T('查看原文 →', 'Source →')) + '</a>' : '') +
            '</div></div>';
        });
        html += '</div>';
        el.innerHTML = html;
      })
      .catch(function () {
        el.innerHTML = '<div class="load-fail">' +
          esc(T('日历加载失败，请稍后刷新重试', 'Calendar unavailable, please refresh and retry later')) + '</div>';
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    try { initWatchlist(); } catch (e) {}
    try { initCalendar(); } catch (e) {}
  });
})();

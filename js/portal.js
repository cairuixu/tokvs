/* tokvs 门户共享逻辑：行情小组件 / 恐惧贪婪指数 / 最新资讯&空投 / 行情大表
   语言：按 <html lang> 自动切换中英文；所有外部请求失败时显示占位文案，不留白 */
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
  function dataUrl(rel) { return new URL(rel, document.baseURI).href; }

  /* ---- 首页行情小组件：BTC/ETH/BNB/SOL ---- */
  function loadTicker() {
    var el = document.getElementById('ticker-grid');
    if (!el) return;
    var url = 'https://api.coingecko.com/api/v3/simple/price' +
      '?ids=bitcoin,ethereum,binancecoin,solana&vs_currencies=usd&include_24hr_change=true';
    fetch(url).then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
      .then(function (d) {
        var coins = [
          { id: 'bitcoin', sym: 'BTC', name: T('比特币', 'Bitcoin') },
          { id: 'ethereum', sym: 'ETH', name: T('以太坊', 'Ethereum') },
          { id: 'binancecoin', sym: 'BNB', name: T('币安币', 'BNB') },
          { id: 'solana', sym: 'SOL', name: T('索拉纳', 'Solana') }
        ];
        var html = '';
        coins.forEach(function (c) {
          var info = d[c.id] || {};
          var chg = info.usd_24h_change;
          html += '<div class="ticker-card"><div class="sym">' + esc(c.sym) +
            '<small>' + esc(c.name) + '</small></div>' +
            '<div class="price">' + fmtUSD(info.usd) + '</div>' +
            '<div class="chg ' + chgClass(chg) + '">24h ' + chgText(chg) + '</div></div>';
        });
        el.innerHTML = html;
      })
      .catch(function () {
        el.innerHTML = '<div class="load-fail">' + T('行情加载失败', 'Market data unavailable') + '</div>';
      });
  }

  /* ---- 恐惧贪婪指数 ---- */
  function loadFng() {
    var el = document.getElementById('fng-box');
    if (!el) return;
    fetch('https://api.alternative.me/fng/?limit=1&format=json')
      .then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
      .then(function (d) {
        var item = (d && d.data && d.data[0]) || {};
        var value = parseInt(item.value, 10);
        if (isNaN(value)) throw new Error('bad data');
        var cls = String(item.value_classification || '');
        var label = (function () {
          if (isEn) return cls || 'Unknown';
          var map = { 'Extreme Fear': '极度恐惧', 'Fear': '恐惧', 'Neutral': '中性', 'Greed': '贪婪', 'Extreme Greed': '极度贪婪' };
          return map[cls] || cls || '未知';
        })();
        var pct = Math.max(0, Math.min(100, value));
        el.innerHTML =
          '<div class="fng-top"><div class="fng-num">' + value + '</div>' +
          '<div><div class="fng-label">' + esc(label) + '</div>' +
          '<div class="fng-date">' + T('加密货币恐惧贪婪指数 · 数据来源 alternative.me',
            'Crypto Fear & Greed Index · data by alternative.me') + '</div></div></div>' +
          '<div class="fng-bar"><div class="fng-marker" style="left:' + pct + '%"></div></div>';
        /* 首页 Market Status 条：同步更新恐惧贪婪迷你项 */
        var msFng = document.getElementById('ms-fng');
        if (msFng) msFng.textContent = value + ' · ' + label;
      })
      .catch(function () {
        el.innerHTML = '<div class="load-fail">' + T('指数加载失败', 'Index unavailable') + '</div>';
        var msFngWrap = document.getElementById('ms-fng-wrap');
        if (msFngWrap) msFngWrap.style.display = 'none';
      });
  }

  /* ---- 首页 Market Status 条：24h 总市值与涨跌 / BTC 市占率 ---- */
  function loadMarketStatus() {
    var strip = document.getElementById('market-status');
    if (!strip) return;
    var mcapWrap = document.getElementById('ms-mcap-wrap');
    var domWrap = document.getElementById('ms-dom-wrap');
    fetch('https://api.coingecko.com/api/v3/global')
      .then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
      .then(function (d) {
        var data = (d && d.data) || {};
        var mcap = data.total_market_cap && data.total_market_cap.usd;
        var chg = data.market_cap_change_percentage_24h_usd;
        var btc = data.market_cap_percentage && data.market_cap_percentage.btc;
        if (mcapWrap) {
          if (mcap) {
            document.getElementById('ms-mcap').textContent = '$' + (mcap / 1e12).toFixed(2) + 'T';
            var chgEl = document.getElementById('ms-mcap-chg');
            if (chgEl) { chgEl.textContent = chgText(chg); chgEl.className = 'ms-chg ' + chgClass(chg); }
          } else { mcapWrap.style.display = 'none'; }
        }
        if (domWrap) {
          if (btc) { document.getElementById('ms-dom').textContent = Number(btc).toFixed(1) + '%'; }
          else { domWrap.style.display = 'none'; }
        }
      })
      .catch(function () {
        if (mcapWrap) mcapWrap.style.display = 'none';
        if (domWrap) domWrap.style.display = 'none';
      });
  }

  /* ---- 首页：今日涨跌榜（Top50 按 24h 涨跌取头尾各 5） ---- */
  function loadMovers() {
    var el = document.getElementById('movers');
    if (!el) return;
    var url = 'https://api.coingecko.com/api/v3/coins/markets' +
      '?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h';
    fetch(url).then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
      .then(function (d) {
        var valid = (d || []).filter(function (c) {
          return c && c.price_change_percentage_24h !== null &&
            c.price_change_percentage_24h !== undefined && !isNaN(c.price_change_percentage_24h);
        });
        if (valid.length < 10) throw new Error('empty');
        var sorted = valid.slice().sort(function (a, b) {
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        });
        var gainers = sorted.slice(0, 5);
        var losers = sorted.slice(-5).reverse();
        function row(c, i) {
          var sym = (c.symbol || '').toLowerCase();
          var digits = c.current_price < 1 ? 4 : 2;
          var nameHtml = sym
            ? '<a href="markets.html#coin-' + esc(sym) + '">' + esc(c.symbol.toUpperCase()) + '</a>'
            : esc((c.symbol || '').toUpperCase());
          return '<div class="mover-row"><span class="mover-rank">' + (i + 1) + '</span>' +
            '<span class="mover-name">' + nameHtml + ' <span style="color:#9ca3af">' +
            esc(c.name || '') + '</span></span>' +
            '<span class="mover-price">' + fmtUSD(c.current_price, digits) + '</span>' +
            '<span class="mover-chg ' + chgClass(c.price_change_percentage_24h) + '">' +
            chgText(c.price_change_percentage_24h) + '</span></div>';
        }
        function col(title, list) {
          var h = '<div class="mover-col"><h3>' + esc(title) + '</h3>';
          list.forEach(function (c, i) { h += row(c, i); });
          return h + '</div>';
        }
        el.innerHTML = col(T('涨幅榜', 'Top gainers'), gainers) + col(T('跌幅榜', 'Top losers'), losers);
      })
      .catch(function () {
        el.innerHTML = '<div class="load-fail">' + T('涨跌榜加载失败', 'Movers unavailable') + '</div>';
      });
  }

  /* ---- 首页：最新资讯 / 最新空投（读 data/latest.json） ---- */
  function renderList(elId, items, pickTitle, pickUrl) {
    var el = document.getElementById(elId);
    if (!el) return;
    if (!items || !items.length) {
      el.innerHTML = '<div class="load-fail">' + T('暂无更新', 'No updates yet') + '</div>';
      return;
    }
    var html = '<ul class="news-list">';
    items.slice(0, 5).forEach(function (it) {
      html += '<li><span class="news-date">' + esc(it.date || '') + '</span>' +
        '<a class="ntitle" href="' + esc(pickUrl(it)) + '">' + esc(pickTitle(it)) + '</a></li>';
    });
    el.innerHTML = html + '</ul>';
  }
  function loadLatest() {
    var hasNews = document.getElementById('latest-news');
    var hasAirdrops = document.getElementById('latest-airdrops');
    if (!hasNews && !hasAirdrops) return;
    fetch(dataUrl('data/latest.json'))
      .then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
      .then(function (d) {
        var tf = isEn ? 'title_en' : 'title_zh';
        var uf = isEn ? 'url_en' : 'url_zh';
        renderList('latest-news', d.news, function (it) { return it[tf]; }, function (it) { return it[uf]; });
        renderList('latest-airdrops', d.airdrops, function (it) { return it[tf]; }, function (it) { return it[uf]; });
      })
      .catch(function () {
        renderList('latest-news', null); renderList('latest-airdrops', null);
      });
  }

  /* ---- news 归档页（读 data/news.json） ---- */
  function loadArchive() {
    var el = document.getElementById('news-archive');
    if (!el) return;
    fetch(dataUrl('data/news.json'))
      .then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
      .then(function (d) {
        var tf = isEn ? 'title_en' : 'title_zh';
        var uf = isEn ? 'url_en' : 'url_zh';
        renderList('news-archive', d, function (it) { return it[tf]; }, function (it) { return it[uf]; });
      })
      .catch(function () { renderList('news-archive', null); });
  }

  /* ---- markets 页：Top10 ---- */
  function loadMarkets() {
    var el = document.getElementById('markets-body');
    if (!el) return;
    var updated = document.getElementById('markets-updated');
    var url = 'https://api.coingecko.com/api/v3/coins/markets' +
      '?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h';
    fetch(url).then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
      .then(function (d) {
        if (!d || !d.length) throw new Error('empty');
        var html = '';
        d.forEach(function (c, i) {
          var digits = c.current_price < 1 ? 4 : 2;
          var rowId = c.symbol ? 'coin-' + String(c.symbol).toLowerCase() : '';
          html += '<tr' + (rowId ? ' id="' + esc(rowId) + '"' : '') + '><td class="num">' + (i + 1) + '</td>' +
            '<td><strong>' + esc(c.symbol ? c.symbol.toUpperCase() : '') + '</strong> <span style="color:#9ca3af">' +
            esc(c.name || '') + '</span></td>' +
            '<td class="num">' + fmtUSD(c.current_price, digits) + '</td>' +
            '<td class="num ' + chgClass(c.price_change_percentage_24h) + '">' +
            chgText(c.price_change_percentage_24h) + '</td>' +
            '<td class="num">$' + Number(c.market_cap || 0).toLocaleString('en-US') + '</td></tr>';
        });
        el.innerHTML = html;
        if (updated) updated.textContent = T('数据来源 CoinGecko，每分钟自动刷新页面数据',
          'Data by CoinGecko') + ' · ' + new Date().toLocaleString(isEn ? 'en-US' : 'zh-CN');
      })
      .catch(function () {
        el.innerHTML = '<tr><td colspan="5"><div class="load-fail">' +
          T('行情加载失败', 'Market data unavailable') + '</div></td></tr>';
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadTicker(); loadFng(); loadMarketStatus(); loadMovers(); loadLatest(); loadArchive(); loadMarkets();
  });
})();

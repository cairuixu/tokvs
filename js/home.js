/* 币VS v2 首页逻辑：市场状态 / 今日行情 / ETF 流向（读 data/etf.json）/ Meme 热度 / 快讯（读 data/news.json）
   语言按 <html lang> 切换；数据基路径由页面内联 window.TOKVS_DATA_BASE 指定（如 'data/' 或 '../data/'）。
   所有外部请求失败时显示占位文案，不留白。逻辑沿用旧站 portal.js / daily.js。 */
(function () {
  'use strict';
  var isEn = document.documentElement.lang === 'en';
  function T(zh, en) { return isEn ? en : zh; }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }
  var DATA = window.TOKVS_DATA_BASE || 'data/';
  function dataUrl(rel) { return DATA + rel; }
  function rootPrefix() { return DATA.replace(/data\/?$/, ''); }
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
  function fail(id, zh, en) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = '<div class="load-fail">' + T(zh, en) + '</div>';
  }

  /* ---- Hero 市场状态：恐惧贪婪 + 总市值/BTC 市占（CoinGecko global） ---- */
  function loadStatus() {
    var fngV = document.getElementById('ms-fng');
    if (fngV) {
      fetch('https://api.alternative.me/fng/?limit=1&format=json')
        .then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
        .then(function (d) {
          var item = (d && d.data && d.data[0]) || {};
          var value = parseInt(item.value, 10);
          if (isNaN(value)) throw new Error('bad');
          var cls = String(item.value_classification || '');
          var label = isEn ? (cls || 'Unknown') : ({
            'Extreme Fear': '极度恐惧', 'Fear': '恐惧', 'Neutral': '中立',
            'Greed': '贪婪', 'Extreme Greed': '极度贪婪'
          }[cls] || cls || '未知');
          fngV.innerHTML = value + '<small>' + esc(label) + '</small>';
        })
        .catch(function () { fngV.textContent = '--'; });
    }
    var mcapV = document.getElementById('ms-mcap');
    var domV = document.getElementById('ms-dom');
    var chgV = document.getElementById('ms-chg');
    if (mcapV || domV) {
      fetch('https://api.coingecko.com/api/v3/global')
        .then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
        .then(function (d) {
          var data = (d && d.data) || {};
          var mcap = data.total_market_cap && data.total_market_cap.usd;
          var chg = data.market_cap_change_percentage_24h_usd;
          var btc = data.market_cap_percentage && data.market_cap_percentage.btc;
          if (mcapV) mcapV.textContent = mcap ? '$' + (mcap / 1e12).toFixed(2) + 'T' : '--';
          if (domV) domV.textContent = btc ? Number(btc).toFixed(1) + '%' : '--';
          if (chgV) chgV.innerHTML = '<span class="' + chgClass(chg) + '">' + chgText(chg) + '</span>';
        })
        .catch(function () {
          if (mcapV) mcapV.textContent = '--';
          if (domV) domV.textContent = '--';
          if (chgV) chgV.textContent = '--';
        });
    }
  }

  /* ---- 今日行情：市值 Top5 ---- */
  var COIN_STYLE = {
    bitcoin:     { color: '#F7931A', hint: ['新手首选', 'Beginner pick'] },
    ethereum:    { color: '#627EEA', hint: ['生态最大', 'Largest ecosystem'] },
    solana:      { color: '#14B8A6', hint: ['波动更大', 'More volatile'] },
    binancecoin: { color: '#C99612', hint: ['可抵手续费', 'Fee discount'] },
    ripple:      { color: '#23292F', hint: ['跨境支付', 'Cross-border'] }
  };
  function loadPrices() {
    var el = document.getElementById('price-rows');
    if (!el) return;
    var url = 'https://api.coingecko.com/api/v3/coins/markets' +
      '?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false&price_change_percentage=24h';
    fetch(url).then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
      .then(function (d) {
        if (!d || !d.length) throw new Error('empty');
        var html = '';
        d.forEach(function (c, i) {
          var st = COIN_STYLE[c.id] || { color: '#5C6154', hint: ['', ''] };
          var digits = c.current_price < 1 ? 4 : 2;
          var sym = (c.symbol || '').toUpperCase();
          html += '<div class="prow"><span class="rk">' + (i + 1) + '</span>' +
            '<div class="cic" style="background:' + st.color + ';">' + esc(sym.charAt(0) || '?') + '</div>' +
            '<div class="nm">' + esc(c.name || sym) + '<small>' + esc(sym) + '</small></div>' +
            (st.hint[isEn ? 1 : 0] ? '<span class="hint">' + esc(st.hint[isEn ? 1 : 0]) + '</span>' : '') +
            '<div class="pr"><div class="p">' + fmtUSD(c.current_price, digits) + '</div>' +
            '<div class="c ' + chgClass(c.price_change_percentage_24h) + '">' +
            chgText(c.price_change_percentage_24h) + '</div></div></div>';
        });
        el.innerHTML = html;
      })
      .catch(function () { fail('price-rows', '行情加载失败', 'Market data unavailable'); });
  }

  /* ---- ETF 资金流向：data/etf.json {btc:[{date,flow_m}], eth:[...], updated} ---- */
  function fmtFlow(v) {
    if (v === null || v === undefined || isNaN(v)) return '--';
    return (v > 0 ? '+' : '') + Number(v).toFixed(1);
  }
  function loadETF() {
    var box = document.getElementById('etf-rows');
    if (!box) return;
    fetch(dataUrl('etf.json'))
      .then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
      .then(function (d) {
        var btc = (d && d.btc) || [], eth = (d && d.eth) || [];
        if (!btc.length || !eth.length) throw new Error('empty');
        var lastB = btc[btc.length - 1], lastE = eth[eth.length - 1];
        var h = '<div class="etf-row"><span class="k">BTC ETF</span>' +
          '<span class="v num ' + (lastB.flow_m >= 0 ? 'up' : 'down') + '">' +
          (lastB.flow_m >= 0 ? '+' : '-') + '$' + Math.abs(Number(lastB.flow_m)).toFixed(1) + 'M</span></div>' +
          '<div class="etf-row"><span class="k">ETH ETF</span>' +
          '<span class="v num ' + (lastE.flow_m >= 0 ? 'up' : 'down') + '">' +
          (lastE.flow_m >= 0 ? '+' : '-') + '$' + Math.abs(Number(lastE.flow_m)).toFixed(1) + 'M</span></div>';
        h += '<div class="etf-mini">';
        var n = Math.min(5, btc.length, eth.length);
        for (var i = btc.length - n; i < btc.length; i++) {
          var b = btc[i], e = eth[i] || {};
          h += '<div class="r"><span>' + esc(String(b.date || '').slice(5)) + '</span>' +
            '<span>BTC <b class="' + (b.flow_m >= 0 ? 'up' : 'down') + '">' + esc(fmtFlow(b.flow_m)) + '</b></span>' +
            '<span>ETH <b class="' + (e.flow_m >= 0 ? 'up' : 'down') + '">' + esc(fmtFlow(e.flow_m)) + '</b></span></div>';
        }
        h += '</div>';
        var sum3 = 0;
        for (var j = Math.max(0, btc.length - 3); j < btc.length; j++) sum3 += Number(btc[j].flow_m || 0);
        var verdict = document.getElementById('etf-verdict');
        if (verdict) {
          verdict.textContent = sum3 >= 0
            ? T('BTC ETF 近 3 日合计净流入，机构情绪偏积极。', 'BTC ETFs saw net inflows over the last 3 days — institutional sentiment is positive.')
            : T('BTC ETF 近 3 日合计净流出，机构偏谨慎，新手别追高。', 'BTC ETFs saw net outflows over the last 3 days — institutions are cautious. Don\'t chase pumps.');
        }
        var upd = document.getElementById('etf-updated');
        if (upd && d.updated) upd.textContent = T('更新于 ', 'Updated ') + d.updated;
        box.innerHTML = h;
      })
      .catch(function () { fail('etf-rows', 'ETF 数据加载失败', 'ETF data unavailable'); });
  }

  /* ---- Meme 热度：CoinGecko meme-token 板块 24h 涨幅 Top5 ---- */
  function loadMeme() {
    var el = document.getElementById('meme-chips');
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
        var classes = ['chip-a', 'chip-b', 'chip-c', 'chip-d', 'chip-c'];
        var h = '';
        top.forEach(function (c, i) {
          h += '<span class="meme-chip ' + classes[i % classes.length] + '">' +
            esc((c.symbol || '').toUpperCase()) + ' ' + chgText(c.price_change_percentage_24h) + '</span>';
        });
        el.innerHTML = h;
      })
      .catch(function () { fail('meme-chips', 'Meme 数据加载失败', 'Meme data unavailable'); });
  }

  /* ---- 快讯流：data/news.json [{date, title_zh, title_en, url_zh, url_en}] ---- */
  function loadNews() {
    var el = document.getElementById('news-rows');
    if (!el) return;
    fetch(dataUrl('news.json'))
      .then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
      .then(function (d) {
        if (!d || !d.length) throw new Error('empty');
        var tf = isEn ? 'title_en' : 'title_zh';
        var uf = isEn ? 'url_en' : 'url_zh';
        var h = '';
        d.slice(0, 5).forEach(function (it) {
          var url = rootPrefix() + (it[uf] || '');
          h += '<div class="nrow"><span class="dot"></span>' +
            '<a class="tt" href="' + esc(url) + '">' + esc(it[tf] || '') + '</a>' +
            '<span class="tm">' + esc(it.date || '') + '</span></div>';
        });
        el.innerHTML = h;
      })
      .catch(function () { fail('news-rows', '快讯加载失败', 'News unavailable'); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    try { loadStatus(); } catch (e) {}
    try { loadPrices(); } catch (e) {}
    try { loadETF(); } catch (e) {}
    try { loadMeme(); } catch (e) {}
    try { loadNews(); } catch (e) {}
  });
})();

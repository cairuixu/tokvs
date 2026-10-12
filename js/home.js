/* 币VS v2 首页逻辑：市场状态 / 今日行情 / ETF 流向（读 data/etf.json）/ Meme 热度（点币跳 DexScreener K 线图）/ 空投精选（读 js/airdrops-data.js）/ 快讯（读 data/news.json）
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

  /* ---- 今日涨跌榜：CoinGecko 市值 Top100 按 24h 涨跌幅取涨前 5 / 跌前 5（失败 4 秒后自动重试一次） ---- */
  function fetchMoversOnce(url) {
    return fetch(url).then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); });
  }
  function loadMovers() {
    var el = document.getElementById('movers-rows');
    if (!el) return;
    var url = 'https://api.coingecko.com/api/v3/coins/markets' +
      '?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h';
    fetchMoversOnce(url).catch(function () {
      return new Promise(function (res) { setTimeout(res, 4000); }).then(function () {
        return fetchMoversOnce(url);
      });
    }).then(function (d) {
      var valid = (d || []).filter(function (c) {
        return c && c.price_change_percentage_24h !== null &&
          c.price_change_percentage_24h !== undefined && !isNaN(c.price_change_percentage_24h);
      });
      if (valid.length < 2) throw new Error('empty');
      var sorted = valid.slice().sort(function (a, b) {
        return b.price_change_percentage_24h - a.price_change_percentage_24h;
      });
      var gainers = sorted.slice(0, 5);
      var losers = sorted.slice(-5).reverse();
      function row(c) {
        var digits = c.current_price < 1 ? 4 : 2;
        var sym = (c.symbol || '').toUpperCase();
        var v = c.price_change_percentage_24h;
        return '<div class="mv-row"><span class="mv-nm">' + esc(c.name || sym) + '<small>' + esc(sym) + '</small></span>' +
          '<span class="mv-pr num">' + fmtUSD(c.current_price, digits) + '</span>' +
          '<span class="mv-c num ' + chgClass(v) + '">' + chgText(v) + '</span></div>';
      }
      el.innerHTML = '<div class="movers">' +
        '<div class="mv-col"><div class="mv-head up">' + esc(T('涨幅榜', 'Top gainers')) + '</div>' +
        gainers.map(row).join('') + '</div>' +
        '<div class="mv-col"><div class="mv-head down">' + esc(T('跌幅榜', 'Top losers')) + '</div>' +
        losers.map(row).join('') + '</div></div>';
    }).catch(function () {
      el.innerHTML = '<div class="load-fail">' + esc(T('涨跌榜加载失败', 'Movers unavailable')) + '</div>';
    });
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

  /* ---- Meme 热度：CoinGecko meme-token 板块 ----
     卡顶重点位「今日热度最高」= 24h 成交额最大的币（深色块整块可点）；
     若成交额冠军涨幅数据缺失/异常则退回按涨幅第一名做重点位。
     下方榜单按 24h 涨幅排序、排除重点位币取前 7 行（整行可点）。
     所有链接先给 DexScreener 搜索页兜底，渲染后逐个异步查 DexScreener
     搜索 API，命中同符号、流动性最大的交易对时升级为该交易对的 K 线图页
     （dexscreener.com/<chainId>/<pairAddress>）；失败保留兜底。 */
  function fmtVol(n) {
    if (n === null || n === undefined || isNaN(n)) return '--';
    n = Number(n);
    function trim(x) { return String(parseFloat(x.toFixed(2))); }
    if (n >= 1e9) return '$' + trim(n / 1e9) + 'B';
    if (n >= 1e6) return '$' + trim(n / 1e6) + 'M';
    if (n >= 1e3) return '$' + trim(n / 1e3) + 'K';
    return '$' + trim(n);
  }
  function memePriceTxt(pr) {
    if (pr === null || pr === undefined || isNaN(pr)) return '--';
    return pr >= 1 ? fmtUSD(pr, 2) : (pr >= 0.01 ? fmtUSD(pr, 4) : '$' + Number(pr).toPrecision(3));
  }
  function upgradeMemeLink(a, sym) {
    if (!a || !sym) return;
    fetch('https://api.dexscreener.com/latest/dex/search?q=' + encodeURIComponent(sym))
      .then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
      .then(function (d) {
        var pairs = (d && d.pairs) || [];
        var best = null;
        pairs.forEach(function (p) {
          if (!p || !p.baseToken || !p.chainId || !p.pairAddress) return;
          if (String(p.baseToken.symbol || '').toLowerCase() !== sym.toLowerCase()) return;
          var liq = (p.liquidity && Number(p.liquidity.usd)) || 0;
          if (!best || liq > best.liq) {
            best = { liq: liq, href: 'https://dexscreener.com/' + p.chainId + '/' + p.pairAddress };
          }
        });
        if (best) a.setAttribute('href', best.href);
      })
      .catch(function () { /* 升级失败不报错，保留搜索兜底链接 */ });
  }
  function loadMeme() {
    var el = document.getElementById('meme-chips');
    if (!el) return;
    var url = 'https://api.coingecko.com/api/v3/coins/markets' +
      '?vs_currency=usd&category=meme-token&order=market_cap_desc&per_page=30&page=1&sparkline=false&price_change_percentage=24h';
    fetch(url).then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
      .then(function (d) {
        var all = (d || []).filter(function (c) { return c && (c.name || c.symbol); });
        function chgOk(c) {
          return c.price_change_percentage_24h !== null &&
            c.price_change_percentage_24h !== undefined && !isNaN(c.price_change_percentage_24h);
        }
        var valid = all.filter(chgOk);
        if (!valid.length) throw new Error('empty');
        var byChg = valid.slice().sort(function (a, b) {
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        });
        /* 重点位：成交额最大且涨幅数据正常的币；异常时退回涨幅第一名 */
        var hero = null, heroVol = -1;
        all.forEach(function (c) {
          var vol = Number(c.total_volume);
          if (!isNaN(vol) && vol > heroVol) { heroVol = vol; hero = c; }
        });
        if (!hero || !chgOk(hero)) hero = byChg[0];
        var top = byChg.filter(function (c) { return c !== hero; }).slice(0, 7);
        function dexHref(c) {
          return 'https://dexscreener.com/search?q=' + encodeURIComponent((c.symbol || '').toUpperCase());
        }
        var hsym = (hero.symbol || '').toUpperCase();
        var hv = hero.price_change_percentage_24h;
        var h = '<a class="mm-hero" href="' + dexHref(hero) + '"' +
          ' target="_blank" rel="noopener" data-sym="' + esc(hsym) + '">' +
          '<span class="mm-hero-tag">' + esc(T('🔥 今日热度最高', '🔥 Today\'s Hottest')) + '</span>' +
          '<span class="mm-hero-main"><span class="mm-hero-nm">' + esc(hero.name || hsym) +
          '<small>' + esc(hsym) + '</small></span>' +
          '<span class="mm-hero-pr num">' + memePriceTxt(hero.current_price) + '</span></span>' +
          '<span class="mm-hero-meta"><span class="mm-hero-c num ' + chgClass(hv) + '">' + chgText(hv) + '</span>' +
          '<span class="mm-hero-vol">' + esc(T('24h 成交额 ', '24h Volume ')) + fmtVol(hero.total_volume) + '</span></span></a>';
        top.forEach(function (c, i) {
          var sym = (c.symbol || '').toUpperCase();
          var v = c.price_change_percentage_24h;
          h += '<a class="mm-row" href="' + dexHref(c) + '"' +
            ' target="_blank" rel="noopener" data-sym="' + esc(sym) + '">' +
            '<span class="mm-rk">' + (i + 1) + '</span>' +
            '<span class="mm-nm">' + esc(c.name || sym) + '<small>' + esc(sym) + '</small></span>' +
            '<span class="mm-pr num">' + memePriceTxt(c.current_price) + '</span>' +
            '<span class="mm-c num ' + chgClass(v) + '">' + chgText(v) + '</span></a>';
        });
        el.innerHTML = h;
        var links = el.querySelectorAll('a.mm-row, a.mm-hero');
        for (var k = 0; k < links.length; k++) {
          upgradeMemeLink(links[k], links[k].getAttribute('data-sym') || '');
        }
      })
      .catch(function () { fail('meme-chips', 'Meme 数据加载失败', 'Meme data unavailable'); });
  }

  /* ---- 空投精选：js/airdrops-data.js 的 TOKVS_AIRDROPS 前 3 条（页面在 home.js 之前加载该脚本） ---- */
  function briefDesc(s) {
    s = String(s || '');
    var cap = isEn ? 170 : 90, cut = -1, idx;
    if (isEn) { idx = s.indexOf('. '); if (idx >= 0) cut = idx + 1; }
    else { idx = s.indexOf('。'); if (idx >= 0) cut = idx + 1; }
    if (cut > 0 && cut <= cap) return s.slice(0, cut);
    return s.length > cap ? s.slice(0, cap) + '…' : s;
  }
  function loadHomeAirdrops() {
    var box = document.getElementById('home-airdrops');
    if (!box) return;
    var list = window.TOKVS_AIRDROPS;
    if (!list || !list.length) { fail('home-airdrops', '空投数据加载失败', 'Airdrop data unavailable'); return; }
    var nf = isEn ? 'name_en' : 'name_zh';
    var df = isEn ? 'desc_en' : 'desc_zh';
    var themes = ['t1', 't2', 't3'];
    var colors = ['#6D4BD8', '#0E9F6E', '#D97008'];
    var href = 'airdrops.html'; /* 同语言目录内的空投页：根页与 en 页同理 */
    var h = '';
    list.slice(0, 3).forEach(function (it, i) {
      var name = it[nf] || it.name_zh || '';
      var letter = String(it.name_en || name).charAt(0).toUpperCase() || '?';
      var tag = (it.tags && it.tags[0]) ? (isEn ? it.tags[0].en : it.tags[0].zh) : '';
      var m = String(it.deadline || '').match(/-(\d{2})-(\d{2})/);
      var pill = m
        ? '<span class="dl num">' + esc(T(m[1] + '-' + m[2] + ' 截止', 'Ends ' + m[1] + '-' + m[2])) + '</span>'
        : '<span class="dl">' + esc(T('进行中', 'Ongoing')) + '</span>';
      h += '<div class="air ' + themes[i % themes.length] + '">' +
        '<div class="top"><div class="ava" style="color:' + colors[i % colors.length] + ';">' + esc(letter) + '</div>' +
        '<div><div class="nm">' + esc(name) + '</div><div class="tp">' + esc(tag || '') + '</div></div></div>' +
        '<p>' + esc(briefDesc(it[df] || it.desc_zh)) + '</p>' +
        '<div class="ft">' + pill + '<a class="join" href="' + esc(href) + '">' +
        esc(T('查看任务', 'View tasks')) + '</a></div></div>';
    });
    box.innerHTML = h;
  }

  /* ---- 快讯流：data/news.json [{date, title_zh, title_en, link}]（link 为外部来源 URL，可缺省） ---- */
  function loadNews() {
    var el = document.getElementById('news-rows');
    if (!el) return;
    fetch(dataUrl('news.json'))
      .then(function (r) { if (!r.ok) throw new Error('http'); return r.json(); })
      .then(function (d) {
        if (!d || !d.length) throw new Error('empty');
        var tf = isEn ? 'title_en' : 'title_zh';
        var h = '';
        d.slice(0, 5).forEach(function (it) {
          var title = esc(it[tf] || '');
          var tt = it.link
            ? '<a class="tt" href="' + esc(it.link) + '" target="_blank" rel="noopener">' + title + '</a>'
            : '<span class="tt">' + title + '</span>';
          h += '<div class="nrow"><span class="dot"></span>' + tt +
            '<span class="tm">' + esc(it.date || '') + '</span></div>';
        });
        el.innerHTML = h;
      })
      .catch(function () { fail('news-rows', '快讯加载失败', 'News unavailable'); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    try { loadStatus(); } catch (e) {}
    try { loadPrices(); } catch (e) {}
    try { loadMovers(); } catch (e) {}
    try { loadETF(); } catch (e) {}
    try { loadMeme(); } catch (e) {}
    try { loadHomeAirdrops(); } catch (e) {}
    try { loadNews(); } catch (e) {}
  });
})();

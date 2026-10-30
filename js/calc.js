/* 手续费计算器逻辑（沿用旧站 app.js）：开仓挂单 + 平仓吃单，按总手续费升序
   纯函数可在 node 下自测；语言按 <html lang> 切换 */
var EXCHANGES = [
  { id: 'binance', name: 'Binance', ref: 'https://account.binance.com/register?ref=76257270&?registerChannel=user_center', futuresMaker: 0.0002, futuresTaker: 0.0005 },
  { id: 'okx',     name: 'OKX',     ref: 'https://www.okx.com/join/AZTPA7SQ', futuresMaker: 0.0002, futuresTaker: 0.0005 },
  { id: 'bybit',   name: 'Bybit',   ref: 'https://www.bybit.com/invite?ref=NMAYO7&medium=referral&utm_campaign=evergreen&share_to=link', futuresMaker: 0.0002, futuresTaker: 0.00055 },
  { id: 'bitget',  name: 'Bitget',  ref: 'https://www.bitget.com', futuresMaker: 0.0002, futuresTaker: 0.0006 }
];
var CALC_EN = (typeof document !== 'undefined' && document.documentElement.lang === 'en');

function validateInputs(notional, leverage) {
  notional = Number(notional);
  leverage = Number(leverage);
  if (!isFinite(notional) || notional <= 0) {
    return { ok: false, msg: CALC_EN ? 'Enter an amount greater than 0' : '请输入大于 0 的交易额' };
  }
  if (!isFinite(leverage) || leverage < 1 || leverage > 125 || Math.floor(leverage) !== leverage) {
    return { ok: false, msg: CALC_EN ? 'Leverage must be a whole number from 1 to 125' : '杠杆请输入 1–125 的整数' };
  }
  return { ok: true, notional: notional, leverage: leverage };
}

function calcFees(notional) {
  var round2 = function (n) { return Math.round(n * 100) / 100; };
  return EXCHANGES.map(function (e) {
    var openFee = round2(notional * e.futuresMaker);
    var closeFee = round2(notional * e.futuresTaker);
    return { id: e.id, name: e.name, ref: e.ref, openFee: openFee, closeFee: closeFee, total: round2(openFee + closeFee) };
  }).sort(function (a, b) { return a.total - b.total; });
}

function calcMargin(notional, leverage) { return notional / leverage; }

function fmt(n) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* 浏览器 DOM 绑定（node 下跳过） */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('calcBtn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var errEl = document.getElementById('errMsg');
      errEl.style.display = 'none';
      var v = validateInputs(
        document.getElementById('notional').value,
        document.getElementById('leverage').value
      );
      if (!v.ok) {
        errEl.textContent = v.msg;
        errEl.style.display = 'block';
        return;
      }
      var side = document.querySelector('input[name="side"]:checked').value;
      var sideText = side === 'long' ? (CALC_EN ? 'Long' : '做多') : (CALC_EN ? 'Short' : '做空');
      var rows = calcFees(v.notional);
      var margin = calcMargin(v.notional, v.leverage);
      var html = rows.map(function (r, i) {
        var best = i === 0 ? ' <span class="best">' + (CALC_EN ? 'Lowest' : '最省') + '</span>' : '';
        return '<tr><td class="name">' + r.name + best + '</td>' +
          '<td class="num" data-label="' + (CALC_EN ? 'Open fee' : '开仓手续费') + '">' + fmt(r.openFee) + ' U</td>' +
          '<td class="num" data-label="' + (CALC_EN ? 'Close fee' : '平仓手续费') + '">' + fmt(r.closeFee) + ' U</td>' +
          '<td class="num" data-label="' + (CALC_EN ? 'Total' : '开平总计') + '"><strong>' + fmt(r.total) + ' U</strong></td>' +
          '<td class="num" data-label="' + (CALC_EN ? 'Margin needed' : '所需保证金') + '">' + fmt(margin) + ' U</td>' +
          '<td><a class="btn-ref" href="' + r.ref + '" target="_blank" rel="nofollow noopener">' +
          (CALC_EN ? 'Sign up' : '注册') + '</a></td></tr>';
      }).join('');
      document.getElementById('resultBody').innerHTML = html;
      document.getElementById('resultMeta').textContent =
        '（' + fmt(v.notional) + ' U · ' + sideText + ' · ' + v.leverage + 'x）';
      document.getElementById('result').style.display = 'block';
    });
    /* 页面加载自动算一次 */
    btn.click();
  });
}

/* node 自测导出 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EXCHANGES: EXCHANGES, validateInputs: validateInputs, calcFees: calcFees, calcMargin: calcMargin };
}

/* 手续费计算器逻辑：纯函数，可在 node 下自测 */
var EXCHANGES = [
  { id: 'binance', name: 'Binance', ref: 'https://account.binance.com/register?ref=76257270&?registerChannel=user_center', futuresMaker: 0.0002,  futuresTaker: 0.0005  },
  { id: 'okx',     name: 'OKX',     ref: 'https://www.okx.com/join/AZTPA7SQ',     futuresMaker: 0.0002,  futuresTaker: 0.0005  },
  { id: 'bybit',   name: 'Bybit',   ref: 'https://www.bybit.com/invite?ref=NMAYO7&medium=referral&utm_campaign=evergreen&share_to=link',   futuresMaker: 0.0002,  futuresTaker: 0.00055 },
  { id: 'bitget',  name: 'Bitget',  ref: 'https://www.bitget.com',  futuresMaker: 0.0002,  futuresTaker: 0.0006  }
];

/* 输入校验：返回 {ok, notional, leverage, msg} */
function validateInputs(notional, leverage) {
  notional = Number(notional);
  leverage = Number(leverage);
  if (!isFinite(notional) || notional <= 0) {
    return { ok: false, msg: '请输入大于 0 的交易额' };
  }
  if (!isFinite(leverage) || leverage < 1 || leverage > 125 || Math.floor(leverage) !== leverage) {
    return { ok: false, msg: '杠杆请输入 1–125 的整数' };
  }
  return { ok: true, notional: notional, leverage: leverage };
}

/* 核心计算：开仓挂单 + 平仓吃单，按总手续费升序 */
function calcFees(notional) {
  var round2 = function (n) { return Math.round(n * 100) / 100; };
  return EXCHANGES.map(function (e) {
    var openFee = round2(notional * e.futuresMaker);
    var closeFee = round2(notional * e.futuresTaker);
    return {
      id: e.id, name: e.name, ref: e.ref,
      openFee: openFee, closeFee: closeFee,
      total: round2(openFee + closeFee)
    };
  }).sort(function (a, b) { return a.total - b.total; });
}

function calcMargin(notional, leverage) {
  return notional / leverage;
}

function fmt(n) {
  return n.toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* 浏览器 DOM 绑定（node 下跳过） */
if (typeof document !== 'undefined') {
  document.getElementById('calcBtn').addEventListener('click', function () {
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
    var sideText = side === 'long' ? '做多' : '做空';
    var rows = calcFees(v.notional);
    var margin = calcMargin(v.notional, v.leverage);
    var html = rows.map(function (r, i) {
      var best = i === 0 ? ' <span class="best">最省</span>' : '';
      return '<tr><td>' + r.name + best + '</td>' +
        '<td class="num">' + fmt(r.openFee) + ' U</td>' +
        '<td class="num">' + fmt(r.closeFee) + ' U</td>' +
        '<td class="num"><strong>' + fmt(r.total) + ' U</strong></td>' +
        '<td class="num">' + fmt(margin) + ' U</td>' +
        '<td><a class="btn btn-ref" style="padding:7px 16px;font-size:13px" href="' + r.ref + '" target="_blank" rel="nofollow noopener">注册</a></td></tr>';
    }).join('');
    document.getElementById('resultBody').innerHTML = html;
    document.getElementById('resultMeta').textContent =
      '（' + fmt(v.notional) + ' U · ' + sideText + ' · ' + v.leverage + 'x）';
    document.getElementById('result').style.display = 'block';
    document.getElementById('result').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
  /* 页面加载自动算一次 */
  document.getElementById('calcBtn').click();
}

/* node 自测导出 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { EXCHANGES: EXCHANGES, validateInputs: validateInputs, calcFees: calcFees, calcMargin: calcMargin };
}

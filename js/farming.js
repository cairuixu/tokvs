/* tokvs 空投撸毛进度追踪：在每个空投卡片上挂"开始撸毛"按钮 + 步骤 checklist
   进度存 localStorage `tokvs_farming`（格式 {airdropId: [已完成步骤下标]}）
   语言按 <html lang> 自动切换。无数据或解析失败时静默跳过，不影响原卡片展示。 */
(function () {
  'use strict';
  var KEY = 'tokvs_farming';
  var isEn = document.documentElement.lang === 'en';
  function T(zh, en) { return isEn ? en : zh; }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* 按空投 id 映射的精选步骤：每项 4-6 步，中英双语 */
  var STEPS = {
    'sample-l2-testnet': [
      { zh: '创建一个全新钱包并切换到该 L2 测试网（不要导入主网私钥）',
        en: 'Create a fresh wallet and switch to the L2 testnet (never import a mainnet private key)' },
      { zh: '在官方水龙头领取测试币',
        en: 'Claim test tokens from the official faucet' },
      { zh: '用官方跨链桥完成一次跨链',
        en: 'Complete one bridge transaction on the official bridge' },
      { zh: '在测试网 DEX 上完成一笔兑换',
        en: 'Make one swap on the testnet DEX' },
      { zh: '每周至少交互一次，保持钱包活跃',
        en: 'Interact at least once a week to keep the wallet active' }
    ],
    'sample-exchange-bonus': [
      { zh: '通过活动页邀请链接注册新账户',
        en: 'Register a new account via the campaign invite link' },
      { zh: '完成实名认证（KYC）',
        en: 'Complete identity verification (KYC)' },
      { zh: '在活动页领取体验金券，注意使用期限',
        en: 'Claim the bonus voucher on the campaign page and note its expiry date' },
      { zh: '用体验金开仓，盈利部分按活动规则提现',
        en: 'Open a position with the bonus; withdraw profits per the campaign rules' }
    ]
  };

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; }
    catch (e) { return {}; }
  }
  function save(d) {
    try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {}
  }

  /* 兜底：从卡片"参与步骤 / Steps"一栏里解析步骤（按 → 分隔、去掉序号） */
  function deriveSteps(card) {
    try {
      var dts = card.querySelectorAll('.kv dt');
      for (var i = 0; i < dts.length; i++) {
        var t = ((dts[i].textContent || '').trim());
        if (t === '参与步骤' || t === 'Steps') {
          var dd = dts[i].nextElementSibling;
          if (!dd) return null;
          var parts = dd.innerHTML.split(/→|&rarr;|&#8594;/);
          var out = [];
          parts.forEach(function (p) {
            var txt = p.replace(/<[^>]+>/g, '')
              .replace(/^\s*\d+\s*[.、)]\s*/, '')
              .trim();
            if (txt) out.push({ zh: txt, en: txt });
          });
          return out.length >= 2 ? out.slice(0, 8) : null;
        }
      }
    } catch (e) {}
    return null;
  }

  function initCard(card) {
    var id = card.getAttribute('data-airdrop-id');
    if (!id) return;
    var steps = STEPS[id] || deriveSteps(card);
    if (!steps || !steps.length) return;
    var total = steps.length;

    var state = load();
    var done = Array.isArray(state[id]) ? state[id] : [];

    var zone = document.createElement('div');
    zone.className = 'farm-zone';
    zone.innerHTML =
      '<div class="farm-head">' +
        '<button type="button" class="btn-add farm-toggle">' + esc(T('开始撸毛', 'Start farming')) + '</button>' +
        '<div class="farm-progress" aria-hidden="true"><i></i></div>' +
        '<span class="farm-count"></span>' +
        '<span class="tag farm-done-tag" style="display:none">' + esc(T('已完成', 'Done')) + '</span>' +
        '<button type="button" class="farm-reset">' + esc(T('重置进度', 'Reset')) + '</button>' +
      '</div>' +
      '<ul class="farm-steps" style="display:none"></ul>';
    card.appendChild(zone);

    var toggleBtn = zone.querySelector('.farm-toggle');
    var bar = zone.querySelector('.farm-progress i');
    var countEl = zone.querySelector('.farm-count');
    var doneTag = zone.querySelector('.farm-done-tag');
    var resetBtn = zone.querySelector('.farm-reset');
    var list = zone.querySelector('.farm-steps');

    steps.forEach(function (s, idx) {
      var li = document.createElement('li');
      var label = document.createElement('label');
      var cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = done.indexOf(idx) !== -1;
      var span = document.createElement('span');
      span.textContent = isEn ? s.en : s.zh;
      label.appendChild(cb);
      label.appendChild(span);
      li.appendChild(label);
      if (cb.checked) li.classList.add('done');
      cb.addEventListener('change', function () {
        var cur = load();
        var arr = Array.isArray(cur[id]) ? cur[id] : [];
        if (cb.checked) {
          if (arr.indexOf(idx) === -1) arr.push(idx);
          li.classList.add('done');
        } else {
          arr = arr.filter(function (x) { return x !== idx; });
          li.classList.remove('done');
        }
        cur[id] = arr;
        save(cur);
        paint(arr);
      });
      list.appendChild(li);
    });

    function paint(arr) {
      var n = arr.length;
      var pct = total ? Math.round(n / total * 100) : 0;
      bar.style.width = pct + '%';
      countEl.textContent = n + '/' + total;
      doneTag.style.display = n === total ? '' : 'none';
    }
    paint(done);

    toggleBtn.addEventListener('click', function () {
      var open = list.style.display !== 'none';
      list.style.display = open ? 'none' : '';
      toggleBtn.textContent = open
        ? T('开始撸毛', 'Start farming')
        : T('收起步骤', 'Hide steps');
    });

    resetBtn.addEventListener('click', function () {
      var cur = load();
      cur[id] = [];
      save(cur);
      var boxes = list.querySelectorAll('input[type=checkbox]');
      for (var i = 0; i < boxes.length; i++) {
        boxes[i].checked = false;
        boxes[i].closest('li').classList.remove('done');
      }
      paint([]);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    try {
      var cards = document.querySelectorAll('.airdrop');
      for (var i = 0; i < cards.length; i++) initCard(cards[i]);
    } catch (e) {}
  });
})();

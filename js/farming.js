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
    'airdrop-20261010-pushchain': [
      { zh: '进入 Push Chain 官方 Rewards Portal 并注册',
        en: 'Open the official Push Chain Rewards Portal and register' },
      { zh: '领取测试币', en: 'Claim test tokens' },
      { zh: '完成测试网兑换、提供流动性等交互',
        en: 'Complete testnet swaps, liquidity provision and other interactions' },
      { zh: '每日参与转盘与任务，持续攒积分',
        en: 'Do daily spins and quests to keep stacking points' },
      { zh: '关注官方公告，等待快照',
        en: 'Follow official channels for the snapshot announcement' }
    ],
    'airdrop-20261010-asentum': [
      { zh: '阅读官方测试网指南', en: 'Read the official testnet guide' },
      { zh: '在水龙头领取测试币', en: 'Claim test tokens from the faucet' },
      { zh: '每日完成转账、兑换、提供流动性，攒 XP',
        en: 'Do daily transfers, swaps and liquidity to stack XP' },
      { zh: '（可选）用普通电脑运行验证者，赚更多 XP',
        en: '(Optional) run a validator on consumer hardware for more XP' },
      { zh: '关注官方快照公告', en: 'Watch for the official snapshot announcement' }
    ],
    'airdrop-20261010-gyndore': [
      { zh: '进入 Gyndore 官方 DropWave 活动页',
        en: 'Open the official Gyndore DropWave campaign page' },
      { zh: '钱包切换到 Base Sepolia 测试网',
        en: 'Switch your wallet to the Base Sepolia testnet' },
      { zh: '领取测试 cbBTC', en: 'Claim test cbBTC' },
      { zh: '完成存入、借出等协议交互，攒 Chips 与 Gynpoints',
        en: 'Complete deposits, borrows and other interactions to stack Chips and Gynpoints' },
      { zh: '关注 TGE 公告', en: 'Watch for the TGE announcement' }
    ],
    'airdrop-20261010-pharos': [
      { zh: '打开 Pharos 官方领取门户（认准官方域名）',
        en: 'Open the official Pharos claim portal (verify the official domain)' },
      { zh: '连接参与测试网时的同一钱包',
        en: 'Connect the same wallet you used on testnet' },
      { zh: '查询领取资格与额度',
        en: 'Check your eligibility and allocation' },
      { zh: '确认领取并等待到账', en: 'Confirm the claim and wait for it to arrive' },
      { zh: '不要等到 10-25 当天，提前领取',
        en: "Don't leave it to Oct 25 — claim early" }
    ],
    'airdrop-20261010-sonic': [
      { zh: '打开 Sonic 官方领取门户 my.soniclabs.com/airdrop（认准官方域名）',
        en: 'Open the official Sonic claim portal my.soniclabs.com/airdrop (verify the official domain)' },
      { zh: '连接有领取资格的钱包', en: 'Connect your eligible wallet' },
      { zh: '确认 Season 1 / Season 2 分配额度',
        en: 'Confirm your Season 1 / Season 2 allocation' },
      { zh: '完成链上领取（需少量 gas）',
        en: 'Complete the on-chain claim (small gas fee required)' },
      { zh: '10-15 截止，逾期视为放弃',
        en: 'Deadline Oct 15 — unclaimed allocations are forfeited' }
    ],
    'airdrop-20261010-htx': [
      { zh: '注册 HTX 并完成 KYC L3 认证',
        en: 'Register on HTX and complete KYC L3 verification' },
      { zh: '在活动页点击报名', en: 'Hit "Register now" on the campaign page' },
      { zh: 'C2C 完成 1 笔 ≥20 USDT 交易',
        en: 'Complete one C2C trade of at least 20 USDT' },
      { zh: '闪兑完成 1 笔 ≥20 USDT 交易，领取 1 USDT',
        en: 'Complete one Convert trade of at least 20 USDT to earn 1 USDT' },
      { zh: '按需冲更高交易档位，瓜分奖池',
        en: 'Optionally push higher volume tiers for a bigger pool share' }
    ],
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

/* 币VS · TokVS v2 空投列表渲染 + 撸毛进度追踪
   数据来自 js/airdrops-data.js 的 window.TOKVS_AIRDROPS（改数据不动本文件）。
   进度存 localStorage `tokvs_farming`（格式 {airdropId: [已完成步骤下标]}，与旧站兼容）。
   语言按 <html lang> 自动切换。数据缺失/异常时显示兜底文案，不影响页面其余部分。 */
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
  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; }
    catch (e) { return {}; }
  }
  function save(d) {
    try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {}
  }

  var AVA_COLORS = ['#6D4BD8', '#0E9F6E', '#3861FB', '#D97008', '#B4232A', '#4B3FBF'];

  function cardHtml(item, idx) {
    var name = isEn ? item.name_en : item.name_zh;
    var desc = isEn ? item.desc_en : item.desc_zh;
    var letter = (String(item.name_en || item.name_zh || '?').trim().charAt(0) || '?').toUpperCase();
    var tags = (item.tags || []).map(function (t) {
      return '<span class="tag">' + esc(isEn ? t.en : t.zh) + '</span>';
    }).join('');
    var dl = item.deadline
      ? '<span class="airp-dl num">' + esc(T('截止 ', 'Ends ') + item.deadline) + '</span>'
      : '<span class="airp-dl">' + esc(T('暂无截止', 'Open-ended')) + '</span>';
    var src = item.link
      ? '<a class="airp-src" href="' + esc(item.link) + '" target="_blank" rel="noopener">' +
        esc(T('来源 / 官方入口 →', 'Source / official →')) + '</a>'
      : '';
    return '<article class="card airp-card" data-airdrop-id="' + esc(item.id) + '">' +
      '<div class="airp-top">' +
        '<div class="airp-ava" style="background:' + AVA_COLORS[idx % AVA_COLORS.length] + '">' + esc(letter) + '</div>' +
        '<div class="airp-head"><h3>' + esc(name) + '</h3><div class="airp-tags">' + tags + '</div></div>' +
      '</div>' +
      '<p class="airp-desc">' + esc(desc) + '</p>' +
      '<div class="airp-meta">' + dl + src + '</div>' +
      '<div class="farm-zone"></div>' +
    '</article>';
  }

  function initFarm(card, item) {
    var steps = (isEn ? item.checklist_en : item.checklist_zh) || [];
    if (!steps.length) return;
    var id = item.id;
    var total = steps.length;
    var state = load();
    var done = Array.isArray(state[id]) ? state[id] : [];

    var zone = card.querySelector('.farm-zone');
    if (!zone) return;
    zone.innerHTML =
      '<div class="farm-head">' +
        '<button type="button" class="farm-toggle">' + esc(T('开始撸毛', 'Start farming')) + '</button>' +
        '<div class="farm-progress" aria-hidden="true"><i></i></div>' +
        '<span class="farm-count num"></span>' +
        '<span class="tag farm-done-tag" style="display:none">' + esc(T('已完成', 'Done')) + '</span>' +
        '<button type="button" class="farm-reset">' + esc(T('重置进度', 'Reset')) + '</button>' +
      '</div>' +
      '<ul class="farm-steps" style="display:none"></ul>';

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
      span.textContent = s;
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
        boxes[i].parentNode.parentNode.classList.remove('done');
      }
      paint([]);
    });
  }

  function init() {
    var wrap = document.getElementById('airdrop-list');
    if (!wrap) return;
    var data = window.TOKVS_AIRDROPS;
    if (!Array.isArray(data) || !data.length) {
      wrap.innerHTML = '<div class="card"><div class="load-fail">' +
        esc(T('空投数据加载失败，请稍后刷新重试', 'Airdrop data unavailable, please refresh and retry later')) +
        '</div></div>';
      return;
    }
    wrap.innerHTML = data.map(cardHtml).join('');
    var cards = wrap.querySelectorAll('.airp-card');
    for (var i = 0; i < cards.length; i++) {
      try { initFarm(cards[i], data[i]); } catch (e) {}
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    try { init(); } catch (e) {}
  });
})();

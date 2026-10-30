/* TokVS widgets: fiat-to-USDT calculator, first-buy checklist, wallet picker.
   Vanilla JS, no dependencies, no network requests, no document.write.
   Each widget only initialises when its container exists on the page,
   so including this file site-wide is safe. */

(function () {
  'use strict';

  function $(id) { return document.getElementById(id); }

  function fmt(n) {
    return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  /* Pure calculator math, kept separate so it can be unit tested in Node.
     Returns null for invalid input, else { gross, fee, net } in USDT. */
  function calcUsdt(amount, price, feeRate) {
    if (isNaN(amount) || isNaN(price) || isNaN(feeRate)) return null;
    if (amount <= 0 || price <= 0 || feeRate < 0) return null;
    var gross = amount / price;
    var fee = gross * feeRate;
    return { gross: gross, fee: fee, net: gross - fee };
  }

  /* Widget 1: fiat-to-USDT calculator. Container: #tokvs-usdt-calc. */
  function initUsdtCalc() {
    var root = $('tokvs-usdt-calc');
    if (!root) return;
    var amountEl = $('tokvs-calc-amount');
    var priceEl = $('tokvs-calc-price');
    var exEl = $('tokvs-calc-exchange');
    var btn = $('tokvs-calc-btn');
    var out = $('tokvs-calc-result');
    if (!amountEl || !priceEl || !exEl || !btn || !out) return;
    btn.addEventListener('click', function () {
      var amount = parseFloat(amountEl.value);
      var price = parseFloat(priceEl.value);
      var feeRate = parseFloat(exEl.value);
      var r = calcUsdt(amount, price, feeRate);
      if (!r) {
        out.textContent = 'Enter an amount above 0 and a price above 0, then calculate.';
        return;
      }
      out.textContent = 'Estimated USDT received: ' + fmt(r.net) +
        ' USDT (trading fee about ' + fmt(r.fee) +
        ' USDT at the base taker rate).';
    });
  }

  /* Widget 2: checkable first-buy checklist. Container: #tokvs-first-buy-checklist.
     Progress is stored in localStorage only, never sent anywhere. */
  function initChecklist() {
    var root = $('tokvs-first-buy-checklist');
    if (!root) return;
    var boxes = root.querySelectorAll('input[type="checkbox"][data-idx]');
    var counter = $('tokvs-checklist-count');
    var resetBtn = $('tokvs-checklist-reset');
    if (!boxes.length || !counter) return;
    var KEY = 'tokvs-first-buy-checklist-v1';

    function updateCount() {
      var done = 0;
      for (var i = 0; i < boxes.length; i++) {
        if (boxes[i].checked) done += 1;
      }
      counter.textContent = done + ' of ' + boxes.length + ' done';
    }

    function save() {
      try {
        var checked = [];
        for (var i = 0; i < boxes.length; i++) {
          if (boxes[i].checked) checked.push(boxes[i].getAttribute('data-idx'));
        }
        localStorage.setItem(KEY, JSON.stringify(checked));
      } catch (e) { /* private mode: progress is simply not saved */ }
    }

    try {
      var saved = JSON.parse(localStorage.getItem(KEY) || '[]');
      for (var j = 0; j < boxes.length; j++) {
        if (saved.indexOf(boxes[j].getAttribute('data-idx')) !== -1) {
          boxes[j].checked = true;
        }
      }
    } catch (e) { /* corrupt or missing stored data: start unchecked */ }

    for (var k = 0; k < boxes.length; k++) {
      boxes[k].addEventListener('change', function () { updateCount(); save(); });
    }
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        for (var m = 0; m < boxes.length; m++) { boxes[m].checked = false; }
        try { localStorage.removeItem(KEY); } catch (e) {}
        updateCount();
      });
    }
    updateCount();
  }

  /* Widget 3: wallet picker. Container: #tokvs-wallet-picker.
     Answers come from buttons with data-q (question) and data-v (value).
     Recommendation names wallet TYPES first; brands are examples only. */
  function initWalletPicker() {
    var root = $('tokvs-wallet-picker');
    if (!root) return;
    var result = $('tokvs-picker-result');
    var hint = $('tokvs-picker-hint');
    if (!result) return;

    var answers = { amount: null, freq: null, seed: null };

    var RECS = {
      hardware: {
        title: 'Hardware wallet',
        reasons: [
          'You hold an amount you would hate to lose, and you rarely trade, so keeping keys offline fits how you actually use crypto.',
          'The extra steps to sign a transaction are a feature here, not a drawback, because they block remote theft.',
          'You are comfortable managing a seed phrase, which is what a hardware wallet requires.'
        ],
        examples: 'Examples, not endorsements: Ledger, Trezor.'
      },
      hot: {
        title: 'Reputable hot wallet',
        reasons: [
          'Your amount is small and you trade often, so a phone or browser wallet keeps trading fast and simple.',
          'You are comfortable with seed phrases, so you can back the wallet up properly.',
          'Move funds to colder storage later if the amount grows.'
        ],
        examples: 'Examples, not endorsements: MetaMask, Trust Wallet.'
      },
      exchange: {
        title: 'Exchange custody for now, then learn self-custody',
        reasons: [
          'You are not comfortable with seed phrases yet, and losing a phrase means losing the wallet, so do not rush into self-custody.',
          'Keep only a small amount on the exchange while you learn, and treat learning self-custody as the next step.'
        ],
        examples: '',
        warning: 'Warning: exchange custody carries platform risk. If the platform fails or freezes accounts, your funds are at risk.'
      },
      split: {
        title: 'Hot wallet for trading, hardware wallet for savings',
        reasons: [
          'You trade daily, so a hot wallet is the practical tool for trading.',
          'You also hold a serious amount, so move what you are not actively trading to a hardware wallet.',
          'This split keeps trading convenient without leaving everything online.'
        ],
        examples: 'Examples, not endorsements: MetaMask or Trust Wallet for trading, Ledger or Trezor for savings.'
      }
    };

    function render(rec) {
      while (result.firstChild) { result.removeChild(result.firstChild); }
      var h = document.createElement('p');
      var b = document.createElement('strong');
      b.textContent = 'Recommendation: ' + rec.title;
      h.appendChild(b);
      result.appendChild(h);
      var ul = document.createElement('ul');
      for (var i = 0; i < rec.reasons.length; i++) {
        var li = document.createElement('li');
        li.textContent = rec.reasons[i];
        ul.appendChild(li);
      }
      result.appendChild(ul);
      if (rec.examples) {
        var ex = document.createElement('p');
        ex.textContent = rec.examples;
        result.appendChild(ex);
      }
      if (rec.warning) {
        var w = document.createElement('p');
        w.textContent = rec.warning;
        result.appendChild(w);
      }
    }

    function pick() {
      if (!answers.amount || !answers.freq || !answers.seed) {
        if (hint) hint.textContent = 'Answer all 3 questions to see a recommendation.';
        while (result.firstChild) { result.removeChild(result.firstChild); }
        return;
      }
      if (hint) hint.textContent = '';
      var rec;
      if (answers.seed === 'nervous') {
        rec = RECS.exchange;
      } else if (answers.amount === 'serious' && answers.freq === 'rarely') {
        rec = RECS.hardware;
      } else if (answers.amount === 'small' && answers.freq === 'daily') {
        rec = RECS.hot;
      } else if (answers.amount === 'serious' && answers.freq === 'daily') {
        rec = RECS.split;
      } else {
        rec = RECS.hot;
      }
      render(rec);
    }

    var btns = root.querySelectorAll('[data-q]');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('click', function () {
        var q = this.getAttribute('data-q');
        var v = this.getAttribute('data-v');
        answers[q] = v;
        var group = root.querySelectorAll('[data-q="' + q + '"]');
        for (var j = 0; j < group.length; j++) {
          var on = group[j] === this;
          group[j].classList.toggle('tokvs-picked', on);
          group[j].setAttribute('aria-pressed', on ? 'true' : 'false');
        }
        pick();
      });
    }
    pick();
  }

  function init() {
    initUsdtCalc();
    initChecklist();
    initWalletPicker();
  }

  /* Export the pure math for Node testing; harmless in the browser. */
  if (typeof module !== 'undefined' && module.exports) {
    module.exports.calcUsdt = calcUsdt;
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }
})();

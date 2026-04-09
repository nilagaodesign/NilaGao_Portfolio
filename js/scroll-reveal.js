(function () {
  'use strict';

  function collectTargets() {
    var seen = new Set();
    var list = [];
    function add(node) {
      if (!node || seen.has(node)) return;
      seen.add(node);
      list.push(node);
    }

    var main = document.querySelector('main');
    if (main) {
      main.querySelectorAll('section').forEach(add);
    }

    document.querySelectorAll('body > section').forEach(add);
    return list;
  }

  function init() {
    var nodes = collectTargets();
    nodes.forEach(function (el) {
      el.classList.add('reveal-on-scroll');
    });
    if (!nodes.length) return;

    if (!('IntersectionObserver' in window)) {
      nodes.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var obs = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        });
      },
      { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.06 }
    );

    nodes.forEach(function (el) {
      obs.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var debounce = function (action) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        action.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.debounce = {
    set: debounce,
  };
})();

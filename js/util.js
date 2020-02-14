'use strict';

(function () {
  var KEY_ESCAPE = 'Escape';
  var KEY_ENTER = 'Enter';

  var isEscEvent = function (evt, action) {
    if (evt.key === KEY_ESCAPE) {
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.key === KEY_ENTER) {
      action();
    }
  };

  window.util = {
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent,
  };
})();

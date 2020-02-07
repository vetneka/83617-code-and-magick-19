'use strict';

(function () {
  var setup = document.querySelector('.setup');

  var setupSimilar = document.querySelector('.setup-similar');
  setupSimilar.classList.remove('hidden');

  var dialogHandler = setup.querySelector('.upload');

  var setupOpen = document.querySelector('.setup-open');
  var setupClose = setup.querySelector('.setup-close');
  var setupUserName = setup.querySelector('.setup-user-name');

  var onKeydownEscSetup = function (evt) {
    window.util.isEscEvent(evt, closeSetup);
  };

  /**
   * @description
   *  Open setup window and add event listener for key "Escape"
   * @return {void}
   */
  var openSetup = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onKeydownEscSetup);
  };

  /**
   * @description
   *  Close setup window and remove event listener for key "Escape"
   * @return {void}
   */
  var closeSetup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onKeydownEscSetup);

  };

  setupOpen.addEventListener('click', function () {
    openSetup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, openSetup);
  });

  setupClose.addEventListener('click', function () {
    closeSetup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, closeSetup);
  });

  setupUserName.addEventListener('focus', function () {
    document.removeEventListener('keydown', onKeydownEscSetup);
  });

  setupUserName.addEventListener('blur', function () {
    document.addEventListener('keydown', onKeydownEscSetup);
  });
})();

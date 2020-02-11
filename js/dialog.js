'use strict';

(function () {
  var SETUP_START_X = 50 + '%';
  var SETUP_START_Y = 80 + 'px';
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
    setup.style.left = SETUP_START_X;
    setup.style.top = SETUP_START_Y;
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

  dialogHandler.addEventListener('mousedown', function (evt) {
    var startX = evt.clientX;
    var startY = evt.clientY;

    var isDraggable = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      isDraggable = true;

      var shiftX = moveEvt.clientX - startX;
      var shiftY = moveEvt.clientY - startY;

      startX = moveEvt.clientX;
      startY = moveEvt.clientY;

      setup.style.top = (setup.offsetTop + shiftY) + 'px';
      setup.style.left = (setup.offsetLeft + shiftX) + 'px';

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (isDraggable) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandler.removeEventListener('click', onClickPreventDefault);
        };

        dialogHandler.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

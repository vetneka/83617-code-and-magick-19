'use strict';

(function () {
  var ONLINE_MESSAGE = 'Подключение к интернету восстановлено :)';
  var OFFLINE_MESSAGE = 'Подключение к интернету потеряно :(';

  var FORM_SUCCESS_MESSAGE = 'Форма успешно отправлена!';
  var FORM_ERROR_MESSAGE = 'Ошибка отправки формы!';

  var successTemplate = document.querySelector('#success').content;
  var successWindow = successTemplate.querySelector('.success');

  var errorTemplate = document.querySelector('#error').content;
  var errorWindow = errorTemplate.querySelector('.error');

  /**
   * @description
   *  Create a message to the page the connection was restored
   *
   * @return {object} - node to add to the page
   */
  var createSuccessLine = function () {
    var successLine = document.createElement('div');
    successLine.classList.add('success-line');
    successLine.textContent = ONLINE_MESSAGE;

    return successLine;
  };

  /**
   * @description
   *  Create error message to the page
   *
   * @param {string} message - error message
   *
   * @return {object} - node to add to the page
   */
  var createErrorLine = function (message) {
    var errorMessage = message || OFFLINE_MESSAGE;
    var errorLine = document.createElement('div');
    errorLine.classList.add('error-line');
    errorLine.textContent = errorMessage;

    return errorLine;
  };

  /**
   * @description
   *  Create a modal success window (if the form is submitted successfully)
   *
   * @return {object} - node to add to the page
   */
  var createModalSuccess = function () {
    var successNode = successWindow.cloneNode(true);
    var successNodeMessage = successNode.querySelector('.success__message');
    successNodeMessage.textContent = FORM_SUCCESS_MESSAGE;

    return successNode;
  };

  /**
   * @description
   *  Create a modal error window (if the form is submitted failed)
   * @param {obgect} node - element on the page to manipulate (e.g., hide an element when clicked)
   *
   * @return {object} - node to add to the page
   */
  var createModalError = function (node) {
    var errorNode = errorWindow.cloneNode(true);
    var errorNodeMessage = errorNode.querySelector('.error__message');
    var errorNodeButton = errorNode.querySelector('.error__button');

    errorNodeMessage.textContent = FORM_ERROR_MESSAGE;

    errorNodeButton.addEventListener('click', function () {
      node.classList.remove('hidden');
      errorNode.remove();
    });

    var onKeydownEsc = function (evt) {
      window.util.isEscEvent(evt, function () {
        errorNode.remove();
        document.removeEventListener('keydown', onKeydownEsc);
      });
    };

    document.addEventListener('keydown', onKeydownEsc);

    return errorNode;
  };

  window.modal = {
    createSuccessForm: createModalSuccess,
    createErrorForm: createModalError,

    createSuccessLine: createSuccessLine,
    createErrorLine: createErrorLine,
  };
})();

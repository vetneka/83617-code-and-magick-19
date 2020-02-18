'use strict';

(function () {
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
    successLine.textContent = 'Подключение к интернету восстановлено :)';

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
    var errorMessage = message || 'Подключение к интернету потеряно :(';
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
    successNodeMessage.textContent = 'Форма успешно отправлена!';

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

    errorNodeMessage.textContent = 'Ошибка отправки формы!';

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

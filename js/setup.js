'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupSimilarList = document.querySelector('.setup-similar-list');

  var setupWizardForm = document.querySelector('.setup-wizard-form');

  var successLine = window.modal.createSuccessLine();
  var errorLine = window.modal.createErrorLine();

  /**
   * @description
   *  Handler for add an error message to the page
   *
   * @param {string} message - error message
   *
   * @return {void}
   */
  var onLoadWizardsError = function (message) {
    errorLine = window.modal.createErrorLine(message);
    document.body.insertAdjacentElement('afterbegin', errorLine);
  };

  window.addEventListener('online', function () {
    document.body.insertAdjacentElement('afterbegin', successLine);
    errorLine.remove();

    setTimeout(function () {
      successLine.remove();
    }, 2000);
  });

  window.addEventListener('offline', function () {
    document.body.insertAdjacentElement('afterbegin', errorLine);
    successLine.remove();
  });

  /**
   * @description
   *  Handler for adding data from the server to the page
   *
   * @param {object} data - data from the server
   *
   * @return {void}
   */
  var onLoadWizardsSuccess = function (data) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < 4; i++) {
      var currentFragmentChild = window.wizards.render(data[i]);
      fragment.appendChild(currentFragmentChild);
    }

    setupSimilarList.appendChild(fragment);
  };

  /**
   * @description
   *  Add a modal success window when the form is submitted successfully
   *
   *@return {void}
   */
  var onSubmitFormSuccess = function () {
    setup.classList.add('hidden');

    var successNode = window.modal.createSuccessForm();

    document.body.insertAdjacentElement('afterbegin', successNode);

    window.setTimeout(function () {
      successNode.remove();
    }, 2000);
  };

  /**
   * @description
   *  Add a modal error window for failed form submission
   *
   *@return {void}
   */
  var onSubmitFormError = function () {
    setup.classList.add('hidden');

    var errorNode = window.modal.createErrorForm(setup);

    document.body.insertAdjacentElement('afterbegin', errorNode);
  };

  setupWizardForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var formData = new FormData(setupWizardForm);
    window.backend.save(formData, onSubmitFormSuccess, onSubmitFormError);
  });

  window.backend.load(onLoadWizardsSuccess, onLoadWizardsError);
})();

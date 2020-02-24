'use strict';

(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var setupSimilarItem = similarWizardTemplate.querySelector('.setup-similar-item');
  var setupSimilarList = document.querySelector('.setup-similar-list');

  /**
   * @description
   *  Create wizard HTML-markup
   *
   * @param {object} wizard - wizard for create HTML-markup
   * @return {object} - wizard HTML-markup
   */
  var createSimilarWizard = function (wizard) {
    var elementWizard = setupSimilarItem.cloneNode(true);
    var setupSimilarLabel = elementWizard.querySelector('.setup-similar-label');
    setupSimilarLabel.textContent = wizard.name;

    elementWizard.querySelector('.wizard-coat').setAttribute('fill', wizard.colorCoat);
    elementWizard.querySelector('.wizard-eyes').setAttribute('fill', wizard.colorEyes);

    return elementWizard;
  };

  /**
   * @description
   *  Render similar wizards on page
   *
   * @param {array} data - data for render
   *
   * @return {void}
   */
  var renderSimilarWizard = function (data) {
    var takeNumber = data.length > 4 ? 4 : data.length;

    var fragment = document.createDocumentFragment();

    for (var i = 0; i < takeNumber; i++) {
      var currentFragmentChild = createSimilarWizard(data[i]);
      fragment.appendChild(currentFragmentChild);
    }

    setupSimilarList.innerHTML = '';
    setupSimilarList.appendChild(fragment);
  };

  window.wizards = {
    render: renderSimilarWizard,
  };
})();

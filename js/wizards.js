'use strict';

(function () {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var setupSimilarItem = similarWizardTemplate.querySelector('.setup-similar-item');

  /**
   * @description
   *  Create wizard HTML-markup
   *
   * @param {object} wizard - wizard for create HTML-markup
   * @return {object} - wizard HTML-markup
   */
  var renderSimilarWizard = function (wizard) {
    var elementWizard = setupSimilarItem.cloneNode(true);
    var setupSimilarLabel = elementWizard.querySelector('.setup-similar-label');
    setupSimilarLabel.textContent = wizard.name;

    elementWizard.querySelector('.wizard-coat').setAttribute('fill', wizard.colorCoat);
    elementWizard.querySelector('.wizard-eyes').setAttribute('fill', wizard.colorEyes);

    return elementWizard;
  };

  window.wizards = {
    render: renderSimilarWizard,
  };
})();

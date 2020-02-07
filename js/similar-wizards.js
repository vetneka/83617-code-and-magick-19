'use strict';

(function () {
  var setupSimilarList = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var setupSimilarItem = similarWizardTemplate.querySelector('.setup-similar-item');

  /**
   * @description
   *  Create similar wizard
   *
   * @return {object} - similar wizard
   */
  var createSimilarWizard = function () {
    var similarWizard = {};

    similarWizard.name = window.random.getArrayValue(window.wizardProperty.name);
    similarWizard.surname = window.random.getArrayValue(window.wizardProperty.surname);
    similarWizard.coatColor = window.random.getArrayValue(window.wizardProperty.coatColor);
    similarWizard.eyesColor = window.random.getArrayValue(window.wizardProperty.eyesColor);

    return similarWizard;
  };

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
    setupSimilarLabel.textContent = wizard.name + ' ' + wizard.surname;

    elementWizard.querySelector('.wizard-coat').setAttribute('fill', wizard.coatColor);
    elementWizard.querySelector('.wizard-eyes').setAttribute('fill', wizard.eyesColor);

    return elementWizard;
  };

  /**
 * @description
 *  Create fragment containing HTML-markup for n-th wizards
 *
 * @param {number} [number=4] - numbers of wizards
 * @return {object} - fragment containing HTML-markup
 */
  var renderSimilarWizards = function (number) {
    var numberOfWizards = number || 4;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < numberOfWizards; i++) {
      var currentWizard = createSimilarWizard();
      var currentFragmentChild = renderSimilarWizard(currentWizard);
      fragment.appendChild(currentFragmentChild);
    }

    return fragment;
  };

  var similarWizards = renderSimilarWizards();

  setupSimilarList.appendChild(similarWizards);
})();

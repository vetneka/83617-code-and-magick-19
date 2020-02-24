'use strict';

(function () {
  var wizardCoatColor;
  var wizardEyesColor;
  var similarWizards = [];

  /**
  * @description
  *  Compare two names
  *
  * @param {string} firstName - first name for compare
  * @param {string} secondName - second name for compare
  *
  * @return {number} - number -1 / 0 / 1
  */
  var compareNames = function (firstName, secondName) {
    if (firstName > secondName) {
      return 1;
    } else if (firstName < secondName) {
      return -1;
    }

    return 0;
  };

  /**
  * @description
  *  Assigns points for compliance with the parameters
  *
  * @param {object} wizard - object for evaluation
  *
  * @return {number} - number of points
  */
  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === wizardCoatColor) {
      rank += 2;
    }

    if (wizard.colorEyes === wizardEyesColor) {
      rank += 1;
    }

    return rank;
  };

  /**
  * @description
  *  Sorts the array based on the rank
  *
  * @return {void}
  */
  var updateWizards = function () {
    var filteredWizards = similarWizards.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);

      if (rankDiff === 0) {
        rankDiff = compareNames(left.name, right.name);
      }

      return rankDiff;
    });

    window.wizards.render(filteredWizards);
  };

  /**
  * @description
  *  Handler for adding data from the server to the page
  *
  * @param {object} data - data from the server
  *
  * @return {void}
  */
  var onLoadWizardsSuccess = function (data) {
    similarWizards = data;
    updateWizards();
  };

  /**
  * @description
  *  Handler for add an error message to the page
  *
  * @param {string} message - error message
  *
  * @return {void}
  */
  var onLoadWizardsError = function (message) {
    var errorLine = window.modal.createErrorLine(message);
    document.body.insertAdjacentElement('afterbegin', errorLine);
  };

  window.wizard.onCoatChange = function (color) {
    wizardCoatColor = color;
    updateWizards();
  };

  window.wizard.onEyesChange = function (color) {
    wizardEyesColor = color;
    updateWizards();
  };

  window.backend.load(onLoadWizardsSuccess, onLoadWizardsError);
})();

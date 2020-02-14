'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupWizard = setup.querySelector('.setup-player');

  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireballWrap = setupWizard.querySelector('.setup-fireball-wrap');

  var hiddenInputFields = setupWizard.querySelectorAll('input[type="hidden"]');

  wizardCoat.addEventListener('click', function () {
    var coatColor = window.random.getArrayValue(window.wizardProperty.coatColor);
    wizardCoat.style.fill = coatColor;

    for (var i = 0; i < hiddenInputFields.length; i++) {
      if (hiddenInputFields[i].name === 'coat-color') {
        hiddenInputFields[i].value = coatColor;
      }
    }
  });

  wizardEyes.addEventListener('click', function () {
    var eyesColor = window.random.getArrayValue(window.wizardProperty.eyesColor);
    wizardEyes.style.fill = eyesColor;

    for (var i = 0; i < hiddenInputFields.length; i++) {
      if (hiddenInputFields[i].name === 'eyes-color') {
        hiddenInputFields[i].value = eyesColor;
      }
    }
  });

  setupFireballWrap.addEventListener('click', function () {
    var fireballColor = window.random.getArrayValue(window.wizardProperty.fireballColor);
    setupFireballWrap.style.backgroundColor = fireballColor;

    for (var i = 0; i < hiddenInputFields.length; i++) {
      if (hiddenInputFields[i].name === 'fireball-color') {
        hiddenInputFields[i].value = fireballColor;
      }
    }
  });
})();

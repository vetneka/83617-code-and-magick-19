'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupWizard = setup.querySelector('.setup-player');

  var wizardCoat = setupWizard.querySelector('.wizard-coat');
  var wizardEyes = setupWizard.querySelector('.wizard-eyes');
  var setupFireballWrap = setupWizard.querySelector('.setup-fireball-wrap');

  var hiddenInputFields = setupWizard.querySelectorAll('input[type="hidden"]');

  var wizard = {
    onCoatChange: function () {},
    onEyesChange: function () {},
  };

  wizardCoat.addEventListener('click', function () {
    var newColor = window.random.getArrayValue(window.wizardProperty.coatColor);
    wizardCoat.style.fill = newColor;

    for (var i = 0; i < hiddenInputFields.length; i++) {
      if (hiddenInputFields[i].name === 'coat-color') {
        hiddenInputFields[i].value = newColor;
      }
    }

    wizard.onCoatChange(newColor);
  });

  wizardEyes.addEventListener('click', function () {
    var newColor = window.random.getArrayValue(window.wizardProperty.eyesColor);
    wizardEyes.style.fill = newColor;

    for (var i = 0; i < hiddenInputFields.length; i++) {
      if (hiddenInputFields[i].name === 'eyes-color') {
        hiddenInputFields[i].value = newColor;
      }
    }

    wizard.onEyesChange(newColor);
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

  window.wizard = wizard;
})();

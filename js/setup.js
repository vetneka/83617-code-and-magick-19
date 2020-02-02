'use strict';

var KEY_ESCAPE = 'Escape';
var KEY_ENTER = 'Enter';

var wizardNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var wizardSurnames = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var wizardCoatColors = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var wizardEyesColors = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var wizardSetup = document.querySelector('.setup');

var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');
var setupSimilarList = document.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
var setupSimilarItem = similarWizardTemplate.querySelector('.setup-similar-item');

var setupOpen = document.querySelector('.setup-open');
var setupClose = wizardSetup.querySelector('.setup-close');
var setupUserName = wizardSetup.querySelector('.setup-user-name');

/**
 * @description
 *  Getting random number in range from begin to end
 *
 * @param {number} [begin=0] - min number in selected range
 * @param {number} [end=10] - max number in selected range
 *
 * @return {number} random number
 */
var getRandomNumber = function (begin, end) {
  var startNumber = begin || 0;
  var endNumber = end || 10;

  var result;
  var counter = 1;
  var digit = 10;

  for (var i = 10; i <= endNumber; i *= 10) {
    counter++;
  }

  digit = Math.pow(digit, counter);

  result = Math.round(Math.random() * digit);

  while (result < startNumber || result > endNumber) {
    result = Math.round(Math.random() * digit);
  }

  return result;
};

/**
 * @description
 *  Get a random value from an array
 *
 * @param {array} array - an array from which to get a random value
 * @return {any}
 */
var getRandomArrayValue = function (array) {
  return array[getRandomNumber(0, array.length - 1)];
};

/**
 * @description
 *  Create similar wizard
 *
 * @return {object} - similar wizard
 */
var createSimilarWizard = function () {
  var similarWizard = {};

  similarWizard.name = getRandomArrayValue(wizardNames);
  similarWizard.surname = getRandomArrayValue(wizardSurnames);
  similarWizard.coatColor = getRandomArrayValue(wizardCoatColors);
  similarWizard.eyesColor = getRandomArrayValue(wizardEyesColors);

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


var onKeydownEscSetup = function (evt) {
  if (evt.key === KEY_ESCAPE) {
    closeSetup();
  }
};

var openSetup = function () {
  wizardSetup.classList.remove('hidden');
  document.addEventListener('keydown', onKeydownEscSetup);
};

var closeSetup = function () {
  wizardSetup.classList.add('hidden');
  document.removeEventListener('keydown', onKeydownEscSetup);
};

setupOpen.addEventListener('click', function () {
  openSetup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === KEY_ENTER) {
    openSetup();
  }
});

setupClose.addEventListener('click', function () {
  closeSetup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.key === KEY_ENTER) {
    closeSetup();
  }
});

setupUserName.addEventListener('focus', function () {
  document.removeEventListener('keydown', onKeydownEscSetup);
});

setupUserName.addEventListener('blur', function () {
  document.addEventListener('keydown', onKeydownEscSetup);
});

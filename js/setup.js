'use strict';

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
wizardSetup.classList.remove('hidden');

var setupSimilar = document.querySelector('.setup-similar');
setupSimilar.classList.remove('hidden');
var setupSimilarList = document.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector("#similar-wizard-template").content.querySelector(".setup-similar-item");

/**
 * @description
 *  Getting random number in range from 0 to range
 *
 * @param {number} [range=10] - max number in selected range
 * @param {number} [multiplier=10] - multiplier for scaling the result Math.random()
 *
 * @return {number} random number
 */
var getRandomNumber = function (range = 10, multiplier = 10) {
  return Math.floor(Math.random() * multiplier) % range;
}

/**
 * @description
 *  Getting a random value from an array
 *
 * @param {array} array - any array from which you want to get a random value
 * @return {any} - random value from the array
 */
var getRandomArrayValue = function (array) {
  /* // var №1
  var randomIndex = Math.floor(Math.random() * 10);
  var randomValue = array[randomIndex];

  if (randomValue === undefined) {
    randomValue = array[0];
  }

  return randomValue;
  */

  // var №2
  var randomValue;
  var randomIndex;
  var randomIndexArray = [];

  var roundedArrayLength;
  var numberBitCounter = 0;

  if (array.length < 10) {
    numberBitCounter = 1;
  }

  for (var i = 10; i <= array.length; i *= 10) {
    numberBitCounter++;
  }

  //roundedArrayLength = 10 ** numberBitCounter;
  roundedArrayLength = Math.pow(10, numberBitCounter);

  for (var i = 10; i <= roundedArrayLength; i *= 10) {
    randomIndex = getRandomNumber(array.length, i);
    randomIndexArray.push(randomIndex);
  }

  randomIndex = getRandomNumber(randomIndexArray.length, roundedArrayLength);
  randomValue = array[randomIndexArray[randomIndex]];

  return randomValue;
}

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
  var elementWizard = similarWizardTemplate.cloneNode(true);
  var setupSimilarLabel = elementWizard.querySelector('.setup-similar-label');
  setupSimilarLabel.textContent = wizard.name + ' ' + wizard.surname;
  //setupSimilarLabel.textContent = `${wizard.name} ${wizard.surname}`;

  elementWizard.querySelector('.wizard-coat').setAttribute('fill', wizard.coatColor);
  elementWizard.querySelector('.wizard-eyes').setAttribute('fill', wizard.eyesColor);

  return elementWizard;
};

/**
 * @description
 *  Create fragment containing HTML-markup for n-th wizards
 *
 * @param {number} [numberOfWizards=4] - numbers of wizards
 * @return {object} - fragment containing HTML-markup
 */
var renderSimilarWizards = function (numberOfWizards = 4) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < numberOfWizards; i++) {
    var currentWizard = createSimilarWizard();
    var currentFragmentChild = renderSimilarWizard(currentWizard);
    fragment.appendChild(currentFragmentChild);
  }

  return fragment;
};

setupSimilarList.appendChild(renderSimilarWizards());

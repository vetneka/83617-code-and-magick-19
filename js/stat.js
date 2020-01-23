'use strict';

var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_PADDING_TOP = 15;
var CLOUD_PADDING_LEFT = 25;
var CLOUD_PADDING_BOTTOM = 20;

var TITLE_MAX_WIDTH = 200;
var TITLE_LINE_HEIGHT = 20;

var HISTOGRAM_X = CLOUD_X + CLOUD_PADDING_LEFT;
var HISTOGRAM_Y = CLOUD_HEIGHT - CLOUD_PADDING_BOTTOM;

var BAR_Y = CLOUD_HEIGHT - (CLOUD_PADDING_BOTTOM * 1.5);
var BAR_MAX_HEIGHT = 140;
var BAR_MAX_WIDTH = 40;
var BAR_GAP = 50;
var BAR_COLOR_CURRENT_PLAYER = 'rgba(255, 0, 0, 1)';

var TEXT_COLOR = '#000';

/**
 * @description
 *  Render rectangle cloud on canvas
 *
 * @param {HTMLCanvasElement} ctx - context '2d'
 * @param {number} x - start x-coordinate of cloud
 * @param {number} y - start y-coordinate of cloud
 * @param {string} color - color of cloud
 */
var cloudRender = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

/**
 * @description
 *  Function for automatically wrap long text
 *
 * @param {HTMLCanvasElement} ctx - context '2d'
 * @param {string} text - Long (or any) text
 * @param {number} marginLeft - x-positioning of text in canvas
 * @param {number} marginTop - y-positioning of text in canvas
 * @param {number} maxWidth - max-width after which the text is wrap
 * @param {number} lineHeight - y-gap between lines
 */
var wrapText = function (ctx, text, marginLeft, marginTop, maxWidth, lineHeight) {
  var words = text.split(' ');
  var countWords = words.length;
  var line = '';

  for (var n = 0; n < countWords; n++) {
    var testLine = line + words[n] + ' ';
    var testWidth = ctx.measureText(testLine).width;

    if (testWidth > maxWidth) {
      ctx.fillText(line, marginLeft, marginTop);
      line = words[n] + ' ';
      marginTop += lineHeight;
    } else {
      line = testLine;
    }
  }

  ctx.fillText(line, marginLeft, marginTop);
};

/**
 * @description
 *  Render title on canvas
 *
 * @param {HTMLCanvasElement} ctx - context '2d'
 * @param {string} text - text for title
 * @param {string} font - font property for text, syntax CSS font
 * @param {string} color - text color
 */
var titleRender = function (ctx, text, font, color) {
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textBaseline = 'hanging';

  wrapText(ctx, text, CLOUD_X + CLOUD_PADDING_LEFT, CLOUD_Y + CLOUD_PADDING_TOP, TITLE_MAX_WIDTH, TITLE_LINE_HEIGHT);
};

/**
 * @description
 *   Get max number in array numbers
 *
 * @param {array} array - array numbers
 * @return {number} - max number in array
 */
var getMaxNumber = function (array) {
  var maxNumber = +array[0];

  for (var i = 1; i < array.length; i++) {
    if (+array[i] > maxNumber) {
      maxNumber = +array[i];
    }
  }

  return maxNumber;
};

/**
 * @description
 *   Function for painting histogram columns
 *
 * @param {HTMLCanvasElement} ctx - context '2d'
 * @param {number} height - histogram column height
 * @param {string} color - histogram column color
 * @param {number} gap - gap between columns
 */
var paintHistogramColumn = function (ctx, height, color, gap) {
  ctx.fillStyle = color;
  ctx.strokeStyle = color;

  ctx.beginPath();
  ctx.moveTo(HISTOGRAM_X + gap, BAR_Y);
  ctx.lineTo(HISTOGRAM_X + gap, BAR_Y - height);
  ctx.lineTo(HISTOGRAM_X + gap + BAR_MAX_WIDTH, BAR_Y - height);
  ctx.lineTo(HISTOGRAM_X + gap + BAR_MAX_WIDTH, BAR_Y);
  ctx.lineWidth = 1;
  ctx.closePath();
  ctx.stroke();
  ctx.fill();
};

/**
 * @description
 *   Render histogram on canvas
 *
 * @param {HTMLCanvasElement} ctx - context '2d'
 * @param {number} x - start x-coordinate render histogram
 * @param {number} y - start y-coordinate render histogram
 * @param {array} names - array players
 * @param {array} times - time of passing the level of the corresponding player from the "names" array
 */
var histogramRender = function (ctx, x, y, names, times) {
  var maxTime = getMaxNumber(times);

  for (var i = 0; i < names.length; i++) {
    var barHeight = BAR_MAX_HEIGHT * times[i] / maxTime;

    if (names[i] === 'Вы') {
      paintHistogramColumn(ctx, barHeight, BAR_COLOR_CURRENT_PLAYER, ((BAR_MAX_WIDTH + BAR_GAP) * i));
    } else {
      var barSaturation = Math.floor(Math.random() * 100);
      var barColor = 'hsl(240, ' + barSaturation + '%, 50%)';
      paintHistogramColumn(ctx, barHeight, barColor, ((BAR_MAX_WIDTH + BAR_GAP) * i));
    }

    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(names[i], (CLOUD_X + CLOUD_PADDING_LEFT) + ((BAR_MAX_WIDTH + BAR_GAP) * i), HISTOGRAM_Y);
    ctx.fillText(Math.round(times[i]), (CLOUD_X + CLOUD_PADDING_LEFT) + ((BAR_MAX_WIDTH + BAR_GAP) * i), HISTOGRAM_Y - barHeight - 35);
  }
};

/**
 * @description
 *  Render player statistics
 *
 * @param {HTMLCanvasElement} ctx - context '2d'
 * @param {array} names - array players
 * @param {array} times - time of passing the level of the corresponding player from the "names" array
 */
window.renderStatistics = function (ctx, names, times) {
  cloudRender(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7');
  cloudRender(ctx, CLOUD_X, CLOUD_Y, '#fff');

  titleRender(ctx, 'Ура вы победили! Список результатов:', '16px PT Mono', '#000');

  histogramRender(ctx, HISTOGRAM_X, HISTOGRAM_Y, names, times);
};


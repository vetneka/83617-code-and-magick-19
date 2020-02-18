'use strict';

(function () {
  var XHR_URL = 'https://js.dump.academy/code-and-magick/data';
  var XHR_URL_FORM = 'https://js.dump.academy/code-and-magick/';

  /**
   * @description
   *  Create XMLHTTPRequest for download data from server
   *
   * @param {function} onSuccess - callback for processing the success result
   * @param {function} onError - callback for processing the errors
   *
   * @return {void}
   */
  var loadData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', XHR_URL);

    xhr.addEventListener('load', function () {
      var data;

      try {
        data = JSON.parse(xhr.responseText);
      } catch (error) {
        onError('Cтатус ответа: ' + xhr.status + ' ' + error.message);
      }

      if (xhr.status === 200) {
        onSuccess(data);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.send();
  };

  /**
   * @description
   *  Uploading form data to the server
   *
   * @param {object} data - data to upload to the server
   * @param {function} onSuccess - callback for processing the success result
   * @param {function} onError - callback for processing the errors
   *
   * @return {void}
   */
  var uploadFormData = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', XHR_URL_FORM);

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 10000; // 10s

    xhr.send(data);
  };

  window.backend = {
    load: loadData,
    save: uploadFormData,
  };
})();

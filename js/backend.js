'use strict';

(function () {
  var XHR_URL = 'https://js.dump.academy/code-and-magick/data';
  var XHR_URL_FORM = 'https://js.dump.academy/code-and-magick/';

  var XHR_ERROR_MESSAGE = 'Произошла ошибка соединения';
  var XHR_TIMEOUT_MESSAGE = 'Запрос не успел выполниться за ';
  var XHR_TIMEOUT = 10000;

  var StatusCode = {
    OK: 200,
  };

  /**
   * @description
   *  Request error handler
   *
   * @param {object} xhr - request
   * @param {function} onError - callback for error handling
   *
   * @return {void}
   */
  var onСheckXhrError = function (xhr, onError) {
    xhr.addEventListener('error', function () {
      onError(XHR_ERROR_MESSAGE);
    });

    xhr.addEventListener('timeout', function () {
      onError(XHR_TIMEOUT_MESSAGE + xhr.timeout + 'мс');
    });

    xhr.timeout = XHR_TIMEOUT;
  };

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

      if (xhr.status === StatusCode.OK) {
        onSuccess(data);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    onСheckXhrError(xhr, onError);

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
      if (xhr.status === StatusCode.OK) {
        onSuccess();
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    onСheckXhrError(xhr, onError);

    xhr.send(data);
  };

  window.backend = {
    load: loadData,
    save: uploadFormData,
  };
})();

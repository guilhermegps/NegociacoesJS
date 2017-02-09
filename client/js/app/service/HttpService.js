'use strict';

System.register([], function (_export, _context) {
  "use strict";

  var _createClass, HttpService;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [],
    execute: function () {
      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      _export('HttpService', HttpService = function () {
        function HttpService() {
          _classCallCheck(this, HttpService);
        }

        _createClass(HttpService, [{
          key: '_handleErrors',
          value: function _handleErrors(res) {
            if (!res.ok) // O 'ok', se a resposta for obtida com status entre 200 e 299 ele retorna true
              throw Error(res.statusText); // Mensagem de erro de status

            return res; // A resposta possui métodos de conversão para json() e text()
          }
        }, {
          key: 'get',
          value: function get(url) {
            var _this = this;

            // Fetch API
            return fetch(url) // busca para esta url
            .then(function (res) {
              return _this._handleErrors(res);
            }) //Verifica se não houve erros
            .then(function (res) {
              return res.json();
            }); // Obtem uma resposta
          }
        }, {
          key: 'post',
          value: function post(url, dado) {
            var _this2 = this;

            return fetch(url, {
              headers: { 'Content-type': 'application/json' },
              method: 'post',
              body: JSON.stringify(dado)
            }).then(function (res) {
              return _this2._handleErrors(res);
            });
          }
        }]);

        return HttpService;
      }());

      _export('HttpService', HttpService);
    }
  };
});
//# sourceMappingURL=HttpService.js.map
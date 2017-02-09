'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NegociacaoDao = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Negociacao = require('../model/Negociacao');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoDao = exports.NegociacaoDao = function () {
  function NegociacaoDao(connection) {
    _classCallCheck(this, NegociacaoDao);

    this._connection = connection;
    this._store = 'negociacoes';
  }

  _createClass(NegociacaoDao, [{
    key: '_obtemConnectionStore',
    value: function _obtemConnectionStore() {
      return this._connection.transaction([this._store], 'readwrite') // connection.transaction(OBJECT STORES, TIPO DE OPERAÇÃO
      .objectStore(this._store); // Pego a Object Store Transacional
    }
  }, {
    key: 'adiciona',
    value: function adiciona(negociacao) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var request = _this._obtemConnectionStore().add(negociacao); // Requisição para gravar na store

        request.onsuccess = function (e) {
          resolve();
        };

        request.onerror = function (e) {
          console.log(e.target.result.error);
          reject('Não foi possível adicionar uma negociação');
        };
      });
    }
  }, {
    key: 'apagaTodos',
    value: function apagaTodos() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var request = _this2._obtemConnectionStore().clear();

        request.onsuccess = function (e) {
          return resolve('Negociações removidas com sucesso.');
        };

        request.onerror = function (e) {
          console.log(e.target.error);
          reject('Não foi possível apagar as negociações.');
        };
      });
    }
  }, {
    key: 'listaTodos',
    value: function listaTodos() {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        var cursor = _this3._obtemConnectionStore().openCursor(); // Ele que navega pela Object store

        var negociacoes = [];
        cursor.onsuccess = function (e) {
          var atual = e.target.result; // Ponteiro para a negociação atual sendo lida

          if (atual) {
            // Se houver dados sendo lidos
            var dado = atual.value; // Pegando o dado real do ponteiro
            negociacoes.push(new _Negociacao.Negociacao(dado._data, dado._quantidade, dado._valor));
            atual.continue(); // Manda ir para o proximo
          } else {
            resolve(negociacoes);
          }
        };

        cursor.onerror = function (e) {
          reject('Não foi possível listar as negociações');
        };
      });
    }
  }]);

  return NegociacaoDao;
}();
//# sourceMappingURL=NegociacaoDao.js.map
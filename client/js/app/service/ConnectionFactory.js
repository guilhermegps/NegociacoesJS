'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// Uma forma de encapsular a minha classe e tornar as variáveis globais em privadas
// Module Pattern
var ConnectionFactory = function () {
  var stores = ['negociacoes'];
  var version = 4;
  var dbName = 'aluraframe';

  var connection = null;
  var close = null;

  return function () {
    function ConnectionFactory() {
      _classCallCheck(this, ConnectionFactory);

      throw new Error('Não é possível criar instâncias de ConnectionFactory');
    }

    _createClass(ConnectionFactory, null, [{
      key: 'getConnection',
      value: function getConnection() {
        return new Promise(function (resolve, reject) {
          var openRequest = window.indexedDB.open(dbName, version);

          //triade de eventos
          openRequest.onupgradeneeded = function (e) {
            ConnectionFactory._createStores(e.target.result);
          };

          openRequest.onsuccess = function (e) {

            if (!connection) {
              connection = e.target.result;
              close = connection.close;
              connection.close = function () {
                // Monkey Patch
                throw new Error('Você não pode fechar diretamente a connection.');
              };
            }
            resolve(connection);
          };

          openRequest.onerror = function (e) {
            console.log(e.target.error);

            reject(e.target.error.name);
          };
        });
      }
    }, {
      key: '_createStores',
      value: function _createStores(connection) {
        stores.forEach(function (store) {
          if (connection.objectStoreNames.contains(store)) {
            connection.deleteObjectStore(store);
          }

          connection.createObjectStore(store, { autoIncrement: true });
        });
      }
    }, {
      key: 'closeConnection',
      value: function closeConnection() {
        if (connection) {
          connection.close = close;
          connection.close();
          connection = null;
          close = null;
        }
      }
    }]);

    return ConnectionFactory;
  }();
}(); // Uma função autoinvocada, que executa logo após ser carregada
//# sourceMappingURL=ConnectionFactory.js.map
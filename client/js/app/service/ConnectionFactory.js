// Uma forma de encapsular a minha classe e tornar as variáveis globais em privadas
// Module Pattern
var ConnectionFactory = (function(){
  const stores = ['negociacoes'];
  const version = 4;
  const dbName = 'aluraframe';

  var connection = null;
  var close = null;

  return class ConnectionFactory {
    constructor() {
      throw new Error('Não é possível criar instâncias de ConnectionFactory');
    }
    static getConnection() {
      return new Promise((resolve, reject) => {
        let openRequest = window.indexedDB.open(dbName, version);

        //triade de eventos
        openRequest.onupgradeneeded = e => {
          ConnectionFactory._createStores(e.target.result);
        };

        openRequest.onsuccess = e => {

          if(!connection){
            connection = e.target.result;
            close = connection.close;
            connection.close = function() {// Monkey Patch
              throw new Error('Você não pode fechar diretamente a connection.')
            };
          }
          resolve(connection);
        };

        openRequest.onerror = e => {
          console.log(e.target.error);

          reject(e.target.error.name);
        };
      });
    }

    static _createStores(connection){
      stores.forEach(store => {
        if(connection.objectStoreNames.contains(store)){
          connection.deleteObjectStore(store);
        }

        connection.createObjectStore(store, {autoIncrement: true});
      });
    }

    static closeConnection(){
      if(connection){
        connection.close = close;
        connection.close();
        connection = null;
        close = null;
      }
    }
  }
})(); // Uma função autoinvocada, que executa logo após ser carregada

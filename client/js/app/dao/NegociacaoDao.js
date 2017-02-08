class NegociacaoDao {
  constructor(connection) {
    this._connection = connection;
    this._store = 'negociacoes';
  }

  adiciona(negociacao){
    return new Promise((resolve, reject) => {
      // Pego uma transação
      let request = this._connection
        .transaction([this._store], 'readwrite') // connection.transaction(OBJECT STORES, TIPO DE OPERAÇÃO
        .objectStore(this._store) // Pego a Object Store Transacional
        .add(negociacao); // Requisição para gravar na store

      request.onsuccess = e => {
        resolve();
      };

      request.onerror = e => {
        console.log(e.target.result.error);
        reject('Não foi possível adicionar uma negociação');
      };
    });
  }
}

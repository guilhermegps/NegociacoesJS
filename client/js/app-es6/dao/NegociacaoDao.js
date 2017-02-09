import {Negociacao} from '../model/Negociacao';

export class NegociacaoDao {
  constructor(connection) {
    this._connection = connection;
    this._store = 'negociacoes';
  }

  _obtemConnectionStore(){
    return this._connection
      .transaction([this._store], 'readwrite') // connection.transaction(OBJECT STORES, TIPO DE OPERAÇÃO
      .objectStore(this._store) // Pego a Object Store Transacional
  }

  adiciona(negociacao){
    return new Promise((resolve, reject) => {
      let request = this._obtemConnectionStore().add(negociacao); // Requisição para gravar na store

      request.onsuccess = e => {
        resolve();
      };

      request.onerror = e => {
        console.log(e.target.result.error);
        reject('Não foi possível adicionar uma negociação');
      };
    });
  }

  apagaTodos() {
    return new Promise((resolve, reject) => {
      let request = this._obtemConnectionStore().clear();

        request.onsuccess = e => resolve('Negociações removidas com sucesso.');

        request.onerror = e => {
          console.log(e.target.error);
          reject('Não foi possível apagar as negociações.');
        };
    });
  }

  listaTodos(){
    return new Promise((resolve, reject) => {
      let cursor = this._obtemConnectionStore().openCursor();// Ele que navega pela Object store

      let negociacoes = [];
      cursor.onsuccess = e => {
        let atual = e.target.result; // Ponteiro para a negociação atual sendo lida

        if(atual){ // Se houver dados sendo lidos
          let dado = atual.value; // Pegando o dado real do ponteiro
          negociacoes.push(new Negociacao(dado._data, dado._quantidade, dado._valor));
          atual.continue(); // Manda ir para o proximo
        } else {
          resolve(negociacoes);
        }
      };

      cursor.onerror = e => {
        reject('Não foi possível listar as negociações');
      };
    });
  }
}

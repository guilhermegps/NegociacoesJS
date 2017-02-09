'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpService = function () {
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

    // get(url) {
    //   return new Promise((resolve, reject) => {
    //     let xhr = new XMLHttpRequest();
    //
    //     xhr.open('GET', url); // open('METODO', 'ENDEREÇO')
    //
    //     /*  Lista de estados do XHR:
    //         0: requisição ainda não iniciada
    //
    //         1: conexão com o servidor estabelecida
    //
    //         2: requisição recebida
    //
    //         3: processando requisição
    //
    //         4: requisição concluída e a resposta esta pronta
    //     */
    //     //Esta função será chamada toda vez que o estado do XHR mudar
    //     xhr.onreadystatechange = () => {
    //       if(xhr.readyState == 4 //4: requisição concluída e a resposta esta pronta
    //         && xhr.status == 200){ //200 Indica que a resposta está ok, sem erros
    //
    //           resolve( JSON.parse(xhr.responseText) );// Converte JSON em um objeto JS
    //           //.map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor)) );
    //
    //       } else if(xhr.readyState == 4 && xhr.status != 200){
    //         reject(xhr.responseText);
    //       }
    //     }
    //
    //     xhr.send();
    //   });
    // }

    // post(url, dado) {
    //   return new Promise((resolve, reject) => {
    //     let xhr = new XMLHttpRequest();
    //     xhr.open("POST", url, true);
    //     xhr.setRequestHeader("Content-type", "application/json");
    //     xhr.onreadystatechange = () => {
    //
    //         if (xhr.readyState == 4) {
    //
    //             if (xhr.status == 200) {
    //
    //                 resolve(JSON.parse(xhr.responseText));
    //             } else {
    //
    //                 reject(xhr.responseText);
    //             }
    //         }
    //     };
    //     xhr.send(JSON.stringify(dado)); // usando JSON.stringifly para converter objeto em uma string no formato JSON.
    //   });
    // }

  }]);

  return HttpService;
}();
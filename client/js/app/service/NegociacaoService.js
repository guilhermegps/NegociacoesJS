'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NegociacaoService = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _HttpService = require('./HttpService');

var _ConnectionFactory = require('./ConnectionFactory');

var _NegociacaoDao = require('../dao/NegociacaoDao');

var _NegociacaoHelper = require('../helper/NegociacaoHelper');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoService = exports.NegociacaoService = function () {
  function NegociacaoService() {
    _classCallCheck(this, NegociacaoService);

    this._httpService = new _HttpService.HttpService();
  }

  _createClass(NegociacaoService, [{
    key: 'obterNegociacoes',
    value: function obterNegociacoes(url, mensagemErro) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this._httpService.get(url).then(function (negociacoes) {
          resolve(negociacoes.map(function (dado) {
            return _NegociacaoHelper.NegociacaoHelper.converterObjetoEmNegociacao(dado);
          }));
        }).catch(function (erro) {
          console.log(erro);
          reject(mensagemErro);
        });
      });
    }
  }, {
    key: 'obterTodasNegociacoes',
    value: function obterTodasNegociacoes() {
      return Promise.all([// Resolve estas promesis nessa ordem
      this.obterNegociacoesDaSemana(), this.obterNegociacoesDaSemanaAnterior(), this.obterNegociacoesDaSemanaRetrasada()]).then(function (periodos) {

        var negociacoes = periodos.reduce(function (dados, periodo) {
          return dados.concat(periodo);
        }, []) // Vai retornar um array com todas as negociações concatenadas dentro
        .map(function (dado) {
          return _NegociacaoHelper.NegociacaoHelper.converterObjetoEmNegociacao(dado);
        });

        return negociacoes;
      }).catch(function (erro) {
        throw new Error(erro);
      });
    }
  }, {
    key: 'obterNegociacoesDaSemana',
    value: function obterNegociacoesDaSemana() {
      return this.obterNegociacoes('negociacoes/semana', 'Não foi possível obter as negociações da semana.');
    }
  }, {
    key: 'obterNegociacoesDaSemanaRetrasada',
    value: function obterNegociacoesDaSemanaRetrasada() {
      return this.obterNegociacoes('negociacoes/retrasada', 'Não foi possivel obter as negociações da semana retrasada');
    }
  }, {
    key: 'obterNegociacoesDaSemanaAnterior',
    value: function obterNegociacoesDaSemanaAnterior() {
      return this.obterNegociacoes('negociacoes/anterior', 'Não foi possivel obter as negociações da semana anterior');
    }
  }, {
    key: 'cadastra',
    value: function cadastra(negociacao) {
      return _ConnectionFactory.ConnectionFactory.getConnection().then(function (connection) {
        return new _NegociacaoDao.NegociacaoDao(connection);
      }).then(function (dao) {
        return dao.adiciona(negociacao);
      }).then(function () {
        return 'Negociacao adicionada com sucesso.';
      }).catch(function (erro) {
        console.log(erro);
        throw new Error('Não foi possível adicionar a negociacao.');
      });
    }
  }, {
    key: 'lista',
    value: function lista() {
      return _ConnectionFactory.ConnectionFactory.getConnection().then(function (connection) {
        return new _NegociacaoDao.NegociacaoDao(connection);
      }).then(function (dao) {
        return dao.listaTodos();
      }).catch(function (erro) {
        console.log(erro);
        throw new Error('Não foi possível obter as negociações.');
      });
    }
  }, {
    key: 'apaga',
    value: function apaga() {
      return _ConnectionFactory.ConnectionFactory.getConnection().then(function (connection) {
        return new _NegociacaoDao.NegociacaoDao(connection);
      }).then(function (dao) {
        return dao.apagaTodos();
      }).then(function () {
        return 'Negociações apagadas com sucesso.';
      }).catch(function (erro) {
        console.log(erro);
        throw new Error('Não foi possível apagar as negociações.');
      });
    }
  }, {
    key: 'importa',
    value: function importa(listaAtual) {
      return this.obterTodasNegociacoes().then(function (negociacoes) {
        return negociacoes.filter(function (negociacao) {
          return (// Filtra o array de negociações com base na condição retornada
            !listaAtual // Negação do resultado do some()
            .some( // some() percorre o array até a condição ser true, caso nunca seja ele retorna false
            // Realiza a comparação do JSON (string) dos objetos
            function (negociacaoExistente) {
              return JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente);
            })
          );
        });
      }).catch(function (erro) {
        console.log(erro);
        throw new Error('Não foi possível importar as negociações.');
      });
    }
  }]);

  return NegociacaoService;
}();
//# sourceMappingURL=NegociacaoService.js.map
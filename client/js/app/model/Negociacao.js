"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Negociacao = exports.Negociacao = function () {
  function Negociacao(data, quantidade, valor) {
    _classCallCheck(this, Negociacao);

    //É no construtor que eu declaro os atributos da classe Javascript
    this._data = new Date(data); // Pega a data atual
    this._quantidade = quantidade; // O _ antes do nome da váriavel é uma CONVENÇÃO para indicar que esta é uma variavel "privada" (já que não existe este conceito atualmente no Javascript)
    this._valor = valor;
    Object.freeze(this); // Congela o valor do objeto e não deixar ser alterada
  }

  _createClass(Negociacao, [{
    key: "obtemVolume",
    value: function obtemVolume() {
      //Método
      return this._quantidade * this._valor;
    }
  }, {
    key: "data",
    get: function get() {
      return new Date(this._data.getTime());
    }
  }, {
    key: "valor",
    get: function get() {
      return this._valor;
    }
  }, {
    key: "quantidade",
    get: function get() {
      return this._quantidade;
    }
  }]);

  return Negociacao;
}();
//# sourceMappingURL=Negociacao.js.map
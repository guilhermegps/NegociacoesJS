'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var NegociacaoHelper = function () {
  function NegociacaoHelper() {
    _classCallCheck(this, NegociacaoHelper);

    throw new Error('NegociacaoHelper não pode ser instânciada.');
  }

  _createClass(NegociacaoHelper, null, [{
    key: 'converterObjetoEmNegociacao',
    value: function converterObjetoEmNegociacao(objeto) {
      return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
    }
  }]);

  return NegociacaoHelper;
}();
//# sourceMappingURL=NegociacaoHelper.js.map
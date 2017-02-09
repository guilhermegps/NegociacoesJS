'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DateHelper = function () {
  function DateHelper() {
    _classCallCheck(this, DateHelper);

    throw new Error('DateHelper não pode ser instânciada.');
  }

  // Definindo os métodos como static, eu posso invocar eles direto do objeto, sem precisar instanciar ele. ECMAScript 6


  _createClass(DateHelper, null, [{
    key: 'textForDate',
    value: function textForDate(texto) {
      //new Date('ANO', 'MES', 'DIA')
      //let data = new Date(this._inputData.value.split('-'));

      if (!/\d{4}-\d{2}-\d{2}/.test(texto)) throw new Error('A data deve estar no formato YYYY-MM-DD');

      return new (Function.prototype.bind.apply(Date, [null].concat(_toConsumableArray( //Spread operator - o array é desmembrado e cada elemento dele é passado como um parâmetro do construtor
      texto.split('-').map(function (item, indice) {
        return item - indice % 2;
      })))))();
    }
  }, {
    key: 'dateForText',
    value: function dateForText(data) {
      return data.getDate() + '/' + (data.getMonth() + 1) + '/' + data.getFullYear(); // Template String
      // return data.getDate()
      //     + '/' + (data.getMonth()+1)
      //     + '/' + data.getFullYear();
    }
  }]);

  return DateHelper;
}();
//# sourceMappingURL=DateHelper.js.map
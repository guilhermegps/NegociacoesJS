'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewMaster = function () {
  function ViewMaster(elemento) {
    _classCallCheck(this, ViewMaster);

    this._elemento = elemento;
  }

  _createClass(ViewMaster, [{
    key: 'template',
    value: function template() {
      // Para sobreescrita
      throw new Error('O método template deve ser implementado');
    }
  }, {
    key: 'update',
    value: function update(model) {
      this._elemento.innerHTML = this.template(model);
    }
  }]);

  return ViewMaster;
}();
//# sourceMappingURL=ViewMaster.js.map
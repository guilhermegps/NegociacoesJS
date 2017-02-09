"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bind = function Bind(model, view) {
  _classCallCheck(this, Bind);

  for (var _len = arguments.length, props = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    props[_key - 2] = arguments[_key];
  }

  // Esses '...' são o rest operator determina que todos os parametros passados apartir dali serão armazenados em um erray
  //O Rest Operator tem que ser sempre o ultimo parâmetro 
  var proxy = ProxyFactory.create(model, props, function (model) {
    return view.update(model);
  });

  view.update(model);

  return proxy;
};
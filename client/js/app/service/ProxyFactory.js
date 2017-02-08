class ProxyFactory {
  static create(objeto, props, acao){
    return new Proxy(objeto, {
      get(target, prop, receiver){ //Métodos e funções sempre são entendidos como get
        if(props.includes(prop) && ProxyFactory._isFuncao(target[prop])){// includes verifica se existe no array
          return function(){
            // Arguments é um objeto implicito com os parametro passados para a função
            Reflect.apply(target[prop], target, arguments);
            return acao(target);
          }
        }

        return Reflect.get(target, prop, receiver);
      },

      set(target, prop, value, receiver){
        if(props.includes(prop)){
          target[prop] = value;
          acao(target);
        }
        return Reflect.set(target, prop, value, receiver);
      }
    });
  }

  static _isFuncao(func){
    return typeof(func) == typeof(Function);
  }
}

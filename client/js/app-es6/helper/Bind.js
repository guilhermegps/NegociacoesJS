import {ProxyFactory} from '../service/ProxyFactory';

export class Bind {
  constructor(model, view, ...props) { // Esses '...' são o rest operator determina que todos os parametros passados apartir dali serão armazenados em um erray
  //O Rest Operator tem que ser sempre o ultimo parâmetro
    let proxy = ProxyFactory.create(
      model,
      props,
      model => view.update(model));

    view.update(model);

    return proxy;
  }
}

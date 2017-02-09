import {Negociacao} from '../model/Negociacao';

export class NegociacaoHelper {
  constructor() {
    throw new Error('NegociacaoHelper não pode ser instânciada.');
  }

  static converterObjetoEmNegociacao(objeto){
    return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
  }
}

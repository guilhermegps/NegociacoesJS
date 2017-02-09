class Mensagem {
  constructor(texto='') { // Valor padrão para op parâmetro, para caso não tenha sido informado
    this._texto = texto;
  }

  get texto(){
    return this._texto;
  }

  set texto(texto){
    this._texto = texto;
  }
}

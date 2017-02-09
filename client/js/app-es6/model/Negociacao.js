export class Negociacao {
  constructor(data, quantidade, valor) { //É no construtor que eu declaro os atributos da classe Javascript
    this._data = new Date(data); // Pega a data atual
    this._quantidade = quantidade; // O _ antes do nome da váriavel é uma CONVENÇÃO para indicar que esta é uma variavel "privada" (já que não existe este conceito atualmente no Javascript)
    this._valor = valor;
    Object.freeze(this);// Congela o valor do objeto e não deixar ser alterada
  }

  obtemVolume(){ //Método
    return this._quantidade * this._valor;
  }

  get data(){
    return new Date(this._data.getTime());
  }

  get valor(){
    return this._valor;
  }

  get quantidade(){
    return this._quantidade;
  }
}

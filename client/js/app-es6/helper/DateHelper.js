class DateHelper {
  constructor(){
    throw new Error('DateHelper não pode ser instânciada.');
  }

  // Definindo os métodos como static, eu posso invocar eles direto do objeto, sem precisar instanciar ele. ECMAScript 6
  static textForDate(texto){
    //new Date('ANO', 'MES', 'DIA')
    //let data = new Date(this._inputData.value.split('-'));

    if(!/\d{4}-\d{2}-\d{2}/.test(texto))
      throw new Error('A data deve estar no formato YYYY-MM-DD');

    return new Date(... //Spread operator - o array é desmembrado e cada elemento dele é passado como um parâmetro do construtor
        texto.split('-')
          .map((item, indice) => item - indice % 2)  //Arrow Functions
      );
  }

  static dateForText(data){
    return `${data.getDate()}/${data.getMonth()+1}/${data.getFullYear()}`; // Template String
    // return data.getDate()
    //     + '/' + (data.getMonth()+1)
    //     + '/' + data.getFullYear();
  }
}

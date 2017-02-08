class NegociacaoController{
  constructor() {
    let $ = document.querySelector.bind(document); // Macete para diminuir a repetição do método, similar ao JQuery

    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia');

    this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');
  }

  adiciona(event) {
    event.preventDefault();

    this._listaNegociacoes.adiciona(this._criaNegociacao());
    this._mensagem.texto = 'Negociação adicionada com sucesso.';
    this._limpaFormulario();
    //let diaMesAno = DateHelper.dateForText(negociacao.data);
    console.log(this._listaNegociacoes.negociacoes);
  }

  apaga(){
    this._listaNegociacoes.esvazia();
    this._mensagem.texto = 'Negociações apagadas com sucesso';
  }

  _criaNegociacao() {
    let data = DateHelper.textForDate(this._inputData.value);

    return new Negociacao(
      data,
      this._inputQuantidade.value,
      this._inputValor.value
    );
  }

  importaNegociacoes(){ // Requisições AJAX
    let service = new NegociacaoService();

    Promise.all([service.obterNegociacoesDaSemana(),
                service.obterNegociacoesDaSemanaAnterior(),
                service.obterNegociacoesDaSemanaRetrasada()] // Resolve estas promesis nessa ordem
    )
    .then(negociacoes => {
      negociacoes
        .reduce((arrayAchatado, array) => arrayAchatado.concat(array), []) // Vai retornar um array com todas as negociações concatenadas dentro
        .forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
      this._mensagem.texto = 'Negociações da semana obtidas com sucesso.';
    })
    .catch(erro => this._mensagem.texto = erro); // Pega o erro da promesi que acabou de executar

    /*let promise = service.obterNegociacoesDaSemana(); // padrão promise

    promise
      .then((negociacoes) => {
        negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
        this._mensagem.texto = 'Negociações da semana obtidas com sucesso.';
      })
      .catch(erro => {
        this._mensagem.texto = erro;
      });*/

    /*service.obterNegociacoesDaSemana((erro, negociacoes) => { // função de Call Back
      if(erro){ // Convenção, error first
        this._mensagem.texto = erro;
        return;
      }

      negociacoes.forEach(negociacao => this._listaNegociacoes.adiciona(negociacao));
      this._mensagem.texto = 'Negociações importadas com sucesso'
    });*/
  }

  _limpaFormulario() {
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;

    this._inputData.focus();
  }

  // adiciona(event) {
  //   event.preventDefault();
  //
  //   //new Date('ANO', 'MES', 'DIA')
  //   //let data = new Date(this._inputData.value.split('-'));
  //   let data = new Date(... //Spread operator - o array é desmembrado e cada elemento dele é passado como um parâmetro do construtor
  //     this._inputData.value
  //       .split('-')
  //       .map(function(item, indice){ //Percorre o array e aplica uma ação sobre os item dele, depois retorna o array modificado
  //         if(indice==1){ // se for o segundo item do array
  //           return item - 1;
  //         }
  //         return item;
  //       })
  //   );
  //
  //   console.log(data);
  // }

  // adiciona(event) {
  //   event.preventDefault();
  //
  //   let negociacao = new Negociacao(
  //     this._inputData.value,
  //     this._inputQuantidade.value,
  //     this._inputValor.value
  //   );
  //
  //   console.log(negociacao);
  // }
}
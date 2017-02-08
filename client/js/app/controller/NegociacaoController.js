class NegociacaoController{
  constructor() {
    let $ = document.querySelector.bind(document); // Macete para diminuir a repetição do método, similar ao JQuery

    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia');

    this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

    this._init();
  }

  _init(){
    ConnectionFactory // Usando um nível mais avançado de promise
      .getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.listaTodos())
      .then(negociacoes =>
        negociacoes.forEach(negociacao =>
          this._listaNegociacoes.adiciona(negociacao)
        )
      )
      .catch(erro => {
        console.log(erro);
        this._mensagem.texto = erro;
      });

      setInterval(() => this._importaNegociacoes(), 3000); // Executa no tempo determinado
  }

  adiciona(event) {
    event.preventDefault();

    let negociacao = this._criaNegociacao();

    new NegociacaoService()
      .cadastra(negociacao)
      .then(mensagem => {
        this._listaNegociacoes.adiciona(negociacao);
        this._mensagem.texto = mensagem;
        this._limpaFormulario();
      })
      .catch(erro => this._mensagem.texto = erro);
  }

  apaga(){
    ConnectionFactory
      .getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.apagaTodos())
      .then(mensagem => {
        this._mensagem.texto = mensagem;
        this._listaNegociacoes.esvazia();
      });
  }

  _criaNegociacao() {
    let data = DateHelper.textForDate(this._inputData.value);

    return new Negociacao(
      data,
      parseInt(this._inputQuantidade.value),
      parseFloat(this._inputValor.value)
    );
  }

  _importaNegociacoes(){
    let service = new NegociacaoService();

    service
      .obterTodasNegociacoes()
      .then(negociacoes =>
        negociacoes.filter(negociacao => // Filtra o array de negociações com base na condição retornada
          !this._listaNegociacoes.negociacoes // Negação do resultado do some
            .some( // some() percorre o array até a condição ser true, caso nunca seja ele retorna false
              // Realiza a comparação do JSON (string) dos objetos
              negociacaoExistente => JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)
            )
        )
      )
      .then(negociacoes => {negociacoes
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

class NegociacaoService {
  constructor(){
    this._httpService = new HttpService();
  }

  obterNegociacoes(url, mensagemErro) {
    return new Promise( (resolve, reject) => {
      this._httpService
          .get(url)
          .then( negociacoes => {
            resolve(negociacoes.map(dado => NegociacaoHelper.converterObjetoEmNegociacao(dado)))
          })
          .catch(erro => {
            console.log(erro);
            reject(mensagemErro);
          });
    } );
  }

  obterTodasNegociacoes(){
    return Promise.all([// Resolve estas promesis nessa ordem
            this.obterNegociacoesDaSemana(),
            this.obterNegociacoesDaSemanaAnterior(),
            this.obterNegociacoesDaSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), [])// Vai retornar um array com todas as negociações concatenadas dentro
                .map(dado => NegociacaoHelper.converterObjetoEmNegociacao(dado));

            return negociacoes;
        }).catch(erro => {
            throw new Error(erro);
        });
  }

  obterNegociacoesDaSemana() {
    return this.obterNegociacoes('negociacoes/semana', 'Não foi possível obter as negociações da semana.');
  }

  obterNegociacoesDaSemanaRetrasada() {
    return this.obterNegociacoes('negociacoes/retrasada', 'Não foi possivel obter as negociações da semana retrasada');
  }

  obterNegociacoesDaSemanaAnterior() {
    return this.obterNegociacoes('negociacoes/anterior', 'Não foi possivel obter as negociações da semana anterior');
  }

  cadastra(negociacao){
    return ConnectionFactory
      .getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.adiciona(negociacao))
      .then(() => 'Negociacao adicionada com sucesso.')
      .catch(() => {
        throw new Error('Não foi possível adicionar a negociacao.')
      });
  }

  // obterNegociacoes(cb, caminho){ //Call Back
  //   let xhr = new XMLHttpRequest();
  //
  //   xhr.open('GET', caminho); // open('METODO', 'ENDEREÇO')
  //
  //   /*  Lista de estados do XHR:
  //       0: requisição ainda não iniciada
  //
  //       1: conexão com o servidor estabelecida
  //
  //       2: requisição recebida
  //
  //       3: processando requisição
  //
  //       4: requisição concluída e a resposta esta pronta
  //   */
  //   //Esta função será chamada toda vez que o estado do XHR mudar
  //   xhr.onreadystatechange = () => {
  //     if(xhr.readyState == 4 //4: requisição concluída e a resposta esta pronta
  //       && xhr.status == 200){ //200 Indica que a resposta está ok, sem erros
  //
  //         cb( null,
  //         JSON.parse(xhr.responseText)// Converte JSON em um objeto JS
  //         .map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor)) );
  //
  //     } else if(xhr.readyState == 4 && xhr.status != 200){
  //       console.log(xhr.responseText);
  //       cb('Não foi possivel obter as negociações', null);
  //     }
  //   }
  //
  //   xhr.send();
  // }
  //
  // obterNegociacoesDaSemana(cb) {
  //   return this.obterNegociacoes(cb, 'negociacoes/semana');
  // }
  //
  // obterNegociacoesDaSemanaRetrasada(cb) {
  //   return this.obterNegociacoes(cb, 'negociacoes/retrasada');
  // }
  //
  // obterNegociacoesDaSemanaAnterior(cb) {
  //   return this.obterNegociacoes(cb, 'negociacoes/anterior');
  // }
}

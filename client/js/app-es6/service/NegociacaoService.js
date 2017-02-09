import {HttpService} from './HttpService';
import {ConnectionFactory} from './ConnectionFactory';
import {NegociacaoDao} from '../dao/NegociacaoDao';
import {NegociacaoHelper} from '../helper/NegociacaoHelper';

export class NegociacaoService {
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
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível adicionar a negociacao.')
      });
  }

  lista(){
    return ConnectionFactory
      .getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.listaTodos())
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível obter as negociações.');
      })
  }

  apaga(){
    return ConnectionFactory
      .getConnection()
      .then(connection => new NegociacaoDao(connection))
      .then(dao => dao.apagaTodos())
      .then(() => 'Negociações apagadas com sucesso.')
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível apagar as negociações.');
      })
  }

  importa(listaAtual){
    return this.obterTodasNegociacoes()
      .then(negociacoes =>
        negociacoes.filter(negociacao => // Filtra o array de negociações com base na condição retornada
          !listaAtual // Negação do resultado do some()
            .some( // some() percorre o array até a condição ser true, caso nunca seja ele retorna false
              // Realiza a comparação do JSON (string) dos objetos
              negociacaoExistente => JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)
            )
        )
      )
      .catch(erro => {
        console.log(erro);
        throw new Error('Não foi possível importar as negociações.');
      });
  }
}

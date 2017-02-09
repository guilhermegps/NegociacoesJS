import {ListaNegociacoes} from '../model/ListaNegociacoes';
import {Negociacao} from '../model/Negociacao';
import {Mensagem} from '../model/Mensagem';
import {NegociacaoService} from '../service/NegociacaoService';
import {MensagemView} from '../view/MensagemView';
import {NegociacoesView} from '../view/NegociacoesView';
import {Bind} from '../helper/Bind';
import {DateHelper} from '../helper/DateHelper';

export class NegociacaoController{
  constructor() {
    let $ = document.querySelector.bind(document); // Macete para diminuir a repetição do método, similar ao JQuery

    this._inputData = $('#data');
    this._inputQuantidade = $('#quantidade');
    this._inputValor = $('#valor');

    this._listaNegociacoes = new Bind(new ListaNegociacoes(), new NegociacoesView($('#negociacoesView')), 'adiciona', 'esvazia');

    this._mensagem = new Bind(new Mensagem(), new MensagemView($('#mensagemView')), 'texto');

    this._service = new NegociacaoService();

    this._init();
  }

  _init(){
    this._service
      .lista()
      .then(negociacoes =>
        negociacoes.forEach(negociacao =>
          this._listaNegociacoes.adiciona(negociacao)
        )
      )
      .catch(erro => this._mensagem.texto = erro);

      setInterval(() => this._importaNegociacoes(), 3000); // Executa no tempo determinado
  }

  adiciona(event) {
    event.preventDefault();

    let negociacao = this._criaNegociacao();

    this._service
      .cadastra(negociacao)
      .then(mensagem => {
        this._listaNegociacoes.adiciona(negociacao);
        this._mensagem.texto = mensagem;
        this._limpaFormulario();
      })
      .catch(erro => this._mensagem.texto = erro);
  }

  apaga(){
    this._service
      .apaga()
      .then(mensagem => {
        this._mensagem.texto = mensagem;
        this._listaNegociacoes.esvazia();
      })
      .catch(erro => this._mensagem.texto = erro);
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
    this._service
    .importa(this._listaNegociacoes.negociacoes)
    .then(negociacoes => {negociacoes.forEach(negociacao =>
        this._listaNegociacoes.adiciona(negociacao));
      this._mensagem.texto = 'Negociações importadas com sucesso.';
    })
    .catch(erro => this._mensagem.texto = erro); // Pega o erro da promesi que acabou de executar
  }

  _limpaFormulario() {
    this._inputData.value = '';
    this._inputQuantidade.value = 1;
    this._inputValor.value = 0.0;

    this._inputData.focus();
  }
}

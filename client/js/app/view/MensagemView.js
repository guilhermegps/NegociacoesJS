class MensagemView extends ViewMaster {
  constructor(elemento){
    super(elemento);
  }

  template(model){
    //Uma string vazia ou nula é retornada como false
    return model.texto ? `<p class="alert alert-info">${model.texto}</p>` : `<p></p>`;
  }
}

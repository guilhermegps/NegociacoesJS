import {ViewMaster} from './ViewMaster';

export class NegociacoesView extends ViewMaster {
  constructor(elemento){
    super(elemento);
  }

  template(model){
    return `
    <table class="table table-hover table-bordered">
        <thead>
            <tr>
                <th>DATA</th>
                <th>QUANTIDADE</th>
                <th>VALOR</th>
                <th>VOLUME</th>
            </tr>
        </thead>

        <tbody>
          ${model.negociacoes.map(n => `
              <tr>
                <td>${DateHelper.dateForText(n.data)}</td>
                <td>${n.quantidade}</td>
                <td>${n.valor}</td>
                <td>${n.obtemVolume()}</td>
              </tr>
            ` ).join('')}
        </tbody>

        <tfoot>
          <td colspan="3"></td>
          <td>${ // A função reduce processa o array e devolve um unico resultado
            model.negociacoes.reduce((total, n) => total + n.obtemVolume(), 0.0)
          }</td>
        </tfoot>
    </table>
    `;
  }
}

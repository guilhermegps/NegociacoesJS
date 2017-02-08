var campos = [
  document.querySelector('#data'),
  document.querySelector('#quantidade'),
  document.querySelector('#valor')
];

console.log(campos);

var tBody = document.querySelector('table tbody');
var claseForm = document.querySelector('.form'); // o . indica uma classe dos elementos
claseForm.addEventListener('submit', function(event){
  event.preventDefault();
  var tr = document.createElement('tr'); // Cria um novo elemento no DOM
  campos.forEach(function(campo){ // no JavaScript o array já vem com um forEach para vc varrer ele
    var td = document.createElement('td');
    td.textContent = campo.value;
    tr.appendChild(td); // Adiciona um elemento filho
  });
  var tdVolume = document.createElement('td'); // Quantidade * valor
  var quantidade = campos[1].value;
  var valor = campos[2].value;
  tdVolume.textContent = quantidade * valor;

  tr.appendChild(tdVolume);

  tBody.appendChild(tr);

  campos[0].value = '';
  campos[1].value = 1;
  campos[2].value = 0.0;

  campos[0].focus(); // Volta o foco para a data
});

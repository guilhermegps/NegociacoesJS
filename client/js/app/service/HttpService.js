class HttpService {
  get(url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();

      xhr.open('GET', url); // open('METODO', 'ENDEREÇO')

      /*  Lista de estados do XHR:
          0: requisição ainda não iniciada

          1: conexão com o servidor estabelecida

          2: requisição recebida

          3: processando requisição

          4: requisição concluída e a resposta esta pronta
      */
      //Esta função será chamada toda vez que o estado do XHR mudar
      xhr.onreadystatechange = () => {
        if(xhr.readyState == 4 //4: requisição concluída e a resposta esta pronta
          && xhr.status == 200){ //200 Indica que a resposta está ok, sem erros

            resolve( JSON.parse(xhr.responseText) );// Converte JSON em um objeto JS
            //.map(dado => new Negociacao(new Date(dado.data), dado.quantidade, dado.valor)) );

        } else if(xhr.readyState == 4 && xhr.status != 200){
          reject(xhr.responseText);
        }
      }

      xhr.send();
    });
  }

  post(url, dado) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.setRequestHeader("Content-type", "application/json");
      xhr.onreadystatechange = () => {

          if (xhr.readyState == 4) {

              if (xhr.status == 200) {

                  resolve(JSON.parse(xhr.responseText));
              } else {

                  reject(xhr.responseText);
              }
          }
      };
      xhr.send(JSON.stringify(dado)); // usando JSON.stringifly para converter objeto em uma string no formato JSON.
    });
  }
}

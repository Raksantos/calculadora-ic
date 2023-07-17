
// Atribuindo o elemento select
var select = document.querySelector('#select-lanchonete');

// Definindo as opções apartir de um objeto, facilitando a inserção de novas opções futuramente
var options = [
  { value: 'CEDU-150ml', text: 'CEDU - 150ml' },
  { value: 'CEDU-300ml', text: 'CEDU - 300ml' },
  { value: 'Tenda-150ml', text: 'Tenda - 150ml' },
  { value: 'Tenda-300ml', text: 'Tenda - 300ml' },
  { value: 'BIRA', text: 'BIRA' }
];

//Percorrendo o array de opções criando elementos option
for (var i = 0; i < options.length; i++) {
  var option = document.createElement('option');
  option.value = options[i].value;
  option.text = options[i].text;
  select.appendChild(option);
}


// atribuindo o botão da página a uma variável
var botaoCalcular = document.querySelector(".calcular");

// adicionando um ouvinte de evento de clique ao botão
botaoCalcular.addEventListener("click", function (event) {

    // pegando o elemento de seleção do local e quantidade de café
    var local = document.querySelector(".local");
    var quantidade = document.querySelector(".quantidade");
  
    // verificando qual local foi selecionado e obtendo suas informações de preço
    var storeInfo = verificaLocal(local);
  
    // obtendo o elemento de alerta na página
    var alert = document.querySelector(".alert");
  
    // verificando se o local selecionado é válido
    if (!storeInfo) {
      alert.classList.remove("invisivel");
      alert.classList.remove("alert-success");
      alert.classList.add("alert-danger");
      document.getElementById("paragrafo-alert").innerHTML = "Informe uma lanchonete válida.";
    } 
    
    // verificando se a quantidade de café é válida
    else if (quantidade.value == "" || quantidade.value < -1) {
      alert.classList.remove("invisivel");
      alert.classList.remove("alert-success");
      alert.classList.add("alert-danger");
      document.getElementById("paragrafo-alert").innerHTML = "Informe um valor válido.";
    } 
    
    // se ambos o local e a quantidade forem válidos, calcular o preço do café
    else {
      var preco = parseFloat(storeInfo.coffeePrice * quantidade.value).toFixed(2);
      alert.classList.remove("invisivel");
      alert.classList.remove("alert-danger");
      alert.classList.add("alert-success");
      document.getElementById("paragrafo-alert").innerHTML = "Você pagará R$ " + preco + " de café no " + storeInfo.storeName + " esse mês.";
    }
  });

  


/*  função para verificar a string de nome do local e
    retornar nome e o valor do café
    (e.g. remove a sequência de caracteres ' - 200ml')
*/
function verificaLocal(local) {
    var stores = {
      "CEDU": {
        "150ml": 1,
        "300ml": 2
      },
      "Tenda": {
        "150ml": 1.5,
        "300ml": 2
      },
      "BIRA": {
        "padrao": 2
      }
    };
  
    var selectedOption = local.options[local.selectedIndex];
    var optionText = selectedOption.text.trim();
    var dashIndex = optionText.indexOf('-');
    
    if (dashIndex !== -1) {
      var storeName = optionText.substring(0, dashIndex).trim();
      var coffeeSize = optionText.substring(dashIndex + 1).trim();
    } else {
      var storeName = optionText;
      var coffeeSize = "padrao";
    }
  
    if (stores.hasOwnProperty(storeName)) {
      var coffeePrice = stores[storeName][coffeeSize];
      return { storeName: storeName, coffeePrice: coffeePrice };
    } else {
      return null;
    }
  }
  
  

/*
Vamos estruturar um pequeno app utilizando módulos.
Nosso APP vai ser um cadastro de carros. Vamos fazê-lo por partes.
A primeira etapa vai ser o cadastro de veículos, de deverá funcionar da
seguinte forma:
- No início do arquivo, deverá ter as informações da sua empresa - nome e
telefone (já vamos ver como isso vai ser feito)
- Ao abrir a tela, ainda não teremos carros cadastrados. Então deverá ter
um formulário para cadastro do carro, com os seguintes campos:
  - Imagem do carro (deverá aceitar uma URL)
  - Marca / Modelo
  - Ano
  - Placa
  - Cor
  - e um botão "Cadastrar"
Logo abaixo do formulário, deverá ter uma tabela que irá mostrar todos os
carros cadastrados. Ao clicar no botão de cadastrar, o novo carro deverá
aparecer no final da tabela.
Agora você precisa dar um nome para o seu app. Imagine que ele seja uma
empresa que vende carros.{on the road} {82 9 2136-5785}Esse nosso app será só um catálogo, por enquanto.
Dê um nome para a empresa e um telefone fictício, preechendo essas informações
no arquivo company.json que já está criado.
Essas informações devem ser adicionadas no HTML via Ajax.
Parte técnica:
Separe o nosso módulo de DOM criado nas últimas aulas em
um arquivo DOM.js.
E aqui nesse arquivo, faça a lógica para cadastrar os carros, em um módulo
que será nomeado de "app".
*/
(function(DOM, doc) {
    
    function app(){

        var $companyName = new DOM('[data-js="companyName"]');
        var $companyNumber = new DOM('[data-js="companyNumber"]');
        var $image = new DOM('[data-js="image"]');
        var $brandModel = new DOM('[data-js="brand/model"]');
        var $year = new DOM('[data-js="year"]');
        var $licensePlate = new DOM('[data-js="licensePlate"]');
        var $color = new DOM('[data-js="color"]');
        var $tableCar = new DOM('[data-js="tableCar"]');
        var $form = new DOM('[data-js="form"]');
        var car;

        $form.on('submit', handleSubmit);

        (function getCompanyValues(){     
            var ajax = new XMLHttpRequest();       
            ajax.open('GET', `company.json`);
            ajax.send();
      
            ajax.addEventListener('readystatechange', () => {
              if(isReady(ajax)) {
                const data = JSON.parse(ajax.responseText); 
                console.log($companyName);
                $companyName.get().innerText = data.name;
                $companyNumber.get().innerText = data.phone;
              }
            });          
      
        })();

        function isReady(response){
            return response.readyState === 4 && response.status === 200;
        }

        function clearInputs(){
            $image.get().value = '';
            $brandModel.get().value = '';
            $year.get().value = '';
            $licensePlate.get().value = '';
            $color.get().value = ''; 
        }
        
        function handleSubmit(e){
            e.preventDefault();
            car = {
                image: $image.get().value,
                brandModel: $brandModel.get().value,
                year: $year.get().value,
                licensePlate: $licensePlate.get().value,
                color: $color.get().value,
            }
            $tableCar.get().appendChild(createNewCar());
            clearInputs();
        }

        function createNewCar(){
            var $fragment = doc.createDocumentFragment();
            var $tr = doc.createElement('tr');
            var $tdImage = doc.createElement('td');
            var $tdBrandModel = doc.createElement('td');
            var $tdYear = doc.createElement('td');
            var $tdLicensePlate = doc.createElement('td');
            var $tdColor = doc.createElement('td');
            var $img = doc.createElement('img');

            $tdBrandModel.appendChild(doc.createTextNode(car.brandModel));
            $tdYear.appendChild(doc.createTextNode(car.year));
            $tdLicensePlate.appendChild(doc.createTextNode(car.licensePlate));
            $tdColor.appendChild(doc.createTextNode(car.color));
            $img.src = car.image;
            $tdImage.appendChild($img); 

            $tr.appendChild($tdBrandModel);
            $tr.appendChild($tdYear);
            $tr.appendChild($tdLicensePlate);
            $tr.appendChild($tdColor);
            $tr.appendChild($tdImage);

            return $fragment.appendChild($tr);
        }
    }

    app();

})(window.DOM, document);
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
        var id = 0;

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
            $tableCar.get().appendChild(createNewRowCar());
            clearInputs();
            id++;
        }

        function createNewRowCar(){
            var $fragment = doc.createDocumentFragment();
            var $tr = doc.createElement('tr');
            var $tdImage = doc.createElement('td');
            var $tdBrandModel = doc.createElement('td');
            var $tdYear = doc.createElement('td');
            var $tdLicensePlate = doc.createElement('td');
            var $tdColor = doc.createElement('td');
            var $tdDeleteButton = doc.createElement('td');
            var $img = doc.createElement('img');
            $tr.setAttribute('data-js', id);

            $tdBrandModel.appendChild(doc.createTextNode(car.brandModel));
            $tdYear.appendChild(doc.createTextNode(car.year));
            $tdLicensePlate.appendChild(doc.createTextNode(car.licensePlate));
            $tdColor.appendChild(doc.createTextNode(car.color));
            $img.src = car.image;
            $tdImage.appendChild($img);
            $tdDeleteButton.appendChild(createDeleteButton());

            $tr.appendChild($tdBrandModel);
            $tr.appendChild($tdYear);
            $tr.appendChild($tdLicensePlate);
            $tr.appendChild($tdColor);
            $tr.appendChild($tdImage);
            $tr.appendChild($tdDeleteButton);
            return $fragment.appendChild($tr);
        }
        function createDeleteButton(){
            var $deleteButton = doc.createElement('button');
            $deleteButton.setAttribute('data-js', 'deleteButton');
            $deleteButton.setAttribute('id', id);
            $deleteButton.innerText = 'x';
            $deleteButton.addEventListener('click', function(){deleteCar($deleteButton.id);}, false);
            return $deleteButton;
        }
        function deleteCar(id){
            var $tr = new DOM(`[data-js="${id}"]`);
            $tableCar.get().removeChild($tr.get());
        }
    }

    app();

})(window.DOM, document);
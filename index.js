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
        var cars
        var newCar;
        var id;

        $form.on('submit', handleSubmit);

        (function init(){
            getCompanyValues();
            getCars();
        })();

        function getCompanyValues(){ 
            var ajax = new XMLHttpRequest();           
            ajax.open('GET', `company.json`);
            ajax.send();
      
            ajax.addEventListener('readystatechange', () => {
              if(isReady(ajax)) {
                const data = JSON.parse(ajax.responseText); 
                $companyName.get().innerText = data.name;
                $companyNumber.get().innerText = data.phone;
              }
            });          
      
        }
        function getCars(isNewRow){
            var ajax = new XMLHttpRequest(); 
            ajax.open('GET', 'http://localhost:3000/car');
            ajax.send();
            ajax.addEventListener('readystatechange', () => {
                if(isReady(ajax)) {
                    cars = JSON.parse(ajax.responseText);
                    if(!isNewRow){
                        cars.forEach(function(item, index) {
                            newCar = item;
                            id = index;
                            $tableCar.get().appendChild(createNewRowCar());
                        });
                    }
                }
            });          
        }

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
            newCar = {
                image: $image.get().value,
                brandModel: $brandModel.get().value,
                year: $year.get().value,
                licensePlate: $licensePlate.get().value,
                color: $color.get().value,
            }
            saveCar();
            if( id!== 0 )
                id++;
            $tableCar.get().appendChild(createNewRowCar());
            clearInputs();            
        }

        function saveCar(){
            var ajax = new XMLHttpRequest(); 
            ajax.open('POST', 'http://localhost:3000/car');
            ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            ajax.send(
                `image=${newCar.image}&brandModel=${newCar.brandModel}&year=${newCar.year}&licensePlate=${newCar.licensePlate}&color=${newCar.color}&`
            );
            ajax.addEventListener('readystatechange', () => {
                if(isReady(ajax)) {
                    JSON.parse(ajax.responseText);
                    getCars(true);
                }
            }); 
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

            $tdBrandModel.appendChild(doc.createTextNode(newCar.brandModel));
            $tdYear.appendChild(doc.createTextNode(newCar.year));
            $tdLicensePlate.appendChild(doc.createTextNode(newCar.licensePlate));
            $tdColor.appendChild(doc.createTextNode(newCar.color));
            $img.src = newCar.image;
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
            console.log(cars);
            console.log([cars[id].licensePlate]);
            var ajax = new XMLHttpRequest(); 
            ajax.open('DELETE', 'http://localhost:3000/car');
            ajax.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            ajax.send(
                `licensePlate=${cars[id].licensePlate}`
            );
            ajax.addEventListener('readystatechange', () => {
                if(isReady(ajax)) {
                    console.log(JSON.parse(ajax.responseText));
                }
            }); 
            $tableCar.get().removeChild($tr.get());
        }
    }

    app();

})(window.DOM, document);
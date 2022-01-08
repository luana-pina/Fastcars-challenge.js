'use strict';

var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
const { stringify } = require('querystring');
var app = express();

var cars = [
    {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROnNVvMJNu-vihhOLuSl11Spc7i0yXh2f4OA&usqp=CAU',
        brandModel: 'Jeep Renegade',
        year: '2020',
        licensePlate: 'KOU-7322',
        color: 'Amarelo',
    },
    {
        image: 'https://revistacarro.com.br/wp-content/uploads/2020/01/jeep-renegade-2020-usa_1280x768.jpg',
        brandModel: 'Jeep Renegade',
        year: '2020',
        licensePlate: 'ZQR-4449',
        color: 'Vermelho',
    }
]

app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());

app.get('/car', function(req, res) {
    res.json(cars);
});

app.post('/car', function(req, res){
    var newCar = {
        image: req.body.image,
        brandModel: req.body.brandModel,
        year: req.body.year,
        licensePlate: req.body.licensePlate,
        color: req.body.color,
    }
    cars.push(newCar);
    res.json(cars);
});

app.delete('/car', function(req, res){
    var carLicensePlate = req.body.licensePlate;
    cars.forEach(function(item, index){
        if(carLicensePlate === item.licensePlate){
            cars.splice(index, 1);
            return
        }
    });
   console.log(cars);
});

app.listen(3000);
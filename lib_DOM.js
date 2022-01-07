(function(doc){
    'use strict'
    function DOM(node){
       this.elements = doc.querySelectorAll(node); 
    }

    DOM.prototype.on = function(eventType, callback){
        Array.prototype.forEach.call(this.elements, function(element){
            element.addEventListener(eventType, callback, false);
        })
    }

    DOM.prototype.off = function(eventType, callback){
        Array.prototype.forEach.call(this.elements, function(element){
            element.removeEventListener(eventType, callback, false);
        })
    }

    DOM.prototype.get = function(index){
        if(!index)
            return this.elements[0];
        return this.elements[index];
    }

    DOM.prototype.forEach = function(){
        return Array.prototype.forEach.apply(this.elements, arguments);
    }

    DOM.prototype.map = function(){
        return Array.prototype.map.apply(this.elements, arguments);
    }

    DOM.prototype.filter = function(){
        return Array.prototype.filter.apply(this.elements, arguments);
    }

    DOM.prototype.reduce = function(){
        return Array.prototype.reduce.apply(this.elements, arguments);
    }

    DOM.prototype.reduceRight = function(){
        return Array.prototype.reduceRight.apply(this.elements, arguments);
    }

    DOM.prototype.every = function(){
        return Array.prototype.every.apply(this.elements, arguments);
    }

    DOM.prototype.some = function(){
        return Array.prototype.some.apply(this.elements, arguments);
    }    

    DOM.isArray = function(element){
        return Object.prototype.toString.call(element) === '[object Array]';
    }

    DOM.isObject = function(element){
        return Object.prototype.toString.call(element) === '[object Object]';
    }

    DOM.isFunction = function(element){
        return Object.prototype.toString.call(element) === '[object Function]';
    }

    DOM.isNumber = function(element){
        return Object.prototype.toString.call(element) === '[object Number]';
    }

    DOM.isString = function(element){
        return Object.prototype.toString.call(element) === '[object String]';
    }

    DOM.isBoolean = function(element){
        return Object.prototype.toString.call(element) === '[object Boolean]';
    }

    DOM.isNull = function(element){
        return Object.prototype.toString.call(element) === '[object Null]' ||
        Object.prototype.toString.call(element) === '[object Undefined]';
    }
    window.DOM = DOM;
})(document);
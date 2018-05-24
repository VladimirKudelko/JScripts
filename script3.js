var a = 5;
window.b = 10;
document.writeln( window.a + ' ' + window.b );

console.log(a1); // underfined
var a1 = 5; // переменная будет создана на момент иницивлизации

// alert(a2); error
a2 = 4; // Переменная будет создана на момент присвоения

function sayHello(name, surname) {
    // LexicalEnviroment = { name = 'Roma', phrase = undefined }
    var phrase = 'Hello ' + name;
    alert( "Hello, " + getFullName() );
    alert( "Bye, " + getFullName() );
    function getFullName() {
        return name + ' ' + surname;
    }
}
sayHello('Roma', 'Zhigan');

// Return function
function makeCounter() {
    var currentCount = 1;

    return function() {
        return currentCount++;
    }
}

var counter = makeCounter();
console.log( counter() + ' ' + counter() + ' ' + counter() );
var counter2 = makeCounter();
console.log( counter2() );
makeCounter.test = 5;
console.log( makeCounter.test ); // Потому что в JS функции это тоже объекты

// Замыкание - это функция вместе со внешними переменными. 
// Обычно под замыкание подразумевают не саму функцию, а именно внешние переменные
// 1. Все переменные и параметры функции являются свойствами объекта переменных LexicalEnviroment. Каждый запуск функции создает новый такой объект
// 2. При создании функция получает системное свойство [[Scope]] которое ссылается на LexicalEnviroment
// 3. При вызове функции. Она будет искать перменные сначала у себя, а затем во внешних LexicalEnviroment

// [[Scope]] для new Function
// При создании функции через new Function, Scope ссылается на window

// Локальные переменные для объекта
function makesCounter() {
    var currentCount = 1; 

    return { // return object
        getNext: function() {
            return currentCount++;
        },
        set: function(value) {
            currentCount = value;
        },
        reset: function() {
            currentCount = 1;
        } 
    }
}

var counter = makesCounter();
document.writeln( '<br>' + counter.getNext() );
document.writeln( counter.getNext() );
counter.set(5);
debugger;
document.writeln( counter.getNext() + '<br>');

// Модули через замыкания
// Его цель скрыть внутренние детали реализации скрипта
;(function() {
    var message = "Привет";

    function showMessage() {
        alert( message );
    }
    
    showMessage();
})();

// Управление памятью
// Изначально все примитивы доступные, но null. Если на объект ничего 
// не ссылается, то он освобождается из памяти

// Устаревшая конструкция with. Это конструкция позволяет
// использовать в качестве области видимости для переменных
// произвольный объект


var obj = {
    a: 10
};

with (obj) {
    console.log(a); // 10
    // потому что сначала ищет переменную в obj, а потом вне
}
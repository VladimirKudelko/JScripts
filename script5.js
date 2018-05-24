// null == underfined - true
// null === undefined - false
// [[Class]], instanceof
document.writeln( typeof 1 + '<br>' );
document.writeln( typeof true + '<br>' );
document.writeln( typeof 'Text' + '<br>' );
document.writeln( typeof null + '<br>' ); //obj. Error in lang
document.writeln( typeof alert + '<br>' );

document.writeln( typeof {} + '<br>' ); //obj
document.writeln( typeof [] + '<br>' ); //obj
document.writeln( typeof new Date + '<br>' ); //obj

var toString = {}.toString; //взяли метод toString, так как у Date и Array есть свои toString и работают они иначе

// Затем мы вызываем toString в контексте нужного объекта и он возвращает свойство Class
var arr = [1, 2];
console.log( toString.call(arr) );
var date = new Date;
console.log( toString.call(date) );
var user = { name:'Volodya' };
console.log( toString.call(user) );

console.log( Array.isArray( arr ) );
console.log( Array.isArray( 'Not array' ) );

// Оператор instanceof позволяет проверить, создан ли объект данной функцией
function User(){}

var user = new User();

console.log (user instanceof User); // true

// Утиная типизация
var something = [1, 2, 3];

if (something.splice) {
  alert( 'Это утка! То есть, массив!' );
}

// Пример полиморфной функции
function sayHi(who) {

    if (Array.isArray( who )) {
        who.forEach(sayHi);
    } else {
        console.log( 'Hello ' + who );
    }
}

sayHi( 'Akhrem' );
sayHi( ["Akhrem", "Vladimir"] );

// Формат JSON
// используется для представления объектов в виде строки.
/*
    JSON.parse – читает объекты из строки в формате JSON.
    JSON.stringify – превращает объекты в строку в формате JSON, используется, когда нужно из JavaScript передать данные по сети.
*/
var numbers = "[0, 1, 2, 3]";
var user    = '{"name": "Vladimir", "age": 19, "city":"Minsk"}'
/* ключи и строки в JSON объектах должны быть в двойных кавычках */
numbers = JSON.parse(numbers);
user    = JSON.parse(user);

console.log( numbers[1] ); // 1
console.log( user.city );

// Умный разбор
var str = '{"title":"Конференция","date":"2014-11-30T12:00:00.000Z"}';
var event = JSON.parse(str);
// console.log( event.date.getDate() ); // error! так как date не объект, а строка

var event = JSON.parse(str, function (key, value) { // рботает даже с вложенными объектами
    if (key == 'date')
        return new Date(value);

    return value;
});

console.log( event.date.getDate() );

// JSON.stringify
var event = {
    title: "Conference",
    date: "now"
};

var strJson = JSON.stringify( event );
console.log( strJson );

// Обратное преобразование.
event = JSON.parse(str);


var room = {
    number: 23,
    occupy: function() {
        alert( this.number );
    }
};
  
var event = {
    title: "Конференция",
    date: new Date(Date.UTC(2014, 0, 1)),
    room: room
};
  
alert( JSON.stringify(event) );
/*
    {
        "title":"Конференция",
        "date":"2014-01-01T00:00:00.000Z",  // (1)
        "room": {"number":23}               // (2)
    }
*/

// Использование 2 параметра. Указываем массив свойств которые надо серилизовать
var user = {
    name: "Akhrem",
    age: 25,
    window: window
};

console.log( JSON.stringify(user, ["name", "age"]) );

// Более сложно
var user = {
    name: "Вася",
    age: 25,
    window: window
};
  
var str = JSON.stringify(user, function(key, value) {
    if (key == 'window') return undefined;
    return value;
});
  
alert( str ); // {"name":"Вася","age":25}

// setTimeout & setInterval
var timerId = setTimeout( () => {
    alert( 'pass 1 sec' );
}, 1000 );

clearTimeout(timerId);






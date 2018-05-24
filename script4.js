// Методы объектов, this
// this - доступ к текущему объекту из метода
// this называют контекстом вызова и будет определена в момент
// вызова функции
var user = {
    name: 'Vladimir',

    sayHi: function() {
        console.log(this.name);
    },

    sayHi2: function() {
        showName(this); // передаем текущий объект целиком
    }
};

function showName(namedObj) {
    console.log( namedObj.name );
}

user.sayHi();
user.sayHi2();

var admin = { 
    name: 'Admin',
    number: 8303609,
    
    valueOf:  function() { return this.number; },
    toString: function() { return 'User: ' + this.name; }
};

function getName() {
    console.log( this.name );
}

user.func  = getName;
admin.func = getName;

user.func();
admin.func();

function f(){ console.log(this); } // При use strict будет undefined
f();

// Преобразование объектов toString и valueOf

// Логическое преобразование
// Любой объект в логическом контексте – true
if ({} && []) {
    console.log( "All objects are true" );
}

// Строковое преобразование
console.log( user );
console.log( [1, 2] ); // toString для массивов выводит список элементов "1,2"
console.log( new Date ); // toString для дат выводит дату в виде строки
console.log( function() {} ); // toString для функции выводит её код

// Численное преобразование. valueOf
// У большинства всроенных объектов нету valueOf. Исключение
// Date у него и toString и valueOf
console.log( +admin );
delete admin.valueOf;
console.log( +admin );

// Создание объектов через new
function Animal(_name) { // Конструктор
    this.name = _name;
    this.canWalk = true;

    this.sayHi = function() {
        console.log( 'My name is - ' + this.name );
    }
}

var lion = new Animal('Лев'); // Можно скобки после Animal не ставить
lion.sayHi();

var snake = new function() { // Тоже самое
    this.name = 'Pyton';
    this.canWalk = true;
}
// Конструкторы все записываю в this, а потом this возвращается

// Дескрипторы, геттеры и сеттеры свойств
var user = {
    get fullName() {
        return this.name + ' ' + this.lastname;
    },

    set fullName(value) {
        var split = value.split(' ');
        this.firstName = split[0];
        this.lastname = split[1];
    }
};

// 1. Простое присваивание
user.name = 'Vladimir';
// 2. Указание значения через дескриптор
Object.defineProperty(user, "lastname", { // если укажем существующее свойство, то оно будет его модифицировать
    value: 'Kudelko', 
    configurable: true, 
    writable: true, // если тут false, то будет свойство-константа
    enumerable: true // и тут
});

console.log( user.fullName );
user.fullName = 'Петя Иванов';
console.log( user.firstName );
console.log( user.lastname );

// Статические и фабричные методы
// Методы и св-ва которые не привязаны к конкретному экземпляру
// объекта называют статическими
function Article() {
    Article.count++;
}

Article.count = 0; // статическое свойство-переменная
Article.DEFAULT_FORMAT = "html"; // статическое свойство константа
Article.showCount = function() { // Статический меод
    console.log( this.count );
}

new Article();
console.log( Article.DEFAULT_FORMAT );
Article.showCount(); // 1

/* "Фабричный статический метод" – так называется статический
метод, который служит для создания новых объектов 
(поэтому и называется «фабричным») */
console.log( String.fromCharCode(65) );

function User(userData) {
    if (userData) {
        this.name = userData.name;
        this.age = userData.age;
    } else {
        this.name = 'Anoimus';
    }

    this.sayHi = function () {
        console.log( this.name );
    }
}

var guest = new User();
guest.sayHi(); // Anonimus

var knowUser = new User({
    name: 'Egor',
    age: 19
});

knowUser.sayHi(); // Egor


function Article2() {
    this.created = new Date();
    Article2.count++;
    Article2.lastCreated = new Date();
}

Article2.showStat = function() {
    console.log('All: ' + this.count + '; The last: ' + this.lastCreated);
}

Article2.count = 0;

new Article2();
setTimeout(function() {
    new Article2();
    Article2.showStat();
}, 2000)


// Явное указание call и apply
// Метод call
function showFullName(param) {
    alert( this.firstName + ' ' + this.lastName + ' ' + this[param]);
} 

var user = {
    firstName: 'Volodya',
    lastName: 'Kudelko',
    middleName: 'Nikolayevich'
};

showFullName.call(user, 'middleName'); // явно указали

// Отдалживание метода
function printArgs() {
    arguments.join = [].join; // одолжили метод (1)
    var argStr = arguments.join(':'); // (2)
    alert( argStr ); // сработает и выведет 1:2:3
} // [] = this; (1) происходит копирование
  
printArgs(1, 2, 3);

// Apply аналогичен call, но принимает массив аргументов
showFullName.apply(user, ['middleName']);
// Разница лишь в том что мы формируем массив динамически


function sumArgs() {
    arguments.reduce = [].reduce;

    return arguments.reduce(function(a, b) {
        return a + b;
    });
    
}

alert( sumArgs(1, 2, 3) ); 

// Привязка контекста и карринг: 'bind'
// Функции в js не привязаны к своему контексту
setTimeout(function() {
    console.log( 'Helloo' );
}, 1000);

var user = {
    firstName: 'Vasya',
    sayHi: function() {
        console.log( 'Hello ' + this.firstName );
    }
};

setTimeout(user.sayHi, 1000); // undefined
/* Это произошло потому, что в примере выше setTimeout 
получил функцию user.sayHi, но не её контекст. */

// Решение 1
setTimeout(function() {
    user.sayHi();
}, 1000); // Но есть уязвимость, так как объекту может быть за 1 секунду присвоят другое значение

// Решение 2. Bind
function bind(func, context) {
    return function() {
        return func.apply(context, arguments);
    }
}

function f() {
    alert( this );
}

var g = bind(f, "Context");
g();

// ----
setTimeout(bind(user.sayHi, user), 1000);

// Решение 3. Встроенный метод bind
'use strict';
function fun(a, b) {
    alert( this );
    console.log( a + b );
}

var g = fun.bind("Context");
g(1, 2);

/* Методы bind и call/apply близки по синтаксису, но есть важнейшее отличие.

Методы call/apply вызывают функцию с заданным контекстом и аргументами.

А bind не вызывает функцию. Он только возвращает «обёртку», которую мы можем вызвать позже, и которая передаст вызов в исходную функцию, с привязанным контекстом.
 */

// Карринг. Привязать можно не только контекст, но и аргументы.
function mul(a, b) {
    return a * b;
};

// double умножает только на 2
(function (d) { // фиксируем первый аргумент в 2
    var double = mul.bind(null, 2); // контекст фиксируем null, он не используется

    d.writeln( double(3) );
    d.writeln( double(5) );
})(document);

// Декоратор – приём программирования, который позволяет взять существующую функцию и изменить/расширить ее поведение.

/* let arr = ['str', 23];
let [v1, v2] = arr; 
console.log( v1.repeat(3) );

// let, const
// 1. let - область видимости блок {...}
let apples = 5;

if (true) {
    let apples = 10;
    console.log(apples); //10
}

console.log( apples );

// 2. let видна только после объявления
console.log(a); //undefined
var a = 10;

// console.log( b );//error
let b = 20;

let x;
// let x;//error

// 3. На каждую итерацию создается одна своя независимая переменная

// const
const limons = 5;
// limons = 4; //error

const user = {
    name: 'Roma Zhigan'
};

user.name = 'Ramon';
user.surName = 'Daniluk';
// user = 100; //error



// Деструктаризация
// Это возможность присвоить массив или объект сразу нескольким
// переменным
'use strict';

let [firstName, lastName] = ["Илья", "Макаревич"];

console.log( firstName, lastName );

// можно отбросить ненужные элементы
let [, , title] = "Юлий Цещарь Император Рима".split(' ');
console.log( title );

//spread - если хотим получить значения но не уверенны в их числе
let [firstname, lastname, ...rest] = "Цезарь Император Рима и ещё чего то";
// rest is array
console.log( rest );

// Значения по умолчанию
function someFunc() {
    return String(Date.now()).substring(0, 3) + '-visitor';
}

let [$1 = 'first', $2 = someFunc()] = [];
console.log( $1, $2 );


// Деструктаризауия объекта
let option = {
    titl: 'Menu',
    width: 100,
    height: 200
};

let {titl, width = 200, height} = option;
let {titl: t = '_MENU_', width: w, height: h} = option;
let {titl: q, ...size} = option;

console.log( titl, width, height );
console.log( t, w, h );
console.log( size );


// Function
function getWidth() {
    return 200 % 2;
}

function showMenu(title = 'Without header', width = getWidth(), height = 200) {
    console.log(title + ' ' + width + ' ' + height);
}

showMenu('Menu');

function showName(firstName, lastName, ...rest) {
    console.log( firstName + ' ' + lastName + ' ' + rest );
}

showName("Юлий", "Цезарь", "Император", "Рима");

let nums = [2, 3, 35],
    max = Math.max( ...nums ); //... передали массив

console.log( max );

// деструктаризация в параметрах
let options = {
    title: 'Menu',
    width: 100,
    height: 200
};

function showOptions({title, width, height}) {
    console.log(title, width, height);
}

showOptions(options);
console.log(showOptions.name);


// Функции через =>
let inc = (x, y) => x + y;
//let inc = function(x) { return x + 1; }; аналогично

console.log( inc(3, 7) ); // 4

let getTime = () => {
    let date    = new Date();
    let hours   = date.getHours();
    let minutes = date.getMinutes();
    return hours + ':' + minutes;
};

console.log( getTime() );

// функции-стрелки удобны в качестве коллбэков
let arrr = [5, 8, 3];

let sorted = arrr.sort((a, b) => a - b);
console.log(sorted);

// функции стрелки не имеют свой this, argumrnts
// у них тот же this и arguments что и снаружи
let persons = {
    title: 'Our cours',
    names: ['Vova', 'Egor', 'Denis'],

    showList: function() {
        this.names.forEach(
            (name) => console.log(this.title + ': ' + name)
        );
    }
};

persons.showList();


// Вызовом .bind(this) мы передаём текущий this, привязывая 
// его к функции.
// При => привязки не происходит, так как функция стрелка 
// вообще не имеет контекста this. Поиск this в ней 
// осуществляется так же, как и поиск обычной переменной, 
// то есть, выше в замыкании. До появления стандарта ES-2015 
// такое было невозможно.




// Строки
// ``
// 1. Рарешен перевод строк
console.log( `Моя 
    многострочная
    строка` );

// 2. Можно вставлять выражения
var appls  = 10;
var orangs = 20;

console.log( `${appls} + ${orangs} = ${appls + orangs}` );


// Внутренняя кодировка строк в JavaScript – это UTF-16
// Под каждый символ отводится 2 байта
console.log( '我'.length, '𩷶'.length );
console.log( 
    '𝒳'.charCodeAt(0) + ' ' + '𝒳'.charCodeAt(1)
); // считывает сурогатную пару и возвращает код

console.log( '𝒳'.codePointAt(0) );
console.log( String.fromCodePoint(119987) ); // 𝒳
console.log( '\u2033' );

// Нормализация - привидение к одному общему виду
console.log(
    "S\u0307\u0323".normalize() == 
    "S\u0323\u0307".normalize()
);


// Полезные методы
var str = 'Some text about my ohuenoy life.';
console.log( 'include \'my\': ' + str.includes('my') );
console.log( 'endsWith \'.\': ' + str.endsWith('.') );
console.log( 'startsWith \'Text\': ' + str.startsWith('Text') );
console.log( 'repeat '.repeat(3) );



// Объекты и прототипы
// Короткое свойство
'use strict';

var name = 'Vasya';
var isAdmin = true;

var User = {
    name,
    isAdmin
};

console.log( JSON.stringify(User) );

// Вычисляемые свойства
var a = "My ",
    d = "green ",
    c = "crocodile"

var User = {
    [(a + d + c).toUpperCase()]: 'Gena'
};

console.log( User["MY GREEN CROCODILE"] );

// Object.assign получает список объектов и копирует в первый
// target свойства остальных

var visitor = { isAdmin: false, visits: true },
    admin   = { isAdmin: true },
    User    = { name: 'Den' };

Object.assign(User, visitor, admin);

console.log( JSON.stringify(User) );

// Object.is( val1, val2 ) для сравнения
console.log( 
    Object.is(+0, -0), // false
    +0 === -0, // true
    Object.is(NaN, NaN), // true
    NaN === NaN // false
); 


// Метод объекта
var name = 'Vasya',
    surName = 'Gluschenya'
    User = {
        name,
        // вместо "sayHi: function() {...}" пишем "sayHi() {...}"
        sayHi() {
            console.log( this.name );
        }
    };

User.sayHi();

var User = {
    name,
    surName,

    get fullName() {
        return `${this.name} ${this.surName}`
    }
};

console.log( User.fullName );


// Ключевое слово super
// Только для использования в методах объекта
var animal = {
    walk() {
        console.log( 'I\'m walking' );
    }
};

// super.parentProperty позволяет из метода объекта получить
// свойства его прототипа 
var rabbit = {
    __proto__: animal,
    walk() {
        super.walk();
    }
};

rabbit.walk();

// Свойство [[HomeObject]] – не изменяемое. При создании 
// метода – он привязан к своему объекту навсегда.

*/








// Классы
/* class User {
    
    constructor(name) {
        this.name = name;
    }

    sayHi() {
        console.log( this.name );
    }

}

let user1 = new User('Kolya');
user1.sayHi();

// Ряд отличий
// Конструктор вызывается сразу, остальные методы в User.prototype
// Область видимости класса как let
// нельзя вызывать без new
// методы класса неперечислимы

// Class Expression 
var Person = class {
    sayHi() { console.log( 'Hello!' ); }
};

new Person().sayHi();

var Person = class USER { // имя USER доступно только внутри класса
    constructor(name) {
        this.variable = 'asdasd';
    }

    sayHi() {
        let somePerson = new USER();
        console.log( somePerson.variable );
    }
}

new Person().sayHi();


// Геттер, сеттер, вычисляемые свойства
class Usver {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName  = lastName;
    }

    //getter
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }

    set fullName(newValue) {
        [this.firstName, this.lastName] = newValue.split(' ');
    }

    // вычисляемое свойство
    ["test".toUpperCase()]() {
        console.log( 'passed' );
    }

};

let usver = new Usver('Vasya', 'Pupkin');
console.log( usver.fullName );

usver.fullName = 'Vladimir Kudelko';
console.log(usver.fullName);

usver.TEST();
// Нет возможности задать в прототипе обычное значение 
// такое как User.prototype.key = "value".


// Static property
class SomeClass {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName  = lastName;
    }

    static createGuest() {
        return new SomeClass('Guest', 'Site');
    }
};

let someClass = SomeClass.createGuest();
console.log( someClass.firstName ); // Guest


// Наследование
class Animal {
    constructor(name) {
        this.name = name;
    }

    walk() {
        console.log( 'I walk: ' + this.name );
    }
}

class Rabbit extends Animal {
    // constructor() {
        //super('Krol!'); Можно так вызвать конструктор родителя
        //console.log(this)
      //  только после super() можно вызвать this
    //}

    walk() {
        super.walk();
        console.log('... and jump!');
    }
}

new Rabbit('Vasiliy').walk();
// Конструктор наследуется автоматически
// Вызвать конструктор родителя можно только изнутри конструктора
 */








// Тип данных Symbol
/* var sym = Symbol(); // Это примитив
console.log( typeof sym );


// параметр это имя символа
let name = Symbol.for("name");// Создали глобальный символ
// Символ уже есть, читаем в реестре
console.log( Symbol.for("name") == name ); // true


// Использование символов
// В качестве имен свойств
let isAdmin = Symbol("isAdmin");

let user = {
    name: 'Pasha',
    [isAdmin]: true
};

// В цицле for .. in не будет символа */










// Итераторы
// Итерируемые или 'перебираемые' объекты это те объекты которые
// мы можем перебрать в цикле
/* for (let char of 'Hello') {
    console.log(char);
}

let range = {
    from: 1,
    to: 5
};

range[Symbol.iterator] = function() {
    let current = this.from,
        last    = this.to;

    return {
        next() {
            if (current <= last) {
                return {
                    done: false,
                    value: current++
                }
            } else {
                return {
                    done: true
                }
            }
        }
    };
};

// done – равно false если есть ещё значения, и true – в конце.
for (let num of range) {
    console.log(num);
}

// Встроенные итераторы
let str = 'Hello',
    iterator = str[Symbol.iterator]();

while(true) {
    let result = iterator.next();

    if (result.done) break;
    console.log(result.value); // Выведет все буквы по очереди
} */





// Set, Map, WeakSet, WeakMap
// Map - коллекция (ключ: значение)
/* let user = { name: 'Vasya' };

let map  = new Map(),
    map2 = new Map([
        [1, 'str2'],
        ['1', 'str3'],
        [user, 123]
    ]);

map.set('1', 'str1') // ключ-строка
   .set(1, 'num1') // ключ-число
   .set(true, 'bool1'); // ключ-булевское значение

console.log( 
    map.get(1),
    map.get('1'),
    map.get(true),
    map.size,
    map2.get(user)
);

map.delete('1');
console.log(map.has('1'));
map2.clear()


// Set - коллекция для хранения множеств значений, причем 
// каждое значение может встречаться 1 раз
let set = new Set();

let vasya = {name: 'Vasya'};
let petya = {name: 'Petya'};
let dasha = {name: 'Dasha'};

set.add(vasya);
set.add(petya);
set.add(dasha);
set.add(vasya);
set.add(petya);
// delete, add, has, clear

console.log( 'Size set: ' + set.size ); // 3

set.forEach(
    (val) => console.log(val)
); */


// WeakSet - Особый вид Set не припятствующий сборщику мусора
// удалять свои элементы. Тоже самое и WeakMap
















// Promise - это специальный объект, который содержит своё состояние
// также они предоставляют удобный способ организации 
// асинхронного кода
// pending - ожидание
// fulfilled - выполнено успешно
// rejected - выполнено с ошибкой
/* var promise = new Promise((resoleve, reject) => {
    // throw new Error('Suka');
    console.log('a');
});

promise.catch(alert); // чтобы поставить на ошибку обработчик

var prom = new Promise((resolve, reject) => {
    // если вызван resolve или reject, то остальное будет проигнорировано
    setTimeout(() => {
        // reject("suka");
        resolve("result");
    }, 1000 );
});


// Универсальный метод для навешивания обработчиков:
// promise.then(onFulfilled, onRejected)

prom
    .then(
        result => { // сработает при вызове resolve
            console.log("Fulfilled: " + result);
        },
        error => { // сработает при вызове reject
            console.log("Rejected: " + error);
        }
    );
 */













// Генераторы - вид функции, который может приостанавливать 
// своё выполнение, возвращать промежуточный результат
// и далее возобнавлять

/* function* generateSequnce() {
    yield 1;
    yield 2;
    return 3;
}
// При запуске код функции не выполняется, она возвращает
// объект который называют "генератором"

let generator = generateSequnce();
// next() - возобновляет выполнение до ближайшего yield
console.log( JSON.stringify(generator.next()) ); // false
console.log( JSON.stringify(generator.next()) ); // false
console.log( JSON.stringify(generator.next()) ); // true

let generator2 = generateSequnce();
// Генератор - итерируемый
for (let val of generator2) {
    console.log(val); // return проигнорируется
}


// Композиция - когда один генератор включает в себя другие
function* generateS(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

let seq = [...generateS(2, 5)]; // преобразовали в массив
console.log(seq);
 */









// Модули. Модуль - это файл с кодом
// В этом файле ключевым слово export помечаются переменные и 
// функции которые могут быть использованы снаружи
// Другие модули могут подключать их через import
/* export var one = 1;
let two = 2,
    three = 3;

export {two, three};

// При помощи as можно указывать под каким именем будет использоваться
export {two as twice};

export class User {
    constructor(name) {
        this.name = name;
    }
};

export function sayHi() { // Обязательно с именем
    console.log("Hello!");
};


// import
import {one, two} from './scripts/module';
console.log( `${one} and ${two}` );
 */

























/* function isPolyndrom(str) {
    let length = str.length;

    if ( length % 2 === 0 || length % 2 === 1 ) {
        String.prototype.every  = [].every;

        return 
            str.every(function(e, index) {
                if ( e ===  str[length - index - 1]) {
                    return true;
                } else {
                    return false;
            }

            if ( index === Math.floor(length / 2) )
                return;
        });
    }

}

console.log( isPolyndrom('b') ); */ 
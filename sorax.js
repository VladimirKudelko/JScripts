/* // Throw .. Try .. Catch .. Finnaly
// Throw прерывает выполнение скрипта и ищет ближайший обработчик
// throw "Hello";
var myError = new Error("My error message");
console.log(myError.name);
console.log(myError.message);

//throw myError;

var calculate = function(n) {
    if (n > 10) throw new Error("n should be less than 10");
    return n + 10;
};

try {
    calculate(10); // Если в catch ничего не будет, то ошибка будет проигнорирована
} catch (e) { // При try catch скрипт не прервется при ошибке, а будет продолжен
    console.log( e.message );
} finally {
    console.log( 'Finally' );
}
*/









/*
// Objects 
console.log( { name: "Js", v: "1.2" } ); // объектный литерал

var person = {
    name: "AHREM",
    age: 19,
    sayHi: function() { // метод
        return "Hello";
    }
};

console.log( person.name );
console.log( person["age"] );

person.id = 1; // добавили свойство

console.log( person );
console.log( person.sayHi() );
console.log( person.hasOwnProperty("sayHi") );

// Ещё один способ создания объектов это через конструктор и new
var obj = new Object();
var object = Object.create({x: 10, y: 20});
console.log( object );

delete person.age; // Delete prop
console.log( "age" in person );
 */








/* // This
var greet = function (greeting) {
    greeting = greeting || ".";
    return greeting + " hello " + this.name;
}

var person = {
    name: "John",
    greet: greet
};

var anotherPerson = {
    name: "Lena",
    greet: greet
};
// -------------------------
console.log( [] + 1 + 2); //12
console.log( 3 * "suka" ); //NaN
console.log( typeof null ); //obj
console.log( 20e-1['toString'](2) ); // 10
// ------------------------- 

console.log( person.greet() );
console.log( anotherPerson.greet() );
console.log( anotherPerson.greet.call(person, "Suka") ); // привязка к контекста
console.log( anotherPerson.greet.apply(person, ["Word"]) );
console.log( greet() ); 
console.log( this ); // window

// bind простосвязывает с каким-либо объектом, а call & apply вызывает функцию
var bound = greet.bind(anotherPerson); // чтобы когда мы выхвали ф-ию this указывало на тот объект с которым оно связано
console.log( bound( "Hello" ) ); // Он не изменяет исходную функцию, а возвращает новою
 */













// Аксессоры (ES5) и атрибуты свойств
/* var person = {
    name: "Vladimir",
    _age: 19,

    get age() {
        return this._age;
    },
    set age(value) {
        this._age = value < 0 ? 0 : value > 100 ? 100 : value;
    }
};

person.age = 110; // 100
console.log( person.age );

/* 
Каждое свойство кроме имени и значения имеет 3 атрибута
- writable
- enumerable
- configurable 


Object.defineProperty( person, "lastname", { // также можно изменять существующее свойства
    value: "Kudelko",
    configurable: false,
    writable: false, // без записи
    enumerable: false
} );

for (prop in person) {
    console.log(prop);
}

console.log( Object.keys(person) ); 

// Расширяемость объекта - добавление новых свойств
Object.preventExtensions(person); // убирает расширяемость
console.log( Object.isExtensible(person) );

Object.freeze(person); // убирает расширяемость + только для чтения
 */










// Прототипы и наследование 
// Все объектны являются ссылочным типом данных
/* var str = "my string"; // хранит значение 
var obj = {x: 10}; // хранит ссылку

var a = 10, b = 20;
a = b;
b = 15; // a = 20

var a = {x: 10}, b = {x: 20};
a = b;
b.x = 15;
console.log( a.x ); // 15

// Любой объект в JS имеет второй связанный с ним объект - прототип
// Объект наследует свойства своего прототипа
// Это единственный вид наследование в JS
var objPrototype = {
    name: 'Vladimir'
};

var obj = Object.create( objPrototype ); //create prototype

// Это нужно допусти когда необходимо создвать много 
// однотипных объектов

var Person = {
    constructor: function(name, age, gender) {
        this.name   = name;
        this.age    = age;
        this.gender = gender;
    },
    greet: function() {
        return "Hello, my name is - " + this.name;
    }
};

var person, secondPerson, thirdPerson;

// Object.create возвращает новый объект
// Объект, создаваемый при помощи Object.create(null) 
// не имеет прототипа, а значит в нём нет лишних свойств
person = Object.create(Person);
person.constructor("Vladimir", 19, "male");
person2 = Object.create(Person);
person2.constructor("Denis", 18, "male");
person3 = Object.create(Person);
person3.constructor("Egor", 19, "male");

console.log( person.greet() );
console.log( person2.greet() );
console.log( person3.greet() );
console.log( person.age );
console.log( Person.isPrototypeOf(person) ); // является ли прототипом

// Под классом понимают множество всех объектов которые наследую свои свойства от одного прототипа
// Под наследованием понимают отношение между классами. 
// Возможность создания дочерних классов, которые будут 
// наследовать свойства родительского класса

var WebDeveloper = Object.create(Person);
WebDeveloper.constructor = function(name, age, gender, skills) {
    Person.constructor.apply(this, arguments);
    this.skills = skills || [];
}
WebDeveloper.develop = function() {
    console.log( "Developing..." );
};

var developer = Object.create(WebDeveloper);
developer.constructor("Volodya", 19, "male", ["JS", "PHP", "HTML"]);
console.log( developer.skills );
developer.develop();

// Сам потренькай с методом greet
var newGreet = Object.create(Person);
newGreet.greet = function() {
    let allArg = '';

    for (let i = 0; i < arguments.length; i++) {
        allArg += arguments[i] + " ";
    }

    return "All args: " + allArg;
}

var somePerson = Object.create(newGreet);
console.log( somePerson.greet("First", "Second", "Third") );
  */










// Традиционная реализация класса
// Конструктор - это функция, которая будучи будет вызвана
// с ключевым словом new и возвращает новый объект

/* var Person = function(_name) {
    this.name = _name; // this указывает на новый создаваемый объект
};
// Между конструктором и функцией разницы нет
// и любую функцию можно вызывать с ключевым словом new
// Различие только большая буква
console.log( Person.prototype ); //obj{}
Person.prototype.greet = function() {
    console.log( "Hello my name is " + this.name ); // повесили метод на все экземпляры 
};
console.log( Person.prototype ); //obj{ greet: greet()}

var person = new Person("Kostya");
console.log( person.name );
person.greet();

console.log( person.constructor ); //всем объектом создынным при помощи конструктора добавляется свойство construct

console.log( person instanceof Person ); // проверка на принадлнжность классу

console.log( person.prototype ); // undefinedтак не получим прототип, prototype только для функции
console.log( person.__proto__ ); // вернет прототип
// Объект, на который указывает ссылка __proto__, называется «прототипом»

// Родные методы объектов 
// Практически все объекты в JS наследуют свойства от объекта Object.prototype
console.log( person.toString() ); //Представили объект ввиде строки [Object Object]

Person.prototype.toString = function() {
    return this.name; // переопределили уже существующий метод
};

var thirdPerson = new Person("Efr");
console.log( thirdPerson.toString() );
console.log( thirdPerson + " gandon" ); //тут тоже вызовется toString()
console.log( [1, 2, 3, {name: "obj"}].toString() );

// toString у функции возвратит исходный код функции
var func = function(arg) {
    return arg + 10;
};

console.log( func.toString() );

console.log( person.valueOf() );
console.log( +person ); //NaN

Person.prototype.valueOf = function() {
    return this.name.length;
}

console.log( +person ); //6

// Получение класса объекта
console.log( {}.toString() ); // [Object Object] воторой object это класс объекта
console.log( Object.prototype.toString.call({}) );
console.log( Object.prototype.toString.call([]) ); // [Object Array]
console.log( Object.prototype.toString.call(/\w/) );
console.log( Object.prototype.toString.call(function(){}) );
console.log( Object.prototype.toString.call(12) );
console.log( Object.prototype.toString.call("word") );
console.log( Object.prototype.toString.call(false) );

var getClassObject = function(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
}

console.log( getClassObject( true ) ); */





// Цепочки методов
/* var string = "Sometimes the same is different", newString;

newString = string
    .replace("is", "is not")
    .concat(" THE END")
    .toUpperCase()
    .replace(" ", "\n")
    .slice(10);

console.log( newString );

var Vec2 = function(x, y) {
    this.x = x;
    this.y = y;
};

Vec2.prototype.add = function(vec) {
    this.x += vec.x;
    this.y += vec.y;
    return this; // возвращаем для того чтобы использовать цепочку вызова
}

Vec2.prototype.multScalar = function(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
}

var world = {
    gravity: new Vec2(0, 1),
    airResistance: .9,
    wind: new Vec2(10, 1),
    control: new Vec2(-3, -5)
}

var object = {
    position: new Vec2(10, 20), 
    speed: new Vec2(1, 3),
    update: function() {
        // Update object state
        this.position
            .add(this.speed)
            .add(world.gravity)
            .multScalar(world.airResistance)
            .add(world.wind)
            .add(world.control)
        return this;
    }
};

console.log( object.position );
var newObj = object.update();
console.log( newObj.position ); */







/* // JSON
// Преобразование объектов в строки. Для удобства хранения и передачи
var user = {
    name: "Frank",
    id: 123,
    lastVisit: Date.now(),
    friends: [2354, 7698, 1267]
};

var userData = JSON.stringify(user); //преобразовали в json формат
console.log( userData );

console.log( JSON.parse( userData ) ); //обратно в объект

//В старых браузерах нету json поэтому необходимо будет подключить скрипт
//stringify в первую очередь проверяет у объекта наличие метода toJSON
 
var secondUser = {
    name: "Lena",
    id: 123,
    lastVisit: Date.now(),
    friends: [2354, 7698, 1267],
    toJSON: function() {
        return {
            name: this.name,
            lastVisit: this.lastVisit
        }
    }
};

var secUserData = JSON.stringify(secondUser);
console.log( secUserData ); */









//String
/* var str = 'string'; //без разницы, только когда ковычк внутри строки
var str2 = "string2";

console.log("Some 'long' string");
console.log('Some "long" string');
console.log('Some \'long\' string');
console.log("Some long string".length);
console.log("Another\
 very\
 long\ string");
console.log("str\n\tstr2\\");
console.log("Hello" + " World");

var string = 'Sometimes the same is different';

//charAt - берет символ по индексу
console.log( string.charAt(1) );
console.log( string.charAt(string.length - 1) );

//substring - возвращает подстроку исходной строки
console.log( string.substring(0, 10) );
console.log( string.substring(10) );

//slice - тоже самое только может принять отрицательное значение
console.log( string.slice(-9) ); // последние 9 символов

//substr - тоже самое только другие параметры. Индекс начального и количество символов
console.log( string.substr(3, 3) );

//indexOf - поиск и возврат индекса
console.log( string.indexOf('same') );

//lastIndexOf - поиск последрнего вхождения и возврат индекса
console.log( string.lastIndexOf('i') );

//replace - заменяет подстроку
console.log( string.replace('same', 'SAME') );

//split - разбивает строку на массив
console.log( string.split(" ") );

//toLowerCase, toUpperCase - нижний и верхний регистр
console.log( string.toLowerCase() );
console.log( string.toUpperCase() ); */











/* // Arrays
// Упорядоченный набор элементов
var array = [1, 3, 6];
// [] это оператор
console.log( array  [1] );
console.log( array[111] ); //undefined

array[20] = 10;
console.log( array.length ); // 21. длина это не количество элементов, а индекс последнего + 1
console.log( typeof array );

var thirdArray = [,,,3];
console.log( thirdArray );
console.log( thirdArray[1] ); //undefined

// индекс в массиве это как свойство объекта
array['someString'] = 'someValue';
console.log( array.length ); //21

array.length = 5; // при присвоениии длины все индексы большие за этот удаляются
console.log( array );

delete array[0]; //length не изменится
console.log( array );
console.log( array.length );

console.log( Array.isArray(array) );

// Methods
var arr = ["Some string", "Second String", "Third String"];

//join - конкатинирует все эл. в одну строку
console.log( arr.join(" ") );

//reverse - перевернет
console.log( arr.reverse() ); // изменит и сам массив

//sort - в алфавитном порядке
console.log( arr.sort() );

//concat - конкатинирует массив с массивом или какими-либо элементами
console.log( arr.concat( "String1", ["String2", "String3"] ) );

//slice - берет все элементы с .. по ..
console.log( arr.slice(2) );

//splice - удаление эл и вставка эл
arr.splice(1, 1, "Sorax", "WebDev");
console.log( arr );

//push - добавление в конец
arr.push("Some elem");
console.log( arr );

//unshift - добавляет вначало 
arr.unshift("Some elem2");
console.log( arr );

//pop - удаляет последний элемент
arr.pop();

//shift - удаляет первый элемент
arr.shift();
console.log( arr ); */









// More arrays methods
// все расмотренные тут методы не изменяют исходный массив,
// за исключением когда изменяем в callback функции
/* var arr = ["Some string", "Second String", "Third String", "JS", "PHP"];

// forEach
arr.forEach(function (element, index, array) {
    array[index] = element.toUpperCase();
});

console.log( arr );

// map - возвращает новый массив каждый элемент корого
// формируется из значений коорые возвращаются из функции
console.log( arr.map(function(e) {
    return e.toLowerCase();
}) );

//filter - позволяет отсеять какие либо элементы по критерию
console.log( arr.filter(function(e) {
    return e.indexOf('o') === -1;
}));

//every - вернет тру если для каждого элемента будет выполнено
// какое-либо условие
console.log( arr.every(function(e) {
    return e.length >= 4;
}) );

//some - тоже что every только тут хотя бы один элемент
// соответсует условию
console.log( arr.some(function(elem , index, array) {
    return array[index].indexOf('s');
}) );

//reduce - на каждой итерации. Выполняется callback для каждого элемента
// с сохранением промежуточного результата
//reduceRight - тоже самое чтобы справо налево
var arrNumbers = [10, 20, 30 ,49, 20];
var reduced = arrNumbers.reduce(function(previousValue, currentValue) {
    return previousValue + (currentValue % 2 === 0 ? currentValue : 0);
});

console.log(reduced);

//IndexOf - для поиска первого вхождения
console.log( arrNumbers.indexOf(20) ); // -1 если не нашелся элемент

//LastIndexOf - для поиска последнего вхождения элемента
console.log( arrNumbers.lastIndexOf(20) ); */











// Class Date
// для работы даты и времени
/* var date = new Date();
console.log( date );

var date2 = new Date(1990, 3, 1);
console.log( date2 );

// methods for getDate
console.log( 
    date.getDay() + " - " + 
    date.getHours() + ":" + 
    date.getMinutes() + ":" +
    date.getSeconds() + ":" + 
    date.getMilliseconds() + "\nYear:" +
    date.getFullYear()
);

//methods for setDate
console.log(
    date.setDate(15) + " " +
    date.setHours(12)
);

// вся дата отсчитывается от 1 января 1970 в миллисекундах
console.log( date.getTime() );
console.log( date.getUTCHours() ); //UTC

console.log( date.toTimeString() ); // только время ввиде строки
console.log( date.toDateString() ); // только дату

console.log( date.toLocaleTimeString() ); // с учетом локализации
console.log( date.toLocaleDateString() );

//now - статический метод. возвращает миллисекунды
console.log( Date.now() ); */












//Math
/* console.log( Math.pow(2, 5) );
console.log( Math.sqrt(25) );
console.log( Math.abs(-300) );
console.log( Math.round(2.25) );
console.log( Math.ceil(2.25) ); // округление в >
console.log( Math.floor(2.25) ); // округление в <
console.log( Math.exp(23) );
console.log( Math.log(12) );
console.log( Math.sin(1) );
console.log( Math.cos(Math.PI) );

console.log( Math.random() ); // от 0 до 1
console.log( -10 + Math.random() * 20 );

var getRandom = function(min, max) {
    return Math.random() * (max - min) + min;
};

console.log( getRandom(-100, -50) );
 */









//Регулярные выражения - символьный шаблон для поиска подстрок
//литерал RegExr выделяются / /flags (g - global, i - ignore case)
//[] - объединение символов в классы
//[aoeiuy] - все гласные буквы
//[A-Z] - диапазон. Тут найдем все заглавные буквы
//[0-5] - цифры от 0 до 5
//[^0-9] - ^ - все символы кроме 0, 1 .. 9
//\d - все цифры, то есть = [0-9]; \D = [^0-9]
//\w - все символы которые являются буквами или цифрами
//\W - не являются буквами или цифрами ( , -, .)
//\s - все пустые символыч - \S - не пустые
//\b - границы слова. \ban\b найдет артикли an
//\B - не являются границами. \Bos\B - hostel
// | - лог. или. Прим. and | me
// center, centre - cent(er | re)
// ? это символ необязателен
// . - один любой символ кроме переноса строки
// {3} показывает сколько раз должен применится токен 
// {2, 6} повтор от двух до 6 раз
// {2, } два и более
// Жадное и нежадное повторения. Жадное будет брать как можно большое количество повторений a{3,10}e
// Нежадное - по минимуму a{2, 10}?e
// + - один и больше раз
// * - 0 и больше и раз
// ^ - начало строки; $ - конеци строки
// (?= что мы хотим видить после слова)
// ?! - отрицание. (?! know) нету слова know
// Группы. Допутим хотим найти в тексте все mails
// (1 group)....(2 group)
// java(script)? - эта группы необязательная часть 
// java(?:script)? - тоже самое только без запоминания

/* var pattern = new RegExp("\w+", "gim");
// flags: g - global;
//        i - ignore case
//        m - multiline
var secondPattern = /\w+/g; // так лучше юзать 
var string = "How we survive is what   makes ua who we are";

console.log( string.match(secondPattern) ); // возвратит массив строк которые соответствую шаблону
console.log( string.search(secondPattern) ); // вернет индекс первого matcha
console.log( string.split(/[\s,]+/) );

console.log( pattern.global );
console.log( pattern.multiline );
console.log( pattern.ignoreCase );
console.log( pattern.lastIndex ); // без global будет обновляться

console.log( secondPattern.test(string) ); //true проверяет или замэчилось что-либо
console.log( secondPattern.exec(string) );
console.log( secondPattern.lastIndex );


var input  = document.getElementsByClassName('input')[0],
    output = document.getElementsByClassName('output')[0],
    voc = {
        name: 'Vladimir',
        title: 'JavaScript',
        resource: 'YouTube'
    };

// назначение обработчика
input.addEventListener('keyup', function() {
    output.innerHTML = this.value.replace(
        /\{\{(\w*)\}\}/,
        function(match, valueFirstGroup) {
            return voc[valueFirstGroup];
        }
    );
}, false);
 */

 











/* //use strict
//для усранения неполадок, слабых мест в языке, улучшение отладки
// Например with считается плохой частью js поэтому в yse strict ее просто нет
'use strict'; //strict mode
var obj = {
    name: 'Sorax'
};

with (obj) {
    console.log( name );
} 

var func = function() {
    console.log(this); //window; strict mode - undefined
}

func();

//в SM все переменные должны быть объявлены
// city = 'Minsk';
//console.log(city); 

var object = {};
Object.defineProperty(object, 'gender', {
    value: "male",
    writable: false,
});

//object.gender = 'female'; //без use strict ничего не произойдет
console.log( object.gender );

object.preventExtensions(); //запрещает добавление новых свойств 
//object.newProp = 'new prop';


// в Strict Mode запрещено давать одинаковые название свойствам
// восьмиричная СС */
















// 31
/* var MyVar, doSomething;

doSomething = function() {
    alert( 'Your typed: ' + myVar );
}

window.addEventListener('mousemove', function(e) {
    console.log( "X: " + e.offsetX, "Y: " + e.offsetY)
}); */










//32 Window
/* var globalVariable = "value";
console.log( window );
console.log( window.globalVariable );

window.myVar = 50;
console.log( myVar );

// Все объекты, методы, конструкторы и т.д. принадлежат window
var arr = new window.Array(10, 20, 30);
console.log( arr );

console.log( window.parseInt("1000px") );
window.console.log( parseInt("1000px") );

//итепритатор всегда ищет объект на window
console.log( window.window.arr );

// объекты window: document, location, navigator, screen, history
setTimeout(function() { // делает действие спустя какое-то время
    console.log("2 second passed");
}, 2000); //выполняется асинхронно и не останавливает скрипт

console.log( "Synchronous" );

var count = 0;
var timer = setInterval(function() { //выполняет действие многократно
    var elem = document.getElementById('blink');

    if ( count === 0 ) {
        elem.style.display = 'none';
        count++;
    } else {
        elem.style.display = 'block';
        count = 0;
    }
    
}, 1000);

console.log( timer ); //id счетчика его нужно передать в clearInterval чобы остановить счетчик

window.addEventListener('click', function() {
    clearInterval(timer);
    //clearTimeOut - аналогична
});



// Создание диалогового окна
// alert("Hello") // - а том что прерывает работу скрипта
// console.log( "hello" );

var start = function() {
    console.log('started');
}

confirm("Ok/Cancel") && start(); //true/false //согласиться или нет


console.log(
    prompt("Your age?") >= 18 
        ? "Access open" 
        : "Access denied" 
);

var url;

window.addEventListener('click', function() {
    url = window.open('https://google.com');
});
 */

















//33 Location - позволяет работать с адресной строкой браузера
/* console.log( window.location );
location.hash = "Anything"; //все что идет после #

window.onhashchange = function() {
    console.log( location.hash.slice(1) );
};

// location.href = 'https://google.com';
// location = 'https://google.com'; тоже самое

// toString у location вернет href;
console.log( "Current URL is: " + location );

//? после вопросика это то что передается серверу через get запрос
location.search = "mysearch";

//reload - обновление страницы
//location.reload();

//assign - переход по адресу
//location.assign('https://google.com');

//replace - тоже самое, только перед тем как перейти уберет 
//текующую страницу из истории и мы не сможем вернуться назад
//location.replace('https://google.com');

 
//encodeURI - заменяет все не ASCII символы на escape последовательности
var encode = encodeURI(
    "https://google.com/page?name=Какое то имя"
);

console.log(encode);

//decodeURI - наоборот
console.log( decodeURI(encojs/jsde) ); */











//34 navigator, screen, history
// screen - инфа о экране
/* console.log(
    "Width: " + screen.width,
    "Height: " + screen.height
);

console.log(
    "Width: " + screen.availWidth, //максимально доступная ширина не в полноэкранном режиме
    "Height: " + screen.availHeight
);

console.log( screen.colorDepth ); //глубина цвета. бит на пиксе

// navigator - инфа о браузере и платформе
console.log( navigator );

// Нам необходимо проверить поддерживает ли браузер HTML5
// Мы просто будем смотреть есть ли у нас соответсвующие методы

console.log( history.pushState );

if (history && history.pushState) {
    // do something
}


// history - управление историей браузера
console.log( history.length );
//history.back(); // возвратиться на предыдущую страницу
//history.forward(); // на следующую

//history.go(-2); // на две страницы назад
//history.go(2);


// Для перехода по страницам (назад или вперед)
// нужно использовать 1. хеши url; 2. HTML5 History API

// 1. способ
var updateState, 
    contentEl, 
    navEl,
    updateButtons,
    links = {
        main: "This is the <strong>Main</strong> page",
        about: "This is the <strong>About us</strong> page",
        downloads: "This is the <strong>dowloads</strong> page"
    };

contentEl = document.querySelector('.content'); // возвращает только первый такой элемент
navEl     = document.querySelector('.nav');

updateState = function(state) {
    if (!state) 
        return;

    contentEl.innerHTML = links[state.page];
    updateButtons(state);
    //var content = links[location.hash.slice(1)];
    //contentEl.innerHTML = content || "Page not found"; 
};

updateButtons = function(state) {
    [].slice.call( navEl.querySelectorAll('a') )
        .forEach(function(e) {
            var classList = e.parentNode.classList;

            e.getAttribute('href') === state.page
                ? classList.add('active')
                : classList.remove('active');
            
            
        });
};

//Событие popstate вызывается, когда изменяется активная 
//запись истории. Если изменение записи истории было 
//вызвано методом history.pushState() или 
//history.replaceState(), то состояние события popstate 
//будет содержать state копии входящего в историю объекта

window.addEventListener('popstate', function(e) {
    updateState( e.state );
});

//window.onhashchange = updateState;
//window.onload       = updateState;

// Всплытие - При наступлении события обработчик сработает
// на самом вложенном элементе затем на его родителе
// target позволяет узнать целевой элемент на котором произошло событие
// a -> li -> ul
navEl.addEventListener('click', function(e) {
    var state;

    if ( e.target.tagName !== 'A' ) 
        return;

    state = {
        page: e.target.getAttribute('href')
    };
    
    history.pushState( state, '', state.page ); // добавляет новое состояние в историю браузера
    updateState( state );

    e.preventDefault(); // отменяет событие
    return false; // тоже самое
}); */












//35
//DOM - Document Object Model
//парсинг - браузер получает html код и преобразовывает в набор сущностей над которыми можно оперировать программно

// пример
// Браузер прочитал весь код index.html узнал из него что также
// нужно скачать css, отправил запрос на скачку css, скачал css
// распарсил css, узнал из него что текст должен быть оранжевым
// затем отрендерил все эти элементы в окне браузера ......
// и потом браузер предоставляет интерфейс для работы, который
// называется DOM
// appendChild - добавляет элемент в узел


// Каждый объект DOM дерева являются НОДАМИ
//console.log( document.constructor.prototype );



var flag = 0,
    content = document.querySelector('.text');


setInterval(function() {
    if ( !flag ) {
        content.innerHTML = "Kudelko";
        flag++;
    } else {
        content.innerHTML = content.innerHTML + "_";
        flag = 0;
    }
}, 750);








// ООП. Внутренний и внешний интерфейс
"use strict"

/* function CoffeeMachine(power) {
    this.waterAmount = 0; // свойства записанные через this - публичные

    var WATER_HEAT_CAPACITY = 4200;

    var getBoilTime = function() {
        return this.waterAmount * WATER_HEAT_CAPACITY * 80 / power;
    }.bind(this)
    
    function onReady() {
        console.log( 'Cup of coffee is ready!' );
    }

    this.run = function() {
        console.log( getBoilTime() );
        setTimeout(onReady(), getBoilTime());
    }
}


var coffeeMachine = new CoffeeMachine(100);
coffeeMachine.waterAmount = 200;

coffeeMachine.run(); */









// ещё один способ обхода
/* function CoffeeMachine(power) {
    this.waterAmount = 0;

    var WATER_HEAT_CAPACITY = 4200, // приватная константа
        self = this, // ещё один способ доступа через замыкание
        idTimeOut;

    function getBoilTime() {
        return self.waterAmount * WATER_HEAT_CAPACITY * 80 / power;
    }

    function onReady() {
        alert( 'Кофе готово!' );
    }

    this.run = function() {
        idTimeOut = setTimeout(onReady, getBoilTime());
    };

    this.stop = function() {
        clearTimeout(idTimeOut);
        console.log( 'Making coffee stoped!' );
    }

}

  var coffeeMachine = new CoffeeMachine(50000);
  coffeeMachine.waterAmount = 200;
  
  coffeeMachine.run();
  coffeeMachine.stop(); // кофе приготовлен не будет
 */












// Getter, Setter
/* function CoffeeMachine(power, capacity) {
    var waterAmount = 0,
        self = this;

    const WATER_HEAT_CAPACITY = 4200;

    function getTimeToBoil() {
        return waterAmount * WATER_HEAT_CAPACITY * 80 / power;
    }

    // Setter
    this.setWaterAmount = function(amount) {
        if (amount <= 0)
            throw new Error("Value should be more than 0");

        if (amount > capacity)
            throw new Error("You can not pour more than " + capacity);

        waterAmount = amount;
        self.run();
    };

    //Getter
    this.getWaterAmount = function() {
        return waterAmount;
    };

    //Union getter & setter
    this.waterAmount = function(amount) {
        if (!arguments.length)
            return waterAmount;

        if (amount <= 0)
            throw new Error("Value should be more than 0");

        if (amount > capacity)
            throw new Error("You can not pour more than " + capacity);

        waterAmount = amount;
    };

    function onReady() {
        alert( 'Кофе готов!' );
    }

    this.run = function() {
        setTimeout(onReady, getTimeToBoil());
    };

}
  
var coffeeMachine = new CoffeeMachine(1000, 500);

coffeeMachine.setWaterAmount(50);
console.log( coffeeMachine.getWaterAmount() );

coffeeMachine.waterAmount(100);
console.log( coffeeMachine.waterAmount() );




function User() {
    var firstName,
        surName
    
    this.setFirstName = function(value) {
        if ( !value )
            throw new Error('Argument not found');

        firstName = value;
    }

    this.setSurname = function(value) {
        if ( !value )
            throw new Error('Argument not found');

        surName = value;
    }

    this.getFullName = function() {
        return "Firstname: " + firstName + " Surname: " + surName;
    }

}
  
var user = new User();
user.setFirstName("Петя");
user.setSurname("Иванов");

alert( user.getFullName() ); // Петя Иванов */

    









/* function Machine(power) {
    this._power   = power;
    this._enabled = false; // защщенное свойство

    this.enabled = function() {
        _enabled = true;
    };

    this.disabled = function() {
        _enabled = false;
    };

}

function CoffeeMachine(power) {
    Machine.apply(this, [power]); // унаследовали
    // есть проблема: наследник не получает доступ к 
    // свойствам родителя. Поэтому их надо делать 
    // публичными, и желательно начиная с _
    console.log(this._enabled);

    var waterAmount = 0,
        parentEnabled = this.enabled; // скопировали метод родителя

    this.enabled = function() {
        parentEnabled.call(this); // вызвали старый
        // code ... // и расширили его
    }


    this.setWaterAmount = function (amount) {
        waterAmount = amount;
    };

}

var coffeeMachine = new CoffeeMachine(10000);

coffeeMachine.enabled();
coffeeMachine.setWaterAmount(100);
coffeeMachine.disabled(); */





/* var Person = function(name, surName) {
    this._personName    = name || "No name";
    this._personSurName = surName || "No surname";
};

var WebDeveloper = function(name, surName, skills) {
    Person.apply(this, [name, surName]);

    this.name    = this._personName || "No name";
    this.surName = this._personSurName || "No surname";
    this.skills  = skills || [];
};

WebDeveloper.prototype.sayHi = function() {
    console.log( "Hello my name is " + this.name );
};

WebDeveloper.prototype.mySkills = function() {
    var allSkills = '';

    this.skills.forEach(element => {
        allSkills += element + "; ";
    });

    return "My skills: " + allSkills;
};

var pasha = new WebDeveloper( 'Pasha', 'Stasevich', ['c#', 'c++', 'js', 'css', 'html'] );
pasha.sayHi();
console.log( pasha.mySkills() ); */











/* function showList() {
    console.log( Array.prototype.join.call(arguments, " - ") );
} // мы можем изменять существующие прототипы

showList("Denis", "Vova", "Egor");


// Примитивы
var a = "stroke";
a.age = 10; //времено был создан и тут же исчез

console.log( a.age );

var num = new Number(0);

if (num) // obj
    console.log( "0 is true?!?" );


Function.prototype.deffer = function(time) {
    setTimeout(this, time);
};

function f() {
    alert('Hello');
}

f.deffer(1000);


// ООП в функциональном стиле 
// Обычный конструктор в котором объявлены свойства и методы
// ООП в прототипном стиле
// Обычный конструктор в котором свойства, а все методы 
// записываются в prototype

// достоинства
// Функциональный стиль записывает в каждый объект и 
// свойства и методы, а прототипный – только свойства. 
// Поэтому прототипный стиль – быстрее и экономнее по памяти.

var Animal = function(name) {
    this._name = name;
}

Animal.prototype.sayHi = function() {
    console.log( this._name ); // Ещё недостаток область видимости
};

var elephant = new Animal("Слон");
elephant.sayHi();





// Наследование
// через __proto__ реализуется наследование

var Animal = function (name) {
    this.name  = name;
    this.speed = 0;
    this.legs  = 0;
}

Animal.prototype.run = function(speed) {
    this.speed += speed;
    alert( this.name + ' бежит, скорость ' + this.speed );
};

Animal.prototype.stop = function() {
    this.speed = 0;
    alert( this.name + ' стоит' );
};

Animal.prototype.countLegs = function (legs) {
    this.legs += legs;
    return this.legs;
};

// Вызов конструктора родителя
var Rabbit = function (name) {
    Animal.apply(this, arguments);
}
  
// Порядок поиска свойств должен быть таким
// rabbit -> Rabbit.prototype -> Animal.prototype
// Для этого можно поставить ссылку __proto__ с 
// Rabbit.prototype на Animal.prototype.

// задаем наследование
Rabbit.prototype = Object.create(Animal.prototype);
Rabbit.prototype.constructor = Rabbit;

Rabbit.prototype.jump = function() {
    this.speed++;
    alert( this.name + ' прыгает со скоростью ' + this.speed );
};

Rabbit.prototype.run = function(speed) {
    this.speed = speed || this.speed;
    this.jump();
};

Rabbit.prototype.countLegs = function() { // Расшир метод
    var legs = Animal.prototype.countLegs.apply(this, arguments)
    console.log( "I have " + legs + " legs" );
};

var rabbit = new Rabbit('Кроль');
rabbit.run(10);
rabbit.countLegs(4); */
















// Instanceof
// Вызов obj instanceof Constructor возвращает true, если 
// объект принадлежит классу Constructor или классу, 
// наследующему от него.

/* function Rabbit() {}

var rabbit = new Rabbit();

console.log( rabbit instanceof Rabbit );


// наследование от Error
console.log( new Error().stack );
//throw new Error( "Mess" ); */
















// Примеси
// В JS невозможно унаследовать от двух и более объектов.
// Ссылка __proto__ только одна

//примесь
var sayHiMixin = {
    sayHi: function() {
        console.log( 'Hi ' + this.name );
    },
    sayBye: function() {
        console.log( 'Bye ' + this.name );
    }
};

var User = function(name) {
    this.name = name || 'no name';
}

// Использование
for (var key in sayHiMixin) {
    User.prototype[key] = sayHiMixin[key];
}

var person = new User('Egor');
person.sayHi();
person.sayBye();



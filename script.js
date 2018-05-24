'use strict'; // строгий режим (современный стандарт)
alert("Waiting...");
document.write('Hello World<br>');
var x = 10
x = 20; var y = 10, z = 5; 
/* 
    в конце можно не ставить ; т.к. оно закроется концом строк
    но есть исключения для инструкци которые завершаются ссылкой
    на переменную или функцию и первый символ новой строки ( или {
*/
// Variables
/* Могут начинатся с _ или $, но не с цифр */
/* Точку с запятой можно не ставить если есть перенос строки, но по стандарту лучше ставить */
var toys = [
    'bat', 'ball', 'puzzle', 'train'
]
var face = [
    ['R', 'G', 'Y'],
    ['W', 'R', 'O'],
    ['Y', 'W', 'G']
]
document.writeln('face[1][2] - ' + face[1][2]);
[1, 2].forEach(alert);
// можно объявлять переменные русскими буквами, но не рекомендуется
// num = 5; в старых стандартах так можно было делать, но в современных нет. В IE8 тоже нельзя без var
var COLOR_GRAY = "#F2F2F2";
// если несколько операторов, то используется приоритет
// унарные операторы находятся выше приоритетом
var a = 1, b = 2;
var c = 3 - (a = b + 1); // a = 3; c = 0
// инкримен/дикримент только к переменной 5++ !!! нельзя
var i = 1;
var a = ++i; // префиксная форма. a = 2
var i = 1;
var a = i++; // постфксная форма. a = 1
// побитовые &, |, ^, ~, <<, >>, >>>
// сокращенная арифметика с присваиванием
var n = 2;
n += 5; // 7
a = (5, 6, 7); // a = 7
var r = 3 > 4;
var e = 'Б' > 'А'; // true сравнивает побуквенно
var e1 = 'a' > 'Я'; // true СТРОЧНЫЕ БУКВЫ БОЛЬШЕ ПРОПИСНЫХ
var e2 = 'Банан' > 'Аят'; // true Т.к. первая буква больше 1 строки больше, значит и вся строка больше
// alert (+'2' > +'14'); false
// при сравнении различных типов все приведется к числовому
var v = '2' > false;
// строгое равенство 
// alert (0 === false); // false
// сравнение null и underfined
// null == underfined и не равны чему либо другому
// при преобразовании в число null = 0; underfined = NaN
// null > 0 false; null == 0 false; null >= 0 true
// потому что при сравнении приводится к числу 0
// а при проверке на равенство null == underfined
// значение underfined вообще нельзя сравнивать
var dv = 255;
document.writeln(dv.toString(2));
// побитовые операторы также используются для округления в десятичной системе
var a = ~~12.345;
var a = 12.345 ^ 0;
// умножение и деление на 2
var a = 1 << 3; // 1*(2*2*2) = 8
var b = 8 >> 2; // 8/(2*2) = 2
// prompt("Title", "Text");
var isAdmin = confirm("You are admin?");
document.writeln(isAdmin);
var age = 14;
var access = (age > 18) ? true : false; // Тернарный оператор
console.log(access);
var message = (age < 3) ? 'Привет, малыш' :
    (age < 18) ? 'Привет' :
    (age < 99) ? 'Здравствуйте' :
    'Странный возраст';
 
var undef, zero = 0, emptyStr = '', msg = 'Привет';
var result = undef || zero || emptyStr || msg; // Ничего не преобразовывает, а просто ищет первое значение trur иначе выводит последнее
console.log(result);
console.log(1 && 2);
console.log(1 && 2 && 3);
console.log(1 && 2 && null && 3);
// Приоритет && больше чем у ||
console.log(5 || 1 && 0); 
console.log(!!'stroke');
// строковое преобразование
console.log(String(null) === 'null');
console.log(true + "test"); // происходит преобразование если один из аргументов строка
// численное преобразование
console.log(+"123");
console.log(Number("123"));
var x = 2;
switch(x) {
    case 1: x = 1;  break;
    case 2: x = 2;  break;
    case 3:
    case 5: x = (3, 5); break;
    default: x = x; break;
}

// function 
var userName = 'Admin'; 

function showMessage() {
    userName = 'Vladimir';
    var mess = 'Hello, i am ' + userName;
    alert(mess);
}
showMessage();
console.log(userName);
// alert(mess); //!!!!!!
function dialogMessage(from, text) {
    if (text === undefined)
        text = "You don\'t send message";
    console.log(from + ': ' + text);
    // return без аргумента возвращает undefined
}
dialogMessage('Vladimir', 'Denis, how are you?');
dialogMessage('Denis', 'I am fine, thank you!');
dialogMessage('Denis');

// В JS функция являктся значением (Function expression)
// Function Declaration. Функция объявлена в основном 
// потоке кода и создаются интерпретатором до выполнения кода
// Поэтому мы може вызвать функцию как до её объявления так и после
function sayHi() {
    alert('Hi');
}

var func = sayHi;
func();

// Function Expression. Объявление функции в контексте выражения
var func2 = function sayHi2(person) {
    console.log('Hello ' + person);
}
func2('Ahrem');

/**
 * Ask your question and return result
 * @param {string} question Question
 * @param {function} yes Function for positive answer
 * @param {function} no  Function for negative answer
 */
function ask(question, yes, no) {
    if ( confirm(question) ) yes();
    else no();
}

ask(
    "Are you agree?",
    function() { console.log("You agree!"); }, // Анонимные функции
    function() { console.log("You don\'t agree"); }
);

var summ = new Function('a, b', 'return a + b');
console.log( summ(10, 90) );
// При любом вложенном вызове JS запоминает текущий контекст выполнения
// в специальной внутренней структуре данных - 'стеке контекстов' 
var f = function sayHi() { 
    alert(sayHi); // Named Function Expression. Доступна только изнутри
}

// .вспомогательная функция
var str = "Hello, world";
console.log(str.length);
console.log(str.toUpperCase());

var number = 12.345;
console.log(number.toFixed(2));
console.log(12..toFixed(2));

// Числа
console.log(3e5);
console.log(+" \n34  \n")
console.log( parseInt('12px', 10) );
console.log( parseFloat('12.2.3') );
var n = 255;
console.log( (n.toString(16)) );
Math.floor(3.1);  // 3
Math.ceil(3.1);   // 4
Math.round(3.1);  // 3 round лучше toFixed
console.log(Math.round(3.456 * 100 ) / 100);
console.log(0.1 + 0.2); // Потому что на число выделяется ровно 8 байт
// 0.1 записывается в 10-ом формате но в 2 сс
var num = 123456789;
console.log( num.toLocaleString() );
let strokee = 'jQuery';
console.log(str.charAt(0)); // or str[0];
// charAt возвратит пустую скобку если нет такого символа, а str[] undefined

// Строки
console.log("Interface"[0].toLocaleLowerCase());
var str = "Widget with id";
str.indexOf("with"); //7
str.indexOf('widget'); // -1, поиск учитывает регистр
console.log( str.substring(1, 3) ); // подстрока с позиции до позиции не включаю справа
console.log( str.substr(3, 3) ); // от позиции длинной n
// slice тот же смысл что и substring, только с отрицательными подругому работают

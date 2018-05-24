// Объекты как ассоциативные массивы
// Ассоциативный массив хранит пару ключ-значение
// Create object. 2 variants
var o = new Object();
var o = {};

var person = { 
    surname: 'Kurmashev',
    'lastname': 'Dmitrievich',
    params: {
        height: '180sm',
        weight: '70kg'
    } 
};
person.name = 'Denis';
person['age'] = 18;
console.log( 
    person.name + ' ' + 
    person.surname + ' ' + 
    person.age 
);
delete person.age;
if ("age" in person)
    console.log('Age exist in person');
else console.log('Age not exist in person');

if (person.lalala === undefined) console.log('undefined');

// for .. in перебор по свойствам
var counter = 0;
for (var key in person) {
    console.log( 'Key: ' + key + ' Value: ' + person[key] );
    counter++;
}

var person2 = person;
person2.lastname = 'Another';
console.log( person.lastname ); // Another, потому что копируется по ссылке
var keys = Object.keys(person);
console.log( keys );

// Arrays
var arr = [];
var fruits = ['Apple', 'Grape', 'Chary'];
var len = fruits.length;
alert( fruits );
console.log( fruits.pop() );
fruits.push('Banan');
console.log( fruits );
console.log( fruits.shift() );
fruits.unshift('Limon');
console.log( fruits );

fruits[99999] = 5; // Так можно
fruits.name = 'Some name'; // И так можно
console.log( fruits );
// length - это не количество элементов, а последний индекс + 1

var matrix = [
    [1, 2, 3],
    [3, 4, 5],
    [6, 7, 8]
];
console.log( matrix[1][1] );

// split
var names = 'Маша, Петя, Марина, Василий';
var arr = names.split(', ');

// join
var joinNames = arr.join(',');
console.log( joinNames );
delete arr[0];

// splice
var arr = ['I', 'am', 'learning', 'JS'];
arr.splice(0, 2, 'We', 'are');
console.log( arr.join(' ') );

// slice. copy sector array
// sort
function compareNumeric(a, b) {
    if (a > b) return 1;
    if (a < b) return -1;
}
  
var arr = [ 1, 2, 15 ];
arr.reverse(); // 15, 2, 1
arr.sort(compareNumeric);
console.log( arr );
var newArr = arr.concat(-3, -4); // 1, 2, 15, -3, -4

// Методы перебора
newArr.forEach(function(item, i, arr) {
    document.writeln( i + ": " + item + " (array: " + arr + ")" );
});

var positiveArr = newArr.filter(function(number) {
    return number > 0;
});

var nameLength = fruits.map(function(name) {
    return name.length;
});

// Arguments. This is collection
function sayArguments(first, second) {
    first  = first  || 'first';
    second = second || 'second'; // || Значение по умолчанию
    let args = '';

    for (let i = 0; i < arguments.length; i++) {
        args += arguments[i] + ' ';
    }
    console.log( 'Arguments: ' + args );
}
sayArguments('arg1', 'arg2', 'arg3');

var student = {
    university: 'Belstu'
}

// Добавить к student свойства из person
// copy(student, person, person2);
// var studentClone = copy({}, student);

// Date 
var start = new Date();
var now = new Date();
document.writeln( '<br>' + now );
var jan1_2011 = new Date(2011, 0, 1);
document.writeln( jan1_2011 );
document.writeln( '<br>Year: ' + jan1_2011.getFullYear() );
document.writeln( '<br>UTCHours: ' + now.getUTCHours() );
jan1_2011.setDate( jan1_2011.getDate() + 2 );
document.writeln( '<br>New date: ' + jan1_2011 );
var end = new Date();
document.writeln("<br>Passed the time: " + (end - start) + 'ms');

// Benchmarking
var arr = []
for (let i = 0; i < 1000; i++) arr[i] = 0;

function walkIn(arr) {
    for (let i in arr) arr[i]++;
}
function walkLength(arr) {
    for (let i = 0; i < arr.length; i++) arr[i]++;
}
function bench(func) {
    var date = new Date();
    for (var i = 0; i < 10000; i++) func(arr);
    return new Date() - date;
}

console.log( "Time walkIn: " + bench(walkIn) + 'ms' );
console.log( "Time walkLength: " + bench(walkLength) + 'ms' );
console.time("walkIn");
bench(walkIn);
console.timeEnd("walkIn");

// Форматированный вывод
var date = new Date(2014, 11, 31, 12, 30, 0);

var options = {
    era: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
};

document.writeln( '<br>' + date.toLocaleString('ru', options) );
document.writeln( '<br>' + date.toLocaleString('en-US', options) );

// Без форматирование
document.writeln( date.toString() );

var msUTC = Date.parse("2012-01-25T13:51:50.417Z"); // разбирает строку и возвращает количество миллисекунд
document.writeln( '<br>' + msUTC );
document.writeln( '<br>' + Date.now() );
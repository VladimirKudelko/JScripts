// DOM - объектная модель документа, это дерево, иерархия
// DOM нужен для того, чтобы манипулировать страницей
document.body.style.backgroundColor = 'red';
setTimeout(() => { 
    document.body.style.backgroundColor = 'yellow' 
}, 1000);

console.log( document.body );
console.log( document.childNodes.length ); // 2 (head, body)

for (let i = 0; i < document.body.childNodes.length; i++) {
    //console.log( document.body.childNodes[i] ); // только для чтения
}
console.log( document.body.childNodes.length );


console.log(
    document.body.childNodes[0] === document.body.firstChild // true
);

// DOM - это коллекция (или псевдо-массив), а не массив. 
// В нем нет forEach, push
// Но можно это исправить
// 1. Способ
var elems = document.body.childNodes;

[].forEach.call(elems, (elem) => {
    console.log(elem.tagName);
});

// 2. Способ
var elems = document.body.childNodes;
elems = Array.prototype.slice.call(elems);

elems.forEach((value) => {
    console.log(value.tagName);
});

// ----
console.log('------');
for (let i = 0; i < document.body.children.length; i++)
    console.log(document.body.children[i]);
// Теперь выведет не все узлы, а только узлы-элементы

console.log( document.body.firstElementChild );


console.log( window['content-holder'] ); // найдет id

let content = document.getElementById('content_holder');
content.style.backgroundColor = 'green';

console.log( content == window['content_holder'] ); //true


let table = document.getElementById('age-table'),
    allInputs = table.getElementsByTagName('input'); // * - все потомки

for (let i = 0; i < allInputs.length; i++) {
    console.log(
        allInputs[i].value + ' ' + allInputs[i].checked
    );
}

document.getElementsByName('age'); // все с атрибутом name=age
let articles = document.getElementsByClassName('article'); // все где встречается класс article

for (let i = 0; i < articles.length; i++)
    console.log( articles[i].innerHTML );


// Возвращает все элементы внутри elem
var elements = document.querySelectorAll('ul > li');

for (let i = 0; i < elements.length; i++)
    console.log( elements[i].innerHTML );

// Вернет первый ul
var element = document.querySelector('ul');

console.log( element.innerHTML );

// matches - проверяет удовлетворяет ли elem css селектору
if (element.matches('ul'))
    console.log('ul соответсвует ul');
else console.log('Не соответствует');


// closest - ищет ближайший элемент выше по иерархии
// Ищет ближайший элемент выше по иерархии DOM




// Классы, Иерархия DOM
// Разные узлы являются объектами различных классов
console.log( document.body instanceof HTMLBodyElement );
// console.dir( document.body ); // dir выводит элемент ввиде JS-объекта

console.log( document.body.nodeName );
//document - корень

// innerHTML позволяет получить содержимое элемента ввде строки
document.getElementById('content').innerHTML = '<div>Some content</div>';

// в innerHTML всегда валидный код, если запишим <b>text , то он закроет тег
// для таблиц в IE9 innerHTML только для чтения
// innerHTML += осуществляется перезапись
document.getElementById('content').innerHTML += '-How are you?';
document.getElementById('content').innerHTML += '-I\'m fine. Thank you.'

// script выполняться не будет в innerHTML
// outerHTML содержит html элемент целиком
console.log( document.getElementById('content').outerHTML );

// Изменить outerHTML элемента нельзя

for (let i = 0; i < document.body.childNodes.length; i++)
    console.log( document.body.childNodes[i].data );
// прочитали текстовые узлы и коментарии при помощи data

// Свойство textContent содержит только текст внутри элемента, 
// за вычетом всех <тегов>.
var el = document.body.getElementsByTagName('ul')[0];

console.log( el.textContent );
// Лучше использовать, когда мы хочем вставить текст

// hidden
el.hidden = true;
setTimeout(() => { el.hidden = false; }, 1000);

// value – значение для INPUT, SELECT или TEXTAREA
// id – идентификатор
// href – адрес ссылки


// Аттрибуты
var el = document.getElementById('elem');

console.log( el.getAttribute('about') );
el.setAttribute('Test', 'testAttr');

console.log( el.getAttribute('Test') );
// hasAttribute, removeAttribute
// нужно использовать setAttribute('sd', 123), 
// а не el.value = 123
console.log( document.body.className );


// classList - объект для работы с классами
var classList = document.getElementsByClassName('article')[0].classList;
classList.remove('article');
//add, remove, toggle - если класса нет, то добавляет, иначе удаляет


// parent.contains(child) - проверка на вложенность
 


// Создание элементов
var div = document.createElement('div'),
    textElem = document.createTextNode('Тут был я');

div.className = 'alert-success';
div.innerHTML = "<strong>Yeaaah!</strong> You readed important message";

// Теперь нужно вставить в document
document.body.appendChild(div); // Добавляет в конец дочерних элементов

var div = document.createElement('div');
div.innerHTML = '<b>Before Sibling</b>';

var list = document.getElementById('list');
list.insertBefore(div, list.children[1]); // Вставит элемент перед элементом
// Если list пустой то вставка произойдет
// Также все методы ещё  возращают элемент

div.cloneNode(true); // Клонирует элемент
// list.removeChild(list.children[0]);
// replaceChild


// Мультивставка - вставка множеству узлов
// insertAdjacentHTML(where, html) - встаыляет произвольный HTML
// в любое место документа, в том числе и между узлами!
// 1. `beforeBegin` -- перед `elem`.
// 2. `afterBegin` -- внутрь `elem`, в самое начало.
// 3. `beforeEnd` -- внутрь `elem`, в конец.
// 4. `afterEnd` -- после `elem`.
// (1)<li>(2) elem (3)</li>(4)
var ul = document.getElementById('list2'),
    li5 = ul.children[2];

li5.insertAdjacentHTML('beforeBegin', "<li>3</li><li>4</li>");


// node.append(...nodes) – вставляет nodes в конец node,
// node.prepend(...nodes) – вставляет nodes в начало node,
// node.after(...nodes) – вставляет nodes после узла node,
// node.before(...nodes) – вставляет nodes перед узлом node,
// node.replaceWith(...nodes) – вставляет nodes вместо node.

// Добавляет текст к документу
document.write("Add stroke in doc");
document.writeln("<br>With \\n");
// Вносятся до того как брвузер построит DOM

// style
let con = document.getElementById('content');
con.style.width = "100px";
con.style.zIndex = 2;
con.style.color = "red";
con.style.webkitBorderRadius;
// Чтобы сбросить стиль ставить ""
con.style.color = "";

// Позволяет поставить стиль целиком
// Перезаписывает style целиком
con.style.cssText = "color: blue; \
    width: 150px; \
    text-align: center;";


// Получение стилей
var bodyStyles = getComputedStyle(document.body);

console.log( 
    "marginTop: " + bodyStyles.marginTop,
    "color: " + bodyStyles.color
);

// currentStyle for IE8-

console.log( 
    document.documentElement.clientHeight, // Видимая часть окна
    document.documentElement.scrollHeight, // С учетом прокрутки
    window.pageYOffset, // Получение текущей прокрутки
);

// scrollBy(x, y) прокручивает вниз относительно текущих координат 
// scrollTo(x, y) относительно документа

function handler() {
    alert( 'Спасибо!' );
}

input.addEventListener("click", handler);
// удаление требует ту же функцию
input.removeEventListener("click", handler);






















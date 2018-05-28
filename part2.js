/* // DOM - объектная модель документа, это дерево, иерархия
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

//input.addEventListener("click", handler);
// удаление требует ту же функцию
//input.removeEventListener("click", handler);

var textArea = document.getElementById('area');

textArea.onmouseenter = function(e) {
    textArea.focus(); // симитировали событие
};

textArea.onclick = function(e) {
    this.value += 'click\n';
};

textArea.onmousedown = function(e) { 
    this.value += 'mousedown\n';
};

textArea.onmouseup = function(e) {
    this.value += 'mousedown\n';
};
 */




// Объект события
var element = document.getElementById('elem2');

element.addEventListener('click', (event) => {
    event = event || window.event; // кроссбраузерно

    console.log( 
        event.type + " на " + event.currentTarget, // тип события (click) и на ком сработал (input)
        event.clientX + ":" + event.clientY //позиции курсора
    );
});
// event - кроссбраузерная

// Всплытие и погружение
// Самый глубокий элемент, которое вызывает событие называется целевым

// Отличия от this (=event.currentTarget):
// 1. event.target – это исходный элемент, на котором произошло 
// событие, в процессе всплытия он неизменен.
// 2. this – это текущий элемент, до которого дошло всплытие,
// на нём сейчас выполняется обработчик.

// То есть стоит обработчик на форме: currentTarget - это форма
// так как обработчик сработал на ней
// target - самый глубокий элемент

// Всплытие идет прямо наверх до html, потом document, window
// вызывая все обработчики на своем пути, поэтому нужно оста-
// новить всплытие. event.stopPropogation()
// Для того, чтобы полностью остановить обработку,
// event.stopImmediatePropagation()
var table = document.getElementById('numTable'),
    selectedTd;

table.addEventListener('click', (event) => {
    var purpose = event.target;

    while (purpose != table) { // можно вместо table исп. this
        if (purpose.tagName == 'TD') {
            // нашли интересующий элемент
            highLight(purpose);
            return;
        }
        purpose = purpose.parentNode; // взяли родителя
    }

});

function highLight(purpose) {
    if (selectedTd)
        selectedTd.classList.remove('highlight');

    selectedTd = purpose;
    selectedTd.classList.add('highlight');
}

// Делегирование заключается в том, что если у нас много элементов
// на которое нужно повесить однотипные обработчики, то вместо
// назначения обработчика каждому мы ставим один обработчик родителю
// а целевой элемент получаем через event.target

var list = document.getElementById('tree'),
    selectedLi,
    selectedList;

list.addEventListener('mouseover', (event) => {
    var target = event.target;

    if (target.tagName == 'SPAN')
        textBold(target);
});

list.addEventListener('mouseout', () => {
    if (selectedLi) {
        selectedLi.classList.remove('bold');
    }
});

function textBold(target) {
    if (selectedLi) {
        selectedLi.classList.remove('bold');
    }

    selectedLi = target;
    selectedLi.classList.add('bold');
}

list.addEventListener('click', (event) => {
    var target = event.target;
    
    if (target.tagName == 'SPAN') {
        target = target.parentNode;
        showList(target);
    }
});

function showList(target) {
    var clases;

    selectedList = target.children[1];

    if (!selectedList)
        return;

    clases = selectedList.classList;
    
    if (clases == 'hide' && selectedList.tagName == 'UL') {
        selectedList.classList.remove('hide');
        return;
    }

    selectedList.classList.add('hide');
        
}


// Прием проектирование "Поведение"(Behavior). Он состоит из даух частей:
// 1. Элементу ставиться аттрибут, описывающий его поведение
// 2. При помощи делегирование ставиться обработчик на документ, который ловит все клики 
// и если элемент имеет нужный аттрибут, то производит нужное действие
document.onclick = function(event) {
    if ( !event.target.hasAttribute('data-counter') )
        return;

    var counter = event.target;

    counter.innerHTML++;
};

// Действия браузера по умолчанию. Многие действия влекут за собой действие браузера (клик по ссылке инициирует переход по URL) и т.д.
// Существуе 2 способа отменить стандартное поведение браузера:
// 1. event.preventDefault()
// 2. Если обработчик назначен через onсобытие, то можно return faulse


// Генрация событий
// Конструктор Event
var event = new Event('click'),
    butt  = document.getElementById('elButton');

butt.dispatchEvent(event); // инициируем событие

// isTrusted - проверка было ли симитировано событие скриптом
// CustomEvent - для создание собственного события
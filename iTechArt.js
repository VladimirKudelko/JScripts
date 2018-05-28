// object.preventExtensions(); //запрещает добавление новых свойств 
// object.newProp = 'new prop';

// e.preventDefault(); // отменяет событие
// return false; // тоже самое

//DOM - Document Object Model
//парсинг - браузер получает html код и преобразовывает в набор сущностей над которыми можно оперировать программно

// Браузер прочитал весь код index.html узнал из него что также
// нужно скачать css, отправил запрос на скачку css, скачал css
// распарсил css, узнал из него что текст должен быть оранжевым
// затем отрендерил все эти элементы в окне браузера ......
// и потом браузер предоставляет интерфейс для работы, который
// называется DOM

// ООП в функциональном стиле 
// Обычный конструктор в котором объявлены свойства и методы
// ООП в прототипном стиле
// Обычный конструктор в котором описаны свойства, а все методы 
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
rabbit.countLegs(4);


// При наступлении события обработчики сначала срабатывают на самом вложенном элементе, затем на его родителе, затем выше и так далее,
// вверх по цепочке вложенности.

// Прекоащение всплытия
// Для остановки всплытия нужно вызвать метод event.stopPropagation().

// 1. Событие сначала идет сверху вниз. Эта стадия называется «стадия перехвата» (capturing stage).
// 2. Событие достигло целевого элемента. Это – «стадия цели» (target stage).
// 3. После этого событие начинает всплывать. Это – «стадия всплытия» (bubbling stage).

// БЭМ (Блок-Элемент-Модификатор) — методология web-разработки, а также набор интерфейсных библиотек, фреймворков и вспомогательных инструментов.
// БЭМ предлагает общую семантическую модель для всех технологий, использующихся во фронтэнд разработке (HTML, CSS, JavaScript, шаблоны и др.)
// Используя понятия «блок», «элемент» и «модификатор» можно описать древовидную структуру документа.
{/* <div class="header">
    <div class="header__bottom">...</div>
</div> */}


// метод - это присуще объекту. вызывается только для объекта. может работать с внутренними полями объекта. 
// функция - вещь в себе вызывается откуда угодно и для чего угодно. ... метод - такая же функция, одним из 
// входных значений которой является объект, для которого вызван метод.

function isPolyndrom(str) {
    let length = str.length;

    String.prototype.every  = [].every;

    return str
        .every(function(e, index) {
            if ( e ===  str[length - index - 1]) {
                return true;
            } else {
                return false;
            }

            if ( index === Math.floor(length / 2) )
                return;
    });

}

console.log( isPolyndrom('asa') );
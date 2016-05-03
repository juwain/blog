---
title: JS-ликбез. Объекты и примитивные типы
date: 2015-06-11 23:51:04
tags:
- JS
- JS-ликбез
---

В этой серии статей я собираюсь осветить те части JavaScript, которые показались мне интересными в момент изучения. Статьи будут состоять из небольших блоков с примерами.

Поехали!

> Хороший туториал по JS есть на MDN
> [https://developer.mozilla.org/en-US/docs/Web/JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

### Объекты и примитивные типы
Объекты с одинаковым содержимым не равны друг другу, а примитивные типы равны.

```js
var obj1 = {text: 'text'};
var obj2 = {text: 'text'};

obj1 === obj2   // false
'obj' === 'obj' // true
[1] === [1]     // false
1 === 1         // true
```

Объекты равны друг другу, только если ссылаются на один и тот же объект.

```js
var obj1 = {text: 'text'};
var obj2 = obj1;

obj1 === obj2   // true
```

### Анонимная самовызывающаяся функция
Позволяет не загаживать глобальную область видимости. Внутрь при вызове можно передать параметры.

```js
(function (param) {
  return param;
})(anonimousParam);
```

Синтаксис покороче — [leading bang !](http://stackoverflow.com/questions/5827290/javascript-function-leading-bang-syntax).

```js
!function () {
  console.log('test')
}();
```

Вместо «!» можно использовать другие символы.

### Параметры функций
В функцию можно передавать сколько угодно параметров, это не вызовет ошибку,  даже если это количество параметров не предусмотрено.

```js
function log(a, b, c) {
  console.log(a, b ,c);
}

log('a', 'b', 'c', 'd', 'e'); // выведет «a b c»
log('a', 'b');                // выведет «a b undefined»
```

Примитивные типы в качестве параметров передаются в функцию по значению:

```js
function doubleVal(val) {
  val += val;
}

var number = 5;
doubleVal(number);

console.log(number); // выведет «5»
```

А объектные типы — по ссылке:

```js
function doubleObjectNumber(obj) {
  obj.number += obj.number;
}

var obj = {number: 5};
doubleObjectNumber(obj);

console.log(obj); // выведет «Object {number: 10}»
```

Объект `arguments` функции похож на массив, но это всё таки объект. Он не имеет никаких свойств массива, кроме свойства `length`:

```js
function test() {
  console.log(arguments.length, arguments.forEach, [].forEach);
}

test('a', 'list', 'of', 'parameters');
// выведет «4 undefined function forEach()»
```

Объект `arguments` можно преобразовать в обычный массив с помощью метода `slice`:

```js
function test() {
  var args = Array.prototype.slice.call(arguments);
  console.log(args, args.forEach);
}

test('a', 'list', 'of', 'parameters');
// выведет «["a", "list", "of", "parameters"] function forEach()»
```

Количество параметров функции можно узнать из свойства `length`:

```js
function test(parameter1, parameter2, parameter3) {
}

console.log(test.length); // выведет «3»
```

Продолжение следует…

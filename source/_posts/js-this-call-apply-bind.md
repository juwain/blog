---
title: JS-ликбез. this, call, apply, bind
date: 2015-07-05 23:22:48
tags:
- JS
- JS-ликбез
---

А сегодня я буду вещать про `this` и методы вызова функций.

### Тот самый this
Чтобы вызвать функцию и передать в неё желаемый объект в качестве `this`, можно воспользоваться методами функций `call`, `apply` или `bind`. Рассмотрим их различия.

### Метод call
В качестве аргументов метод `call` функции первым принимает объект, который станет `this` внутри функции. За ним перечисляются через запятую параметры самой функции.

```js
var omnomnom = function(param1, param2) {
  console.log('Любимые ' + this.category + ': ' + param1 + ', ' + param2);
};

var favorite = {
  category: 'фрукты'
};

omnomnom.call(favorite, 'яблоко', 'груша');

// выведет «Любимые фрукты: яблоко, груша»
```

### Метод apply
Метод `apply` отличается от `call` тем, что в него можно передать любое число параметров в виде одного массива. В случае, когда параметров у функции много, нет необходимости их всех перечислять через запятую, а можно просто передать одним массивом.

```js
var omnomnom = function(param1, param2, param3) {
  console.log('Любимые ' + this.category + ': ' + param1 + ', ' +
  param2 + ', ' + param3);
};

var favorite = {
  category: 'фрукты'
};

omnomnom.apply(favorite, ['яблоко', 'груша', 'вишня']);

// выведет «Любимые фрукты: яблоко, груша, вишня»
```

Массивом в функцию удобно как раз передавать неопределённое число параметров. И внутри функции в таком случае лучше не завязываться на конкретные названия параметров, а использовать объект `arguments` для доступа ко всем параметрам сразу.

```js
var omnomnom = function() {
  console.log('Любимые ' + this.category + ': ' +
  [].slice.call(arguments).join(', '));
};

var favorite = {
  category: 'фрукты'
};

omnomnom.apply(favorite, ['яблоко', 'груша', 'вишня']);

// выведет «Любимые фрукты: яблоко, груша, вишня»
```

### Метод bind
Метод `bind` отличается тем, что не выполняет функцию сразу, как `call` и `apply`, а возвращает её. Возвращённая функция вызвается как обычно, но внутри неё уже будет заданный `this`.

```js
var omnomnom = function(param1, param2) {
  console.log('Любимые ' + this.category + ': ' + param1 + ', ' + param2);
};

var favorite = {
  category: 'фрукты'
};

var func = omnomnom.bind(favorite, 'яблоко');
func('груша');

// выведет «Любимые фрукты: яблоко, груша»
```

Заметьте, что остальные параметры могут передаваться списком через запятую как в метод `bind`, так и при вызове возвращенной функции.

Продолжение следует…
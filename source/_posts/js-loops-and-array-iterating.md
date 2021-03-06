---
title: JS-ликбез. Циклы и обход массивов
date: 2015-06-21 23:45:52
tags:
- JS
- JS-ликбез
---

В этой части ликбеза речь пойдёт о циклах и обходе массивов в JS.

### Переменная длины массива
В цикле `for`, если он используется для пробега по массиву,  лучше сохранить значение длины массива в отдельную переменную, чем брать её каждую итерацию через `array.length`.

Нормально:

```js
for (var i = 0; i < array.length; i += 1) {
  // array.length берётся каждую итерацию
}
```

Но можно лучше:

```js
for (var i = 0, len = array.length; i < len; i += 1) {
  // array.length в переменной len
}
```

### Цикл for … in
Цикл `for … in` медленней, чем классический `for`. Но иногда он бывает удобнее. Так что в случае использования `for … in` для перебора свойств объекта, лучше фильтровать собственные свойства с помощью функции `hasOwnProperty`:

```js
for (var name in obj) {
  if (obj.hasOwnProperty(name)) {
    console.log(name + ' собственное свойство');
  } else {
    console.log(name + ' унаследованное свойство типа toString');
  }
}
```

### forEach и компания
Выполнение работы метода `forEach` проблематично прервать. Если нужно использовать метод `forEach`, и при этом есть необходимость прервать выполнение его работы, то лучше использовать похожие на `forEach` методы `every` или `some`.

Метод `every` будет продолжать работу до тех пор, пока в результате итерации возвращается `true`. В случае возврата `false` работа метода прерывается. Например, следующий код будет итеративно выводить первые 5 элементов массива, а затем выполнение работы метода прервётся:

```js
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

arr.every(function(el, i) {
  console.log(arr[i]);

  if (arr[i] >= 5) {
    return false;
  }

  return true;
});

// выведет 1 2 3 4 5
```

Метод `some` обратен `every`. То есть он будет работать, пока в итерации возвращается `false` и прервёт работу, когда возвращется `true`:

```js
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

arr.some(function(el, i) {
  console.log(arr[i]);

  if (arr[i] >= 5) {
    return true;
  }

  return false;
});

// выведет 1 2 3 4 5
```

Для обхода массивов также полезны методы `map` и `filter`.

Метод `map` обходит массив и возвращает в результате новый массив. На каждой итерации с текущим элементом можно совершить какие-либо действия:

```js
var arr = [1, 2, 3];

var doubled = arr.map(function(item, index) {
  return item * 2;
});

console.log(arr, doubled);
// выведет [1, 2, 3] [2, 4, 6]
```

Метод `filter`создаёт новый массив из элементов, подходящих условию фильтрующей функции:

```js
var arr = [1, 2, 3, 4, 5];

var filtered = arr.filter(function(item, index) {
  return item % 2;
});

console.log(arr, filtered);
// выведет [1, 2, 3, 4, 5] [1, 3, 5]
```

Ещё один полезный метод массива – `reduce`. Он обходит массив и на каждой итерации возвращает аккумулированное значение прошлой итерации и текущий элемент массива. Таким образом можно, к примеру, просуммировать все элементы массива (свести массив к одному числу):

```js
var arr = [1, 2, 3, 4];

var reduced = arr.reduce(function(prevValue, currentValue, index, array) {
  return prevValue + currentValue;
});

console.log(arr, reduced);
// выведет [1, 2, 3, 4] 10
```

### Определение массива
Как известно, массив — это объект. То есть:

```js
var arr = [1, 2, 3];

console.log(typeof arr);
// выведет object
```

Как достоверно определить, что перед вами массив? Вот так:

```js
var arr = [1, 2, 3];
console.log(Object.prototype.toString.call(arr));
// выведет [object Array]
```

Продолжение следует…

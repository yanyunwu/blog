# 一种前向的弱化diff算法的前端响应式框架理念



## 前言

听到**弱化**，你肯定会想，响应式框架里的diff算法不应该是越强越好吗。当然，我这里的弱化并不是真的去弱化diff算法，而是一种融合的理念。

那什么是融合？我们知道，现在的响应式框架（以vue/react为主），基本都是以diff算法为核心对dom进行更新渲染，那有没有可能我们尽量不去比对dom，而是直接通过响应式更新dom

在这里我想提出一种概念，叫**声明式渲染**

因为本人主要学习的vue，所以以下举例都将以vue为主



## 声明式渲染

看到这个名词，你可能会想，vue框架不就是声明式的吗

的确，在vue中，我们可以通过声明一个响应式属性，然后通过维护一个dom的状态

但就我个人的观点认为，vue的响应式会触发底层的diff算法进而实现dom的状态更新，但diff本质上是比对dom进行渲染，而非声明式渲染



那么什么是**声明式渲染**？



### 使用占位节点

一种比较简单明确的思路就是使用占位节点（这在我们移除，修改当前dom有很大帮助）

因为dom的状态不仅有它的属性修改，还可能涉及到它的删除，显示，和修改

假如，我们需要实现一个类似vue中`v-if`

```js
// 假想获取响应式对象
const data = reactive({
    show: true
})


let template = render(
    'div',
    null,
    [
        () => data.show ? render('span') : null
    ]
)
```

在以上代码中，当我们第一次渲染时，通过触发函数进而触发属性get函数来收集依赖（即这里生成span的函数），在我们更新show时，调用该函数生成一个节点，如果为null，则使用占位节点将其加入

因此，这里的占位节点最好的选择就是空文本节点



我们也可以去修改这个dom

```js
() => data.show ? render('span') : render('p')
```

```js
() => {
    if(data.show === undefined) return null
    if(data.show) {
        return render('span')
    }else {
        return render('p')
    }
}
```



### 更便捷的缓存状态

假如我们需要缓存一个组件的状态

我们可以提前生成这个span就可以了

因为render内部相当于生成一个新的虚拟dom

```js
let span = render('span')

let template = render(
    'div',
    null,
    [
        () => data.show ? span : null
    ]
)
```





## 可能存在的问题

假如你理解了我所说的这种理念

你可能会想，在大型项目中，我如果大量使用这样的方式，岂不是会造成很多内存浪费（生成许多空文本节点）

的却会有这个问题，但仔细想想，当我真的需要去控制一个dom的存在与不存在时，那么它对我就是有用的，而且如果我只需要显示一次，那我直接不生成占位节点不就好了



### 通过数组实现渲染

另一个问题就是通过数组实现批量渲染，因为数组的内容是非常不可控的，所以数组中的每一个元素我们不可能去用节点占位

在这里我想到的一个办法就是，将数组整体作为一个节点用空节点占位，而在数组内部的渲染，则可以有许多方式，比如diff算法。

这便是我所提到的融合



## 占位与融合

对于非数组类型的状态，我们可以使用声明式渲染，而对于数组类型的状态，我们可以在局部使用diff算法

举个例子

```js
// 假想获取响应式对象
const data = reactive({
    show: true,
    list: [1, 2, 3]
})


let template = render(
    'div',
    null,
    [
        () => data.show ? render('span') : null,
        () => list.map((index) => render('p', null, index)),
        () => data.show ? render('span', null, '哈哈哈') : null
    ]
)
```

这个例子，因为list是占用一个节点，因此我们在更新list的时候，根本不需要关心其他的兄弟节点，只要关心list所包含的节点



## 实现

目前的话，关于这个理念我已经做了一些demo

github地址：[yanyunwu/vact: 创世纪前端响应式新框架 (github.com)](https://github.com/yanyunwu/vact)

目前可以通过webpack，配置jsx预设babel，同时加入我写的配套的babel插件（babel-plugin-transform-vact-jsx）使用


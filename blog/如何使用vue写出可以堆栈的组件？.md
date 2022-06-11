# 如何使用vue写出可以堆栈的组件？



## 示例

**假如我需要一个这样的组件**

```vue
<template>
	<stack :ml-size="4">
      <span>hello</span>
      <span>hello</span>
      <stack :ml-size="3">
        <span>hello</span>
        <span>hello</span>
        <stack :ml-size="4">
          <span>hello</span>
          <span>hello</span>
        </stack>
      </stack>
    </stack>
</template>
```

**显示效果：**

<img src="E:\blog\image\a1.png" style="zoom:75%;" />

那么我该如何设计stack这个组件呢？



## 使用传统的template的语法

~~~vue
<template>
	<div>
        <div :class="`ml-${mlSize}`" ><slot></slot></div>
    </div>
</template>

<script>
    export default {
        props: {
            mlSize: Number
        }
    }
</script>
~~~

但是这样就有了一个问题：如果父组件中有多个`span`标签，那么`<slot></slot>`将会默认全部渲染，也就是`<slot></slot>`== `<span>hello</span> <span>hello</span>......`，我们该如何提取出单个span标签呢，难不成要调用`this.$slot.default()`取出span的集合再一个个渲染吗，显然使用template语法是很难做到的，那么vue给我们提供了render函数来解决类似的问题

## vue组件的render函数

熟悉vue的小伙伴都知道，vue在编译template模块的时候，会将其转换为render函数，然后再调用render函数去生成vnode虚拟dom



### render函数的使用

~~~js
import {h} from 'vue'
export default {
    render() {
        return h('div', { class: 'ml-4'}, [h('span', 'hello')])
    }
}

//等价于
/*
<div>
	<span>hello</span>
</div>
*/
~~~



接下来我们就要使用render函数去设计我们的组件了



### 使用render函数设计组件

~~~js
import { h } from "vue";

export default {
  props: {
    size: Number,
  },
  render() {
    const slot = this.$slots.default ? this.$slots.default() : [];
    return h('div', slot.map(item => {
      // 这里的item是每一个span，分别用一个class为ml-4的div包裹
      return h('div', {
        class: `ml-${this.size}`
      }, item)
    }));
  },
};
~~~

显然，使用render函数和h方法可以轻松将插槽中的每一项分开



## 结言

这里的灵感并不是我自己想到的，而是在尤大大的vue3源码解析篇视频中（链接：[跟尤雨溪一起解读Vue3源码【中英字幕】]([跟尤雨溪一起解读Vue3源码[中英字幕]- Vue Mastery_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1rC4y187Vw?p=3))）讲到的，就连尤大大自己都力推这种写法，如果在这种情况的话，当然，如果这样嵌套编程很繁琐，vue3对于jsx的写法也是支持的，有兴趣的小伙伴可以看看，vue2是需要额外引入解析jsx的插件而vue3自带了这些插件，所以你在设计组件的时候可以放心使用

*以上便是我的总结，感谢你能看到这里！*
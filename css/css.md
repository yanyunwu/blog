# CSS相关面试题



## 一、css盒模型

- 基本概念：标准模型+IE模型。 包括`margin、border、padding、content`
- 标准模型和IE模型的区别
- css如何设置获取这两种模型的宽和高
- 根据盒模型解释边距重叠



### 标准模型和IE模型的区别

- IE模型`元素宽度`width = content + padding + border

- `标准模型`元素宽度`width=content`



### css如何设置获取这两种模型的宽和高

通过`css3`新增的属性 `box-sizing`: `content-box | border-box`分别设置盒模型为`标准模型（content-box）`和`IE模型（border-box）`。



### 外边距重叠

当两个垂直外边距相遇时，他们将形成一个外边距，`合并后的外边距高度等于两个发生合并的外边距的高度中的较大者`。

注意：`只有普通文档流中块框的垂直外边距才会发生外边距合并`，行内框、浮动框或绝对定位之间的外边距不会合并。
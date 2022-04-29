### js的相等运算符



- null == undefined // true
- number == string  // 先转换string为number
- blooen == any(任意类型) //  先转换blooen为number  true为1 fasle为+0
- number或string == object  // 调用object的valueof（优先）或toString

#### 数值转换

- 空串 fasle null为0
- 不为数值的字符串 对象  undifined为 NaN
- "1" "1.1" 为 1 1.1


/**
 * @function 哈希函数，用于返回哈希code
 * @description
 * @param str {String} 需要保存的字符串
 * @param size {Number} 哈希表的大小(可容纳数据的数量)
 * @return {Number} 返回经过该函数处理后的hashcode
 * @author yanyun
 * @version 1.0.0
*/
function HashFun(str, size) {
    let hashCode = 0;
    for (let i = 0; i < str.length; i++) {
        // 以37为幂底数
        hashCode += 37 * hashCode + str.charCodeAt(i);
    }
    let index = hashCode % size;
    return index;
}

/**
 * @constructor
*/
class Hash {
    constructor(limit) {
        // 用来存放数据的仓库
        this.storage = [];
        // 当前仓库已存放数据的的多少 
        this.size = 0;
        // 当前仓库允许存放数据的多少;
        this.limit = limit || 10;
    }

    /**
     * 插入数据
     * @param key {String} 需要保存的字符串
     * @param value {String} 哈希表的大小(可容纳数据的数量)
    */
    set(key, value) {
        const index = HashFun(key, this.limit);
        let bucket = this.storage[index];
        if (!bucket) {
            this.storage[index] = [];
            bucket = this.storage[index]
        }
        // 先遍历查找是否有当前索引上的数组1是否存在key值，如果有则修改
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] === value;
                return;
            }
        }
        // 如果不存在key值，则新增加key和value
        bucket.push([key, value]);
    }
}


// const hash = new Hash();
// hash.set('11231', 'asd');
// console.log(hash);

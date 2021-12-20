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
        // 以37为幂底数(最好是质数)
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
        this.limit = limit || 10; // limit最好是质数
    }

    _hashFun(str, size) {
        let hashCode = 0;
        for (let i = 0; i < str.length; i++) {
            // 以37为幂底数
            hashCode += 37 * hashCode + str.charCodeAt(i);
        }
        // console.log(hashCode);
        let index = hashCode % size;
        return index;
    }

    /**
     * 插入数据
     * @param key {String} 需要保存的字符串
     * @param value {String} 哈希表的大小(可容纳数据的数量)
    */
    set(key, value) {

        const index = this._hashFun(key, this.limit);
        let bucket = this.storage[index];
        if (!bucket) {
            this.storage[index] = [];
            bucket = this.storage[index]
        }
        // 先遍历查找是否有当前索引上的数组1是否存在key值，如果有则修改
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i].key === key) {
                bucket[i].value === value;
                return;
            }
        }
        // 如果不存在key值，则新增加key和value
        bucket.push({ key, value });
        this.size += 1;

        // 插入时检测 是否需要扩容
        if (this.size / this.limit > 0.75) {
            this._resize(this.limit * 2);
        }

    }

    get(key) {
        const index = this._hashFun(key, this.limit);
        let bucket = this.storage[index];
        if (bucket && bucket.length) {

            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i].key === key) {
                    return bucket[i].value;
                }
            }

            return undefined;

        } else {
            return undefined;
        }
    }

    delete(key) {
        const index = this._hashFun(key, this.limit);
        let bucket = this.storage[index];
        if (bucket && bucket.length) {
            for (let i = 0; i < bucket.length; i++) {
                if (bucket[i].key === key) {
                    bucket.splice(i, 1);
                    this.size -= 1;
                    // 删除时检测 是否需要缩容
                    if (this.limit > 10 && this.size / this.limit < 0.25) {
                        this._resize(this.limit / 2);
                    }
                    return true;
                }
            }

        }
    }

    isEmpty() {
        return this.size ? false : true;
    }

    _resize(newLimit) {
        let oldStorage = this.storage;
        this.storage = []
        this.size = 0;
        this.limit = newLimit;
        for (let bucket of oldStorage) {
            if (bucket && bucket.length) {
                for (let item of bucket) {
                    this.set(item.key, item.value)
                }
            }
        }

    }

}


// const hash = new Hash();
// hash.set('11231', 'asd');
// console.log(hash);

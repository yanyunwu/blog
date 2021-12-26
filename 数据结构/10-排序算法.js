
function random(m, n) {
    return parseInt(Math.random() * (m - n + 1) + n)
}

class ArrayQueen {
    constructor(arr) {
        this.arr = arr.slice() || [];
    }
    // 冒泡排序
    bubble() {
        const arr = this.arr.slice();
        for (let i = arr.length; i > 0; i--) {
            for (let j = 0; j < i - 1; j++) {
                if (arr[j + 1] < arr[j]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    select() {
        const arr = this.arr.slice();
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                if (arr[j] < arr[i]) {
                    let temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }

        return arr;
    }
}
const count = 1000;
const size = [10, 10000];
const randomArr = [];
for (let i = 0; i < count; i++) {
    randomArr.push(random(size[0], size[1]))
}


const arr = new ArrayQueen(randomArr);
let start = globalThis.performance.now();
arr.bubble();
let end = globalThis.performance.now();
console.log(`冒泡排序所需时间:${(end - start).toFixed(5)}ms`);

start = globalThis.performance.now();
console.log(arr.select());
end = globalThis.performance.now();
console.log(`选择排序所需时间:${(end - start).toFixed(5)}ms`);
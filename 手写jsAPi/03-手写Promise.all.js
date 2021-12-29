// 手写promise
Promise.allV2 = function (promiseArr = []) {
    let results = [];
    let successCount = 0;
    return new Promise((resolve, reject) => {
        promiseArr.forEach((item, index) => {
            Promise.resolve(item).then(value => {
                successCount++;
                results[index] = value;
                if (successCount === promiseArr.length) {
                    resolve(results);
                }
            }, reason => {
                reject(reason);
            });
        });
    })
}

Promise.allV2([Promise.resolve(1), new Promise(resolve => {
    throw new Error(2)
}), 3]).then(value => {
    console.log(value);
}, reason => {
    console.log(reason.message);
})
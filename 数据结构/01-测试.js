const { stdout, stdin } = require('process')

function input(str, callback) {
    stdout.write(str);
    stdin.on('data', (data) => {
        let value = data.toString().slice(0, -2);
        stdin.pause();
        callback(value)
    });
}

input('请输入', (value) => {
    console.log(value);
});

console.log(123);
console.log(234);



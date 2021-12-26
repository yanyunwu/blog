import Observer from './src/Observer.js';
import Watcher from './src/Watcher.js';
const vm = {
    name: '小明',
    other: {
        age: 14
    }
};
const observer = new Observer(vm);
// const watcher = new Watcher(vm, 'other', (newValue, oldValue) => {
//     console.log(oldValue);
//     console.log(newValue);
// });

// new Watcher(vm.other, 'age', (newValue, oldValue) => {
//     console.log(oldValue);
//     console.log(newValue);
// })
const watcher = new Watcher(vm.other, 'age', (newValue, oldValue) => {
    console.log(oldValue);
    console.log(newValue);
});
// vm.name = '小红'
vm.other = { age: 1 };
let c = vm.other.age;
// new Watcher(vm.other, 'age', (newValue, oldValue) => {
//     console.log(oldValue);
//     console.log(newValue);
// });

vm.other.age = 2;

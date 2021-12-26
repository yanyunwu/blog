import Dep from "./dep.js";

export default class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm;
        this.getter = function (obj) {
            return obj[key];
        }
        this.cb = cb;
        this.value = this.get();
    }

    get() {
        Dep.target = this;
        let value = this.getter.call(this.vm, this.vm);
        Dep.target = undefined;
        return value;
    }

    update() {
        const oldValue = this.value;
        this.value = this.get();
        this.cb.call(this.vm, this.value, oldValue);
    }
}
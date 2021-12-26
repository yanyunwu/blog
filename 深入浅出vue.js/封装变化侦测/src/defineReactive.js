import Dep from "./dep.js";
import Observer from "./Observer.js";

export default function defineReactive(obj, key, val) {
    if (typeof val === 'object') {
        new Observer(val);
    }
    let dep = new Dep();
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get() {
            dep.depend();
            return val;
        },
        set(newVal) {
            if (newVal === val) {
                return;
            }
            // if (typeof newVal === 'object') {
            //     new Observer(newVal)
            // }
            val = newVal;
            dep.notify();
        }
    })
}


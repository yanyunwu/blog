import defineReactive from './defineReactive.js'

export default class Observer {
    constructor(value) {
        this.value = value;

        if (!Array.isArray(value)) {
            this.walk(value);
        }
    }

    walk(obj) {
        const keys = Object.keys(obj);
        for (let key of keys) {
            defineReactive(obj, key, obj[key]);
        }

    }
}
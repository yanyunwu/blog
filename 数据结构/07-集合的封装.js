class Set {
    constructor() {
        this.items = {};
    }

    add(value) {
        if (this.has(value)) {
            return false;
        } else {
            this.items[value] = value;
            return true;
        }

    }

    remove(value) {
        if (this.has(value)) {
            delete this.items[value]
            return true;
        } else {
            return false;
        }
    }

    has(value) {
        return this.items.hasOwnProperty(value);
    }

    clear() {
        this.items = {};
    }

    get size() {
        return Object.keys(this.items).length;
    }

    values() {
        return Object.keys(this.items);
    }
    // 求集合间的并集
    union(otherSet) {
        const unionSet = new Set();
        let values = this.values();
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i]);
        }
        values = otherSet.values();
        for (let i = 0; i < values.length; i++) {
            unionSet.add(values[i]);
        }
        return unionSet;
    }
    // 求交集的操作
    interSection(otherSet) {
        let set = new Set();
        let values = this.values();
        for (let item of values) {
            if (otherSet.has(item)) {
                set.add(item);
            }
        }

        return set;
    }

    childSetFor(otherSet) {
        let values = this.values();
        for (let item of values) {
            if (!otherSet.has(item)) {
                return false;
            }
        }
        return true;

    }

}

const set = new Set();
const set2 = new Set();
// const obj1 = {};
// const obj2 = {};
// set.add(obj1);
// set.add(obj2)
// console.log(set.has(obj2));
// console.log(set.size);
set.add('a')
set.add('b')
set.add('c')
set2.add('c')
set2.add('b')
// const set3 = set.union(set2);
// console.log(set3);
// const set4 = set.interSection(set2);
// console.log(set4.values().toString());
// console.log(set2.childSetFor(set));
console.log(set.childSetFor(set2));

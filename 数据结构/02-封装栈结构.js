class Stack {

    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item);
    }

    pop() {
        return this.items.pop();
    }

    get peek() {
        return this.items[this.items.length - 1];
    }

    isEmpty() {
        return this.items.length === 0;
    }

    get size() {
        return this.items.length;
    }

    toString() {
        return this.items.join(' ');
    }

}

var v = new Stack();
// v.push(1);
// v.push(222);
// console.log(v.peek);
// console.log(v.size);
// console.log(v);

console.log({} + [])
class Enqueue {

    constructor() {
        this.items = [];
    }

    push(item) {
        this.items.push(item)
    }

    shift() {
        return this.items.shift();
    }

    get size() {
        return this.items.length;
    }

}

var v = new Enqueue();
v.push(1)
console.log(v.size);

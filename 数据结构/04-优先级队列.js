class QueenItem {
    constructor(item, priority) {
        this.item = item;
        this.priority = priority;
    }
}


class PriorityQueen {
    constructor() {
        this.items = [];
    }

    push(item, priority) {
        let newItem = new QueenItem(item, priority)
        for (let i = 0; i < this.items.length; i++) {
            if (newItem.priority < this.items[i].priority) {
                this.items.splice(i, 0, newItem);
                return;
            }
        }
        this.items.push(newItem);
    }

    toString() {
        var newItems = this.items.map(value => {
            return value.item + '-' + value.priority;
        });
        return newItems.join(' ');
    }

    get size() {
        return this.items.length;
    }
}

var v = new PriorityQueen();
v.push('a', 2);
v.push('b', 1);
v.push('c', 0);
v.push('d', 10);
v.push('e', 1000);
// console.log(v.size);
console.log(v.toString());

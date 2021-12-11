class Node {
    constructor(data) {
        this.prev = null;
        this.next = null;
        this.data = data;
    }
}

class myError extends Error {

}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    append(data) {
        const node = new Node(data);
        if (this.head) {
            this.tail.next = node;
            this.tail = node;
        } else {
            this.head = node;
            this.tail = node;
        }
        this.length += 1;
        return this;
    }

    insert(position, data) {
        if (position < 0 || position > this.length) {
            throw new myError('越界!');
        }

        const node = new Node(data);
        if (!this.length) {
            this.head = node;
        } else if (!position) {
            this.head.prev = node;
            node.next = this.head;
            this.head = node;
        } else {
            let temp = this.head;
            let tail = this.head.next;
            for (let i = 1; i < position; i++) {
                temp = temp.next;
                tail = temp.next;
            }
            node.prev = temp;
            node.next = tail;
            temp.next = node;
            tail && (tail.prev = node);
        }
        this.length += 1;
    }

    toString() {
        const head = this.head;
        const list = [];
        let temp = head;
        while (temp) {
            list.push(temp.data)
            temp = temp.next;
        }
        return list;
    }
}

const list = new LinkedList();
list.append(1).append(2).append(3)
list.insert(0, '首位');
list.insert(3, "哈哈哈");
console.log(list.toString());
console.log(list.length);
// console.log(list);
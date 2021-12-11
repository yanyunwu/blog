class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}


class NodeList {
    constructor() {
        this.head = null;
        this.length = 0;
    }

    append(data) {
        const node = new Node(data);
        if (this.head) {
            let temp = this.head;
            while (temp.next) {
                temp = temp.next;
            }
            temp.next = node
        } else {
            this.head = node;
        }
        this.length += 1;
        return this;
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

const list = new NodeList();
list.append(1).append(2).append(3)
console.log(list.toString());
console.log(list.length);
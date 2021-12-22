class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {

    constructor() {
        // 保存根属性
        this.root = null;
        this.show = '';
    }

    insert(key) {
        if (this.root) {
            const newNode = new Node(key);
            this._insertNode(this.root, newNode);
        } else {
            this.root = new Node(key);
        }
        return this;
    }

    _insertNode(node, newNode) {
        if (newNode.key < node.key) {
            if (node.left) {
                this._insertNode(node.left, newNode);
            } else {
                node.left = newNode;
            }
        } else {
            if (node.right) {
                this._insertNode(node.right, newNode);
            } else {
                node.right = newNode;
            }
        }
    }

    preOrder() {
        this.show = '';
        if (this.root) {
            this._preOrderNode(this.root);
        }
        return this.show;
    }
    // 先序遍历
    _preOrderNode(node) {
        if (node) {
            this.show += node.key + ' ';
            this._preOrderNode(node.left);
            this._preOrderNode(node.right);
        }
    }

    midOrder() {
        this.show = '';
        if (this.root) {
            this._preOrderNode(this.root);
        }
        return this.show;
    }
    // 中序遍历
    _midOrderNode() {
        if (node) {
            this._preOrderNode(node.left);
            this.show += node.key + ' ';
            this._preOrderNode(node.right);
        }
    }

    get min() {
        let node = this.root;
        while (node.left) {
            node = node.left;
        }
        return node.key;
    }

    get max() {
        let node = this.root;
        while (node.right) {
            node = node.right;
        }
        return node.key;
    }

    search(key) {
        let node = this.root;
        while (node) {
            if (key < node.key) {
                node = node.left;
            } else if (key > node.key) {
                node = node.right;
            } else {
                return true;
            }
        }
        return false;

    }
}

// const tree = new BinarySearchTree();
// tree.insert(1).insert(2).insert(3)
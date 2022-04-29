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
        let p = this.root;
        let s = [];
        while (s.length || p) {
            while (p.left){
                s.push(p);
                p = p.left;
            }

            p = s.pop();
            console.log(p.key);

            p = s.pop();
            console.log(p.key);

            if(p.right){
                p = p.right;
            }
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
    // 树结构的删除操作，较为复杂
    remove(key) {
        let node = this.root;
        let parent = null;
        let isLeft = undefined;
        while (node) {
            if (key < node.key) {
                parent = node;
                isLeft = true;
                node = node.left;
            } else if (key > node.key) {
                parent = node;
                isLeft = false;
                node = node.right;
            } else {
                // 该节点没有子节点
                if (!node.left && !node.right) {
                    if (node === this.root) {
                        this.root = null;
                    } else {
                        if (isLeft) {
                            parent.left = null;
                        } else {
                            parent.right = null;
                        }
                    }
                }
                // 该节点只有一个子节点
                else if (node.left && node.right) {
                    if (node === this.root) {
                        let deleteNode = this.root;
                        this.root = this._getSuccess(this.root.left);
                        this.root.right = deleteNode.right;
                    } else {
                        if (isLeft) {
                            parent.left = this._getSuccess(node.left);
                            parent.left.right = node.right;
                        } else {
                            parent.right = this._getSuccess(node.left);
                            parent.right.right = node.right;
                        }
                    }

                }
                // 该节点有两个子节点
                else {
                    if (node === this.root) {
                        this.root = node.left || node.right;
                    } else {
                        if (isLeft) {
                            parent.left = node.left || node.right;
                        } else {
                            parent.right = node.left || node.right;
                        }
                    }
                }
                break;
            }
        }
    }
    // 获取后继的节点
    _getSuccess(node) {
        let root = node;
        let parent = null;
        while (node.right) {
            parent = node;
            node = node.right;
        }
        if (node !== root) {
            parent.right = null;
        }

        return node;
    }
}

const tree = new BinarySearchTree();
tree.insert(1).insert(2).insert(3);
tree._midOrderNode();
export default class Dep {
    constructor() {
        this.subs = [];
    }

    addSub(sub) {
        this.subs.push(sub);
    }

    depend() {
        if (Dep.target) {
            this.addSub(Dep.target);
        }
    }

    notify() {
        const subs = this.subs.slice();
        for (let item of subs) {
            item.update();
        }
    }

    removeSub(sub) {
        remove(this.subs, sub);
    }

}

function remove(subs, sub) {
    if (subs.length) {
        const index = subs.indexOf(sub);
        if (index > -1) {
            subs.splice(index, 1);
        }
    }
}
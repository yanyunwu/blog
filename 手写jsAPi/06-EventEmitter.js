class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, cb) {
        if (this.events[event]) {
            this.events[event].push(cb);
        } else {
            this.events[event] = [cb];
        }
    }

    off(event, cb) {
        let cbList = this.events[event];
        if (cbList) {
            const index = cbList.indexOf(cb);
            if (index > -1) {
                cbList.splice(index, 1);
            }
        }
    }

    once(event, cb) {
        const fn = () => {
            cb();
            this.off(event, fn);
        }
        this.on(event, fn);
    }
}
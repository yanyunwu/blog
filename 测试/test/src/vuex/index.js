import Vue from 'vue'


class Store {
    constructor(options) {
        this.vm = new Vue({
            data: {
                state: options.state
            }
        })

        let mutations = options.mutations || {}
        this.mutations = {}
        Object.keys(mutations).forEach(mutationName => {
            this.mutations[mutationName] = (arg) => {
                mutations[mutationName](this.state, arg)
            }
        })
    }

    get state() {
        return this.vm.$data.state
    }

    commit(fun, arg) {
        this.mutations[fun](arg);
    }
}

export default {
    install(Vue) {
        Vue.mixin({
            beforeCreate() {
                if (this.$options && this.$options.store) {

                    this.$store = this.$options.store;
                } else {
                    this.$store = this.$parent && this.$parent.$store;
                }
            }
        })
    },
    Store: Store
}


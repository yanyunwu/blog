import Vue from 'vue'
import App from './App.vue'
import Vuex from './vuex'



Vue.config.productionTip = false

Vue.directive('focus', {
  inserted(el) {
    el.focus();
  }
})

Vue.component('Test', {
  render: function (createElement) {
    return createElement(
      'h' + this.level,   // 标签名称
      this.$slots.default // 子节点数组
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    msg: '哈哈哈'
  },
  mutations: {
    changeMsg(state, msg) {
      state.msg = msg;
    }
  }
});

// console.log(store);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

<template>
  <div id="app">
    <!-- <div class="chips">
      <span
        :class="curpath === item.path ? 'red' : ''"
        v-for="(item, index) in chips"
        :key="index"
        @click="close(item)"
      >
        {{ item.title }}
      </span>
    </div> -->
    <div>
      <Father color="red">
        <h1>3</h1>
        <Child v-if="1" color="red">1</Child>
        <Child>2</Child>
      </Father>
    </div>
  </div>
</template>

<script>
import Father from "./components/Father.vue";
import Child from "./components/Child.vue";
console.log(Child);
export default {
  name: "App",
  data() {
    return {
      curpath: "/role",
      chips: [
        {
          title: "首页",
          path: "/home",
        },
        {
          title: "账户列表",
          path: "/user",
        },
        {
          title: "角色列表",
          path: "/role",
        },
        {
          title: "服务商详情",
          path: "/provider",
        },
        {
          title: "商品浏览",
          path: "/commodity",
        },
      ],
    };
  },
  methods: {
    close(item) {
      let index = this.chips.indexOf(item);
      this.chips.splice(index, 1);
    },
  },
  components: {
    Father,
    Child,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.chips {
  display: flex;
}
.chips span {
  width: 100px;
  height: 30px;
  border: 1px solid black;
  margin: 10px;
  line-height: 30px;
  position: relative;
}

.chips span::after {
  content: "x";
  position: absolute;
  right: 0px;
}

.red {
  border: 1px solid red !important;
}
</style>

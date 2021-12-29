<template>
  <div id="app">
    <div>
      {{ obj.name }}
      <button @click="setObj">改对象</button>
      <button @click="setName">改名1</button>
    </div>
    <div>
      <input type="text" name="" id="" v-focus />
    </div>
    <div>
      <Test :level="2"><span>21314</span></Test>
    </div>
    <div>
      {{ $store.state.msg }}
      <button @click="$store.commit('changeMsg', '已改变')">改变</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      obj: {
        name: "小米",
      },
    };
  },
  methods: {
    setObj() {
      // this.$delete(this.obj, "name");
      // delete this.obj.name;
      this.obj = {
        name: "小红",
      };
    },
    setName() {
      this.obj.name = "小白";
    },
  },
  created() {
    // console.log(this.$options.name);
    console.log(this.$store.state.msg);
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
</style>

<template>
  <div id="app">
    <div>
      {{ obj.name }}
      <button @click="setObj">改对象</button>
      <button @click="setName">改名1</button>
    </div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
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

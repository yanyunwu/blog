<template>
  <div>
    <h1>测试nextTick</h1>
    <p ref="p">{{ number }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: 0
    };
  },
  methods: {
    add() {
      for (let i = 0; i < 100; i++) {
        this.number++;
        let p = this.$refs.p;
        console.dir(p.firstChild.nodeValue);
      }

      // setInterval(() => {
      //   this.number++;
      // }, 1000);
    }
  },
  mounted() {
    this.add();
  }
};
</script>

<style></style>

<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["color"],
  mounted() {
    console.log(this.$slots.default);
  },
};
</script>

<style>
</style>
<template>
  <div class="viewport" :style="calc_style">
    <component v-for="item in items" :is="item.type" :key="item.id" :item="item" :state="state" :local="local"></component>
  </div>
</template>

<script>
export default {
  name: "viewport",
  props: ["state", "items", "local"],
  computed: {
    calc_style() {
      return {
        width: this.state.width + "px",
        height: this.state.height + "px",
        transform: `scale(${this.state.scale})`,
      };
    },
  },
};
</script>

<style scoped lang="less">
.viewport {
  transform-origin: 0 0;
  overflow: hidden;
}
</style>

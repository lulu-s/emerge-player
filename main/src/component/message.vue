<template>
  <section class="text" :class="{ bg_select: item.bg != null }">
      <span :style="calc_style"  :class="{ fade: !item.bg }">{{item.msg}}</span>
  </section>
</template>

<script>
export default {
  props: ["item", "state", "parent"],
  data() {
    return {};
  },
  computed: {
    calc_style() {
      return {
        position: "absolute",
        left: this.item.position[0] ? this.item.position[0] + "px" : 0,
        top: this.item.position[1] ? this.item.position[1] + "px" : 0,
        'font-size': this.item.size ? this.item.size + "px" :  "30px",
        'z-index': this.item.bg ? 0 : 1
      };
    },
  },
  components: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.text {
    width: 100%;
    height: 100%;
    // display: flex;
    // justify-content: center;
    // align-items: center;
}
.text span {
    color: #fff;
    font-size: 150px;
    letter-spacing: 3px;
}
</style>

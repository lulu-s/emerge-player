<template>
  <section class="photo" :class="{ bg_select: item.bg != null }">
    <img
      class="image"
      :style="calc_style"
      :class="{ fade: !item.bg }"
      :src="state.host + item.path"
      alt=""
    />
  </section>
</template>

<script>
export default {
  name: "photo",
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
.photo {
  position: absolute;
  left: 0; 
  top: 0; 
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.image {
  width: auto;
}
</style>

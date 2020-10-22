<template>
  <section class="viewer" :class="{ bg_select: item.bg != null }">
    <video autoplay class="video" controls :src="item.path"></video>
  </section>
</template>

<script>
export default {
  name: "viewer",
  props: ["item", "state"],
  data() {
    return {};
  },
  components: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style scoped lang="less">
.viewer {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.video {
  // width: 100%;
  height: 100%;
}
</style>

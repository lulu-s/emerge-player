<template>
  <section class="photo" :class="{ bg_select: item.bg != null }">
    <img
      class="image"
      :style="{ width: item.bg != null ? '100%' : 'auto' }"
      :src="item.path"
      alt=""
    />
  </section>
</template>

<script>
export default {
  name: "photo",
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
.photo {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
}

.image {
  width: 100%;
}
</style>

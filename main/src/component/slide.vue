<template>
  <section class="slide">
    {{ item.name }}
    <img class="img" :src="item.path + item.content[state.slideId]" alt="" />
    <div class="intro">
      <b>{{item.name}} ({{state.slideId + 1}} / {{item.content.length}})</b>
    </div>
  </section>
</template>

<script>
export default {
  name: "slide",
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
.slide {
  display: flex;
  justify-content: center;
  align-items: center;
}
.img {
  transform: scale(0.6);
}

.intro {
  transition: all 0.5s ease;
  position: absolute;
  bottom: 100px;
  left: 0;
  right: 0;
  text-align: center;
  color: white;
  opacity: 0.5;
}

.intro b {
    font-size: 20px;
    padding: 5px 50px;
    border: 3px solid white;
    border-radius: 1000px;
    display: inline-block;
}

</style>

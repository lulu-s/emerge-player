<template>
  <div
    class="screen"
    :class="{ select: state.selectId[item.id] }"
    :style="calc_style"
  >
    <!-- <h1 class="test">{{ item.id }}</h1> -->
    <!-- component -->
    <div class="component">
      <component
        v-for="ct in item.content"
        :is="ct.type"
        :key="ct.name"
        :item="ct"
        :parent="item"
        :state="state"
        v-if="state.selectName[item.id] == ct.name || ct.bg != null"
      ></component>
    </div>
    <div
      class="no-focus"
      :style="{ opacity:  state.focus  &&  state.focus !=  item.id  ? 1 : 0 }"
    ></div>
  </div>
</template>

<script>
export default {
  name: "screen",
  props: ["item", "state", "local"],
  computed: {
    calc_style() {
      return {
        width: this.item.size[0] + "px",
        height: this.item.size[1] + "px",
        position: "absolute",
        left: this.item.position[0] ? this.item.position[0] + "px" : 0,
        top: this.item.position[1] ? this.item.position[1] + "px" : 0,
        "z-index": this.item.zIndex,
        background: this.item.bg,
        opacity: this.item.opacity,
      };
    },
  },
};
</script>

<style scoped lang="less">
.screen {
  display: flex;
  justify-content: center;
  align-items: center;
}
.test {
  font-size: 100px;
  color: #fff;
}

.select {
  z-index: 999 !important;
  opacity: 1 !important;
  transition: all 0.4s ease;
  pointer-events: all;
  // box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.8); // box-shadow: 4px 3px 16px 0px rgba(51, 51, 51, 0.4);
}
.no-focus {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  transition: all 0.3s cubic-bezier(0.03, 0.59, 0.13, 0.33);
  pointer-events: none;
  z-index: 1000;
}
.component {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>

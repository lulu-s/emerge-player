<template>
  <section class="viewer" :class="{ bg_select: item.bg != null }" >
    <video ref="video" :loop="state.player_loop[parent.id]" autoplay class="video" :muted="state.player_muted[parent.id]" controls :src="item.path"></video>
  </section>
</template>

<script>
export default {
  name: "viewer",
  props: ["item", "state", "parent"],
  data() {
    return {};
  },
  components: {},
  watch: {
    "state.player_play"(){
      if(!state.player_play[this.parent.id]) {
        this.$refs.video.pause();
      } else {
         this.$refs.video.play();
      }
    },
    "state.player_time"(){
      if(this.$refs.video){
        console.log(this.$refs.video, this.state.player_time[this.parent.id], state.player_time);
        this.$refs.video.currentTime = this.$refs.video.duration * this.state.player_time[this.parent.id]
      } 
    }
  },
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
video::-webkit-media-controls {
  position: absolute;
}
</style>

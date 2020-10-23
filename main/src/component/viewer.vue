<template>
  <section class="viewer" :class="{ bg_select: item.bg != null }" >
    <video ref="video" :loop="state.player_loop[parent.id]" autoplay class="video" :muted="state.player_muted[parent.id]" controls :src="item.path">
      <track v-if="item.vtt" kind="subtitles" :src="item.vtt" srclang="zh" label="中文" default>
    </video>
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


//设置字幕的样式
video::cue{
    background-color:transparent;
    color:white;
    font-size: 50px;
    line-height: 50px;
    position: absolute;
    bottom: 0;
    transition: all .4s ease;
}

// 设置单行字幕的样式 
// video::cue(v[voice=aa]){
//     color:green;
// }

// video::cue(v[voice=bb]){
//     color:rgb(0, 26, 128);
// }

</style>

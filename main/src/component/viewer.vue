<template>
  <section class="viewer" :class="{ bg_select: item.bg != null }">
    <video
      ref="video"
      :loop="state.player_loop[parent.id]"
      autoplay
      class="video fade"
      :muted="state.player_muted[parent.id]"
      :src="state.host + item.path"
      :style="calc_style"
    >
      <track
        v-if="item.vtt"
        kind="subtitles"
        :src="item.vtt"
        srclang="zh"
        label="中文"
        default
      />
    </video>
  </section>
</template>

<script>
import { loop } from "../../../libao";
export default {
  name: "viewer",
  props: ["item", "state", "parent"],
  data() {
    return {
      prev_time: -1,
    };
  },
  computed: {
    calc_style() {
      return {
        'z-index': this.item.bg ? 0 : 1
      };
    },
  },
  components: {},
  watch: {
    "item.play"() {
      if (this.$refs.video) {
        if (this.item.play) {
          this.$refs.video.play();
        } else {
          this.$refs.video.pause();
        }
      }
    },
    "state.player_play"() {
      this.item.play = state.player_play[this.parent.id];
    },
    "state.player_time"() {
      if (this.$refs.video) {
        if (this.state.player_time[this.parent.id] != this.prev_time) {
          this.prev_time = this.state.player_time[this.parent.id];
          this.$refs.video.currentTime =
            this.$refs.video.duration * this.prev_time;
        }
      }
    },
  },
  mounted() {
    let tem;
    loop(() => {
      if (this.$refs.video) {
        tem = JSON.parse(JSON.stringify(this.state.current_time)) ;
        tem[this.parent.id] = this.$refs.video.currentTime / this.$refs.video.duration ;
        this.state.current_time =  tem;
      }

      // console.log(this.state.player_muted[this.parent.id]);
    });
  },
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
video::cue {
  background-color: transparent;
  color: white;
  font-size: 50px;
  line-height: 50px;
  position: absolute;
  bottom: 0;
  transition: all 0.4s ease;
}

// 设置单行字幕的样式
// video::cue(v[voice=aa]){
//     color:green;
// }

// video::cue(v[voice=bb]){
//     color:rgb(0, 26, 128);
// }
</style>

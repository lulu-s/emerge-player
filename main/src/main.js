import * as ao from "../../libao"
import { glueValue, Vue, vue } from "../../libao";
import * as YAML from "yaml"
import * as comps from "./component/*.vue";
// import viewer from "./vue/viewer.vue";


function hybridObserve(x) {
    if(x.__hobserved) return x;
    Object.defineProperty(x, "__hobserved", {
        enumerable: false,
        writable: false,
        value: 1
    });
    var mount = vue.reactive({});
    for (var i in x) {
        ((i) => {
            mount[i] = x[i];
            if(typeof mount[i] == 'object'){
                hybridObserve(mount[i]);
            }
            Object.defineProperty(x, i,
                {
                    get() { return mount[i] },
                    set(v) { 
                        mount[i] = v
                    }
                }
            );
        })(i);
    }
    return x;
}


// 注册组件
for(let key in comps){
    if(key != "default") {
        Vue.component(key, comps[key].default)
    }
}

window.vue = vue;

var state = ao.glueObject({
    width: 5760,
    height: 1080,
    scale: 0.3,
    focus: '',
    selectId: { }, // ""
    selectName: { }, // "",
    player_slideId: { }, // 0
    player_play: {  }, //  true,
    player_muted: { }, //  true,
    player_loop: { }, //  true,
    player_time: { }, //  true,
    current_time: glueValue({}),
    lastTime: Date.now(),
    add_time() {
        this.lastTime = new Date()
    },
    load: false
})
window.state = state;

fetch("assets/content/displays.yaml")
    .then(data => data.text())
    .then(data => {
        let d =  YAML.parse(data);
        d.forEach(ele => {
            state.selectId[ele.id] = null;
            state.selectName[ele.id] = null;
            state.player_slideId[ele.id] = 0;
            state.player_play[ele.id] = true;
            state.player_muted[ele.id] = false;
            state.player_loop[ele.id] = false;
            state.player_time[ele.id] = 0;
            state.current_time[ele.id] = 0;
        });
        return d
    })
    .then(async data => {
        await Promise.all(data.map((e, index, array) => {
            return fetch("assets/content/" + e.list)
                .then(data => data.text())
                .then(data => YAML.parse(data))
                .then(data => {
                    array[index]["content"] = [ ...data ];
                })
        }));
        console.log("get yaml end");
        init(data)
    });

var local = vue.reactive({})
window.local = local;

function init(items) {
    new Vue({
        el: "#app",
        data: { local, state, items },
        mounted(){
            ao.looperStart();
            ao.looperShowFPS();
        }
    })
}

// 连接远程服务器，获取在线数据
ao.glueAdaptorIO.init("http://localhost:9999")
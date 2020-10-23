import * as ao from "../../libao"
import { Vue, vue } from "../../libao";
import * as YAML from "yaml"
import * as comps from "./component/*.vue";
// import viewer from "./vue/viewer.vue";


// 注册组件
for(let key in comps){
    if(key != "default") {
        Vue.component(key, comps[key].default)
    }
}

window.vue = vue;

function hybridObserve(x) {
    if (x.__hobserved) return x;
    Object.defineProperty(x, "__hobserved", {
        enumerable: false,
        writable: false,
        value: 1
    });
    var mount = vue.reactive({});
    for (var i in x) {
        ((i) => {
            mount[i] = x[i];
            if (typeof mount[i] == 'object') {
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

fetch("assets/content/displays.yaml")
    .then(data => data.text())
    .then(data => YAML.parse(data))
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

var state = ao.glueObject({
    width: 5760,
    height: 1080,
    scale: 0.3,
    focus: '',
    selectId: {
        overlayScreen: null,
        screenA: null,
        screenB: null,
        screenC: null
    }, // ""
    selectName: {
        overlayScreen: null,
        screenA: null,
        screenB: null,
        screenC: null
    }, // "",
    player_slideId: {
        overlayScreen: 0,
        screenA: 0,
        screenB: 0,
        screenC: 0
    }, // 0
    player_play: {
        overlayScreen: true,
        screenA: true,
        screenB: true,
        screenC: true
    }, //  true,
    player_muted: {
        overlayScreen: false,
        screenA: false,
        screenB: false,
        screenC: false
    }, //  true,
    player_loop: {
        overlayScreen: false,
        screenA: false,
        screenB: false,
        screenC: false
    }, //  true,
    player_time: {
        overlayScreen: 0,
        screenA: 0,
        screenB: 0,
        screenC: 0
    }, //  true,
    
    lastTime: Date.now(),
    add_time() {
        this.lastTime = new Date()
    },


    load: false
})
window.state = state;

var local = vue.reactive({})
window.local = local;

function init(items) {
    
    new Vue({
        el: "#app",
        data: { local, state, items }
    })

    // 开启 loop
    ao.looperStart();
    ao.loop(loop)
}

function loop(){
    if (Date.now() - state.lastTime > 300000 && state.mode > -1) { // 5分钟 300000
        console.log("ending time");
    }
}

// 连接远程服务器，获取在线数据
ao.glueAdaptorIO.init("http://localhost:9999")
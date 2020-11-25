var sock = io("/glue");

var shared = {
    def: {},
    focus: false,
    obj: {},
    host: "http://127.0.0.1:8080/",
    keys: {
        photo: "image",
        viewer: "video",
        slide: "文档",
        message: "text"
    }
};

fetch(shared.host + "content/json/displays.json")
    .then(data => data.json())
    .then(async data => {
        await Promise.all(data.map((e, index, array) => {
            return fetch(shared.host + "content/json/" + e.list)
                .then(data => data.json())
                .then(data => {
                    array[index]["content"] = [...data];
                })
        }));
        console.log("get yaml end", data);
        init(data)
    });

sock.on("def-relay", (d) => {
    console.log("def-relay");
    shared.def = d;
});
sock.on("up-relay", (delta) => {
    console.log("up-relay");
    try {
        if (delta.type == "value_changed") {
            shared.def[delta.path].value = delta.new_val;
            // console.log('vl', delta);
            if (delta.path == "/focus") {
                shared.focus = delta.new_val
            }
            if(delta.path=="/player_muted"){
                console.log(delta.new_val);
            }
        }
        else {
            console.log('ev', delta);
        }
    }
    catch (e) { }
});

sock.emit("req-sync")

function init(v) {
    shared.items = v;
    shared.com = {};
    shared.items.forEach(item => {
        shared.com[item.id] = {}
        item.content.length > 0 && item.content.forEach(ct => {
            if (ct.name != 'bg') {
                ct.type_key = shared.keys[ct.type]
                shared.com[item.id][ct.name] = ct
                shared.com[item.id][ct.name].select = false;
            }
        })
    });

    Vue.use(VueLazyload)

    new Vue({
        el: "#main",
        data: shared,
        methods: {
            // 开启遮罩
            open_shade(_this, ids) {
                if(shared.focus == ids){
                    document.getElementById(ids).checked = false;
                    shared.focus = ''
                } else {
                    shared.focus = ids
                }

                this.send_socket_control("value_set", '/focus', shared.focus)
                this.send_socket_control("action", '/add_time')
            },
            // 发送 video 当前时间
            send_video_time(e, ids){
                console.log(e, ids);
                shared.def['/player_time'].value[ids] = e.target.value * 1;
                this.send_socket_control("value_set", '/player_time', shared.def['/player_time'].value)
                this.send_socket_control("action", '/add_time')
            },
            // 发送 ppt 页码
            send_ppt_control(ids, page){
                shared.def['/player_slideId'].value[ids] = page
                sock.emit("control", {
                    type: "value_set",
                    path: "/player_slideId",
                    new_val: shared.def['/player_slideId'].value //check
                })
                sock.emit("control", {
                    type: "action",
                    path: '/add_time',
                })
            },
            // 发送 video 配置
            send_video_control(ids, type, def = undefined){
                switch(type){
                    case 'play':
                        shared.def['/player_play'].value[ids] = (def != '' ? def : '') || !shared.def['/player_play'].value[ids]
                        this.send_socket_control("value_set", '/player_play', shared.def['/player_play'].value)
                        break;
                    case 'muted':
                        console.log( (def != undefined ? def : ''));
                        shared.def['/player_muted'].value[ids] = def != undefined ? def :  !shared.def['/player_muted'].value[ids];
                        console.log(def, shared.def['/player_muted'].value[ids])
                        this.send_socket_control("value_set", '/player_muted', shared.def['/player_muted'].value)
                        break;
                    case 'loop':
                        shared.def['/player_loop'].value[ids] = (def != '' ? def : '') || !shared.def['/player_loop'].value[ids];
                        this.send_socket_control("value_set", '/player_loop', shared.def['/player_loop'].value)
                        break;
                }
                this.send_socket_control("action", '/add_time')
            },
            // 发送选中屏 + 组件状态
            send_code(ids, names) {
                // 屏
                if(ids && !names){
                    shared.def['/selectId'].value[ids] = !shared.def['/selectId'].value[ids]
                    shared.def['/selectName'].value[ids] = null

                    for(let key in shared.com[ids]){
                        shared.com[ids][key].select = false;
                    }
                }
                if(ids && names){
                    // 组件
                    shared.com[ids][names].select = !shared.com[ids][names].select;

                    for(let key in shared.com[ids]){
                        if(key != names) shared.com[ids][key].select = false;
                    }

                    // 每次选择前，该列选项归零
                    this.send_video_control(ids, 'play', true)
                    this.send_video_control(ids, 'muted', false)
                    this.send_video_control(ids, 'loop', false)
                    shared.def['/player_time'].value[ids] = 0;
                    this.send_socket_control("value_set", '/player_time', shared.def['/player_time'].value)
                    this.send_ppt_control(ids, 0)

                    if(shared.com[ids][names].select){
                        shared.def['/selectId'].value[ids] = true;
                        shared.def['/selectName'].value[ids] = names
                    } else {
                        shared.def['/selectName'].value[ids] = null
                        shared.def['/selectId'].value[ids] = false;
                    }
                }

                this.send_socket_control("value_set", '/selectId', shared.def['/selectId'].value)
                this.send_socket_control("value_set", '/selectName', shared.def['/selectName'].value)
                this.send_socket_control("action", '/add_time')
            },
            // 发送 socket
            send_socket_control(type, path, new_val){
                new_val && sock.emit("control", { type, path, new_val });
                !new_val && sock.emit("control", { type, path });
            }
        }
    })
}


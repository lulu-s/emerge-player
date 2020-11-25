//gate way - for dev only
var express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
io.origins('*:*');

app.use(require('cors')());

function load(p, mount) {
    mount = mount || p;
    var router = express.Router();
    require("./" + p + "/svc.js").init(
        {
            router: router,
            io: io.of(mount)
        }
    );
    app.use("/" + mount, router);
    console.log("mounting ", p, "to", mount);
}

http.listen(9999, () => {  });
load("glue-pod", "glue");
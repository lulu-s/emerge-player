
module.exports.init = function ({
    router, io
}) {
    router.use(require('serve-static')(__dirname + "/gui/"))
    //TODO: needs routing / segmentation / other-stuff
    io.on('connection', (socket) => {
        console.log("GLUE- CON")
        socket.on("up", (d) => {
            socket.broadcast.emit('up-relay', d); //proxy
        });
        socket.on("def", (d) => {
            socket.broadcast.emit('def-relay', d); //proxy
        });
        socket.on("control", (d) => {
            socket.broadcast.emit('controlled', d); //proxy
        });
        socket.on("req-sync", (d) => {
            socket.broadcast.emit('hello'); //proxy
        });
        socket.emit("hello") //fetch from other parties!
    });

}
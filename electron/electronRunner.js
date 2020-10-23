const electron = require('electron')
const {
    app,
    BrowserWindow
} = require('electron')
app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
app.commandLine.appendSwitch("--disable-http-cache");

function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        frame: false,
        x: 0,
        y: 0,
        width: 5760,
        height: 1080,
        enableLargerThanScreen: true,
        // fullscreen: true
    })

    // and load the index.html of the app.
    win.loadURL('http://localhost:1234/index.html')
    win.setSize(5760, 1080);
    //win.openDevTools();
}

app.on('ready', createWindow)
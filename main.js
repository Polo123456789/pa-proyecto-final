// @ts-check

const {app, BrowserWindow} = require('electron');

/** @type BrowserWindow */
let win;

app.on('ready', () => {
    win = new BrowserWindow({
        show: false,
    });
    win.loadFile('index.html');
    win.maximize();
    win.show();
});

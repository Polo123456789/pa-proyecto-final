// @ts-check

const {app, BrowserWindow} = require('electron');
const path = require("path");

/** @type BrowserWindow */
let win;

app.on('ready', () => {
    win = new BrowserWindow({
        show: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.js")
        }
    });
    win.loadFile('index.html');
    win.maximize();
    win.show();
});

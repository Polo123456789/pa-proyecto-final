// @ts-check

const {app, BrowserWindow} = require('electron');
const bcrypt  = require('bcrypt');

const config = require('./config');

/** @type BrowserWindow */
let win;

console.log(bcrypt.hashSync("hola", config.bcrypt.saltRounds));
console.log(bcrypt.compareSync("hola", "$2b$10$r7YEWQbSnbiSxWnl3Nxcy.YwkuLH0X7N4lfQeUd5thfdFkoailo9a"))

// app.on('ready', () => {
//     win = new BrowserWindow({
//         show: false,
//     });
//     win.loadFile('index.html');
//     win.maximize();
//     win.show();
// });

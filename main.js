// @ts-check

const {app, BrowserWindow, ipcMain} = require('electron');
const bcrypt = require("bcrypt");
const path = require("path");

const db = require("./db-operations");

/**
 * @typedef {import("./db/db-types").usuario} user
 * @typedef {import("./db/db-types").producto} product
 * @typedef {import("./db/db-types").proveedor} provider
 * @typedef {import("./db/db-types").proveedorDaProducto} providerGivesProduct
 * @typedef {import("./db/db-types").pedido} order
 * @typedef {import("./db/db-types").mysqlCallback} myslqCallback
 */

/** @type BrowserWindow */
let win;

/** @type user */
let activeUser;

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

/**
 * @argument {number} id
 * @argument {string} password
 */
ipcMain.on("validate-password", (_evt, id, password) => {
    db.getUserById(id, (err, result) => {
        if (err) {
            console.error(err);
            win.webContents.send("bad-login", err);
            return;
        }
        const badLoginMsg = "ID o contraseña incorrectos";
        const users = /** @type user[] */ (result);

        if (users.length == 0) {
            win.webContents.send("bad-login", badLoginMsg);
            return;
        }

        const user = users[0];
        if (bcrypt.compareSync(password, user.contra)) {
            activeUser = user;
            win.loadFile("lista-de-productos.html");
        } else {
            win.webContents.send("bad-login", badLoginMsg);
        }
    })
})

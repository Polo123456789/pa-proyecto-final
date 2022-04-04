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

ipcMain.on("validate-password",
    /**
     * @argument {number} id
     * @argument {string} password
    */
    (_evt, id, password) => {
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
    }
)

ipcMain.on("ask-for-products", (_evt) => {
    db.getProducts((err, result) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(result)
        win.webContents.send("handle-product-list", result);
    });
})

ipcMain.on("go-to-update-product",
    /** @argument {product} product */
    (_evt, product) => {
        win.loadFile("actualizar-producto.html");
        win.webContents.on("did-finish-load", () => {
            win.webContents.send("handle-product", product);
        })
    }
)

ipcMain.on("go-to-create-order", 
    /**
     * @argument {product} product
     */
    (_evt, product) => {
        win.loadFile("pedir-producto.html");
        win.webContents.on("did-finish-load", () => {
            db.getProvidersForProduct(product, (err, result) => {
                if (err) {
                    console.error(err);
                    return;
                }
                win.webContents.send("handle-products-and-providers", product, result);
            })
        })
    }
)

ipcMain.on("update-product", (_evt, product) => {
    db.updateProduct(product, (err) => {
        if (err) {
            console.error(err);
        }
        win.loadFile("lista-de-productos.html");
    })
})

ipcMain.on("create-order",
    /**
     * @argument {any} _evt
     * @argument {product} product
     * @argument {provider} provider
     * @argument {number} amount
     */
    (_evt, product, provider, amount) => {
        db.createOrder(product, provider, activeUser, amount, (err) => {
            if (err) {
                console.error(err);
            }
            win.loadFile("lista-de-productos.html");
        });
    }
)

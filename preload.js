// @ts-check
const {contextBridge, ipcRenderer} = require("electron");

/**
 * @typedef {import("./db/db-types").usuario} user
 * @typedef {import("./db/db-types").producto} product
 * @typedef {import("./db/db-types").proveedor} provider
 * @typedef {import("./db/db-types").proveedorDaProducto} providerGivesProduct
 * @typedef {import("./db/db-types").pedido} order
 * @typedef {import("./db/db-types").mysqlCallback} myslqCallback
 */

contextBridge.exposeInMainWorld("electron", {
    //
    // Login
    //
    /**
     * @argument {number} id
     * @argument {string} password
     */
    validatePassword: (id, password) => {
        ipcRenderer.send("validate-password", id, password);
    },
    /** @argument {(_evt: any, message: string) => void} callback */
    handleBadLogin: (callback) => {
        ipcRenderer.on("bad-login", callback);
    },

    //
    // Product list
    //
    askForProducts: () => ipcRenderer.send("ask-for-products"),
    /** @argument {(_evt: any, products: product[]) => void} callback */
    handleProductList: (callback) => {
        ipcRenderer.on("handle-product-list", callback);
    },
    /** @argument {product} product */
    goToUpdateProduct: (product) => {
        ipcRenderer.send("go-to-update-product", product);
    },
    /** @argument {product} product */
    goToCreateOrder: (product) => {
        ipcRenderer.send("go-to-create-order", product)
    },

    //
    // Update product
    //
    /** @argument {(_evt: any, product: product) => void} callback */
    handleProduct: (callback) => {
        ipcRenderer.on("handle-product", callback);
    },
    /** @argument {product} product */
    updateProduct: (product) => {
        ipcRenderer.send("update-product", product);
    },

    //
    // Make order
    //
    /** @argument {(_evt: any, product: product, providers: provider[]) => void}
     *            callback */
    handleProductAndProviders: (callback) => {
        ipcRenderer.on("handle-products-and-providers", callback);
    },
    /**
     * @argument {product} product
     * @argument {provider} provider
     * @argument {number} amount
     */
    createOrder: (product, provider, amount) => {
        ipcRenderer.send("create-order", product, provider, amount);
    }
});

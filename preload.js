// @ts-check
const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("electron", {
    //
    // Login
    //
    validatePassword: (id, password) => {
        ipcRenderer.send("validate-password", id, password);
    },
    handleBadLogin: (callback) => {
        ipcRenderer.on("bad-login", callback);
    },

    //
    // Product list
    //
    askForProducts: () => ipcRenderer.send("ask-for-products"),
    handleProductList: (callback) => {
        ipcRenderer.on("handle-product-list", callback);
    },
    goToUpdateProduct: (product) => {
        ipcRenderer.send("go-to-update-product", product);
    },
    goToCreateOrder: (product) => {
        ipcRenderer.send("go-to-create-order", product)
    },

    //
    // Update product
    //
    handleProduct: (callback) => {
        ipcRenderer.on("handle-product", callback);
    },
    updateProduct: (product) => {
        ipcRenderer.send("update-product", product);
    },

    //
    // Make order
    //
    handleProductAndProviders: (callback) => {
        ipcRenderer.on("handle-products-and-providers", callback);
    },
    createOrder: (product, provider, amount) => {
        ipcRenderer.send("create-order", product, provider, amount);
    }
});

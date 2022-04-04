// @ts-check

/**
 * @typedef {import("./db/db-types").usuario} user
 * @typedef {import("./db/db-types").producto} product
 * @typedef {import("./db/db-types").proveedor} provider
 * @typedef {import("./db/db-types").proveedorDaProducto} providerGivesProduct
 * @typedef {import("./db/db-types").pedido} order
 * @typedef {import("./db/db-types").mysqlCallback} myslqCallback
 */

/** @type HTMLInputElement */
const id = document.querySelector("#id");;
/** @type HTMLInputElement */
const name = document.querySelector("#name");
/** @type HTMLInputElement */
const description = document.querySelector("#description");
/** @type HTMLInputElement */
const categorie = document.querySelector("#categorie");
/** @type HTMLInputElement */
const exitencies = document.querySelector("#exitencies");
/** @type HTMLInputElement */
const updateBtn = document.querySelector("#update-btn");
/** @type HTMLInputElement */
const discardBtn = document.querySelector("#discard-btn");

/**
 * @argument {any} _evt
 * @argument {product} product
 */
const handleProduct = (_evt, product) => {
    id.value = product.id.toString();
    name.value = product.nombre;
    description.value = product.descripcion;
    categorie.value = product.categoria;
    exitencies.value = product.existencias.toString();
};
// @ts-ignore
window.electron.handleProduct(handleProduct);

discardBtn.addEventListener("click", () => {
    window.location.href = "lista-de-productos.html";
})

updateBtn.addEventListener("click", (evt) => {
    evt.preventDefault();

    /** @type product */
    const newProduct = {
        id: parseInt(id.value),
        nombre: name.value,
        descripcion: description.value,
        categoria: categorie.value,
        existencias: parseInt(exitencies.value),
    };

    // @ts-ignore
    window.electron.updateProduct(newProduct);
})

module.exports = {}; // Por algun motivo parece que `name` ya es una variable
                     // en algun lado, que no tiene nada que ver con lo que
                     // estoy haciendo, y no se va el warning excepto a que
                     // agrege esto al final.

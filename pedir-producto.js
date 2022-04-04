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
const id = document.querySelector("#id");
/** @type HTMLInputElement */
const name = document.querySelector("#name");
/** @type HTMLInputElement */
const providerList = document.querySelector("#provider");
/** @type HTMLInputElement */
const amount = document.querySelector("#amount");

const form = document.querySelector("form");


/** @type product */
let product;

/** @type provider[] */
let providers;

/**
 * @argument {any} _evt
 * @argument {product} p
 * @argument {provider[]} prviders
 */
const handleProductAndProviders = (_evt, p, prviders) => {
    product = p;
    providers = prviders;

    id.value = product.id.toString();
    name.value = product.nombre;
    amount.value = "0";

    providerList.innerHTML = "";
    for (let i = 0; i < providers.length; i++) {
        const option = document.createElement("option");
        option.value = i.toString();
        option.innerText = providers[i].nombre;

        providerList.appendChild(option);
    }
}
// @ts-ignore
window.electron.handleProductAndProviders(handleProductAndProviders);

form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const index = parseInt(providerList.value);
    const provider = providers[index];
    const a = parseInt(amount.value);

    // @ts-ignore
    window.electron.createOrder(product, provider, a);
})

module.exports = {}; // Misma nota que en `actualizar-producto.js`

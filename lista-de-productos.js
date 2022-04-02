// @ts-check

/**
 * @typedef {import("./db/db-types").usuario} user
 * @typedef {import("./db/db-types").producto} product
 * @typedef {import("./db/db-types").proveedor} provider
 * @typedef {import("./db/db-types").proveedorDaProducto} providerGivesProduct
 * @typedef {import("./db/db-types").pedido} order
 * @typedef {import("./db/db-types").mysqlCallback} myslqCallback
 */

/**
 * @argument {product} product
 * @returns {HTMLTableRowElement}
 */
const createProductRow = (product) => {
    const row = document.createElement("tr");
    const id = document.createElement("td");
    const name = document.createElement("td");
    const description = document.createElement("td");
    const categorie = document.createElement("td");
    const existencies = document.createElement("td");
    const update = document.createElement("td");
    const makeOrder = document.createElement("td");

    const updateBtn = document.createElement("button");
    updateBtn.innerText = "Actualizar";
    updateBtn.addEventListener("click", () => {
        // @ts-ignore
        window.electron.goToUpdateProduct(product);
    })

    const makeOrderBtn = document.createElement("button");
    makeOrderBtn.innerText = "Crear pedido";
    makeOrderBtn.addEventListener("click", () => {
        // @ts-ignore
        window.electron.goToCreateOrder(product);
    })

    id.innerText = product.id.toString();
    name.innerText = product.nombre;
    description.innerText = product.descripcion;
    categorie.innerText = product.categoria;
    existencies.innerText = product.existencias.toString();
    update.appendChild(updateBtn);
    makeOrder.appendChild(makeOrderBtn);

    row.appendChild(id);
    row.appendChild(name);
    row.appendChild(description);
    row.appendChild(categorie);
    row.appendChild(existencies);
    row.appendChild(update);
    row.appendChild(makeOrder);

    return row;
}

/**
 * @argument {any} _evt
 * @argument {product[]} products
 */
const handleProductList = (_evt, products) => {
    const t = document.querySelector("tbody");
    for (const p of products) {
        t.appendChild(createProductRow(p));
    }
}

// @ts-ignore
window.electron.handleProductList(handleProductList);
// @ts-ignore
window.electron.askForProducts();

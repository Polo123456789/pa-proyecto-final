// @ts-check
const mysql = require("mysql2");
const config = require("./config");

/**
 * @typedef {import("./db/db-types").usuario} user
 * @typedef {import("./db/db-types").producto} product
 * @typedef {import("./db/db-types").proveedor} provider
 * @typedef {import("./db/db-types").proveedorDaProducto} providerGivesProduct
 * @typedef {import("./db/db-types").pedido} order
 * @typedef {import("./db/db-types").mysqlCallback} myslqCallback
 */

const connection = mysql.createConnection({
    host: config.db.host,
    user: config.db.username,
    password: config.db.password,
    database: config.db.name,
});

/**
 * @argument {number} id
 * @argument {myslqCallback} callback
 */
const getUserById = (id, callback) => {
    connection.query(
        "SELECT * FROM usuario WHERE id = ?;",
        [id],
        callback
    )
}

/**
 * @argument {myslqCallback} callback
 */
const getProducts = (callback) => {
    connection.query(
        "SELECT producto.*, SUM(pedido.cantidad) AS cantidadEnPedido FROM producto "
        + "LEFT JOIN pedido ON pedido.productoId = producto.id;",
        callback
    );
}

/**
 * @argument {product} product
 * @argument {myslqCallback} callback
 */
const updateProduct = (product, callback) => {
    connection.query(
        "UPDATE producto SET nombre = ?, descripcion = ?,"
        + " categoria = ?, existencias = ? WHERE id = ?;",
        [
            product.nombre,
            product.descripcion,
            product.categoria,
            product.existencias,
            product.id
        ],
        callback
    );
}

/**
 * @argument {product} product
 * @argument {myslqCallback} callback
 */
const getProvidersForProduct = (product, callback) => {
    const providersIds =
        "(SELECT proveedorId FROM proveedorDaProducto WHERE productoId = ?)";

    connection.query(
        "SELECT * FROM proveedor WHERE id IN " + providersIds + ";",
        [product.id],
        callback
    );
}

/**
 * @argument {product} product
 * @argument {provider} provider
 * @argument {user} user
 * @argument {number} amount
 * @argument {myslqCallback} callback
 */
const createOrder = (product, provider, user, amount, callback) => {
    connection.query(
        "INSERT INTO pedido "
        + "(fecha, entregado, cantidad, proveedorId, productoId, usuarioId)"
        + "VALUES (?, ?, ?, ?, ?, ?)",
        [new Date(), 0, amount, provider.id, product.id, user.id],
        callback
    );
}

/**
 * @argument {product} product
 * @argument {myslqCallback} callback
 */
const getOrders = (product, callback) => {
    connection.query(
        "SELECT * FROM pedido WHERE productoId = ?;",
        [product.id],
        callback
    );
}


module.exports.connection = connection;
module.exports.getUserById = getUserById;
module.exports.getProducts = getProducts;
module.exports.updateProduct = updateProduct;
module.exports.getProvidersForProduct = getProvidersForProduct;
module.exports.createOrder = createOrder;
module.exports.getOrders = getOrders;

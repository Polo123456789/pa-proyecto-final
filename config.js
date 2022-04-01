module.exports = {
    db: {
        name: "paProyectoFinal",
        username: process.env['MYSQL_USER'],
        password: process.env['MYSQL_PASSWORD'],
        host: 'localhost',
    },
    bcrypt: {
        saltRounds: 10,
    },
    app: {
        defaultPassword: 'password',
    }
}

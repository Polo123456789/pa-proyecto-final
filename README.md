# Proyecto Final

Proyecto final, Programación Avanzada, TDS 2022. Según las instrucciones en
`docs/instrucciones.pdf`.

---

Credenciales default en la app:

* ID: `1`
* Contraseña: `password`

---

Para crear la base de datos, corra el script ubicado en:

```
db/create-db.sql
```

Para que la conexión a la base de datos sea exitosa, tiene que proveer un
usuario que tenga todos los permisos para la base de datos `paProyectoFinal`.

Puede darle las credenciales a la app creando las variables de entorno:

* `MYSQL_USER`: Con el usuario.
* `MYSQL_PASSWORD`: Con la contraseña.

<details>

<summary>
    Ejemplos
</summary>

Batch:

```
SET MYSQL_USER = "user"
SET MYSQL_PASSWORD = "password"
```

Powershell:

```
$env:MYSQL_USER =  "user"
$env:MYSQL_PASSWORD = "password"
```

Bash:

```
export MYSQL_USER = "user"
export MYSQL_PASSWORD = "password"
```

</details>

O puede editar las lineas 4 y 5 archivo `config.js` para darlas:

```
        username: process.env['MYSQL_USER'],
        password: process.env['MYSQL_PASSWORD'],
```

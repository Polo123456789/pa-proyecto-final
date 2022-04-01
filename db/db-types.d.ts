import {
    QueryError,
    RowDataPacket,
    OkPacket,
    ResultSetHeader,
    FieldPacket
} from 'mysql2';

export interface usuario {
    readonly id?: number,
    nombre: string,
    contra: string,
}

export interface producto {
    readonly id?: number,
    nombre: string,
    descripcion: string,
    categoria: string,
    existencias: number,
}

export interface proveedor {
    readonly id?: number,
    nombre: string,
    telefono: string,
    correo: string,
}

export interface proveedorDaProducto {
    readonly id?: number,
    proveedorId: number,
    productoId: number,
}

export interface pedido {
    readonly id?: number,
    fecha: Date,
    entregado: boolean,
    cantidad: number,
    proveedorId: number,
    productoId: number,
    usuarioId: number,
}

type mysqlError = QueryError;
type mysqlFields = FieldPacket[];
type mysqlResult = RowDataPacket[]
                   | RowDataPacket[][]
                   | OkPacket
                   | OkPacket[]
                   | ResultSetHeader;

export type mysqlCallback = (err: mysqlError,
                             result: mysqlResult,
                             fields: mysqlFields) => any;

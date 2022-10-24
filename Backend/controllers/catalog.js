const session  = require("../database/connection");
const { response } = require('express');

const obtenerMarcas = async(req, res = response) => {
    try {
        var result = await session.run(
            `match(m:Marca) return m`
        )

        const marcas = []

        const records = result.records
        for (let i = 0; i < records.length; i++) {
            const title = records[i].get(0).properties
            marcas.push(title)
        }

        return res.status(200).json(
            {
                ok: true,
                result: marcas
            }
        );
        
    } catch (error) {
        res.status(400).json(
            {
                ok: false,
                msg: error
            }
        );
    }
}

const obtenerProductos = async(req, res = response) => {
    try {
        var result = await session.run(
            `match(p:Producto) return p`
        )

        const productos = []

        const records = result.records
        for (let i = 0; i < records.length; i++) {
            const title = records[i].get(0).properties
            productos.push(title)
        }

        return res.status(200).json(
            {
                ok: true,
                result: productos
            }
        );
        
    } catch (error) {
        res.status(400).json(
            {
                ok: false,
                msg: error
            }
        );
    }
}

const crearProducto = async(req, res = response) => {
    const { nombre, marca, precio} = req.body;

    try {

        var result = await session.run(
            `MATCH(p1: Producto)
            WITH max(toInteger(p1.id)) as i
            CREATE (p: Producto {id: toString(i+1), nombre: $name, marca: $brand, precio: $price})
            WITH p
            MATCH (p), (m: Marca)
            WHERE p.marca = m.nombre
            MERGE (p)-[r: producidoPor]->(m)
            return p`,
            { name: nombre, brand: marca, price: precio}
        );

        const marcas = []

        const records = result.records
        for (let i = 0; i < records.length; i++) {
            const title = records[i].get(0).properties
            marcas.push(title)
        }

        return res.status(200).json(
            {
                ok: true,
                result: marcas
            }
        );
        
    } catch (error) {
        res.status(400).json(
            {
                ok: false,
                msg: error
            }
        );
    }
}

const eliminarProducto = async(req, res = response) => {
    const userId = req.params.id;

    try {

        await session.run(
            `match (p: Producto {id: $id}) detach delete p`,
            {id: userId.toString()}
        )

        return res.status(200).json(
            {
                ok: true,
                msg: "Producto eliminado exitosamente"
            }
        );
        
    } catch (error) {
        res.status(400).json(
            {
                ok: false,
                msg: error
            }
        );
    }
}

const actualizarProducto = async(req, res = response) => {
    const { id, nombre, marca, precio} = req.body;

    try {

        var result = await session.run(
            `match(p: Producto {id: $id})-[r: producidoPor]->(m: Marca)
            where p.marca = m.nombre
            with p, r
            set p += {nombre: $name, marca: $brand, precio: $price }
            delete r
            WITH p
            MATCH (p), (m1: Marca)
            WHERE p.marca = m1.nombre
            MERGE (p)-[r2: producidoPor]->(m1)
            return p`,
            { id, name: nombre, brand: marca, price: precio}
        )

        const productos = []

        const records = result.records
        for (let i = 0; i < records.length; i++) {
            const title = records[i].get(0).properties
            productos.push(title)
        }

        return res.status(200).json(
            {
                ok: true,
                result: productos
            }
        );
        
    } catch (error) {
        res.status(400).json(
            {
                ok: false,
                msg: error
            }
        );
    }
}

const registrarCompras = async(req, res = response) => {
    arrayCompras = req.body;

    for(let compra of arrayCompras){

        var {idCliente, idProducto, cantidad } = compra;

        try {

            await session.run(
                `MATCH (c: Cliente), (p: Producto)
                WHERE c.id = $idCliente and p.id = $idProducto
                MERGE (c)-[r: Compra {cantidad: $cantidad}]->(p)`,
                { idCliente, idProducto, cantidad }
            );

        } catch (error) {
            res.status(400).json(
                {
                    ok: false,
                    msg: error
                }
            );
        }
    }

    return res.status(200).json(
        {
            ok: true,
            msg: "Compras agregadas correctamente"
        }
    );
}

module.exports = {
    obtenerMarcas,
    obtenerProductos,
    crearProducto,
    eliminarProducto,
    actualizarProducto,
    registrarCompras
}
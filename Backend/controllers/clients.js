const session  = require("../database/connection");
const { response } = require('express');


const getClientePorId = async(req, res = response) => {
    const userId = req.params.id;

    try {

        var result = await session.run(
            `match(c: Cliente {id: $id}) return c`,
            {id: userId.toString()}
        )

        const clients = []

        const records = result.records
        for (let i = 0; i < records.length; i++) {
            const title = records[i].get(0).properties
            clients.push(title)
        }

        return res.status(200).json(
            {
                ok: true,
                result: clients
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

const getClientePorNombre = async(req, res = response) => {
    const user = req.params.user;

    try {

        var result = await session.run(
            `match(c: Cliente {first_name: $name}) return c`,
            {name: user}
        )

        const clients = []

        const records = result.records
        for (let i = 0; i < records.length; i++) {
            const title = records[i].get(0).properties
            clients.push(title)
        }

        return res.status(200).json(
            {
                ok: true,
                result: clients
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

const getTodosLosClientes = async(req, res = response) => {
    try {

        var result = await session.run(
            `match(c: Cliente) return c`
        )

        const clients = []

        const records = result.records
        for (let i = 0; i < records.length; i++) {
            const title = records[i].get(0).properties
            clients.push(title)
        }

        return res.status(200).json(
            {
                ok: true,
                result: clients
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

const crearCliente = async(req, res = response) => {
    const { first_name, last_name } = req.body;

    try {
        var result = await session.run(
            `match(c1:Cliente)
            with max(toInteger(c1.id)) as i
            CREATE(c: Cliente {first_name: $fn, last_name: $ln, id: toString(i+1)}) 
            return c`,
            { fn: first_name, ln: last_name}
        );

        const clients = []

        const records = result.records
        for (let i = 0; i < records.length; i++) {
            const title = records[i].get(0).properties
            clients.push(title)
        }

        return res.status(200).json(
            {
                ok: true,
                result: clients
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

const eliminarCliente = async(req, res = response) => {
    const userId = req.params.id;

    try {

        await session.run(
            `match(c: Cliente {id: $id}) detach delete c`,
            {id: userId.toString()}
        )

        return res.status(200).json(
            {
                ok: true,
                msg: "Cliente eliminado exitosamente"
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


const actualizarCliente = async(req, res = response) => {
    const { id, first_name, last_name } = req.body;

    try {
        var result = await session.run(
            `match(c: Cliente {id: $id})
            set c += {first_name: $fn, last_name: $ln}
            return c`,
            { id: id, fn: first_name, ln: last_name}
        );

        const clients = []

        const records = result.records
        for (let i = 0; i < records.length; i++) {
            const title = records[i].get(0).properties
            clients.push(title)
        }

        return res.status(200).json(
            {
                ok: true,
                result: clients
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

module.exports = {
    getClientePorId,
    getTodosLosClientes,
    crearCliente,
    eliminarCliente,
    actualizarCliente,
    getClientePorNombre
}

const session  = require("../database/connection");
const { response } = require('express');
const { isConstValueNode } = require("graphql");

const getTopCompras = async(req, res = response) => {
    try {

        var result = await session.run(
            `match(x:Producto)<-[r:Compra]-(c:Cliente)
            return x.nombre,SUM(toInteger(r.cantidad)) as cant_vendidos
            order by cant_vendidos desc
            limit 5`
        )
        
        const product = []
        
        const records = result.records
        for (let i = 0; i < records.length; i++) {
            const title = {
                name: records[i].get(0),
                quantity_sold: records[i].get(1)
              };      
            product.push(title)
        }
        
        return res.status(200).json(
            {
                ok: true,
                result: product
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

const getTopSeparateCompras = async(req, res = response) => {

    try {

        var result = await session.run(
            `match(x:Producto)<-[r:Compra]-(c:Cliente)
            with x,SUM(toInteger(r.cantidad)) as cant_vendidos
            return x.nombre,cant_vendidos
            order by cant_vendidos desc
            limit 5`
        )


        const product = []
        
        const records = result.records
        for (let i = 0; i < records.length; i++) {
            const title = {
                name: records[i].get(0),
                quantity_sold: records[i].get(1)
              }; 
            product.push(title)
        }

        return res.status(200).json(
            {
                ok: true,
                result: product
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


const getTopBrands = async(req, res = response) => {

    try {

        var result = await session.run(
            `match(p:Producto)-[r:producidoPor]->(m:Marca)
            match(p)<-[c:Compra]-(cl:Cliente)
            with m,SUM(toInteger(c.cantidad)) as cant_vendidos
            return m.nombre,m.pais, cant_vendidos
            order by cant_vendidos desc
            limit 5`
        )

        const brands = []
        const records = result.records
        for (let i = 0; i < records.length; i++) {
            const title = {
                name: records[i].get(0),
                country: records[i].get(1),
                quantity_sold: records[i].get(2)
              }; 
            brands.push(title)
            
        }

        return res.status(200).json(
            {
                ok: true,
                result: brands
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

const getTopClients = async(req, res = response) => {

    try {

        var result = await session.run(
            `match(x:Producto)<-[r:Compra]-(c:Cliente)
            with c,SUM(toInteger(r.cantidad)) as compras_total
            return c.first_name,c.last_name,compras_total
            order by compras_total desc
            limit 5`
        )

        const clients = []

        const records = result.records
        for (let i = 0; i < records.length; i++) {
            const title = {
                first_name: records[i].get(0),
                last_name: records[i].get(1),
                total_sold: records[i].get(2)
              }; 
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

const getSearchClient = async(req, res = response) => {
    const user = req.body;

    try {

        var result = await session.run(
            `match(x:Producto)<-[r:Compra]-(c:Cliente{first_name: $first_name,last_name: $last_name})
            return x.nombre,r.cantidad`,
            {first_name: user.first_name.toString(),last_name:user.last_name.toString()}
        )

        const product = []

        const records = result.records
        for (let i = 0; i < records.length; i++) {
            const title = {
                name: records[i].get(0),
                quantity: records[i].get(1)
              }; 
            product.push(title)
        }

        return res.status(200).json(
            {
                ok: true,
                result: product
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

const getCommonClient = async(req, res = response) => {
    const user = req.body;

    try {

        var result = await session.run(
            `match(c:Cliente{first_name:$first_name,last_name:$last_name})-[r:Compra]->(p:Producto{nombre:$product})<-[r2:Compra]-(cl:Cliente)
            return cl.first_name,cl. last_name`,
            {first_name: user.first_name.toString(),last_name:user.last_name.toString(),product:user.product.toString()}
        )

        const product = []

        const records = result.records
        for (let i = 0; i < records.length; i++) {
            const title = {
                first_name: records[i].get(0),
                last_name: records[i].get(1)
              }; 
            product.push(title)
        }

        return res.status(200).json(
            {
                ok: true,
                result: product
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


const getCommonProduct = async(req, res = response) => {
    const user = req.body;

    try {

        var result = await session.run(
            `match(c:Cliente{first_name:$first_name,last_name:$last_name})-[r:Compra]->(p:Producto),(p)<-[r2:Compra]-(cl:Cliente)
            with cl,c, count(DISTINCT r2) as rela
            where rela>=2
            match(c)-[:Compra]->(p:Producto)<-[:Compra]-(cl:Cliente)
            with p, cl
            where not (cl.first_name=$first_name and cl.last_name=$last_name)
            return Distinct cl.first_name, cl.last_name, p.nombre`,
            {first_name: user.first_name.toString(), last_name:user.last_name.toString()}
        )

        const clientProduct = []

        const records = result.records
        for (let i = 0; i < records.length; i++) {
            const title = {
                first_name: records[i].get(0),
                last_name: records[i].get(1),
                product: records[i].get(2)
              }; 
            clientProduct.push(title)
        }

        return res.status(200).json(
            {
                ok: true,
                result: clientProduct
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
    getTopCompras, 
    getTopSeparateCompras, 
    getTopBrands, 
    getTopClients, 
    getSearchClient,
    getCommonClient,
    getCommonProduct
}

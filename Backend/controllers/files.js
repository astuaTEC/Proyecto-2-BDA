const { Persona, session } = require("../database/connection");
const { response } = require('express');

const createNodesFromUrl = async(req, res = response) => {
    fileArray = req.body;

    var orderedArray = orderArray(fileArray);

    for(let file of orderedArray){
        let { filename, url } = file;

        try {
            if(filename == "Marcas"){
                await session.run(
                    `LOAD CSV WITH HEADERS FROM $url AS line
                    MERGE (n: Marca {id: line.id, nombre: line.nombre, pais: line.pais})`,
                    { url }
                );
            }
            
            else if (filename == "Productos"){
                await session.run(
                    `LOAD CSV WITH HEADERS FROM $url AS line
                    MERGE (p: Producto {id: line.id, nombre: line.nombre, marca: line.marca, precio: line.precio})
                    WITH p
                    MATCH (p: Producto), (m: Marca)
                    WHERE p.marca = m.nombre
                    MERGE (p)-[r: producidoPor]->(m)`,
                    { url }
                );
            }
            
            else if(filename == "Clientes"){
                await session.run(
                    `LOAD CSV WITH HEADERS FROM $url AS line
                    MERGE (n: Cliente {id: line.id, first_name: line.first_name, last_name: line.last_name})`,
                    { url }
                );
            }
            
            else if(filename == "Compras"){
                await session.run(
                    `LOAD CSV WITH HEADERS FROM $url AS line
                    MATCH (c: Cliente), (p: Producto)
                    WHERE c.id = line.idCliente and p.id = line.idProducto
                    MERGE (c)-[r: Compra {cantidad: line.cantidad}]->(p)`,
                    { url }
                );
            }
            
        } catch (error) {
            res.status(400).json(
                {
                    ok: false,
                    msg: error
                }
            )
        }
    }

    return res.status(200).json(
        {
            ok: true,
            msg: "Archivos cargados correctamente"
        }
    );

}

const orderArray = (originalArray) => {
    const orderedArray = [];

    let marcasObj, productosObj, clientesObj, comprasObj;

    for(let obj of originalArray){
        let { filename } = obj;

        if(filename == "Marcas")
            marcasObj = obj;
        else if (filename == "Productos")
            productosObj = obj;
        else if(filename == "Clientes")
            clientesObj = obj;
        else if(filename == "Compras")
            comprasObj = obj;
    }

    orderedArray.push(marcasObj);
    orderedArray.push(productosObj);
    orderedArray.push(clientesObj);
    orderedArray.push(comprasObj);

    return orderedArray;

}

module.exports = {
    createNodesFromUrl
}

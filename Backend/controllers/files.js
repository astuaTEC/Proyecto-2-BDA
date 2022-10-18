const { Persona, session } = require("../database/connection")
const { response } = require('express');
const converter = require('json-2-csv')

const chargeFiles = async (req, res = response) => {
   
    fileArray = req.body;

    /* Recorrer la lista de archivos con su contenido
    e ir guardando cada archivo en la ruta especificada */
    for(let file of fileArray){
        let { filename, objectArray } = file;

        converter.json2csv(objectArray, (err, csv) => {
            if (err) {
              throw err
            }
            const path = 'C:/Users/samas/.Neo4jDesktop/relate-data/dbmss/dbms-42bd9197-be86-4ca7-9f9f-34fcbc71d62d/import/' + filename + '.csv'
            const fs = require("fs");
            fs.writeFileSync(path, csv);
          
        });

    }
    
    var result = await execCommandLoad();

    if(result){
        return res.status(200).json(
            {
                ok: true,
                msg: "Archivos cargados correctamente"
            }
        );
    } else {
        res.status(400).json({
            ok: false,
            msg: 'Ha ocurrido un error, favor comunicarse con el programador'
        })
    }

}

const execCommandLoad = async () => {
    
    try {

        // TODO: verificar si son Marcas, Productos, Clientes o Compras
        // Ya que dependiendo el archivo, hay que hacer comandos distintos
        await session.run(
            `LOAD CSV WITH HEADERS FROM "file:///Marcas.csv" AS line
            MERGE (n: Marca {id: line.id, nombre: line.nombre, pais: line.pais})`
        );

        await session.run(
            `LOAD CSV WITH HEADERS FROM "file:///Productos.csv" AS line
            MERGE (p: Producto {id: line.id, nombre: line.nombre, marca: line.marca, precio: line.precio})
            WITH p
            MATCH (p: Producto), (m: Marca)
            WHERE p.marca = m.nombre
            MERGE (p)-[r: producidoPor]->(m)`
        );

        await session.run(
            `LOAD CSV WITH HEADERS FROM "file:///Clientes.csv" AS line
            MERGE (n: Cliente {id: line.id, first_name: line.first_name, last_name: line.last_name})`
        );

        await session.run(
            `LOAD CSV WITH HEADERS FROM "file:///Compras.csv" AS line
            MATCH (c: Cliente), (p: Producto)
            WHERE c.id = line.idCliente and p.id = line.idProducto
            MERGE (c)-[r: Compra {cantidad: line.cantidad}]->(p)`
        );
        
        return true;
        
    } catch (error) {
        return false;
    }
}


const createNodesFromUrl = async(req, res = response) => {
    fileArray = req.body;

    for(let file of fileArray){
        let { filename, url } = file;

        try {
            if(filename == "Marcas"){
                await session.run(
                    `LOAD CSV WITH HEADERS FROM "$url" AS line
                    MERGE (n: Marca {id: line.id, nombre: line.nombre, pais: line.pais})`,
                    parameters("url", url)
                );
            }
            
            else if (filename == "Productos"){
                await session.run(
                    `LOAD CSV WITH HEADERS FROM "$url" AS line
                    MERGE (p: Producto {id: line.id, nombre: line.nombre, marca: line.marca, precio: line.precio})
                    WITH p
                    MATCH (p: Producto), (m: Marca)
                    WHERE p.marca = m.nombre
                    MERGE (p)-[r: producidoPor]->(m)`,
                    parameters("url", url)
                );
            }
            
            else if(filename == "Clientes"){
                await session.run(
                    `LOAD CSV WITH HEADERS FROM "$url" AS line
                    MERGE (n: Cliente {id: line.id, first_name: line.first_name, last_name: line.last_name})`,
                    parameters("url", url)
                );
            }
            
            else if(filename == "Compras"){
                await session.run(
                    `LOAD CSV WITH HEADERS FROM "$url" AS line
                    MATCH (c: Cliente), (p: Producto)
                    WHERE c.id = line.idCliente and p.id = line.idProducto
                    MERGE (c)-[r: Compra {cantidad: line.cantidad}]->(p)`,
                    parameters("url", url)
                );
            }
            
        } catch (error) {
            throw error
        }
    }

    return res.status(200).json(
        {
            ok: true,
            msg: "Archivos cargados correctamente"
        }
    );

}

module.exports = {
    chargeFiles
}

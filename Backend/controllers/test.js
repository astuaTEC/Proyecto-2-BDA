const { Persona, session } = require("../database/connection")
const { response } = require('express');
const converter = require('json-2-csv')

const query = async (req, res = response) => {
    //const result = await Persona.find();

    const { filename, objectArray }  = req.body;
    //console.log(result)
    var result;

    converter.json2csv(objectArray, (err, csv) => {
        if (err) {
          throw err
        }
        const path = 'C:/Users/samas/.Neo4jDesktop/relate-data/dbmss/dbms-42bd9197-be86-4ca7-9f9f-34fcbc71d62d/import/' + filename + '.csv'
        const fs = require("fs");
        fs.writeFileSync(path, csv);
      
    });
    
    try {

        // TODO: verificar si son Marcas, Productos, Clientes o Compras
        // Ya que dependiendo el archivo, hay que hacer comandos distintos
        result = await session.run(
            `LOAD CSV WITH HEADERS FROM "file:///Marcas.csv" AS line
            MERGE (n: Marca {id: line.id, nombre: line.nombre, pais: line.pais})`
        );
        
        return res.status(200).json(
            {
                ok: true,
                result
            }
        )
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Ha ocurrido un error, favor comunicarse con el programador'
        })
    }
}


module.exports = {
    query
}

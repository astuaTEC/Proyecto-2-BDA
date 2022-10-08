const { Persona } = require("../database/connection")
const { response } = require('express');

const query = async (req, res = response) => {
    const result = await Persona.find();
    //console.log(result)

    return res.status(200).json(
        {
            ok: true,
            result
        }
    )
}


module.exports = {
    query
}

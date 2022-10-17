// get env variables
require("dotenv").config({ path: "../.env" });
const { URI, DB_USERNAME, DB_PASSWORD } = process.env;

//Import Dependencies
const { OGM } = require("@neo4j/graphql-ogm");
const neo4j = require("neo4j-driver");

// Define your models and relationships using graphql type syntax
const typeDefs = `
    type Persona {
        edad: Int
        nombre: String
    }
`;

// Establish Neo4J Connection using Neo4j drivers
const driver = neo4j.driver(URI, neo4j.auth.basic(DB_USERNAME, DB_PASSWORD));

const session = driver.session();

console.log("DB conectada");

// Connect our typedefs and connection to the OGM
var ogm = new OGM({ typeDefs, driver });

ogm.init();

// create a model that refers to one of defined types
const Persona = ogm.model("Persona");

// export all my models
module.exports = {
    Persona,
    session
}
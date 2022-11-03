// get env variables
require("dotenv").config({ path: "../.env" });
const { URI, DB_USERNAME, DB_PASSWORD } = process.env;

//Import Dependencies
const { OGM } = require("@neo4j/graphql-ogm");
const neo4j = require("neo4j-driver");


// Establish Neo4J Connection using Neo4j drivers
const driver = neo4j.driver(URI, neo4j.auth.basic(DB_USERNAME, DB_PASSWORD),{ disableLosslessIntegers: true });

const session = driver.session();

console.log("DB conectada");

// export all my models
module.exports = session
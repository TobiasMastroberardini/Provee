const mysql = require("mysql2");

// Crear un pool de conexiones
const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "0123456789",
  database: "ecommerce",
  port: 3307,
  waitForConnections: true, // Espera si todas las conexiones están ocupadas
  connectionLimit: 10, // Número máximo de conexiones simultáneas
  queueLimit: 0, // Número máximo de consultas en espera
});

// Promisificar el pool para usar async/await
const promisePool = pool.promise();

module.exports = promisePool;

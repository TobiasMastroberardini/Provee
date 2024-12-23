const mysql = require("mysql2");
const pg = require("pg");

// Crear un pool de conexiones
// const pool = mysql.createPool({
//   host: "127.0.0.1",
//   user: "root",
//   password: "0123456789",
//   database: "ecommerce",
//   port: 3307,
//   waitForConnections: true, // Espera si todas las conexiones están ocupadas
//   connectionLimit: 10, // Número máximo de conexiones simultáneas
//   queueLimit: 0, // Número máximo de consultas en espera
// });

// // Promisificar el pool para usar async/await
// const promisePool = pool.promise();

// module.exports = promisePool;

const db = new pg.Pool({
  connectionString:
    "postgresql://root:QeQ0Dt8gekYlYBcFs8WRZ76ucM7IB59t@dpg-ctjl0hl2ng1s73bkd0rg-a.oregon-postgres.render.com/ecommerce_cqz8",
  ssl: {
    rejectUnauthorized: false, // Útil si el servidor PostgreSQL requiere SSL pero no tiene un certificado autorizado
  },
});

module.exports = db;

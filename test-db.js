require("dotenv").config({ path: "./backend/.env" });

const pool = require("./backend/app/database/base");

async function testConnection() {
    try {
        const connection = await pool.getConnection();

        console.log("✅ Conectado a Railway");

        const [rows] = await connection.query("SELECT NOW() AS fecha");

        console.log(rows);

        connection.release();
        process.exit(0);

    } catch (error) {
        console.error("❌ Error de conexión:");
        console.error(error.message);
        process.exit(1);
    }
}

testConnection();
const express = require("express");
const cors = require("cors");
const db = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Backend funcionando correctamente"
    });
});

app.get("/api/db-status", async (req, res) => {
    try {
        await db.execute("SELECT 1");

        res.json({
            success: true,
            message: "Conexión a la base de datos exitosa"
        });
    } catch (error) {
        console.error("Error al conectar con la base de datos:", error.message);

        res.status(500).json({
            success: false,
            message: "Error al conectar con la base de datos",
            error: error.message
        });
    }
});

module.exports = app;
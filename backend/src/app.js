const express = require("express");
const cors = require("cors");
const db = require("./config/database");
const apiRoutes = require("./routes/apiRoutes")
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Backend funcionando correctamente"
    });
});
app.use("/api", apiRoutes);

module.exports = app;
const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

const pool = require("./comandinhosSQL/postgresServer");

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/' , (req , res) => {
    res.send("Its Alive");
});

app.get("/id", async(req,res))

app.listen(port, () => console.log("Servidor Aberto em", port));
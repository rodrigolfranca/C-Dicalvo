const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const jwt = require("jsonwebtoken");
require("dotenv-safe").config();

//postgreSQL
const pool = require("./routers/db");

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/' , (req , res) => {
    res.send("Its Alive");
});

app.post("/login", async(req, res) => {
    try {

        const email = req.body.email;
        const senha = req.body.senha;

        const usuario = await pool.query(`SELECT * FROM users WHERE email = ($1)`, [ email ]);
        if (senha === usuario.rows[0].password) {

            const id = usuario.rows[0].id;
            const adm = usuario.rows[0].type_user;
            const token = jwt.sign({ id , adm }, process.env.SECRET);

            res.json({ auth: true, token})

        } else {
            res.json("Login Falhou, DB ou Senha errada :D Se vira Luiz. Corrige essa merda ai")
        }
    } catch (error) {
        console.log(error);
    }
})

const ROUTER_PSQL = require("./routers/router");

app.use("/", ROUTER_PSQL);

app.listen(port, () => console.log("Servidor Aberto em", port));
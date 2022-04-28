//postgreSQL
const pool = require("./routers/db");

const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

const jwt = require("jsonwebtoken");

require("dotenv-safe").config();

const { comparePwd } = require('./routers/hashPwd');
const ROUTER_GET = require("./routers/httpRouter/routerGet");
const ROUTER_PUT = require("./routers/httpRouter/routerPut");
const ROUTER_POST = require("./routers/httpRouter/routerPost");
const ROUTER_DELETE = require("./routers/httpRouter/routerDelet");

app.use("/", ROUTER_POST, ROUTER_GET, ROUTER_PUT, ROUTER_DELETE);

app.post("/login", async(req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const usuario = await pool.query(`SELECT * FROM users WHERE email = ($1)`, [ email ]);   

        if ( comparePwd(password, usuario.rows[0].password) ) {
            const id = usuario.rows[0].id;
            const adm = usuario.rows[0].type_user;
            const token = jwt.sign({ id , adm }, process.env.SECRET);

            res.json({ auth: true, token});
        } else {
            res.json("Wrong Password");
        }
    } catch (error) {
        console.log(error);
    }
})

app.listen(port, () => console.log("Servidor Aberto em", port));
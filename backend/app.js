const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/' , (req , res) => {
    res.send("Its Alive");
});

app.listen(port, () => console.log("Servidor Aberto em", port));
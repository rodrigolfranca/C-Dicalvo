const express = require('express');
const app = express();
const port = 4000;

app.use('/', express.static('./src/'));

app.use('/shiu', express.static('./shiu'));

app.listen(port, () => console.log(`Frontend rodando na porta ${port}!`));
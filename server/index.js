const express = require('express');
const server = express();
const apiRouter = require('./routes');
const cors = require('cors');

server.use(cors());
server.use('/', apiRouter);
server.use(express.static("public"))

server.listen(5000);
console.log('=> El Servidor corre en el puerto 5000 ✔');
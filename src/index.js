const express = require('express');
const server = express();
const port = 3000;
const routes = require('./routes');

server.listen(port, () => {
    server.use(routes);
    console.log(`Example app listening at http://localhost:${port}`);
})
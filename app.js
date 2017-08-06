const express = require('express');
const app = express();

app.get('*', (request, response) => {
    response.send('Express Response');
})

app.listen(3000);

console.log("App running");
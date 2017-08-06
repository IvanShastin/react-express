const express = require('express');
const app = express();
const routes = require('./routes');
const errorHandlers = require('./middleware/errorhandlers');
const logger = require('./middleware/log');
var partials = require('express-partials');
const cookieParser = require('cookie-parser');

app.use(partials());
app.set('view engine', 'ejs');
app.set('view options', { defaultLayout: 'layout' });

app.use(logger.logger);
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());

app.get("/", routes.index);
app.get("/login", routes.login);
app.get("/account/login", routes.login);
app.post("/login", routes.loginProcess);
app.get("/chat", routes.chat);
app.get("/error", (request, response, next) => {
  next(new Error("A contrived error"));
});

app.use(errorHandlers.error);
app.use(errorHandlers.notFound);

app.listen(3000);

console.log("App running");

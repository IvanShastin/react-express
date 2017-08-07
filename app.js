const express = require("express");
const app = express();
const routes = require("./routes");
const errorHandlers = require("./middleware/errorhandlers");
const logger = require("./middleware/log");
var partials = require("express-partials");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const RedisStore = require('connect-redis')(session);
const redisOptions = {
  url: 'redis://localhost',
  port: 6379
}
const bodyParser = require('body-parser');
const csrf = require('csurf');
const util = require('./middleware/utilities');

app.use(partials());
app.set("view engine", "ejs");
app.set("view options", { defaultLayout: "layout" });

app.use(logger.logger);
app.use(express.static(__dirname + "/public"));
app.use(cookieParser('secret'));
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    store: new RedisStore(redisOptions)
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(csrf());
app.use(util.csrf);
app.use(util.authenticated);

app.use((request, response, next) => {
  if (request.session.pageCounter) {
    request.session.pageCounter++;
  } else {
    request.session.pageCounter = 1;
  }
  next();
});

app.get("/", routes.index);
app.get("/login", routes.login);
app.get("/account/login", routes.login);
app.post("/login", routes.loginProcess);
app.get('/logout', routes.logout);
app.get("/chat", [util.requireAuthentication], routes.chat);
app.get("/error", (request, response, next) => {
  next(new Error("A contrived error"));
});

app.use(errorHandlers.error);
app.use(errorHandlers.notFound);

app.listen(3000);

console.log("App running");

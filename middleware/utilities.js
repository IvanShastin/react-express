const config = require('../config');

module.exports.templateRoutes = function templateRoutes(request, response, next) {
  response.locals.routes = config.routes;
  next();
}

module.exports.csrf = function csrf(request, response, next) {
  response.locals.token = request.csrfToken();
  next();
};

module.exports.authenticated = function authenticated(request, response, next) {
  response.locals.isAuthenticated = request.session.isAuthenticated;
  if (request.session.isAuthenticated)
    response.locals.user = request.session.user;
  next();
};

module.exports.requireAuthentication = function requireAuthentication(
  request,
  response,
  next
) {
  if (request.session.isAuthenticated) {
    next();
  } else {
    response.redirect(301, config.routes.login);
  }
};

module.exports.auth = function auth(username, password, session) {
  var isAuth = username === "user1" || username === "user2";
  if (isAuth) {
    session.isAuthenticated = isAuth;
    session.user = { username: username };
  }
  return isAuth;
};

module.exports.logOut = function logOut(session) {
  session.isAuthenticated = false;
  delete session.user;
};

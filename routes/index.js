const util = require('../middleware/utilities');
const config = require('../config');

function index(req, res) {
  res.render("index", {
    title: "Index view"
  });
}

function login(req, res) {
  res.render("Login", { title: "Login", message: req.flash('error') });
}

function loginProcess(req, res) {
  var isAuth = util.auth(req.body.username, req.body.password, req.session);
  if(isAuth) {
    res.redirect('/chat');
  } else {
    req.flash('error', 'UserName or Password is invalid');
    res.redirect(config.routes.login);
  }
};

function chat(req, res) {
  res.render("chat", { title: "Chat" });
}

function logout(req, res) {
  util.logOut(req.session);
  res.redirect('/');
}

module.exports.index = index;
module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;
module.exports.logout = logout;

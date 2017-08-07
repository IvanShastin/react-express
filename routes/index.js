const util = require('../middleware/utilities');

function index(req, res) {
  res.render("index", {
    title: "Index view"
  });
}

function login(req, res) {
  res.render("Login", { title: "Login" });
}

function loginProcess(req, res) {
  var isAuth = util.auth(req.body.username, req.body.password, req.session);
  isAuth ? res.redirect('/chat') : res.redirect('/login');
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

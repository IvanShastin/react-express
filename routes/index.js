function index(req, res) {
  res.render('index', { title: "Index view", cookie: JSON.stringify(req.cookies)});
}
function login(req, res) {
  res.render("Login", { title: "Login" });
}
function loginProcess(req, res) {
  res.redirect("/");
}
function chat(req, res) {
  res.render("chat", { title: "Chat" });
}

module.exports.index = index;
module.exports.login = login;
module.exports.loginProcess = loginProcess;
module.exports.chat = chat;

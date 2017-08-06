exports.notFound = function notFound(request, response, next) {
  response.status(404).send("Page not found");
};

exports.error = function error(error, request, response, next) {
  console.log(error);
  response.status(500).send('Server error');
}
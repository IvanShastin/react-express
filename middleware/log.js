exports.logger = function logger(request, response, next) {
    console.log(request.url);
    next();
}
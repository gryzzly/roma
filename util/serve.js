var http = require('http');
var connect = require('connect');
var historyApiFallback = require('connect-history-api-fallback');
var serveStatic = require('serve-static');

var app = connect()
  .use(historyApiFallback())
  .use(serveStatic('./build'));

module.exports = function serve(done) {
  http.createServer(app).listen(8080, function () {
    console.log('Dev server serving `build` folder has started listening at localhost:8080');
    if (done) {
      done();
    }
  });
};

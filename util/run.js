var build = require('./build');
var serve = require('./serve');
var watch = require('node-watch');

build(serve);
watch([
    'metalsmith.json'
  , 'templates'
  , 'contents'
  , 'assets'
], function (file) {
  console.log(file + ' changed.');
  build();
});

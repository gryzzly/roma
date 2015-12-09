var
    markdown   = require('metalsmith-markdown')
  , Metalsmith = require('metalsmith')
  , templates  = require('metalsmith-templates')
  , assets     = require('metalsmith-assets')
  , singlePage = require('./single-page')
;

module.exports = function build(done){
  Metalsmith(__dirname)
    .source('../contents')
    .destination('../build')
    .use(markdown())
    .use(singlePage({
      path: 'index.html'
    }))
    .use(templates({
      engine: 'handlebars',
      directory: '../templates',
      default: 'default.hbs'
    }))
    .use(assets({
      source: '../assets', // relative to the working directory
      destination: './assets' // relative to the build directory
    }))
    .build(function(err) {
      if (err) {
        throw err;
      }
    }, function () {
      console.log('Built successfully.')
      if (done) done();
    });
};

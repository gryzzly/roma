function escape(text) {
  return text.toLowerCase().replace(/[^\w]+/g, '-');
}

// This is a metalsmith plugin that allows for some pages
// of the website to be stitched together into a new file.
//
// If there's a 'vertical-index' property in the content
// front-matter, the value will be used as the index in the
// generated file. There will be no html file generated for
// the page.
//
// Pass `options.path` to set the name of the generated file.
//
// The metalsmith meta object will get `singlePageItems` list
// with objects representing the contents of each item sorted
// according to the indices provided.
//
// Each item will have the following props:
// path – file path
// link - the "dashified" title to use to build navigation for each item
// contents – the file contents (can be previously processed via other plugins)
module.exports = function singlePage(options){
  var PROP_NAME = 'vertical-index';

  return function(files, metalsmith, done) {
    // create a new file that will be processed
    files[options.path] = { contents: '' };
    var meta = metalsmith.metadata();
    meta.singlePageItems =
    Object.keys(files).reduce(function (items, filePath, index) {
      var file = files[filePath];
      var item;
      if (PROP_NAME in file) {
        item = Object.assign({}, file, {
          path: filePath,
          link: file.title ? escape(file.title) : null,
          contents: file.contents.toString()
        });
        items[file[PROP_NAME] - 1] = item;
        // remove them from the pipeline to not have respective files generated
        delete files[filePath];
      }
      return items;
    }, []);
    done();
  };
};

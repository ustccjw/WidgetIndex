// native module
var resolve = require('path').resolve;

// remote module
var views = require('co-views');

// resolve the root directly
var root = resolve(__dirname, '../..');

// setup views mapping .html
// to the ejs template engine
module.exports = views(resolve(root, 'server/views'), {
  map: { html: 'ejs' }
});
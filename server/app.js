// native module
var resolve = require('path').resolve;

// remote module
var logger = require('koa-logger');
var compress = require('koa-compress');
var serve = require('koa-static');
var json = require('koa-json');
var favicon = require('koa-favicon');
var koa = require('koa');

// export module
var app = module.exports = koa();

// resolve the root directly
var root = resolve(__dirname, '..');

// use a real logger in production
// hide the logger during tests because it's annoying
if (app.env !== 'production' && app.env !== 'test') app.use(logger());

// favicon
// app.use(favicon(root + '/public/images/favicon.ico'));

// 压缩
app.use(compress());

// response为json
app.use(json());

// Static file serving middleware
app.use(serve(resolve(root, 'public/html')));
app.use(serve(resolve(root, 'public/javascripts')));
app.use(serve(resolve(root, 'public/css')));
app.use(serve(resolve(root, 'public/images')));
app.use(serve(resolve(root, 'public/images/widgets')));
app.use(serve(resolve(root, 'public/fonts')));

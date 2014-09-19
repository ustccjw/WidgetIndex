var port = process.env.PORT || 8080;

// export module
var server = module.exports = require('./').listen(port);

console.log('app listening on port ' + port + '.');

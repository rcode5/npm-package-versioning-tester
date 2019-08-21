const package = require('./package.json');
function version() {
  return package.version;
}

module.exports = { version }

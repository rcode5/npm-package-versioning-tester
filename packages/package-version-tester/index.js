const package = require('./package.json');
function version() {
  return package.version;
}

function name() {
  return package.name;
}

module.exports = { version, name }

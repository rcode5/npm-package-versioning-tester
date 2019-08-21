const package = require('./package.json');
function version() {
  return package.version;
}

function name() {
  return package.name;
}

function noop() {
}

module.exports = { version, name, noop }

const package = require('./package.json');
function version() {
  return package.version;
}

function name() {
  return package.name;
}

function noop() {
}

function noop2() {
}

module.exports = { version, name, noop, noop2 }

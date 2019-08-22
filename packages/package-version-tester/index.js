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

function noop3() {
}

module.exports = { version, name, noop, noop2, noop3 }

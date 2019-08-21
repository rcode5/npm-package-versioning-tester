#!/usr/bin/env node

const { name, version } = require("./index");

console.log(`Running with package named ${name()} with version ${version()}`);

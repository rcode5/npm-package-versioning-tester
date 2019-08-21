#!/usr/bin/env node

const version = require("./index").version;

console.log(`Running with package version ${version()}`);

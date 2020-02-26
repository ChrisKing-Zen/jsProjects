#!/usr/bin/env node
const Runner = require("./runner");
console.log("Running Test!!");
//collect files
//test enviroment setup
//test file execution
//report results
const runner = new Runner();
const run = async () => {
  await runner.collectFiles(process.cwd());
  runner.runTests();
};

run();

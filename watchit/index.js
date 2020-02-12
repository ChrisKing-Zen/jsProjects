#!/usr/bin/env node

console.log("I was executed");
const chokidar = require("chokidar");
const { spawn } = require("child_process");
const ls = spawn("ls", ["-lh", "/usr"]);

// One-liner for current directory
chokidar.watch(".").on("all", (event, path) => {
  console.log(event, path);
});

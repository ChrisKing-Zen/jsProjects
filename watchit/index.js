#!/usr/bin/env node

console.log("I was executed");
const chokidar = require("chokidar");
const { spawn } = require("child_process");
const ls = spawn("ls", ["-lh", "/usr"]);
const debounce = require("lodash.debounce");
const program = require("caporal");
const fs = require("fs");
const fsPromises = fs.promises;
const chalk = require('chalk')

//// File watcher

// Caporal
program
  .version("1.0.0")
  .argument("[filename]", "Name of a file to execute")
  .action(async ({ filename }) => {
    const name = filename || "index.js";

    try {
      await fsPromises.access(name);
    } catch (err) {
      throw new Error("File doesn't exist");
    }

    let proc;
    const start = debounce(() => {
      if (proc){
        console.log(chalk.red('<< Ending process'));
        proc.kill();}

      console.log(chalk.green('>> Starting process'));  
      proc = spawn("node", [name], { stdio: "inherit" });
    }, 200);
    chokidar
      .watch(".")
      .on("add", start)
      .on("change", start)
      .on("unlink", start);
  });

program.parse(process.argv);

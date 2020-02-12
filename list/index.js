#!/usr/bin/env node

const fs = require("fs");
const chalk = require("chalk");
const log = console.log;
const path = require("path");

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
  if (err) {
    throw new Error(err);
  }
  const statPromises = filenames.map(filename => {
    return lstat(path.join(targetDir, filename));
  });

  const allStats = await Promise.all(statPromises);

  for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    if (stats.isFile()) {
      log(filenames[index]);
    } else {
      console.log(chalk.blue(filenames[index]));
    }
  }
});

///Single linear asyncs
////METHOD 1 /////
// const lstat = filename => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(filename, (err, stats) => {
//       if (err) {
//         reject(err);
//       }

//       resolve(stats);
//     });
//   });
// };
////METHOD 2 /////
// const util = require("util");
// const lstat = util.promisify(fs.lstat);
////METHOD 3 /////
const { lstat } = fs.promises;

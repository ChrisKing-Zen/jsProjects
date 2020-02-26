//see episode 468

const fs = require("fs");
const path = require("path");
class Runner {
  constructor() {
    this.testFiles = [];
  }
  async collectFiles(targetPath) {
    //finds and adds .test files to this.files arr
    const files = await fs.promises.readdir(targetPath);
    // console.log(files);

    for (const file of files) {
      const filepath = path.join(targetPath, file);
      const stats = await fs.promises.lstat(filepath);

      if (stats.isFile() && file.includes(".test.js")) {
        this.testFiles.push({ name: filepath });
      } else if (stats.isDirectory()) {
        const childFiles = await fs.promises.readdir(filepath);
        // files.push(...childFiles);
        files.push(...childFiles.map(f => path.join(file, f)));
      }
    }
  }
  async runTests() {
    for (const file of this.testFiles) {
      require(file.name);
    }
  }
}

module.exports = Runner;

const fs = require("fs");
const crypto = require("crypto");
const util = require("util");
const Repository = require("./repository");

class URLRepository extends Repository {
  async create(attrs) {
    // const salt = crypto.randomBytes(8).toString("hex"); //generates salt

    // const buf = await scrypt(attrs.password, salt, 64); //generates hashed pass
    //gets most recent records
    const records = await this.getAll();
    //pushes new data
    const record = { ...attrs };
    await records.push(record);
    //write it back to the file
    await this.writeAll(records);

    return record;
  }
}

module.exports = new URLRepository("urlList.json");

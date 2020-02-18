const fs = require("fs");
const crypto = require("crypto");
const util = require("util");

const scrypt = util.promisify(crypto.scrypt);
class UsersRepository {
  constructor(filename) {
    if (!filename) {
      throw new Error("Creating a repo requires a filename");
    }

    this.filename = filename;

    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, "[]");
    }
  }
  async getAll() {
    //open file
    return JSON.parse(
      await fs.promises.readFile(this.filename, {
        encoding: "utf8"
      })
    );
  }

  async create(attrs) {
    attrs.id = this.randomID();

    const salt = crypto.randomBytes(8).toString("hex"); //generates salt

    const buf = await scrypt(attrs.password, salt, 64); //generates hashed pass
    //gets most recent records
    const records = await this.getAll();
    //pushes new data
    const record = { ...attrs, password: `${buf.toString("hex")}.${salt}` };
    records.push(record);
    //write it back to the file
    await this.writeAll(records);

    return record;
  }

  async writeAll(records) {
    await fs.promises.writeFile(
      this.filename,
      JSON.stringify(records, null, 2)
    );
  }
  randomID() {
    return crypto.randomBytes(4).toString("hex");
  }

  async getOne(id) {
    const records = await this.getAll();
    return records.find(record => record.id === id);
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter(record => record.id !== id);
    await this.writeAll(filteredRecords);
  }
  async update(id, attrs) {
    const records = await this.getAll();
    const record = records.find(record => record.id === id);
    if (!record) {
      throw new Error(`Record with id: ${id} not found`);
    }
    Object.assign(record, attrs);
    await this.writeAll(records);
  }
  //GET ONEBY
  async getOneBy(filters) {
    const records = await this.getAll();
    for (const record of records) {
      let found = true;
      for (const key in filters) {
        if (record[key] !== filters[key]) {
          found = false;
        }
      }
      if (found) {
        return record;
      }
    }
  }
}

module.exports = new UsersRepository("users.json");

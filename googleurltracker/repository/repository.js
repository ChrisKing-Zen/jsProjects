const fs = require('fs');
const crypto = require('crypto');

module.exports = class Repository {
  constructor(filename) {
    if (!filename) {
      throw new Error('Creating a repo requires a filename');
    }

    this.filename = filename;

    try {
      fs.accessSync(this.filename);
    } catch (err) {
      fs.writeFileSync(this.filename, '[]');
    }
  }

  async getAll() {
    try {
      return JSON.parse(
        await fs.promises.readFile(this.filename, {
          encoding: 'utf8',
        }),
      );
    } catch (err) {
      return console.log(err);
    }
  }

  async getFifty() {
    return JSON.parse(
      await fs.promises.readFile(this.filename, { encoding: 'utf8' }), // need to return 50
    );
  }

  async writeAll(records) {
    try {
      await fs.promises.writeFile(this.filename, JSON.stringify(records, null, 2));
    } catch (err) {
      console.log(err);
    }
  }

  async getOne(id) {
    try {
      const records = await this.getAll();
      return records.find((record) => record.id === id);
    } catch (err) {
      return console.log('Could not find');
    }
  }

  async delete(id) {
    const records = await this.getAll();
    const filteredRecords = records.filter((record) => record.id !== id);
    await this.writeAll(filteredRecords);
  }

  async update(id, attrs) {
    const records = await this.getAll();
    const foundRecord = records.find((record) => record.id === id);
    if (!foundRecord) {
      throw new Error(`Record with id: ${id} not found`);
    }
    Object.assign(foundRecord, attrs);
    await this.writeAll(records);
  }

  async append(record) {
    fs.promises.appendFile(this.filename, JSON.stringify(record, null, 2));
  }

  static randomID() {
    return crypto.randomBytes(4).toString('hex');
  }

  // GET ONEBY
  async getOneBy(filters) {
    try {
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
    } catch (err) {
      console.log(err);
    }
  }

  async create(records, attrs) {
    await this.append(records);
    return attrs;
  }
};

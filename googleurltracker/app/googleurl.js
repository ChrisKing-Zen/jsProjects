const axios = require('axios').default;
const moment = require('moment');
const crypto = require('crypto');
const GoogleURL = require('../models/googleURLModel');
const cipher = require('./dataEncryptor');
// GET request for remote image

const handleError = (err) => {
  console.log(err);
};
class URLProcessor {
  async urlChecker(randString) {
    this.requestUrl = `https://goo.gl/${randString}`;
    return axios({
      method: 'get',
      url: this.requestUrl,
      responseType: 'document',
      timeout: 1000,
    })
      .then((response) => {
        const { responseUrl } = response.request.res;
        return responseUrl;
      })
      .catch((error) => {
        let errorCode = error.code;
        if (!errorCode) {
          errorCode = "Doesn't exist";
        }
        return `Error: ${errorCode}`;
      });
  }

  async logUrlObj(randString, resUrl = 'DNE') {
    this.reqUrl = `https://goo.gl/${randString}`;
    this.lastLookUp = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');
    this.resUrlString = resUrl.toString();
    let linked = '';
    if (this.resUrlString.includes('Error')) {
      linked = false;
    } else {
      linked = true;
    }
    // console.log(this.resUrlString);

    const urlObj = {
      lastLookUp: this.lastLookUp,
      reqUrl: cipher.encrypt(this.reqUrl),
      resUrl: cipher.encrypt(this.resUrlString),
      linked,
    };
    // console.log(`URLOBJ : ${urlObj.resUrl}`);

    const newGoogleURL = new GoogleURL(urlObj);
    await newGoogleURL.save((err) => {
      if (err) {
        handleError(err, null);
      }
    });
    return 'Done';
  }

  generateRandomString() {
    this.randomString = crypto.randomBytes(2).toString('hex').toString();
    return this.randomString;
  }

  async processUrl() {
    setInterval(async () => {
      setTimeout(async () => {
        const randString = this.generateRandomString();
        const responseUrl = await this.urlChecker(randString);
        this.logUrlObj(randString, responseUrl);
      }, 1000);
    }, 3000);
  }
}

module.exports = new URLProcessor();

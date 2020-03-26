const crypto = require('crypto');
const axios = require('axios').default;
const moment = require('moment');
const GoogleURL = require('../models/googleURLModel');
// GET request for remote image

const encryptURL = (url) => {
  const secret = 'sG2Nbz.ujC.83XFAy@AP!GpTt_qkPzefmAU@RC.vfB9B-v98dP';
  const hash = crypto.createHmac('sha256', secret).update(`${url}`).digest('hex');
  return hash;
};
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
      reqUrl: encryptURL(this.reqUrl),
      resUrl: encryptURL(this.resUrlString),
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

  // processUrl();
  //   loopProcess() {
  //     console.log('Opened app');
  //     setInterval(async function () {
  //       setTimeout(async function () {
  //         await this.processUrl();
  //         console.log('.');

  //     // }
  //   }
}

module.exports = new URLProcessor();

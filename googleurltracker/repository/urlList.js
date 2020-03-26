// Set up mongoose connection

const GoogleURL = require('../models/googleURL');

const encryptURL = (url) => {
  const encryptedURL = `${url}`;
  return encryptedURL;
};

const googleURLCreate = (reqURL, resURL, linked) => {
  const googleURLdetail = {
    reqURL: encryptURL(reqURL),
    resURL: encryptURL(resURL),
    linked,
  };
  const googleURLinstance = new GoogleURL(googleURLdetail);
  googleURLinstance.save((err) => {
    if (err) {
      console.log(`ERROR CREATING googleURLinstance: ${googleURLinstance}`);
    }
  });
};

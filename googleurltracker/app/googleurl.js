const axios = require("axios").default;
const urlRepo = require("../repository/urlList");
const crypto = require("crypto");

// GET request for remote image

const urlChecker = async function(randString) {
  const requestUrl = `https://goo.gl/${randString}`;
  return await axios({
    method: "get",
    url: requestUrl,
    responseType: "document",
    timeout: 1000
  })
    .then(function(response) {
      responseUrl = response.request.res.responseUrl;
      return responseUrl;
    })
    .catch(function(error) {
      let errorCode = error.code;
      if (!errorCode) {
        errorCode = `Doesn't exist`;
      }
      return `Error: ${errorCode}`;
    });
};

async function logUrlObj(randString, resUrl = "DNE") {
  const reqUrl = `https://goo.gl/${randString}`;
  const lastLookUp = Date.now();
  let linked = "";
  if (resUrl.includes("Error")) {
    linked = "N";
  } else {
    linked = "Y";
  }
  resUrl = resUrl.toString();
  const urlObj = {
    lastLookUp,
    reqUrl,
    resUrl,
    id: randString,
    linked
  };
  let isRepeated = await repeatCheck(randString);
  if (isRepeated) {
    await urlRepo.update(randString, urlObj);
  } else await urlRepo.create(urlObj);
  if (linked == "Y") {
    console.log(`${reqUrl} => ${resUrl}`);
  }
}

generateRandomString = () => {
  return crypto.randomBytes(3).toString("hex");
};

async function repeatCheck(id) {
  res = urlRepo.getOne(id);
  if (!res) {
    return true;
  } else return false;
}

async function processUrl() {
  let randString = generateRandomString();
  let responseUrl = await urlChecker(randString);
  await logUrlObj(randString, responseUrl);
}

// processUrl();

let i = 1;
while (i == 1) {
  setInterval(async function() {
    await processUrl();
  }, 400);
  i++;
}

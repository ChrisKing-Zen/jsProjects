const async = require('async');
const GoogleURL = require('../models/googleURLModel');
const cipher = require('../app/dataEncryptor');

exports.index = (req, res) => {
  async.parallel(
    {
      gurl_count(callback) {
        GoogleURL.estimatedDocumentCount({}, callback);
      },
    },
    (err, results) => {
      res.render('gurl_index', { title: 'Google Links Home', error: err, data: results });
    },
  );
};
exports.linked_list = (req, res) => {
  GoogleURL.find({ linked: true }, 'reqUrl resUrl')
    .limit(10)
    .exec((err, result) => {
      if (err) {
        return console.log(err);
      }
      // Successful, so render
      result.forEach((url) => {
        url.reqUrl = cipher.decrypt(url.reqUrl);
        url.resUrl = cipher.decrypt(url.resUrl);
        return 'done';
      });
      return res.render('linked_list', { title: 'Linked Google URL List', url_list: result });
    });
};

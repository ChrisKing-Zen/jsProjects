const async = require('async');
const { performance } = require('perf_hooks');
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
  const pageNum = Number(req.params.pg);
  const quantPerPage = 10;
  GoogleURL.find({ linked: true }, 'reqUrl resUrl')
    .skip((pageNum - 1) * quantPerPage)
    .limit(10)
    .exec((err, result) => {
      if (err) {
        return console.log(err);
      }
      const t0 = performance.now();
      // Successful, so render
      result.forEach((url) => {
        url.reqUrl = cipher.decrypt(url.reqUrl);
        url.resUrl = cipher.decrypt(url.resUrl);
        return 'done';
      });
      const t1 = performance.now();
      cipher.perfCheck(t0, t1, 'fulldecrpt');
      return res.render('linked_list', {
        title: 'Linked Google URL List',
        url_list: result,
        pageNum,
      });
    });
};

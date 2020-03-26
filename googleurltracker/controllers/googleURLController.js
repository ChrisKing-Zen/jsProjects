const async = require('async');
const GoogleURL = require('../models/googleURLModel');

exports.index = (req, res) => {
  async.parallel({
    gurl_count(callback) {
      GoogleURL.countDocuments({}, callback);
    },
    function(err, results) {
      res.render('index', { title: 'Google Links Home', error: err, data: results });
    },
  });
};
exports.detail = (req, res) => {
  res.send('NOT IMPLEMENTED: BookInstance list');
};

const express = require('express');
const gURLController = require('../controllers/googleURLController');

const router = express.Router();
/* GET home page. */
router.get('/', gURLController.index);

router.get('/list', gURLController.linked_list);

module.exports = router;

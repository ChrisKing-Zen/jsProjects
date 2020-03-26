const express = require('express');
const gURLController = require('../controllers/googleURLController');

const router = express.Router();
/* GET home page. */
router.get('/', gURLController.index);

router.get('/url/:id', gURLController.detail);

module.exports = router;

const express = require('express');

const food = require('./food');
const tag = require('./tag');

const router = express.Router();

router.use('/food', food);
router.use('/tag', tag);

module.exports = router;

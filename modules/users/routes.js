var express = require('express');
var router = express.Router()
var ctrl = require('./ctrl')

router.post('/create', ctrl.create);

module.exports = router;

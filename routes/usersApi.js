var express = require('express');
var router = express.Router();

var User = require('../models/User');

function users(req, res) {
  User.find().exec()
      .then(function(result){
            res.send(result);
      });
}

router.get('/', users);

module.exports = router;

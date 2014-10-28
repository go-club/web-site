var express = require('express');
var router = express.Router();

var User = require('../models/User');
import { buildModel } from '../models/jt-mongoose.js';

var userStore = buildModel(User);

function users(req, res) {
  userStore.all()
      .then(function(result){
            res.render('users', { users: result });
      });
}

router.get('/', users);

module.exports = router;

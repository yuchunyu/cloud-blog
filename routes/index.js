var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('blog', { title: 'Express' ,name :'world'});
});

module.exports = router;

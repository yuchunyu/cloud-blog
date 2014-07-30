var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' ,name :'world'});
});
router.get('/login', function(req, res) {
  res.render('login', { title: 'Express' ,name :'world'});
});
router.get('/reg', function(req, res) {
  res.render('reg', { title: 'Express' ,name :'world'});
});
router.get('/logout', function(req, res) {
  res.render('index', { title: 'Express' ,name :'world'});
});
router.get('/blog', function(req, res) {
  res.render('blog', { title: 'Express' ,name :'world'});
});
router.get('/article', function(req, res) {
  res.render('article', { title: 'Express' ,name :'world'});
});
router.get('/publish', function(req, res) {
  res.render('publish', { title: 'Express' ,name :'world'});
});


module.exports = router;

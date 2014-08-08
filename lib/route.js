var express = require('express');
var router = express.Router();
var pageUser = require('./pageUser');

/* GET home page. */
router.get('/', function(req, res){
	res.render('index', { title: 'Express' ,name :'world'});
});


router.get('/login', pageUser.getLogin);
router.get('/reg', pageUser.getReg);
router.post('/login', pageUser.login);
router.post('/reg', pageUser.registeredUser);

router.get('/logout', function(req, res){
  	res.render('index', { title: 'Express' ,name :'world'});
});
router.get('/blog', function(req, res){
  	res.render('blog', { title: 'Express' ,name :'world'});
});
router.get('/article', function(req, res){
  	res.render('article', { title: 'Express' ,name :'world'});
});
router.get('/publish', function(req, res){
  	res.render('publish', { title: 'Express' ,name :'world'});
});


module.exports = router;

var express = require('express');
var router = express.Router();
var pageUser = require('./pageUser');

/* GET home page. */
router.get('/', function(req, res){
	res.render('index', { title: 'Express' ,name :'world',user: req.session.user});
});

//user
router.get('/getID',pageUser.getID);
router.get('/login', pageUser.getLogin);
router.post('/login', pageUser.login);
router.get('/reg', pageUser.getReg);
router.post('/reg', pageUser.registeredUser);
router.get('/updatePassword', pageUser.getUpdatePassword);
router.post('/updatePassword', pageUser.updatePassword);
router.get('/logout', pageUser.logout);

//blog
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

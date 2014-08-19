var express = require('express');
var router = express.Router();
var pageUser = require('./pageUser'),
	pageArticle = require('./pageArticle');

/* GET home page. */
router.get('/', pageArticle.getIndex);

//user
router.get('/getID',pageUser.getID);

router.get('/login', pageUser.checkNotLogin);
router.get('/login', pageUser.getLogin);
router.post('/login', pageUser.login);

router.get('/reg', pageUser.checkNotLogin);
router.get('/reg', pageUser.getReg);
router.post('/reg', pageUser.registeredUser);

router.get('/updatePassword', pageUser.checkLogin);
router.get('/updatePassword', pageUser.getUpdatePassword);
router.post('/updatePassword', pageUser.updatePassword);

router.get('/logout', pageUser.checkLogin);
router.get('/logout', pageUser.logout);

//blog
router.get('/blog', function(req, res){
  	res.render('blog', { title: 'Express' ,name :'world'});
});

router.get('/article', pageUser.checkLogin);
router.get('/article', pageArticle.getArticle);
router.post('/insertArticle', pageArticle.insertArticle);

router.get('/publish', function(req, res){
  	res.render('publish', { title: 'Express' ,name :'world'});
});


module.exports = router;

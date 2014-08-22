var express = require('express');
var router = express.Router();
var pageUser = require('./pageUser'),
	pageArticle = require('./pageArticle'),
	pageFile = require('./pageFile');

/* GET home page. */
router.get('/', pageArticle.gotoIndex);
router.post('/getIndex', pageArticle.getIndex);

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

//file
router.post('/imgSaveToFile',pageFile.imgSaveToFile);
router.post('/imgCropToFile',pageFile.imgCropToFile);

//blog
router.get('/blog/:userName', pageUser.checkLogin);
router.get('/blog/:userName', pageArticle.gotoBlog);
router.post('/blog', pageArticle.getBlog);
router.get('/article/:userName/:articleID', pageArticle.getArticle);
router.post('/insertArticle', pageArticle.insertArticle);
router.get('/publish', pageUser.checkLogin);
router.get('/publish', pageArticle.getPublish);

module.exports = router;

var mongoArticle = require('../mongo/mongoArticle');
var tool = require('../util/tool');

exports.insertArticle = function(articleObj, callback){
	articleObj.createDate = tool.getThisTime();
	mongoArticle.insertArticle(articleObj, callback);
}


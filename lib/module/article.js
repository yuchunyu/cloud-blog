var mongoArticle = require('../mongo/mongoArticle');
var tool = require('../util/tool');

exports.insertArticle = function(articleObj, callback){
	articleObj._id = tool.generateUUID();
	articleObj.createDate = tool.getThisTime();
	articleObj.createTimestamp = new Date().getTime();
	mongoArticle.insertArticle(articleObj, callback);
}

exports.getAllByPage = function(pageNum, page, callback){
	mongoArticle.getAllByPage(pageNum, page, callback);
}

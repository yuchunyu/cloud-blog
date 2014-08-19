var mongoUser = require('../mongo/mongoUser');
var tool = require('../util/tool');

exports.insertUser = function(userObj, callback){
	userObj._id = tool.generateUUID();
	userObj.createTimestamp = new Date().getTime();
	userObj.createDate = tool.getThisTime();
	mongoUser.insertUser(userObj, callback);
}

exports.updateSite = function(userID, userObj, callback){
	userObj.updateDate = tool.getThisTime();
	mongoUser.updateUser(userID,userObj, callback);
}

exports.removeUser = function(userID, callback){//删除用户
	mongoUser.removeUser(userID, callback);
};

exports.getByUserName = function(userName, callback){//根据username去找user
	mongoUser.getByUserName(userName,callback);
};
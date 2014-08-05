var mongoUser = require('../mongo/mongoUser');

exports.insertUser = function(userObj, callback){
	userObj.createDate = Date.now();
	mongoUser.insertUser(userObj, callback);
}

exports.updateSite = function(userID, userObj, callback){
	userObj.updateDate = Date.now();
	mongoUser.updateUser(userID,userObj, callback);
}

exports.removeUser = function(userID, callback){//删除用户
	userColl.remove({_id: userID}, callback);
};

exports.getByUserName = function(userName, callback){//根据username去找user
	userColl.findOne({name: userName}, callback);
};
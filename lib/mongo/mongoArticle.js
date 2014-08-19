var articleColl = require('./mongo').getCollection('article');//连接数据库article表

exports.insertArticle = function(articleObj, callback){//添加文章
	articleColl.insert(articleObj, callback);
};

exports.updateArticle = function(articleID,articleObj, callback){//修改文章
	articleColl.findAndModify({_id: userID.toLowerCase()}, [], {$set: articleObj}, {new: true}, callback);
};

exports.removeArticle = function(articleID, callback){//删除文章
	articleColl.remove({_id: articleID}, callback);
};

exports.getByUserName = function(userName, callback){//根据username去找文章
	articleColl.find({userName: userName}).toArray(callback);
};

exports.getAllByPage = function(pageNum, page, callback){//查找全部文章 带分页
	articleColl.find({type: 'public'}).sort({'_id':-1}).limit(pageNum).skip(pageNum * (page - 1)).toArray(callback);
};


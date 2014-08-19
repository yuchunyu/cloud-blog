var article = require('./module/article'),
    async = require('async'),
    tool = require('./util/tool');

//跳转到编写文章页面
exports.getArticle = function(req, res){
    res.render('article', { title: 'Express' ,name :'world'});
};
//发布文章
exports.insertArticle = function(req, res){
	var userName = req.session.user.name;
    var title = req.body.title;
    var type = req.body.type;
    var content = req.body.content;
    console.log(userName,title,type,content);
    async.series({
    	//发布文章
        insertArticle: function(done){
            article.insertArticle({
                name : userName,
                title : title,
                type : type,
                content : content
            },function(err, info){
                if(!err){
                	console.log(info);
                    done();
                }else{
                    done(err);
                }
            });
        }
    },function(err){
    	if(err){
            res.send({status: -1, content: err});
        }else{
            res.send({status: 0, content: '发表文章成功。'});
        }  
    });
};

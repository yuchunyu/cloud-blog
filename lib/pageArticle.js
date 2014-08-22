var article = require('./module/article'),
    async = require('async'),
    tool = require('./util/tool'),
    config = require('../config');

//跳转到文章页面详情页
exports.getArticle = function(req, res){
	var articleID = req.params.articleID;
	var articleUserName = req.params.userName;
	var userName = req.session.user ? req.session.user.name : '';
	var type = (userName == articleUserName) ? 'all' : 'public';
	var edit = false;
	var articleInfo = {};
	if(!articleID || !articleUserName){
		res.render('404', {user:req.session.user || ''});
	}
	async.series({
		//查找页面
		findArticle : function(done){
			article.getArticleByIdAndUsername(articleID,articleUserName,type,function(err,info){
				(userName == info.userName) && (edit = true);
				articleInfo = info;
				done(err);
			});
		}
	},function(err){
		if(err){
			res.render('404', {user:req.session.user || ''});
		}else{
			//处理时间 2014/08/14
        	articleInfo.createDate = articleInfo.createDate.replace(/-/g,' / ');
			res.render('article', {article: articleInfo, edit : edit,user:req.session.user || ''});
		}
	});
    
};
//跳转到文章页面详情页
exports.getPublish = function(req, res){
    res.render('publish', {user:req.session.user || ''});
};
//跳转到文章页面详情页
exports.gotoBlog = function(req, res){
	var articleUserName = req.params.userName;
    res.render('blog', {articleUserName:articleUserName,user:req.session.user || ''});

};
//跳转到文章页面列表
exports.getBlog = function(req, res){
	var userName = req.session.user.name;
	var page = req.body.page || 1;
	var articleUserName = req.body.userName;
	var type = (userName == articleUserName) ? 'all' : 'public';
	var articleList = [];
	// if(!articleUserName){
	// 	res.render('404', {user:req.session.user || ''});
	// }
	async.series({
		//查找页面
		findArticle : function(done){
			article.getArticleByUserName(articleUserName,type,config.BLOGPAGENUM, page,function(err,list){
				articleList = list;
				console.log(articleList);
				done(err);
			});
		},
		//处理内容
        getIndex : function(done){
        	for(var i = 0; i < articleList.length; i++){
        		//内容 108个字 加...
        		articleList[i].content = tool.removeHTMLTag(articleList[i].content).split('\n\n')[0];
        		if(articleList[i].content.length >= config.INDEXWORDS){
        			if('。' == articleList[i].content[articleList[i].content.length - 1] || '，' == articleList[i].content[articleList[i].content.length - 1]){
        				articleList[i].content = articleList[i].content.substr(0 ,config.INDEXWORDS - 1) + '...';
        			}else{
        				articleList[i].content = articleList[i].content.substr(0 ,config.INDEXWORDS) + '...';
        			}
        		}else{
        			articleList[i].content = articleList[i].content;
        		}
        		//时间 2014/08/14
        		articleList[i].createDate = articleList[i].createDate.replace(/-/g,'.');
        	}
        	done();
        }
	},function(err){
		if(err){
            res.send({status: -1, content: err});
        }else{
            res.send({status: 0, articleList: articleList});
        } 
	});
};
//跳转到首页
exports.gotoIndex = function(req, res){
	res.render('index', {user:req.session.user || ''});
}
exports.getIndex = function(req, res){
	var page = req.body.page || 1;
	var articleList = [];
	async.series({
		//发布文章
        getAllByPage: function(done){
        	article.getAllByPage(config.INDEXPAGENUM, page, function(err, info){
        		articleList = info;
        		done(err);
        	});
        },
        //处理内容
        getIndex : function(done){
        	for(var i = 0; i < articleList.length; i++){
        		//内容 108个字 加...
        		articleList[i].content = tool.removeHTMLTag(articleList[i].content).split('\n\n')[0];
        		if(articleList[i].content.length >= config.INDEXWORDS){
        			if('。' == articleList[i].content[articleList[i].content.length - 1] || '，' == articleList[i].content[articleList[i].content.length - 1]){
        				articleList[i].content = articleList[i].content.substr(0 ,config.INDEXWORDS - 1) + '...';
        			}else{
        				articleList[i].content = articleList[i].content.substr(0 ,config.INDEXWORDS) + '...';
        			}
        			
        		}else{
        			articleList[i].content = articleList[i].content;
        		}
        		//时间 2014/08/14
        		articleList[i].createDate = articleList[i].createDate.split(' ')[0].replace(/-/g,'/');
        	}
        	done();
        }
	},function(err){
		if(err){
            res.send({status: -1, content: err});
        }else{
            res.send({status: 0, articleList: articleList});
        } 
	});
};
//发布文章
exports.insertArticle = function(req, res){
	var userName = req.session.user.name;
    var title = req.body.title;
    var type = req.body.type;
    var content = req.body.content;
    var imageSrc = req.body.imageSrc;
    async.series({
    	//发布文章
        insertArticle: function(done){
            article.insertArticle({
                userName : userName,
                title : title,
                type : type,
                content : content,
                imageSrc : imageSrc
            },function(err, info){
                if(!err){
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


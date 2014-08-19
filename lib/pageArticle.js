var article = require('./module/article'),
    async = require('async'),
    tool = require('./util/tool'),
    config = require('../config');

//跳转到编写文章页面
exports.getArticle = function(req, res){
    res.render('article', { title: 'Express' ,name :'world'});
};
//跳转到首页
exports.getIndex = function(req, res){
	var page = req.body.page || 1;
	var articleList = [];
	async.series({
		//发布文章
        getAllByPage: function(done){
        	article.getAllByPage(config.INDEXPAGENUM, page, function(err, info){
        		console.log('info:',info);
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
            res.render('index', {status: -1, content: err});
        }else{
            res.render('index', {status: 0, content: '发表文章成功。',articleList: articleList});
        } 
	});
};
//发布文章
exports.insertArticle = function(req, res){
	var userName = req.session.user.name;
    var title = req.body.title;
    var type = req.body.type;
    var content = req.body.content;
    async.series({
    	//发布文章
        insertArticle: function(done){
            article.insertArticle({
                userName : userName,
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


var user = require('./module/user'),
    async = require('async'),
    tool = require('./util/tool');

//跳转到注册页面
exports.getReg = function(req, res){
    res.render('reg', { title: 'Express' ,name :'world'});
};
//跳转到登录页面
exports.getLogin = function(req, res){
    res.render('login', { title: 'Express' ,name :'world'});
};
//注册用户
exports.registeredUser = function(req,res){
    var userName = req.body.userName;
    var passWord = req.body.passWord;
    async.series({
    	//查看是否有这个用户
        findUserName: function(done){
        	user.getByUserName(userName, function(err, info){
        		if(!err){
                    if(null != info){
                        done('该用户名称已经存在了。');
                    }else{
                        done();
                    }
                }else{
                    done(err);
                }
        	});
        },
        //注册用户
        regUser: function(done){
            user.insertUser({
                name : userName,
                passWord : tool.getMD5(passWord)
            },function(err, info){
                if(!err){
                    done();
                }else{
                    done(err);
                }
            });
        }
    }, function(err){
        if(err){
            res.send({status: -1, content: err});
        }else{
            res.send({status: 0, content: '注册成功。'});
        }      
    })
};
//用户登录
exports.login = function(req, res){
    var userName = req.body.userName;
    var passWord = req.body.passWord;
    var userInfo = {};
    async.series({
        //根据名字去查询
        findUserName: function(done){
            user.getByUserName(userName, function(err, info){
                if(!err){
                    if(null != info){
                        userInfo = info;
                        done();
                    }else{
                        done('该帐户不存在，请检查你的输入信息。');
                    }
                }else{
                    done(err);
                }
            });
        },
        //判断找到的数据是否密码一样
        contrastPassword: function(done){
            if(tool.getMD5(passWord) == userInfo.passWord){
                done();
            }else{
                done('密码不正确，请重新输入。');
            }
        }
    },function(err){
        if(err){
            res.send({status: -1, content: err});
        }else{
            res.send({status: 0, content: '登录成功。'});
        } 
    });
};
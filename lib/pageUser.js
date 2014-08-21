var user = require('./module/user'),
    async = require('async'),
    tool = require('./util/tool');

//获取身份
exports.getID = function (req, res, next) {
    if(req.session.user){
        res.send('你好，' + req.session.user.name);
    }else{
        res.send('你好，游客');
    }
}
//跳转到注册页面
exports.getReg = function(req, res){
    res.render('reg', { user:req.session.user || ''});
};
//跳转到登录页面
exports.getLogin = function(req, res){
    res.render('login', { user:req.session.user || ''});
};
//跳转到修改密码页面
exports.getUpdatePassword = function(req, res){
    res.render('updatePassword', {user:req.session.user || ''});
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
                    req.session.user = info[0];
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
                req.session.user = userInfo;//用户信息存入 session
                done();
            }else{
                done('密码不正确，请重新输入。');
            }
        }
    },function(err){
        console.log(err);
        if(err){
            res.send({status: -1, content: err});
        }else{
            res.send({status: 0, content: '登录成功。'});
            // res.render('index');//注册成功后返回主页
        } 
    });
};
//修改密码
exports.updatePassword = function(req, res){
    res.render('updatePassword', { user:req.session.user || ''});
};
//退出
exports.logout = function(req, res){
    req.session.user = null;
    res.redirect('/');
}
//页面权限控制
exports.checkLogin = function(req, res, next){
  if(!req.session.user){
    // res.send({status: -1, content: '未登录!'});
    res.redirect('/login');
  }
  next();
}
exports.checkNotLogin = function(req, res, next){
  if(req.session.user){
    // res.send({status: -1, content: '已登录!'});
    res.redirect('back');//返回之前的页面
  }
  next();
}

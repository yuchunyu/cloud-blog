var user = require('./module/user'),
    async = require('async'),
    tool = require('./util/tool');


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
            res.send({status: 0, content: '注册成功'});
        }
        
    })
}
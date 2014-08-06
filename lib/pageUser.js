var user = require('./module/user'),
    async = require('async');


//注册用户
exports.registeredUser = function(req,res){
    var userName = req.body.userName;
    var passWord = req.body.passWord;
    console.log('----',userName,passWord);
    async.series({
    	//查看是否有这个用户
        findUserName: function(done){
        	user.getByUserName(userName, function(err, info){
        		console.log('err:', err);
        		if(info){
        			done();
        		}else{
        			done();
        		}
        	});
        },
        //注册用户
        // regUser: function(done){

        // }
    }, function (err) {
        console.log(err);
        res.send({status: 0, content: '注册成功'});
    })
}
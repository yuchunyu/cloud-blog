var async = require('async'),
	fs = require("fs"),
    tool = require('./util/tool'),
    config = require('../config.js');

//imgSaveToFile
exports.imgSaveToFile = function(req, res){
	var path = '';
	async.series({
		getUrl:function(done){
			if(!/image/.test(req.files.img.mimetype)){
				path = req.files.img.path;
				done('上传的不是图片格式，请检查');
			}else{
				path = req.files.img.path;
				path = path.replace(config.FILEPATH,'');
				path = path.replace('public/','');
				done();
			}
		}
	},function(err){
		if(err){
			fs.unlink(path);
            res.send({status: -1, message: err});
        }else{
            res.send({status:0,url:path,width:190,height:292});
        } 
	});

	
};
//imgCropToFile
exports.imgCropToFile = function(req, res){
	console.log('=-=-',req);
	res.send({"status":"success","url":"temp\/235b933d70cf3bc7d3472db9d300baa1cc112af6.jpg","width":580,"height":460});
};
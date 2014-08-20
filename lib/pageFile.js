var async = require('async'),
    tool = require('./util/tool');

//imgSaveToFile
exports.imgSaveToFile = function(req, res){
	console.log('=-=-',req.body);
	console.log('=-=-',req.files);
	res.send({"status":"success","url":'temp/d62df6d661c73cf73c782eb5f6e99453.jpg',"width":580,"height":460});
};
//imgCropToFile
exports.imgCropToFile = function(req, res){
	console.log('=-=-',req);
	res.send({"status":"success","url":"temp\/235b933d70cf3bc7d3472db9d300baa1cc112af6.jpg","width":580,"height":460});
};
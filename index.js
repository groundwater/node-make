require('colors')

var _fs = require('fs')
var _cp = require('child_process')

var async = require('async')
var util  = require('util')

var exec = _cp.exec();

function Make(){
	
	var _deps = {};
	var _jobs = {};
	var _proc = {};
	
	this.target = function(){
		if(arguments.length==3){
			_deps[arguments[0]] = arguments[1];
			_jobs[arguments[0]] = arguments[2];
		}else{
			_jobs[arguments[0]] = arguments[1];
			_deps[arguments[0]] = [];
		}
	}
	
	this.job = function(target,next){
		console.log('[INFO] Making %s'.white,target);
		
		var job = _jobs[target];
		if(job){
			job(next);
		}else{
			next('No Rule to Make Target (1): ' + target);
		}
		
	}
	
	this.make = function(target,next){
		if(!_jobs[target]) return next('No Rule to Make Target (2): ' + target);
		
		var self = this;
		var deps = _deps[target];
		
		if(_proc[target]){
			return next('Cyclic Dependency in ' + target);
		}else{
			_proc[target] = true;
		}
		
		async.forEach(deps,function(item,ret){
			self.make(item,ret);
		},function(err){
			if(err){
				next(err)
			}else{
				self.job(target,next);
			}
		});
		
	}
	
}

var success = function(){
	util.format.apply(null,arguments).split(/\n/).forEach(function(line){
		console.log('[SUCCESS] '.green.bold + line)
	})
}

var failure = function(){
	util.format.apply(null,arguments).split(/\n/).forEach(function(line){
		console.log('[FAIL] '.red.bold + line)
	})
}

var info = function(){
	util.format.apply(null,arguments).split(/\n/).forEach(function(line){
		console.log('     | '.white + line)
	})
}

module.exports.Make = Make;
module.exports.info = info;
module.exports.failure = failure;
module.exports.success = success;


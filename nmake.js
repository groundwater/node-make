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
			next('No Rule to Make Target (1)');
		}
		
	}
	
	this.make = function(target,next){
		if(!_jobs[target]) return next('No Rule to Make Target (2)');
		
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

var make = new Make();
var info = function(){
	util.format.apply(null,arguments).split(/\n/).forEach(function(line){
		console.log('       | ' + line)
	})
}

// Make File //

make.target('release',['init'],function(next){
	info('Make Release')
	next()
})

make.target('init',[],function(next){
	info('Make Init')
	next()
})

// Run //

make.make(process.argv[2] || 'all',function(err){
	if(err) {
		console.log('[FAIL]'.red.bold,err);
	}else{
		console.log('[OKAY]'.green.bold,'DONE');
	}
});


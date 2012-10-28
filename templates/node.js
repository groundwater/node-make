var nmake = require('nmake')

var make = new nmake.Make();
var info = nmake.info;

// Make File //

{{NMAKEFILE}}

// Run //

make.make(process.argv[2] || 'default',function(err){
	if(err) {
		nmake.failure(err);
	}else{
		nmake.success('DONE');
	}
});

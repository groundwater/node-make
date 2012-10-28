nmake = require 'nmake'

make = new nmake.Make()
info = nmake.info

{{#NMAKEFILE}}
make.target '{{head}}', [{{#deps}}'{{item}}'{{/deps}}], (next) ->
{{exec}}
{{/NMAKEFILE}}

command = process.argv[3] || 'default'
make.make command,(err) ->
	if err
		nmake.failure err
	else
		nmake.success 'DONE'

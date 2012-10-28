nmake = require 'nmake'

make = new nmake.Make()

{{> commands.coffee}}

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

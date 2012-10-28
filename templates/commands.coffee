# Logging
info = nmake.info
log  = nmake.info
echo = nmake.info

# OS
cd  = (dir) -> process.chdir dir
pwd = process.cwd()

# NPM
install = 'install'
update  = 'update'
link    = 'link'

npm = (command) -> info 'npm', command

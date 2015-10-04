#!/bin/sh
ISERROR=0

which npm > /dev/null 2>&1
if [ $? -ne 0 ] ; then
	echo "command not found: npm"
	echo "please install npm. e.g. sudo apt-get install npm"
	ISERROR=1
fi

which bower > /dev/null 2>&1
if [ $? -ne 0 ] ; then
	echo "command not found: bower"
	echo "please install grunt. e.g. npm install -g bower"
	ISERROR=1
fi

which tsd > /dev/null 2>&1
if [ $? -ne 0 ] ; then
	echo "command not found: webpack-dev-server"
	echo "please install grunt. e.g. npm install -g tsd"
	ISERROR=1
fi

which webpack-dev-server > /dev/null 2>&1
if [ $? -ne 0 ] ; then
	echo "command not found: webpack-dev-server"
	echo "please install grunt. e.g. npm install -g webpack-dev-server"
	ISERROR=1
fi

if [ $ISERROR -ne 0 ] ; then
	exit
fi

rm -rf .sass-cache bower_components bower-task node_modules tsd-cache && \
bower install && \
npm install && \
tsd reinstall && \
echo "Dependencies OK!"

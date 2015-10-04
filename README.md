# Impact Search

[![Build Status](https://travis-ci.org/impact/search.svg)](https://travis-ci.org/impact/search)

This is a simple web application built using
[React](http://reactjs.com) and
[TypeScript](http://www.typescriptlang.org/).  It uses an index file
build using the [impact](http://github.com/impact/impact) package
manager to create an interactive single page web application for
exploring available Modelica libraries.

In order to build this web application, you'll need a few things.
First, you need Node.js and `npm` installed.  You'll also need the
following npm modules installed globally:

```
$ npm install -g webpack-dev-server
$ npm install -g tsd
$ npm install -g bower
```

Once you've done that, you'll want to do the following commands to
pull in all the dependencies:

```
$ bower install
$ npm install
$ tsd reinstall
```

(note: `bower` is used here to pull in `bootstrap` and `jquery`
outside of the `npm`/`webpack` toolchain...this is mainly because
using the `npm` version with `webpack` complicates things and using
`bower` turned out to be easier than figuring out how to use the `npm`
version with `webpack`)

# Webpack

This project uses `webpack`.  In addition, it uses
[`ts-loader`](https://github.com/TypeStrong/ts-loader) to slickly
automate the process of compiling TypeScript into the `webpack` pipe
line.  Special thanks to @jbrantly and @blakeembrey for helping me to
get this working.

To build the web application and serve it locally, just run

```
$ make watch
```

This rebuild the `version.ts` file (used by the application) and then
simply fires off `webpack-dev-server --watch` to start up a
web server and watch for changes.  You can view the application at:

[http://localhost:8080/webpack-dev-server/](http://localhost:8080/webpack-dev-server/)

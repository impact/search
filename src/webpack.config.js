require('es6-promise').polyfill();

var path = require('path');

module.exports = {
    entry: "./entry.ts",
    output: {
	path: path.join(__dirname, './dist'),
        filename: "./bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
	    { test: /\.ts$/, loader: 'ts-loader' }
        ]
    }
};

require('es6-promise').polyfill();

module.exports = {
    entry: "./entry.js",
    output: {
		path: __dirname,
        filename: "./dist/bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" }
        ]
    }
};

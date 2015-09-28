var path = require('path');

module.exports = {
	context: path.join(__dirname, "src"),
    entry: "./entry.ts",
	//context: path.join(__dirname, "build"),
    //entry: "./entry.js",
	resolve: {
		modulesDirectories: ["build", "node_modules", "src"],
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js']
	},
    output: {
		path: path.join(__dirname, './dist'),
		publicPath: "/",
        filename: "./bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
			{ test: /\.ts$/, loader: 'ts-loader' },
			{ test: /\.tsx$/, loader: 'ts-loader' }
        ]
    }
};

/*
module.exports = {
	context: path.join(__dirname, "src"),
    entry: "./entry.ts",
    output: {
		path: path.join(__dirname, './dist'),
		publicPath: "/",
        filename: "./bundle.js"
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: "style!css" },
			{ test: /\.ts$/, loader: 'ts-loader' },
			{ test: /\.tsx$/, loader: 'ts-loader' }
        ]
    }
};
*/

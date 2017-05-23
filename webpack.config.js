// 得到 webpack
var webpack = require('atool-build/lib/webpack');
module.exports = function(webpackConfig) {
	//webpackConfig.output.devtoolLineToLine = true;
    Object.assign(webpackConfig, {
        //devtool: 'source-map',
        //sourceMapFilename: '[file].map'
        devtool: 'source-map'
    });
	// 返回 webpack 配置对象
	return webpackConfig;
};

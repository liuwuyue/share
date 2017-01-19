// 得到 webpack
var webpack = require('atool-build/lib/webpack');
module.exports = function(webpackConfig) {
	webpackConfig.output.devtoolLineToLine = true;
	// 返回 webpack 配置对象
	return webpackConfig;
};

"use strict";
/**
	* @description 常用的工具函数
	*/
const util = {
	//千分位
	thousands: function (n) {
		let t = String(n);
		let pointPosition = t.indexOf('.');
		let suffix = '';
		let reg = /(-?\d+)(\d{3})/;
		if (pointPosition != -1) {
			//包含小数点
			suffix = t.substring(pointPosition);
			//不含小数点
			t = t.substring(0, pointPosition);
		}
		while (reg.test(t)) {
			t = t.replace(reg, "$1,$2")
		}
		return t + suffix;
	},
	//数字不满补0
	addZero: function (n) {
		if (n < 0) {
			return n;
		}
		n = n < 10 ? ('0' + n) : n;
		return n;
	},
	error: function (error) {
		console.log(error.stack || error.message);
		/*
		let errMsg = error.stack || error.message;
		let img = new Image();
		img.src = CONFIG.ERROR_REPORT_URL + '?errorMsg=' + errMsg;
		*/
	},
	entry: function (init) {
		try {
			init();
		} catch (error) {
			this.error(error);
			throw error;
		}
	}
};
export default util;

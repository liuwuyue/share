'use strict';
/**
  * @description 取数据简单封装, 有超时时间设置 超时之后该请求就废弃掉
  * option
  *   timeout:
  *  采用promise 写法 ajax().then().catch();
  */
import util from './util';
//超时时间
const REQUEST_TIMEOUT = 2 * 1000;
const emptyFn = function () {};
//返回一个promise
function ajax (option) {
	let promise = new Promise(function (resolve, reject) {
		let xmlHttp;
		//是否超时
		let isTimeout = false;
		//给默认值
		option = Object.assign({}, {
			//默认的超时时间
			timeout: REQUEST_TIMEOUT,
			type: 'GET',
		}, option);
		//创建对象
		if (window.XMLHttpRequest) {
			xmlHttp = new XMLHttpRequest();
		} else {
			xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
		}
		xmlHttp.open(option.type, option.url, true);
		//设置请求头
		xmlHttp.setRequestHeader("Content-type","application/x-www-form-urlencoded;charset=utf-8");
		//计时
		let timing = setTimeout(function () {
			//已经超时
			isTimeout = true;
			//超时之后取消本次请求
			xmlHttp.abort();
			//此次请求失败
			util.error(new Error(option.url + '请求超时'));
			reject();
		}, option.timeout);
		switch (option.type.toLowerCase()) {
			case "get":
				xmlHttp.send(null);
				break;
			case "post":
				xmlHttp.send(option.data);
				break;
		}
		xmlHttp.onreadystatechange = function () {
			if (isTimeout) {
				return;
			}
			if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
				//清除超时处理
				clearTimeout(timing);
				let json;
				let complete = option.complete || emptyFn;
				try {
					json = JSON.parse(xmlHttp.responseText);
					if (json.success) {
						//标记成功
						resolve(json);
					} else {
						util.error(new Error(option.url + '未能拿到期望数据'));
						//标记失败
						reject();
					}
				} catch (error) {
					util.error(new Error(option.url + '数据解析失败'));
					//标记失败
					reject();
				}
			}
		}
	});
	return promise;
}
export default ajax;

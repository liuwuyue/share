const util = {
	//加载图片
	loadImg: function (src) {
		let promise = new Promise((resolve, reject) => {
			let img = new Image();	
			img.onload = function () {
				resolve(img);		
			}
			img.onerror = function (err) {
				reject(err);	
			}
			img.src = src;
		});			 
		return promise;
	},
	//已知 start,end {x:,y:} 并百分比 给出点坐标 
	line: function (start, end, p) {
		let point;
		if (start.x == end.x) {
			point = {
				x: start.x,
				y: (1 - p) * start.y + p * end.y
			};
		} else {
			// 按直线方程处理 y = k (x - x0) + y0 	
			let k = (end.y - start.y) / (end.x - start.x);
			let x = (1 - p) * start.x + p * end.x;
			point = {
				x: x,
				y: k * (x - start.x) + start.y			
			};
		}	  
		return point;
	},
	//根据给定的p返回对应的点
	bezier: function (start, end, p) {
		let direction = Math.random() > 0.5 ? 1 : -1;
		let control;
		//设置控制点
		if (start.x === end.x) {
			control = {
				x: start.x +  direction * Math.abs(end.y - start.y) / 2,
				y: (start.y + end.y) / 2
			};
		} else if (start.y === end.y) {
			control = {
				x: (start.x + end.x) / 2,
				y: start.y + direction * Math.abs(start.x - end.x) / 2
			};
		} else {
			control = {
				x: start.x,
				y: (start.y + end.y)  / 2
			};
		}
		return {
			x: (1 - p) * (1 - p) * start.x + 2 * p * (1 - p) * control.x + p * p * end.x,
			y: (1 - p) * (1 - p) * start.y + 2 * p * (1 - p) * control.y + p * p * end.y
		}
	}
};
export default util;

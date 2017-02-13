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
	}
};
export default util;

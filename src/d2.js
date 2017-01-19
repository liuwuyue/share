//各种2d函数
import * as d3 from 'd3';
const d2 = {
	/**
	  * @description 直接画一条线
	  * @ option
	  *  el: 容器
	  *  points: 经过的点
	  */
	line: function (option) {
		//直线的构造函数
		let line = d3.line()
			.x((d) => {return d.x;})
			.y((d) => {return d.y;});
		let path = d3.select(option.el).append('svg').append('g')
			.append('path')
			.attr('stroke-width', '1')
			.attr('fill', 'transparent')
			.attr('stroke', 'yellow');
		if (option.animate) {
			let linePoints = [];	
			let points = option.points;
			for (let i = 0; i < option.points.length - 1; i++) {
				linePoints = linePoints.concat(this.computePoints({start: points[i], end: points[i + 1]}));	
			}
			this.animateLine({
				path: path,
				points: linePoints 
			});		
		} else {
			path.attr('d', line(option.points))
		}
	},
	/**
	  * @descirption 根据给出的点 描出线
	  * @option
	  *		path 路径
	  *     points
	  */
	animateLine: function (option) {
		let i = 1;
		let points = option.points;
		let length = points.length;
		let line = d3.line()
			.x((d) => {return d.x;})
			.y((d) => {return d.y;});
		render();
		function render () {
			if (i >= length && length < 2) {
				return;	
			}
			requestAnimationFrame(render);	
			option.path.attr('d', line(points.slice(0, i))); 
			i ++;
		}	
	},
	/*
	 * @description 根据起始点 计算中间点 画直线
	 * @option
	 *    start,
	 *    end 
	 *    step
	 */
	computePoints: function (option) {
		let params = {
			step: 0.05,
			... option
		};
		let points = [];
		let start = params.start;
		let end = params.end;
		let t = 0;
		//步长
		let step = 0.05;
		if (start.x == end.x) {
			//竖直的特殊情况处理
			let y = d3.interpolate(start.y, end.y);
			while (t <= 1) {
				points.push({x: start.x, y: y(t)});
				t += step;
			}
			return points;	
		}	
		//斜率
		let k = (end.y - start.y) / (end.x - start.x);
		// y = k (x - x0) + y0
		//差值 (1-t) * x0 + x1 * t 一次线性插值
		let x = d3.interpolate(start.x, end.x);
		while (t <= 1) {
			let tmpX = x(t);	
			let tmpY = k * (tmpX - start.x) + start.y;
			points.push({x: tmpX, y: tmpY});
			t += step;
		}
		return points;
	}
};
export default d2;

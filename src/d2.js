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
		let path = option.g
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
				g: option.g,
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
	  *     g 最外围容器
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
			if (i >= length || length < 2) {
				/*
				option.path
					.attr('opacity', 1)
					.transition()
					.duration(1000)
					.attr('opacity', 0);
				setTimeout(() => {
					option.g.remove();			
				}, 1000);
				*/
				option.g.remove();
				return;
			}
			requestAnimationFrame(render);
			option.path.attr('d', line(points.slice(0, i)));
			i ++;
		}
	},
	//计算贝塞尔曲线的点 简单的二次曲线
	//option start, end, control
	computePointsBelizer: function (option) {
		//公式 p(t) = (1-t) * (1-t) * p0 + 2t(1-t)p1 + t*t*p2
		let points = [];
		let step = 0.02;
		let t = 0;
		while (t <= 1) {
			points.push({
				x:  (1 - t) * (1 - t) * option.start.x + 2 * t * (1 - t) * option.control.x + t * t * option.end.x,
				y:(1 - t) * (1 - t) * option.start.y + 2 * t * (1 - t) * option.control.y + t * t * option.end.y
			});
			t += step;
		}
		return points;
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
			step: 0.02,
			... option
		};
		let points = [];
		let start = params.start;
		let end = params.end;
		let t = 0;
		//步长
		let step = params.step;
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
	},
	/*
	 * @description 贝塞尔二次曲线
	 *  g: 容器
	 *  start: 端点
	 *  end: 端点
	 */
	belzier: function (option) {
		let belizier = option.g
			.append('path')
			.attr('stroke-width', '1')
			.attr('fill', 'transparent')
			.attr('stroke', option.lineColor || 'red');
		//控制点
		let control;
		let start = option.start;
		let end = option.end;
		let direction = Math.random() * 2 > 1 ? 1 : -1;
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
		if (option.animate) {
			let points = this.computePointsBelizer({
				start: start,
				control: control,
				end: end
			});
			this.animateLine({
				g: option.g,
				path: belizier,
				points: points
			});
		} else {
			let path = d3.path();
			path.moveTo(start.x, start.y);
			path.quadraticCurveTo(control.x,control.y, end.x, end.y);
			belizier.attr('d', path.toString());
		}

	}
};
export default d2;

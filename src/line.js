import * as d3 from 'd3';
import $ from 'jquery';
import d2 from './d2';
import './line.less';
import Earth from './earth';
//画一条直线
const w = $('body').width();
const h = $('body').height();
let type = 1; 
let points = [];
switch (type) {
	case 0:
		//生成 100个模拟点
		for (let i = 0; i < 3; i++) {
			points.push({x: Math.random() * w, y: Math.random() * h});
		}
		//动态的画线
		d2.line({
			g: d3.select('#line svg').append('g'),
			points: points,
			animate: true,
			destroy: false
		});
		break;
	case 1:
		function paint () {
			requestAnimationFrame(paint);
			let start = {x: Math.random() * w, y: h / 2 + Math.random() * h / 2};
			let end = {x: Math.random() * w , y: Math.random() * start.y};
			d2.belzier({
				g: d3.select('#line svg').append('g'),
				start: start,
				end: end,
				animate: true,
				lineColor: start.x < end.x ? 'url(#left2right)' : 'url(#right2left)' 
			});
		}
		//贝塞尔曲线
		paint();
		break;
	case 2:
		//球体
		let earth = new Earth({
			el: '#earth'
		});
		break;
}

import * as d3 from 'd3';
import $ from 'jquery';
import d2 from './d2';
import './line.less';
import Earth from './earth';
//画一条直线
const w = $('body').width();
const h = $('body').height();
let type = 2;
let points = [];
switch (type) {
	case 0:
		//生成 100个模拟点
		for (let i = 0; i < 100; i++) {
			points.push({x: Math.random() * w, y: Math.random() * h});
		}
		//动态的画线
		d2.line({
			g: d3.select('#line').append('svg').append('g'),
			points: points,
			animate: true
		});
		break;
	case 1:
		//贝塞尔曲线
		let start = {x: Math.random() * w , y: Math.random() * h };
		let end = {x: Math.random() * w , y: Math.random() * h };
		d2.belzier({
			g: d3.select('#line').append('svg').append('g'),
			start: start,
			end: end,
			animate: true
		});
		/*
		//生成 10 条贝塞尔曲线
		for (let j = 0; j < 100; j ++) {
			let start = {x: Math.random() * w , y: Math.random() * h };
			let end = {x: Math.random() * w , y: Math.random() * h };
			d2.belzier({
				g: g,
				start: start,
				end: end,
				animate: true
			});
		}
		*/
		break;
	case 2:
		//球体
		let earth = new Earth({
			el: '.item'
		});
		break;
}

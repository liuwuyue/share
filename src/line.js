import * as d3 from 'd3';
import $ from 'jquery';
import d2 from './d2';
import './line.less';
//画一条直线
const w = 400;
const h = 400;
let points = [];
//生成 100个模拟点
for (let i = 0; i < 100; i++) {
	points.push({x: Math.random() * w, y: Math.random() * h});	
}
//动态的画一条直线
d2.line({
	el: '#line',
	points: points,
	animate: true
});

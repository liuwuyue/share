import * as d3 from 'd3';
//数据拿的g2的地图数据
import chinaGeoJson from 'china-geojson';
console.log(chinaGeoJson);
let width = window.innerWidth;
let height = window.innerHeight;
const NANHAI = '南海诸岛';
const mapUtil = {
	/**
	 * @description 根据经纬度获取映射后的坐标
	 *  @projection 投影
	 *  @point 经纬度 [longitude, latitude]
	 *  @return [x, y]
	 */
	getPosition: function (projection, point) {
		return projection(point); 
	},
	china: function (selector, geoJson) {
		let center = [115, 36];
		let projection = d3.geoMercator()
		//let projection = d3.geoConicEquidistant()
			.center(center)
			.scale(1000)
			.translate([width / 2, height / 2])
			.rotate(90 / 180 * Math.PI);
		let path = d3.geoPath().projection(projection);
		let position = projection(center);
		let circles = [position, [width / 2, height / 2]];
		d3.select('#map').append('g')
			.selectAll('circle')
			.data(circles)
			.enter()
			.append('circle')
			.attr('r', 10)
			.attr('fill', 'red')
			.attr('cx', d => d[0])
			.attr('cy', d => d[1]);
		d3.select(selector)
			.append('g')
			.selectAll('path')
			//.data(chinaGeoJson.China.features)
			.data(geoJson.features)
			.enter()
			.append('path')
			.attr('d', (d) => {
				return path(d);
			})
			.attr('stroke', (d) => {
				if (d.properties.name === NANHAI) {
					return 'rgba(0, 0, 0, 0.1)';	
				}
				return this.color();
			})
			.attr('fill', (d) => {
				if (d.properties.name === NANHAI) {
					return 'rgba(0, 0, 0, 0)';	
				}
				return this.color();	
			});
	},
	color: function () {
		return 'rgba(' + 
			[Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), 
				Math.random()].join() + ')';
	}
};
export default mapUtil;

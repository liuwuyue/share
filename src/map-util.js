import * as d3 from 'd3';
//数据拿的g2的地图数据
import chinaGeoJson from 'china-geojson';
let width = window.innerWidth;
let height = window.innerHeight;
const NANHAI = '南海诸岛';
const mapUtil = {
	china: function () {
		let projection = d3.geoMercator()
			.center([107, 31])
			.scale(850)
			.translate([width / 2, height / 2]);
		let path = d3.geoPath().projection(projection);
		d3.select('#map')
			.append('g')
			.selectAll('path')
			.data(chinaGeoJson.China.features)
			.enter()
			.append('path')
			.attr('d', (d) => {
				return path(d);
			})
			.attr('stroke', (d) => {
				if (d.properties.name === NANHAI) {
					return 'rgba(0, 0, 0, 0.3)';	
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

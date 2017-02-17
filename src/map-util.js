import * as d3 from 'd3';
import chinaGeoJson from 'china-geojson';
let width = window.innerWidth;
let height = window.innerHeight;
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
			.attr('stroke', () => {
				let color = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)].join();
				console.log('rgb(' + color + ')');
				return 'rgb(' + 
					[Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)].join()
					+ ')';
			})
			.attr('fill', () => {
				return 'rgba(' + 
					[Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), 
						Math.random()].join() + ')';
			});
	}
};
export default mapUtil;

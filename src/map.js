import mapUtil from './map-util';
import * as d3 from 'd3';
d3.json('./cn-all.geo.json', (geoJson)=> {
	mapUtil.china('#map', geoJson);
});

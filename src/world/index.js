import World from './world';
//lbs数据
//import data from './worldMapData';
//双11数据
//import data from './data';
//最新数据
import data from './heatMap2';
let world = new World({
  w: 1100,
  h: 550,
  data: data,
  el: document.querySelector('#world')
});

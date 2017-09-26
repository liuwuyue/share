import World from './world';
//lbs数据
//import data from './worldMapData';
//双11数据
import data from './data';
let world = new World({
  w: 1100,
  h: 550,
  data: data,
  el: document.querySelector('#world')
});

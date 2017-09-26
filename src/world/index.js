import World from './world';
import data from './worldMapData';
//import data from './data';
console.log(data);
let world = new World({
  w: 1100,
  h: 550,
  data: data,
  el: document.querySelector('#world')
});

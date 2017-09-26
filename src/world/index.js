import World from './world';
import data from './worldMapData';
let world = new World({
  w: 950,
  h: 475,
  data: data,
  el: document.querySelector('#world') 
});

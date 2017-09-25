import Points from './points';
import data from './data';
const w = window.innerWidth;
const h = window.innerHeight;
//最大
const max = 64;
let allPoints = data(w, h, max);
let points = new Points({
  w: w,
  h: h,
  data: allPoints,
  el: document.querySelector('#points')
});
requestAnimationFrame(animate);
//帧率
const rate = 1;
const step = 1;
let i = 0;
function animate () {
  requestAnimationFrame(animate);
  allPoints.forEach((item, index) => {
    if (item.size >= max) {
      item.direction = -1;
    } else if (item.size <=0 ) {
      item.direction = 1;
    }
    item.size += item.direction * step; 
  });
  points.render();
  i ++;
}

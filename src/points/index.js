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
const step = 0.04;
function animate () {
  requestAnimationFrame(animate);
  update();
  points.render();
}
function update () {
  allPoints.forEach((item, index) => {
    if (item.t >= 1) {
      item.direction = -1;
    } else if (item.t <= 0 ) {
      item.direction = 1;
    }
    item.t += item.direction * step; 
    //每个点都是不同的闪烁速度 不同的变化曲线
    item.size = bezier({p1: item.p1, p2: item.p2, t: item.t}) * item.max;
    //每个点都是相同的闪烁速度 线性变化
    //item.size =  (1 - item.t) * 0 + item.t * max;
  });
}
/**
  * @description 3次贝塞尔曲线 
  * @params
  *  p1, p2 两个控制点 
  *  默认起始点是 0,0  1,1
  *  t 当前进度
  *@return 返回对应的坐标点  
  */
function bezier (params) {
  let p0 = {x: 0, y: 0};
  let p3 = {x: 1, y: 1};
  let {t, p1, p2} =  params;
  return Math.pow((1 - t), 3) *  p0.y + 3 * p1.y * t * Math.pow(1 - t, 2) + 3 * p2.y * Math.pow(t , 2) * (1 - t) + p3.y * Math.pow(t , 3)  
}

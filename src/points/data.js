/**
  * @author wuyue.lwy
  * @description  模拟数据
  */
function data (w, h, max) {
  //长， 宽， 数据个数
  let n;
  //数据存储
  let points = [];
  n = 500;
  while (n--) {
    points.push({
      x: Math.floor(Math.random() * w),
      y: Math.floor(Math.random() * h),
      type: Math.random() > 0.5 ? 0 : 1,
      max: Math.random() * 40 + 20,
      p1: {x: Math.random(), y: Math.random()},
      p2: {x: Math.random(), y: Math.random()},
      t: Math.random(),
      direction: 1,
    });
  }
  return points;
}
export default data;

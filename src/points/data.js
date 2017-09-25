/**
  * @author wuyue.lwy
  * @description  模拟数据
  */
function data (w, h, max) {
  //长， 宽， 数据个数
  let n;
  //数据存储
  let points = [];
  n = 1000;
  while (n--) {
    points.push({
      x: Math.floor(Math.random() * w),
      y: Math.floor(Math.random() * h),
      type: Math.random() > 0.5 ? 0 : 1,
      size: Math.random() * max,
      direction: 1,
    });
  }
  return points;
}
export default data;

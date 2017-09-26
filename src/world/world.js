/**
  * @author wuyue.lwy
  * @description 大规模散点处理
  */
//获取图标
import star from './start_alpha.png';
import map from './world.png';
//步长
const step = 0.02;
//世界地图
class World {
  constructor (option) {
    this.option = {
      w: 100,
      h: 100,
      el: document.body,
      ...option
    };
    this.option.el.style.background="url(" + map + ") no-repeat center /100%";
    //预处理数据
    this.preDealData();
    this.createCanvas();
    this.img()
      .then(() => {
        this.animate();
      })
  }
  animate () {
    const animateFn = () => {
      requestAnimationFrame(animateFn);
      this.update();
      this.render();
    };
    requestAnimationFrame(animateFn);
  }
  /**
    * @description 3次贝塞尔曲线
    * @params
    *  p1, p2 两个控制点
    *  默认起始点是 0,0  1,1
    *  t 当前进度
    *@return 返回对应的坐标点
    */
  bezier (params) {
    let p0 = {x: 0, y: 0};
    let p3 = {x: 1, y: 1};
    let {t, p1, p2} =  params;
    return Math.pow((1 - t), 3) *  p0.y + 3 * p1.y * t * Math.pow(1 - t, 2) + 3 * p2.y * Math.pow(t , 2) * (1 - t) + p3.y * Math.pow(t , 3)
  }
  update () {
    this.option.data.forEach((item, index) => {
      if (item.t >= 1) {
        item.direction = -1;
      } else if (item.t <= 0 ) {
        item.direction = 1;
      }
      item.t += item.direction * step;
      //每个点都是不同的闪烁速度 不同的变化曲线
      item.size = this.bezier({p1: item.p1, p2: item.p2, t: item.t}) * item.max;
      //每个点都是相同的闪烁速度 线性变化
      //item.size =  (1 - item.t) * 0 + item.t * item.max;
    });
  }
  preDealData () {
    //获取最大值， 最小值
    let max = Number.MIN_VALUE;
    let min = Number.MAX_VALUE;
    this.option.data.forEach((item) => {
      //数据处理 减小差距
      item.value = Math.pow(item.value, 1 / 5);
      max = Math.max(item.value, max);
      min = Math.min(item.value, min);
    });
    this.max = max;
    this.min = min;
    this.distance = max - min;
    this.option.data = this.option.data.map((item, index) => {
      let {x, y, size} = this.computeXYS(item);
      return {
        ... this.computeXYS(item),
        p1: {x: Math.random(), y: Math.random()},
        p2: {x: Math.random(), y: Math.random()},
        t: Math.random(),
        direction: 1,
      };
    });
  }
  //定位 lng lat value
  computeXYS (item) {
    let {lat, lng, value} = item;
    let x = (lng - (-180)) / 360 * this.option.w;
    let y = Math.abs((lat - 90) / 180) * this.option.h;
    let ds = 2.5;
    return {
      x: x + Math.random() * ds * (Math.random() > 0.5 ? 1 : -1),
      y: y + Math.random() * ds * (Math.random() > 0.5 ? 1 : -1),
      max: 10 + (value - this.min) / this.distance * 70
    };
  }
  //获取闪烁图标
  img () {
    return new Promise((resolve, reject) => {
      let star_img = new Image();
      star_img.onload = () => {
        resolve();
      };
      star_img.src = star;
      this.star = star_img;
    });
  }
  //创建canvas 到所在容器里面
  createCanvas () {
    let canvasEl = document.createElement('canvas');
    canvasEl.width = this.option.w;
    canvasEl.height = this.option.h;
    this.option.el.appendChild(canvasEl);
    this.ctx = canvasEl.getContext('2d');
  }
  render () {
    let ctx = this.ctx;
    ctx.clearRect(0, 0, this.option.w, this.option.h);
    if (this.option.data) {
      this.option.data.forEach((item) => {
        let size = item.size;
        ctx.drawImage(this.star, item.x - size / 2, item.y - size / 2, size, size);
      });
    }
  }
}
export default World;

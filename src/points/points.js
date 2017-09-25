/**
  * @author wuyue.lwy
  * @description 大规模散点处理
  */
import light from '../../img/light_alpha.png';
import star from '../../img/start_alpha.png';
const size = 2;
//const colors = ['rgba(0, 255, 0, .3)', 'rgba(0, 238, 0, .3)', 'rgba(0, 205, 0, .3)'];
const colors = ['rgba(0, 255, 0, .8)'];
class Points {
  constructor (option) {
    this.option = {
      w: 100,
      h: 100,
      el: document.body,
      ...option 
    };
    this.img();
    this.createCanvas();
    this.render();
  }        
  img () {
    let light_img = new Image();
    light_img.src = light; 
    this.light = light_img;
    let star_img = new Image();
    star_img.src = star; 
    this.star = star_img;
  }
  //创建canvas 到所在容器里面
  createCanvas () {
    let canvasEl = document.createElement('canvas'); 
    canvasEl.width = this.option.w;
    canvasEl.height = this.option.h;
    this.option.el.appendChild(canvasEl);
    this.ctx = canvasEl.getContext('2d');
  }
  update (params) {
    this.option = {
      ...this.option,
      ...params
    };
    this.render();
  }
  render () {
    let ctx = this.ctx;
    ctx.clearRect(0, 0, this.option.w, this.option.h);
    if (this.option.data) {
      ctx.fillStyle = 'rgba(0, 0, 0, .9)';
      ctx.fillRect(0, 0, this.option.w, this.option.h);
      this.option.data.forEach((item) => {
        let size = item.size;
        //ctx.drawImage(item.type === 0 ? this.star : this.light, item.x - size / 2, item.y - size / 2, size, size);
        ctx.drawImage(this.star, item.x - size / 2, item.y - size / 2, size, size);
      }); 
    }
  }        
}
export default Points;

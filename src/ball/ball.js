/**
  * @description 球
  *     option: 
  *     {
  *      //宽
  *      width:,
  *      //高
  *      height:
  *      //单个元素的宽高 正方形要求
  *      itemSize:,
  *    }
  [[{imgSrc: '', }, {}, {}, {}], [{}, {}, ...]]
  */
import React from 'react';
import Ring from './ring';
import './ball.less';
import Mask from './mask';
class Ball extends React.Component {
    render () {
        let option = this.props.option;
        let style = {
            width: option.width,
            height: option.height
        };
        let op = option.rings.option;
        let n = Math.floor(option.height / op.itemSize);
        let m = Math.floor(n / 2);
        let max = 70;
        //每一次弯曲的角度
        let step = max / m;
        let rings = [];
        //上面一半
        //竖直方向的高度
        let size = op.itemSize;
        //环新距离球心的距离
        let gap = -1 * size / 2;
        let ty = 0;
        for (let i = 0; i < m; i++) {
            let deg = 90 - i * step;
            let r = Math.sqrt(option.width / 2 * option.width / 2 - gap * gap)
            ty += Math.sin(deg / 180 * Math.PI) * size * -1;
            rings.unshift(
                <Ring option={{...op, rotateX: i * step * -1,  ty: ty, r: r}}  key={'up' + i}></Ring>
            );  
            gap = ty + Math.sin(deg / 180 * Math.PI) * size / 2 * -1;
        }
        //下面的一半
        ty = 0 
        for (let i = 0; i < m; i++) {
            let deg = i * step;
            gap = ty + Math.cos(deg / 180 * Math.PI) * size / 2;
            let r = Math.sqrt(option.width / 2 * option.width / 2 - gap * gap)
            rings.push(
                <Ring option={{...op, rotateX: deg, ty: ty, r: r}}  key={'down' + i}></Ring>
            );  
            ty += Math.cos(deg / 180 * Math.PI) * size;
        }
        return (
            <div className="ball" style={style} ref={ c => this.el = c}>
                {
                    rings
                }
                <Mask></Mask>
            </div>         
        ); 
    }
    componentDidMount () {
        let list = [];
        this.el.querySelectorAll('.ring').forEach((el) => {
            list.push({
                el: el,
                transform: el.style.transform
            });
        }); 
        update();
        let y = 0;
        function update () {
            requestAnimationFrame(update);
            let step = 1;
            list.forEach((item) => {
                item.el.style.transform = [item.transform, 'rotateY(' + y + 'deg'].join(' ');  
            });
            y = (y + step) % 360;
        }
    }
}
export default Ball;

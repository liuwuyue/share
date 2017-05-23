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
        let max = 80;
        //每一次弯曲的角度
        let step = max / m;
        let rings = [];
        //上面一半
        //竖直方向的高度
        let gap = -50;
        for (let i = 0; i < m; i++) {
            let deg = 90 - i * step;
            let r = Math.sqrt(option.width / 2 * option.width / 2 - gap * gap)
            rings.unshift(
                <Ring option={{...op, rotateX: i * step * -1,  ty: gap, r: r, type: 'up'}}  key={'up' + i}></Ring>
            );  
            gap += Math.sin(deg / 180 * Math.PI) * op.itemSize * -1;
        }
        //下面的一半
        gap = 0;
        for (let i = 0; i < m; i++) {
            let deg = i * step;
            let r = Math.sqrt(option.width / 2 * option.width / 2 - gap * gap)
            console.log(gap);
            rings.push(
                <Ring option={{...op, rotateX: deg, ty: gap, r: r, type: 'down'}}  key={'down' + i}></Ring>
            );  
            gap += Math.cos(deg / 180 * Math.PI) * op.itemSize;
        }
        return (
            <div className="ball" style={style}>
                {
                    rings
                }
            </div>         
        ); 
    }
}
export default Ball;

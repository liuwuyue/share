/**
  * @description 圆环
  *     op {itemSize: 97}
  */
import React from 'react';
import './ring.less';
const imgSrc = '/dist/img/ball/female/01.png';
class Ring extends React.Component {
    //圆环
    //渲染
    render () {
        let option = this.props.option;
        let style = {
            width: option.itemSize,
            height: option.itemSize,
            marginLeft: option.itemSize / 2 * -1,
            transform: 'translateY(' + option. ty + 'px)'
        };
        let deg = Math.asin(option.itemSize  / 2 / option.r) * 2 / Math.PI * 180; 
        let n = Math.floor(Math.PI / Math.asin(option.itemSize  / 2 / option.r));
        let child = [];
        let transformZ = 'translateZ(-' + option.r + 'px)';
        //transformZ = '';
        for (let i = 0; i < n; i ++) {
            let transformStyle = {
                //transform: 'rotateY(' + deg * i + 'deg) ' + transformZ + 'rotateX(' + option.rotateX + 'deg)'
                //transform: [transformZ , 'rotateY(' + deg * i + 'deg) ', 'rotateX(' + option.rotateX + 'deg)'].join(' ')
                //transform: [transformZ , 'rotateY(' + deg * i + 'deg) '].join(' ')
                transform: ['rotateY(' + deg * i + 'deg)', transformZ, 'rotateX(' + option.rotateX + 'deg)'].join(' ')
            };
            child.push((
                <img width={option.itemSize + 'px'} height={option.itemSize + 'px'} src={imgSrc} key={i} style={transformStyle}></img>
            )); 
        }
        return (
            <div className="ring" style={style}>
                {
                    child
                }
            </div>         
        ); 
    }
}
export default Ring;

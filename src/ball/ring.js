/**
  * @description 圆环
  *     op {itemSize: 97}
  */
import React from 'react';
import './ring.less';
const imgSrc = '/dist/img/ball/female/01.png';
function img () {
    let index = Math.floor(Math.random() * 52) + 1;
    let prefix = '/dist/img/ball/female/';
    return prefix + (index >= 10 ? index : ('0' + index)) + '.png';
}
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
        let n = Math.ceil(Math.PI / Math.asin(option.itemSize  / 2 / option.r));
        let child = [];
        let transformZ = 'translateZ(-' + option.r + 'px)';
        for (let i = 0; i < n; i ++) {
            let transformStyle = {
                transform: ['rotateY(' + deg * i + 'deg)', transformZ, 'rotateX(' + option.rotateX + 'deg)'].join(' ')
            };
            child.push((
                <img width={option.itemSize + 'px'} height={option.itemSize + 'px'} src={img()} key={i} style={transformStyle}></img>
            ));
        }
        return (
            <div className="ring" style={style} ref={c => this.el = c}>
                {
                    child
                }
            </div>
        );
    }
}
export default Ring;

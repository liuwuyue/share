import './index.less';
import React from 'react';
import ReactDOM from 'react-dom'
import Ball from './ball';
const max = 52;
const step = 4;
const prefix = '/dist/img/ball/female/';
let option = {
    //容器的宽 高
    width: 500,
    height: 500,
    rings: {
        option: {
            //单个图片的宽高
            itemSize: 50,
            perspective: 250
        },
        data: [[{imgSrc: '01.png'}, {imgSrc: '01.png'}, {imgSrc: '01.png'}]]
    }
};
option.rings.data.forEach((item) => {
    item.forEach((c) => {
        let index = Math.floor(Math.random() * 53);
        c.imgSrc = prefix + (index >= 10 ? index : ('0' + index)) + '.png';
    });
});
ReactDOM.render(
    <Ball option={option}></Ball>,
    document.querySelector('.wrapper')
);

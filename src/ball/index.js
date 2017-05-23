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
        c.imgSrc = prefix + c.imgSrc; 
    });
});
ReactDOM.render(
    <Ball option={option}></Ball>,
    document.querySelector('.wrapper')
);

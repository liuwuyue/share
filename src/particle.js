"use strict";
import util from './particle-util';
let canvas = document.querySelector('#particle canvas');
let ctx = canvas.getContext('2d');
//图像相关信息
let x0 = 0,
	y0 = 0,
	w = 300,
	h = 300,
	rows = h / 3,
	cols = w / 3 ;
let from = {
	x: Math.floor(w / 2),
	y: h + 10 
};
util.loadImg('./img/isux.png')
	//加载图片
	.then((img) => {
		ctx.drawImage(img, x0, y0);
		let imgData = ctx.getImageData(x0, y0, w, h).data;
		//截取的行列
		let sw = Math.floor(w / rows);
		let sh = Math.floor(h / cols);
		let pixes = [];
		for (let i = 0; i < h; i += 1) {
			for (let j = 0; j < w; j += 1) {
				let r = (i * w + j) * 4;
				let g = r + 1;
				let b = r + 2;
				let a = r + 3;
				if (imgData[r] + imgData[g] + imgData[b] + imgData[a]) {
					pixes.push({
						x: j + (Math.random() - 0.5) * 10,
						y: i + (Math.random() - 0.5) * 10,
						w: 1,
						h: 1,
						fill: 'rgba(' + [imgData[r], imgData[g], imgData[b], imgData[a]].join() + ')'
					});
				}
			}
		}
		requestAnimationFrame(draw);
		let start = null;
		let duration = 1000;
		function draw (t) {
			start = start === null ? t : start;
			let p = (t - start) / duration;
			ctx.clearRect(x0, y0, w, h);
			let dx = 0;
			let dy = 0;
			let len = pixes.length;
			for (let i = len - 1; i >= 0 ; i--) {
				let tmp = pixes[i];
				let t = p / (len - 1) * i ;
				ctx.fillStyle = tmp.fill;	
				let point = util.line({x: from.x, y: from.y}, {x: tmp.x, y: tmp.y}, t >= 1 ? 1 : t);
				ctx.fillRect(point.x, point.y, tmp.w, tmp.h);
			}
			requestAnimationFrame(draw);	
		}
	})
	.catch((error) => {
		console.log(error);
	});

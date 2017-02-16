"use strict";
import util from './particle-util';
let canvas = document.querySelector('#particle canvas');
let ctx = canvas.getContext('2d');
//canvas的宽高
let width = window.innerWidth,
	height = window.innerHeight;
canvas.width = width;
canvas.height = height;
util.loadImg('./img/logo.jpg')
	//加载图片
	.then((img) => {
		//图像相关信息
		let x0 = 0,
			y0 = 0,
			w = img.width,
			h =  img.height;
			/*
			rows = h / 3,
			cols = w / 3 ;
			*/
		//平移量
		let move = {
			x: 0,
			y: 0
		};
		//起点
		let from = {
			x: w / 2 + 200,
			y: h / 2 + 200
		};
		let duration = 1000;
		//画在 x0,y0 处
		ctx.drawImage(img, x0, y0, w, h);
		let imgData = ctx.getImageData(x0, y0, w, h).data;
		//截取的行列
		/*
		let sw = Math.floor(w / rows);
		let sh = Math.floor(h / cols);
		*/
		let pixes = [];
		for (let i = 0; i < h; i += 1) {
			for (let j = 0; j < w; j += 1) {
				let r = (i * w + j) * 4;
				let g = r + 1;
				let b = r + 2;
				let a = r + 3;
				if (imgData[r] + imgData[g] + imgData[b] + imgData[a]) {
					pixes.push({
						x: j, //+  (Math.random() - 0.5) * 10,
						y: i, //+ (Math.random() - 0.5) * 10,
						w: 1,
						h: 1,
						fill: 'rgba(' + [imgData[r], imgData[g], imgData[b], imgData[a]].join() + ')',
						delay: Math.random() * duration +  duration / 10,
						p: 0,
					});
				}
			}
		}
		requestAnimationFrame(draw);
		let start = null;
		function draw (t) {
			let isGoOn = false;
			for (let i = 0; i < pixes.length; i++) {
				if (pixes[i].p < 1) {
					isGoOn = true;
					break;
				}
			}
			if (!isGoOn) {
				for (let i = 0; i < pixes.length; i++) {
					pixes[i].p = 0;
				}
				from = {
					x: Math.random() * width,
					y: Math.random() * height
				};
				move = {
					x: Math.random() * (width - w),
					y: Math.random() * (height -h)
				};
				start = t;
			}
			start = start === null ? t : start;
			ctx.clearRect(x0, y0, width, height);
			requestAnimationFrame(draw);
			let dx = 0;
			let dy = 0;
			let len = pixes.length;
			for (let i = len - 1; i >= 0 ; i--) {
				let tmp = pixes[i];
				let p = (t - start - tmp.delay) / duration;
				tmp.p = p;
				if (p <= 0) {
					continue;
				}
				if (p >= 1) {
					p = 1;
				}
				ctx.fillStyle = tmp.fill;
				let point;
				if (Math.random() > 0.5) {
					//曲线
					point = util.bezier({x: from.x, y: from.y}, {x: tmp.x + move.x, y: tmp.y + move.y}, p);
				} else {
					//直线
					point = util.line({x: from.x, y: from.y}, {x: tmp.x + move.x, y: tmp.y + move.y}, p);
				}
				ctx.fillRect(point.x, point.y, tmp.w, tmp.h);
				//ctx.fillRect(point.x + (width - w) / 2, point.y +  (height - h) / 2, tmp.w, tmp.h);
			}
		}
	})
	.catch((error) => {
		console.log(error);
	});

import 'normalize.css';
import './index.less';
import util from './util';
//容器的宽 高
let w = window.innerWidth;
let h = window.innerHeight;
//canvas
let canvas = document.createElement('canvas');
canvas.width = w;
canvas.height = h;
document.querySelector('#movement').appendChild(canvas);
//上下文环境
let ctx = canvas.getContext('2d');
let center = {
    x: w / 2,
    y: h / 2
};
let path = [];
for (let i = 0; i < 1000; i++) {
    path.push({
        type: Math.random() > 0.05 ? 1 : 0,
        start: {
            x: Math.random() * w , //center.x + util.random() * (Math.random() * w / 10 + 4 / 10 * w),
            y: Math.random() * h
        },
        end: {
            x: center.x + util.random() * w / 20,
            y: center.y + util.random() * h / 20

        },
        t: Math.random()
    });
}
//起始时间
let start = null;
let duration = 5 * 1000;
requestAnimationFrame(animate);
let i = 0;
function animate (timestamp) {
    requestAnimationFrame(animate);
    if (start === null) {
        start = timestamp;
    }
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = 'rgba(0, 0, 0, .9)';
    ctx.fillRect(0, 0, w, h)
    let gap = (timestamp - start) / duration;
    path.map((c) => {
        return util.line({
            ...c,
            t: (c.t + gap) % 1
        });
    }).forEach((c) => {
        util.tadpole(c, ctx);
    });
}

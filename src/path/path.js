/**
  * @description 给出path信息 自动添加动画
  */
//暂时先支持这些命令 后面再添加
const INSTRUCTS = ['M', 'm', 'L', 'l', 'V', 'v', 'H', 'h', 'C', 'c', 'Q', 'q', 'Z', 'z', 'S', 's'];
const RELATIVE_INSTRUCTS = ['m', 'l', 'v', 'h', 'c', 'q', 'z', 's'];
const STEP = 0.1;
class Path {
    /**
      * @params
      *     option
      *       path 路径信息
      *       speed: 动画加速度
      *       duration 动画时长
      */
    constructor (option) {
        //路径信息
        this.path = option.path;
        console.log(this.path);
        //暂时先不考虑速度 简单的每帧绘制
        //当前点
        this.position = {
            //起点 {x, y}
            start: null,
            //终点 {x, y}
            end: null
        };
        this.option = option;
        //记录最后一个贝塞尔曲线的控制点 方便 对称贝塞尔曲线使用
        this.lastControlPoint = null;
        //设置宽 高
        this.width = option.canvas.width = option.width;
        this.height = option.canvas.height = option.height;
        //绘制的上下文
        this.ctx = option.canvas.getContext('2d');
        if (option.scale) {
            this.ctx.scale(...option.scale); 
        }
        if (option.strokeStyle instanceof Array) {
            this._index = 0;  
        }
        Object.keys(option.style).forEach(item => {
            this.ctx[item] = option.style[item]; 
        });
        //解析指令
        this.analyseInstruct();
        //执行指令
        //this.run();
    }
    repeat () {
        this.position = {
            start: null,
            end: null 
        }; 
        const update = () => {
            this.run().then(() => {
                setTimeout(() => {
                    update();
                }, 1 * 1000);         
            });
        };
        update();
    }
    //按指令动画绘制一条线 并提供在结束的时候 回调处理
    render (instruct, callback) {
        let body = instruct.body;
        if (instruct.action == 'z') {
            instruct.action = 'Z'
        }
        if (this[instruct.action]) {
            this[instruct.action](instruct, callback);
        }
    }
    //将路径信息解析为单条指令
    analyseInstruct (path) {
        let reg = new RegExp('(' + INSTRUCTS.join('|') + ')' + '[^' + INSTRUCTS.join('')+ ']*', 'g');
        let item;
        let instructs = [];
        while ((item = reg.exec(this.path)) != null) {
            //获取所有的数字
            let numReg = /-?\d+\.?\d*/g;
            let num;
            let instructBody = [];
            while ( (num = numReg.exec(item[0])) != null) {
                instructBody.push(parseFloat(num[0]));
            }
            instructs.push({
                action: item[0][0],
                body: instructBody
            });
        }
        this.instructs = instructs;
    }
    clear () {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
    run () {
        let promise = new Promise((resolve, reject) => {
            //每条指令单独解析
            let i = 0;
            const deal = () => {
                if (i >= this.instructs.length) {
                    //循环结束
                    resolve(this);
                    return;
                }
                //预处理 回调
                this.render(this.preDeal(this.instructs[i]), () => {
                    i ++;
                    deal();
                });
            };
            deal();
        });
        return promise;
    }
    //预处理小写的相对指令 为绝对路径
    preDeal (instruct) {
        let end = this.position.end
        let body = instruct.body;
        let result = {};
        switch (instruct.action) {
            case "m":
                result = {
                    action: 'M',
                    body: [body[0] + end.x, body[1] + end.y]
                };
                break;
            case "l":
                result = {
                    action: 'L',
                    body: [body[0] + end.x, body[1] + end.y]
                };
                break;
            case "v":
                result = {
                    action: 'V',
                    body: [body[0] + end.y]
                };
                break;
            case "h":
                result = {
                    action: 'H',
                    body: [body[0] + end.x]
                };
                break;
            case "c":
                result = {
                    action: 'C',
                    body: [
                        body[0] + end.x, body[1] + end.y,
                        body[2] + end.x, body[3] + end.y,
                        body[4] + end.x, body[5] + end.y,
                    ]
                };
                break;
            case "s":
                result = {
                    action: 'S',
                    body: [
                        body[0] + end.x, body[1] + end.y,
                        body[2] + end.x, body[3] + end.y,
                    ]
                };
                break;
            case "q":
                result = {
                    action: 'Q',
                    body: [
                        body[0] + end.x, body[1] + end.y,
                        body[2] + end.x, body[3] + end.y,
                    ]
                };
                break;
            default:
                result = instruct;
        }
        return result;
    }
    //移动指令
    M (instruct, callback) {
        let body = instruct.body;
        //start 没有的话 更新start
        if (!this.position.start) {
            this.position.start = {
                x: body[0],
                y: body[1]
            };
        }
        //更新end
        this.position.end = {
            x: body[0],
            y: body[1]
        };
        this.ctx.beginPath();
        this.ctx.moveTo(this.position.end.x, this.position.end.y);
        if (this.option.strokeStyle instanceof Array) {
            this.ctx.strokeStyle = this.option.strokeStyle[this._index];
            this._index = (this._index + 1) % this.option.strokeStyle.length;
        }
        callback && callback();
    }
    //直线
    L (instruct, callback) {
        let body = instruct.body;
        //this.ctx.lineTo(this.position.end.x, this.position.y);
        this.lineTo({
            start: this.position.end,
            end: {
                x: body[0],
                y: body[1]
            }
        }, () => {
            //更新end
            this.position.end = {
                x: body[0],
                y: body[1]
            };
            callback && callback();
        });
    }
    //垂直
    V (instruct, callback) {
        let body = instruct.body;
        //更新end
        //this.position.end.y = body[0]
        //this.ctx.lineTo(this.position.end.x, this.position.y);
        this.lineTo({
            start: this.position.end,
            end: {
                x: this.position.end.x,
                y: body[0]
            }
        }, () => {
            this.position.end.y = body[0];
            callback && callback();
        });
    }
    //水平
    H (instruct) {
        let body = instruct.body;
        this.lineTo({
            start: this.position.end,
            end: {
                x: body[0],
                y: this.position.end.y
            }
        }, () => {
            this.position.end.x = body[0];
            callback && callback();
        });
    }
    //三次贝塞尔曲线
    C (instruct, callback) {
        let body = instruct.body;
        this.bezierCurveTo({
            p0: this.position.end,
            p1: {x: body[0], y: body[1]},
            p2: {x: body[2], y: body[3]},
            p3: {x: body[4], y: body[5]},
        }, () => {
            this.position.end = {
                x: instruct.body[4],
                y: instruct.body[5],
            };
            this.lastControlPoint = {
                x: body[2], 
                y: body[3]
            };
            callback && callback();
        });
    }
    S (instruct, callback) {
        let body = instruct.body;
        let p1 = {
            x: 2 * this.position.end.x - this.lastControlPoint.x,
            y: 2 * this.position.end.y - this.lastControlPoint.y,
        };
        this.bezierCurveTo({
            p0: this.position.end,
            p1: p1,
            p2: {x: body[0], y: body[1]},
            p3: {x: body[2], y: body[3]},
        }, () => {
            this.position.end = {
                x: instruct.body[2],
                y: instruct.body[3],
            };
            this.lastControlPoint = {
                x: body[0], 
                y: body[1]
            };
            callback && callback();
        });
    }
    // 二次贝塞尔曲线
    Q (instruct, callback) {
        let body = instruct.body;
        this.bezierCurveTo({
            p0: this.position.end,
            p1: {x: body[0], y: body[1]},
            p2: {x: body[2], y: body[3]}
        }, () => {
            this.position.end = {
                x: instruct.body[2],
                y: instruct.body[3],
            };
            this.lastControlPoint = {
                x: body[0], 
                y: body[1]
            };
            callback && callback();
        });
    }
    //封闭指令
    Z (instructor, callback) {
        this.position.start = {
            ...this.position.end
        };
        this.ctx.moveTo(this.position.end.x, this.position.end.y);
        callback && callback();
    }
    //插值
    interpolate (start, end) {
        return function (t) {
            return (1 - t) * start + t * end;
        }
    }
    animate (points, callback) {
        let i = 0;
        let n = this.option.n || 1;
        const draw = () => {
            if (i >= points.length ) {
                callback && callback();
                return;
            }
            requestAnimationFrame(draw);
            if (i === 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(points[i].x, points[i].y);
                i ++;
            } else {
                //每帧画n个点
                let j = i;
                for (;j < Math.min(i + n, points.length); j ++) {
                    this.ctx.lineTo(points[j].x, points[j].y);
                    this.ctx.stroke();
                    this.ctx.beginPath();
                    this.ctx.moveTo(points[j].x, points[j].y);
                }
                i += n;
            }
        };
        draw();
    }
    //二次贝塞尔曲线
    quadraticCurveTo () {
        let step = option.step || STEP;
        let {p0, p1, p2} = {...option};
		let points = [];
        //计算公式
        // y(t) = (1 - t)^2 * p0 + 2 * t * (1 - t) * p1 + t ^ 2 * p2
        let t = 0;
        while (t <= 1 ) {
            console.log(t);
            points.push({
                x: Math.pow(1 - t, 2) * p0.x + 2 * t * (1 - t) * p1.x + Math.pow(t, 2) * p2.x,
                y: Math.pow(1 - t, 2) * p0.y + 2 * t * (1 - t) * p1.y + Math.pow(t, 2) * p2.y
            });
            t += step;
        }
        this.animate(points, callback);
    }
    /**
      * @description  三次贝塞尔曲线
      * @params option
      *     p0, p1, p2, p3, step
      */
    bezierCurveTo (option, callback) {
        let step = option.step || STEP;
        let {p0, p1, p2, p3} = {...option};
		let points = [];
        //计算公式
        // y(t) = p0 * (1 -t ) ^3 + 3 * p1 * t * (1 - t) ^ 2 + 3 * p2 * t ^ 2 * (1 - t) + p3 * t ^ 3  t[0, 1]
        let t = 0;
        while (t <=1 ) {
            points.push({
                x: p0.x * Math.pow(1 - t, 3) + 3 * p1.x * t * Math.pow(1 - t, 2) + 3 * p2.x * Math.pow(t , 2) * (1 - t) + p3.x * Math.pow(t , 3),
                y: p0.y * Math.pow(1 - t, 3) + 3 * p1.y * t * Math.pow(1 - t, 2) + 3 * p2.y * Math.pow(t , 2) * (1 - t) + p3.y * Math.pow(t , 3),
            });
            t += step;
        }
        this.animate(points, callback);
    }
    //动画绘制直线 option start, end, step
    lineTo (option, callback) {
		let params = {
			step: STEP,
			... option
		};
		let points = [];
		let start = params.start;
		let end = params.end;
		let t = 0;
		//步长
		let step = params.step;
		if (start.x == end.x) {
			//竖直的特殊情况处理
			let y = this.interpolate(start.y, end.y);
			while (t <= 1) {
				points.push({x: start.x, y: y(t)});
				t += step;
			}
            this.animate(points, callback);
            return;
		}
		//斜率
		let k = (end.y - start.y) / (end.x - start.x);
		// y = k (x - x0) + y0
		//差值 (1-t) * x0 + x1 * t 一次线性插值
		let x = this.interpolate(start.x, end.x);
		while (t <= 1) {
			let tmpX = x(t);
			let tmpY = k * (tmpX - start.x) + start.y;
			points.push({x: tmpX, y: tmpY});
			t += step;
		}
        this.animate(points, callback);
    }
}
export default Path;

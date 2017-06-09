const COLOR = ['#f6e81a', '#1444e3'];
const util = {
    /**
      * @description 绘制一个蝌蚪
      * option
      *   x, y, r 蝌蚪的头部圆心所在
      *   l  蝌蚪体长
      *   radius 蝌蚪头部和身体衔接的角度
      *   type  颜色类型
      * ctx 绘制上下文
      */
    tadpole: function (option, ctx) {
        let params = {
            x: 0,
            y: 0,
            r: 3,
            l: 10,
            rotate: 0,
            type: 1,
            ...option
        };
        params.l = option.l ? option.l : params.r * 3.5;
        let head = {
            x: 0,
            y: 0
        };
        let end = {
            x: 0,
            y: params.l
        };
        ctx.save();
        ctx.translate(params.x, params.y + params.l);
        ctx.rotate(params.rotate);
        ctx.beginPath();
        ctx.moveTo(end.x, end.y);
        //绘制尾巴
        ctx.arc(end.x, end.y, params.r / 30, 0, 2 * Math.PI, true); // 绘制
        //移到头部
        ctx.moveTo(end.x, end.y);
        //绘制头部
        ctx.arc(head.x, head.y, params.r, 60 / 180 * Math.PI, 120 / 180 * Math.PI, true); // 绘制
        ctx.fillStyle = COLOR[params.type];
        ctx.fill();
        ctx.restore();
    },
    //随机获取 正1 或者 负1
    random: function () {
        return Math.random() > 0.5 ? 1 : -1;
    },
    /**
      * @description 计算 start, end 在 t 处的坐标
      *  option
      *   start,
      *   end
      *   t,
      * ...
      */
    line: function (option) {
        let start = option.start,
            end = option.end,
            t = option.t;
        if (Math.floor(start.x) === Math.floor(end.x)) {
            //竖直方向 处理特殊斜率问题
            return {
                x: start.x,
                y: (1 - t) * start.y + t * end.y
            };
        }
		let k = (end.y - start.y) / (end.x - start.x);
		// y = k (x - x0) + y0
		//差值 (1-t) * x0 + x1 * t 一次线性插值
        let x = (1 - t) * start.x + end.x * t;
        let radius = Math.atan(k);
        let dx = end.x - start.x;
        let dy = end.y - start.y;
        //-- 这块没有想好怎么具体计算 下面这部分是根据实际情况推出来的 需要更明确的数据解释
        let rotate = radius + Math.PI / 2;
        if ((dx < 0 && dy < 0) || (dx < 0 && dy > 0)) {
            rotate += Math.PI;
        }
        return {
            x: x,
            y: k * (x - start.x) + start.y,
            rotate: rotate,
            type: option.type
        };
    }
};
export default util;

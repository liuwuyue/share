import React from 'react';
import './mask.less';
class Mask extends React.Component {
    render () {
        let option = this.props.option;
        let style = {
            marginLeft: option.width / 2 * -1,
            marginTop: option.height / 2 * -1
        };
        return (
            <svg style={style} className="mask" height={option.height} width={option.width}>
                <defs>
                    <radialGradient id="RadialGradient1">
                        <stop offset="0%" stopColor="rgba(255, 255, 255, 0)"/>
                        <stop offset="90%" stopColor="rgba(255, 255, 255, 0)"/>
                        <stop offset="94%" stopColor="rgba(255, 255, 255, 1)"/>
                        <stop offset="100%" stopColor="rgba(255, 255, 255, 0)"/>
                    </radialGradient>
                </defs>
                <g>
                    <circle cx={option.width / 2} cy={option.height / 2 + 10} r={option.width  / 2}  fill="url(#RadialGradient1)"></circle>
                </g>
            </svg>
        );
    }
}
export default Mask;

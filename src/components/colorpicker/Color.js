import { h, Component } from 'preact';
import style from './style';

const hsla = (index, a, size) => `hsla(${index * (360 / size)} ,100%, 50%, ${a})`

export default class Color extends Component {
    render({index, angle, size}) {
        let componentStyle = `transform: translateY(-50%) rotate(${angle}deg); `
        componentStyle += `background-image: linear-gradient(180deg, ${hsla(index, 0, size)}, ${hsla(index, 1, size)} 50%, ${hsla(index, 0, size)});`

        return <div class={style['spectrum-circle__color']} style={componentStyle}></div>
    }
}

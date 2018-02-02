import { h, Component } from 'preact';
import style from './style';

const stops = (new Array(8)).fill(0)

export default class SpectrumDecoration extends Component {

    componentWillMount () {
        this.setState({
            stops
        })
    }

    render(props, {stops}) {
        return <div class={style['spectrum-selector__decoration']} >
                {stops.map((angle, index, stops) => {

                    let className = 'spectrum-selector__decoration--mark'

                    if (index % 4 === 0) {
                        className = 'spectrum-selector__decoration--primary';
                    } else if (index % 2 === 0) {
                        className = 'spectrum-selector__decoration--secondary';
                    }

                    const rotate = index * (45/2)
                    const decorStyle = `transform: translate(-50%, -50%) rotate(${rotate}deg);`

                    return <div class={style[className]} style={decorStyle}></div>
                    }
                )}
        </div>
    }
}

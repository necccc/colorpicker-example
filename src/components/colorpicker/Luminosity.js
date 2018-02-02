import { h, Component } from 'preact';
import style from './style';

import { getVerticalSliderLevel } from './tools'

export default class Luminosity extends Component {

    componentWillMount () {
        this.setState({
            luminosity: 100
        })
    }

    updateLuminosity(event, callback) {
        const { height } = event.currentTarget.getBoundingClientRect()

        getVerticalSliderLevel(event, (value) => {
            const luminosity = 100 - Math.floor((value / height) * 100)
            this.props.onChange(luminosity)
            callback(value)
        });
    }

    selectStart (e) {
        e.preventDefault()
        this.setState({
            selecting: true
        })
    }

    selecting(event) {
        event.preventDefault()

        if (!this.state.selecting) return;

        this.updateLuminosity(event, (luminosity) => {
            this.setState({
                luminosity
            })
        })
    }

    clicked(event) {
        event.preventDefault()
        this.updateLuminosity(event, (luminosity) => {
            this.setState({
                luminosity
            })
        })
    }

    selectEnd(e) {
        e.preventDefault()
        this.setState({
            selecting: false
        })
    }

    render({hue}, {luminosity}) {
        const gradient = `background-image: linear-gradient(hsl(${hue}, 100%, 100%), hsl(${hue}, 100%, 0%));`
        const level = `transform: translateY(${luminosity}px);`
        return <div
                    class={style['spectrum-selector__luminosity']}
                    style={gradient}
                    onClick={e => this.clicked(e)}
                    onMouseDown={e => this.selectStart(e)}
                    onTouchStart={e => this.selectStart(e)}
                    onMouseMove={e => this.selecting(e)}
                    onTouchMove={e => this.selecting(e)}
                    onMouseUp={e => this.selectEnd(e)}
                    onTouchEnd={e => this.selectEnd(e)}
                >
                    <div class={style['spectrum-selector__luminosity-level']} style={level}></div>
                </div>
    }
}

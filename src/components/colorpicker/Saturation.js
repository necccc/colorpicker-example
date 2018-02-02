import { h, Component } from 'preact';
import style from './style';

import { getVerticalSliderLevel } from './tools'

export default class Saturation extends Component {

    componentWillMount () {
        this.setState({
            saturation: 0
        })
    }

    updateSaturation (event, callback) {
        const { height } = event.currentTarget.getBoundingClientRect()

        getVerticalSliderLevel(event, (value) => {
            const saturation = 100 - Math.floor((value / height) * 100)
            this.props.onChange(saturation)
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

        this.updateSaturation(event, (saturation) => {
            this.setState({
                saturation
            })
        })
    }

    clicked(event) {
        event.preventDefault()
        this.updateSaturation(event, (saturation) => {
            this.setState({
                saturation
            })
        })
    }

    selectEnd(e) {
        e.preventDefault()
        this.setState({
            selecting: false
        })
    }

    render({hue}, {saturation}) {
        const gradient = `background-image: linear-gradient(hsl(${hue}, 100%, 50%), hsl(${hue}, 0%, 50%));`
        const level = `transform: translateY(${saturation}px);`
        return <div
                    class={style['spectrum-selector__saturation']}
                    style={gradient}
                    onClick={e => this.clicked(e)}
                    onMouseDown={e => this.selectStart(e)}
                    onTouchStart={e => this.selectStart(e)}
                    onMouseMove={e => this.selecting(e)}
                    onTouchMove={e => this.selecting(e)}
                    onMouseUp={e => this.selectEnd(e)}
                    onTouchEnd={e => this.selectEnd(e)}
                >
                    <div class={style['spectrum-selector__saturation-level']} style={level}></div>
                </div>
    }
}

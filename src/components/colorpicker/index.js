import { h, Component } from 'preact';
import style from './style';
import { clearTimeout } from 'timers';

import Spectrum from './Spectrum'
import Saturation from './Saturation'
import Luminosity from './Luminosity'

const colors = (new Array(64)).fill(0)

export default class ColorPicker extends Component {

    componentWillMount() {
        this.setState({
            hue: -90,
            saturation: 100,
            luminosity: 50
        })
    }

    updateColor () {
        const { hue, saturation, luminosity } = this.state
        this.props.onChange(`hsl(${hue}, ${saturation}%, ${luminosity}%)`)
    }

    onHueChange(hue) {
        this.setState({
            hue
        })
        this.updateColor()
    }

    onSaturationChange(saturation) {
        this.setState({
            saturation
        })
        this.updateColor()
    }

    onLuminosityChange(luminosity) {
        this.setState({
            luminosity
        })
        this.updateColor()
    }

    render(props, {hue}) {
        return (
            <div class={style['spectrum-selector']}>
                <Spectrum onChange={e => this.onHueChange(e)} />
                <Saturation hue={hue} onChange={e => this.onSaturationChange(e)} />
                <Luminosity hue={hue} onChange={e => this.onLuminosityChange(e)} />
            </div>
        );
    }
}

import { h, Component } from 'preact';
import style from './style';
import { getTouchAngle, getHue } from './tools'
import Color from './Color'
import SpectrumDecoration from './SpectrumDecoration'

const colors = (new Array(64)).fill(0)

export default class Spectrum extends Component {

    componentWillMount () {
        const angles = colors.map((a, index) => {
            return index * (360 / colors.length)
        })

        this.setState({
            startAngle: 0,
            setAngle: 0,
            angles
        })
    }

    updateAngle(event, callback) {
        getTouchAngle(event, (touchAngle) => {
            const { grabAngle, setAngle } = this.state
            const angleDiff = touchAngle - grabAngle
            const angle = -1 * (setAngle + angleDiff)

            this.props.onChange(getHue(angle))

            callback(angle)
        })
    }

    selecting (event) {
        event.preventDefault()

        if (!this.state.selecting) return

        this.updateAngle(event, (angle) => {
            this.setState({
                angle: angle
            })
            this.container.style.setProperty(`--wheelRotation`, (angle) + 'deg')
        })
    }

    selectStart (e) {
        e.preventDefault()
        getTouchAngle(e, (grabAngle) => {
            this.setState({
                grabAngle,
                selecting: true
            })
        })
    }

    selectEnd (e) {
        e.preventDefault()
        this.updateAngle(event, (angle) => {
            const setAngle = -1 * angle
            this.setState({
                setAngle,
                selecting: false
            })
        })
    }

    render(props, {angles}) {
        return <div
            ref={(element) => { this.container = element; }}
            class={style['spectrum-container']}
            onMouseDown={e => this.selectStart(e)}
            onTouchStart={e => this.selectStart(e)}
            onMouseMove={e => this.selecting(e)}
            onTouchMove={e => this.selecting(e)}
            onMouseUp={e => this.selectEnd(e)}
            onTouchEnd={e => this.selectEnd(e)}
        >
            <div class={style['spectrum-selector__color']}></div>
            <div class={style['spectrum-circle']} >
                {angles.map((angle, index, angles) =>
                    <Color angle={angle} index={index} size={angles.length} />
                )}
            </div>
            <SpectrumDecoration />
        </div>

    }
}

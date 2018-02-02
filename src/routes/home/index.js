import { h, Component } from 'preact';
import { connect } from 'preact-redux';
import style from './style';
import * as actions from '../../actions'
import reduce from '../../reducers';
import ColorPicker from '../../components/colorpicker';

@connect(reduce, actions)
export default class Home extends Component {

    setOuterColor = (data) => {
        this.props.setOuterColor(data)
    };

    setInnerColor = (data) => {
        this.props.setInnerColor(data)
    };

    render() {
        return (
            <div class={style.home}>

                <ColorPicker text="Outer color" onChange={this.setOuterColor} />

            </div>
        );
    }
}

import { h, Component } from 'preact';
import { Link } from 'preact-router/match';
import style from './style';

import { connect } from 'preact-redux';
import * as actions from '../../actions'
import reduce from '../../reducers';


const mapStateToProps = (state, ownProps) => {

    const bgColor = state.outerColor || ownProps.bgColor;

    return {
        bgColor
    }
}

class BaseHeader extends Component {
    render() {
        const headerStyle = `background-color: ${this.props.bgColor}`

        return (
            <header class={style.header} style={headerStyle}>
                <h1>colorpicker</h1>
                <nav>
                </nav>
            </header>
        );
    }
}

const Header = connect(mapStateToProps)(BaseHeader)

export default Header
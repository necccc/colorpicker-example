import {
    SET_INNER_COLOR,
    SET_OUTER_COLOR
} from './actions'


const initialState = {
    outerColor: '',
    innerColor: ''
}

const app = function(state = initialState, action) {
    switch (action.type) {

        case SET_INNER_COLOR:
            return Object.assign({}, state, {
                innerColor: action.color
            })

        case SET_OUTER_COLOR:
            return Object.assign({}, state, {
                outerColor: action.color
            })

        default:
            return state
    }
}

export default app
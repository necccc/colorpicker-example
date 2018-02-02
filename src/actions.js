export const SET_OUTER_COLOR = 'SET_OUTER_COLOR';

export const SET_INNER_COLOR = 'SET_INNER_COLOR';


export function setInnerColor(color) {
    return {
        type: SET_INNER_COLOR,
        color
    }
}

export function setOuterColor(color) {
    return {
        type: SET_OUTER_COLOR,
        color
    }
}
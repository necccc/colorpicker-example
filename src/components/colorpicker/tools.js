/**
 *
 *
 * @param {DOMEvent} event
 * @returns
 */
export const getVerticalSliderLevel = (event, callback) => {
    const { currentTarget, pageX, pageY } = event
    const { top, left, width, height } = currentTarget.getBoundingClientRect()

    const getValue = ({top, left, width, height, pageX, pageY}) => {
        const value = pageY - top;

        if (value < 0) return 0;

        if (pageY > top + height) return height;
        return value
    }

    if (isTouchEvent(event)) {

        for (let touch of event.changedTouches) {
            const {pageX, pageY} = touch;
            let value = getValue({
                top, left, width, height, pageX, pageY
            })

            callback(value)
        }

    } else {
        const value = getValue({top, left, width, height, pageX, pageY})
        callback(value)
    }
}

const isTouchEvent = function (event) {
    const { type } = event
    return type === 'touchmove' || type === 'touchstart' || type === 'touchend'
}

/**
 *
 * 
 * @param {any} radians 
 * @returns
 */
export const deg = function(radians) {
    return radians * 180 / Math.PI;
}

/**
 *
 * 
 * @param {Number} angle
 * @returns {Number}
 */
export const getHue = function (angle) {
    let hue = 360 + (angle + 90)

    if (hue > 360) {
        hue = 360 - hue
    }
    if (hue < 0) {
        hue = -1 * hue
    }
    hue = 360 - hue

    return hue
}

/**
 *
 * 
 * @param {Object} {left, top, width, height, pageX, pageY}
 * @returns {Number}
 */
export const calculateTouchAngle = function ({left, top, width, height, pageX, pageY}) {
    const X = pageX - left
    const Y = pageY - top
    const centerX = Math.round(left + width / 2)
    const centerY = Math.round(top + height / 2)
    const A = pageX - centerX;
    const B = centerY - pageY
    const C = Math.sqrt((Math.pow(A, 2) + Math.pow(B, 2)))

    let angle = 0

    if (A > 0) {
        angle = deg(Math.asin(B * 1/C))
    } else {
        angle = 180 - deg(Math.acos(A * -1/C))
    }

    if (B < 0 && A < 0) {
        angle = 360 - angle
    } else if (B < 0) {
        angle = 360 + angle
    }

    return angle
}

/**
 *
 * 
 * @param {DOMEvent} event
 * @param {Function} callback
 */
export const getTouchAngle = function (event, callback) {
    const { currentTarget, pageX, pageY } = event
    const { top, left, width, height } = currentTarget.getBoundingClientRect()

    if (isTouchEvent(event)) {
        for (let touch of event.changedTouches) {
            const {pageX, pageY} = touch;
            let angle = calculateTouchAngle({
                top, left, width, height, pageX, pageY
            })

            callback(angle)
        }
    } else {
        let angle = calculateTouchAngle({
            top, left, width, height, pageX, pageY
        })

        callback(angle)
    }
}

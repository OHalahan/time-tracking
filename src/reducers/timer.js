import moment from 'moment';

import { TOGGLE_TIMER } from '../constants';

const toggleTimer = (state) => {
    if (!state.running) {
        state.start = moment(new Date());
        state.running = true;
    } else {
        state.stop = moment(new Date());
        state.running = false;
    }
    return state;
}

const timer = (state, action) => {
    if (!state) {
        state = {
            start: null,
            stop: null,
            running: false
        }
    }
    let newTimer = null;
    switch (action.type) {
        case TOGGLE_TIMER:
            newTimer = toggleTimer(state);
            return newTimer;
        default:
            return state;
    }
}

export default timer;
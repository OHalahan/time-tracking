import { bake_cookie, read_cookie } from 'sfcookies';
import moment from 'moment';

import { START_TIMER, STOP_TIMER } from '../constants';

const startTimer = (state) => {
    return {
        ...state,
        start: moment(new Date()),
        running: true
    }
}

const stopTimer = (state) => {
    return {
        ...state,
        stop: moment(new Date()),
        running: false
    }
}

const timer = (state, action) => {
    let newTimer = null;

    state = read_cookie('taskTimer');

    if (!state || Object.keys(read_cookie('taskTimer')).length === 0) {
        state = {
            start: null,
            stop: null,
            running: false
        }
    }

    switch (action.type) {
        case START_TIMER:
            newTimer = startTimer(state);
            bake_cookie('taskTimer', newTimer);
            return newTimer;
        case STOP_TIMER:
            newTimer = stopTimer(state);
            bake_cookie('taskTimer', newTimer);
            return newTimer;
        default:
            return state;
    }
}

export default timer;
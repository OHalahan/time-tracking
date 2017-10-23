import moment from 'moment';

import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies';

import { START_TIMER, STOP_TIMER } from '../constants';

const startTimer = (state) => {
    state.start = moment(new Date());
    state.running = true;
    return state;
}

const stopTimer = (state) => {
    state.stop = moment(new Date());
    state.running = false;
    return state;
}

const timer = (state, action) => {
    let newTimer = null;
    delete_cookie('timer');
    state = read_cookie('taskTimer');
    if (!(state)) {
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
import { ADD_EVENT, DELETE_EVENT } from '../constants';
import moment from 'moment';

import { bake_cookie, read_cookie } from 'sfcookies';

const SECONDS_IN_HOUR = 3600;

const handleInterval = (intervals, action, adding) => {
    let first = moment(action.start).toObject().hours,
        // how many second left to be spent in this hour
        firstLeftSeconds = (SECONDS_IN_HOUR - ((moment(action.start).toObject().minutes * 60)) + moment(action.start).toObject().seconds),
        last = moment(action.stop).toObject().hours,
        spentSeconds = moment.duration(action.spent).asSeconds();

    if (first === last) {
        adding ? intervals[first] += spentSeconds : intervals[first] -= spentSeconds;
        return intervals;
    }

    // if there are furter hours then seconds which were left in this hour were 100% spent
    adding ? intervals[first] += firstLeftSeconds : intervals[first] -= firstLeftSeconds;
    spentSeconds -= firstLeftSeconds;

    for (let i = first + 1; i <= last; i++) {
        let hasHour = !!Math.floor(spentSeconds / 3600);
        if (hasHour) {
            adding ? intervals[i] += SECONDS_IN_HOUR : intervals[i] -= SECONDS_IN_HOUR;
            spentSeconds -= SECONDS_IN_HOUR;
        } else {
            adding ? intervals[i] += spentSeconds : intervals[i] -= spentSeconds;
        }
    }

    return intervals;
}

const intervals = (state = [], action) => {
    let intervals = null;

    state = read_cookie('intervals');
    if (!state.length) {
        state = new Array(24).fill(0);
    }

    switch (action.type) {
        case ADD_EVENT:
            intervals = handleInterval(state, action, true);
            bake_cookie('intervals', intervals);
            return intervals;
        case DELETE_EVENT:
            intervals = handleInterval(state, action.event, false);
            bake_cookie('intervals', intervals);
            return intervals;
        default:
            return state;
    }
}

export default intervals;
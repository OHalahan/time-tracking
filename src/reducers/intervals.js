import { ADD_EVENT, DELETE_EVENT } from '../constants';
import moment from 'moment';

const SECONDS_IN_HOUR = 3600;

const addInterval = (intervals, action) => {
    let first = action.start.toObject().hours,
        firstLeftSeconds = (SECONDS_IN_HOUR - ((action.start.toObject().minutes * 60)) + action.start.toObject().seconds),
        last = action.stop.toObject().hours,
        spentSeconds = moment.duration(action.spent).asSeconds();

    if (first === last) {
        intervals[first] += spentSeconds;
        return intervals;
    }

    intervals[first] += firstLeftSeconds;
    spentSeconds -= firstLeftSeconds;
    for (let i = first + 1; i <= last; i++) {
        let hasHour = !!Math.floor(spentSeconds / 3600);
        if (hasHour) {
            intervals[i] += SECONDS_IN_HOUR;
            spentSeconds -= SECONDS_IN_HOUR;
        } else {
            intervals[i] += spentSeconds;
        }
    }

    return intervals;
}

const deleteInterval = (intervals, action) => {
    let first = action.start.toObject().hours,
        firstLeftSeconds = (SECONDS_IN_HOUR - (action.start.toObject().minutes * 60)) + action.start.toObject().seconds,
        last = action.stop.toObject().hours,
        spentSeconds = moment.duration(action.spent).asSeconds();

    if (first === last) {
        intervals[first] -= spentSeconds;
        return intervals;
    }

    intervals[first] -= firstLeftSeconds;
    spentSeconds -= firstLeftSeconds;

    for (let i = first + 1; i <= last; i++) {
        let hasHour = !!Math.floor(spentSeconds / 3600);
        if (hasHour) {
            intervals[i] -= SECONDS_IN_HOUR;
            spentSeconds -= SECONDS_IN_HOUR;
        } else {
            intervals[i] -= spentSeconds;
        }
    }

    return intervals;
}

const intervals = (state = new Array(24).fill(0), action) => {
    let intervals = null;
    switch (action.type) {
        case ADD_EVENT:
            intervals = addInterval(state, action);
            return intervals;
        case DELETE_EVENT:
            intervals = deleteInterval(state, action.event);
            return intervals;
        default:
            return state;
    }
}

export default intervals;
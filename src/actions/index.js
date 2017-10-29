import {
    ADD_EVENT,
    DELETE_EVENT,
    START_TIMER,
    STOP_TIMER
} from '../constants';

export const addEvent = (name, start, stop, spent) => {
    return {
        type: ADD_EVENT,
        name,
        start,
        stop,
        spent
    }
}

export const deleteEvent = (event) => {
    return {
        type: DELETE_EVENT,
        event
    };
}

export const startTimer = () => {
    return {
        type: START_TIMER
    };
}

export const stopTimer = () => {
    return {
        type: STOP_TIMER
    };
}
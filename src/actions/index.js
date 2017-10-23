import {
    ADD_EVENT,
    DELETE_EVENT,
    START_TIMER,
    STOP_TIMER
} from '../constants';

export const addEvent = (name, start, stop, spent) => {
    const action = {
        type: ADD_EVENT,
        name,
        start,
        stop,
        spent
    }
    return action;
}

export const deleteEvent = (event) => {
    const action = {
        type: DELETE_EVENT,
        event
    }
    return action;
}

export const startTimer = () => {
    const action = {
        type: START_TIMER
    }
    return action;
}

export const stopTimer = () => {
    const action = {
        type: STOP_TIMER
    }
    return action;
}
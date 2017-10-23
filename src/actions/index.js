import {
    ADD_EVENT,
    DELETE_EVENT,
    TOGGLE_TIMER
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

export const toggleTimer = () => {
    const action = {
        type: TOGGLE_TIMER
    }
    return action;
}
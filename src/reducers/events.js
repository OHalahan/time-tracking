import {
    ADD_EVENT,
    DELETE_EVENT,
    SAVE_EVENT_NAME
} from '../constants';

import { bake_cookie, read_cookie } from 'sfcookies';

const event = (action, id) => {
    return {
        name: action.name,
        start: action.start,
        stop: action.stop,
        spent: action.spent,
        id: ++id
    }
}

const removeById = (state = [], id) => {
    return state.filter(event => event.id !== id);
}

const saveNameById = (state = [], id, name) => {
    return state.map(event => {
        if (event.id === id) {
            event.name = name;
        }
        return event;
    });
}

const events = (state = [], action) => {
    let events = null;
    state = read_cookie('events');
    switch (action.type) {
        case ADD_EVENT:
            let lastElem = state[state.length - 1];
            events = [...state, event(action, lastElem ? lastElem.id : 0)];
            bake_cookie('events', events);
            return events;
        case DELETE_EVENT:
            events = removeById(state, action.event.id);
            bake_cookie('events', events);
            return events;
        case SAVE_EVENT_NAME:
            events = saveNameById(state, action.id, action.name);
            bake_cookie('events', events);
            return events;
        default:
            return state;
    }
}

export default events;
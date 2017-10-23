import { ADD_EVENT, DELETE_EVENT } from '../constants';

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

const events = (state = [], action) => {
    let events = null;
    state = read_cookie('events');
    switch (action.type) {
        case ADD_EVENT:
            events = [...state, event(action, state.length)];
            bake_cookie('events', events);
            return events;
        case DELETE_EVENT:
            events = removeById(state, action.event.id);
            bake_cookie('events', events);            
            return events;
        default:
            return state;
    }
}

export default events;
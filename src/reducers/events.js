import { ADD_EVENT, DELETE_EVENT } from '../constants';

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
    switch (action.type) {
        case ADD_EVENT:
            events = [...state, event(action, state.length)];
            return events;
        case DELETE_EVENT:
            events = removeById(state, action.event.id);
            return events;
        default:
            return state;
    }
}

export default events;
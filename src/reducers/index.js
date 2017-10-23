import { combineReducers } from 'redux';
import events from './events';
import timer from './timer';
import intervals from './intervals';

export default combineReducers({
    events,
    timer,
    intervals
})
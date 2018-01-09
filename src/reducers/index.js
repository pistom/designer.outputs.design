import { combineReducers } from 'redux';
import projectData from './projectData.js';
import projectMessages from './projectMessages.js';

export default combineReducers({
    projectData,
    projectMessages
});

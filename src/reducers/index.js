import {combineReducers} from 'redux';
import projectData from './projectData.js';
import projectMessages from './projectMessages.js';
import appState from './appState.js';

export default combineReducers({
  projectData,
  projectMessages,
  appState
});

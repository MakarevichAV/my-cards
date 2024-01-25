import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer';
import authReducer from './authReducer';
import directoryReducer from './directoryReducer';
import setReducer from './setReducer'

const rootReducer = combineReducers({
  sample: sampleReducer,
  auth: authReducer,
  directory: directoryReducer,
  set: setReducer,
});

export default rootReducer;
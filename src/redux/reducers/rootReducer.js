import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer';
import authReducer from './authReducer';
import directoryReducer from './directoryReducer';
import setReducer from './setReducer'
import cardReducer from './cardReducer';

const rootReducer = combineReducers({
  sample: sampleReducer,
  auth: authReducer,
  directory: directoryReducer,
  set: setReducer,
  card: cardReducer,
});

export default rootReducer;
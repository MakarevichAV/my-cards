import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer';
import authReducer from './authReducer';
import directoryReducer from './directoryReducer';

const rootReducer = combineReducers({
  sample: sampleReducer,
  auth: authReducer,
  directory: directoryReducer,
  // Добавьте другие редюсеры, если необходимо
});

export default rootReducer;
import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  sample: sampleReducer,
  auth: authReducer,
  // Добавьте другие редюсеры, если необходимо
});

export default rootReducer;
import { combineReducers } from 'redux';
import sampleReducer from './sampleReducer';

const rootReducer = combineReducers({
  sample: sampleReducer,
  // Добавьте другие редукторы при необходимости
});

export default rootReducer;
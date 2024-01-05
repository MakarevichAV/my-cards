import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import axios from 'axios';

const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument({ axios })));
  return store;
};

export default configureStore;
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import axios from 'axios';

const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument({ axios })));
  return store;
};

export default configureStore;

// import { configureStore } from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
// import rootReducer from '../reducers/rootReducer';
// import axios from 'axios';

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk.withExtraArgument({ axios })),
// });

// export default store;
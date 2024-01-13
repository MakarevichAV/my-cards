import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';
import axios from 'axios';

const configureStore = () => {
  const store = createStore(rootReducer, applyMiddleware(thunk.withExtraArgument({ axios })));
  return store;
};

export default configureStore;

// import { createStore, applyMiddleware } from 'redux';
// import thunk from 'redux-thunk';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import rootReducer from '../reducers/rootReducer';
// import axios from 'axios';

// const configureStore = () => {
//   const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(thunk.withExtraArgument({ axios })))
//   );
//   return store;
// };

// export default configureStore;
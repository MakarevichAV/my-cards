import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  error: null,
};

const sampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        error: null,
      };

    case actionTypes.LOGIN_FAILURE:
    case actionTypes.REGISTER_FAILURE:
      return {
        ...state,
        user: null,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default sampleReducer;
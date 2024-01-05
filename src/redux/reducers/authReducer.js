const initialState = {
  user: null,
  error: null,
  successMessage: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return { ...state, user: action.payload, error: null };
    case 'LOGIN_FAILURE':
      return { ...state, user: null, error: action.payload };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        error: null,
        successMessage: action.payload.message, // Extract success message from the API response
      };
    case 'REGISTER_FAILURE':
      return { ...state, user: null, error: action.payload };
    case 'SET_SUCCESS_MESSAGE':
      return {
        ...state,
        successMessage: action.payload,
      };
    case 'CLEAR_SUCCESS_MESSAGE':
      return {
        ...state,
        successMessage: null,
      };
    default:
      return state;
  }
};

export default authReducer;

const initialState = {
  user: null,
  error: null,
  successMessage: null,
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
  isLogin: true,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      localStorage.setItem('isAuthenticated', 'true');
      return { ...state, user: action.payload, error: null, isAuthenticated: true };
    case 'LOGIN_FAILURE':
      localStorage.setItem('isAuthenticated', 'false');
      return { ...state, user: null, error: action.payload, isAuthenticated: false };
    case 'LOGOUT':
      localStorage.setItem('isAuthenticated', 'false');
      return { ...state, user: null, error: null, isAuthenticated: false };
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        user: action.payload,
        error: null,
        successMessage: action.payload.message, // Extract success message from the API response
      };
    case 'REGISTER_FAILURE':
      return { ...state, user: null, error: action.payload };
    case 'SET_IS_LOGIN':
      return { ...state, isLogin: action.payload };
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

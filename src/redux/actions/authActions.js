import axios from 'axios';

const serverUrl = 'http://localhost:3001';

export const login = ({ username, password }) => async (dispatch) => {
  try {
    // Make the API call to your backend /login endpoint
    const response = await axios.post(`${serverUrl}/login`, { username, password });
console.log(response);
    // Dispatch an action for successful login
    dispatch({ type: 'LOGIN_SUCCESS', payload: response.data });
  } catch (error) {
    // Dispatch an action for login failure
    dispatch({ type: 'LOGIN_FAILURE', payload: error.message });
  }
};

export const register = ({ username, password }) => async (dispatch) => {
    try {
      const response = await axios.post(`${serverUrl}/register`, { username, password });
      dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
    } catch (error) {
      dispatch({ type: 'REGISTER_FAILURE', payload: error.message });
    }
  };
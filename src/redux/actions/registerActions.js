import axios from 'axios';

const serverUrl = 'http://45.141.78.127:3001';
// const serverUrl = 'http://localhost:3001';

export const register = ({ username, password }) => async (dispatch) => {
  try {
    // Make the API call to your backend /register endpoint
    const response = await axios.post(`${serverUrl}/register`, { username, password });

    // Dispatch an action for successful registration
    dispatch({ type: 'REGISTER_SUCCESS', payload: response.data });
  } catch (error) {
    // Dispatch an action for registration failure
    dispatch({ type: 'REGISTER_FAILURE', payload: error.message });
  }
};
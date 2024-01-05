import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const RegisterForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);
  const successMessage = useSelector((state) => state.auth.successMessage);

  useEffect(() => {
    // Check for successMessage changes and redirect if a message is received
    if (successMessage) {
      // Display a success message (you can use a toast or any other UI element)
      console.log(successMessage);
  
      // Redirect the user to the login page
      dispatch({ type: 'SET_IS_LOGIN', payload: true }); // Dispatch action to set isLogin to true
      navigate('/login');
  
      // Dispatch an action to set a success message
      dispatch({ type: 'SET_SUCCESS_MESSAGE', payload: successMessage });
  
      // Clear the success message after 3 seconds (adjust the timeout as needed)
      const timeoutId = setTimeout(() => {
        dispatch({ type: 'CLEAR_SUCCESS_MESSAGE' });
      }, 3000);
  
      // Clean up the timeout to avoid memory leaks
      return () => clearTimeout(timeoutId);
    }
  }, [successMessage, navigate, dispatch]);

  const handleRegister = () => {
    // Check if the password and confirmation password match
    if (password === confirmPassword) {
      dispatch(register({ username, password }));
      // Call the onSubmit callback with the data
      onSubmit({ username, password });
    } else {
      // Handle the error if passwords do not match for registration
      dispatch({ type: 'REGISTER_FAILURE', payload: 'Passwords do not match' });
    }
  };

  return (
    <div>
      {/* Registration form */}
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label>
        Confirm Password:
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </label>
      <button onClick={handleRegister}>Register</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default RegisterForm;
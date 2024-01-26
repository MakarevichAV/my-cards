import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';

const RegisterForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const error = useSelector((state) => state.auth.error);
  const successMessage = useSelector((state) => state.auth.successMessage);

  useEffect(() => {
    if (successMessage) {
      dispatch({ type: 'SET_IS_LOGIN', payload: true }); 
      dispatch({ type: 'SET_SUCCESS_MESSAGE', payload: successMessage });
      // navigate('/login');
  
      // const timeoutId = setTimeout(() => {
      //   dispatch({ type: 'CLEAR_SUCCESS_MESSAGE' });
      // }, 3000);
  
      // return () => clearTimeout(timeoutId);
    }
  }, [successMessage, dispatch]);

  const handleRegister = () => {
    if (password === confirmPassword) {
      dispatch(register({ username, password }));
      onSubmit({ username, password });
    } else {
      dispatch({ type: 'REGISTER_FAILURE', payload: 'Passwords do not match' });
    }
  };

  return (
    <div>
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
      <button className="btn-type1" onClick={handleRegister}>Register</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default RegisterForm;
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import '../styles/LoginForm.css';

const LoginPage = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const [formData, setFormData] = useState({});
  const successMessage = useSelector((state) => state.auth.successMessage);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (successMessage && isLogin) {
      navigate('/home');
    }
  }, [successMessage, isLogin, navigate]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const toggleMode = () => {
    dispatch({ type: 'SET_IS_LOGIN', payload: !isLogin });
  };

  const handleFormSubmit = (data) => {
    setFormData(data);
  };

  return (
    <div>
      <div className="logo-container">
        <img src="/logo.svg" alt="Logo" />
      </div>
      <div className="login-container">
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {isLogin ? (
          <LoginForm onSubmit={handleFormSubmit} />
        ) : (
          <RegisterForm onSubmit={handleFormSubmit} />
        )}
        <p onClick={toggleMode}>{isLogin ? 'Need to register?' : 'Already have an account?'}</p>
      </div>
    </div>
  );
};

export default LoginPage;
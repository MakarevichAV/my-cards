import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import '../styles/LoginForm.css';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
  };

  const handleFormSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="logo-container">
        <img src="/logo.svg" alt="Logo" />
      </div>
      <div className="login-container">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        <LoginForm onSubmit={handleFormSubmit} isLogin={isLogin} />
        <p onClick={toggleMode}>{isLogin ? 'Need to register?' : 'Already have an account?'}</p>
      </div>
    </div>
  );
};

export default LoginPage;
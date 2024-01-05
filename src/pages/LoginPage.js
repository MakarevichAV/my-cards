import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import '../styles/LoginForm.css';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({});
  const successMessage = useSelector((state) => state.auth.successMessage);

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
  };

  const handleFormSubmit = (data) => {
    // Обновляем состояние с данными
    setFormData(data);
  };

  return (
    <div>
      <div className="logo-container">
        <img src="/logo.svg" alt="Logo" />
      </div>
      <div className="login-container">
        <h2>{isLogin ? 'Login' : 'Register'}</h2>
        {isLogin ? (
          <LoginForm onSubmit={handleFormSubmit} />
        ) : (
          <RegisterForm onSubmit={handleFormSubmit} />
        )}
        <p onClick={toggleMode}>{isLogin ? 'Need to register?' : 'Already have an account?'}</p>
      </div>
      {/* Выводим данные из формы */}
      {Object.keys(formData).length > 0 && (
        <div>
          <h3>Form Data:</h3>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
      {successMessage && (
        <div style={{ color: 'green', margin: '10px 0' }}>{successMessage}</div>
      )}
    </div>
  );
};

export default LoginPage;
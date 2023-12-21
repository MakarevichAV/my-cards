import React, { useState } from 'react';

const LoginForm = ({ onSubmit, isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <input
          type="email"
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      {!isLogin && (
        <label>
          <input type="password" placeholder="Confirm Password" />
        </label>
      )}

      <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
    </form>
  );
};

export default LoginForm;
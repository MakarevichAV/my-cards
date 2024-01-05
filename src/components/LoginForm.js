// import React, { useState } from 'react';

// const LoginForm = ({ onSubmit, isLogin }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ email, password });
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         <input
//           type="email"
//           placeholder="Email" 
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </label>
//       <label>
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </label>

//       {!isLogin && (
//         <label>
//           <input type="password" placeholder="Confirm Password" />
//         </label>
//       )}

//       <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
//     </form>
//   );
// };

// export default LoginForm;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  const handleLogin = () => {
    dispatch(login({ username, password }));
    // Вызываем колбэк onSubmit с данными
    onSubmit({ username, password });
  };

  return (
    <div>
      {/* Форма входа */}
      <label>
        Имя пользователя:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Пароль:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleLogin}>Войти</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default LoginForm;
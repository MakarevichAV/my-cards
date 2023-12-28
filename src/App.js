import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginPage from './pages/LoginPage'; // Добавьте импорт

const App = () => {

  return (
    <div>
      {/* <h1>Count: {count}</h1>
      <StyledButton onClick={() => dispatch(increment())}>Increment</StyledButton>
      <StyledButton onClick={() => dispatch(decrement())}>Decrement</StyledButton> */}

    
      <LoginPage />
    </div>
  );
};

export default App;
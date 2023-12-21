import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './redux/actions/actions';
import StyledButton from './components/Button';
import LoginPage from './pages/LoginPage'; // Добавьте импорт

const App = () => {
  const count = useSelector((state) => state.sample.count);
  const dispatch = useDispatch();

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
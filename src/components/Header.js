import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addDirectory } from '../redux/actions/directoryActions';
import { logout } from '../redux/actions/authActions';
import Confirm from './Confirm';
import '../styles/Header.css';

const Header = ({ onAddDirectory, onLogout }) => {

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  const handleExitClick = () => {
    setIsConfirmOpen(true);
  };

  const handleCancelConfirm = () => {
    setIsConfirmOpen(false);
  };

  const handleConfirmExit = () => {
    onLogout();
    setIsConfirmOpen(false);
  };

  return (
    <header>
      {/* Меню */}
      <div className="logo"></div>

      {/* Название текущей страницы */}
      <div className="page-title">Directories</div>

      {/* Кнопка добавления новой директории */}
      <div style={{ display: 'flex' }}>
        <div className="add-directory" onClick={onAddDirectory}>
          <div className="gor-line"></div>
          <div className="ver-line"></div>
        </div>
        <div className="delimiter"></div>
        <div className="logout" onClick={handleExitClick}></div>
        {isConfirmOpen && (
          <Confirm
            message="Do you really want to exit your account?"
            onCancel={handleCancelConfirm}
            onConfirm={handleConfirmExit}
          />
        )}
      </div>
    </header>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddDirectory: () => dispatch(addDirectory()),
    onLogout: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(Header);
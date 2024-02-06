import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addDirectory } from '../redux/actions/directoryActions';
import { logout } from '../redux/actions/authActions';
import Confirm from './Confirm';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ onAddDirectory, onLogout, showAddDirectory, showGoToBack, showGoToSets, directoryId }) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleToDirsClick = () => {
    navigate(`/home`);
  };
  const handleToSetsClick = () => {
    navigate(`/sets/${directoryId}`);
  };

  return (
    <header>
      <div className="logo" onClick={handleToDirsClick}></div>

      {showAddDirectory && <div className="page-title">Directories</div>}

      <div style={{ display: 'flex' }}>
        {showAddDirectory && (<>
          <div className="add-directory" onClick={onAddDirectory}></div>
        </>)}
        {showGoToBack && (<>
          <div className="go-to-back" onClick={handleToDirsClick}></div>
        </>)}
        {showGoToSets && (<>
          <div className="go-to-back" onClick={handleToSetsClick}></div>
        </>)}
        <div className="delimiter"></div>
        <div style={{ display: 'flex' }}>
          <div className="logout" onClick={handleExitClick}></div>
          {isConfirmOpen && (
            <Confirm
              message="Do you really want to exit your account?"
              onCancel={handleCancelConfirm}
              onConfirm={handleConfirmExit}
            />
          )}
        </div>
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
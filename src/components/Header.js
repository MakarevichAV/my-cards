import React from 'react';
import { connect } from 'react-redux';
import { addDirectory } from '../redux/actions/directoryActions';
import '../styles/Header.css';

const Header = ({ onAddDirectory }) => {
  return (
    <header>
      {/* Меню */}
      <div className="logo"></div>

      {/* Название текущей страницы */}
      <div className="page-title">Directories</div>

      {/* Кнопка добавления новой директории */}
      <div style={{display: 'flex'}}>
        <div className="add-directory" onClick={onAddDirectory}>
          <div className="gor-line"></div>
          <div className="ver-line"></div>
        </div>
        <div className="delimiter"></div>
        <div className="logout"></div>
      </div>
    </header>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAddDirectory: () => dispatch(addDirectory()),
  };
};

export default connect(null, mapDispatchToProps)(Header);
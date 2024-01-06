import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header>
      {/* Логотип или название сайта
      <div className="logo">MyCards</div> */}

      {/* Меню */}
      <nav className="menu">
        {/* Здесь добавьте пункты меню */}
      </nav>

      {/* Название текущей страницы */}
      <div className="page-title">Directories</div>

      {/* Кнопка добавления новой директории */}
      <div className="add-directory">
        <div className="gor-line"></div>
        <div className="ver-line"></div>
      </div>
    </header>
  );
};

export default Header;
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
      <div className="page-title">Домашняя страница</div>

      {/* Кнопка добавления новой директории */}
      <button className="add-directory">Добавить директорию</button>
    </header>
  );
};

export default Header;
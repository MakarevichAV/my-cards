import React from 'react';
import Header from '../components/Header';
import DirectoryTile from '../components/DirectoryTile';
import '../styles/HomePage.css';

const HomePage = () => {
  // Пример данных для тестирования
  const directories = [
    {
      id: 1,
      image: '',
      setsCount: 10,
      directoryName: 'Название директории 1',
    },
    // Добавьте другие директории по аналогии
  ];

  return (
    <div className="home-page">
      <Header />

      <div className="content">
        {directories.map((directory) => (
          <DirectoryTile key={directory.id} {...directory} />
        ))}
      </div>

      {/* Здесь можете добавить компонент Footer */}
    </div>
  );
};

export default HomePage;
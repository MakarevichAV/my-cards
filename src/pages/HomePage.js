import React from 'react';
import Header from '../components/Header';
import DirectoryTile from '../components/DirectoryTile';
import Footer from '../components/Footer';
import '../styles/HomePage.css';

const HomePage = () => {
  // Пример данных для тестирования
  const directories = [
    {
      id: 1,
      image: '',
      setsCount: 6,
      directoryName: 'Hebrew',
    },
    {
        id: 2,
        image: '',
        setsCount: 4,
        directoryName: 'English',
      },
  ];

  return (
    <div className="home-page page">
      <Header />

      <div className="content">
        {directories.map((directory) => (
          <DirectoryTile key={directory.id} {...directory} />
        ))}
      </div>

      <Footer /> 
    </div>
  );
};

export default HomePage;
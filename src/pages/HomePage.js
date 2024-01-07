import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import DirectoryTile from '../components/DirectoryTile';
import Footer from '../components/Footer';
import '../styles/HomePage.css';

const HomePage = ({ directories }) => {
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

// Используем mapStateToProps для передачи данных из Redux store в компонент
const mapStateToProps = (state) => {
  return {
    directories: state.directory,
  };
};

export default connect(mapStateToProps)(HomePage);
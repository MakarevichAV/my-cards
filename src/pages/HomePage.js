import React, { useState } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import DirectoryTile from '../components/DirectoryTile';
import Footer from '../components/Footer';
import { addDirectory } from '../redux/actions/directoryActions';
import '../styles/HomePage.css';

const HomePage = ({ directories, onAddDirectory }) => {
  const [isAddingDirectory, setIsAddingDirectory] = useState(false);
  const handleAddDirectory = () => {
    setIsAddingDirectory(true);
    onAddDirectory(); // Вызываем action для добавления новой директории в store
  };
  const reversedDirectories = [...directories].reverse();
  return (
    <div className="home-page page">
      <Header />

      <div className="content">
        {reversedDirectories.map((directory) => (
          <DirectoryTile key={directory.id} {...directory} />
        ))}
      </div>

      {isAddingDirectory && (
        <DirectoryTile
          key="new"
          id="new"
          name=""
          image=""
          setsCount={0}
          isEditing={true}
          editedName=""
          editedImage=""
        />
      )}

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

const mapDispatchToProps = (dispatch) => {
  return {
    onAddDirectory: () => dispatch(addDirectory()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import DirectoryTile from '../components/DirectoryTile';
import Footer from '../components/Footer';
import { getDirectories } from '../redux/actions/directoryActions';
import '../styles/HomePage.css';

const HomePage = ({ directories, onGetDirectories }) => {
  const [isAddingDirectory, setIsAddingDirectory] = useState(false);

  useEffect(() => {
    // Вызываем getDirectories при монтировании компонента
    onGetDirectories();
  }, [onGetDirectories]);

  const handleAddDirectory = () => {
    setIsAddingDirectory(true);
  };

  // const reversedDirectories = [...directories].reverse();
  const reversedDirectories = Array.isArray(directories) ? [...directories].reverse() : [];

  return (
    <div className="home-page page">
      <Header />

      <div className="content">
        {reversedDirectories.map((directory) => (
          <DirectoryTile key={directory._id} {...directory} />
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
    onGetDirectories: () => dispatch(getDirectories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
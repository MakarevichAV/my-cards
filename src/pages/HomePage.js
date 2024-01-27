import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import DirectoryTile from '../components/DirectoryTile';
import Loader from '../components/Loader';
import { getDirectories } from '../redux/actions/directoryActions';
import '../styles/HomePage.css';

const HomePage = ({ directories, onGetDirectories }) => {
  const [isAddingDirectory, setIsAddingDirectory] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // Устанавливаем isLoading в true при начале загрузки
        const result = await onGetDirectories();
        setIsLoading(false); // Устанавливаем isLoading в false после завершения загрузки
      } catch (error) {
        setError(error.message); // Устанавливаем error, если произошла ошибка
        setIsLoading(false); // Устанавливаем isLoading в false в случае ошибки
      }
    };

    fetchData();
  }, [onGetDirectories]);

  const handleAddDirectory = () => {
    setIsAddingDirectory(true);
  };

  const reversedDirectories = Array.isArray(directories) ? [...directories].reverse() : [];

  return (
    <div className="home-page page">
      <Header showAddDirectory={true} showGoToBack={false}/>

      <div className="content">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
          </div>
        ) : reversedDirectories.length > 0 ? (
          reversedDirectories.map((directory) => (
            <DirectoryTile key={directory._id} {...directory} />
          ))
        ) : (
          <div className="page-description">
            <p>Your directories will be here</p>
          </div>
        )}
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
    </div>
  );
};

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
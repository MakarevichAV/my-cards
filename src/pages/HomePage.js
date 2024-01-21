import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import DirectoryTile from '../components/DirectoryTile';
import { getDirectories } from '../redux/actions/directoryActions';
import '../styles/HomePage.css';

const HomePage = ({ directories, onGetDirectories }) => {
  const [isAddingDirectory, setIsAddingDirectory] = useState(false);

  useEffect(() => {
    onGetDirectories();
  }, [onGetDirectories]);

  const handleAddDirectory = () => {
    setIsAddingDirectory(true);
  };

  const reversedDirectories = Array.isArray(directories) ? [...directories].reverse() : [];

  return (
    <div className="home-page page">
      <Header />

      <div className="content">
        {reversedDirectories.length > 0 ? (
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
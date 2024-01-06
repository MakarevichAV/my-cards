import React from 'react';

const DirectoryTile = ({ image, setsCount, directoryName, onEdit }) => {
  return (
    <div className="directory-tile">
      <div className="directory-image">
        <img src={image} alt="Folder" />
      </div>

      <div className="directory-info">
        <div className="sets-count">{setsCount} наборов карточек</div>
        <div className="directory-name">{directoryName}</div>
      </div>

      <button className="edit-directory" onClick={onEdit}>
        Редактировать
      </button>
    </div>
  );
};

export default DirectoryTile;

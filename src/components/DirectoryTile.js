import React from 'react';

const DirectoryTile = ({ image, setsCount, directoryName, onEdit }) => {
    const defaultImage = process.env.PUBLIC_URL + '/images/folder.png';
    const imageStyle = {
        backgroundImage: `url(${image || defaultImage})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        width: '50px',
        height: '50px',
        marginRight: '15px',
        cursor: 'pointer'
    };
    return (
        <div className="directory-tile">
            <div className="directory-image" style={imageStyle}></div>

            <div className="directory-info">
                <div className="directory-name">{directoryName}</div>
                <div className="sets-count">{setsCount} sets</div>
            </div>

            <div className="edit-directory" onClick={onEdit}></div>
        </div>
    );
};

export default DirectoryTile;

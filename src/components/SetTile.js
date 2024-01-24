import React, { useState, useEffect } from 'react';
import SearchPopup from './SearchPopup';
import { useNavigate } from 'react-router-dom';
import '../styles/SetTile.css';


const SetTile = ({ _id, name, image, cardsCount, editedName, editedImage, onSave, onDelete }) => {
    const [isSearching, setIsSearching] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [localEditedName, setLocalEditedName] = useState(editedName || '');
    const [localEditedImage, setLocalEditedImage] = useState(image || '');
    const [selectedImage, setSelectedImage] = useState('');
    const defaultImage = process.env.PUBLIC_URL + '/images/cards.png';
    const navigate = useNavigate();

    const imageStyle = {
        backgroundImage: `url(${defaultImage})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '80px',
        height: '80px',
        marginRight: '15px',
        borderRadius: '8px'
    };

    // BLL functions //
    const handleSave = () => {
        onSave(_id, localEditedName, localEditedImage);
        setIsEditing(false);
    };

    const handleDelete = () => {
        onDelete(_id);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };
    // --- //

    // PopUp functions //
    const handleSearchClick = () => {
        setIsSearching(true);
    };

    const handleSearchClose = () => {
        setIsSearching(false);
    };

    const handleImageSelect = (selectedImage) => {
        // Обработка выбора изображения из SearchPopup
        setLocalEditedImage(selectedImage);
    };
    // --- //

    //обработчик для перехода на SetsPage
    const handleToCreatorClick = () => {
        navigate(`/creator/${_id}`);
    };

    return (
        <div className="set-tile">
            <div className="set-image" style={imageStyle}></div>

            {isSearching && (
                <SearchPopup
                    onClose={handleSearchClose}
                    onImageSelect={handleImageSelect}
                />
            )}

            {isEditing ? (
                <div className="set-info">
                    <input
                        className="set-input"
                        type="text"
                        value={localEditedName}
                        onChange={(e) => setLocalEditedName(e.target.value)}
                        placeholder="Название директории"
                    />
                    <div className="btn-type2" onClick={handleSearchClick}><div className="camera"></div>picture</div>
                </div>
            ) : (
                <div className="set-info">
                    <div className="set-name">Name of set</div>
                    <div className="cards-count">0 sets</div>
                </div>
            )}

            {isEditing ? (
                <>
                    <div className="save-set btns" onClick={handleSave}></div>
                    <div className="delete-set btns" onClick={handleDelete}></div>
                </>
            ) : (
                <>
                    <div>
                        <div className="btn-type3" onClick={handleToCreatorClick}>creator</div>
                        <div className="btn-type1" onClick={handleToCreatorClick}>viewer</div>
                    </div>
                    <div className="edit-set btns" onClick={handleEdit}></div>
                </>
            )}
        </div>
    );
};

export default SetTile;

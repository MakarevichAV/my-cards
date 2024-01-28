import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { editSet, saveSet, deleteSet } from '../redux/actions/setActions';
import SearchPopup from './SearchPopup';
import { useNavigate } from 'react-router-dom';
import '../styles/SetTile.css';


const SetTile = ({ _id, name, image, cardsCount, editedName, editedImage, onSave, onDelete, directoryId }) => {
    const [isSearching, setIsSearching] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [localEditedName, setLocalEditedName] = useState(editedName || '');
    const [localEditedImage, setLocalEditedImage] = useState(image || '');
    const [selectedImage, setSelectedImage] = useState('');
    const defaultImage = process.env.PUBLIC_URL + '/images/cards.png';
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditing) {
            setLocalEditedName(name || '');
        }
    }, [isEditing, editedName, editedImage, name, image]);

    useEffect(() => {
        if (selectedImage) {
            setLocalEditedImage(selectedImage);
            setSelectedImage('');
        }
    }, [selectedImage]);

    const imageStyle = {
        backgroundImage: `url(${localEditedImage || defaultImage})`,
        backgroundSize: `${localEditedImage ? 'cover' : 'contain'}`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '80px',
        height: '80px',
        marginRight: '15px',
        borderRadius: '8px'
    };

    // BLL functions //
    const handleSave = () => {
        onSave(_id, localEditedName, localEditedImage, directoryId);
        setIsEditing(false);
    };

    const handleDelete = () => {
        onDelete(_id, directoryId);
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

    //обработчик перехода к редактору карт
    const handleToCreatorClick = () => {
        navigate(`/creator/${directoryId}/${_id}`, { state: { setName: name } });
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
                    <div className="set-name">{name}</div>
                    <div className="cards-count">{cardsCount} cards</div>
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
                        <div className="btn-type3" onClick={handleToCreatorClick}>creat</div>
                        <div className="btn-type1" onClick={handleToCreatorClick}>view</div>
                    </div>
                    <div className="edit-set btns" onClick={handleEdit}></div>
                </>
            )}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const set = state.set.find((set) => set.id === ownProps.id);
    return {
        isEditing: ownProps.isEditing || false,
        editedName: ownProps.editedName || '',
        editedImage: ownProps.editedImage || '',
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onEdit: (id) => dispatch(editSet(id)),
        onSave: (id, editedName, editedImage, directoryId) => {
            dispatch(saveSet(id, editedName, editedImage, directoryId));
        },
        onDelete: (id, directoryId) => dispatch(deleteSet(id, directoryId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetTile);
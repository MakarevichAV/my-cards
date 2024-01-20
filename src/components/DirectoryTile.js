import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { editDirectory, saveDirectory, deleteDirectory } from '../redux/actions/directoryActions';
import SearchPopup from './SearchPopup';

const DirectoryTile = ({ _id, name, image, setsCount, editedName, editedImage, onSave, onDelete }) => {
    const [isSearching, setIsSearching] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [localEditedName, setLocalEditedName] = useState(editedName || '');
    const [localEditedImage, setLocalEditedImage] = useState(image || '');
    const [selectedImage, setSelectedImage] = useState(''); // Новое состояние для хранения выбранного изображения
    const defaultImage = process.env.PUBLIC_URL + '/images/folder.png';

    useEffect(() => {
        if (isEditing) {
            setLocalEditedName(name || '');
        }
    }, [isEditing, editedName, editedImage, name, image]);

    useEffect(() => {
        // Обновление локального изображения при выборе из SearchPopup
        if (selectedImage) {
            setLocalEditedImage(selectedImage);
            setSelectedImage('');
        }
    }, [selectedImage]);

    const imageStyle = {
        backgroundImage: `url(${localEditedImage || defaultImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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

    return (
        <div className="directory-tile">
            <div className="directory-image" style={imageStyle}></div>

            {isSearching && (
                <SearchPopup
                    onClose={handleSearchClose}
                    onImageSelect={handleImageSelect}
                />
            )}

            {isEditing ? (
                <div className="directory-info">
                    <input
                        className="directory-input"
                        type="text"
                        value={localEditedName}
                        onChange={(e) => setLocalEditedName(e.target.value)}
                        placeholder="Название директории"
                    />
                    <div className="btn-type2" onClick={handleSearchClick}><div className="camera"></div>picture</div>
                </div>
            ) : (
                <div className="directory-info">
                    <div className="directory-name">{name}</div>
                    <div className="sets-count">{setsCount} sets</div>
                </div>
            )}

            {isEditing ? (
                <>
                    <div className="save-directory btns" onClick={handleSave}></div>
                    <div className="delete-directory btns" onClick={handleDelete}></div>
                </>
            ) : (
                <>
                    <div className="btn-type1">&rArr; to sets</div>
                    <div className="edit-directory btns" onClick={handleEdit}></div>
                </>
            )}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const directory = state.directory.find((dir) => dir.id === ownProps.id);
    return {
        isEditing: ownProps.isEditing || false,
        editedName: ownProps.editedName || '',
        editedImage: ownProps.editedImage || '',
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onEdit: (id) => dispatch(editDirectory(id)),
        onSave: (id, editedName, editedImage) => {
            dispatch(saveDirectory(id, editedName, editedImage));
        },
        onDelete: (id) => dispatch(deleteDirectory(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectoryTile);

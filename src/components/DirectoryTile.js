import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { editDirectory, saveDirectory, deleteDirectory } from '../redux/actions/directoryActions';

const DirectoryTile = ({ _id, name, image, setsCount, editedName, editedImage, onSave, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [localEditedName, setLocalEditedName] = useState(editedName || '');
    const [localEditedImage, setLocalEditedImage] = useState(editedImage || '');
    const defaultImage = process.env.PUBLIC_URL + '/images/folder.png';
    useEffect(() => {
        // Вызывается при изменении isEditing или editedName или editedImage
        if (isEditing) {
            // При входе в режим редактирования устанавливаем значения инпутов
            setLocalEditedName(name || '');
            setLocalEditedImage(image || '');
        }
    }, [isEditing, editedName, editedImage, name, image]);
    const imageStyle = {
        backgroundImage: `url(${image || defaultImage})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        width: '50px',
        height: '50px',
        marginRight: '15px',
        cursor: 'pointer'
    };

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

    return (
        <div className="directory-tile">
            <div className="directory-image" style={imageStyle}></div>

            {isEditing ? (
                <div className="directory-info">
                    <input
                        type="text"
                        value={localEditedName}
                        onChange={(e) => setLocalEditedName(e.target.value)}
                        placeholder="Название директории"
                    />
                    <input
                        type="text"
                        value={localEditedImage}
                        onChange={(e) => setLocalEditedImage(e.target.value)}
                        placeholder="URL изображения"
                    />
                </div>
            ) : (
                <div className="directory-info">
                    <div className="directory-name">{name}</div>
                    <div className="sets-count">{setsCount} наборов карточек</div>
                </div>
            )}

            {isEditing ? (
                <>
                    <div className="save-directory btns" onClick={handleSave}></div>
                    <div className="delete-directory btns" onClick={handleDelete}></div>
                </>
            ) : (
                <div className="edit-directory btns" onClick={handleEdit}></div>
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
            // console.log(editedName, editedImage);
            dispatch(saveDirectory(id, editedName, editedImage));
        },
        onDelete: (id) => dispatch(deleteDirectory(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectoryTile);

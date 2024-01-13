import React, { useState } from 'react';
import { connect } from 'react-redux';
import { editDirectory, saveDirectory, deleteDirectory } from '../redux/actions/directoryActions';

const DirectoryTile = ({ _id, isEditing, name, image, setsCount, editedName, editedImage, onEdit, onSave, onDelete }) => {
    console.log({ _id, isEditing, name, image, setsCount, editedName, editedImage, onEdit, onSave, onDelete });
    const [localEditedName, setLocalEditedName] = useState(editedName || '');
    const [localEditedImage, setLocalEditedImage] = useState(editedImage || '');
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
    const handleSave = () => {
        onSave(_id, localEditedName, localEditedImage);
    };

    const handleDelete = () => {
        onDelete(_id);
    };

    const handleEdit = () => {
        onEdit(_id);
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
                // <div className="edit-directory btns" onClick={() => onEdit(id)}></div>
                <div className="edit-directory btns" onClick={() => onEdit(_id)}></div>
            )}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const directory = state.directory.find((dir) => dir.id === ownProps.id);
    return {
        isEditing: directory.isEditing || false,
        editedName: directory.editedName || '',
        editedImage: directory.editedImage || '',
        // Дополните этот объект, если у вас есть другие свойства для передачи
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onEdit: (id) => dispatch(editDirectory(id)),
        onSave: (id, editedName, editedImage) => dispatch(saveDirectory(id, editedName, editedImage)),
        onDelete: (id) => dispatch(deleteDirectory(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DirectoryTile);

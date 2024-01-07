// import React from 'react';

// const DirectoryTile = ({ image, setsCount, directoryName, onEdit }) => {
//     const defaultImage = process.env.PUBLIC_URL + '/images/folder.png';
//     const imageStyle = {
//         backgroundImage: `url(${image || defaultImage})`,
//         backgroundSize: 'contain',
//         backgroundPosition: 'center',
//         width: '50px',
//         height: '50px',
//         marginRight: '15px',
//         cursor: 'pointer'
//     };
//     return (
//         <div className="directory-tile">
//             <div className="directory-image" style={imageStyle}></div>

//             <div className="directory-info">
//                 <div className="directory-name">{directoryName}</div>
//                 <div className="sets-count">{setsCount} sets</div>
//             </div>

//             <div className="edit-directory" onClick={onEdit}></div>
//         </div>
//     );
// };

// export default DirectoryTile;

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { editDirectory, saveDirectory, deleteDirectory } from '../redux/actions/directoryActions';

const DirectoryTile = ({ id, isEditing, name, image, setsCount, editedName, editedImage, onEdit, onSave, onDelete }) => {
    const [localEditedName, setLocalEditedName] = useState(editedName || '');
    const [localEditedImage, setLocalEditedImage] = useState(editedImage || '');

    const handleSave = () => {
        onSave(id, localEditedName, localEditedImage);
    };

    const handleDelete = () => {
        onDelete(id);
    };

    return (
        <div className="directory-tile" style={{ backgroundImage: `url(${image})` }}>
            <div className="directory-image" style={{ backgroundImage: `url(${image})` }}></div>

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
                    <div className="sets-count">{setsCount} наборов карточек</div>
                    <div className="directory-name">{name}</div>
                </div>
            )}

            {isEditing ? (
                <>
                    <button className="save-directory" onClick={handleSave}>
                        Сохранить
                    </button>
                    <button className="delete-directory" onClick={handleDelete}>
                        Удалить
                    </button>
                </>
            ) : (
                <button className="edit-directory" onClick={() => onEdit(id)}>
                    Редактировать
                </button>
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

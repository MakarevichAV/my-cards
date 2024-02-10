import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { editDirectory, saveDirectory, deleteDirectory } from '../redux/actions/directoryActions';
import SearchPopup from './SearchPopup';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';

const DirectoryTile = ({ _id, name, image, setsCount, editedName, editedImage, onSave, onDelete }) => {
    const [isSearching, setIsSearching] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [localEditedName, setLocalEditedName] = useState(editedName || '');
    const [localEditedImage, setLocalEditedImage] = useState(image || '');
    const [selectedImage, setSelectedImage] = useState('');
    const defaultImage = process.env.PUBLIC_URL + '/images/folder.png';
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
        backgroundSize: 'cover',
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

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
const handleDeleteClick = () => {
        setIsConfirmOpen(true);
    }
    const handleCancelConfirm = () => {
        setIsConfirmOpen(false);
    };
    const handleDelete = async () => {
        setIsLoading(true);
        try {
            await onDelete(_id);
        } finally {
            setIsLoading(false);
        }
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
    const handleToSetsClick = () => {
        navigate(`/sets/${_id}`, { state: { directoryName: name } });
    };

    return (
        <div className="directory-tile">
            {isConfirmOpen && (
                <div className="directory-popup">
                    {isLoading && <Loader />}
                    {!isLoading && (
                        <>
                            <div className="directory-popup-crose" onClick={handleCancelConfirm}></div>
                            <p className="directory-confirm-text"><div className="set-popup-icon"></div>Delete the directory?</p>
                            <div style={{display: 'flex'}}>
                                <div className='btn-type1 directory-confirm-btn' onClick={handleCancelConfirm}>canсel</div>
                                <div className='btn-type2 directory-confirm-btn' onClick={handleDelete}>delete</div>
                            </div>
                        </>
                    )}
                </div>
            )}
            
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
                    <div className="directory-edit-buttons">
                        <div className="btn-type2 btn-choose-img" onClick={handleSearchClick}><div className="camera"></div><span className="btn-text">picture</span></div>
                        <div className="save-directory btns mobile" onClick={handleSave}></div>
                        <div className="delete-directory btns mobile" onClick={handleDeleteClick}></div>
                    </div>
                </div>
            ) : (
                <div className="directory-info">
                    <div className="directory-name">{name}</div>
                    <div className="sets-count">{setsCount} sets</div>
                    <div className='directory-btns btns_mobile'>
                        <div className="btn-type1" onClick={handleToSetsClick}>&rArr; to sets</div>
                        <div className="edit-directory btns" onClick={handleEdit}></div>
                    </div>
                </div>
            )}

            {isEditing ? (
                <>
                    <div className="save-directory btns desctop" onClick={handleSave}></div>
                    <div className="delete-directory btns desctop" onClick={handleDeleteClick}></div>
                </>
            ) : (
                <>
                    <div className="btn-type1 btns_desctop" onClick={handleToSetsClick}>&rArr; to sets</div>
                    <div className="edit-directory btns btns_desctop" onClick={handleEdit}></div>
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
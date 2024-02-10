import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { editSet, saveSet, deleteSet } from '../redux/actions/setActions';
import SearchPopup from './SearchPopup';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import '../styles/SetTile.css';


const SetTile = ({ _id, name, image, cardsCount, editedName, editedImage, onSave, onDelete, directoryId }) => {
    const [isSearching, setIsSearching] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
        backgroundPosition: 'top center',
        backgroundRepeat: 'no-repeat',
        minWidth: '80px',
        height: '80px',
        marginRight: '15px',
        borderRadius: '8px',
    };

    // BLL functions //
    const handleSave = () => {
        onSave(_id, localEditedName, localEditedImage, directoryId);
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
            await onDelete(_id, directoryId);
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

    //обработчик перехода к редактору карт
    const handleToCreatorClick = () => {
        navigate(`/creator/${directoryId}/${_id}`, { state: { setName: name } });
    };
    const handleToViewerClick = () => {
        navigate(`/viewer/${directoryId}/${_id}`, { state: { setName: name } });
    };

    return (
        <div className="set-tile">
            {isConfirmOpen && (
                <div className="set-popup">
                    {isLoading && <Loader />}
                    {!isLoading && (
                        <>
                            <div className="set-popup-crose" onClick={handleCancelConfirm}></div>
                            <p className="set-confirm-text"><div className="set-popup-icon"></div>Delete the set?</p>
                            <div style={{display: 'flex'}}>
                                <div className='btn-type1 set-confirm-btn' onClick={handleCancelConfirm}>canсel</div>
                                <div className='btn-type2 set-confirm-btn' onClick={handleDelete}>delete</div>
                            </div>
                        </>
                    )}
                </div>
            )}
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
                        maxLength="25"
                        type="text"
                        value={localEditedName}
                        onChange={(e) => setLocalEditedName(e.target.value)}
                        placeholder="Название директории"
                    />
                    <div className="set-edit-buttons">
                        <div className="btn-type2" onClick={handleSearchClick}><div className="camera"></div><span className="btn-text">picture</span></div>
                        <div className="save-set btns mobile" onClick={handleSave}></div>
                        <div className="delete-set btns mobile" onClick={handleDeleteClick}></div>
                    </div>
                </div>
            ) : (
                <div className="set-info">
                    <div className="set-name">{name}</div>
                    <div className="cards-count">{cardsCount} cards</div>
                    <div className='btns_mobile'>
                        <div className="btn-type3 btn-creat" onClick={handleToCreatorClick}><div className='set-tile-btn-icon-creat'></div><span className="btn-text">creat</span></div>
                        <div className="btn-type1 btn-view" onClick={handleToViewerClick}><div className='set-tile-btn-icon-view'></div><span className="btn-text">view</span></div>
                        <div className="edit-set btns" onClick={handleEdit}></div>
                    </div>
                </div>
            )}

            {isEditing ? (
                <>
                    <div className="save-set btns desctop" onClick={handleSave}></div>
                    <div className="delete-set btns desctop" onClick={handleDeleteClick}></div>
                </>
            ) : (
                <>
                    <div className='btns_desctop'>
                        <div className="btn-type3 btn-creat" onClick={handleToCreatorClick}><div className='set-tile-btn-icon-creat'></div><span className="btn-text">creat</span></div>
                        <div className="btn-type1 btn-view" onClick={handleToViewerClick}><div className='set-tile-btn-icon-view'></div><span className="btn-text">view</span></div>
                    </div>
                    <div className="edit-set btns btns_desctop" onClick={handleEdit}></div>
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
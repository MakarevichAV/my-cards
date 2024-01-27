import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { editCard, saveCard, deleteCard } from '../redux/actions/cardActions';
import SearchPopup from './SearchPopup';
import { useNavigate } from 'react-router-dom';
import '../styles/Card.css';


const Card = ({
    _id,
    phrase,
    image,
    transcription,
    example,
    translation,
    translatExample,
    editedPhrase,
    editedImage,
    onSave,
    onDelete,
    directoryId,
    setId
}) => {
    const [isSearching, setIsSearching] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [localEditedPhrase, setLocalEditedPhrase] = useState(editedPhrase || '');
    const [localEditedImage, setLocalEditedImage] = useState(image || '');
    const [selectedImage, setSelectedImage] = useState('');
    const defaultImage = process.env.PUBLIC_URL + '/images/cards.png';
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditing) {
            setLocalEditedPhrase(phrase || '');
        }
    }, [isEditing, editedPhrase, editedImage, phrase, image]);

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
        onSave(_id, localEditedPhrase, localEditedImage, directoryId, setId);
        setIsEditing(false);
    };

    const handleDelete = () => {
        onDelete(_id, setId);
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

    // //обработчик перехода к редактору карт
    // const handleToCreatorClick = () => {
    //     navigate(`/creator/${_id}`);
    // };

    return (
        <div className="card-tile">
            <div className="card-image" style={imageStyle}></div>

            {isSearching && (
                <SearchPopup
                    onClose={handleSearchClose}
                    onImageSelect={handleImageSelect}
                />
            )}

            {isEditing ? (
                <div className="card-info">
                    <input
                        className="card-input"
                        type="text"
                        value={localEditedPhrase}
                        onChange={(e) => setLocalEditedPhrase(e.target.value)}
                        placeholder="Word or phrase"
                    />
                    <div className="btn-type2" onClick={handleSearchClick}><div className="camera"></div>picture</div>
                </div>
            ) : (
                <div className="card-info">
                    <div className="card-phrase">{phrase}</div>
                </div>
            )}

            {isEditing ? (
                <>
                    <div className="save-card btns" onClick={handleSave}></div>
                    <div className="delete-card btns" onClick={handleDelete}></div>
                </>
            ) : (
                <>
                    {/* <div>
                        <div className="btn-type3" onClick={handleToCreatorClick}>creat</div>
                        <div className="btn-type1" onClick={handleToCreatorClick}>view</div>
                    </div> */}
                    <div className="edit-card btns" onClick={handleEdit}></div>
                </>
            )}
        </div>
    );
};

const mapStateToProps = (state, ownProps) => {
    const card = state.card.find((card) => card.id === ownProps.id);
    return {
        isEditing: ownProps.isEditing || false,
        editedPhrase: ownProps.editedPhrase || '',
        editedImage: ownProps.editedImage || '',
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onEdit: (id) => dispatch(editCard(id)),
        onSave: (id, editedPhrase, editedImage, directoryId, setId) => {
            dispatch(saveCard(id, editedPhrase, editedImage, directoryId, setId));
        },
        onDelete: (id, setId) => dispatch(deleteCard(id, setId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
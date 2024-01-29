import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { editCard, saveCard, deleteCard } from '../redux/actions/cardActions';
import SearchPopup from './SearchPopup';
import { useNavigate } from 'react-router-dom';
import '../styles/Card.css';


const Card = ({
    _id,
    image,
    phrase,
    transcription,
    note,
    example1,
    translation,
    example2,
    editedImage,
    editedPhrase,
    editedTranscription,
    editedNote,
    editedExample1,
    editedTranslation,
    editedExample2,
    onSave,
    onDelete,
    directoryId,
    setId,
    creating
}) => {
    const [isSearching, setIsSearching] = useState(false);
    const [isEditing, setIsEditing] = useState(creating);
    
    const [localEditedImage, setLocalEditedImage] = useState(image || '');
    const [localEditedPhrase, setLocalEditedPhrase] = useState(editedPhrase || '');
    const [localEditedTranscription, setLocalEditedTranscription] = useState(editedTranscription || '');
    const [localEditedNote, setLocalEditedNote] = useState(editedNote || '');
    const [localEditedExample1, setLocalEditedExample1] = useState(editedExample1 || '');
    const [localEditedTranslation, setLocalEditedTranslation] = useState(editedTranslation || '');
    const [localEditedExample2, setLocalEditedExample2] = useState(editedExample2 || '');
    
    const [selectedImage, setSelectedImage] = useState('');
    const defaultImage = process.env.PUBLIC_URL + '/images/cards.png';
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditing) {
            setLocalEditedPhrase(phrase || '');
            setLocalEditedTranscription(transcription || '');
            setLocalEditedNote(note || '');
            setLocalEditedExample1(example1 || '');
            setLocalEditedTranslation(translation || '');
            setLocalEditedExample2(example2 || '');
        }
    }, [isEditing, editedImage, editedPhrase,
        editedTranscription, editedNote, editedExample1,
        editedTranslation, editedExample2,
        image, phrase, transcription, note,
        example1, translation, example2]);

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
        width: '70px',
        height: '70px',
        marginRight: '15px',
        borderRadius: '8px'
    };

    // BLL functions //
    const handleSave = () => {
        onSave(_id,
            localEditedImage,
            localEditedPhrase,
            localEditedTranscription,
            localEditedNote,
            localEditedExample1,
            localEditedTranslation,
            localEditedExample2,
            directoryId, setId);
        // setIsEditing(false);
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
            {isEditing && (
                <>
                    <div className="card-side1">
                        <div className='card-image-container card-row'>
                            <div className="card-image" style={imageStyle}></div>
                            <div className="btn-type2-short" onClick={handleSearchClick}><div className="camera"></div></div>
                            <div className="save-card btns" onClick={handleSave}></div>
                            <div className="delete-card btns" onClick={handleDelete}></div>
                        </div>
                        <input
                            className="card-input"
                            maxLength="30"
                            type="text"
                            value={localEditedPhrase}
                            onChange={(e) => setLocalEditedPhrase(e.target.value)}
                            placeholder="Word or phrase"
                        />
                        <input
                            className="card-input"
                            maxLength="30"
                            type="text"
                            value={localEditedTranscription}
                            onChange={(e) => setLocalEditedTranscription(e.target.value)}
                            placeholder="Transcription"
                        />
                        <input
                            className="card-input"
                            maxLength="30"
                            type="text"
                            value={localEditedNote}
                            onChange={(e) => setLocalEditedNote(e.target.value)}
                            placeholder="Additional information"
                        />
                        <textarea
                            className="card-input"
                            maxLength="60"
                            type="text"
                            value={localEditedExample1}
                            onChange={(e) => setLocalEditedExample1(e.target.value)}
                            placeholder="Example of using this phrase"
                        />
                    </div>
                    <div className="card-side2">
                        <input
                            className="card-input"
                            maxLength="30"
                            type="text"
                            value={localEditedTranslation}
                            onChange={(e) => setLocalEditedTranslation(e.target.value)}
                            placeholder="Translation"
                        />
                        <textarea
                            className="card-input"
                            maxLength="60"
                            type="text"
                            value={localEditedExample2}
                            onChange={(e) => setLocalEditedExample2(e.target.value)}
                            placeholder="Additional information"
                        />
                    </div>
                </>
            )}

            {isSearching && (
                <SearchPopup
                    onClose={handleSearchClose}
                    onImageSelect={handleImageSelect}
                />
            )}

            {isEditing ? (
                <div className="card-info">

                </div>
            ) : (
                <div className="card-info">
                    <div className="card-phrase">{phrase}</div>
                </div>
            )}

            {isEditing ? (
                <>
                    {/* <div className="save-card btns" onClick={handleSave}></div>
                    <div className="delete-card btns" onClick={handleDelete}></div> */}
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
        editedImage: ownProps.editedImage || '',
        editedPhrase: ownProps.editedPhrase || '',
        editedTranscription:ownProps.editedTranscription || '',
        editedNote:ownProps.editedNote || '',
        editedExample1:ownProps.editedExample1 || '',
        editedTranslation:ownProps.editedTranslation || '',
        editedExample2:ownProps.editedExample2 || '',
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onEdit: (id) => dispatch(editCard(id)),
        onSave: (id, editedImage, editedPhrase,
            editedTranscription, editedNote, editedExample1,
            editedTranslation, editedExample2,
            directoryId, setId) => {
            dispatch(saveCard(id, editedImage, editedPhrase,
                editedTranscription, editedNote, editedExample1,
                editedTranslation, editedExample2,
                directoryId, setId));
        },
        onDelete: (id, setId) => dispatch(deleteCard(id, setId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Card);
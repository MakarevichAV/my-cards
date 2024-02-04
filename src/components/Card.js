import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { editCard, saveCard, deleteCard } from '../redux/actions/cardActions';
import SearchPopup from './SearchPopup';
import { useNavigate } from 'react-router-dom';
import CardEditMode from './CardEditMode';
import '../styles/Card.css';
import CardViewMode from './CardViewMode';


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
    const [isLoading, setIsLoading] = useState(false);
    const [isChanged, setIsChanged] = useState(false);

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
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        width: '70px',
        height: '70px',
        marginRight: '15px',
        borderRadius: '8px'
    };

    const handleInputChange = (valueSetter, e) => {
        valueSetter(e.target.value);
        setIsChanged(true);
    };

    // BLL functions //
    const handleSave = () => {
        if (isChanged) {
            onSave(_id, localEditedImage, localEditedPhrase, localEditedTranscription, localEditedNote, localEditedExample1, localEditedTranslation, localEditedExample2, directoryId, setId);
            setIsChanged(false);
        }
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
            await onDelete(_id, setId);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    };
    // --- //

    // Search PopUp functions //
    const handleSearchClick = () => {
        setIsSearching(true);
    };

    const handleSearchClose = () => {
        setIsSearching(false);
    };

    const handleImageSelect = (selectedImage) => {
        setLocalEditedImage(selectedImage);
        setIsChanged(true);
    };
    // --- //

    return (
        <div className="card-tile">

            {isEditing ? (
                <CardEditMode
                    {...{
                        isConfirmOpen, isLoading, handleCancelConfirm, handleDelete,
                    }}
                    {...{
                        imageStyle, handleSearchClick, isChanged,
                        handleSave, handleDeleteClick, handleInputChange,
                    }}
                    {...{
                        localEditedPhrase, setLocalEditedPhrase,
                        localEditedTranscription, setLocalEditedTranscription,
                        localEditedNote, setLocalEditedNote,
                        localEditedExample1, setLocalEditedExample1,
                        localEditedTranslation, setLocalEditedTranslation,
                        localEditedExample2, setLocalEditedExample2,
                    }}
                />
            ) : (
                <CardViewMode
                    {...{
                        image,
                        defaultImage,
                        phrase,
                        transcription,
                        note,
                        example1,
                        translation,
                        example2,
                    }}
                />
            )}

            {isSearching && (
                <SearchPopup
                    onClose={handleSearchClose}
                    onImageSelect={handleImageSelect}
                />
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
        editedTranscription: ownProps.editedTranscription || '',
        editedNote: ownProps.editedNote || '',
        editedExample1: ownProps.editedExample1 || '',
        editedTranslation: ownProps.editedTranslation || '',
        editedExample2: ownProps.editedExample2 || '',
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
import React from 'react';
import Loader from './Loader';

const CardEditMode = ({
    imageStyle, handleSearchClick, isChanged, handleSave,
    handleDeleteClick, handleInputChange, isConfirmOpen, isLoading,
    handleCancelConfirm, handleDelete, localEditedPhrase, setLocalEditedPhrase,
    localEditedTranscription, setLocalEditedTranscription, localEditedNote,setLocalEditedNote,
    localEditedExample1, setLocalEditedExample1, localEditedTranslation, setLocalEditedTranslation,
    localEditedExample2, setLocalEditedExample2,
}) => (
    <div className="card-tile">
        {isConfirmOpen && (
            <div className="card-popup">
                {isLoading && <Loader />}
                {!isLoading && (
                    <>
                        <div className="card-popup-crose" onClick={handleCancelConfirm}></div>
                        <div className="card-popup-icon"></div>
                        <p className="card-confirm-text">Delete the card?</p>
                        <div className='btn-type1 card-confirm-btn' onClick={handleCancelConfirm}>canсel</div>
                        <div className='btn-type2 card-confirm-btn' onClick={handleDelete}>delete</div>
                    </>
                )}
            </div>
        )}
        <div className="card-side1">
            <div className='card-image-container card-row'>
                <div className="card-image" style={imageStyle}></div>
                <div className="btn-type2-short" onClick={handleSearchClick}><div className="camera"></div></div>
                {isChanged && (
                    <div className="save-card btns" onClick={handleSave}></div>
                )}
                {!isChanged && (
                    <div className="save-card-disact btns"></div>
                )}
                <div className="delete-card btns" onClick={handleDeleteClick}></div>
            </div>
            <input
                className="card-input"
                maxLength="30"
                type="text"
                value={localEditedPhrase}
                onChange={(e) => handleInputChange(setLocalEditedPhrase, e)}
                placeholder="Word or phrase"
            />
            <input
                className="card-input"
                maxLength="30"
                type="text"
                value={localEditedTranscription}
                onChange={(e) => handleInputChange(setLocalEditedTranscription, e)}
                placeholder="Transcription"
            />
            <input
                className="card-input"
                maxLength="30"
                type="text"
                value={localEditedNote}
                onChange={(e) => handleInputChange(setLocalEditedNote, e)}
                placeholder="Additional information"
            />
            <textarea
                className="card-input"
                maxLength="60"
                type="text"
                value={localEditedExample1}
                onChange={(e) => handleInputChange(setLocalEditedExample1, e)}
                placeholder="Example of using this phrase"
            />
        </div>
        <div className="card-side2">
            <input
                className="card-input"
                maxLength="30"
                type="text"
                value={localEditedTranslation}
                onChange={(e) => handleInputChange(setLocalEditedTranslation, e)}
                // onChange={(e) => setLocalEditedTranslation(e.target.value)}
                placeholder="Translation"
            />
            <textarea
                className="card-input"
                maxLength="60"
                type="text"
                value={localEditedExample2}
                onChange={(e) => handleInputChange(setLocalEditedExample2, e)}
                // onChange={(e) => setLocalEditedExample2(e.target.value)}
                placeholder="Additional information"
            />
        </div>
    </div>
);

export default CardEditMode;

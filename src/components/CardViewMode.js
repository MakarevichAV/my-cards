import React from 'react';
import '../styles/CardViewMode.css';

const CardViewMode = ({
    image,
    defaultImage,
    phrase,
    transcription,
    note,
    example1,
    translation,
    example2,
    // localEditedPhrase, setLocalEditedPhrase,
    // localEditedTranscription, setLocalEditedTranscription, localEditedNote,setLocalEditedNote,
    // localEditedExample1, setLocalEditedExample1, localEditedTranslation, setLocalEditedTranslation,
    // localEditedExample2, setLocalEditedExample2,
}) => {

    const imageStyle = {
        backgroundImage: `url(${image || defaultImage})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    return (
        <>
            <div className="card-side1_view">
                <div className="card-image_view" style={imageStyle}></div>
                <p className="card-phrase_view">{phrase}</p>
                {transcription && (
                    <p className="card-transcription_view">[{transcription}]</p>
                )}
                {note && (
                    <p className="card-note_view">{note}</p>
                )}
                {example1 && (
                    <p className="card-example_view">{example1}</p>
                )}
                {/* <div className='card-image-container card-row'>
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
                /> */}
            </div>
            {/* <div className="card-side2--view">
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
            </div> */}
        </>
    )
};

export default CardViewMode;

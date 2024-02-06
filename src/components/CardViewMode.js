import React, { useState } from 'react';
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
}) => {

    const [isFlipped, setIsFlipped] = useState(false);

    const imageStyle = {
        backgroundImage: `url(${image || defaultImage})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    };

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div
            className={`card-tile view-mode ${isFlipped ? 'flipped' : ''}`}
            onClick={handleFlip}
        >
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
            </div>
            <div className="card-side2_view">
                это вторая сторона карточки
            </div>
        </div>
    )
};

export default CardViewMode;

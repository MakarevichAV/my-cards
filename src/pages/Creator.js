import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addSet } from '../redux/actions/setActions';
import { useParams } from 'react-router-dom';
import { getSets } from '../redux/actions/setActions';
import { useLocation } from 'react-router-dom';

import Loader from '../components/Loader';
import Header from '../components/Header';
import Card from '../components/Card';
import '../styles/Creator.css';

const Creator = ({ cards, onAddSet, onGetCards }) => {

    const location = useLocation();
    const setName = location.state?.setName || 'Set';

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { directoryId, setId } = useParams();

    const reversedCards = Array.isArray(cards) ? [...cards].reverse() : [];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true); // Устанавливаем isLoading в true при начале загрузки
                const result = await onGetCards(setId);
                setIsLoading(false); // Устанавливаем isLoading в false после завершения загрузки
            } catch (error) {
                setError(error.message); // Устанавливаем error, если произошла ошибка
                setIsLoading(false); // Устанавливаем isLoading в false в случае ошибки
            }
        };

        fetchData();
    }, [onGetCards, setId]);

    return (
        <div className="creator-page page">
            <Header showAddDirectory={false} showGoToBack={true} />
            <div className="content">
                <div className="creator-container">
                    <div className="content-header">
                        <h2 className="content-title">{setName}</h2>
                        <div className="add-card" onClick={() => onAddSet(directoryId)}></div>
                    </div>
                    <div className="container-content">

                        {isLoading ? (
                            <Loader />
                        ) : error ? (
                            <div className="error-message">
                                <p>{error}</p>
                            </div>
                        ) : reversedCards.length > 0 ? (
                            reversedCards.map((card) => (
                                <Card creating={true} viewing={false} key={card._id} {...card} />
                            ))
                        ) : (
                            <div className="page-description">
                                <p>Your sets will be here</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        cards: state.card,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onGetCards: (setId) => dispatch(getSets(setId)),
        onAddCard: (setId) => dispatch(addSet(setId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Creator);
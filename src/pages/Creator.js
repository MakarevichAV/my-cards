import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addCard } from '../redux/actions/cardActions';
import { useParams } from 'react-router-dom';
import { getCards } from '../redux/actions/cardActions';
import { useLocation } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

import Loader from '../components/Loader';
import Header from '../components/Header';
import Card from '../components/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Creator.css';

const Creator = ({ cards, onAddCard, onGetCards }) => {

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
                    <div className="creator-content-header">
                        <h2 className="content-title">{setName}</h2>
                        <div className="add-card" onClick={() => onAddCard(directoryId, setId)}></div>
                    </div>
                    <div className="container-content">

                        {isLoading ? (
                            <Loader />
                        ) : error ? (
                            <div className="error-message">
                                <p>{error}</p>
                            </div>
                        ) : reversedCards.length > 0 ? (
                            <Carousel interval={null}>
                                {reversedCards.map((card) => (
                                    <Carousel.Item key={card._id}>
                                        <Card creating={true} viewing={false} {...card} />
                                    </Carousel.Item>
                                ))}
                            </Carousel>
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
        onGetCards: (setId) => dispatch(getCards(setId)),
        onAddCard: (directoryId, setId) => dispatch(addCard(directoryId, setId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Creator);
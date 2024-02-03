import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { addCard } from '../redux/actions/cardActions';
import { useParams } from 'react-router-dom';
import { getCards } from '../redux/actions/cardActions';
import { useLocation } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import Loader from '../components/Loader';
import Header from '../components/Header';
import Card from '../components/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/CardsPage.css';

const Viewer = ({ cards, onGetCards }) => {
    
    const cardsContentHeaderStyle = {
        backgroundColor: '#525266'
    };
    
    const navigate = useNavigate();
    const location = useLocation();
    const setName = location.state?.setName || 'Set';
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const { directoryId, setId } = useParams();
    const [activeIndex, setActiveIndex] = useState(0);
    const reversedCards = Array.isArray(cards) ? [...cards].reverse() : [];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const result = await onGetCards(setId);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        fetchData();
    }, [onGetCards, setId]);

    const handleToCreatorClick = () => {
        navigate(`/creator/${directoryId}/${setId}`, { state: { setName: setName } });
    };

    return (
        <div className="cards-page page">
            <Header showAddDirectory={false} showGoToBack={true} />
            <div className="content">
                <div className="cards-container">
                    <div className="cards-content-header" style={cardsContentHeaderStyle}>
                        <h2 className="content-title">{setName}</h2>
                        <div className="cards-header-nav">
                            <div className="go-to-creat" onClick={handleToCreatorClick}></div>
                        </div>
                    </div>
                    <div className="container-content">

                        {isLoading ? (
                            <Loader />
                        ) : error ? (
                            <div className="error-message">
                                <p>{error}</p>
                            </div>
                        ) : reversedCards.length > 0 ? (
                            <Carousel interval={null} activeIndex={activeIndex} onSelect={(index) => setActiveIndex(index)}>
                                {reversedCards.map((card) => (
                                    <Carousel.Item key={card._id}>
                                        <Card creating={false} viewing={true} {...card} />
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Viewer);
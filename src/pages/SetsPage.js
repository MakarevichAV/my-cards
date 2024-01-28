import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { addSet } from '../redux/actions/setActions';
import { useParams } from 'react-router-dom';
import { getSets } from '../redux/actions/setActions';
import { useLocation } from 'react-router-dom';

import Loader from '../components/Loader';
import Header from '../components/Header';
import SetTile from '../components/SetTile';
import '../styles/SetsPage.css';

const SetsPage = ({ sets, onAddSet, onGetSets }) => {

    const location = useLocation();
    const directoryName = location.state?.directoryName || 'Directory';

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const { directoryId } = useParams();

    const reversedSets = Array.isArray(sets) ? [...sets].reverse() : [];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true); // Устанавливаем isLoading в true при начале загрузки
                const result = await onGetSets(directoryId);
                setIsLoading(false); // Устанавливаем isLoading в false после завершения загрузки
            } catch (error) {
                setError(error.message); // Устанавливаем error, если произошла ошибка
                setIsLoading(false); // Устанавливаем isLoading в false в случае ошибки
            }
        };

        fetchData();
    }, [onGetSets, directoryId]);

    return (
        <div className="sets-page page">
            <Header showAddDirectory={false} showGoToBack={true} />
            <div className="content">
                <div className="sets-container">
                    <div className="sets-content-header">
                        <h2 className="sets-title">{directoryName}</h2>
                        <div className="add-set" onClick={() => onAddSet(directoryId)}></div>
                    </div>
                    <div className="container-content">

                        {isLoading ? (
                            <Loader />
                        ) : error ? (
                            <div className="error-message">
                                <p>{error}</p>
                            </div>
                        ) : reversedSets.length > 0 ? (
                            reversedSets.map((set) => (
                                <SetTile key={set._id} {...set} />
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
        sets: state.set,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onGetSets: (directoryId) => dispatch(getSets(directoryId)),
        onAddSet: (directoryId) => dispatch(addSet(directoryId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetsPage);
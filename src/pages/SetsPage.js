import React from 'react';
import { connect } from 'react-redux';
import { addSet } from '../redux/actions/setActions';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import SetTile from '../components/SetTile';
import '../styles/SetsPage.css';

const SetsPage = ({ sets, onAddSet }) => {

    const { directoryId } = useParams();
    // console.log(directoryId);
    const reversedSets = Array.isArray(sets) ? [...sets].reverse() : [];


    return (
        <div className="sets-page page">
            <Header showAddDirectory={false} showGoToBack={true} />
            <div className="content">
                <div className="sets-container">
                    <div className="content-header">
                        <h2 className="sets-title">English</h2>
                        <div className="add-set" onClick={() => onAddSet(directoryId)}></div>
                    </div>
                    <div className="container-content">
                        {reversedSets.length > 0 ? (
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
        sets: state.sets,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onAddSet: (directoryId) => dispatch(addSet(directoryId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SetsPage);
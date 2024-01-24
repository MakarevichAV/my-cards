import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import SetTile from '../components/SetTile';
import '../styles/SetsPage.css';

const SetsPage = () => {

    const { directoryId } = useParams();

    return (
        <div className='sets-page page'>
            <Header showAddDirectory={false} showGoToBack={true} />
            <div className="content">
                <div className="sets-container">
                    <h2 className="sets-title">English</h2>
                    <SetTile />
                    <SetTile />
                </div>
            </div>
        </div>
    );
};

export default SetsPage;
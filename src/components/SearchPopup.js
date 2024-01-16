import React from 'react';
import '../styles/Popup.css';

const SearchPopup = ({ onClose, onSearch, searchResults }) => {
    return (
        <div className="search-popup">
            <div className="search-header">
                <input type="text" onChange={(e) => onSearch(e.target.value)} placeholder="Поиск" />
                <div className="close-icon" onClick={onClose}></div>
            </div>
            <div className="search-results">

                {/* {searchResults.map((result) => (
                    <div key={result.id}>{result.name}</div>
                ))} */}

            </div>
        </div>
    );
};

export default SearchPopup;
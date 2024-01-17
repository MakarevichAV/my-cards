import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Popup.css';

const SearchPopup = ({ onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `https://pixabay.com/api/?key=33256265-9311bbeda59bd85787262c6fb&q=${encodeURIComponent(searchQuery)}&image_type=vector`
            );

            setSearchResults(response.data.hits);
        } catch (error) {
            console.error('Error searching images:', error);
        }
    };

    return (
        <div className="search-popup">
            <div className="search-header">
                <input
                    type="text"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск"
                />
                <button onClick={handleSearch}>Искать</button>
                <div className="close-icon" onClick={onClose}></div>
            </div>
            <div className="search-results">
                {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                        <div className="search-item" key={result.id} style={{
                            backgroundImage: `url(${result.previewURL})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}>
                            {/* <img src={result.previewURL} alt={result.tags} /> */}
                        </div>
                    ))
                ) : (
                    <p>Нет результатов поиска</p>
                )}
            </div>
        </div>
    );
};

export default SearchPopup;

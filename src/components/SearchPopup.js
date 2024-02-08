import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Popup.css';

const SearchPopup = ({ onClose, onImageSelect }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.get(
                `https://pixabay.com/api/?key=33256265-9311bbeda59bd85787262c6fb&q=${encodeURIComponent(searchQuery)}&image_type=illustration&per_page=50`
            );

            setSearchResults(response.data.hits);
        } catch (error) {
            console.error('Error searching images:', error);
        }
    };

    const handleImageSelect = (imageUrl) => {
        onImageSelect(imageUrl);
        onClose();
    };

    return (
        <div className="search-popup">
            <div className="search-header">
                <div className='search-input-wrap'>
                    <input
                        type="text"
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSearch();
                            }
                        }}
                        placeholder="Searching image"
                    />
                    <div className='loupe' onClick={handleSearch}></div>
                </div>
                <div className="close-icon" onClick={onClose}></div>
            </div>
            <div className="search-results">
                {searchResults.length > 0 ? (
                    searchResults.map((result) => (
                        <div className="search-item" key={result.id}
                            onClick={() => handleImageSelect(result.previewURL)}
                            style={{
                                backgroundImage: `url(${result.previewURL})`,
                                backgroundSize: 'contain'
                            }}>
                        </div>
                    ))
                ) : (
                    <p className="search-result-note">No search results. Try changing your search query.</p>
                )}
            </div>
        </div>
    );
};

export default SearchPopup;

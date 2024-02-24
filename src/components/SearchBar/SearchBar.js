import React, { useState, useCallback } from 'react';
import './SearchBar.css';

const SearchBar = (props) => {
    const [term, setTerm] = useState('');

    const handleTermChange = useCallback((event) => {
        setTerm(event.target.value);
    }, []);

    return (
        <div className="SearchBar">
            <input placeholder="Enter A Song Title" onChange={handleTermChange} />
            <button className="SearchButton">SEARCH</button>
        </div>
    );
}

export default SearchBar;
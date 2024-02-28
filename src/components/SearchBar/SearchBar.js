import React, { useState, useCallback } from 'react';
import './SearchBar.css';

const SearchBar = (props) => {
    const [term, setTerm] = useState(props.searchTerm || '');

    const handleTermChange = useCallback((event) => {
        setTerm(event.target.value);
    }, []);

    const search = () => {
        localStorage.setItem('searchTerm', term);
        props.onSearch(term);
    }

    return (
        <div className="SearchBar">
            <input 
                placeholder="Enter A Song Title" 
                onChange={handleTermChange} 
            />
            <button className="SearchButton" onClick={search}>SEARCH</button>
        </div>
    );
}

export default SearchBar;
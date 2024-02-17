import React from "react";

const SearchResults = ({ onAdd }) => {
  return (
    <div>
      <button onClick={() => onAdd}>+</button>
    </div>
  );
};

export default SearchResults;


import React from "react";

const Tracklist = ( { tracks }) => {
  return (
    <div>
      {tracks.map(track => (
        <div key={track.id}>
          <p>{track.name}</p>
          <p>{track.artist}</p>
          <p>{track.album}</p>
        </div>
      ))}
    </div>
  );
};

export default Tracklist;


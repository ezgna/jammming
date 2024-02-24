import React from "react";
import Tracklist from "./Tracklist";

const Playlist = ({ playlistName, playlistTracks }) => {
  return (
    <div>
      <h2>{playlistName}</h2>
      <Tracklist tracks={playlistTracks} />
      <button className="Playlist-save">SAVE TO SPOTIFY</button>
    </div>
  );
};

export default Playlist;


import React, { useCallback } from "react";
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

const Playlist = ({playlistName, playlistTracks, onNameChange, onRemove, onSave, onPlayPreview}) => {
    const handleNameChange = useCallback((event) => {
        onNameChange(event.target.value);
    }, [onNameChange])

    return (
        <div className="Playlist">
            <input 
                defaultValue={playlistName} 
                onChange={handleNameChange} 
            />
            <TrackList
                tracks={playlistTracks}
                onRemove={onRemove}
                isRemoval={true} 
                onPlayPreview={onPlayPreview}
            />
            <button className="Playlist-save" onClick={onSave}>SAVE TO SPOTIFY</button>
        </div>
    )
}

export default Playlist;
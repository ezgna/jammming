import React, { useCallback } from "react";
import './Track.css';

const Track = ({ track, onAdd, onRemove, isRemoval, onPlayPreview }) => {

    const addTrack = useCallback(() => {
        onAdd(track);
    }, [onAdd, track]);

    const removeTrack = useCallback(() => {
        onRemove(track);
    }, [onRemove, track]);

    const renderAction = () => {
        if (isRemoval) {
            return (
                <button className="Track-action" onClick={removeTrack}>
                    -
                </button>
            );
        }
        return (
            <button className="Track-action" onClick={addTrack}>
                +
            </button>
        );
    };


    return (
        <div className="Track">
            <div className="Track-information">
                <h3>{track.name}</h3>
                {renderAction()}
                <div className="Track-details">
                    <p>{track.artist}  |  {track.album}</p>
                </div>
                <button onClick={() => onPlayPreview(track.previewUrl)}>▶</button>
            </div>
        </div>
    );
};

export default Track;

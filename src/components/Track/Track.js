import React, { useCallback } from "react";
import './Track.css';

const Track = (props) => {

    const addTrack = useCallback(() => {
        props.onAdd(props.track);
    }, [props.onAdd, props.track]);

    const removeTrack = useCallback(() => {
        props.onRemove(props.track);
    }, [props.onRemove, props.track]);

    const renderAction = () => {
        if (props.isRemoval) {
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
                <h3>{props.track.name}</h3>
                {renderAction()}
                <div className="Track-details">
                    <p>{props.track.artist}</p>
                    <p>{props.track.album}</p>
                </div>
            </div>
        </div>
    );
};

export default Track;
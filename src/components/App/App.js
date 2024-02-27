import React, { useState, useCallback } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

function App() {

  const [searchResults, setSearchResults] = useState([]);

  const search = useCallback((term) => {
    Spotify.search(term).then(searchResults => {
      setSearchResults(searchResults);
    });
  }, []);


  const [playlistTracks, setPlaylistTracks] = useState([]);

  const addTrack = useCallback((track) => {
    if (playlistTracks.some((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
  }, [playlistTracks, setPlaylistTracks]);

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) => 
      prevTracks.filter((savedTrack) => savedTrack.id !== track.id));
  }, [setPlaylistTracks]);


  const [playlistName, setplaylistName] = useState('New Playlist');

  const updatePlaylistName = useCallback((name) => {
    setplaylistName(name);
  }, []);


  const savePlaylist = useCallback(() => {
    const playlistTracksUris = playlistTracks.map((track) => track.uri);
    if (!playlistName || !playlistTracksUris.length) {
      return;
    }
    Spotify.getUserID().then(userID => {
      Spotify.createPlaylist(userID, playlistName).then(playlistID => {
        Spotify.addTracksToPlaylist(playlistID, playlistTracksUris).then(() => {
          setplaylistName('New Playlist');
          setPlaylistTracks([]);
        });
      });
    });
  }, [playlistTracks, setPlaylistTracks, playlistName, setplaylistName]);


  const [playingAudio, setPlayingAudio] = useState(null);
  const [lastPlayedTime, setLastPlayedTime] = useState(0);

  const playPreview = useCallback((previewUrl) => {
    if (playingAudio) {
      if (playingAudio.src === previewUrl) {
        if (!playingAudio.paused) {
          playingAudio.pause();
          setLastPlayedTime(playingAudio.currentTime);
          return;
        } else {
          playingAudio.currentTime = lastPlayedTime;
          playingAudio.play();
          return;
        }
      }
      playingAudio.pause();
      playingAudio.currentTime = 0;
    }
    const audio = new Audio(previewUrl);
    audio.play();
    setPlayingAudio(audio);
    setLastPlayedTime(0);

    audio.onended = () => {
      setPlayingAudio(null);
      setLastPlayedTime(0);
    }
  }, [playingAudio, setPlayingAudio, lastPlayedTime, setLastPlayedTime]);


  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults 
            searchResults={searchResults} 
            onAdd={addTrack} 
            onPlayPreview={playPreview}
          />
          <Playlist 
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            playlistName={playlistName}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
            onPlayPreview={playPreview}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

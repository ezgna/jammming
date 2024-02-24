import React, { useState, useCallback } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

function App() {
 
  const searchResults = [
    {
      name: 'name1',
      artist: 'artist1',
      album: 'album1',
      id: 1,
      uri: 'spotify:track:6rqhFgbbKwnb9MLmUQDhG6'
    },
    {
      name: 'name2',
      artist: 'artist2',
      album: 'album2',
      id: 2,
      uri: 'spotify:track:5CQ30WqJwcep0pYcV4AMNc'
    },
    {
      name: 'name3',
      artist: 'artist3',
      album: 'album3',
      id: 3,
      uri: 'spotify:track:4CJVkjo5WpmUAKp3R44LNb'
    }
  ]


  const [playlistTracks, setPlaylistTracks] = useState([]);

  const addTrack = useCallback((track) => {
    if (playlistTracks.some((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
  }, [playlistTracks]);

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) => 
      prevTracks.filter((savedTrack) => savedTrack.id !== track.id));
  }, [playlistTracks]);


  const [playlistName, setplaylistName] = useState(['New Playlist']);

  const updatePlaylistName = useCallback((name) => {
    setplaylistName(name);
  }, []);


  const savePlaylist = useCallback(() => {
    const playlistTracksUris = playlistTracks.map((track) => track.uri);
    console.log(playlistTracksUris);
    setplaylistName('New Playlist');
    setPlaylistTracks([]);
  }, [playlistTracks]);

  return (
    <div>
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar />
        <div className="App-playlist">
          <SearchResults 
            searchResults={searchResults} 
            onAdd={addTrack} 
          />
          <Playlist 
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            playlistName={playlistName}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
}

export default App;

import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [searchTerm, setSearchTerm] = useState(localStorage.getItem('searchTerm') || '');

  const search = useCallback((term) => {
    Spotify.search(term).then(searchResults => {
      const filteredResults = searchResults.filter(searchResult => 
        !playlistTracks.some(playlistTrack => playlistTrack.id === searchResult.id));
      setSearchResults(filteredResults);
    });
  }, [playlistTracks]);

  useEffect(() => {
    if (searchTerm) {
      search(searchTerm);
    }
  }, []);


  const addTrack = useCallback((track) => {
    if (playlistTracks.some((savedTrack) => savedTrack.id === track.id)) {
      return;
    }
    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
    localStorage.setItem('playlistTracks', JSON.stringify(playlistTracks));
    setSearchResults((prevResults) => 
      prevResults.filter((searchResult) => searchResult.id !== track.id));
  }, [playlistTracks]);

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) => 
      prevTracks.filter((savedTrack) => savedTrack.id !== track.id));
    localStorage.setItem('playlistTracks', JSON.stringify(playlistTracks));
  }, [playlistTracks]);


  const [playlistName, setplaylistName] = useState('New Playlist');

  const updatePlaylistName = useCallback((name) => {
    setplaylistName(name);
    localStorage.setItem('playlistName', playlistName);
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  const savePlaylist = useCallback(() => {
    setIsLoading(true);
    const playlistTracksUris = playlistTracks.map((track) => track.uri);
    if (!playlistName || !playlistTracksUris.length) {
      setIsLoading(false);
      return;
    }
    Spotify.getUserID().then(userID => {
      Spotify.createPlaylist(userID, playlistName).then(playlistID => {
        Spotify.addTracksToPlaylist(playlistID, playlistTracksUris).then(() => {
          setplaylistName('New Playlist');
          setPlaylistTracks([]);
          setIsLoading(false);
        });
      });
    });
  }, [playlistTracks, setPlaylistTracks, playlistName, setplaylistName]);


  
  useEffect(() => {
    const savedPlaylistName = localStorage.getItem('playlistName');
    const savedPlaylistTracks = JSON.parse(localStorage.getItem('playlistTracks'));
    if (savedPlaylistName && savedPlaylistTracks) {
      setPlaylistTracks(savedPlaylistTracks);
      setplaylistName(savedPlaylistName);
    }
  }, []);


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
      {isLoading && <div className="loading-overlay"></div>}
      <h1>Ja<span className="highlight">mmm</span>ing</h1>
      <div className="App">
        <SearchBar onSearch={search} searchTerm={searchTerm} />
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

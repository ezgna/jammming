// import logo from '../logo.svg';
import React, { useState } from 'react';
import '../App.css';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import Playlist from './Playlist';

function App() {
  const [playlistName, setPlaylistName] = useState("New Playlist");
  const [playlistTracks, setPlaylistTracks] = useState(
    [{
      name: "name1",
      artist: "artist1",
      album: "album1",
      id: 1
    },
    {
      name: "name2",
      artist: "artist2",
      album: "album2",
      id: 2
    },
    {
      name: "name3",
      artist: "artist3",
      album: "album3",
      id: 3
    }]);

  const addTrack = (track) => {
    if (playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    setPlaylistTracks([...playlistTracks, track]);
  }

  return (
    <>
      <SearchBar />
      <SearchResults onAdd={addTrack} />
      <Playlist playlistName={playlistName} playlistTracks={playlistTracks}/>
    </>
  )


  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;

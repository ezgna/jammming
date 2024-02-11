import React, { useState } from "react";
import Track from "./Track";

const tracks = [
  {
    name: "name1",
    artist: "artist1",
    album: "album1",
    id: "id1",
  },
  {
    name: "name2",
    artist: "artist2",
    album: "album2",
    id: "id2",
  },
  {
    name: "name3",
    artist: "artist3",
    album: "album3",
    id: "id3",
  },
];

const SearchBar = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={() => console.log(search)}>Search</button>
      <div>
        {tracks.map((track) => (
          <Track track={track} key={track.id} />
        ))}
      </div>
    </div>
  );
};

export default SearchBar;


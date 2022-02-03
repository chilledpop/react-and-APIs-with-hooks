import React from "react";
import { useState, useEffect } from "react";

function AlbumList({ user = {} }) {
  const [albums, setAlbums] = useState([]);
  
  useEffect(() => {
    setAlbums({});
    const abortController = new AbortController();
    
    async function loadAlbums() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/albums?userId=${user.id}`,
          { signal: abortController.signal }
        );
        const albumsFromAPI = await response.json();
        setAlbums(albumsFromAPI);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted", albums)
        } else {
          throw error;
        }
      }
    }
    
    if (user.id) {
      console.log("Loading albums", user.id)
      loadAlbums();
      return () => {
        console.log("cleanup", user.id);
        abortController.abort();
      }
    }
  }, [user]);
  
  if (albums.length) {
    return (
      <div>
        <h2>{user.name} Albums</h2>
        <ul>
          {albums.map((album) => (
            <li key={album.id} >
              {album.id} - {album.title}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  return <p>Please click on a user name to the left</p>;
}


export default AlbumList;
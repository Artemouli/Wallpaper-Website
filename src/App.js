import React from 'react';
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import {useState, useEffect} from 'react';
import './App.css';

const App = () => {
  const [wallpapers, setWallpapers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetch('/media-1a-i-p~s.json')
    .then((response) => response.json())
    .then((jsonData) => {
      const wallpaperArray = [];
      for (const key in jsonData.data)
      {
        const wallpaperImage = Object.values(jsonData.data[key]);
        wallpaperArray.push(wallpaperImage);
      }
      //console.log(wallpaperArray)
      //console.log(wallpaperArray[0][0]);
      setWallpapers(wallpaperArray);
  })
    .catch((error) => console.error('error fetching data:', error))
  }, []);

  //tracks how many cards to show per page
  const itemsPerPage = 10;
  //calculates the total number of pages
  const totalPages = Math.ceil(wallpapers.length / itemsPerPage);

  //handles displaying the current items for the page
  const currentItems = wallpapers.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 0)
    {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages - 1)
    {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="App">
      <div>
          <Container className="flex-container">
          {currentItems.map((wallpaperImage, index) => (
            <div className="flex-item" key={index} >
              <Image src={wallpaperImage[0]} onClick={onclick} style={{cursor: "pointer" }} className="flex-image" />
            </div>
          ))} 
          </Container>
        {/* Pagination controls */}
        <button onClick={handlePrevPage} disabled={currentPage === 0}>
          Previous Page
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages - 1}>
          Next Page
        </button>
      </div>
    </div>
  );
}

export default App;

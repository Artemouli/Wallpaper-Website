import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
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
      <div className='mt-2'>
        <Row xs={1} md={2} className="g-3">
        {currentItems.map(wallpaperImage => (
          <Card onClick={onclick} style={{ width: '12rem', cursor: "pointer" }}>
              <Card.Img src={wallpaperImage[0]} className='img-fluid' />
            </Card>
        ))} 
        </Row>
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

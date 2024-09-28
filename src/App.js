import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {useState, useEffect} from 'react';
import './App.css';

const App = () => {
  const [wallpapers, setWallpapers] = useState([]);
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
  return (
    <div className="App">
      <div className='mt-2'>
        <Row xs={1} md={2} className="g-4">
        {wallpapers.map(wallpaperImage => (
          <Card style={{ width: '18rem' }}>
              <Card.Body>
                <Card.Img src={wallpaperImage[0]} />
                <Card.Title>Card Title</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
        ))} 
        </Row>
      </div>
    </div>
  );
}

export default App;

import React from 'react'
import './styles/Tile.css'
import Rating from '@mui/material/Rating';
const Tile = () => {
  return (
    <div className="tilecontainer">
      <div className="tileimagecontainer">
        <center>
          <img className="tileimage" src="https://th.bing.com/th/id/OIP.rUzy40YTQwutONZQmKgwIwHaHa?pid=ImgDet&rs=1" alt='img' />
        </center>
      </div>
      <div className="tiletextcontainer">
        <div className="tiletexttitle">
          Iphone 14
        </div>
        <div className="tiletextauthor">
          Apple Inc.
        </div>
        <div className="tiletextprice">
          $999.99
        </div>
        <div className="tiletextrating">
          <Rating value={3.5} readOnly />
        </div>
      </div>
    </div>
  )
}

export default Tile
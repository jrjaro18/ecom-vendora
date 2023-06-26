import React from 'react'
import './styles/Tile.css'
import Rating from '@mui/material/Rating';
const Tile = (data) => {
  const { title, author, price, ratings, image } = data.data.item;
  console.log(data.data.item);
  const handleClick = () => {
    window.location.href = `/product/?=${data.data.item._id}`;
  }
  return (
    <div className="tilecontainer"onClick={()=>{handleClick()}}>
      <div className="tileimagecontainer">
        <center>
          <img className="tileimage" src={`http://localhost:5000/uploads/${image[0]}`} alt={`${image[0]}`} />
        </center>
      </div>
      <div className="tiletextcontainer">
        <div className="tiletexttitle">
          {title}
        </div>
        <div className="tiletextprice">
          ${price}
        </div>
        <div className="tiletextrating">
          <Rating value={ratings} readOnly />
        </div>
      </div>
    </div>
  )
}

export default Tile
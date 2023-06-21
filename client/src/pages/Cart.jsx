import React from 'react'
import "./styles/Cart.css"
import Navbar from '../components/Navbar'
import Tile from '../components/Tile'
import Button from '@mui/material/Button'
import Footer from '../components/Footer'
const Cart = () => {
  return (
    <div className='cartpagebody'>
        <Navbar/>
        <div className='cartpagecontainer'>
            <div className='cartpagegrid'>
                <div className='cartpageitemdiv'>
                    <Tile/>
                    <Button style={{backgroundColor:'black',}}>Remove from Cart</Button>
                </div>
                <div className='cartpageitemdiv'>
                    <Tile/>
                    <Button style={{backgroundColor:'black',}}>Remove from Cart</Button>
                </div>
                <div className='cartpageitemdiv'>
                    <Tile/>
                    <Button style={{backgroundColor:'black',}}>Remove from Cart</Button>
                </div>
                <div className='cartpageitemdiv'>
                    <Tile/>
                    <Button style={{backgroundColor:'black',}}>Remove from Cart</Button>
                </div>
                <div className='cartpageitemdiv'>
                    <Tile/>
                    <Button style={{backgroundColor:'black',}}>Remove from Cart</Button>
                </div>
            </div>
            <div className='cartpagecheckout'>
                <Button variant='contained' style={{fontSize:"1.2rem"}}>Checkout</Button>
                <div className='cartpagecheckoutprice'>
                    Total Price: $100
                </div>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Cart
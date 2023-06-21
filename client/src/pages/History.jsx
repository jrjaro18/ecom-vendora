import React from 'react'
import Navbar from '../components/Navbar'
import Button from '@mui/material/Button'
import Tile from '../components/Tile'
import './styles/History.css'
import Footer from '../components/Footer'
const History = () => {
  return (
    <div className='historypagebody'>
        <Navbar />
        <div className='historycontainer'>
            <div className='historybutton'>
                <Button variant="contained" color="primary" fullWidth>
                    Customer
                </Button>
                <Button variant="contained" color="success" fullWidth>
                    Seller
                </Button>
            </div>
            <div className='historygrid'>
                <Tile />
                <Tile />
                <Tile />
                <Tile />
                <Tile />
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default History
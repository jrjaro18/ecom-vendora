import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./styles/Cart.css"
import Navbar from '../components/Navbar'
import Tile from '../components/Tile'
import Button from '@mui/material/Button'
import Footer from '../components/Footer'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
const { toast, ToastContainer } = require('react-toastify');
const Cart = () => {
    const [results, setResults] = useState([])
    const [price, setPrice] = useState(0)
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('http://localhost:5000/api/user/get/cartItems', {
                withCredentials: true,
            });
            if (res.status === 200) {
                console.log(res.data.cart);
                setResults(res.data.cart);
                setPrice(res.data.userCartPrice);
            } else if (res.status === 288) {
                window.location.href = '/login'
            } else {
                toast.error(res.data, {
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                })
            }
        }
        fetchData()
    }, [])

    const handleCheckout = async () => {
        if (results.length === 0) {
            toast.error('Cart is empty', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: true,
            })
        }
        else {
            window.location.href = '/checkout'
        }
    }

    return (
        <div className='cartpagebody'>
            <Navbar />
            <div className='cartpagecontainer'>
                <div className='cartpageheader'>
                    <div>Your Cart</div> <ShoppingCartOutlinedIcon style={{ fontSize: "3vmax" }} />
                </div>
                <div className='cartpagegrid'>
                    {results.map((result) => (

                        <Tile key={result._id} data={result} />
                    ))}
                </div>
            </div>
            <div className='cartpagecheckout'>
                <Button variant='contained' style={{ fontSize: "1.2rem" }} onClick={() => { handleCheckout() }}>Checkout</Button>
                <div className='cartpagecheckoutprice'>
                    Total Price: ${price}
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    )
}

export default Cart
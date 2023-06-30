import React, { useEffect, useState } from 'react'
import axios from 'axios'
import "./styles/Wishlist.css"
import Navbar from '../components/Navbar'
import Tile from '../components/Tile'
import Footer from '../components/Footer'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
const { toast, ToastContainer } = require('react-toastify');
const Wishlist = () => {
    const [results, setResults] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('https://vendora-ecom.onrender.com/api/user/get/wishlistItems', {
                withCredentials: true,
            });
            if (res.status === 200) {
                console.log(res.data.wishlist);
                setResults(res.data.wishlist);
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
    return (
        <div className='wishlistpagebody'>
            <Navbar />
            <div className='wishlistpagecontainer'>
                <div className='wishlistpageheader'>
                    <div>Your Wishlist</div> <FavoriteBorderOutlinedIcon style={{ fontSize: "3vmax" }} />
                </div>
                <div className='wishlistpagegrid'>
                    {results.map((result) => (
                        <Tile key={result._id} data={result} />
                    ))}
                </div>
            </div>
            <Footer />
            <ToastContainer />
        </div>
    )
}

export default Wishlist
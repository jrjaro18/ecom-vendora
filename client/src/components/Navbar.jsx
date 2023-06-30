import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal';
import axios from 'axios';
import Box from '@mui/material/Box';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InfoIcon from '@mui/icons-material/Info';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';
import FavoriteIcon from '@mui/icons-material/Favorite';
import './styles/Navbar.css'
const Navbar = () => {
    const style = {
        position: 'absolute',
        top: '14.5%',
        left: '80%',
        transform: 'translate(-50%, -50%)',
        width: '30vw',
        bgcolor: 'rgb(22, 23, 24)',
        border: '0px',
        boxShadow: 20,
        paddingLeft: "24px",
        paddingRight: "24px",

    };
    const [userDetails, setUserDetails] = useState({});
    useEffect(() => {
        setUserDetails(JSON.parse(localStorage.getItem('userDetails')));
    }, [])

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleLogout = async () => {

        try {
            const res = await axios.post('https://vendora-ecom.onrender.com/api/user/logout', {}, { withCredentials: true });
            localStorage.removeItem("userDetails");
            window.location.href = '/';
            console.log(res);

        } catch (err) {
            console.log(err);
        }
    }
    return (
        <div className='navbarcontainer'>
            <div className="navbarlogo">
                <a href="/">V E N D O R A</a>
            </div>
            <div className='navbarlist'>
                <ul>
                    <li><a href="/wishlist" style={{ display: 'flex', alignItems: "center", color: "#ef597c", padding: "5px" }}><FavoriteIcon /></a></li>
                    <li><a href="/cart" style={{ display: 'flex', alignItems: "center", color: "#9773d1", padding: "5px" }}><ShoppingCartIcon /></a></li>
                    <li><a href="/your-products" style={{ display: 'flex', alignItems: "center", color: "#a7df8a", padding: "5px" }}><CategoryIcon /></a></li>
                    {
                        userDetails ?
                            <li><div style={{ cursor: "pointer", display: 'flex', alignItems: "center", padding: "5px", color: "white" }} onClick={() => { handleLogout() }}><LogoutIcon /></div></li> :
                            <li><a href="/login" style={{ display: 'flex', alignItems: "center", padding: "5px" }}><PersonIcon /></a></li>
                    }
                    <li className="more" onClick={handleOpen}><MoreVertIcon style={{ color: "#f0dcdc" }} /></li>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <ul className='menulist'>
                                <li><a href="/your-products" className='menulistitem'><CategoryIcon />Products</a></li>
                                <li><a href="/cart" className='menulistitem'><ShoppingCartIcon />Cart</a></li>
                                <li><a href="/wishlist" className='menulistitem'><FavoriteIcon />Wishlist</a></li>
                                {
                                    userDetails ?
                                        <li><div href="/" style={{ cursor: "pointer", color: "white" }} onClick={() => { handleLogout() }} className='menulistitem'><LogoutIcon />Logout</div></li> :
                                        <li><a href="/login" className='menulistitem'><PersonIcon />Login</a></li>
                                }
                            </ul>
                        </Box>
                    </Modal>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
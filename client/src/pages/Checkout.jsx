import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './styles/Checkout.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { toast, ToastContainer } from 'react-toastify'
import Button from '@mui/material/Button';
import { LinearProgress, TextField } from '@mui/material'
import { InputLabel, MenuItem, Select, FormControl } from '@mui/material';
import indianStatesData from '../data/indian-states.json';
const Checkout = () => {
    const [details, setDetails] = useState({})
    const [loading, setLoading] = useState(true)
    const [pincode, setPincode] = useState(100000);
    const indianStates = indianStatesData.states;
    console.log(indianStates);
    const handlePincodeChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue <= 999999) {
            setPincode(inputValue);
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('http://localhost:5000/api/user/get/cartItems', { withCredentials: true });
            if (res.status === 200) {
                setDetails(res.data)
                setLoading(false)
            }
            else if (res.status === 288) {
                window.location.href = '/login'
            } else {
                toast.error(res.data.message, {
                    position: 'top-center',
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true
                })
            }
        }

        fetchData()
    }, [])

    return (
        <div className='checkoutbody'>
            <div className='checkoutcontainer'>
                {!loading ? (
                    <div className='checkoutform'>
                        <div className='checkoutformheader'>
                            Checkout
                        </div>
                        <div className='checkoutformbody'>
                            <form className="checkoutform">
                                <div>
                                    <TextField id="outlined-basic" defaultValue={(details.userDetails.firstname + " " + details.userDetails.lastname)} label="Name" disabled={true} variant="outlined" color="secondary"
                                        style={{ width: "49%" }}
                                        inputProps={{
                                            style: { color: 'white', fontFamily: "Poppins", cursor: "none" },
                                        }}
                                    />
                                </div>
                                <div className='statepin'>
                                    <TextField id="outlined-basic" label="Zipcode" variant="outlined" name="pincode" className="pincode" type='number' onChange={(e) => { handlePincodeChange(e) }} value={pincode} inputProps={{
                                        style: { color: 'white', fontFamily: "Poppins" },
                                    }} color="warning" fullWidth />

                                    
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">State</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            fullWidth
                                            style={{color:"white"}}
                                        >
                                            {
                                                indianStates.map((state) => {
                                                    return (
                                                        <MenuItem value={state}>{state}</MenuItem>
                                                    )
                                                })
                                            }

                                        </Select>
                                    </FormControl>
                                </div>
                                <TextField
                                    id="outlined-multiline-static"
                                    label="Address"
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    inputProps={{
                                        style: { color: 'white', fontFamily: "Poppins", fontSize: "1rem" },
                                    }}
                                    color="secondary"
                                />
                                <div className="orderDetails">
                                    <div className='orderprice'>
                                        ${details.userCartPrice}
                                    </div>
                                    <div className='gotocart'>
                                        <a href='/cart'>See Your Items</a>
                                    </div>
                                </div>
                                <center><Button variant="contained" color="success" className='checkoutbtn' >
                                Go to Payment
                                </Button>
                                </center>
                            </form>
                        </div>
                    </div>
                )
                    : (<div>
                        <LinearProgress />
                    </div>)}
            </div>

            <ToastContainer />
        </div>
    )
}

export default Checkout
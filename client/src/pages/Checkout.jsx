import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './styles/Checkout.css'
import { toast, ToastContainer } from 'react-toastify'
import Button from '@mui/material/Button';
import { LinearProgress, TextField } from '@mui/material'
import { InputLabel, MenuItem, Select, FormControl } from '@mui/material';
import indianStatesData from '../data/indian-states.json';
import useRazorpay from "react-razorpay";

const Checkout = () => {
    const [details, setDetails] = useState({})
    const [loading, setLoading] = useState(true)
    const [pincode, setPincode] = useState(100000);
    const [address, setAddress] = useState("");
    const [state, setState] = useState("");
    const Razorpay = useRazorpay();

    const indianStates = indianStatesData.states;
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


    const handleCheckoutSubmit = async (e) => {
        e.preventDefault();
        console.log(pincode, address, state);
        try {
            const res = await axios.post('http://localhost:5000/api/user/checkout', { pincode, address, state, price: details.userCartPrice }, { withCredentials: true });
            const userDetails = res.data.userDetails;

            const options = {
                key: 'rzp_test_Rqd4zv4q3wn425', // Replace with your Razorpay API key
                amount: res.data.order.amount, // Pass the order amount
                currency: 'USD', // Replace with the appropriate currency code
                name: 'Vendora', // Replace with your company name
                description: res.data.order.receipt,
                order_id: res.data.order.id, // Pass the order ID
                //success
                callback_url: `http://localhost:5000/api/user/checkout/success/:${userDetails._id}}`,
                prefill: {
                    name: userDetails.firstname + " " + userDetails.lastname,
                    email: userDetails.email,
                },
            };
            const rzpay = new Razorpay(options);
            rzpay.open();
            rzpay.on('payment.failed', function (response) {
                toast.error(response.error.description, {
                    position: 'top-center',
                    autoClose: 1500,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true
                })

            });

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div className='checkoutbody'>
            <div className='checkoutcontainer'>
                {!loading ? (
                    <div className='checkoutform'>
                        <div className='checkoutformheader'>
                            Checkout
                        </div>
                        <div className='checkoutformbody'>
                            <form className="checkoutform" onSubmit={(e) => { handleCheckoutSubmit(e) }}>
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
                                            style={{ color: "white" }}
                                            onChange={(e) => { setState(e.target.value) }}
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
                                    onChange={(e) => { setAddress(e.target.value) }}
                                />
                                <div className="orderDetails">
                                    <div className='orderprice'>
                                        ${details.userCartPrice}
                                    </div>
                                    <div className='gotocart'>
                                        <a href='/cart'>See Your Items</a>
                                    </div>
                                </div>
                                <center><Button variant="contained" color="success" className='checkoutbtn' type="submit" sx={{
                                    width: "40%",
                                    backgroundColor: "#52cc1e",
                                    boxShadow: '0 0 15px #3cd00f',
                                    '&:hover': {
                                        backgroundColor: '#70ec3b',
                                        boxShadow: '0 0 30px #4cda21',
                                    }
                                }}>
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
        </div >
    )
}

export default Checkout
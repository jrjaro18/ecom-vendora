import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import Tile from '../components/Tile'
import './styles/History.css'
import Footer from '../components/Footer'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import { toast, ToastContainer } from 'react-toastify'
import AntSwitch from '@mui/material/Switch'
import { Button, LinearProgress } from '@mui/material'

const History = () => {
    const [state, setState] = useState(true);
    const [info, setInfo] = useState([]);

    const style = {
        fontFamily: "Poppins, sans-serif",
        fontSize: "1.5rem",
    }
    useEffect(() => {
        if (state) {
            try {
                const getBoughtdata = async () => {
                    const res = await axios.get('http://localhost:5000/api/user/bought', { withCredentials: true });
                    console.log(res.data.products);
                    if (res.status === 200) {
                        setInfo(res.data.products);
                    } else if (res.status === 288) {
                        window.location.href = "/login"
                    }
                    else {
                        toast.error(res.data.msg, {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: true,
                        });
                    }
                }
                getBoughtdata();
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                const getSolddata = async () => {
                    const res = await axios.get('http://localhost:5000/api/user/sold', { withCredentials: true });
                    console.log(res.data.products);
                    if (res.status === 200) {
                        setInfo(res.data.products);
                    } else if (res.status === 288) {
                        window.location.href = "/login"
                    } else {
                        toast.error(res.data.msg, {
                            position: "top-center",
                            autoClose: 3000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: true,
                        });
                    }
                }
                getSolddata();
            } catch (err) {
                console.log(err);
            }
        }
    }, [state]);
    return (
        <div className='historypagebody'>
            <Navbar />
            {info ? (
                <div className='historycontainer'>

                <div className='historycont1'>
                    <div className='historybutton'>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Typography style={style}>Sold</Typography>
                            <AntSwitch defaultChecked inputProps={{ 'aria-label': 'ant design' }} onChange={(e) => { setState(e.target.checked) }} />
                            <Typography style={style}>Bought</Typography>
                        </Stack>
                    </div>
                    {
                        !state ? (
                            <Button variant="contained" style={{ color: "#fff", margin: "1vh 0", width: "max-content", fontSize: "2vmin" }} onClick={() => { window.location.href = "/sellers-page" }}>Add a Product</Button>
                        ) : (<></>)
                    }
                    </div>
                    <div className='historygrid'>

                        {info.map((data) => {
                            return <div style={{ display: "flex", flexDirection: "column", }}><Tile key={data._id} data={data} />
                                {!state ? (<div style={{ display: "flex", flexDirection: "row", fontFamily:"Poppins, sans-serif", fontSize:"0.8em", justifyContent:"space-around" }}>
                                    <div>Stock: {data.stock}</div> <div> Sold:{
                                        data.buyers ? (
                                            <>{data.buyers.length}</>) : (0)
                                    }
                                    </div>
                                </div>) : (<></>)}</div>
                        })}

                    </div>

                </div>) : (<LinearProgress />)
            }
            <Footer />
        </div>
    )
}

export default History
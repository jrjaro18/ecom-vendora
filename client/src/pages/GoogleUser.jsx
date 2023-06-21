import React from 'react'
import './styles/GoogleUser.css'
import Navbar from '../components/Navbar';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const GoogleUser = () => {
    return (
        <div className='googleuserbody'>
            <Navbar />
            <div className='googleusercontainer'>
                <form className='googleuserform'>
                    <div className='googleuserformtitle'>
                        Set Your Password
                    </div>
                    <div className='googleuserforminput'>
                        <TextField type='password' id="outlined-basic" label="Password" variant="outlined" style={{width:"100%"}}/>
                        <TextField type='password' id="outlined-basic" label="Confirm Password" variant="outlined" style={{width:"100%"}} />
                    </div>
                    <div className='googleuserformbutton'>
                        <Button variant="contained">Submit</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default GoogleUser
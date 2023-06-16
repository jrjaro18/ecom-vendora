import React from 'react'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import './styles/Register.css'
const Register = () => {
    const gender = [{
        value:"Male",
        label:"Male",
    },
    {
        value:"Female",
        label:"Female"
    }]
    return (
        <div className='registrationbody'>
            <div className='registrationbodybg'>
                <img src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="registrationbg" />
            </div>
            <div className="registrationcontainer">
                <div className='registrationtitle'>
                    Register
                </div>
                <form className='registrationform'>
                    <div className='registrationname'>
                        <div className='registrationfirstname'>
                            <TextField id="standard-name-input"
                                label="First Name"
                                type="firstname"
                                variant="standard" 
                                // style={{width:"20vw"}}
                                fullWidth
                                />
                        </div>
                        <div className='registrationlastname'>
                            <TextField id="standard-basic"
                                label="Last Name"
                                type="lastname"
                                variant="standard" 
                                // style={{width:"20vw"}}
                                fullWidth
                                />
                        </div>
                    </div>
                    <div className='registrationemail'>
                        <TextField
                            id="standard-email-input"
                            label="Email"
                            type="email"
                            variant="standard"
                            fullWidth
                        />
                    </div>
                    <div className='registrationpassword'>
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            style={{width:"65%"}}
                            
                        />
                    </div>
                    <div className='registrationconfirmpassword'>
                        <TextField
                            id="outlined-password-input"
                            label="Confirm Password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            style={{width:"65%"}}
                        />
                    </div>
                    <div className='registrationotherdetails'>
                        <div className='registrationdob'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer
                                    components={[
                                        'DatePicker',
                                    ]}
                                >
                                    <DemoItem>
                                        <DatePicker label="DOB"/>
                                    </DemoItem>
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className='registrationgender'>
                            <TextField
                                id="outlined-select-gender"
                                select
                                label="Gender"
                                                              
                            >
                                {gender.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                    </div>
                    <div className='registrationbutton'>
                        <center>
                        <Button variant="contained" style={{width:"18vmax",height:"6vh",fontSize:"1.45vmax",backgroundColor:"rgb(20, 13, 33)"}}>Register</Button>
                        </center>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
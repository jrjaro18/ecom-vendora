import React from 'react'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@mui/material/Button';
import { format } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import './styles/Register.css'
const Register = () => {
    const gender = [{
        value: "Male",
        label: "Male",
    },
    {
        value: "Female",
        label: "Female"
    }]
    const [firstname, setFirstname] = React.useState('');
    const [lastname, setLastname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmpassword, setConfirmpassword] = React.useState('');
    const [dob, setDob] = React.useState(null);
    const [gend, setGender] = React.useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedDate = format(dob, 'dd MM yyyy')
        //check if all data are filled
        if (firstname === '' || lastname === '' || email === '' || password === '' || confirmpassword === '' || dob === null || gend === '') {
            toast.error('Please fill all the fields', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light"
            });
            return;
        }
        //check if password and confirm password are same
        if (password !== confirmpassword) {
            toast.error('Password and Confirm Password are not same', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light"
            });
            return;
        }
        //check if email is valid
        if (!email.includes('@')) {
            toast.error('Please enter a valid email address', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light"
            });
            return;
        }
        //check if password is strong
        if (password.length < 8) {
            toast.error('Password must be atleast 8 characters long', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light"
            });
            return;
        }
        //check if user is above 18
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18) {
            toast.error('You must be atleast 18 years old to register', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light"
            });
            return;
        }
        const form = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            dob: formattedDate,
            gender: gend,
        }
        try{
        const res = await axios.post('http://localhost:5000/api/user/register', form);
        //console.log(res);
        if(res.status===202){
            toast.error(res.data, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light"
            });
        } else{
            toast.success(res.data, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                progress: undefined,
                theme: "light"
            });
            setTimeout(() => {
                window.location.href='/login';
            }, 3500);
            
        }
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className='registrationbody'>
            <div className='registrationbodybg'>
                <img src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" alt="registrationbg" />
            </div>
            <div className="registrationcontainer">
                <div className='registrationtitle'>
                    Register
                </div>
                <form className='registrationform' onSubmit={(e) => { handleSubmit(e) }}>
                    <div className='registrationname'>
                        <div className='registrationfirstname'>
                            <TextField id="standard-name-input"
                                label="First Name"
                                type="firstname"
                                variant="standard"
                                // style={{width:"20vw"}}
                                fullWidth
                                onChange={(e) => setFirstname(e.target.value)}
                            />
                        </div>
                        <div className='registrationlastname'>
                            <TextField id="standard-basic"
                                label="Last Name"
                                type="lastname"
                                variant="standard"
                                // style={{width:"20vw"}}
                                fullWidth
                                onChange={(e) => setLastname(e.target.value)}
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
                            onChange={(e) => setEmail(e.target.value)}

                        />
                    </div>
                    <div className='registrationpassword'>
                        <TextField
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            style={{ width: "65%" }}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='registrationconfirmpassword'>
                        <TextField
                            id="outlined-password-input"
                            label="Confirm Password"
                            type="password"
                            autoComplete="current-password"
                            variant="standard"
                            style={{ width: "65%" }}
                            onChange={(e) => setConfirmpassword(e.target.value)}
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
                                        <DatePicker label="DOB" onChange={(e) => { setDob(e.$d) }} />
                                    </DemoItem>
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div className='registrationgender'>
                            <TextField
                                id="outlined-select-gender"
                                select
                                label="Gender"
                                onChange={(e) => { setGender(e.target.value) }}
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
                            <Button variant="contained" style={{ width: "18vmax", height: "6vh", fontSize: "1.45vmax", backgroundColor: "rgb(20, 13, 33)" }} type="submit">Register</Button>
                        </center>
                    </div>
                </form>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}

export default Register
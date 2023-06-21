import React from 'react'
import axios from 'axios'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import GoogleIcon from '@mui/icons-material/Google';
import './styles/Login.css'
const Login = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const onGoogleLogin = () => {
        console.log('google login')
        window.open('http://localhost:5000/auth/google')
    }
    return (
        <div className='loginbody'>
            <div className='logincontainer'>
                <div className='loginleftimgbox' >
                    <img src="https://wallpapercave.com/dwp2x/wp7566451.jpg" alt='leftimage'/>
                </div>
                <form className='loginrightformbox'>
                    <div className='loginform'>
                        <div className='loginformheading'>
                            <div className='loginformtitle'>
                                Login
                            </div>
                            <div className='loginformsubtitle'>
                                Welcome Back to Vendora !
                            </div>
                        </div>
                        <div className='loginformfields'>
                            <div className='loginformfieldemail'>
                                <TextField
                                    id="outlined-email-input"
                                    label="Email"
                                    type='email'
                                    style={{ width: "94%" }}
                                />
                            </div>
                            <div className='loginformfieldpassword'>
                                <TextField
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    style={{ width: "94%" }}
                                />
                            </div>
                        </div>
                            <div className="loginformbuttons">
                                <div className='loginformloginbutton'>
                                    <Button variant="contained" style={{ backgroundColor: 'rgb(36, 32, 36)', color: "white", width: "85%" }} onSubmit={{}}>Login</Button>
                                </div>
                                <div className='loginformregisterbutton'>
                                    <Button variant="contained" style={{backgroundColor: 'rgb(166, 113, 224)', width: "85%" }}>Register</Button>
                                </div>
                                <div className='loginformbuttonor'> 
                                    <div/>
                                     or 
                                    <div/> 
                                </div>
                                <div className='loginformgooglebutton'>
                                    <Button variant="outlined" style={{ width: "85%" }} onClick={()=>{onGoogleLogin()}}><GoogleIcon style={{marginRight:"10%"}}/> Signup With Google</Button>
                                </div>
                            </div>
                        
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
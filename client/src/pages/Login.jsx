import React, { useEffect } from 'react'
import axios from 'axios'
import jwt_decode from "jwt-decode";
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { toast, ToastContainer } from 'react-toastify';
import './styles/Login.css'
const Login = () => {

    function loadGoogleIdentityAPI(callback) {
        var script = document.createElement('script');
        script.src = 'https://accounts.google.com/gsi/client';
        script.onload = callback;
        document.head.appendChild(script);
    }

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/user/checklogin', { withCredentials: true })
                console.log(res)
                if (res.status === 200) {
                    window.location.href = '/'
                } else {
                    localStorage.removeItem('userDetails')
                }
            } catch (err) {
                console.log(err)
            }
        }
        checkLogin();
        /* global google */
        loadGoogleIdentityAPI(() => {
            google.accounts.id.initialize({
                client_id: "799917254288-jgc71g7umm59sk3i50g245d55bueea0b.apps.googleusercontent.com",
                callback: (res) => {
                    //console.log(jwt_decode(res.credential))
                    const { given_name, family_name, email } = jwt_decode(res.credential);
                    axios.post('http://localhost:5000/api/user/googlelogin', {
                        firstname: given_name,
                        lastname: family_name,
                        email: email
                    }, {
                        withCredentials: true
                    }).then(async (res) => {
                        console.log(res);
                        if (res.status === 200) {
                            localStorage.setItem('userDetails', JSON.stringify(res.data.userDetails))
                            console.log(await JSON.parse(localStorage.getItem('userDetails')))
                            toast.success(res.data.msg, {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                progress: undefined,
                                theme: "light"
                            });
                            setTimeout(() => {
                                window.location.href = '/'
                            }, 1500)
                        } else {
                            toast.error("It's not you it's us :(", {
                                position: "top-center",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                progress: undefined,
                                theme: "outline"

                            });
                        }
                    }
                    ).catch((err) => {
                        console.log(err)
                        window.location.href = '/login'
                    })
                }
            })

            google.accounts.id.renderButton(
                document.getElementById("googleButton"),
                {
                    theme: "filled_black",
                    size: "large",
                    text: "continue_with",
                    shape: "rectangular",
                    width: "auto",
                    height: "auto",
                    longtitle: true,
                }
            );
        });
    }, [])

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const handleRegisterClick = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('http://localhost:5000/api/user/login', {
                email: email,
                password: password
            }, { withCredentials: true })
            if (res.status === 200) {
                console.log(res)
                localStorage.setItem('userDetails', JSON.stringify(res.data.userDetails))
                console.log(await JSON.parse(localStorage.getItem('userDetails')))
                toast.success(res.data.msg, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                    theme: "light"
                });
                setTimeout(() => {
                    window.location.href = '/'
                }, 1500)
            } else if (res.status === 202) {
                toast.error(res.data, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                    theme: "light"
                });
            } else {
                toast.error("It's not you it's us :(", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    progress: undefined,
                    theme: "light"
                });
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (

        <div className='loginbody'>
            <div className='logincontainer'>
                <div className='loginleftimgbox' >
                    <img src="https://wallpapercave.com/dwp2x/wp7566451.jpg" alt='leftimage' />
                </div>
                <form className='loginrightformbox' onSubmit={(e) => { handleRegisterClick(e) }}>
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
                                    onChange={(e) => { setEmail(e.target.value) }}
                                />
                            </div>
                            <div className='loginformfieldpassword'>
                                <TextField
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    style={{ width: "94%" }}
                                    onChange={(e) => { setPassword(e.target.value) }}
                                />
                            </div>
                        </div>
                        <div className="loginformbuttons">
                            <div className='loginformloginbutton'>
                                <Button variant="contained" style={{ backgroundColor: 'rgb(36, 32, 36)', color: "white", width: "85%" }} type='submit'>Login</Button>
                            </div>
                            <div className='loginformregisterbutton'>
                                <Button variant="contained" style={{ backgroundColor: 'rgb(166, 113, 224)', width: "85%" }} onClick={() => { window.location.href = '/register' }}>Register</Button>
                            </div>
                            <div className='loginformbuttonor'>
                                <div />
                                or
                                <div />
                            </div>
                            <div className='loginformgooglebutton' id='googleButton' style={{ width: "85%", display: 'flex', justifyContent: 'center' }}>
                            </div>
                        </div>
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

export default Login
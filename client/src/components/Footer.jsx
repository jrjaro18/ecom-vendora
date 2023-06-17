import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import './styles/Footer.css'
const Footer = () => {
    return (
        <div className='footerbody'>
            <div className='footercontainer'>
                <div className='footercontentleft'>
                    <div className='footercontentleftcontent1'>
                        <LocationOnIcon />
                        <p> Mumbai, India</p>
                    </div>
                    <div className='footercontentleftcontent2'>
                        <EmailIcon />
                        <p> jrjaro2004@gmail.com</p>
                    </div>
                    <div className='footercontentleftcontent3'>
                        <LocalPhoneIcon />
                        <p> +918 452 990 031</p>
                    </div>
                </div>
                <div className='footercontentright'>
                    <div className='footercontentrightcontent1'>
                        <div className='footercontentrightcontent1title'>
                            V E N D O R A
                        </div>
                        <div className='footercontentrightcontent1content'>
                            Vendora is a distinguished ecommerce destination, offering discerning shoppers an elevated online retail experience. With a meticulous curation of exquisite products and a customer-centric approach, Vendora sets a new standard for unparalleled convenience and luxury in the digital marketplace.
                        </div>
                    </div>
                    <div className='footercontentrightcontent2'>
                        <a href='https://github.com/jrjaro18'>
                            <GitHubIcon />
                        </a>
                        <a href='https://www.instagram.com/jrjaro18/'>
                            <InstagramIcon />
                        </a>
                        <a href='https://www.linkedin.com/in/rohan-jaiswal-4b3363231/'>
                            <LinkedInIcon />
                        </a>
                        <a href='https://www.instagram.com/jrjaro18/'>
                            <FacebookIcon />
                        </a>
                    </div>
                </div>
            </div>
            <center>© 2023 Jaro Product. All Rights Reserved.</center>
        </div>
    )
}

export default Footer
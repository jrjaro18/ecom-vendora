import React from 'react'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import './styles/Home.css'
const Home = () => {
  return (
    <div className='homepagebody'>
        <Navbar />
        <Searchbar />
        <div className="homecontainer">
        <center>Home</center>
        </div>
    </div>
  )
}

export default Home
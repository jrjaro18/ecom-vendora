import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './styles/Searchbar.css'
const Searchbar = () => {
  return (
    <div className='searchbarcontainer'>
        <form className="searchbarform">

            <input type="text" placeholder="Search for Products" name="search" />

            <button type="submit"><SearchIcon /></button>
        </form>
    </div>
  )
}

export default Searchbar
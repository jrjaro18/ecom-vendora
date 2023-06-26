import React,{useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';
import './styles/Searchbar.css'
const Searchbar = () => {
  const [search, setSearch] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `/search/?=${search}`;
  }

  return (
    <div className='searchbarcontainer'>
        <form className="searchbarform" onSubmit={(e)=>{handleSubmit(e)}}>

            <input type="text" onChange={(e)=>{
                setSearch(e.target.value);
            } }placeholder="Search for Products" name="search" />

            <button type="submit"><SearchIcon /></button>
        </form>
    </div>
  )
}

export default Searchbar
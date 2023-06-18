import React from 'react'
import './styles/Search.css'
import Searchbar from '../components/Searchbar'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Tile from '../components/Tile'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

const Search = () => {
    return (
        <React.Fragment>
            <div className='searchpagebody'>
                <Navbar />
                <Searchbar />
                <div className='searchpagecomponent'>
                    <div className='searchpageleftcomponent'>
                        <div className='searchpageleftcomponenttext'>
                            Sort your results by
                        </div>
                        <div className='searchpageleftcomponentradiogroup'>
                            <FormControl>
                                <RadioGroup aria-labelledby="demo-radio-buttons-group-label" name="radio-buttons-group">
                                <FormControlLabel value="rating" control={<Radio />} label="Rating" />
                                    <FormControlLabel value="new" control={<Radio />} label="Newest First" />
                                    <FormControlLabel value="price1" control={<Radio />} label="Sort: Price Low to High" />
                                    <FormControlLabel value="price2" control={<Radio />} label="Sort: Price High to Low" />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                    <div className='searchpagerightcomponent'>
                        <div className='searchpagerightcomponenttext'>
                            Showing results for <span className='searchpagecomponenttextspan'>"{'Search Term'}"</span>
                        </div>
                        <div className='searchpagecomponentresultgrid'>
                            <Tile />
                            <Tile />
                            <Tile />
                            <Tile />
                            <Tile />
                            <Tile />
                            <Tile />
                            <Tile />
                            <Tile />
                            <Tile />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    )
}

export default Search
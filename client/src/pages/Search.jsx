import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/Search.css';
import Searchbar from '../components/Searchbar';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Tile from '../components/Tile';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { CircularProgress } from '@mui/material';

const Search = () => {
    const [results, setResults] = useState([]);
    const [searchterm, setSearchterm] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const url = window.location.href;
        async function fetchData() {
            setSearchterm(url.split('=')[1]);
            axios.get(`http://localhost:5000/api/product/search/${url.split('=')[1]}`)
                .then((res) => {
                    setLoading(false);
                    console.log(res.data);
                    setResults(res.data);
                })
                .catch((err) => {
                    setLoading(false);
                    console.log(err);
                });
        }
        fetchData();
    }, []);
    
    return (
        <React.Fragment>
            <div className='searchpagebody'>
                <Navbar />
                <Searchbar />
                <div className='searchpagecomponent'>
                    {/* <div className='searchpageleftcomponent'>
                        <div className='searchpageleftcomponenttext'>
                            Sort your results by
                        </div>
                        <div>
                            <FormControl>
                                <RadioGroup
                                    aria-labelledby='demo-radio-buttons-group-label'
                                    name='radio-buttons-group'
                                    className='searchpageleftcomponentradiogroup'
                                >
                                    <FormControlLabel
                                        value='rating'
                                        control={<Radio />}
                                        label='Rating'
                                    />
                                    <FormControlLabel
                                        value='price1'
                                        control={<Radio />}
                                        label='Sort: Price Low to High'
                                    />
                                    <FormControlLabel
                                        value='price2'
                                        control={<Radio />}
                                        label='Sort: Price High to Low'
                                    />
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div> */}
                    {!loading ? (
                        <div className='searchpagerightcomponent'>
                            <div className='searchpagerightcomponenttext'>
                                Showing results for {" "}
                                <span className='searchpagecomponenttextspan'>"{decodeURIComponent(searchterm)}"</span>
                            </div>
                            <div className='searchpagecomponentresultgrid'>
                                {results.map((result) => (
                                    <Tile key={result._id} data={result.item}/>
                                ))}
                            </div>
                        </div>)
                        : (
                            <CircularProgress sx={{
                            width: '100%',
                            position: 'absolute',
                            top: '50%',
                            left: '46%',
                            transform: 'translate(-50%, -50%)',
                        }} />)
                        }
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
};

export default Search;
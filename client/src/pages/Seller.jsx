import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './styles/Seller.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PublishIcon from '@mui/icons-material/Publish';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDropzone } from 'react-dropzone'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Navbar from '../components/Navbar'
import Products from '../data/products.json'
const Seller = () => {
    const products = Products.product;
    const baseStyle = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        borderWidth: 2,
        borderRadius: 2,
        borderColor: '#eeeeee',
        borderStyle: 'dashed',
        backgroundColor: '#f6f6f6',
        color: '#bdbdbd',
        outline: 'none',
        transition: 'border .24s ease-in-out',
        height: '60vh',
        minWidth: '50vw',
    };

    const focusedStyle = {
        borderColor: '#2196f3'
    };

    const acceptStyle = {
        borderColor: '#00e676'
    };

    const rejectStyle = {
        borderColor: '#ff1744'
    };
    const { acceptedFiles, getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({ accept: { 'image/jpeg': [] } });
    const style = React.useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject,
    ]);
    // const options = [
    //     { value: 'electronics', label: 'Electronics' },
    //     { value: 'mobile', label: 'Mobile' },
    //     { value: 'men', label: 'Men' },
    //     { value: 'women', label: 'Women' },
    //     { value: 'kids', label: 'Kids' },
    //     { value: 'home', label: 'Home' },
    //     { value: 'furniture', label: 'Furniture' },
    //     { value: 'appliances', label: 'Appliances' },
    //     { value: 'beauty', label: 'Beauty' },
    //     { value: 'toys', label: 'Toys' },
    //     { value: 'books', label: 'Books' },
    //     { value: 'sports', label: 'Sports' },
    //     { value: 'fitness', label: 'Fitness' },
    //     { value: 'bags', label: 'Bags' },
    //     { value: 'jewellery', label: 'Jewellery' },
    //     { value: 'watches', label: 'Watches' },
    //     { value: 'shoes', label: 'Shoes' },
    //     { value: 'travel', label: 'Travel' },
    //     { value: 'grocery', label: 'Grocery' },
    //     { value: 'medical', label: 'Medical' },
    //     { value: 'industrial', label: 'Industrial' },
    //     { value: 'automobile', label: 'Automobile' },
    //     { value: 'pet', label: 'Pet' },
    //     { value: 'tools', label: 'Tools' },
    //     { value: 'garden', label: 'Garden' },
    //     { value: 'music', label: 'Music' },
    //     { value: 'movies', label: 'Movies' },
    //     { value: 'games', label: 'Games' },
    //     { value: 'software', label: 'Software' },
    //     { value: 'office', label: 'Office' },
    //     { value: 'stationery', label: 'Stationery' },
    //     { value: 'food', label: 'Food' },
    //     { value: 'drinks', label: 'Drinks' },
    //     { value: 'health', label: 'Health' },
    //     { value: 'personal', label: 'Personal' },
    //     { value: 'garden', label: 'Garden' },
    //     { value: 'tools', label: 'Tools' },
    //     { value: 'baby', label: 'Baby' },
    //     { value: 'clothing', label: 'Clothing' },
    //     { value: 'accessories', label: 'Accessories' },
    //     { value: 'tshirt', label: 'T-Shirt' },
    //     { value: 'shirt', label: 'Shirt' },
    //     { value: 'jeans', label: 'Jeans' },
    //     { value: 'trousers', label: 'Trousers' },
    //     { value: 'shorts', label: 'Shorts' },
    //     { value: 'saree', label: 'Saree' },
    //     { value: 'kurti', label: 'Kurti' },
    //     { value: 'salwar', label: 'Salwar' },
    //     { value: 'suits', label: 'Suits' },
    //     { value: 'lehenga', label: 'Lehenga' },
    //     { value: 'blouse', label: 'Blouse' },
    //     { value: 'sweater', label: 'Sweater' },
    //     { value: 'jacket', label: 'Jacket' },
    //     { value: 'sweatshirt', label: 'Sweatshirt' },
    //     { value: 'hoodie', label: 'Hoodie' },
    //     { value: 'coat', label: 'Coat' },
    //     { value: 'blazer', label: 'Blazer' },
    //     { value: 'sweatpants', label: 'Sweatpants' },
    //     { value: 'cap', label: 'Cap' },
    //     { value: 'hat', label: 'Hat' },

    // ]

    const options = products.map((product) => {
        return { value: product.value, label: product.label }
    })
    const animatedComponents = makeAnimated();

    useEffect(() => {
        const checkAuthorized = async () => {
            try {
                const res = await axios.get("http://localhost:5000/api/check/authorized", { withCredentials: true });
                if (res.status === 288 || localStorage.getItem('userDetails') === null) {
                    localStorage.removeItem('userDetails');
                    window.location.href = 'http://localhost:3000/login';
                }
            } catch (error) {
                console.log(error);
                localStorage.removeItem('userDetails');
                window.location.href = 'http://localhost:3000/login';
            }
        };
        checkAuthorized();
    }, []);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState([]);
    const [stock, setStock] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const categories = [];
        var i = 0;
        for (i = 0; i < category.length; i++) {
            categories.push(category[i].value);
        }
        console.log(categories);
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', categories);
        formData.append('stock', stock);
        for (i = 0; i < acceptedFiles.length; i++) {
            formData.append('image', acceptedFiles[i]);
        }
        try {
            const res = await axios.post('http://localhost:5000/api/seller/addproduct', formData, { withCredentials: true }, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log(res);
            window.location.href = 'http://localhost:3000/';
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='sellerpagebody'>
            <Navbar />
            <div className='sellerpagecontainer'>
                <div className='sellerpagetitle'>
                    Sell Your Products easily with Vendora
                </div>
                <div className='sellerpagecontent'>
                    <form className='sellerpageform' onSubmit={(e) => { handleSubmit(e) }}>
                        <div className='sellerpageformtitle' >
                            <div className='sellerpageformproducttitle'>
                                Product Name
                            </div>
                            <TextField id="outlined-basic" label="Title" variant="outlined" style={{ width: '98vw', marginBottom: "unset" }} onChange={(e) => { setTitle(e.target.value) }} />
                        </div>
                        <div className='sellerpageformdesc'>
                            <div className='sellerpageformproducttitle'>
                                Product Description
                            </div>
                            <ReactQuill theme="snow" onChange={(e) => { setDescription(e) }} style={{ height: '80vh', marginBottom: '10vh', width: '98vw' }} />
                        </div>
                        <div className='sellerpageformprice'>
                            <div className='sellerpageformproducttitle'>
                                Product Price
                            </div>
                            <TextField id="outlined-basic" label="$" variant="outlined" type='number' onChange={(e) => { setPrice(e.target.value) }} style={{ width: "53.5vw" }} />
                        </div>
                        <div className='sellerpageformstock'>
                            <div className='sellerpageformproducttitle'>
                                Product Stocks
                            </div>
                            <TextField id="outlined-basic" label="No. of items" variant="outlined" type='number' style={{ width: "53.5vw" }} onChange={(e) => { setStock(e.target.value) }} />
                        </div>
                        <div className='sellerpageformimages'>
                            <div className='sellerpageformproducttitle'>
                                Product Images
                            </div>
                            <div {...getRootProps({ style })}>
                                <input {...getInputProps()} />
                                <p style={{ marginTop: '25vh' }}>Drag 'n' drop some files here, or click to select files</p>
                                {
                                    acceptedFiles.map(file => (
                                        <div key={file.path}>
                                            {file.path} - {file.size} bytes
                                        </div>
                                    ))
                                }
                            </div>

                        </div>
                        <div className='sellerpageformtags'>
                            <div className='sellerpageformproducttitle'>
                                Product Tags
                            </div>
                            <Select
                                closeMenuOnSelect={false}
                                components={animatedComponents}
                                defaultValue={[]}
                                isMulti
                                options={options}
                                onChange={(e) => { setCategory(e) }}
                            />
                        </div>
                        <div className='sellerpageformsubmit'>
                            <Button variant="contained" color="primary" type="submit" style={{ marginBottom: '2vh' }}>
                                Submit <PublishIcon />
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Seller
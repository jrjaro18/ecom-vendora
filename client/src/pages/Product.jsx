import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import './styles/Product.css'
import Slider from "react-slick";
import { Rating } from '@mui/material'
import { Button } from '@mui/material';
import { ShoppingCart } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField';
import FavoriteIcon from '@mui/icons-material/Favorite';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useState } from 'react';
import parse from 'html-react-parser';
import { toast, ToastContainer } from "react-toastify";
import { CircularProgress } from '@mui/material';
const Product = () => {
    const [productTitle, setProductTitle] = useState('');
    const [productPrice, setProductPrice] = useState(0);
    const [productDescription, setProductDescription] = useState('');
    const [productImages, setProductImages] = useState([]);
    const [productRating, setProductRating] = useState(0);
    const [loading, setLoading] = useState(true);
    const [inCart, setInCart] = useState(false);
    const [inWishlist, setInWishlist] = useState(false);
    const [getReviews, setGetReviews] = useState([]);
    const [canReview, setCanReview] = useState(false);
    const [stock, setStock] = useState(0);
    //form
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    

    useEffect(() => {
        const productId = window.location.href.split('=')[1];
        const fetchData = async () => {
            await axios.get(`http://localhost:5000/api/product/get/:${productId}`).then((res) => {
                if (res.status === 200) {
                    setProductTitle(res.data.title);
                    setProductPrice(res.data.price);
                    setProductDescription(res.data.description);
                    setProductImages(res.data.image);
                    console.log(res.data.image)
                    setProductRating(res.data.ratings);
                    setGetReviews(res.data.reviews);
                    setStock(res.data.stock);
                    console.log(res.data)
                    setLoading(false);

                } else {
                    toast.error(res.data, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    })
                    setTimeout(() => {
                        window.location.href = '/'
                    }, 2500);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
        fetchData();
        const setProductState = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/user/set/productState/forUser/:${productId}`, { withCredentials: true });
                //console.log(res);
                if (res.status === 200) {
                    setInCart(res.data.cart);
                    setInWishlist(res.data.wishlist);
                    setCanReview(res.data.canReview);
                }
                if (res.status === 299) {
                    toast.error(res.data, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    })
                }
            } catch (err) {
                console.log(err);
            }
        }
        setProductState();
    }, []);

    const settings = {
        dots: false,
        infinite: true,
        arrows: true,
        autoplay: false,
        autoplaySpeed: 3000,
        speed: 150,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    //const preReview = [{ name: "Rohan Jaiswal", rating: 4, comment: "Good Product, Loved it!" }, { name: "Bhoomi Jain", rating: 2, comment: "Average Product, Not worth!" }]
    const handleCart = async () => {
        const productId = window.location.href.split('=')[1];
        const res = await axios.post(`http://localhost:5000/api/user/alter/cart`, { productId: productId }, { withCredentials: true });
        if (res.status === 200) {
            toast.success(res.data, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            setInCart(!inCart);
        }
        else if (res.status === 288) {
            toast.error("Login to Add", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
        }
        else {
            toast.error(res.data, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
        }
    }
    const handleWishlist = async () => {
        const productId = window.location.href.split('=')[1];
        const res = await axios.post(`http://localhost:5000/api/user/alter/wishlist`, { productId: productId }, { withCredentials: true });
        if (res.status === 200) {
            toast.success(res.data, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
            setInWishlist(!inWishlist);
        }
        else if (res.status === 288) {
            toast.error("Login to Add", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
        }
        else {
            toast.error(res.data, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            })
        }
    }

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const productId = window.location.href.split('=')[1];
        try{
            const res = await axios.post('http://localhost:5000/api/product/add/review',{
                productId: productId,
                rating: rating,
                review: review
            },{withCredentials: true});
            if(res.status === 200){
                window.location.reload();
            } 
            else if(res.status === 288){
                toast.error("Login to Add", {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                });
            }
            else{
                toast.error(res.data, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch(err){
            console.log(err);
        }
    }

    return (
        <div className='productpagebody'>
            <Navbar />
            {!loading ? (
                <div className='productpagecontainer'>
                    <div className='productpagecontainercontent1'>

                        <div className='productpagecontainercontent1img'>
                            {productImages.length > 0 ? (
                                <Slider {...settings} className='productpageimgslickcontainer'>
                                    {productImages.map((image, index) => (
                                        <div key={index}>
                                            <div>
                                                <img className="productpagecarouselimage" src={"http://localhost:5000/uploads/" + image} alt={`Slide ${index}`} />
                                            </div>
                                        </div>
                                    ))}
                                </Slider>) : (null)
                            }
                        </div>
                        <div className='productpagecontainercontent1text'>
                            <div className='productpagecontainercontent1title'>
                                {productTitle}
                            </div>
                            <div className='productpagecontainercontent1price'>
                                <div>
                                    <span className='productpagedollarsign'>$</span>{productPrice}
                                </div>
                                <div>
                                    <div className='productpagecontainercontent1rating'>
                                        <Rating name="read-only" value={productRating} readOnly />
                                        <div>({productRating}/5)</div>
                                    </div>
                                </div>
                            </div>

                            <div className='productpagecontainercontent1buttons'>
                                <Button variant="contained" disabled={(stock===0)} className='productpagecontainercontent1button1' onClick={() => { handleCart() }}>{!inCart ? (<>{stock!==0?(<>Add to Cart_</>):(<>Unavailable</>)}</>) : (<>Remove from Cart_</>)}<ShoppingCart /></Button>
                                <Button variant="contained" className='productpagecontainercontent1button2' onClick={() => { handleWishlist() }}>{!inWishlist ? (<>Add to Wishlist_</>) : (<>Remove from Wishlist_</>)}<FavoriteIcon /></Button>
                            </div>
                            <div className='productpagecontainercontent1description'>
                                {/* <div className='productpagecontainercontent1descriptiontitle'>
                                    {productTitle}
                                </div> */}
                                <div className='productpagecontainercontent1descriptiontext'>
                                    {parse(productDescription.toString())}
                                </div>
                            </div>

                            <div className='productpagecontainercontent1comments'>
                                <div className='productpagecontainercontent1commentstitle'>
                                    Reviews
                                </div>
                                <form onSubmit={(e)=>{handleReviewSubmit(e)}}>
                                    <Rating name="read-only" value={rating} readOnly={!canReview} style={{ marginBottom: '1.5vmax' }} onChange={(e)=>{setRating(e.target.value)}}/>
                                    <TextField
                                        disabled={!canReview}
                                        id="outlined-disabled"
                                        label="Comment"
                                        defaultValue=""
                                        style={{ marginBottom: '1.5vmax', width: "99%" }}
                                        multiline
                                        rows={4}
                                        onChange={(e)=>{setReview(e.target.value)}}
                                    />

                                    <Button variant="contained" className='productpagecontainercontent1button1' style={{ marginBottom: '3vmax' }} disabled={!canReview} type="submit">Submit</Button>
                                </form>

                                {getReviews.map((item, index) => (
                                    <div className='productpagecontainercontent1commentstext'>
                                        <div className='productpagecontainercontent1commentsuserandrating'>
                                            <div style={{ display: 'flex', alignItems: 'center', }}>
                                                <AccountCircleIcon />
                                                <div>
                                                    {item.userName}
                                                </div>
                                            </div>
                                            <Rating name="read-only" value={item.rating} readOnly />
                                        </div>
                                        <div className='productpagecontainercontent1commentscomment'>
                                            <div className='productpagecontainercontent1commentscommenttext'>
                                                {item.review}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            ) : (
                <CircularProgress sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',

                }} />
            )}
            <ToastContainer />
        </div>
    )
}

export default Product
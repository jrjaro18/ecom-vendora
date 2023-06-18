import React from 'react'
import Navbar from '../components/Navbar'
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
const Product = () => {
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
    const images = [
        'https://www.apple.com/newsroom/images/product/iphone/standard/Apple-iPhone-14-Pro-iPhone-14-Pro-Max-hero-220907.jpg.news_app_ed.jpg',
        'https://techrushi.com/wp-content/uploads/2022/12/iPhone-14-Pro-Max-wallpaper-4K.webp',
        'https://www.technogoyani.com/wp-content/uploads/2022/09/iPhone-14-5G-1024x538.webp',
        'https://rukminim1.flixcart.com/image/832/832/xif0q/mobile/d/v/w/-original-imaghxcpuvc9gvdh.jpeg?q=70',
        'https://rukminim1.flixcart.com/image/832/832/xif0q/mobile/q/b/i/-original-imaghxcptg5mdycw.jpeg?q=70',
        'https://www.techrepublic.com/wp-content/uploads/2022/09/iphone-14-display-apple-770x481.png',
        // Add more image URLs here
    ];
    const review = [{ name: "Rohan Jaiswal", rating: 4, comment: "Good Product, Loved it!" }, { name: "Bhoomi Jain", rating: 2, comment: "Average Product, Not worth!" }]
    return (
        <div className='productpagebody'>
            <Navbar />
            <div className='productpagecontainer'>
                <div className='productpagecontainercontent1'>
                    <div className='productpagecontainercontent1img'>
                        <Slider {...settings} className='productpageimgslickcontainer'>
                            {images.map((image, index) => (
                                <div key={index}>
                                    <div>
                                        <img className="productpagecarouselimage" src={image} alt={`Slide ${index}`} />
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                    <div className='productpagecontainercontent1text'>
                        <div className='productpagecontainercontent1title'>
                            Apple iPhone 14 Pro Max (256GB) - Purple
                        </div>
                        <div className='productpagecontainercontent1price'>
                            <div>
                                <span className='productpagedollarsign'>$</span>999.99
                            </div>
                            <div>
                                <div className='productpagecontainercontent1rating'>
                                    <Rating name="read-only" value={4} readOnly />
                                    <div>(4/5)</div>
                                </div>
                            </div>
                        </div>

                        <div className='productpagecontainercontent1buttons'>
                            <Button variant="contained" className='productpagecontainercontent1button1'>Add to Cart_<ShoppingCart /></Button>
                            <Button variant="contained" className='productpagecontainercontent1button2'>Add to wishlist_<FavoriteIcon /></Button>
                        </div>
                        <div className='productpagecontainercontent1description'>
                            <div className='productpagecontainercontent1descriptiontitle'>
                                Description
                            </div>
                            <div className='productpagecontainercontent1descriptiontext'>

                                <p>The iPhone 14 Pro Max is the largest and most powerful iPhone that Apple will release in 2023. It has a 6.7-inch OLED display with a resolution of 2778 x 1284 pixels. It is powered by the new A16 Bionic chip, which is said to be up to 15% faster than the A15 Bionic chip in the iPhone 13 Pro Max.</p>
                                <p>The iPhone 14 Pro Max has a triple-lens rear camera system with a 48MP main sensor, a 12MP ultrawide sensor, and a 12MP telephoto sensor. It also has a LiDAR scanner, which is used for augmented reality applications. The front-facing camera is a 12MP sensor with support for Portrait Mode and Night Mode.</p>
                                <p>The iPhone 14 Pro Max has a starting price of $1,099. It will be available in four colors: Graphite, Gold, Silver, and Sierra Blue.</p>

                                <h2>Key Features:</h2>

                                <ul>
                                    <li>6.7-inch OLED display with ProMotion technology</li>
                                    <li>A16 Bionic chip</li>
                                    <li>Triple-lens rear camera system with 48MP main sensor</li>
                                    <li>LiDAR scanner</li>
                                    <li>12MP front-facing camera</li>
                                    <li>Up to 28 hours of video playback</li>
                                    <li>Available in four colors: Graphite, Gold, Silver, and Sierra Blue</li>
                                </ul>

                                <p>The iPhone 14 Pro Max is a great choice for users who want the best possible iPhone experience. It has a large and vibrant display, a powerful processor, a great camera system, and long battery life. If you're looking for the best iPhone that Apple has to offer, the iPhone 14 Pro Max is the way to go.</p>

                            </div>
                        </div>

                        <div className='productpagecontainercontent1comments'>
                            <div className='productpagecontainercontent1commentstitle'>
                                Reviews
                            </div>
                            <form>
                                <Rating name="read-only" value={0} readOnly style={{ marginBottom: '1.5vmax' }} />
                                <TextField
                                    disabled={true}
                                    id="outlined-disabled"
                                    label="Comment"
                                    defaultValue="Buy to Review"
                                    style={{ marginBottom: '1.5vmax', width: "99%" }}
                                    multiline
                                    rows={4}
                                />
                                <Button variant="contained" className='productpagecontainercontent1button1' style={{ marginBottom: '3vmax' }} disabled={true}>Submit</Button>
                            </form>

                            {review.map((item, index) => (
                                <div className='productpagecontainercontent1commentstext'>
                                    <div className='productpagecontainercontent1commentsuserandrating'>
                                        <div style={{ display: 'flex', alignItems: 'center', }}>
                                            <AccountCircleIcon />
                                            <div>
                                                {item.name}
                                            </div>
                                        </div>
                                        <Rating name="read-only" value={item.rating} readOnly />
                                    </div>
                                    <div className='productpagecontainercontent1commentscomment'>
                                        <div className='productpagecontainercontent1commentscommenttext'>
                                            {item.comment}
                                            lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
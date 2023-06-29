import React, {useEffect} from 'react'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import Footer from '../components/Footer'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AddIcon from '@mui/icons-material/Add';
import './styles/Home.css'
const Home = () => {

  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    cssEase: 'linear',
  };
  const images = [
    '/maincarouselimg/carouselimg1.jpg',
    '/maincarouselimg/carouselimg2.jpg',
    '/maincarouselimg/carouselimg3.jpg',
    '/maincarouselimg/carouselimg4.jpg',
    '/maincarouselimg/carouselimg5.jpg',
    '/maincarouselimg/carouselimg6.jpg',
    // Add more image URLs here
  ];
  return (
    <div className='homepagebody'>
      <Navbar />
      <Searchbar />
      <div className="homecontainer">
        <div className='homepagecarousel'>
          <Slider {...settings} >
            {images.map((image, index) => (
              <div key={index}>
                <img className="homepagecarouselimage" src={image} alt={`Slide ${index}`} />
              </div>
            ))}
          </Slider>
        </div>
        <div className='homepagecontent1' id='no1'>
          <div className='homepagecontent1title'>
            V E N D O R A
          </div>
          <div className='homepagecontent1subtitle'>
            Your Ultimate Shopping Destination
          </div>
          <div className='homepagecontent1text'>
            Indulge in exquisite, handpicked products tailored to your desires
          </div>
        </div>
        <div className='homepagegridcontainer1' id='gdno1'>
          <div className='homepagegrid1item1' style={{ marginTop: "1vh" }} onClick={()=>{window.location.href="/search/?=clothing"}}>
            <div className='homepagegrid1itemtitle'>
              Clothing
            </div>
            <img src="https://media.glamour.com/photos/570431bbc08406e85210502b/master/pass/fashion-2016-03-05-spring-trend-cold-shoulder-proenza-schouler-main.jpg" alt='sara' />
          </div>
          <div className='homepagegrid1item2' onClick={()=>{window.location.href="/search/?=footwear"}}>
            <div className='homepagegrid1itemtitle' >
              Footwear
            </div>
            <img src='https://images-na.ssl-images-amazon.com/images/G/01/AMAZON_FASHION/2022/SITE_FLIPS/SPR_22/GW/DQC/DQC_APR_TBYB_W_SHOES_2x._SY232_CB624172947_.jpg' alt='footwear' />
          </div>
          <div className='homepagegrid1item3' onClick={()=>{window.location.href="/search/?=beauty%20picks"}}>
            <div className='homepagegrid1itemtitle' >
              Beauty Picks
            </div>
            <img src='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_Beauty_2x._SY608_CB432774344_.jpg' alt='beautypicks' />
          </div>
        </div>
        <div className='homepagegrid2title'>
          <div>
          Electronics
          </div>
          <div>
            <AddIcon style={{cursor:"pointer", color:"white", backgroundColor:"black", borderRadius:"20px", }} className='morebutton' onClick={()=>{window.location.href="/search/?=electronics"}} />
          </div>
        </div>
        <div className='homepagegridcontainer2' id='gdno2'>
          <div className='homepagegrid2item1' onClick={()=>{window.location.href="/search/?=smartwatch"}}>
            <img src="https://wallpapercave.com/wp/wp8535387.jpg" alt="smartwatch" />
            <div className='homepagegrid2itemtitle'>
              Smart Watches
            </div>
          </div>
          <div className='homepagegrid2item2' onClick={()=>{window.location.href="/search/?=laptop"}}>
            <img src="https://th.bing.com/th/id/OIP.KOwj7MMEgc1V_9t6EQP2agHaE8?pid=ImgDet&rs=1" alt="laptop" />
            <div className='homepagegrid2itemtitle'>
              Laptops
            </div>
          </div>
          <div className='homepagegrid2item3' onClick={()=>{window.location.href="/search/?=mobile"}}>
            <img src="https://fdn.gsmarena.com/imgroot/news/21/07/iphone-14-pro-titanium/-1200w5/gsmarena_001.jpg" alt="moblie" />
            <div className='homepagegrid2itemtitle'>
              Mobiles
            </div>
          </div>
          <div className='homepagegrid2item4' onClick={()=>{window.location.href="/search/?=games"}}>
            <img src="https://s.yimg.com/os/creatr-uploaded-images/2020-11/7c9dc7a0-24f3-11eb-aed4-9f1ba3e2dec3" alt="ps5"/>
            <div className='homepagegrid2itemtitle'>
              Gaming
            </div>
          </div>
        </div>

        <div className='homepagegrid2title' id="gdcontitle3">
          <div>
          Home Decor
        </div>
        <div>
          <AddIcon sx={{cursor:"pointer", color:"white", backgroundColor:"black", borderRadius:"20px"}} className='morebutton' onClick={()=>{window.location.href="/search/?=home%20decor"}}/>
        </div>
        </div>
        <div className='homepagegridcontainer2' id='gdno3'>
          <div className='homepagegrid2item1' onClick={()=>{window.location.href="/search/?=sofa"}}>
            <img src="https://images6.alphacoders.com/462/462284.jpg" alt="sofa" />
            <div className='homepagegrid2itemtitle'>
              Sofa
            </div>
          </div>
          <div className='homepagegrid2item2' onClick={()=>{window.location.href="/search/?=prints"}}>
            <img src="https://i5.walmartimages.com/asr/44fd0df9-99fb-424b-a970-5af10e12a8d9_1.c0343b8ab57e0a39f228a29555f15dae.jpeg" alt="printe" />
            <div className='homepagegrid2itemtitle'>
              Prints
            </div>
          </div>
          <div className='homepagegrid2item3' onClick={()=>{window.location.href="/search/?=vase"}}>
            <img src="https://th.bing.com/th/id/OIP.8D-ufsnltOUXA5v5WxrNxgEgDY?pid=ImgDet&rs=1" alt="vase" />
            <div className='homepagegrid2itemtitle'>
              Vase
            </div>
          </div>
          <div className='homepagegrid2item4' onClick={()=>{window.location.href="/search/?=lighting"}}>
            <img src="https://images3.alphacoders.com/899/899393.jpg" alt="lightings" />
            <div className='homepagegrid2itemtitle'>
              Lighting
            </div>
          </div>
        </div>
        <div className='outro'>
          <div className='outrocontainer'>
            <div className='outrotitle'>
            Where Dreams Embrace Their Flawless Union
            </div>
            <div className='outrocontent'>
              Once upon a time, in a world filled with dreams and aspirations, creators, artisans, and innovators from all walks of life came together in Vendora to share their passion with the world. It was a sanctuary of inspiration, where each product had a story to tell, a journey of dedication and craftsmanship.

              From the elegant strokes of a painter's brush to the intricate weavings of a master artisan, every item showcased carried a piece of the creator's heart and soul. It celebrated uniqueness, authenticity, and the pursuit of excellence.

              So, come, dear dreamer, and step into the enchanting world of Vendora. Explore, connect, and let your dreams soar. Find that perfect match that will bring your aspirations to life. Welcome to Vendora, where dreams become reality.
            </div>
          </div>
          <div className='outrocontainer'>
            <div className='outrotitle'>
            Unveiling Boundless Horizons
            </div>
            <div className='outrocontent'>
            At our company, we are driven by a shared vision to explore boundless horizons. Our vibrant work culture thrives on passion, collaboration, and a commitment to excellence. We curate a collection of extraordinary products that embody elegance, functionality, and unmatched quality.

            Driven by our vision, we strive to create experiences that transcend mere transactions. We aspire to be more than a marketplace – we aim to be a destination where dreams come to life, where inspiration abounds, and where our customers find joy in every interaction.

            With an inclusive and supportive environment, we empower each individual to unleash their full potential. Our goal is to transcend transactions and create meaningful experiences. Join us on this remarkable journey as we celebrate the fusion of vision, culture, and extraordinary products.
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home
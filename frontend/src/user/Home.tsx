import React from "react";
import Navbar from "../components/Navbar";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const images = [
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80",
  "https://images.presentationgo.com/2025/05/ecommerce-shopping-cart-concept.jpg",
  "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=1600&q=80",
  "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=1600&q=80"
];

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    pauseOnFocus: true,
    arrows: false,
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <Navbar />

      <Slider {...settings}>
        {images.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt="E-commerce promotional banner"
              style={{width: "100%",height: "50vh",objectFit: "cover",}}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Home;
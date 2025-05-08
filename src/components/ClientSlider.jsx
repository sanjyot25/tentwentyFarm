import React, { useRef, useState, useMemo } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Assets
import client1 from "../assets/images/clientSliderImages/client1.png";
import client2 from "../assets/images/clientSliderImages/client2.png";
import client3 from "../assets/images/clientSliderImages/client3.png";
import client5 from "../assets/images/clientSliderImages/client5.png";
import client6 from "../assets/images/clientSliderImages/client6.png";
import client7 from "../assets/images/clientSliderImages/client7.png";

const clients = [
  { image: client1, name: "Alpha Corp", location: "New York, USA" },
  { image: client2, name: "Beta Industries", location: "London, UK" },
  { image: client3, name: "Gamma Solutions", location: "Tokyo, Japan" },
  { image: client7, name: "Omega Farms", location: "Hong Kong, China" },
  { image: client5, name: "Deca Solutions", location: "Washington D.C., USA" },
  { image: client6, name: "Hexa Solutions", location: "Al Jumrah, Dubai" },
  { image: client7, name: "Septa Org", location: "Hokkaido, Japan" },
];

const ClientSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  const settings = {
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: "0px",
    arrows: false,
    draggable: true,
    beforeChange: (_, next) => setCurrentSlide(next),
    onSwipe: () => setIsDragging(true),
    afterChange: () => setIsDragging(false),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3, dots: true },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2, initialSlide: 0 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const centerIndex = currentSlide % clients.length;
  const currentClient = useMemo(() => clients[centerIndex], [centerIndex]);

  const getSlideStyle = (index) => {
    const isCenter = index === centerIndex;
    const isNext = index === (centerIndex + 1) % clients.length;
    const isPrev = index === (centerIndex - 1 + clients.length) % clients.length;

    if (isCenter) {
      return {
        transform: "scale(1.05)",
        filter: "none",
        zIndex: 2,
      };
    }

    if (isNext) {
      return {
        transform: isDragging
          ? "translateX(40%) scale(0.8) rotateY(-20deg) rotate(10deg)"
          : "translateX(40%) scale(0.8) rotateY(-12deg) rotate(9deg)",
        filter: "grayscale(20%) brightness(90%)",
        zIndex: 1,
      };
    }

    if (isPrev) {
      return {
        transform: "translateX(-40%) scale(0.8) rotateY(12deg) rotate(-9deg)",
        filter: "grayscale(20%) brightness(90%)",
        zIndex: 1,
      };
    }

    return {
      transform: "scale(0.7)",
      filter: "grayscale(50%) brightness(80%)",
      display: "none",
      zIndex: 0,
    };
  };

  return (
    <section className="w-full py-16 text-center">
      <div className="max-w-screen-xl mx-auto">
        <div className="cursor-pointer">
          <Slider ref={sliderRef} {...settings} className="w-full h-full">
            {clients.map((client, index) => (
              <div key={index} className="px-4">
                <div
                  className="relative w-full max-w-md mx-auto overflow-hidden transition-all duration-500 rounded-md hover:cursor-grab active:cursor-grabbing"
                  style={getSlideStyle(index)}
                >
                  <img
                    src={client.image}
                    alt={client.name || "Client Logo"}
                    className="object-cover w-full h-[500px]"
                  />
                </div>
              </div>
            ))}
          </Slider>

          <div className="mt-10">
            <p className="text-lg font-semibold text-gray-800">
              {currentClient.name}
            </p>
            <p className="text-sm text-gray-600">{currentClient.location}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientSlider;

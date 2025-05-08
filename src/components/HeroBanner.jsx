import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bg1 from "../assets/images/herosliderImages/desktop-slide-2.png";
import bg2 from "../assets/images/herosliderImages/desktop-slide-1.png";
import bg3 from "../assets/images/herosliderImages/main-slide.png";
import bg5 from "../assets/images/herosliderImages/mobile-main-slide.png";
import bg6 from "../assets/images/herosliderImages/mobile-slide-2.png";
import { motion, AnimatePresence } from "framer-motion";
import '../css/BorderAnimation.css';

const images = [bg3,bg1, bg2, ];
const mobileImages = [bg5, bg6];

function HeroBanner() {
  const desktopSliderRef = useRef(null);
  const mobileSliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animateBorder, setAnimateBorder] = useState(true);
  const [isNextClicked, setIsNextClicked] = useState(false);

  const desktopSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 4000,
    fade: true,
    beforeChange: (current, next) => {
      setCurrentSlide(next);
      restartBorderAnimation();
    },
  };

  const mobileSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 4000,
    beforeChange: (current, next) => {
      setCurrentSlide(next);
      restartBorderAnimation();
    },
  };

  // Function to restart the border animation
  const restartBorderAnimation = () => {
    setAnimateBorder(false);
    setTimeout(() => setAnimateBorder(true), 10);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth >= 768) {
        desktopSliderRef.current?.slickNext();
      } else {
        mobileSliderRef.current?.slickNext();
      }
    }, 4000); // match your animation duration
  
    return () => clearInterval(interval);
  }, []);

  // Handle manual navigation with animation trigger
  const handleNextSlide = () => {
    if (isNextClicked) return; // prevent double-clicks
    setIsNextClicked(true);
    setAnimateBorder(false);
  
    setTimeout(() => {
      setAnimateBorder(true); // restart animation
  
      // Trigger slide change AFTER animation duration
      setTimeout(() => {
        if (window.innerWidth >= 768) {
          desktopSliderRef.current?.slickNext();
        } else {
          mobileSliderRef.current?.slickNext();
        }
        setIsNextClicked(false);
      }, 4000); // 4s = match border animation duration
    }, 10);
  };

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setAnimateBorder(false);
  
      setTimeout(() => {
        setAnimateBorder(true);
  
        setTimeout(() => {
          if (window.innerWidth >= 768) {
            desktopSliderRef.current?.slickNext();
          } else {
            mobileSliderRef.current?.slickNext();
          }
        }, 4000); // wait for animation
      }, 10);
    }, 4000); // Trigger every 4s — same as duration
  
    return () => clearInterval(autoSlide);
  }, []);
  
  // Image animation variants
  const imageVariants = [
    {
      // Slide 1: Zoom in
      initial: { opacity: 0, scale: 1.1 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
    },
    {
      // Slide 2: Slide from left
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 50 },
    },
    {
      // Slide 3: Fade and rotate
      initial: { opacity: 0, rotate: 10 },
      animate: { opacity: 1, rotate: 0 },
      exit: { opacity: 0, rotate: -10 },
    },
  ];

  return (
    <section className="relative w-full h-screen overflow-hidden text-white">
      {/* Background Carousel */}
      <div className="hidden w-full h-full md:block">
        <Slider ref={desktopSliderRef} {...desktopSettings}>
          {images.map((image, i) => (
            <div key={i} className="w-full h-screen">
              <AnimatePresence mode="wait">
                <motion.img
                  key={i}
                  src={image}
                  alt={`Desktop Slide ${i + 1}`}
                  className="object-cover w-full h-full"
                  variants={imageVariants[i % imageVariants.length]} // Use different variants
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </div>
          ))}
        </Slider>
      </div>

      {/* Mobile Slider */}
      <div className="block w-full h-full md:hidden">
        <Slider ref={mobileSliderRef} {...mobileSettings}>
          {mobileImages.map((image, i) => (
            <div key={i} className="w-full h-screen">
              <AnimatePresence mode="wait">
                <motion.img
                  key={i}
                  src={image}
                  alt={`Mobile Slide ${i + 1}`}
                  className="object-cover w-full h-full"
                  variants={imageVariants[i % imageVariants.length]}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
              </AnimatePresence>
            </div>
          ))}
        </Slider>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-10 bg-black/30" />

      {/* Hero Text */}
      <div className="absolute inset-0 z-20 flex items-center justify-start">
        <div className="relative max-w-4xl px-6 text-left md:px-20">
          <motion.div
            className="max-w-2xl text-left text-white"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.p
              className="mb-2 text-[16px] text-white/70"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              Welcome To TenTwenty Farms
            </motion.p>
            <motion.h1
              className="text-[46px] md:text-[64px] font-light leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.9 }}
            >
              From Our Farms
              <br />
              To Your Hands
            </motion.h1>
          </motion.div>
        </div>
      </div>

      {/* Next Preview + Slide Count */}
      <div className="absolute z-30 flex items-center space-x-4 bottom-6 left-6">
        <motion.div
          className="relative flex items-center justify-center w-24 h-24 overflow-hidden rounded-sm shadow-lg cursor-pointer md:w-20 md:h-20 hover:scale-105"
          onClick={handleNextSlide}
          animate={isNextClicked ? { scale: 1.2 } : { scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className={`border-animation-wrapper ${animateBorder ? 'animate-gradient-border' : ''}`}>
            <img
              src={images[(currentSlide + 1) % images.length]}
              alt="Next Slide Preview"
              className="object-cover w-full h-full"
            />
            <span className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white bg-black/40">
              Next
            </span>
          </div>
        </motion.div>
        <div className="text-sm text-white">
          <div className="flex items-center gap-2">
            <span>{String(currentSlide + 1).padStart(2, "0")}</span>
            <hr className="w-6 border-t border-white" />
            <span>{String(images.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
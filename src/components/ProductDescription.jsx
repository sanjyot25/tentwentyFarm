import React, { useRef, useEffect, useState } from 'react';
import ClientSlider from './ClientSlider';
import { motion, useAnimation } from 'framer-motion';

function ProductDescription() {
  const sectionRef = useRef(null);
  const headingControls = useAnimation();
  const paragraphControls = useAnimation();
  const [inView, setInView] = useState(false);

  const headingVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
  };

  const paragraphVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delay: 0.4, duration: 0.6, ease: 'easeInOut' } },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target); // Stop observing after animating
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (inView) {
      headingControls.start('animate');
      paragraphControls.start('animate');
    }
  }, [inView, headingControls, paragraphControls]);

  return (
    <section ref={sectionRef} className="px-6 py-20 text-center bg-white">
      <motion.h2
        className="mb-4 text-4xl font-semibold"
        variants={headingVariants}
        initial="initial"
        animate={headingControls}
      >
        Quality Products
      </motion.h2>
      <motion.p
        className="max-w-2xl mx-auto text-gray-600"
        variants={paragraphVariants}
        initial="initial"
        animate={paragraphControls}
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.
      </motion.p>
      <div>
        <ClientSlider />
      </div>
    </section>
  );
}

export default ProductDescription;
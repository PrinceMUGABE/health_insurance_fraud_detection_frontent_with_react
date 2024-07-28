/* eslint-disable no-unused-vars */
import React from "react";
import hero from "../../assets/police_image/img1.jpeg";

const Hero = () => {
  return (

    <div className="dark:bg-gray-950 dark:text-white duration-300 " id="home">
      <div className="container min-h-[620px] flex mt-10 sm:mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center">
          {/* Image section */}
          <div data-aos="zoom-in" className="order-1 sm:order-2 relative">
            <img
              src={hero}
              alt=""
              className="w-full sm:max-w-[280px] md:max-w-[430px]"
            />
            <div
              data-aos="slide-right"
              className="absolute -bottom-5 -right-8 px-4 py-2 rounded-xl bg-white dark:bg-gray-900 dark:text-white shadow-md"
            >
            </div>
          </div>

          {/* Text section */}
          <div className="space-y-5 order-2 sm:order-1 xl:pr-40 ">
            <h1
              data-aos="fade-up"
              className="text-4xl sm:text-5xl font-semibold"
              style={{ lineHeight: 1.2 }}
            >
              {/* Get in tourch with updated police{" "} */}
              <span className="text-primary">Fraud Guard Healthy</span>
            </h1>
            <p data-aos="fade-up" data-aos-delay="300">
                 1995, We chose to customize every aspect of our service. Every member of our team is devoted to working with you to understand your particular needs and goals so together we can find solutions that fit your lifestyle.

                <br /> <br />While many services might say they are ‘personalized’ and ‘comprehensive’, we really are! We use latest technology to tract your medical history with us.

                <br /><br />Most of our services are open 24/7 and 30+ specialists are available. Our Doctors are very friendly and will help you to determine your goals for your day here.
            </p>
            {/* <button
              data-aos="fade-up"
              data-aos-delay="500"
              data-aos-offset="0"
              className="primary-btn"
            >
              Learn More
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

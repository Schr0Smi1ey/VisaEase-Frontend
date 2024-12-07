import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Contexts/AuthContext/AuthProvider";
import slide1 from "../../../../Assets/Slide1.jpg";
import slide2 from "../../../../Assets/Slide2.jpg";
import slide3 from "../../../../Assets/Slide3.jpg";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Bounce,
  Fade,
  Flip,
  Hinge,
  JackInTheBox,
  Roll,
  Slide,
} from "react-awesome-reveal";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
  const sliderContent = [
    {
      id: "slide1",
      title: "Hassle-Free Visa Assistance",
      description:
        "Navigate the complexities of visa applications with VisaEase. Simplified steps, personalized guidance, and hassle-free processes await you!",
      buttonText: "Explore Visas",
      imgSrc: slide1,
    },
    {
      id: "slide2",
      title: "Fast & Reliable Processing",
      description:
        "Get your visa faster with our streamlined processing. Trusted by thousands, VisaEase ensures timely and accurate results every time.",
      buttonText: "Check Processing Times",
      imgSrc: slide2,
    },
    {
      id: "slide3",
      title: "Your Gateway to the World",
      description:
        "Unlock endless possibilities with VisaEase. From travel to work visas, we’ve got you covered. Start your journey today!",
      buttonText: "Get Started",
      imgSrc: slide3,
    },
  ];
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    AOS.init({ duration: 500 });
  }, []);
  const goToPreviousSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + sliderContent.length) % sliderContent.length
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderContent.length);
  };

  const handleLearningBtn = () => {
    navigate("/start-learning");
  };
  const { id, title, description, buttonText, imgSrc } =
    sliderContent[currentSlide];
  const handleType = (count) => {
    // access word count number
    console.log(count);
  };

  return (
    <section className="md:container mx-auto my-5">
      <div className="carousel w-full">
        <div
          key={id}
          className={`carousel-item relative w-full`}
          data-aos="fade-down"
          data-aos-duration="1000"
        >
          <div
            className={`w-full md:p-10 md:px-16 lg:px-28 flex justify-center items-center`}
          >
            <div className="text-center md:text-left flex flex-col items-center md:flex-row">
              <div className="flex justify-center items-center md:w-4/6 lg:w-3/6">
                <img
                  src={imgSrc}
                  alt={`Slide ${id}`}
                  className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full hover:scale-105 border-4 border-primary p-2"
                  data-aos="zoom-in"
                  data-aos-duration="800"
                />
              </div>
              <div className="w-4/6 mb-4 md:ml-4 lg:ml-6">
                <h1 data-aos="fade-left">
                  <Slide direction="right">
                    <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-5">
                      {/* Style will be inherited from the parent element */}
                      <Typewriter
                        words={[title]}
                        loop={1}
                        cursor
                        cursorStyle=""
                        typeSpeed={70}
                        deleteSpeed={50}
                        delaySpeed={1000}
                        // onLoopDone={handleDone}
                        onType={handleType}
                      />
                    </h1>
                  </Slide>
                </h1>
                <p
                  className="font-normal text-base text-gray-800 mb-6"
                  data-aos="fade-left"
                  data-aos-delay="200"
                >
                  {description}
                </p>
                <button
                  onClick={() =>
                    navigate(
                      buttonText === "Get Started" && !user
                        ? "/signup"
                        : "/all-visas"
                    )
                  }
                  className="btn bg-primary/90 hover:bg-white hover:text-black hover:border-2 hover:border-green-500 font-semibold text-lg text-white"
                  data-aos="fade-up"
                  data-aos-delay="400"
                  data-aos-duration="1000"
                >
                  {buttonText}
                </button>
              </div>
            </div>
            <div
              key={id}
              className="absolute left-2 right-2 md:left-4 md:right-4 lg:left-14 lg:right-14 top-1/2 flex -translate-y-1/2 transform justify-between"
            >
              <button
                onClick={goToPreviousSlide}
                className="btn btn-circle bg-white text-lg border-none hover:bg-white"
                data-aos="fade-left"
                data-aos-duration="800"
              >
                ❮
              </button>
              <button
                onClick={goToNextSlide}
                className="btn btn-circle bg-white text-lg border-none hover:bg-white"
                data-aos="fade-right"
                data-aos-duration="800"
              >
                ❯
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;

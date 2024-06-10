import React from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo2.png";
import arrow1 from "../assets/arrow1.svg";
import arrow2 from "../assets/arrow2.svg";
import photo from "../assets/photo.jpeg";

export const Aboutus = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      {/* <div className="w-full h-36 border-b border-gray-400 flex items-center px-4 gap-4 md:px-20 md:gap-8 lg:px-32 lg:gap-20">
        <img
          className="w-16 h-16 md:w-24 md:h-24 lg:w-32 lg:h-32"
          src={logo}
          alt="logo"
        ></img>
        <p className="text-sm text-white/80 font-semibold md:text-xl lg:text-3xl">
          Become a Best Team
        </p>
      </div> */}
      <div className="flex flex-col justify-between min-h-screen bg-black">
        <div className="flex flex-col gap-4 py-8 px-4 md:gap-8 md:py-16 md:px-20 lg:gap-12 lg:py-24 lg:px-50">
          <p className="text-xl text-center text-pink-400 font-bold md:text-3xl lg:text-4xl">
            Launching Soon
          </p>
          <div className="text-center text-gray-500 font-bold text-lg md:text-2xl flex flex-col items-center">
            <p>
              Get ready to follow all your favorite high school sports matches
              here!
              <br />
              Stay tuned for live updates, match results, and more starting this
              August.
            </p>
          </div>
          <div className="text-center text-base font-bold flex justify-center">
            <p>
              <span className="text-blue-400">40+ Men’s</span>
              <span className="text-gray-500"> teams and</span>
              <span className="text-pink-400"> 70+ Women’s</span>
              <span className="text-gray-500"> teams are here!</span>
            </p>
          </div>
          <div className="flex flex-row justify-center gap-6 items-end md:gap-14 lg:gap-20">
            <img
              className="w-16 h-16 md:w-24 md:h-24"
              src={arrow1}
              alt="arrow1"
            ></img>
            <div
              className="w-40 h-14 flex hover:cursor-pointer bg-white rounded-full items-center justify-center md:w-52 md:h-16"
              onClick={() => navigate("/sports")}
            >
              <p className="text-black font-bold text-sm md:text-xl">
                Get Started
              </p>
            </div>
            <div className="w-16 h-16 md:w-24 md:h-24"></div>
          </div>
        </div>
        <div className="flex flex-row justify-center gap-6 items-end md:gap-14 lg:gap-20">
          <div className="w-16 h-16 md:w-24 md:h-24"></div>
          <img
            className="w-full max-w-xs md:max-w-lg lg:max-w-xl"
            src={photo}
            alt="photo"
          ></img>
          <img
            className="w-16 h-16 md:w-24 md:h-24"
            src={arrow2}
            alt="arrow2"
          ></img>
        </div>
      </div>
    </div>
  );
};

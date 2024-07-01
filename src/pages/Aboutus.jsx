import React from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/logo2.png";
import arrow1 from "../assets/arrow1.svg";
import arrow2 from "../assets/arrow2.svg";
import photo from "../assets/photo.jpeg";

export const Aboutus = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col flex-1 justify-between bg-black">
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
          <div
            className="w-40 h-14 flex hover:cursor-pointer bg-white rounded-full items-center justify-center md:w-52 md:h-16"
            onClick={() => navigate("/sports")}
          >
            <p className="text-black font-bold text-sm md:text-xl">
              Get Started
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

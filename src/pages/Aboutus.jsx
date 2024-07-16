import React from "react";
import { useNavigate } from "react-router-dom";

import bullet from "../assets/bullet.svg";
import logo_black from "../assets/logo_black.svg";
import instagram_logo from "../assets/instagram.svg";
import facebook_logo from "../assets/facebook.svg";
import mail_logo from "../assets/mail.svg";

export const Aboutus = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-1 justify-between bg-[rgb(148,172,196)]">
      <div className="flex-1 flex flex-col items-center justify-center">
        <img src={logo_black} className="w-full xl:w-[80%] mb-[4vw]"/>
        <div className="font-semibold text-[2vw] text-center mb-[1vw]">CONTACT US</div>
        <div className="flex flex-col gap-[.3vw]">
          <div className="flex gap-[1vw] items-center">
            <img src={instagram_logo} className="w-[3vw] h-[3vw]"/>
            <div className="text-[1.6vw] xl:text-[1.4vw]">VODASTATSPR</div>
          </div>
          <div className="flex gap-[1vw] items-center">
            <img src={facebook_logo} className="w-[3vw] h-[3vw]"/>
            <div className="text-[1.6vw] xl:text-[1.4vw]">VODA STATS PR</div>
          </div>
          <div className="flex gap-[1vw] items-center">
            <img src={mail_logo} className="w-[3vw] h-[3vw]"/>
            <div className="text-[1.6vw] xl:text-[1.4vw]">FELIX@VODASTATSPR.com</div>
          </div>
        </div>
      </div>
      <div className="flex-1 flex items-center">
        <div className="bg-[rgb(250,246,245)] rounded-l-[4vw] w-full pl-[5vw] pr-[5vw] max-h-[100vh] py-[5vw] flex flex-col justify-center gap-[1vh]">
          <div className="font-semibold text-[2vw]">VISION</div>
          <div className="text-[1.6vw] xl:text-[1.4vw] text-gray-900 relative">
            <img className="absolute -left-[3.5vw] top-[.2vw] w-[3vw]" src={bullet}/>
            To empower high school athletes, coaches, and communities by providing
            a comprehensive and accessible platform for tracking, analyzing, and 
            celebrating achievements in high school sports.
          </div>
          <div className="h-[2px] bg-[rgb(148,172,196)]"></div>
          <div className="font-semibold text-[2vw]">MISSION</div>
          <div className="text-[1.6vw] xl:text-[1.4vw] relative">
            <img className="absolute -left-[3.5vw] top-[.2vw] w-[3vw]"src={bullet}/>
            Enhance transparency & accessbility
          </div>
          <div className="text-[1.6vw] xl:text-[1.4vw] relative">
            <img className="absolute -left-[3.5vw] top-[.2vw] w-[3vw]"src={bullet}/>
          Provide a centralized hub</div>
          <div className="text-[1.6vw] xl:text-[1.4vw] relative">
            <img className="absolute -left-[3.5vw] top-[.2vw] w-[3vw]"src={bullet}/>
          Empower athletes and coaches</div>
          <div className="text-[1.6vw] xl:text-[1.4vw] relative">
            <img className="absolute -left-[3.5vw] top-[.2vw] w-[3vw]"src={bullet}/>
          Celebrate achievements</div>
          <div className="text-[1.6vw] xl:text-[1.4vw] relative">
            <img className="absolute -left-[3.5vw] top-[.2vw] w-[3vw]"src={bullet}/>
          Promote community engagement</div>
          <div className="text-[1.6vw] xl:text-[1.4vw] relative">
            <img className="absolute -left-[3.5vw] top-[.2vw] w-[3vw]"src={bullet}/>
          Support growth and development</div>
        </div>
      </div>
    </div>
  );
};

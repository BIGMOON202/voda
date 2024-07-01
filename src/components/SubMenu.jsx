import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import volleyball_icon from "../assets/icons/volleyball_icon.png";
import soccer_icon from "../assets/icons/soccer_icon.png";
import basketball_icon from "../assets/icons/basketball_icon.png";
import filter_icon from "../assets/icons/filter_icon.png";
import icon_dropdown1 from "../assets/icons/icon_dropdown1.svg";
import success_icon from "../assets/icons/success.png";

export const SubMenu = ({
  selectedSport,
  setSelectedSport,
  selectedSubTab,
  setSelectedSubTab,
  selectedGender,
  setSelectedGender,
}) => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    // Add when the component mounts
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remove event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setShowDropdown(false);
  };

  return (
    <>
      <div className="border-t border-b flex px-[40px] py-[26px] justify-between">
        <div className="flex gap-[20px]">
          {/* Volleyball Button */}
          <div
            onClick={() => setSelectedSport("Volleyball")}
            className={`w-[210px] h-[68px] rounded-[12px] flex items-center py-[14px] px-[20px] hover: cursor-pointer ${
              selectedSport === "Volleyball"
                ? "bg-[#94ACC4]/30"
                : "bg-[#FFFFFF] border border-[#CFCFCF]"
            }`}
          >
            <div
              className={`w-[40px] h-[40px] rounded-[10px] py-[8px] px-[8px] ${
                selectedSport === "Volleyball"
                  ? "bg-white/45"
                  : "bg-[#D2D2D2]/45"
              }`}
            >
              <img
                src={volleyball_icon}
                alt="volleyball icon"
                className="w-[24px] h-[24px]"
              />
            </div>
            <p
              className={`ml-[14px] text-[18px] ${
                selectedSport === "Volleyball" ? "font-bold" : "font-medium"
              }`}
            >
              Volleyball
            </p>
          </div>
          {/* Basketball Button */}
          <div
            onClick={() => setSelectedSport("Basketball")}
            className={`w-[210px] h-[68px] rounded-[12px] flex items-center py-[14px] px-[20px] hover: cursor-pointer ${
              selectedSport === "Basketball"
                ? "bg-[#94ACC4]/30"
                : "bg-[#FFFFFF] border border-[#CFCFCF]"
            }`}
          >
            <div
              className={`w-[40px] h-[40px] rounded-[10px] py-[8px] px-[8px] ${
                selectedSport === "Basketball"
                  ? "bg-white/45"
                  : "bg-[#D2D2D2]/45"
              }`}
            >
              <img
                src={basketball_icon}
                alt="basketball icon"
                className="w-[24px] h-[24px]"
              />
            </div>
            <p
              className={`ml-[14px] text-[18px] ${
                selectedSport === "Basketball" ? "font-bold" : "font-medium"
              }`}
            >
              Basketball
            </p>
          </div>
          {/* Soccer Button */}
          <div
            onClick={() => setSelectedSport("Soccer")}
            className={`w-[210px] h-[68px] rounded-[12px] flex items-center py-[14px] px-[20px] hover: cursor-pointer ${
              selectedSport === "Soccer"
                ? "bg-[#94ACC4]/30"
                : "bg-[#FFFFFF] border border-[#CFCFCF]"
            }`}
          >
            <div
              className={`w-[40px] h-[40px] rounded-[10px] py-[8px] px-[8px] ${
                selectedSport === "Soccer" ? "bg-white/45" : "bg-[#D2D2D2]/45"
              }`}
            >
              <img
                src={soccer_icon}
                alt="soccer icon"
                className="w-[24px] h-[24px]"
              />
            </div>
            <p
              className={`ml-[14px] text-[18px] ${
                selectedSport === "Soccer" ? "font-bold" : "font-medium"
              }`}
            >
              Soccer
            </p>
          </div>
        </div>
        {/* Gender Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <div
            className="w-[198px] h-[68px] rounded-[12px] flex items-center py-[14px] px-[12px] bg-black hover:cursor-pointer justify-between"
            onClick={toggleDropdown}
          >
            <div className="w-[40px] h-[40px] rounded-[10px] flex justify-center items-center bg-white">
              <img
                src={filter_icon}
                alt="filter icon"
                className="w-[22px] h-[22px]"
              />
            </div>
            <p className="font-bold text-[22px] text-white">{selectedGender}</p>
            <div className="flex items-center justify-center h-full">
              <img
                src={icon_dropdown1}
                alt="dropdown icon"
                className="w-[26px] h-[26px]"
              />
            </div>
          </div>
          {showDropdown && (
            <div className="absolute top-[68px] w-[198px]">
              <div
                className="bg-[#DFE6ED] hover:bg-[#555] hover:text-white cursor-pointer py-[10px] px-[20px] flex justify-between"
                onClick={() => handleGenderSelect("Men")}
              >
                <p>Men</p>
                {selectedGender == "Men" && (
                  <img className="w-[32px] h-[32px]" src={success_icon}></img>
                )}
              </div>
              <div
                className="bg-[#DFE6ED] hover:bg-[#555] hover:text-white cursor-pointer py-[10px] px-[20px] flex justify-between"
                onClick={() => handleGenderSelect("Women")}
              >
                <p>Women</p>
                {selectedGender == "Women" && (
                  <img className="w-[32px] h-[32px]" src={success_icon}></img>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* SubTabs Section */}
      <div className="ml-[40px] mt-[26px] mb-[26px] p-[4px] w-[846px] h-[56px] rounded-[12px] flex items-center bg-[#F8FAFC]">
        {/* SubTabs */}
        <div
          onClick={() => setSelectedSubTab("Standings")}
          className={`w-[163px] h-[48px] place-content-center rounded-[12px] hover: cursor-pointer ${
            selectedSubTab === "Standings" ? "bg-[#94ACC4]/30" : ""
          }`}
        >
          <p
            className={`text-center text-[18px] ${
              selectedSubTab === "Standings" ? "font-bold" : ""
            }`}
          >
            Standings
          </p>
        </div>
        <div
          onClick={() => setSelectedSubTab("Results")}
          className={`w-[127px] h-[48px] place-content-center rounded-[12px] hover: cursor-pointer ${
            selectedSubTab === "Results" ? "bg-[#94ACC4]/30" : ""
          }`}
        >
          <p
            className={`text-center text-[18px] ${
              selectedSubTab === "Results" ? "font-bold" : ""
            }`}
          >
            Results
          </p>
        </div>
        <div
          onClick={() => setSelectedSubTab("Teams")}
          className={`w-[135px] h-[48px] place-content-center rounded-[12px] hover: cursor-pointer ${
            selectedSubTab === "Teams" ? "bg-[#94ACC4]/30" : ""
          }`}
        >
          <p
            className={`text-center text-[18px] ${
              selectedSubTab === "Teams" ? "font-bold" : ""
            }`}
          >
            Teams
          </p>
        </div>
        <div
          onClick={() => setSelectedSubTab("Schedule")}
          className={`w-[154px] h-[48px] place-content-center rounded-[12px] hover: cursor-pointer ${
            selectedSubTab === "Schedule" ? "bg-[#94ACC4]/30" : ""
          }`}
        >
          <p
            className={`text-center text-[18px] ${
              selectedSubTab === "Schedule" ? "font-bold" : ""
            }`}
          >
            Schedule
          </p>
        </div>
        <div
          onClick={() => setSelectedSubTab("Players")}
          className={`w-[137px] h-[48px] place-content-center rounded-[12px] hover: cursor-pointer ${
            selectedSubTab === "Players" ? "bg-[#94ACC4]/30" : ""
          }`}
        >
          <p
            className={`text-center text-[18px] ${
              selectedSubTab === "Players" ? "font-bold" : ""
            }`}
          >
            Players
          </p>
        </div>
        <div
          onClick={() => setSelectedSubTab("Stats")}
          className={`w-[122px] h-[48px] place-content-center rounded-[12px] hover: cursor-pointer ${
            selectedSubTab === "Stats" ? "bg-[#94ACC4]/30" : ""
          }`}
        >
          <p
            className={`text-center text-[18px] ${
              selectedSubTab === "Stats" ? "font-bold" : ""
            }`}
          >
            Stats
          </p>
        </div>
      </div>
    </>
  );
};

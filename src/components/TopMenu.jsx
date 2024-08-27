import { auth } from "../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import image_discount from "../assets/image_discount.svg";
import logo from "../assets/logo.png";
import dropdown from "../assets/icons/icon_dropdown.svg";
import avatar from "../assets/avatar.png";

export const TopMenu = ({ selectedTab, setSelectedTab }) => {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/signin");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <div className="bg-[#C2FFDB] flex gap-[10px] py-[15px] px-[60px]">
        <img src={image_discount} alt="image_discount" />
        <p className="text-[16px]">
          Official Website of High School Sports Results and Stats
        </p>
      </div>
      <div className="flex justify-between items-center bg-[#F8FAFC]">
        <div className="flex py-[20px] px-[40px]">
          <img src={logo} alt="logo" className="w-12 h-12" />
          <div className="ml-[60px] flex gap-[20px] items-center">
            <p
              className={`text-[24px] hover:font-bold hover:cursor-pointer ${
                location.pathname === "/aboutus" ? "font-bold underline" : ""
              }`}
              onClick={() => navigate("/aboutus")}
            >
              About Us
            </p>
            {/* <p
              className={`text-[24px] hover:font-bold hover:cursor-pointer ${
                location.pathname === "/sponsors" ? "font-bold underline" : ""
              }`}
              onClick={() => navigate("/sponsors")}
            >
              Sponsors
            </p> */}
            <p
              className={`text-[24px] hover:font-bold hover:cursor-pointer ${
                location.pathname === "/sports" ? "font-bold underline" : ""
              }`}
              onClick={() => navigate("/sports")}
            >
              Sports
            </p>
            <p
              className={`text-[24px] hover:font-bold hover:cursor-pointer ${
                location.pathname === "/brackets" ? "font-bold underline" : ""
              }`}
              onClick={() => navigate("/brackets")}
            >
              Brackets
            </p>
            <p
              className={`text-[24px] hover:font-bold hover:cursor-pointer ${
                location.pathname === "/privacy" ? "font-bold underline" : ""
              }`}
              onClick={() => navigate("/privacy")}
            >
              Privacy
            </p>
            {user && user.email == "felix@vodastatspr.com" && (
              <>
                <p
                  className={`text-[24px] hover:font-bold hover:cursor-pointer ${
                    location.pathname === "/upload" ? "font-bold" : ""
                  }`}
                  onClick={() => navigate("/upload")}
                >
                  Upload Data
                </p>
                <p
                  className={`text-[24px] hover:font-bold hover:cursor-pointer ${
                    location.pathname === "/edit_stats" ? "font-bold" : ""
                  }`}
                  onClick={() => navigate("/edit_stats")}
                >
                  Edit Stats
                </p>
              </>
            )}
          </div>
        </div>
        <div className="flex gap-2 mr-[60px] items-center">
          {!user && (
            <p
              className={`text-[24px] hover:font-bold hover:cursor-pointer ${
                location.pathname === "/signin" ? "font-bold" : ""
              }`}
              onClick={() => navigate("/signin")}
            >
              Sign In
            </p>
          )}
          {user && (
            <div
              className="flex gap-2 bg-white py-[10px] px-[15px] rounded-2xl relative hover:cursor-pointer"
              ref={buttonRef}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <img
                src={avatar}
                alt="avatar"
                className="w-[45px] h-[45px] rounded-full border"
              />
              <div>
                <p className="text-[18px]">{user.displayName || "User"}</p>
                <p className="text-[12px] text-[#505050]">{user.email}</p>
              </div>
              <img src={dropdown} alt="dropdown icon" />
              {showDropdown && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-12 py-2 w-48 bg-white rounded-lg shadow-xl"
                >
                  <p
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:cursor-pointer"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

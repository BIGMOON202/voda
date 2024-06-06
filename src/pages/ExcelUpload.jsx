import { auth } from "../firebase-config";
import React, { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { EditData } from "../components/EditData";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function SportsDataManagement() {
  const [activeSport, setActiveSport] = useState("Volleyball");
  const [selectedCategory, setSelectedCategory] = useState("Teams");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email == "felix@vodastatspr.com") {
      } else {
        navigate("/");
      }
    });

    return unsubscribe;
  }, []);

  const toggleSport = (sport) => {
    setActiveSport(sport);
    if (activeSport !== sport) {
      setSelectedCategory("Teams");
    }
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
  };

  const sports = [
    { name: "Volleyball", categories: ["Teams", "Players", "Schedules"] },
    { name: "Soccer", categories: ["Teams", "Players", "Schedules"] },
    { name: "Basketball", categories: ["Teams", "Players", "Schedules"] },
  ];

  const activeStyle = "bg-blue-600";
  const hoverStyle = "hover:bg-gray-400";
  const inactiveStyle = "bg-gray-600";
  const borderStyle = "border-r border-gray-600/10";

  return (
    <>
      <div className="w-full h-[100px] bg-gray-500"></div>
      <div className="flex bg-gray-800/10 text-white min-h-screen">
        <div className={`w-64 space-y-2 p-5 ${borderStyle}`}>
          {sports.map((sport) => (
            <div key={sport.name} className="group">
              <button
                onClick={() => toggleSport(sport.name)}
                className={`flex items-center justify-between w-full px-3 py-2 rounded-md ${
                  activeSport === sport.name ? activeStyle : inactiveStyle
                } ${hoverStyle} transition duration-300 ease-in-out`}
              >
                <span>{sport.name}</span>
                {activeSport === sport.name ? (
                  <ChevronDownIcon className="w-5 h-5" />
                ) : (
                  <ChevronRightIcon className="w-5 h-5" />
                )}
              </button>
              <div
                className={`flex flex-col gap-[5px] pt-[5px] ${
                  activeSport === sport.name ? "block" : "hidden"
                } pl-8`}
              >
                {sport.categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => selectCategory(category)}
                    className={`w-full text-left px-3 py-1 rounded-md ${
                      selectedCategory === category &&
                      activeSport === sport.name
                        ? activeStyle
                        : inactiveStyle
                    } ${hoverStyle} transition duration-300 ease-in-out`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <EditData
          activeSport={activeSport}
          setActiveSport={setActiveSport}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </>
  );
}

export default SportsDataManagement;

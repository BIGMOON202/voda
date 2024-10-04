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
      if (user && user.email === "felix@vodastatspr.com") {
        /* empty */
      } else {
        navigate("/");
      }
    });

    return unsubscribe;
  }, [navigate]);

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
    { name: "MFVolleyball", categories: ["Teams", "Players", "Schedules"] },
    { name: "MMVolleyball", categories: ["Teams", "Players", "Schedules"] },
    { name: "JFVolleyball", categories: ["Teams", "Players", "Schedules"] },
    { name: "JMVolleyball", categories: ["Teams", "Players", "Schedules"] },
    { name: "JRFVolleyball", categories: ["Teams", "Players", "Schedules"] },
    { name: "JRMVolleyball", categories: ["Teams", "Players", "Schedules"] },
    { name: "SFVolleyball", categories: ["Teams", "Players", "Schedules"] },
    { name: "SMVolleyball", categories: ["Teams", "Players", "Schedules"] },
    { name: "PFVolleyball", categories: ["Teams", "Players", "Schedules"] },
    { name: "PMVolleyball", categories: ["Teams", "Players", "Schedules"] },
  ];

  const activeStyle = "bg-green-600 text-white";
  const hoverStyle = "hover:bg-gray-300";
  const inactiveStyle = "bg-gray-700 text-gray-200";
  const borderStyle = "border-r border-gray-500";
  const sidebarBg = "bg-gray-900";

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Sidebar: Sports Category Section */}
      <div
        className={`w-64 p-5 ${borderStyle} overflow-y-auto ${sidebarBg}`}
        style={{ maxHeight: "100vh" }}
      >
        <h2 className="text-lg font-semibold mb-4 text-white">Sports Categories</h2>

        {sports.map((sport) => (
          <div key={sport.name} className="group">
            <button
              onClick={() => toggleSport(sport.name)}
              className={`flex items-center justify-between w-full px-3 py-2 rounded-md ${activeSport === sport.name ? activeStyle : inactiveStyle
                } ${hoverStyle} transition duration-300 ease-in-out hover:shadow-md`}
              aria-label={`Toggle ${sport.name}`}
            >
              <span className="text-sm font-medium">{sport.name}</span>
              {activeSport === sport.name ? (
                <ChevronDownIcon className="w-5 h-5 text-white" />
              ) : (
                <ChevronRightIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>
            <div
              className={`flex flex-col gap-2 pt-2 ${activeSport === sport.name ? "block" : "hidden"} pl-4 border-l-2 border-gray-500`}
            >
              {sport.categories.map((category) => (
                <button
                  key={category}
                  onClick={() => selectCategory(category)}
                  className={`w-full text-left px-3 py-1 rounded-md text-sm ${selectedCategory === category && activeSport === sport.name
                      ? activeStyle
                      : inactiveStyle
                    } ${hoverStyle} transition duration-300 ease-in-out hover:shadow-sm`}
                  aria-label={`Select ${category} in ${sport.name}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Right Section: Table Data */}
      <div
        className="flex-1 p-5 overflow-y-auto bg-gray-100"
        style={{ maxHeight: "100vh" }}
      >
        <EditData
          activeSport={activeSport}
          setActiveSport={setActiveSport}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>
    </div>
  );
}

export default SportsDataManagement;

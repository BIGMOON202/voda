import React from "react";
import { VolleyballDashboard } from "./Volleyball/VolleyballDashboard";
import { SoccerDashboard } from "./Soccer/SoccerDashboard";
import { BasketballDashboard } from "./Basketball/BasketballDashboard";

export const DashboardNational = ({
  selectedSport,
  selectedCategory,
  selectedSubTab,
  selectedGender,
  selectedYear
}) => {
  return (
    <div className="px-[40px]">
      <p className=" text-[24px] font-extrabold mb-[26px]">
        {selectedSport} {selectedSubTab}
      </p>
      {selectedSport == "Volleyball" && (
        <VolleyballDashboard
          selectedSubTab={selectedSubTab}
          selectedGender={selectedGender}
        //   setSelectedGender={setSelectedGender}
          selectedYear={selectedYear}
        />
      )}
      {selectedSport == "Soccer" && (
        <SoccerDashboard
          selectedSubTab={selectedSubTab}
          selectedGender={selectedGender}
        //   setSelectedGender={setSelectedGender}
          selectedYear={selectedYear}
        />
      )}
      {selectedSport == "Basketball" && (
        <BasketballDashboard
          selectedSubTab={selectedSubTab}
          selectedGender={selectedGender}
        //   setSelectedGender={setSelectedGender}
          selectedYear={selectedYear}
        />
      )}
    </div>
  );
};

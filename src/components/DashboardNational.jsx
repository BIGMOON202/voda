import React from "react";
import { VolleyballDashboardNational } from "./Volleyball/VolleyballDashboardNational";
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
        <VolleyballDashboardNational
          selectedSubTab={selectedSubTab}
          selectedGender={selectedGender}
          selectedCategory={selectedCategory}
          selectedYear={selectedYear}
        />
      )}
      {selectedSport == "Soccer" && (
        <SoccerDashboard
          selectedSubTab={selectedSubTab}
          selectedGender={selectedGender}
          selectedCategory={selectedCategory}
          selectedYear={selectedYear}
        />
      )}
      {selectedSport == "Basketball" && (
        <BasketballDashboard
          selectedSubTab={selectedSubTab}
          selectedGender={selectedGender}
          selectedCategory={selectedCategory}
          selectedYear={selectedYear}
        />
      )}
    </div>
  );
};

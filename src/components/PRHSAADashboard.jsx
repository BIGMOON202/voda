import React from "react";
import { PRHSAAVolleyballDashboard } from "./Volleyball/PRHSAAVolleyballDashboard";
import { PRHSAASoccerDashboard } from "./Soccer/PRHSAASoccerDashboard";
import { PRHSAABasketballDashboard } from "./Basketball/PRHSAABasketballDashboard";

export const PRHSAADashboard = ({
  selectedSport,
  setSelectedSport,
  selectedSubTab,
  setSelectedSubTab,
  selectedGender,
  setSelectedGender,
  selectedYear
}) => {
  return (
    <div className="px-[40px]">
      <p className=" text-[24px] font-extrabold mb-[26px]">
        {selectedSport} {selectedSubTab}
      </p>
      {selectedSport == "Volleyball" && (
        <PRHSAAVolleyballDashboard
          selectedSubTab={selectedSubTab}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
          selectedYear={selectedYear}
        />
      )}
      {selectedSport == "Soccer" && (
        <PRHSAASoccerDashboard
          selectedSubTab={selectedSubTab}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
          selectedYear={selectedYear}
        />
      )}
      {selectedSport == "Basketball" && (
        <PRHSAABasketballDashboard
          selectedSubTab={selectedSubTab}
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
          selectedYear={selectedYear}
        />
      )}
    </div>
  );
};

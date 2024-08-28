import React from "react";
import { BasketballStandings } from "./BasketballStandings";
import { BasketballSchedule } from "./BasketballSchedule";
import { PRHSAABasketballTeams } from "./PRHSAABasketballTeams";
import { BasketballPlayers } from "./BasketballPlayers";
import { BasketballResult } from "./BasketballResult";
import { BasketballStats } from "./BasketballStats";

export const PRHSAABasketballDashboard = ({ selectedSubTab, selectedGender, selectedYear }) => {
  return (
    <>
      {selectedSubTab == "Standings" && (
        <BasketballStandings selectedGender={selectedGender} selectedYear={selectedYear}/>
      )}
      {selectedSubTab == "Results" && (
        <BasketballResult selectedGender={selectedGender} selectedYear={selectedYear}/>
      )}
      {selectedSubTab == "Schedule" && (
        <BasketballSchedule selectedGender={selectedGender} selectedYear={selectedYear}/>
      )}
      {selectedSubTab == "Teams" && (
        <PRHSAABasketballTeams selectedGender={selectedGender} selectedYear={selectedYear}/>
      )}
      {selectedSubTab == "Players" && (
        <BasketballPlayers selectedGender={selectedGender} selectedYear={selectedYear}/>
      )}
      {selectedSubTab == "Stats" && (
        <BasketballStats selectedGender={selectedGender} selectedYear={selectedYear}/>
      )}
    </>
  );
};

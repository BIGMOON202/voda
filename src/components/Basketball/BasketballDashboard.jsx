import React from "react";
import { BasketballStandings } from "./BasketballStandings";
import { BasketballSchedule } from "./BasketballSchedule";
import { BasketballTeams } from "./BasketballTeams";
import { BasketballPlayers } from "./BasketballPlayers";
import { BasketballResult } from "./BasketballResult";
import { BasketballStats } from "./BasketballStats";

export const BasketballDashboard = ({ selectedSubTab, selectedGender, selectedYear }) => {
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
        <BasketballTeams selectedGender={selectedGender} selectedYear={selectedYear}/>
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

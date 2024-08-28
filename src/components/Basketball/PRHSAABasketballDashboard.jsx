import React from "react";
import { PRHSAABasketballStandings } from "./PRHSAABasketballStandings";
import { PRHSAABasketballSchedule } from "./PRHSAABasketballSchedule";
import { PRHSAABasketballTeams } from "./PRHSAABasketballTeams";
import { PRHSAABasketballPlayers } from "./PRHSAABasketballPlayers";
import { PRHSAABasketballResult } from "./PRHSAABasketballResult";
import { PRHSAABasketballStats } from "./PRHSAABasketballStats";

export const PRHSAABasketballDashboard = ({ selectedSubTab, selectedGender, selectedYear }) => {
  return (
    <>
      {selectedSubTab == "Standings" && (
        <PRHSAABasketballStandings selectedGender={selectedGender} selectedYear={selectedYear}/>
      )}
      {selectedSubTab == "Results" && (
        <PRHSAABasketballResult selectedGender={selectedGender} selectedYear={selectedYear}/>
      )}
      {selectedSubTab == "Schedule" && (
        <PRHSAABasketballSchedule selectedGender={selectedGender} selectedYear={selectedYear}/>
      )}
      {selectedSubTab == "Teams" && (
        <PRHSAABasketballTeams selectedGender={selectedGender} selectedYear={selectedYear}/>
      )}
      {selectedSubTab == "Players" && (
        <PRHSAABasketballPlayers selectedGender={selectedGender} selectedYear={selectedYear}/>
      )}
      {selectedSubTab == "Stats" && (
        <PRHSAABasketballStats selectedGender={selectedGender} selectedYear={selectedYear}/>
      )}
    </>
  );
};

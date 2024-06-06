import React from "react";
import { BasketballStandings } from "./BasketballStandings";
import { BasketballSchedule } from "./BasketballSchedule";
import { BasketballTeams } from "./BasketballTeams";
import { BasketballPlayers } from "./BasketballPlayers";
import { BasketballResult } from "./BasketballResult";
import { BasketballStats } from "./BasketballStats";

export const BasketballDashboard = ({ selectedSubTab, selectedGender }) => {
  return (
    <>
      {selectedSubTab == "Standings" && (
        <BasketballStandings selectedGender={selectedGender} />
      )}
      {selectedSubTab == "Result" && (
        <BasketballResult selectedGender={selectedGender} />
      )}
      {selectedSubTab == "Schedule" && (
        <BasketballSchedule selectedGender={selectedGender} />
      )}
      {selectedSubTab == "Teams" && (
        <BasketballTeams selectedGender={selectedGender} />
      )}
      {selectedSubTab == "Players" && (
        <BasketballPlayers selectedGender={selectedGender} />
      )}
      {selectedSubTab == "Stats" && (
        <BasketballStats selectedGender={selectedGender} />
      )}
    </>
  );
};

import React from "react";
import { VolleyballStandings } from "./VolleyballStandings";
import { VolleyballTeams } from "./VolleyballTeams";
import { VolleyballResult } from "./VolleyballResult";
import { VolleyballPlayers } from "./VolleyballPlayers";
import { VolleyballSchedule } from "./VolleyballSchedule";
import { VolleyballStats } from "./VolleyballStats";

export const VolleyballDashboard = ({ selectedSubTab, selectedGender }) => {
  return (
    <>
      {selectedSubTab == "Standings" && (
        <VolleyballStandings selectedGender={selectedGender} />
      )}
      {selectedSubTab == "Results" && (
        <VolleyballResult selectedGender={selectedGender} />
      )}
      {selectedSubTab == "Teams" && (
        <VolleyballTeams selectedGender={selectedGender} />
      )}
      {selectedSubTab == "Players" && (
        <VolleyballPlayers selectedGender={selectedGender} />
      )}
      {selectedSubTab == "Schedule" && (
        <VolleyballSchedule selectedGender={selectedGender} />
      )}
      {selectedSubTab == "Stats" && (
        <VolleyballStats selectedGender={selectedGender} />
      )}
    </>
  );
};

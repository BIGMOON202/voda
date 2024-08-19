import React from "react";
import { VolleyballStandings } from "./VolleyballStandings";
import { VolleyballTeams } from "./VolleyballTeams";
import { VolleyballResult } from "./VolleyballResult";
import { VolleyballPlayers } from "./VolleyballPlayers";
import { VolleyballSchedule } from "./VolleyballSchedule";
import { VolleyballStats } from "./VolleyballStats";

export const VolleyballDashboard = ({ selectedSubTab, selectedGender, selectedYear }) => {
  return (
    <>
      {selectedSubTab == "Standings" && (
        <VolleyballStandings selectedGender={selectedGender} selectedYear={selectedYear}/>
      )}
      {selectedSubTab == "Results" && (
        <VolleyballResult selectedGender={selectedGender} selectedYear={selectedYear} />
      )}
      {selectedSubTab == "Teams" && (
        <VolleyballTeams selectedGender={selectedGender} selectedYear={selectedYear} />
      )}
      {selectedSubTab == "Players" && (
        <VolleyballPlayers selectedGender={selectedGender} />
      )}
      {selectedSubTab == "Schedule" && (
        <VolleyballSchedule selectedGender={selectedGender} selectedYear={selectedYear} />
      )}
      {selectedSubTab == "Stats" && (
        <VolleyballStats selectedGender={selectedGender} selectedYear={selectedYear} />
      )}
    </>
  );
};

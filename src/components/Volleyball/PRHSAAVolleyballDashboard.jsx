import React from "react";
import { PRHSAAVolleyballStandings } from "./PRHSAAVolleyballStandings";
import { PRHSAAVolleyballTeams } from "./PRHSAAVolleyballTeams";
import { PRHSAAVolleyballResult } from "./PRHSAAVolleyballResult";
import { PRHSAAVolleyballPlayers } from "./PRHSAAVolleyballPlayers";
import { PRHSAAVolleyballSchedule } from "./PRHSAAVolleyballSchedule";
import { PRHSAAVolleyballStats } from "./PRHSAAVolleyballStats";

export const PRHSAAVolleyballDashboard = ({ selectedSubTab, selectedGender, selectedYear }) => {
  return (
    <>
      {selectedSubTab == "Standings" && (
        <PRHSAAVolleyballStandings selectedGender={selectedGender} selectedYear={selectedYear}/>
      )}
      {selectedSubTab == "Results" && (
        <PRHSAAVolleyballResult selectedGender={selectedGender} selectedYear={selectedYear} />
      )}
      {selectedSubTab == "Teams" && (
        <PRHSAAVolleyballTeams selectedGender={selectedGender} selectedYear={selectedYear} />
      )}
      {selectedSubTab == "Players" && (
        <PRHSAAVolleyballPlayers selectedGender={selectedGender} />
      )}
      {selectedSubTab == "Schedule" && (
        <PRHSAAVolleyballSchedule selectedGender={selectedGender} selectedYear={selectedYear} />
      )}
      {selectedSubTab == "Stats" && (
        <PRHSAAVolleyballStats selectedGender={selectedGender} selectedYear={selectedYear} />
      )}
    </>
  );
};

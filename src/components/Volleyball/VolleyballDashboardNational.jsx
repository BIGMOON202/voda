import React from "react";
import { VolleyballStandings } from "./VolleyballStandings";
import { VolleyballTeams } from "./VolleyballTeams";
import { VolleyballResult } from "./VolleyballResult";
import { VolleyballPlayers } from "./VolleyballPlayers";
import { VolleyballSchedule } from "./VolleyballSchedule";
import { VolleyballStats } from "./VolleyballStats";
import { Brackets } from "../Brackets";

export const VolleyballDashboardNational = ({ selectedSubTab, selectedGender, selectedCategory, selectedYear }) => {
  return (
    <>
      {selectedSubTab == "Results" && (
        <VolleyballResult selectedGender={selectedGender} selectedYear={selectedYear} selectedCategory={selectedCategory} />
      )}
      {selectedSubTab == "Teams" && (
        <VolleyballTeams selectedGender={selectedGender} selectedCategory={selectedCategory} selectedYear={selectedYear} />
      )}
      {selectedSubTab == "Brackets" && (
        <Brackets />
      )}
      {selectedSubTab == "Stats" && (
        <VolleyballStats selectedGender={selectedGender} selectedYear={selectedYear} selectedCategory={selectedCategory} />
      )}
    </>
  );
};

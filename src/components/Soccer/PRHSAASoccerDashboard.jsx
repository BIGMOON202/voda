import React from "react";
import { PRHSAASoccerStandings } from "./PRHSAASoccerStandings";
import { PRHSAASoccerSchedule } from "./PRHSAASoccerSchedule";
import { PRHSAASoccerTeams } from "./PRHSAASoccerTeams";
import { PRHSAASoccerPlayers } from "./PRHSAASoccerPlayers";
import { PRHSAASoccerResult } from "./PRHSAASoccerResult";

export const PRHSAASoccerDashboard = ({ selectedSubTab, selectedGender, selectedYear }) => {
  return (
    <>
      {selectedSubTab == "Standings" && (
        <PRHSAASoccerStandings selectedGender={selectedGender} selectedYear={selectedYear}/>
      )}
      {selectedSubTab == "Results" && (
        <PRHSAASoccerResult selectedGender={selectedGender} selectedYear={selectedYear}/>
      )}
      {selectedSubTab == "Schedule" && (
        <PRHSAASoccerSchedule selectedGender={selectedGender} selectedYear={selectedYear}/>
      )}
      {selectedSubTab == "Teams" && (
        <PRHSAASoccerTeams selectedGender={selectedGender} selectedYear={selectedYear}/>
      )}
      {selectedSubTab == "Players" && (
        <PRHSAASoccerPlayers selectedGender={selectedGender} selectedYear={selectedYear}/>
      )}
      {/* {selectedSubTab == "Stats" && (
        <SoccerStats selectedGender={selectedGender} />
      )} */}
    </>
  );
};

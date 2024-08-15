import React from "react";
import { SoccerStandings } from "./SoccerStandings";
import { SoccerSchedule } from "./SoccerSchedule";
import { SoccerTeams } from "./SoccerTeams";
import { SoccerPlayers } from "./SoccerPlayers";
import { SoccerResult } from "./SoccerResult";

export const SoccerDashboard = ({ selectedSubTab, selectedGender, selectedYear }) => {
  return (
    <>
      {selectedSubTab == "Standings" && (
        <SoccerStandings selectedGender={selectedGender} selectedYear={selectedYear}/>
      )}
      {selectedSubTab == "Results" && (
        <SoccerResult selectedGender={selectedGender} selectedYear={selectedYear}/>
      )}
      {selectedSubTab == "Schedule" && (
        <SoccerSchedule selectedGender={selectedGender} selectedYear={selectedYear}/>
      )}
      {selectedSubTab == "Teams" && (
        <SoccerTeams selectedGender={selectedGender} selectedYear={selectedYear}/>
      )}
      {selectedSubTab == "Players" && (
        <SoccerPlayers selectedGender={selectedGender} selectedYear={selectedYear}/>
      )}
      {/* {selectedSubTab == "Stats" && (
        <SoccerStats selectedGender={selectedGender} />
      )} */}
    </>
  );
};

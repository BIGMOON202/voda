import React from "react";
import { SoccerStandings } from "./SoccerStandings";
import { SoccerSchedule } from "./SoccerSchedule";
import { SoccerTeams } from "./SoccerTeams";
import { SoccerPlayers } from "./SoccerPlayers";
import { SoccerResult } from "./SoccerResult";

export const SoccerDashboard = ({ selectedSubTab, selectedGender }) => {
  return (
    <>
      {selectedSubTab == "Standings" && (
        <SoccerStandings selectedGender={selectedGender} />
      )}
      {selectedSubTab == "Results" && (
        <SoccerResult selectedGender={selectedGender} />
      )}
      {selectedSubTab == "Schedule" && (
        <SoccerSchedule selectedGender={selectedGender} />
      )}
      {selectedSubTab == "Teams" && (
        <SoccerTeams selectedGender={selectedGender} />
      )}
      {selectedSubTab == "Players" && (
        <SoccerPlayers selectedGender={selectedGender} />
      )}
      {/* {selectedSubTab == "Stats" && (
        <SoccerStats selectedGender={selectedGender} />
      )} */}
    </>
  );
};

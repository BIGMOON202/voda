import React from "react";
import { BasketballStandingRow } from "./BasketballStandingRow";
import teamlogo from "../../assets/teamlogo.png";

import { BasketballStanding_Firestoreoverall } from "../../hooks/BasketballStanding_Firestoreoverall";

export const BasketballStandings = ({ selectedGender }) => {
  const getTotalScore = (result) => {
    if (result.Score == null) {
      return [0, 0];
    } else {
      return result.Score.split("-").map(Number);
    }
  };

  const { teamsData, schedulesData, error } =
    BasketballStanding_Firestoreoverall();

  const documents = [];

  const filteredTeams = teamsData.filter(
    (team) => team.Gender === selectedGender.charAt(0)
  );
  const filteredSchedules = schedulesData.filter(
    (schedule) => schedule.Gender === selectedGender.charAt(0)
  );

  filteredTeams.forEach((team) => {
    const teamRow = { CW_Score: 0, CL_Score: 0, TW_Score: 0, TL_Score: 0 };
    teamRow.name = team.TeamName;
    teamRow.imageUrl = team.imageUrl;
    const subFilteredSchedules = filteredSchedules.filter((schedule) => {
      return (
        team.Abbreviation === schedule["TeamA"] ||
        team.Abbreviation === schedule["TeamB"]
      );
    });

    subFilteredSchedules.forEach((data) => {
      const [ScoreA, ScoreB] = getTotalScore(data);

      if (
        (data["TeamA"] === team.Abbreviation && ScoreA > ScoreB) ||
        (data["TeamB"] === team.Abbreviation && ScoreA < ScoreB)
      ) {
        if (data.Type === "C") {
          teamRow.CW_Score += 1;
        } else {
          teamRow.TW_Score += 1;
        }
      } else if (
        (data["TeamA"] === team.Abbreviation && ScoreA < ScoreB) ||
        (data["TeamB"] === team.Abbreviation && ScoreA > ScoreB)
      ) {
        if (data.Type === "C") {
          teamRow.CL_Score += 1;
        } else {
          teamRow.TL_Score += 1;
        }
      }
    });

    documents.push(teamRow);
  });

  documents.forEach((team) => {
    const totalScore =
      team.TW_Score + team.CW_Score + team.TL_Score + team.CL_Score;
    team.sortingValue =
      totalScore === 0
        ? -Infinity
        : (team.TW_Score + team.CW_Score) / totalScore;
  });

  const sortedDocuments = documents.sort(
    (a, b) => b.sortingValue - a.sortingValue
  );

  return (
    <>
      <div className="w-full h-[68px] mb-[18px] bg-[#DFE6ED] flex">
        <div className="w-1/4 px-[20px] flex items-center">
          <p className="font-bold text-[18px]">Team</p>
        </div>
        <div className="w-1/4 px-[20px] flex items-center">
          <p className="font-bold text-[18px]">Overall</p>
        </div>
        <div className="w-1/4 px-[20px] flex items-center">
          <p className="font-bold text-[18px]">Tournament</p>
        </div>
        <div className="w-1/4 px-[20px] flex items-center">
          <p className="font-bold text-[18px]">Conference</p>
        </div>
      </div>

      <div className="flex flex-col gap-[10px]">
        {sortedDocuments.map((team, index) => (
          <BasketballStandingRow
            key={index}
            teamlogo={team.imageUrl}
            teamname={team.name}
            overall={`${team.CW_Score + team.TW_Score} - ${
              team.CL_Score + team.TL_Score
            }`}
            tournament={`${team.TW_Score} - ${team.TL_Score}`}
            conference={`${team.CW_Score} - ${team.CL_Score}`}
          />
        ))}
      </div>
    </>
  );
};

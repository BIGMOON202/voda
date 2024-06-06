import React from "react";
import { VolleyballStandingRow } from "./VolleyballStandingRow";
import teamlogo from "../../assets/teamlogo.png";

import { useFirestoreOverall } from "../../hooks/useFirestoreOverall";

export const VolleyballStandings = ({ selectedGender }) => {
  const calculateResult = (set1, set2, set3) => {
    // Define a default value for each set score if it's undefined or null
    const defaultScore = "0-0";
    const score1 = set1 || defaultScore;
    const score2 = set2 || defaultScore;
    const score3 = set3 || defaultScore;

    // Split scores by '-' to get individual scores
    const [set1TeamAScore, set1TeamBScore] = score1.split("-").map(Number);
    const [set2TeamAScore, set2TeamBScore] = score2.split("-").map(Number);
    const [set3TeamAScore, set3TeamBScore] = score3.split("-").map(Number);

    // Calculate the total number of sets won by each team
    const teamASetsWon =
      (set1TeamAScore > set1TeamBScore ? 1 : 0) +
      (set2TeamAScore > set2TeamBScore ? 1 : 0) +
      (set3TeamAScore > set3TeamBScore ? 1 : 0);
    const teamBSetsWon =
      (set1TeamBScore > set1TeamAScore ? 1 : 0) +
      (set2TeamBScore > set2TeamAScore ? 1 : 0) +
      (set3TeamBScore > set3TeamAScore ? 1 : 0);

    return { teamASetsWon, teamBSetsWon };
  };

  const { teamsData, schedulesData, error } = useFirestoreOverall();

  const documents = [];

  // schedulesData.forEach((item) => {
  //   if (item.volleyballStats.length > 0) {
  //     console.log(item);
  //   }
  // });

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
      const { teamASetsWon, teamBSetsWon } = calculateResult(
        data["Set1"],
        data["Set2"],
        data["Set3"]
      );
      if (
        (data["TeamA"] === team.Abbreviation && teamASetsWon > teamBSetsWon) ||
        (data["TeamB"] === team.Abbreviation && teamASetsWon < teamBSetsWon)
      ) {
        if (data.Type === "C") {
          teamRow.CW_Score += 1;
        } else {
          teamRow.TW_Score += 1;
        }
      } else if (
        (data["TeamA"] === team.Abbreviation && teamASetsWon < teamBSetsWon) ||
        (data["TeamB"] === team.Abbreviation && teamASetsWon > teamBSetsWon)
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
        {sortedDocuments.map((team, index) => {
          return (
            <VolleyballStandingRow
              key={index}
              teamlogo={team.imageUrl}
              teamname={team.name}
              overall={`${team.CW_Score + team.TW_Score} - ${
                team.CL_Score + team.TL_Score
              }`}
              tournament={`${team.TW_Score} - ${team.TL_Score}`}
              conference={`${team.CW_Score} - ${team.CL_Score}`}
            />
          );
        })}
      </div>
    </>
  );
};

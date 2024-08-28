import React from "react";
import { VolleyballStandingRow } from "./VolleyballStandingRow";
import teamlogo from "../../assets/teamlogo.png";

import { PRHSAAuseFirestoreOverall } from "../../hooks/PRHSAAuseFirestoreOverall";

export const PRHSAAVolleyballStandings = ({ selectedGender, selectedYear }) => {
  const calculateResult = (set1, set2, set3) => {
    const defaultScore = "0-0";
    const score1 = set1 || defaultScore;
    const score2 = set2 || defaultScore;
    const score3 = set3 || defaultScore;

    const [set1TeamAScore, set1TeamBScore] = score1.split("-").map(Number);
    const [set2TeamAScore, set2TeamBScore] = score2.split("-").map(Number);
    const [set3TeamAScore, set3TeamBScore] = score3.split("-").map(Number);

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

  const { teamsData, schedulesData, error } = PRHSAAuseFirestoreOverall();

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
    (schedule) => schedule.Gender === selectedGender.charAt(0) && 2000 + Number(schedule.Date.split("/")[2]) === selectedYear
  );

  filteredTeams.forEach((team) => {
    const teamRow = { HW_Score: 0, HL_Score: 0, AW_Score: 0, AL_Score: 0 };
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
      if(data["TeamA"] === team.Abbreviation){
        if(teamASetsWon > teamBSetsWon) {
          teamRow.HW_Score += 1;
        }
        else {
          teamRow.HL_Score += 1;
        }
      } else if(data["TeamB"] === team.Abbreviation){
        if(teamASetsWon > teamBSetsWon) {
          teamRow.AL_Score += 1;
        }
        else {
          teamRow.AW_Score += 1;
        }
      }
    });

    documents.push(teamRow);
  });

  documents.forEach((team) => {
    const totalScore =
      team.AW_Score + team.HW_Score + team.AL_Score + team.HL_Score;
    team.sortingValue =
      totalScore === 0
        ? -Infinity
        : (team.AW_Score + team.HW_Score) / totalScore + 1e-4 * (team.AW_Score + team.HW_Score);
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
          <p className="font-bold text-[18px]">Home</p>
        </div>
        <div className="w-1/4 px-[20px] flex items-center">
          <p className="font-bold text-[18px]">Away</p>
        </div>
      </div>

      <div className="flex flex-col gap-[10px]">
        {sortedDocuments.map((team, index) => {
          return (
            <VolleyballStandingRow
              key={index}
              teamlogo={team.imageUrl}
              teamname={team.name}
              overall={`${team.HW_Score + team.AW_Score} - ${
                team.HL_Score + team.AL_Score
              }`}
              tournament={`${team.HW_Score} - ${team.HL_Score}`}
              conference={`${team.AW_Score} - ${team.AL_Score}`}
            />
          );
        })}
      </div>
    </>
  );
};

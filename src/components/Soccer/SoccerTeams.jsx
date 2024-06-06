import React from "react";
import { SoccerTeamCard } from "./SoccerTeamCard";
import teamlogo from "../../assets/teamlogo.png";
import { useFirestoreRealtime } from "../../hooks/useFirestoreRealtime";

export const SoccerTeams = ({ selectedGender }) => {
  const { documents, error } = useFirestoreRealtime("SoccerTeams");
  const teams = [
    {
      teamlogo: teamlogo,
      teamname: "Colegio San José",
      teamabr: "CSJ",
      overall: "3:2",
      tournament: "2:0",
      conference: "1:2",
      bestteam: true,
    },
    {
      teamlogo: teamlogo,
      teamname: "Colegio La Salle",
      teamabr: "La Salle",
      overall: "4:1",
      tournament: "3:1",
      conference: "1:0",
    },
    {
      teamlogo: teamlogo,
      teamname: "Froebel Billingual School",
      teamabr: "Froebel",
      overall: "2:3",
      tournament: "1:2",
      conference: "1:1",
    },
  ];

  const filteredDocuments = documents.filter(
    (team) => team.Gender === selectedGender.charAt(0)
  );

  return (
    <div className="grid grid-cols-2 gap-x-[50px] gap-y-[20px]">
      {filteredDocuments.map((team, index) => (
        <SoccerTeamCard
          key={team.id}
          teamID={team.id}
          teamlogo={team.imageUrl}
          teamname={team.TeamName}
          teamabr={team.Abbreviation}
          teamGender={team.Gender}
          bestteam={teams[0].bestteam}
        />
      ))}
    </div>
  );
};

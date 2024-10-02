import React from "react";
import { TeamCard } from "../TeamCard";
import { TeamCardNational } from "../TeamCardNational";
import teamlogo from "../../assets/teamlogo.png";
import { useFirestoreRealtime } from "../../hooks/useFirestoreRealtime";

export const VolleyballTeams = ({ selectedGender, selectedCategory, selectedYear }) => {
  let col = '';
  if(!selectedCategory){
    col = 'VolleyballTeams';
  } else {
    col = selectedCategory + 'VolleyballTeams';
  }
  const { documents, error } = useFirestoreRealtime(col);

  const filteredDocuments = documents.filter(
    (team) => team.Gender === selectedGender.charAt(0)
  );

  return (
    <div className="grid grid-cols-2 gap-x-[50px] gap-y-[20px]">
      {!selectedCategory ? filteredDocuments.map((team, index) => (
        <TeamCard
          key={team.id}
          teamID={team.id}
          teamlogo={team.imageUrl}
          teamname={team.TeamName}
          teamabr={team.Abbreviation}
          bestteam={false}
          selectedGender={selectedGender}
          selectedYear={selectedYear}
        />
      )) : filteredDocuments.map((team, index) => (
        <TeamCardNational
          key={team.id}
          teamID={team.id}
          teamlogo={team.imageUrl}
          teamname={team.TeamName}
          teamabr={team.Abbreviation}
          bestteam={false}
          selectedGender={selectedGender}
          selectedYear={selectedYear}
          selectedCategory={selectedCategory}
        />
      ))}
    </div>
  );
};

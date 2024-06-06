import React from "react";
import { SoccerPlayerCard } from "./SoccerPlayerCard";
import { useFirestoreRealtime } from "../../hooks/useFirestoreRealtime";

export const SoccerPlayers = ({ selectedGender }) => {
  const { documents, error } = useFirestoreRealtime(
    "SoccerPlayers",
    selectedGender
  );
  const filteredDocuments = documents.filter(
    (player) => player.Gender === selectedGender.charAt(0)
  );
  return (
    <div className="flex flex-wrap gap-[20px]">
      {filteredDocuments.map((player, index) => (
        <SoccerPlayerCard
          key={player.id}
          TeamName={player.TeamName}
          Name={player.Name}
          LastName={player.LastName}
          Number={player.Number}
          Position={player.Position}
          Height={player.Height}
          Grade={player.Grade}
        />
      ))}
    </div>
  );
};

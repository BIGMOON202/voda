import React from "react";
import { VolleyballPlayerCard } from "./VolleyballPlayerCard";
import { useFirestoreRealtime } from "../../hooks/useFirestoreRealtime";

export const PRHSAAVolleyballPlayers = ({ selectedGender }) => {
  const { documents, error } = useFirestoreRealtime(
    "VolleyballPlayers",
    selectedGender
  );
  const filteredDocuments = documents.filter(
    (player) => player.Gender === selectedGender.charAt(0)
  );
  return (
    <div className="flex flex-wrap gap-[20px]">
      {filteredDocuments.map((player, index) => (
        <VolleyballPlayerCard
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

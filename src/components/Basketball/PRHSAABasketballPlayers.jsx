import React from "react";
import { BasketballPlayerCard } from "./BasketballPlayerCard";
import { useFirestoreRealtime } from "../../hooks/useFirestoreRealtime";

export const PRHSAABasketballPlayers = ({ selectedGender }) => {
  const { documents, error } = useFirestoreRealtime(
    "BasketballPlayers",
    selectedGender
  );
  const filteredDocuments = documents.filter(
    (player) => player.Gender === selectedGender.charAt(0)
  );
  return (
    <div className="flex flex-wrap gap-[20px]">
      {filteredDocuments.map((player, index) => (
        <BasketballPlayerCard
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
